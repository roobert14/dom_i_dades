import "./style.css";
import { getIncidencies, getIncidenciaById } from "./services/incidenciesService.js";
import { Llistat } from "./components/llistat.js";
import { Detall } from "./components/detall.js";
import { getRutaActual } from "./router.js";


const app = document.querySelector("#app");


function render() {
  const ruta = getRutaActual();
  let contingutVista = "";


  if (ruta.vista === "llistat") {
    const dades = getIncidencies();
    contingutVista = Llistat(dades);
  } else if (ruta.vista === "detall") {
    const incidencia = getIncidenciaById(ruta.id);
    contingutVista = Detall(incidencia);
  } else {
    contingutVista = `
      <div class="table-responsive" style="padding: 20px;">
        <h2>404 - Ruta no trobada</h2>
        <p>La pàgina que cerques no existeix.</p>
        <br>
        <a href="#/incidencies" class="btn-save" style="text-decoration: none;">Tornar al llistat</a>
      </div>
    `;
  }


  app.innerHTML = `
    <div class="container">
      <header class="main-header">
        <h1>Gestor d'Incidències</h1>
        <nav style="margin-top: 10px;">
          <a href="#/incidencies">Llistat d'incidències</a>
        </nav>
      </header>
      <main>
        ${contingutVista}
      </main>
    </div>
  `;
}


window.addEventListener("hashchange", render);
render();