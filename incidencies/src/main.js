import "./style.css";
import { getIncidencies } from "./services/incidenciesService.js";
import { Llistat } from "./components/llistat.js";


const app = document.querySelector("#app");


function render() {
  const dades = getIncidencies();


  app.innerHTML = `
    <header class="main-header">
      <h1>Gestor d'Incidències</h1>
    </header>
    <main>
      ${Llistat(dades)}
    </main>
  `;
}


render();