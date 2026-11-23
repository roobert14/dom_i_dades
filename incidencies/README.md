Desarrollo del Ejercicio 1 (E01) — Diseño modular, almacenamiento y vista de listado
Para esta primera entrega (v0.1.0) he planteado la estructura base de la aplicación de gestión de incidencias empleando JavaScript estándar y Vite, aislando por completo la lógica de información, la generación de interfaz y el pintado en el navegador.

1. División en módulos independientes (import / export)
Con el objetivo de no mezclar responsabilidades en un mismo fichero ni incrustar lógica dentro de la plantilla HTML, la aplicación se descompone en tres piezas autónomas:

Almacén de datos en memoria (src/services/incidenciesService.js):

Contiene la colección de partida con las propiedades definidas en la especificación (id, titol, descripcio, estat, prioritat, dataCreacio y assignat), asignando claves de texto únicas ("inc-1", "inc-2", etc.) y ciñéndose a los tres estados establecidos ("obert", "en procés", "tancat").

Publica el método getIncidencies(), que retorna una copia independiente del listado ([...incidencies]) para salvaguardar el array original ante cambios externos. Este módulo opera únicamente con datos y desconoce el DOM.

Construcción del componente de tabla (src/components/Llistat.js):

Define la función pura Llistat(llista), encargada de transformar el array recibido en una cadena de texto con la estructura HTML de la tabla.

Gestión de ausencia de datos: Evalúa al inicio si la lista es nula o está vacía (!llista || llista.length === 0); ante ese escenario, devuelve el mensaje "No hi ha cap incidència registrada." para no mostrar una tabla sin filas.

Protección frente a código malicioso (escape de HTML): Escapa los valores de texto introducidos por el usuario (titol, descripcio, assignat, etc.) antes de incrustarlos en el HTML, logrando que cualquier etiqueta introducida `(<h1>, <script>)` se imprima literalmente en pantalla sin llegar a ejecutarse.

Inicialización y renderizado (src/main.js e index.html):

El archivo index.html contiene exclusivamente el punto de anclaje `<div id="app"></div>` junto con la referencia al script principal.

Desde main.js se conectan el servicio (getIncidencies) y la vista (Llistat), inyectando en #app a través de innerHTML el encabezado global `(<header class="main-header">)` acompañado del listado generado.

----------

Ejercicio 2 (E02) — Navegación y vista de detalle (v0.2.0)
En esta segunda versión se ha añadido navegación basada en rutas con hash (#) y una pantalla específica para ver la ficha completa de cada incidencia:

Enrutador por hash (src/router.js): Se ha creado getRutaActual(), que analiza window.location.hash para distinguir entre el listado general (#/incidencies) y la vista de una incidencia concreta (#/incidencies/ID, capturando el ID dinámico), además de redirigir por defecto si se entra a la raíz sin hash.

Control de cambios en src/main.js: Al iniciar la app, se añade una sola vez el evento window.addEventListener("hashchange", render) para actualizar la vista al cambiar la URL, conservando siempre visibles la cabecera y el menú común.

Pantalla de detalle (src/components/Detall.js): Nuevo componente que busca los datos de la incidencia con getIncidenciaById(id), muestra toda su información (id, titol, descripcio, estat, prioritat, assignat y dataCreacio) e incluye un enlace para volver al listado.

Manejo de errores en rutas e IDs: Si se escribe una ruta inválida (como #/ruta-falsa) o un ID que no existe (como #/incidencies/inc-999), se muestra un aviso claro al usuario junto con un botón para regresar a #/incidencies.

---------

Exercici 3 (E03) — Formulari per crear i editar incidències (v0.3.0)
En aquest tercer exercici s'ha afegit la possibilitat de crear incidències noves i modificar les que ja existeixen, utilitzant el mateix formulari per a totes dues funcions.

- Rutes de creació i edició (src/router.js): S'han incorporat dues rutes noves: #/incidencies/nova, per crear una incidència, i #/incidencies/ID/editar, per modificar-ne una d'existent. La ruta de creació es comprova abans de les rutes que utilitzen identificadors.

- Formulari reutilitzable (src/components/formulari.js): S'ha creat un únic component que serveix tant per donar d'alta incidències com per editar-les. També s'han relacionat les etiquetes amb els camps corresponents per facilitar l'ús del formulari amb el teclat.

- Validació de dades (src/main.js): Abans de desar una incidència, es comprova que el títol, la descripció i la persona assignada tinguin contingut vàlid. També es verifica que l'estat i la prioritat siguin correctes. Si algun camp conté errors, es mostra un missatge d'avís a sota i es mantenen les dades que ja havia escrit l'usuari.

- Creació i modificació (src/services/incidenciesService.js):

Quan es crea una incidència, se li assigna un identificador nou i la data del dia en què s'ha creat.

Quan es modifica una incidència, es mantenen el seu identificador i la data de creació originals, i només s'actualitzen les dades modificades.

- Cancel·lació: L'usuari pot sortir del formulari sense desar els canvis i tornar a la pantalla corresponent.

------

Exercici 4 (E04) — Eliminació i filtratge d'incidències per estat (v0.4.0)
En aquest quart exercici s'han afegit dues noves funcions al gestor d'incidències: poder eliminar incidències amb una confirmació prèvia i poder filtrar-les segons el seu estat.

- Eliminació d'incidències (src/services/incidenciesService.js): S'ha incorporat la funció eliminarIncidencia(id), que permet esborrar una incidència utilitzant el seu identificador únic. D'aquesta manera, s'evita confondre les incidències encara que canviï la seva posició dins del llistat.

- Gestió dels esdeveniments (src/main.js): S'han afegit dos controladors d'esdeveniments al contenidor principal de l'aplicació. Un gestiona l'eliminació i demana confirmació abans d'esborrar una incidència. L'altre controla els canvis del selector de filtres. Això evita que els esdeveniments es registrin diverses vegades quan es canvia de pantalla.

- Filtratge per estat (src/components/llistat.js): S'ha incorporat un selector que permet mostrar totes les incidències o filtrar-les segons si estan obertes, en procés o tancades.

- Missatges segons els resultats: S'han diferenciat dos casos: quan encara no hi ha cap incidència registrada i quan el filtre seleccionat no troba cap incidència que coincideixi amb l'estat escollit.

En resum: ara l'aplicació permet eliminar incidències de manera segura i consultar-les més fàcilment mitjançant filtres segons el seu estat.


