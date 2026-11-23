export function Detall(incidencia) {
  if (!incidencia) {
    return `
      <div class="table-responsive" style="padding: 20px;">
        <h2>Incidència no trobada</h2>
        <p>No s'ha trobat cap incidència amb aquest identificador.</p>
        <br>
        <a href="#/incidencies" class="btn-save" style="text-decoration: none;">Tornar al llistat</a>
      </div>
    `;
  }


  return `
    <div class="table-responsive" style="padding: 20px;">
      <h2>Detall de la incidència: ${incidencia.id}</h2>
      <ul style="list-style: none; margin: 15px 0; line-height: 1.8;">
        <li><strong>ID:</strong> ${incidencia.id}</li>
        <li><strong>Títol:</strong> ${incidencia.titol}</li>
        <li><strong>Descripció:</strong> ${incidencia.descripcio}</li>
        <li><strong>Estat:</strong> ${incidencia.estat}</li>
        <li><strong>Prioritat:</strong> ${incidencia.prioritat}</li>
        <li><strong>Assignat a:</strong> ${incidencia.assignat}</li>
        <li><strong>Data de creació:</strong> ${incidencia.dataCreacio}</li>
      </ul>
      <a href="#/incidencies" class="btn-save" style="text-decoration: none;">Tornar al llistat</a>
    </div>
  `;
}