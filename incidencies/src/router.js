export function getRutaActual() {
  const hash = window.location.hash;


  // Si entra sin hash o en la raíz, redirigimos a #/incidencies
  if (!hash || hash === "#" || hash === "#/") {
    window.location.hash = "#/incidencies";
    return { vista: "llistat" };
  }


  // Vista principal del listado
  if (hash === "#/incidencies") {
    return { vista: "llistat" };
  }


  // Vista de detalle: #/incidencies/ID
  const parts = hash.split("/");
  if (parts.length === 3 && parts[0] === "#" && parts[1] === "incidencies" && parts[2]) {
    return { vista: "detall", id: decodeURIComponent(parts[2]) };
  }


  // Cualquier otra ruta es desconocida
  return { vista: "not-found" };
}