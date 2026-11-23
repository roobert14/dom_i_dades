export function Llistat(llistaFiltrada, estatActual = "tots", totalIncidencies = 0) {
  const selectorFiltre = `
    <div style="padding: 15px 20px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #eee;">
      <label for="filtre-estat"><strong>Filtrar per estat:</strong></label>
      <select id="filtre-estat" data-action="filtrar-estat">
        <option value="tots" ${estatActual === "tots" ? "selected" : ""}>Tots els estats</option>
        <option value="obert" ${estatActual === "obert" ? "selected" : ""}>Obert</option>
        <option value="en procés" ${estatActual === "en procés" ? "selected" : ""}>En procés</option>
        <option value="tancat" ${estatActual === "tancat" ? "selected" : ""}>Tancat</option>
      </select>
    </div>
  `;


  // Caso 1: No hay ninguna incidencia en el servicio (lista global vacía)
  if (totalIncidencies === 0) {
    return `
      <div class="table-responsive">
        ${selectorFiltre}
        <p style="padding: 20px;">No hi ha cap incidència registrada.</p>
      </div>
    `;
  }


  // Caso 2: Hay incidencias en el sistema, pero ninguna coincide con el filtro activo
  if (!llistaFiltrada || llistaFiltrada.length === 0) {
    return `
      <div class="table-responsive">
        ${selectorFiltre}
        <p style="padding: 20px;">No s'han trobat incidències amb l'estat "${estatActual}".</p>
      </div>
    `;
  }


  let files = "";
  for (let i = 0; i < llistaFiltrada.length; i++) {
    const inc = llistaFiltrada[i];
    files += `
      <tr>
        <td>${inc.id}</td>
        <td>${inc.titol}</td>
        <td>${inc.descripcio}</td>
        <td>${inc.estat}</td>
        <td>${inc.prioritat}</td>
        <td>${inc.assignat}</td>
        <td>${inc.dataCreacio}</td>
        <td>
          <a href="#/incidencies/${inc.id}">Veure</a> | 
          <a href="#/incidencies/${inc.id}/editar">Editar</a> | 
          <button type="button" data-action="eliminar" data-id="${inc.id}" class="btn-cancel" style="padding: 4px 8px; cursor: pointer;">Eliminar</button>
        </td>
      </tr>
    `;
  }


  return `
    <div class="table-responsive">
      ${selectorFiltre}
      <table class="incidents-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Títol</th>
            <th>Descripció</th>
            <th>Estat</th>
            <th>Prioritat</th>
            <th>Assignat</th>
            <th>Data</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          ${files}
        </tbody>
      </table>
    </div>
  `;
}