export function getRutaActual() {
  const hash = window.location.hash;


  if (!hash || hash === "#" || hash === "#/") {
    window.location.hash = "#/incidencies";
    return { vista: "llistat" };
  }


  if (hash === "#/incidencies") {
    return { vista: "llistat" };
  }


  if (hash === "#/incidencies/nova") {
    return { vista: "nova" };
  }


  const parts = hash.split("/");
  if (parts.length === 4 && parts[0] === "#" && parts[1] === "incidencies" && parts[2] && parts[3] === "editar") {
    return { vista: "editar", id: decodeURIComponent(parts[2]) };
  }


  if (parts.length === 3 && parts[0] === "#" && parts[1] === "incidencies" && parts[2]) {
    return { vista: "detall", id: decodeURIComponent(parts[2]) };
  }


  return { vista: "not-found" };
}