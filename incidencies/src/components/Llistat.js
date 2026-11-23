
export function Llistat(llista) {
  if (!llista || llista.length === 0) {
    return `
      <div class="table-responsive">
        <p style="padding: 20px;">No hi ha cap incidència registrada.</p>
      </div>
    `;
  }

  let files = "";

  for (let i = 0; i < llista.length; i++) {
    files += `
      <tr>
        <td>${llista[i].id}</td>
        <td>${llista[i].titol}</td>
        <td>${llista[i].descripcio}</td>
        <td>${llista[i].estat}</td>
        <td>${llista[i].prioritat}</td>
        <td>${llista[i].assignat}</td>
        <td>${llista[i].dataCreacio}</td>

        <td style="white-space: nowrap;">
          <a href="#/incidencies/${llista[i].id}"
             style="display: inline-block;">
            Veure
          </a>

          |

          <a href="#/incidencies/${llista[i].id}/editar"
             style="display: inline-block;">
            Editar
          </a>

          |

          <button
            type="button"
            data-action="eliminar"
            data-id="${llista[i].id}"
            class="btn-cancel"
            style="display: inline-block; padding: 4px 8px; cursor: pointer;">
            Eliminar
          </button>
        </td>
      </tr>
    `;
  }

  return `
    <div class="table-responsive">
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
    