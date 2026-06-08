Existen 3 formas de importar librerías:

- esm (ES6) (works with import syntax — recommended)
- umd (works with `<script>` tags or RequireJS)
- cjs (works with require() syntax)

Puedes exportar una función o variable de cualquier archivo

Hay dos tipos de exportado: Por nombre (`named`) o por defecto (`default`)

> [!warning] No confundir con Node.js
> module.exports es de [[NodeJS]]
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

> [!warning] Cuidado con mezclar!
> Estos dos sistemas, por defecto / por nombre, no se pueden combinar de ninguna forma, tal y como se comenta en [[Tengo un problema en JS#Uncaught SyntaxError The requested module './archivo.js' does not provide an export named 'funcionImportada' (at script.js 1 9)|Tengo un problema en JS]]

# Bibliografía

https://stackoverflow.com/questions/44490627/how-to-import-export-a-class-in-vanilla-javascript-js
