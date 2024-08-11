Para un PowerUp para Trello [[PowerUp para Trello|click aquí]]

# Versiones

| Ver | Official Name                                                                       | Description                                                                                                                                                                         |
| --- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ES1 | ECMAScript 1 (1997)                                                                 | First edition                                                                                                                                                                       |
| ES2 | ECMAScript 2 (1998)                                                                 | Editorial changes                                                                                                                                                                   |
| ES3 | ECMAScript 3 (1999)                                                                 | Added regular expressions  <br>Added try/catch  <br>Added switch  <br>Added do-while                                                                                                |
| ES4 | ECMAScript 4                                                                        | Never released                                                                                                                                                                      |
| ES5 | ECMAScript 5 (2009)  <br>  <br>[Read More](https://www.w3schools.com/js/js_es5.asp) | Added "strict mode"  <br>Added JSON support  <br>Added String.trim()  <br>Added Array.isArray()  <br>Added Array iteration methods  <br>Allows trailing commas for object literals  |
| ES6 | ECMAScript 2015  <br>  <br>[Read More](https://www.w3schools.com/js/js_es6.asp)     | Added let and const  <br>Added default parameter values  <br>Added Array.find()  <br>Added Array.findIndex()                                                                        |
|     | ECMAScript 2016  <br>  <br>[Read More](https://www.w3schools.com/js/js_2016.asp)    | Added exponential operator (**)  <br>Added Array.includes()                                                                                                                         |
|     | ECMAScript 2017  <br>  <br>[Read More](https://www.w3schools.com/js/js_2017.asp)    | Added string padding  <br>Added Object.entries()  <br>Added Object.values()  <br>Added async functions  <br>Added shared memory  <br>Allows trailing commas for function parameters |
|     | ECMAScript 2018  <br>  <br>[Read More](https://www.w3schools.com/js/js_2018.asp)    | Added rest / spread properties  <br>Added asynchronous iteration  <br>Added Promise.finally()  <br>Additions to RegExp                                                              |
|     | ECMAScript 2019  <br>  <br>[Read More](https://www.w3schools.com/js/js_2019.asp)    | String.trimStart()  <br>String.trimEnd()  <br>Array.flat()  <br>Object.fromEntries  <br>Optional catch binding                                                                      |
|     | ECMAScript 2020  <br>  <br>[Read More](https://www.w3schools.com/js/js_2020.asp)    | The Nullish Coalescing Operator (??)                                                                                                                                                |

## ES6

ES6 corresponde con ECMAScript. ECMAScript fue creada para estandarizar JS, ES6 es la 6ª versión. Como fue publicada en 2015, se la conoce también como ECMAScript 2015
# Importar librerías

Existen 3 formas de importar librerías:

- esm (ES6) (works with import syntax — recommended)
- umd (works with `<script>` tags or RequireJS)
- cjs (works with require() syntax)

# Sintaxis expandida (Spread)

#WIP

# Cheatsheet
# Tengo un problema

## Uncaught ReferenceError: require is not defined

Creo que hay varios posibles escenarios por los que se puede dar este error.
Pero el que conozco: 

Puede ser que sea un problema importando desde el cliente. Vamos a poner por caso que intentas importar Handlebars:

lo que puedes hacer es añadir un script al html que te genera el servidor

```html
    <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js"></script>
     <script src="/addEvent.js"></script
```

Ese archivo `addEvent.js` será el usado por el cliente. Y ahí podemos acceder al objeto ya importado mediante windows de la siguiente manera:

```js
const Handlebars = window.Handlebars;
```


# Bibliografía

[Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

[Versiones JS](https://www.w3schools.com/react/react_es6.asp#:~:text=ES6%20stands%20for%20ECMAScript%206,also%20known%20as%20ECMAScript%202015)