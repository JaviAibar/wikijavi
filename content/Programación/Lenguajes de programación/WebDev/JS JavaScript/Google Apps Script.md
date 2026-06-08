Para acceder al editor de scripts, crea un Google Sheets `Extensiones > Apps Script`

![[Pasted image 20250720172942.png]]

El proyecto de necesité desarrollar era un monitor para la reventa de entradas de Castlefest

Primero pensé en capturar el HTML para detectar el cambio de "1 Entrada disponible" o "Publicado por Nosequién", sin embargo esto tiene 2 problemas: 1 cargar la página probablemente sea menos eficiente y 2 (y mucho peor) la página que pillas es sin cargar la info (sin JavaScript) que es justo lo que necesitamos

## Capturar contenido de un enlace (HTML, JSON, ...)

Para obtener la info hay que ir a la web, apartado `Network` la URL de la api que consulta la web

Ambas opciones se hacen con `UrlFetchApp.fetch(url)`

```js
var api = "https://resell.seetickets.com/api/adverts_search?tickets.product.category=2875&existAvailableTickets=true&status=1&orderby[nbCartTickets]=asc&&orderby[tickets.resaleValue]=asc&page=1&itemsPerPage=25"
var response = UrlFetchApp.fetch(api);
const txt = response.getContentText();
``` 

Intentamos parsear a JSON

```js 
let data;
try {
	data = JSON.parse(txt);
} catch (e) {
	throw new Error("No se pudo parsear JSON: " + e);
}
  ``` 

Concretamente en ese JSON, cada entrada se añadía en un array llamado `"hydra:member"`, por tanto

```js 
if (data["hydra:member"].length > 1) {
    sheet.appendRow([now, "¡Entradas disponibles!", data["hydra:member"].length]);
    sendAlert("¡Hay entradas disponibles! https://resell.seetickets.com/castlefest-2025/category/2875/saturday-ticket?utm_source=alert", data["hydra:member"].length); 
} else {
	sheet.appendRow([now, "Sin cambios", file && file.getUrl()||""]);
}
``` 
## Añadir filas a la hoja de cálculo

>[!warning] Atención!
>En el código anterior se escribe en la hoja de cálculo pero hay que obtenerla primero:
>```js 
>var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
>``` 

> [!info] Fíjate
> En el método `appendRow` se le pasa un array, cada elemento del array es una columna distinta, es decir con 
> ```js 
 >sheet.appendRow([now, "¡Entradas disponibles!", data["hydra:member"].length])
> ``` 
> En la columna A se guarda el momento de ejecución; en la B, el texto "Entradas disponibles" y en la C la cantidad de entradas

## Enviar correos

El método `sendAlert` que se ve en el código anterior sencillamente envía un correo con el enlace y el número de entradas publicadas

```js 
function sendAlert(message, cuantas) {
  MailApp.sendEmail("es.javi.es@gmail.com", "Alerta "+cuantas+" Entradas", message);
}
``` 

## Guardar archivos

```js 
var file = DriveApp.createFile("snapshot_" + new Date().toISOString() + ".html", content, MimeType.HTML);
``` 

>[!warning] Pero cuidado
>Este código guardará el archivo en la raíz

Para evitar eso, crea una carpeta en Drive donde quieres que se guarden los archivos y guarda el ID de la carpeta (el código después de folders/)

![[Pasted image 20250720175710.png]]

Obtenemos esa carpeta

```js 
var folderId = "1zjRn-nJXdoIRjJSJXwmxWxyj7uB08RHg"; 
var folder = DriveApp.getFolderById(folderId);
``` 

y creamos el archivo

```js 
folder.createFile(fileName, txt, MimeType.PLAIN_TEXT);
``` 

> [!info] Fíjate
> En un momento determinado, ChatGPT cambio la parte de la fecha del nombre del archivo por una mejor:
>```js 
  >var timestamp = new Date().toISOString().replace(/[:]/g, "-"); // sin ":"
>``` 

# Obtener la última fila

El límite de archivos que puedes crear son 250 al día \[Info a 20/07/2025] pero si quieres guardar los JSON cada minuto, acabarás generan 1440. Lo que hice fue comprobar si había cambiado antes de guardar, para ello necesitaba el enlace que había guardado *(código al final de la sección [[#Capturar contenido de un enlace (HTML, JSON, ...)]])*

```js 
var lastID = sheet.getLastRow()
var lastFileUrl = ""
do {
  lastFileUrl = sheet.getRange(lastID, 3).getValue()
  lastID--;
} while(lastFileUrl === ""&&lastID>0);

var match = lastFileUrl.match(/[-\w]{25,}/);
``` 

## Cargar el contenido de un archivo de Drive

```js 
if (match) {
  var fileId = match[0];
  var file = DriveApp.getFileById(fileId);
  var lastContent = file.getBlob().getDataAsString();
}
``` 

# Tengo un problema

## El enlace del JSON me da acceso denegado Access Denied 403

# Bibliografía

ChatGPT

[Hoja de cálculo del proyecto](https://docs.google.com/spreadsheets/d/1Z3Hb-Lobo14owDyNPijgKa2DDETYgTsuWTYp5Ik7tDo/edit?gid=0#gid=0)
[Código del proyecto](https://script.google.com/u/0/home/projects/1D6T_KRB_qZxYg8bJjMtIzDYBJCqt0CR65JZ55LeWjLfSlByh7-x4f1Mj/edit)
# Keywords 

Scripts