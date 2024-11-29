Esta guía se basa [en mi PowerUp](https://glitch.com/edit/#!/lists-to-text-trello-powerup). Consiste en una sencilla aplicación  mediante [[Glitch]] que convierte el texto de las tarjetas de la lista de trello que le pidas, en el tableto en el que estés. En esta guía voy a desgranar en detalle los pasos que hay que dar y los problemas que me han ido surgiendo

Si tienes problemas una vez instalada debes aceptar cookies de terceros y popups

# Descripción del proyecto

Se ha desarrollado en glitch.com por dos razones: porque lo recomienda el equipo de Trello y porque facilita la gestión servidor

Para llevar a cabo el proyecto se ha utilizado [la guía oficial](https://developer.atlassian.com/cloud/trello/guides/power-ups/building-a-power-up-part-one/) adaptada al escenario que yo he planteado, además he ido ojeando [los proyectos del resto](https://glitch.com/@trello)

# Desarrollo

Lo primero que hice fue clonar el esqueleto que [ellos te brindan aquí](https://glitch.com/edit/#!/trello-power-up-skeleton)

![[../../../zz Media/Pasted image 20240804185919.png]]
Aquí podrás cambiar el nombre del proyecto

## Registrar la app

Antes de continuar, es conveniente registrar ya la app para evitar futuros problemas

Para ellos tienes que ir a [https://trello.com/power-ups/admin](https://trello.com/power-ups/admin) y clicar en Nuevo

Lo más importante de esta parte es poner la url de tu PowerUp en URL del conector de iframe (obligatoria para el Power-Up): en mi caso [https://lists-to-text-trello-powerup.glitch.me/](https://lists-to-text-trello-powerup.glitch.me/) 

Una vez registrado el PowerUp debemos configurarlo:

![[../../../zz Media/Pasted image 20240804185934.png]]

Entramos en Clave de API (ApiKey) y

1. Generamos una api key que guardaremos, porque la necesitaremos más tarde
2. En esta misma sección, añadiremos nuestra URL otra vez en Orígenes permitidos. Esto es de vital importancia, de lo contrario, no funcionará la autenticación del usuario

![[../../../zz Media/Pasted image 20240804185951.png]]

Ahora vamos a Funciones y elegimos en qué lugar queremos que nuestro PowerUp tenga efecto

Yo elegí botones del tablero porque quiero que quede ahí

![[../../../zz Media/Pasted image 20240804190001.png]]

## Código

server.js
```js
/* global Trello */
var express = require("express");
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
var cors = require("cors");
app.use(cors({ origin: "https://trello.com" }));

const fetch = require("node-fetch");

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
```

Al server.js que te viene por defecto, debes importar el módulo cors y permitir el origen [https://trello.com](https://trello.com/) tal y como aparece 

Cabe mencionar que no tuve que tocar nada más de este archivo. dicho sea de paso, no usé el process.env process.env.apiKey / process.env.tokenKey para nada

Otra cosa a remarcar es que en la línea 14 le indicamos que inicialmente cargue /views/index.html

views/index.html
```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://p.trellocdn.com/power-up.min.js"></script>
  </head>    
  <body>
    <script src="./js/client.js"></script>
  </body>
</html>
```

Que simplemente sirve para cargar client.js en que estará la lógica de poner el botón en su sitio

A partir de este punto, siempre trabajaremos en la carpeta public. Incluído el client.js

public/js/client.js

```js
/* global TrelloPowerUp */

TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Lista a texto!',
      callback: function(t) {
           return t.popup({
             title: "Estimation",
             url: 'textManager.html',
           });
         }
    }];
  },
});
```

Como avanzabamos en index.html, este trozo de código se encarga de ubicar el botón en el lugar que habilitamos en Funciones, al registrar el PowerUp

Además, mediante la función callback y popup estamos indicando que, cuando el usuario clique, deberá crear una ventana emergente con la vista textManager.html, que está en public, por lo que podemos deducir que el scope en este punto es la carpeta public

public/textManager.html

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://p.trellocdn.com/power-up.css" />

    <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>
    <script src="https://trello.com/1/client.js?key=66ed0de77ea544fedad45ecea45a2f71"></script>
    <script src="https://p.trellocdn.com/power-up.min.js"></script>
  </head>
  <body>
    Elige una lista:
    <select name="size" id="listSelect"></select>
    <textarea></textarea>
    <script src="./js/textManager.js"></script>
  </body>
</html>
```

En este html estamos cargando jquery, el framework de los powerup, el código asociado a esta vista textManager.js y una librería de trello que facilita la gestión de las keys y llamadas a la api. Para cargarla, necesitamos pasarle la api key que conseguimos antes, en el momento de registrar la app. Esta librería de trello, nos creará en window una variable llamada Trello que usaremos más adelante

## public/js/textManager.js

Por ser la parte más importante, la veremos parte a parte

public/js/textManager.js

```js
/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();
```

En la parte de arriba tenemos estas dos líneas

El comentario carga el objeto TrelloPowerUp

La de abajo activa el iframe (digamos que inicializa el PowerUp) y nos devuelve t que nos servirá para más cosas después

public/js/textManager.js

```js
var authenticationSuccess = function () {
  console.log("Successful authentication");
};

var authenticationFailure = function () {
  console.log("Failed authentication");
};

window.Trello.authorize({
  type: "popup",
  name: "Getting Started Application",
  scope: {
    read: "true",
    write: "true",
  },
  expiration: "never",
  success: authenticationSuccess,
  error: authenticationFailure,
});
```

Lo siguiente que habrá que hacer es pedir al usuario que de permisos a la app. Esto lo que hará será generar una key y guardarla en la variable Trello que vimos antes

public/js/textManager.js

```js
t.board("id").then((val) => {
  window.Trello.get(`/boards/${val.id}/lists`, successListsGathered, genericError);
});
```

Para obtener el id del tablero en el que estamos, solo tendremos que acceder a la variable t que vimos antes y pasarle el string "id", también podríamos obtener el nombre con "name"

public/js/textManager.js

```js
function successListsGathered(lists) {
  lists.forEach(function (item) {
    console.log(item.name);
    $("#listSelect").append(
      $("<option>", {
        value: item.id,
        text: item.name,
      })
    );
    window.Trello.get(
      `/lists/${lists[0].id}/cards`,
      successCardsGathered,
      genericError
    );
  });
}
```

Esto ya está listo, pero podemos acabar de analizarlo

Recorremos la lista de items para añadir las opciones en el desplegable (select)

Esa petición get es para que, al abrir, cargue automáticamente la primera opción y el campo no se vea vacío

public/js/textManager.js

```js
window.listSelect.addEventListener("change", function (event) {
  console.log(window.listSelect.value);
  window.Trello.get(
    `/lists/${window.listSelect.value}/cards`,
    successCardsGathered,
    genericError
  );
});
```

Por último, agregamos un listener al evento de actualización del desplegable, con el id seleccionado

public/js/textManager.js

```js
function successCardsGathered(val) {
  $("textarea").text("");
  val.forEach(function (item) {
    $("textarea").append(item.name + "\n");
  });
}
```

Y ponemos en el textarea el contenido de las tarjetas de la lista

# Bibliografía

[https://developer.atlassian.com/cloud/trello/guides/power-ups/building-a-power-up-part-one/](https://developer.atlassian.com/cloud/trello/guides/power-ups/building-a-power-up-part-one/) 

[https://glitch.com/@trello](https://glitch.com/@trello) 

[https://glitch.com/edit/#!/trello-power-up-skeleton](https://glitch.com/edit/#!/trello-power-up-skeleton) 

[https://trello.com/power-ups/admin](https://trello.com/power-ups/admin) 

[https://glitch.com/edit/#!/lists-to-text-trello-powerup](https://glitch.com/edit/#!/lists-to-text-trello-powerup)