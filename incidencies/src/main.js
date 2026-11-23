
import "./style.css";
import { getIncidencies, getIncidenciaById, crearIncidencia } from "./services/incidenciesService.js";
import { Llistat } from "./components/llistat.js";
import { Detall } from "./components/detall.js";
import { Formulari } from "./components/formulari.js";
import { getRutaActual } from "./router.js";

const app = document.querySelector("#app");

function validarDades(dades) {
  const errors = {};
  const estatsValids = ["obert", "en procés", "tancat"];
  const prioritatsValides = ["baixa", "mitjana", "alta"];

  if (!dades.titol || dades.titol.trim().length < 3) {
    errors.titol = "El títol és obligatori (mínim 3 caràcters).";
  }
  if (!dades.descripcio || dades.descripcio.trim().length < 5) {
    errors.descripcio = "La descripció és obligatòria (mínim 5 caràcters).";
  }
  if (!dades.assignat || dades.assignat.trim().length < 2) {
    errors.assignat = "Cal indicar la persona assignada.";
  }
  if (!estatsValids.includes(dades.estat)) {
    errors.estat = "Selecciona un estat vàlid.";
  }
  if (!prioritatsValides.includes(dades.prioritat)) {
    errors.prioritat = "Selecciona una prioritat vàlida.";
  }

  return errors;
}

function pintarLayout(contingutVista) {
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
        ${contingutVista}
      </main>
    </div>
  `;
}

function render() {
  const ruta = getRutaActual();

  if (ruta.vista === "llistat") {
    pintarLayout(Llistat(getIncidencies()));
  } else if (ruta.vista === "nova") {
    pintarLayout(Formulari());
  } else if (ruta.vista === "detall") {
    pintarLayout(Detall(getIncidenciaById(ruta.id)));
  } else {
    pintarLayout(`
      <div class="table-responsive" style="padding: 20px;">
        <h2>404 - Ruta no trobada</h2>
        <p>La pàgina que cerques no existeix.</p>
        <br>
        <a href="#/incidencies" class="btn-save" style="text-decoration: none;">Tornar al llistat</a>
      </div>
    `);
  }
}

app.addEventListener("submit", (e) => {
  if (e.target.id !== "form-incidencia") return;
  e.preventDefault();

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
    pintarLayout(Formulari({ valors: dades, errors, esEdicio: false }));
    return;
  }

  const nova = crearIncidencia(dades);
  window.location.hash = `#/incidencies/${nova.id}`;
});

window.addEventListener("hashchange", render);
render();
