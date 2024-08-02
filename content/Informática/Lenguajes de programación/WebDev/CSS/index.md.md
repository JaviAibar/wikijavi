# Enlazado

El atributo rel es obligatorio

<link href='./style.css' rel='stylesheet'> 

# Selectores

## Sobreescritura

el siguiente selector sobreescribe al anterior, es decir, los css se procesan de arriba a abajo, si encuentra un selector nuevo en conflicto con uno ya existente, prevalece el nuevo

* { font-size:1px; }

h1 { font-size: 20px }

Todas los textos menos los h1 serán de 1px.

Pero si el nivel de especifidad (Specificity) es mayor, entonces prevalece ese, es decir, un id siempre va a sobreescribir una clase, y una clase siempre sobreescribirá a un elemento

## Atributos y valores

Podemos seleccionar por atributos

[href]{

   color: magenta;

} 

Y podemos seleccionar por valores, ejemplo: imágenes que contengan la palabra "winter"

img[src*='winter'] {

  height: 50px;

}

  

img[src*='summer'] {

  height: 100px;

}

## Pseudo-clases

De todos los elementos se pueden seleccionar, al menos, alguna pseudo-clases

p:hover { background-color: darkorange; }

El modelo de caja (BoxModel Box Model)

Los navegadores cargan elementos HTML con valores de posición predeterminados. Esto a menudo conduce a una experiencia de usuario inesperada y no deseada, al tiempo que limita las vistas que puede crear.

![](https://lh5.googleusercontent.com/0KCJnclMfH1Hwum2QlDdCPt8ftSQwvAblE0_RRNyx6EgNnIU_ahYSRp8yvgs5sc4ITcacce44l9dctdUI-9tp7I5yWhtqmtJS6liZDbwy5_hg-3Fmyo1gLt6_76KouhEew=w1280)

# Util 
## centrar

margin: 0 auto;

## Posicionamientos y centrados

### [[Posicionamiento absoluto dentro de un elemento]]

[![](https://lh6.googleusercontent.com/741eORzfvBBk49E-wBbX4xFDvpBT_Gpvu6kPDtTWjdAFgDv9jcT_ZpeYa_CmDQ157uMIdl-e3al8qN5UB2ZS8lMHnHey8enHa3moGUoJ2o8=w1280)](<Informática/Lenguajes de programación/WebDev/CSS/Posicionamiento absoluto dentro de un elemento>)

### [[Centrado moderno]]

![](https://lh6.googleusercontent.com/RSNGTWBi7G1L_uRtEIJBorlJZWq3Pekm92kWTtajSXpweQEsNMU4ENBimbsyB5utzNqoeiQ7N5eEKUSgK1PDBhQ=w1280)

# Bibliografía

[https://www.codecademy.com/learn/learn-css/modules/syntax-and-selectors/cheatsheet](https://www.codecademy.com/learn/learn-css/modules/syntax-and-selectors/cheatsheet)