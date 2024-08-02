# Intro

Para la [guía de estilos aquí](https://sites.google.com/view/wikijavi/inform%C3%A1tica/lenguajes-de-programaci%C3%B3n/web-development/react/gu%C3%ADa-estilos-react?authuser=0)

Puedes empezar a trabajar con él importando las librerías. Además hay un par de cosas más recomendadas aquí tienes todo

```html
<html>
    <head>
        <link rel="stylesheet" href="index.css">
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
        <script crossorigin src="..."></script>
        <!-- Production links
         <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
-->
    </head>
    <body>
        <h1>Hello, React!</h1>
        <div id="root"></div>
        <script src="index.js" type="text/babel"></script>
    </body>
</html>
```

Supongo que para evitar que tu pág caiga si cae el CDN, es recomendable instalar React en tu proyecto. 

Para ello, podrías utilizar npm (o el sistema que tengas, nginx, por ejemplo), borrar las referencias e importar 

```js
import React from "react"
import ReactDOM from "react-dom/client"
```

Aunque parece que en la v17 ya no es necesario 

# Hola mundo

Podemos insertar """html""" directamente desde js gracias a la siguiente línea

```jsx
ReactDOM.render(<h1>Hola a todos</h1>, document.getElementById("root"))
```

Sin embargo, desde la v18 `ReactDOM.render{:js}` está obsoleto

por lo que ahora se hace así

```jsx
ReactDOM.createRoot(document.getElementById("root")).render(<h1>Hola a todos</h1>)
```

# Qué es?

Funciona con jsx, que parece html pero en realidad es js. puedes hacer 

```jsx
var h1 = <h1>hola mundo</h1>
console.log(h1)
```


Te mostrará por consola un objecto js con sus métodos y cosas

Está basado en los componentes, pueden ser minúsculos o páginas enteras

Los componentes son funciones JS que devuelven jsx

```jsx
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```

Ese botón que acabamos de crear, lo podemos usar en otros componentes

```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
# Pasar datos desde dentro del componente al padre

`Compo`, padre de `MiComponente`
```jsx
import { useRef } from "react";
import MiComponente from "./MiComponente"

const Compo = () => {
  const miComponenteRef = useRef();

  const manejarEjecutar = (texto) => {
    console.log(`text ${texto}`)
    console.log('Función ejecutada desde el componente padre');
  };
  
  return (
    <div>
      <MiComponente onEjecutar={manejarEjecutar} />
    </div>
  );
};

export default Compo;
```

`MiComponente` hijo de `Compo`
```jsx
import { useState } from 'react';

const MiComponente = ({ onEjecutar }) => {
  const miMetodo = () => {
    onEjecutar("Método ejecutado desde dentro del componente");
  };

  return (
    <div>
      <h1>MiComponente!</h1>
      <button onClick={miMetodo}>Ejecutar Método</button>
    </div>
  );
};

export default MiComponente;
```

# Estructura

La mayoría de elementos estarán en la carpeta `src/`

El `index.html` (fuera de `src`) carga la raíz de la app `src/index.jsx`

`index.jsx` a su vez carga `src/app.jsx` que carga los componentes React. El proyecto de Glitch carga `wouter` como enrutador

# Bibliografía

[https://react.dev/learn](https://react.dev/learn)

https://v2.scrimba.com/learn-react-c0e 