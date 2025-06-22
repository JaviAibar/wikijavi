# Configuración inicial

En el `Package Manager`, si no lo encuentras buscando, le das a `Add package from git URL` y pones `com.unity.localization`

Entonces ahora existirá `Project Settings > Localization` dónde deberás crear un archivo de configuración

![[Pasted image 20250612202815.png]]

Entonces crear un locale por cada idioma que necesites

![[Pasted image 20250612202828.png]]

Seleccionar el idioma por defecto con `Specific Locale Selector > Locale Id` y más abajo `Project Locale Identifier`

![[Pasted image 20250612202838.png]]

# Localizar un asset

Sirve para que se ponga, por ejemplo un audio en un idioma en concreto o una bandera en un selector. Para ello se usan Tablas de Asset ([Asset tables](https://docs.unity3d.com/Packages/com.unity.localization@1.0/manual/AssetTables.html))

Creamos una nueva tabla desde la ventana `Window > Asset Management > Localization Tables`. Ahí en la pestaña `New Table Collection` seleccionamos para qué idiomas está disponible dicho asset, seleccionamos `Asset Table Collection` del desplegable Type y en el campo Name le damos un nombre descriptivo, seleccionamos crear y elegimos un directorio

![[Pasted image 20250612202928.png]]

Existen otras formas de hacerlo, pero en este caso usaremos sistemas Localized Property Variant para no tener que escribir ningún script

Entonces vamos a `Window > Asset Management > Localization Scene Controls` y selecciona el `Asset Table` y haz click en Track changes. Iremos cambiando el idioma y arrastramos el asset correspondiente al GameObject donde se usará (magic).

![[8NZCbzSpFuY1oUoXes42Wli-bbFahkfRDoLR4syx1Iy595-NaAjcv_ubdrLF1vZrIxGPNE9yiIzvkexF6OppPr8OdWGKmHof2suLAjWNHJ5o6_XsGJ9chmEysX2H8qOGYmat0IFZ-CEsyu2FaXtOp1aK9K-IHYdFBeXgCg=s2048.gif]]

Una vez hecho esto, si ejecutamos la escena, nos saldrá un selector de idioma y la bandera cambiará correspondientemente

Para deshabilitar este menú, simplemente hay que ir a `Edit > Preferences > Localization` y deshabilitar `Locale Game View Menu`

Para ver cómo localizar audio, [click en este enlace](https://www.google.com/url?q=https%3A%2F%2Fdocs.unity3d.com%2FPackages%2Fcom.unity.localization%401.0%2Fmanual%2FQuickStartGuideWithVariants.html%23localize-audio&sa=D&sntz=1&usg=AOvVaw2HbUzdzIFdlmZWuXrscotB)

# Texto estático (el de los menús)

Crea una `String Table Collection`

![[Pasted image 20250612203121.png]]

Además de cambiar el texto, también podrías hacer otros cambios como de fuente (podria ser importante para textos no ASCII, como el egipcio antiguo

_Funciona igual que las banderas pero seleccionando la `String Table`_

![[Pasted image 20250612203152.png]]

# Texto dinámico (el que usa variables)

Al igual que el estático, hay que crear una tabla de strings o utilizar una que ya tengamos

Hay varias formas de hacerlo, global o local.

## Local

Deberemos buscar el componente `Game Object Localizer` y agregar una nueva `Local Variable`

*Al contrario de lo que dice la guía de Unity, el script no tiene por qué estar en el mismo GameObject, pero sí tener una referencia al componente como veremos 2 imágenes más abajo*

![[Pasted image 20250612203233.png]]

Debe ser de tipo `Object Reference` para que pueda leer la String

![[Pasted image 20250612203248.png]]

> [!Warning] Es fundamental que se arrastre el **componente** y no el GameObject que lo contiene, como hacemos de normal

_Para ver qué hay que escribir para añadir las variables, al final, ahora veremos las globales porque se usan en el ejemplo final_

# Global

Para poder incluir variables globales, vamos a crear un nuevo Asset. `Botón derecho > Create > Localization > Variables Group `

Lo editamos desde el `Inspector` añadimos variable de String para una variable estática de texto ~~u Object Reference para alojar un Script (variables del código)~~. Esto último no me ha funcionado, debe estar bug porque sino, para qué existe si quiera. Lo que me ocurría es que tras asignarlo, me desaparecía.

Entonces iremos a `Project Settings > Localization
`
Desplegamos `String Database` y dentro de este `Smart Format` y damos a `+` en `Global Variables`

Damos nombre y arrastramos el archivo que acabamos de crear

![[Pasted image 20250612203721.png]]

![[Pasted image 20250612203724.png]]

Y de la misma forma que llevamos añadiendo idiomas (con el Track Changes y demás, [mirar Localizar un Asset en (esta misma página)](https://sites.google.com/view/wikijavi/unity/lo-b%C3%A1sico/localization#h.v0h3d11zdy7q)). pero esta vez le añadimos las variables de la siguiente forma:

# Reutilizar un campo traducido

Me refiero a una traducción ya almacenada (p.e. "atrás" lo tienes traducida ya a varios idiomas).

En la ventana `Window > Asset Management > Localization Tables` tenemos las traducciones y la clave correspondiente, por ejemplo:

![[Pasted image 20250612203751.png]]

Dicho código lo podremos poner en un GameObject Text de la siguiente forma:

En el `Text` recién creado, le damos botón derecho en el componente de texto y hacemos click en `Localize`. Esto creará una serie de cosas automáticamente, entre ellas, el componente que nos interesa: `Localize String Event`

![[Pasted image 20250612203820.png]]

En dicho componente, tendremos que seleccionar del desplegable `String Reference` y dentro de la sección que corresponda (Las secciones son [String Tables de las cuales hemos hablado aquí](https://sites.google.com/view/wikijavi/unity/lo-b%C3%A1sico/localization#h.v0h3d11zdy7q), pero [más concretamente aquí](https://sites.google.com/view/wikijavi/unity/lo-b%C3%A1sico/localization#h.17xae3ijl8gm)) y dentro, la clave de la que hablabamos, teniendo en cuenta, si es el caso, de añadir las dependencias [de las que hemos hablado anteriormente](https://sites.google.com/view/wikijavi/unity/lo-b%C3%A1sico/localization#h.7dw4pu67nfah)

![[Pasted image 20250612203832.png]]

# Acceder a una traducción desde código

Ejemplo [[Obtener una traducción usando Localization de Unity|aquí]]

# Selección de idioma

Ejemplo disponible [[Selección de idioma Dropdown|aquí]]

# Build

Para poder hacer la build hace falta componer los `Addressables`. 

```
Window > Asset Management > Addressables > Groups
```

Y ahí `Build > New Build > Default Build Script`

![[Pasted image 20250612204051.png]]

# Bibliografía

[https://docs.unity3d.com/Packages/com.unity.localization@1.0/manual/QuickStartGuideWithVariants.html](https://docs.unity3d.com/Packages/com.unity.localization@1.0/manual/QuickStartGuideWithVariants.html)