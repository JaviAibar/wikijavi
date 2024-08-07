Para un PowerUp para Trello [[PowerUp para Trello|click aquí]]
# Importar librerías

Existen 3 formas de importar librerías:

- esm (ES6) (works with import syntax — recommended)
- umd (works with `<script>` tags or RequireJS)
- cjs (works with require() syntax)

# Sintaxis expandida (Spread)

#WIP

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