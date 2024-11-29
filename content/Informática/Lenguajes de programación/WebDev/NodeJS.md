_Para ver un ejemplo de PowerUp para Trello [[PowerUp para Trello|click aquí]]_

NodeJS es también JS pero para el servidor y orientado a eventos asíncronos

Permite el uso de `package.json` donde podemos indicar los `framework y librerías` que son `dependencias` del proyecto.

Ejemplo

```json
{
  "modules": "commonJS",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.3.5"
  }
}
```

Entonces ponemos el comando `npm i{:bash}` y se instalarán todas las librerías que falten

En scripts podríamos también incluir cualquier librería que hayamos instalado

```json
"scripts": {
    "tu-paquete": "tu-paquete"
}
```

## Diferencias entre las dependencies y las devDependencies

#WIP 
## Punto de inicio `server.js`

Creo que necesitas tener un script js a partir del cuál arranque todo, e.g. `server.js`

_ejemplo básico_
```js 
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
``` 

y ejecutarlo con

```shell
node server.js
```

Importante mirar el apartado de [[#Navegación]]

En algún sitio leí esto pero no tengo claro qué es

```bash
npm run tu-paquete
```

Desde la versión 5.2.0 incluye el comando `npx` para facilitar la instalación y gestión de dependencias.

Ejecutar un paquete sería

```bash
npx tu-paquete
``` 

O ejecutar directamente desde Github

```bash
npx https://gist.github.com/Tynael/0861d31ea17796c9a5b4a0162eb3c1e8
```

## Navegación / Page Route / Navigation

Creo que para esto necesitamos de una librería externa como fastify (que usa [[Glitch]])

Aquí un ejemplo de node con Fastify, pero entro en más detalle con Fastify [[Fastify|en su nota]]

```js
const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { seo: seo };

  // If someone clicked the option for a random color it'll be passed in the querystring
  if (request.query.randomize) {
    // We need to load our color data file, pick one at random, and add it to the params
    const colors = require("./src/colors.json");
    const allColors = Object.keys(colors);
    let currentColor = allColors[(allColors.length * Math.random()) << 0];

    // Add the color properties to the params object
    params = {
      color: colors[currentColor],
      colorError: null,
      seo: seo,
    };
  }

  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
});

/**
 * Our POST route to handle and react to form submissions
 *
 * Accepts body data indicating the user choice
 */
fastify.post("/", function (request, reply) {
  // Build the params object to pass to the template
  let params = { seo: seo };

  // If the user submitted a color through the form it'll be passed here in the request body
  let color = request.body.color;

  // If it's not empty, let's try to find the color
  if (color) {
    // ADD CODE FROM TODO HERE TO SAVE SUBMITTED FAVORITES

    // Load our color data file
    const colors = require("./src/colors.json");

    // Take our form submission, remove whitespace, and convert to lowercase
    color = color.toLowerCase().replace(/\s/g, "");

    // Now we see if that color is a key in our colors object
    if (colors[color]) {
      // Found one!
      params = {
        color: colors[color],
        colorError: null,
        seo: seo,
      };
    } else {
      // No luck! Return the user value as the error property
      params = {
        colorError: request.body.color,
        seo: seo,
      };
    }
  }

  // The Handlebars template will use the parameter values to update the page with the chosen color
  return reply.view("/src/pages/index.hbs", params);
});

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
```
## Funciones

Se definen como

```js
function nombreFuncion(argumentos) {
  // Blabla
}
```

## Módulos

Información sobre importar y exportar módulos en vanilla JS [[Modulos|aquí]]

module.exports es el objeto en el que pondremos todo lo que queramos exportar

```js
Module.exports.metodoEjemplo = nombreFuncion
```

Para importarlo, se usar require()

```js
const moduloEjemplo = require("path/nombreArchivo.js") // sí misma carpeta path = "./"
```

Ahora podremos hacer `moduloEjemplo.metodoEjemplo(){:js}`

Para exportar en bloque

```js
module.exports = {
   metodo1: miPrimerMetodo,
   metodo2: miSegundoMetodo
}
```

Y para importar solo algún método de un módulo

```js
const {metodo2, metodo1} = require("./nombreArchivo.js")
```

`console.Error(new Error("mi error")){:js}` nos devolverá más info

El módulo `process` nos da mucha info sobre el sistema en el que se está ejecutando 

Con `process.argv` podemos acceder a los argumentos de ejecución de la consola

`setImmediate` se ejecuta después del código síncrono

el módulo `http` nos permite crear un servidor

```js
const servidor = http.createServer((req, res) => {     })
servidor.listen(port, () => { })
```

 permite hacer peticiones `GET`, `POST`, `PUT` y `DELETE`

# Petición ajax (http request) con JS puro

```js
const myRequest = new Request("https://example.com/hello");

fetch(myRequest, {
  redirect: "follow",
  headers: {
    "Content-Type": "text/plain;charset=utf-8",
   }
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    alert(JSON.stringify(data));
  })
  .catch((error) => {
    console.error('Fetch error:', error);
  });
```

```js
myPromise
  .then((value) => `${value} and bar`)
  .then((value) => `${value} and bar again`)
  .then((value) => `${value} and again`)
  .then((value) => `${value} and again`)
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.error(err);
  });
```

# Avanzado

## child_process

Nos permite hacer uso de la consola a través del servidor (creo)

Se importa
```js 
const { exec } = require('child_process');
``` 

Y se usa así

```js 
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al ejecutar el comando: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error en stderr: ${stderr}`);
    return;
  }
  console.log(`Salida:\n${stdout}`);
});
```

# Bibliografía

[https://youtu.be/1hpc70_OoAg](https://youtu.be/1hpc70_OoAg) 

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

https://www.freecodecamp.org/espanol/news/npm-vs-npx-cual-es-la-diferencia/

https://nodejs.org/en/learn/getting-started/introduction-to-nodejs

https://glitch.com/