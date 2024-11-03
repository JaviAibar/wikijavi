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

# ES6

ES6 corresponde con ECMAScript. ECMAScript fue creada para estandarizar JS, ES6 es la 6ª versión. Como fue publicada en 2015, se la conoce también como ECMAScript 2015

## Clases

```jsx
class Car {
  constructor(name) {
    this.brand = name;
  }
}

const mycar = new Car("Ford");
```

### Métodos

```jsx
present() {
    return 'I have a ' + this.brand;
}

console.log(car.present())
```

### Herencia

```jsx
class Model extends Car {
  constructor(name, mod) {
    super(name);
    this.model = mod;
  }  
  show() {
      return this.present() + ', it is a ' + this.model
  }
}
const mycar = new Model("Ford", "Mustang");
console.log(mycar.show());
```

### Arrow (funciones lambda)

```jsx
hello = function(text) {
  return `Hello ${text}!`;
}
```

pasa a ser

```jsx
hello = (text) => {
  return `Hello ${text}$!`;
}
```

o incluso (si solo tiene una línea)

```jsx
hello = (text) => `Hello ${text}$!`;
```

En realidad si solo hay 1 arg puedes hacer

```jsx
hello = val => "Hello " + val;
```

### ⚠️ This

> [!Warning] Uso de This!
> Si usas this en una función normal, hace referencia al objeto que la llamó, si lo haces en una Arrow ==siempre== representa al objeto que define la función arrow

Ejemplos

En este caso mostrará los objetos window y button respectivamente
```jsx
class Header {
  constructor() {
    this.color = "Red";
  }

//Regular function:
  changeColor = function() {
    document.getElementById("demo").innerHTML += this;
  }
}

const myheader = new Header();

//The window object calls the function:
window.addEventListener("load", myheader.changeColor);

//A button object calls the function:
document.getElementById("btn").addEventListener("click", myheader.changeColor);
```

En este caso mostrará dos veces el objeto Header
```jsx
class Header {
  constructor() {
    this.color = "Red";
  }

//Arrow function:
  changeColor = () => {
    document.getElementById("demo").innerHTML += this;
  }
}

const myheader = new Header();


//The window object calls the function:
window.addEventListener("load", myheader.changeColor);

//A button object calls the function:
document.getElementById("btn").addEventListener("click", myheader.changeColor);
```

### Variables

`var`, `let`, and `const`

#### var

Si usas `var` fuera de una función, pertenece al ámbito `global`.

Si usa `var` dentro de una función, pertenece a esa `función`.

Si usa `var` dentro de un `bloque`, ejemplo, un bucle `for`, la variable ==todavía== estará disponible fuera de ese bloque.

#### let

Siempre de bloque

#### const 

Su valor nunca cambia. No quiere decir que sea un valor constante sino que su referencia a un valor es constante.

Por tanto NO puedes:

	Reasignar un valor constante
	Reasignar una matriz constante
	Reasignar un objeto constante

pero PUEDES:

	Cambiar los elementos de la matriz constante.
	Cambiar las propiedades del objeto constante.

### Destructurar (Destructuring)

```jsx
const vehicles = ['mustang', 'f-150', 'expedition'];

const [car, truck, suv] = vehicles;
```

Si no necesitamos el truck

```jsx
const vehicles = ['mustang', 'f-150', 'expedition'];

const [car,, suv] = vehicles;
```

Util para pasar datos (==sin orden específico==)

```jsx
const vehicleOne = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021, 
  color: 'red'
}

myVehicle(vehicleOne);

function myVehicle({type, color, brand, model}) {
  const message = 'My ' + type + ' is a ' + color + ' ' + brand + ' ' + model + '.';
}
```

## Sintaxis expandida (Spread)

Es como que extrae el contenido de los array u objetos

```jsx
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];
```

Combinando Spread con Destructuring


```jsx
const numbers = [1, 2, 3, 4, 5, 6];

const [one, two, ...rest] = numbers;
```

>[!Note] Fíjate 
>Este ejemplo asigna los numeros 1 y 2 a las varibles correspondientes, el resto los deja en un array

En el siguiente ejemplo, se combinan las propiedades de ambos objetos
```jsx
const myVehicle = {
  brand: 'Ford',
  model: 'Mustang',
  color: 'red'
}

const updateMyVehicle = {
  type: 'car',
  year: 2021, 
  color: 'yellow'
}

const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}
```

>[!Note] Fíjate
>Las propiedades iguales, se sobreescriben con la ultima, es decir, "color" de updateMyVehicle sobreescribirá a "color" de myVehicle en el objeto resultante

## Modulos (Importar librerías)

Existen 3 formas de importar librerías:

- esm (ES6) (works with import syntax — recommended)
- umd (works with `<script>` tags or RequireJS)
- cjs (works with require() syntax)

Puedes exportar una función o variable de cualquier archivo

Hay dos tipos de exportado: Por nombre (`named`) o por defecto (`default`)

### Exportar
#### Por nombre

Opción 1 (en línea)
```jsx
export const name = "Jesse"
export const age = 40
```

Opción 2 (de golpe)
```jsx
const name = "Jesse"
const age = 40

export { name, age }
```

#### Por defecto

Solo se puede uno por archivo
```jsx
const message = () => {
  const name = "Jesse";
  const age = 40;
  return name + ' is ' + age + 'years old.';
};

export default message;
```

### Importar

Dependiendo de si son por defecto o nombre se hará de una forma

#### Por nombre

Debe ser con llaves
```jsx
import { name, age } from "./person.js";
```

#### Por defecto

Sin llaves
```jsx
import message from "./message.js";
```
## Operador ternario

Funciona igual que en la mayoría de lenguajes
```jsx
authenticated ? renderApp() : renderLogin();
```

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

https://www.w3schools.com/react/react_es6.asp 