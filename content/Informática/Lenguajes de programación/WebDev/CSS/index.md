## Trucos de CSS

https://css-tricks.com/tag/css/
# Enlazado

El atributo rel es obligatorio

```html
<link href='./style.css' rel='stylesheet'> 
```
# Selectores

## Sobreescritura

el siguiente selector sobreescribe al anterior, es decir, los css se procesan de arriba a abajo, si encuentra un selector nuevo en conflicto con uno ya existente, prevalece el nuevo

```css
* { font-size:1px; }

h1 { font-size: 20px }
```

Todas los textos menos los h1 serán de 1px.

Pero si el nivel de especifidad (Specificity) es mayor, entonces prevalece ese, es decir, un id siempre va a sobreescribir una clase, y una clase siempre sobreescribirá a un elemento

## Atributos y valores

Podemos seleccionar por atributos

```css
[href]{
   color: magenta;
} 
```

Y podemos seleccionar por valores, ejemplo: imágenes que contengan la palabra "winter"

```css
img[src*='winter'] {
  height: 50px;
}

img[src*='summer'] {
  height: 100px;
}
```
## Pseudo-clases

De todos los elementos se pueden seleccionar, al menos, alguna pseudo-clases

`p:hover { background-color: darkorange; }{:css}`

El modelo de caja (BoxModel Box Model)

Los navegadores cargan elementos HTML con valores de posición predeterminados. Esto a menudo conduce a una experiencia de usuario inesperada y no deseada, al tiempo que limita las vistas que puede crear.

![[../../../../zz Media/Pasted image 20240804185309.png]]

# Util 
## centrar

margin: 0 auto;

## Posicionamientos y centrados

### [[Posicionamiento y cajas/Posicionamiento absoluto dentro de un elemento]]

[![[../../../../zz Media/Pasted image 20240804184830.png]]](Posicionamiento%20y%20cajas/Posicionamiento%20absoluto%20dentro%20de%20un%20elemento.md de programación/WebDev/CSS/Posicionamiento absoluto dentro de un elemento>)
### [[Posicionamiento y cajas/Centrado moderno]]

![[../../../../zz Media/Pasted image 20240804185405.png]]

# Bibliografía

[https://www.codecademy.com/learn/learn-css/modules/syntax-and-selectors/cheatsheet](https://www.codecademy.com/learn/learn-css/modules/syntax-and-selectors/cheatsheet)