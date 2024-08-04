Para un PowerUp para Trello [[PowerUp para Trello|click aquí]]

NodeJS es también JS pero para el servidor y orientado a eventos asíncronos

Permite el uso de package.json donde podemos indicar los framework y librerías que son dependencias del proyecto.

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
## Funciones

Se definen como

```js
function nombreFuncion(argumentos) {
  // Blabla
}
```

Definir un módulo

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

# Bibliografía

[https://youtu.be/1hpc70_OoAg](https://youtu.be/1hpc70_OoAg) 

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)