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

