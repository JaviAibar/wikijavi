# Intro

Utiliza [[JS JavaScript/index#ES6|ES6]]

Tiene varias opciones:

*

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

# Crear un nuevo proyecto

Existen varias opciones
## Next.js

Con el siguiente comando creas un nuevo proyecto `Next.js` que está basado en [Next.js' Pages Router](https://nextjs.org/) que es un `framework full-stack` de React

```shell
npx create-next-app@latest
```

## Remix

Es un `framework full-stack` de React con enrutado anidado. Las partes anidadas pueden cargar datos en paralelo

```shell
npx create-remix
```

## Gatsby

Creo que es para `CMS`. Tiene muchos `plugins` y los datos con `GraphQL`

```shell
npx create-gatsby
```

## Expo

Aplicaciones nativas en `Android, iOS y webapps`

```shell
npx create-expo-app
```
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

Se importa con `import MyApp from "./MyApp"{:jsx}` (no es necesario incluir la extensión del archivo, porque es por defecto)
## Cambiar de CDN a la instalación

Supongo que para evitar que tu pág caiga si cae el CDN, es recomendable instalar React en tu proyecto. 

Para ello, podrías utilizar npm (o el sistema que tengas, nginx, por ejemplo), borrar las referencias e importar 

```js
import React from "react"
import ReactDOM from "react-dom/client"
```

Sin embargo, no puedes importar los módulos así tal cual. Aparentemente porque el navegador no entiende los módilos ES6 (ESM) de JavaScript sin procesamiento previo. Para lo cual podemos utilizar [[ViteJS]] entre otros.

El `package.json` quedaría por tanto así (ejemplo con [[NodeJS]])

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

Entonces en el `index.html` tenemos que incluir los archivos React utilizando `type="module{:html}`

```html
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="index.css">
</head>

<body>
    <h1>Hello, React!</h1>
    <div id="root"></div>
    <script type="module" src="index.jsx"></script>
</body>
</html>
```

El archivo `index.jsx` contiene lo siguiente

```jsx
import React from "react"
import { createRoot } from 'react-dom/client';

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello, world</h1>);
```

# Cargar y usar recursos

Se hace también con `import`

```jsx
import logo from "./images/logo.png"
import "./style.css"
```

Se pueden usar entre llaves

```jsx
<img src={logo}></img>
```

>[!NOTE] Nota
>Ese css que acabamos de cargar podrá utilizarse en todos los componentes que se incluyan a partir de aquí, es decir, los componentes hijos también recibirán el efecto

# Datos

La información en react siempre pasa de arriba hacia abajo

Se diferencia prop de estado. 

* Prop es lo que baja a los componentes hijos y/o se puede calcular en base a otros datos
* Estado es lo que cambia con el tiempo

## prop

Este es un dato que se pasa a los hijos

```jsx
function Square({ value }) {
  return <button className="square">{value}</button>;
}
```

```jsx
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <!-- ... -->
    </>
  );
}
```


## Guardar estado (useState)

Se gestiona mediante el estado, usando el `hook` `useState`

Y cada componente será independiente, por ejemplo si tenemos `<><Square /><Square /></>{:jsx}` cada componente Square tendrá su propio estado

```jsx {1,4,7}
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}>
      {value}
    </button>
  );
```

# Interactividad

```jsx
function Square({ value }) {
  function handleClick() {
    console.log('¡hiciste clic!');
  }

  return (
    <button
      className="square"
      onClick={handleClick}>
      {value}
    </button>
  );
}
```

> [!warning] Cuidado
> La función que pasas a onClick debe ser sin paréntesis, ya que por temas de actualización de los componentes , probablemente acabes causando un **bucle infinito**.
> Para pasar argumentos, deberás usar la forma `onClick={() => handleClick("mi argumento")}{:jsx}`



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

# Estructura en Glitch

La mayoría de elementos estarán en la carpeta `src/`

El `index.html` (fuera de `src`) carga la raíz de la app `src/index.jsx`

`index.jsx` a su vez carga `src/app.jsx` que carga los componentes React. El proyecto de Glitch carga `wouter` como enrutador

# Bibliografía

[https://react.dev/learn](https://react.dev/learn)

https://v2.scrimba.com/learn-react-c0e 