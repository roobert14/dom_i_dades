export function Formulari(valors = {}, errors = {}, esEdicio = false) {
  let titolVista = "Nova incidència";
  let textBoto = "Crear";
  let urlCancel = "#/incidencies";


  if (esEdicio) {
    titolVista = "Editar incidència (" + valors.id + ")";
    textBoto = "Desar canvis";
    urlCancel = "#/incidencies/" + valors.id;
  }


  return `
    <div class="table-responsive" style="padding: 20px; max-width: 500px;">
      <h2>${titolVista}</h2>


      <form id="form-incidencia" data-id="${valors.id || ""}" novalidate>
        <div class="form-group">
          <label for="titol">Títol</label>
          <input type="text" id="titol" name="titol" value="${valors.titol || ""}" />
          <small style="color: red;">${errors.titol || ""}</small>
        </div>


        <div class="form-group">
          <label for="descripcio">Descripció</label>
          <textarea id="descripcio" name="descripcio">${valors.descripcio || ""}</textarea>
          <small style="color: red;">${errors.descripcio || ""}</small>
        </div>


        <div class="form-group">
          <label for="assignat">Assignat</label>
          <input type="text" id="assignat" name="assignat" value="${valors.assignat || ""}" />
          <small style="color: red;">${errors.assignat || ""}</small>
        </div>


        <div class="form-group">
          <label for="estat">Estat</label>
          <select id="estat" name="estat">
            <option value="obert" ${valors.estat === "obert" ? "selected" : ""}>Obert</option>
            <option value="en procés" ${valors.estat === "en procés" ? "selected" : ""}>En procés</option>
            <option value="tancat" ${valors.estat === "tancat" ? "selected" : ""}>Tancat</option>
          </select>
          <small style="color: red;">${errors.estat || ""}</small>
        </div>


        <div class="form-group">
          <label for="prioritat">Prioritat</label>
          <select id="prioritat" name="prioritat">
            <option value="baixa" ${valors.prioritat === "baixa" ? "selected" : ""}>Baixa</option>
            <option value="mitjana" ${valors.prioritat === "mitjana" ? "selected" : ""}>Mitjana</option>
            <option value="alta" ${valors.prioritat === "alta" ? "selected" : ""}>Alta</option>
          </select>
          <small style="color: red;">${errors.prioritat || ""}</small>
        </div>


        <div style="display: flex; gap: 10px; margin-top: 15px;">
          <button type="submit" class="btn-save">${textBoto}</button>
          <a href="${urlCancel}" class="btn-cancel" style="text-decoration: none;">Cancel·lar</a>
        </div>
      </form>
    </div>
  `;
}