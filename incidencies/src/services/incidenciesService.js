
let incidencies = [
  {
    id: "inc-1",
    titol: "Ordinador no arrenca",
    descripcio: "L'ordinador de recepció no encén.",
    estat: "obert",
    prioritat: "alta",
    dataCreacio: "2025-09-20",
    assignat: "Joan García",
  },
  {
    id: "inc-2",
    titol: "Problema amb impressora",
    descripcio: "No imprimeix documents PDF.",
    estat: "en procés",
    prioritat: "mitjana",
    dataCreacio: "2025-09-21",
    assignat: "Maria López",
  },
  {
    id: "inc-3",
    titol: "Actualització de software",
    descripcio: "Cal actualitzar l'antivirus.",
    estat: "en procés",
    prioritat: "baixa",
    dataCreacio: "2025-09-22",
    assignat: "Pere Martínez",
  },
  {
    id: "inc-4",
    titol: "Canvi de monitor",
    descripcio: "El monitor mostra línies estranyes.",
    estat: "obert",
    prioritat: "mitjana",
    dataCreacio: "2025-09-23",
    assignat: "Anna Torres",
  },
  {
    id: "inc-5",
    titol: "Recuperació de fitxers",
    descripcio: "S'han esborrat fitxers importants.",
    estat: "tancat",
    prioritat: "alta",
    dataCreacio: "2025-09-23",
    assignat: "Carlos Ruiz",
  },
];

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
  return nova;
}
