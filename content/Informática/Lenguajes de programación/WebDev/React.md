# Intro

Utiliza [[JS JavaScript/index#ES6|ES6]]

Tiene varias opciones:

Funciona con [[NodeJS]] 

Crea un ==DOM virtual== para editar lo que necesite y luego al DOM del navegador, así cambiar ==solo== lo necesario

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

>[!Note] Fíjate
>Las funciones createRoot() y render() hacen que el DOM se actualice
>
>Creo que createRoot() crea el VDOM y render() lo aplica
 
# Qué es JSX?

Parece html pero en realidad es js. puedes hacer 

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

## Condicionales

Siempre ==fuera== del JSX

```jsx
const x = 5;
let text = "Goodbye";
if (x < 10) {
  text = "Hello";
}

const myElement = <h1>{text}</h1>;
```

o dentro de llaves con el ==operador ternario==

```jsx
const x = 5;

const myElement = <h1>{(x) < 10 ? "Hello" : "Goodbye"}</h1>;
```

Un ejemplo eligiendo qué [[#Componente de Función|componente]] renderizar

```jsx
function Goal(props) {
  const isGoal = props.isGoal;
  if (isGoal) {
    return <MadeGoal/>;
  }
  return <MissedGoal/>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Goal isGoal={false} />);
```

Otra forma

```jsx
function Goal(props) {
  const isGoal = props.isGoal;
  return (
    <>
      { isGoal ? <MadeGoal/> : <MissedGoal/> }
    </>
  );
}
```

### Operador lógico &&

Solo si la condición es verdadera, carga lo de la derecha del `&&`
```jsx
function Garage(props) {
  const cars = props.cars;
  return (
    <>
      <h1>Garage</h1>
      {cars.length > 0 &&
        <h2>
          You have {cars.length} cars in your garage.
        </h2>
      }
    </>
  );
}

const cars = ['Ford', 'BMW', 'Audi'];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage cars={cars} />);
```

## Particularidades

Se debe usar `className` en lugar de `class` porque `class` es una palabra clave reservada en JS
# Cambiar de CDN a la instalación

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

# Qué es exactamente un componente?

Son los bloques en los que se forma la app React.

Son funciones JavaScript pero que trabajan de forma aislada y devuelven HTML

Hay dos tipos: `de clase` y `de función`. Parece que los de clase están un poco obsoletos, así que vamos solo con los de función. Más info aquí https://www.w3schools.com/react/react_class.asp

## Componente de Función

Tienen este formato
```jsx
function Car() {
  return <h2>Hi, I am a Car!</h2>;
}
```

Se renderizan así
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

Los componentes se pueden pasar como [[#prop]]s (abreviado de propiedades)

Para pasar el componente a un archivo separado, el nombre de archivo debe estar con mayúscula y exportar la función

```jsx
function Car() {
  return <h2>Hi, I am a Car!</h2>;
}

export default Car;
```

Entonces deberás importar el componente allá donde lo uses

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Car from './Car.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
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

Los componentes se pueden pasar como `props` (abreviado de propiedades)

Este es un dato que se pasa a los hijos, son como argumentos de función y los envías a los componentes como atributos

```jsx
function Square(props) {
  return <button className="square">{props.value}</button>;
}
```

El valor `value` se podría haber obtenido (tal y como vimos en [[Informática/Lenguajes de programación/WebDev/JS JavaScript/index#Destructurar (Destructuring)|Destructurar de ES6]]) directamente así:

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

Si quieres pasar un valor que no sea estático, puedes hacerlo con llaves (pasamos `carName` en lugar de "Ford"), ampliable a objeto: `const carInfo = { name: "Ford", model: "Mustang" };` y luego pasaríasmos `{carInfo}`


```jsx
function Car(props) {
  return <h2>I am a { props.brand }!</h2>;
}

function Garage() {
  const carName = "Ford";
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Car brand={ carName } />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
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

# Bucles

El método favorito es map
```jsx
function Car(props) {
  return <li>I am a { props.brand }</li>;
}

function Garage() {
  const cars = ['Ford', 'BMW', 'Audi'];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => <Car brand={car} />)}
      </ul>
    </>
  );
}
```

## Claves

Son la forma que tienen React de realizar un seguimiento de los elementos, así actualizar exclusivamente aquellos que cambien o se eliminen

Las claves deben ser únicas entre sus hermanos pero pueden se pueden repetir de forma global (como la `i` de un `for`)

Por lo visto, lo mejor sería utilizar ID únicos siempre que puedas, pero como último recurso, se puede utilizar el índice del array

```jsx
function Garage() {
  const cars = [
    {id: 1, brand: 'Ford'},
    {id: 2, brand: 'BMW'},
    {id: 3, brand: 'Audi'}
  ];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => <Car key={car.id} brand={car.brand} />)}
      </ul>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
```

> [!Info] Cómo sé si lo necesito?
> 
> Si lo necesitas, es decir, en el contexto que estás es irremediable usarlo, React te mandará errores
# Interactividad / Eventos

onClick es con cammelCase al contrario que en js (onclick)

Si pasas el método, se hace con llaves y sin paréntesis
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
> La función que pasas a onClick debe ser ==sin paréntesis==, ya que por temas de actualización de los componentes , probablemente acabes causando un **bucle infinito**.
> 
> 

Para pasar argumentos, deberás usar la forma `onClick={() => handleClick("mi argumento")}{:jsx}`

```jsx
function Football() {
  const shoot = (a) => {
    alert(a);
  }

  return (
    <button onClick={() => shoot("Goal!")}>Take the shot!</button>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football />);
```

## Objeto event

lo conseguimos pasándolo por el método Arrow
```jsx
function Football() {
  const shoot = (a, b) => {
    alert(b.type);
    /*
    'b' represents the React event that triggered the function,
    in this case the 'click' event
    */
  }

  return (
    <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football />);
```

## Formularios (Forms)

Los datos se manejan con [[#Guardar estado (useState)|useState]] 

### inputs y submit

```tsx
import {FormEvent, useState} from 'react';  
import ReactDOM from 'react-dom/client';  
  
export default function MyForm() {  
    const [name, setName] = useState("");  
  
    const handleSubmit = (event:FormEvent) => {  
        event.preventDefault();  
        alert(`The name you entered was: ${name}`)  
    }  
    return (  
        <form onSubmit={(event) => handleSubmit(event)}>  
            <label>Enter your name:  
                <input  
                    type="text"  
                    value={name}  
                    onChange={(e) => setName(e.target.value)}  
                />  
            </label>            
            <input type="submit" />  
        </form>    )  
}
``` 

>[!Warning] Cambios en TypeScript
>Debido a que este ejemplo está en TypeScript, se han tenido que añadir el evento FormEvent

Para añadir múltiples campos, se usa el atributo name

```jsx
function MyForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
      <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your age:
        <input 
          type="number" 
          name="age" 
          value={inputs.age || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
  )
}
```

> [!info] handleChange
> Los atributos name y value de cada input se obtienen de `event.target`
> Luego esos valores, se utilizan para **añadir (o actualizar)** un campo en el `useState` mediante `setInputs`. Lo que creo que está pasando exactamente es que los 
> valores de `values` se mantienen gracias a `...values`, y poniendo `[name]: value`, se crea o actualiza el que corresponda con `name` dentro de `inputs`

>[!warning] cambios para TypeScript
> para acceder al name y value, event tiene que ser de tipo `ChangeEvent<HTMLInputElement>` y están en `event.currentTarget.name` y `event.currentTarget.value`

## Textarea

```jsx
<textarea>
  Content of the textarea.
</textarea>
```

```jsx
<form>
      <textarea value={textarea} onChange={handleChange} />
    </form>
```

## Select

```html
<select>
  <option value="Ford">Ford</option>
  <option value="Volvo" selected>Volvo</option>
  <option value="Fiat">Fiat</option>
</select>
```

```jsx
 const [myCar, setMyCar] = useState("Volvo");

  const handleChange = (event) => {
    setMyCar(event.target.value)
  }

  return (
    <form>
      <select value={myCar} onChange={handleChange}>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
      </select>
    </form>
  )
```

# Router

Por defecto no está instalado

```shell
npm i -D react-router-dom
``` 

### Estructura de carpetas

`src\pages\`:

- `Layout.js`
- `Home.js`
- `Blogs.js`
- `Contact.js`
- `NoPage.js`
# Casos concretos
## Pasar datos desde dentro del componente al padre

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