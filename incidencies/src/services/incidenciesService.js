
const STORAGE_KEY = "ia2_incidencies_v1";

const DADES_MOSTRA = [
  { id: "inc-1", titol: "Ordinador no arrenca", descripcio: "L'ordinador de recepció no encén.", estat: "obert", prioritat: "alta", dataCreacio: "2025-09-20", assignat: "Joan García" },
  { id: "inc-2", titol: "Problema amb impressora", descripcio: "No imprimeix documents PDF.", estat: "en procés", prioritat: "mitjana", dataCreacio: "2025-09-21", assignat: "Maria López" },
  { id: "inc-3", titol: "Actualització de software", descripcio: "Cal actualitzar l'antivirus.", estat: "en procés", prioritat: "baixa", dataCreacio: "2025-09-22", assignat: "Pere Martínez" },
  { id: "inc-4", titol: "Canvi de monitor", descripcio: "El monitor mostra línies estranyes.", estat: "obert", prioritat: "mitjana", dataCreacio: "2025-09-23", assignat: "Anna Torres" },
  { id: "inc-5", titol: "Recuperació de fitxers", descripcio: "S'han esborrat fitxers importants.", estat: "tancat", prioritat: "alta", dataCreacio: "2025-09-23", assignat: "Carlos Ruiz" },
];

export let errorStorage = "";

function desar(llista) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(llista));
    errorStorage = "";
  } catch (e) {
    errorStorage = "Error en desar les dades a localStorage.";
  }
}

function carregar() {
  try {
    const dades = localStorage.getItem(STORAGE_KEY);

    if (dades === null) {
      desar(DADES_MOSTRA);
      return [...DADES_MOSTRA];
    }

    const parsed = JSON.parse(dades);

    if (!Array.isArray(parsed)) {
      errorStorage = "Format de dades invàlid a localStorage. No s'han sobreescrit.";
      return [];
    }

    return parsed;
  } catch (e) {
    errorStorage = "Error en llegir localStorage (JSON malmès). No s'han sobreescrit.";
    return [];
  }
}

let incidencies = carregar();

export function getIncidencies() {
  return [...incidencies];
}

export function getIncidenciaById(id) {
  return incidencies.find((inc) => inc.id === id);
}

export function crearIncidencia(dades) {
  const nova = {
    id: `inc-${Date.now()}`,
    titol: dades.titol.trim(),
    descripcio: dades.descripcio.trim(),
    estat: dades.estat,
    prioritat: dades.prioritat,
    assignat: dades.assignat.trim(),
    dataCreacio: new Date().toISOString().slice(0, 10),
  };

  incidencies.push(nova);
  desar(incidencies);

  return nova;
}

export function actualitzarIncidencia(id, dades) {
  const pos = incidencies.findIndex((inc) => inc.id === id);

  if (pos === -1) return null;

  incidencies[pos] = {
    ...incidencies[pos],
    titol: dades.titol.trim(),
    descripcio: dades.descripcio.trim(),
    estat: dades.estat,
    prioritat: dades.prioritat,
    assignat: dades.assignat.trim(),
  };

  desar(incidencies);

  return incidencies[pos];
}

export function eliminarIncidencia(id) {
  incidencies = incidencies.filter((inc) => inc.id !== id);
  desar(incidencies);
}
