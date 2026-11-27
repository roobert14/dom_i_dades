
import "./style.css";

import {
  getIncidencies,
  getIncidenciaById,
  crearIncidencia,
  actualitzarIncidencia,
  eliminarIncidencia,
  errorStorage
} from "./services/incidenciesService.js";

import { Llistat } from "./components/llistat.js";
import { Detall } from "./components/Detall.js";
import { Formulari } from "./components/formulari.js";
import { getRutaActual } from "./router.js";

const app = document.querySelector("#app");
let filtreEstat = "tots";

function validarDades(dades) {
  const errors = {};

  if (!dades.titol || dades.titol.trim().length < 3) {
    errors.titol = "El títol és obligatori (mínim 3 caràcters).";
  }

  if (!dades.descripcio || dades.descripcio.trim().length < 5) {
    errors.descripcio = "La descripció és obligatòria (mínim 5 caràcters).";
  }

  if (!dades.assignat || dades.assignat.trim().length < 2) {
    errors.assignat = "Cal indicar la persona assignada.";
  }

  if (!["obert", "en procés", "tancat"].includes(dades.estat)) {
    errors.estat = "Selecciona un estat vàlid.";
  }

  if (!["baixa", "mitjana", "alta"].includes(dades.prioritat)) {
    errors.prioritat = "Selecciona una prioritat vàlida.";
  }

  return errors;
}

function pintarLayout(contingutVista) {
  const avisError = errorStorage
    ? `<p style="background: #fdecea; color: #b71c1c; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
        <strong>Avís:</strong> ${errorStorage}
       </p>`
    : "";

  app.innerHTML = `
    <div class="container">
      <header class="main-header">
        <h1>Gestor d'Incidències</h1>
        <nav style="margin-top: 10px; display: flex; gap: 15px;">
          <a href="#/incidencies">Llistat d'incidències</a>
          <a href="#/incidencies/nova">+ Nova incidència</a>
        </nav>
      </header>
      <main>
        ${avisError}
        ${contingutVista}
      </main>
    </div>
  `;
}

function render() {
  const ruta = getRutaActual();

  if (ruta.vista === "llistat") {
    const totes = getIncidencies();

    const filtrades = filtreEstat === "tots"
      ? totes
      : totes.filter((inc) => inc.estat === filtreEstat);

    pintarLayout(Llistat(filtrades, filtreEstat, totes.length));

  } else if (ruta.vista === "nova") {
    pintarLayout(Formulari());

  } else if (ruta.vista === "editar") {
    const incidencia = getIncidenciaById(ruta.id);

    pintarLayout(
      incidencia
        ? Formulari(incidencia, {}, true)
        : Detall(null)
    );

  } else if (ruta.vista === "detall") {
    pintarLayout(Detall(getIncidenciaById(ruta.id)));

  } else {
    pintarLayout(`
      <div class="table-responsive" style="padding: 20px;">
        <h2>404 - Ruta no trobada</h2>
        <a href="#/incidencies" class="btn-save" style="text-decoration: none;">
          Tornar al llistat
        </a>
      </div>
    `);
  }
}

app.addEventListener("click", (e) => {
  const boto = e.target.closest('[data-action="eliminar"]');

  if (!boto) return;

  if (window.confirm(`Segur que vols eliminar la incidència ${boto.dataset.id}?`)) {
    eliminarIncidencia(boto.dataset.id);
    render();
  }
});

app.addEventListener("change", (e) => {
  if (e.target.dataset.action === "filtrar-estat") {
    filtreEstat = e.target.value;
    render();
  }
});

app.addEventListener("submit", (e) => {
  if (e.target.id !== "form-incidencia") return;

  e.preventDefault();

  const idEdicio = e.target.dataset.id;
  const esEdicio = Boolean(idEdicio);

  const formData = new FormData(e.target);

  const dades = {
    titol: formData.get("titol") ?? "",
    descripcio: formData.get("descripcio") ?? "",
    assignat: formData.get("assignat") ?? "",
    estat: formData.get("estat") ?? "",
    prioritat: formData.get("prioritat") ?? "",
  };

  const errors = validarDades(dades);

  if (Object.keys(errors).length > 0) {
    pintarLayout(
      Formulari({ ...dades, id: idEdicio }, errors, esEdicio)
    );
    return;
  }

  if (esEdicio) {
    actualitzarIncidencia(idEdicio, dades);
    window.location.hash = `#/incidencies/${idEdicio}`;
  } else {
    const nova = crearIncidencia(dades);
    window.location.hash = `#/incidencies/${nova.id}`;
  }
});

window.addEventListener("hashchange", render);

render();

