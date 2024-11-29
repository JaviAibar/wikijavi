
## Uncaught SyntaxError: The requested module './archivo.js' does not provide an export named 'funcionImportada' (at script.js:1:9)

Si usas `default`, no puedes usar llaves y viceversa (el error es el mismo)

### Opcion 1: Usar default
```js 
export default (name) => {  
    console.log(`Hey there, ${name}`);  
};
``` 

Entonces no puedes usar 
```js 
import {printMyName} from './printMyName.js';  
  
printMyName('Amol Shelke');
``` 

Y deberás ponerlo así
```js 
import printMyName from './printMyName.js';  
  
printMyName('Amol Shelke');
``` 

### Opción 2: Usar nombre
```js 
const printMyName = (name) => {  
    console.log(`Hey there, ${name}`);  
};  
  
export { printMyName };
``` 

Entonces no puedes usar 
```js 
import printMyName from './printMyName.js';  
  
printMyName('Amol Shelke');
``` 

Y deberás ponerlo así
```js 
import {printMyName} from './printMyName.js';  
  
printMyName('Amol Shelke');
``` 

## Uncaught SyntaxError: Unexpected token 'const'

Seguramente tengas un código como 

_⚠️ Código con error!_
```js 
export default const printMyName = (name) => {  
    console.log(`Hey there, ${name}`);  
};
``` 

Hay dos formas de solucionarlo

```js 
const printMyName = (name) => {
    console.log(`Hey there, ${name}`);
};

export default printMyName;

``` 

```js 
export default (name) => {
    console.log(`Hey there, ${name}`);
};

``` 


## Uncaught ReferenceError: require is not defined

Creo que hay varios posibles escenarios por los que se puede dar este error.
Pero el que conozco: 

Puede ser que sea un problema importando desde el cliente. Vamos a poner por caso que intentas importar [[Handlebars]]:

lo que puedes hacer es añadir un script al html que te genera el servidor

```html
    <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js"></script>
     <script src="/addEvent.js"></script
```

Ese archivo `addEvent.js` será el usado por el cliente. Y ahí podemos acceder al objeto ya importado mediante `window` de la siguiente manera:

```js
const Handlebars = window.Handlebars;
```

## Uncaught SyntaxError: Unexpected token 'export'

Probablemente sea porque lo estás intentando importar con una etiqueta `<script>`

## GET /assets/js/sqlite3 net::ERR_ABORTED 404 (Not Found)

Probablemente te falte la extensión

_ejemplo con error_
```js
import "./sqlite3"
```

_ejemplo corregido_
```js
import "./sqlite3.js
```