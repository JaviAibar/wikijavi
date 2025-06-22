# World

Se sigue el siguiente orden para decidir en qué orden se dibujan los sprites:

1. `Sorting Group` que explicaré luego

2. Se comprueba el `Sorting Layer` (cuánta más baja sea su ubicación, o dicho de otra forma, cuanto mayor el índice del layer, más próximo a la cámara se dibujará)

![[Pasted image 20250622185034.png]]

2. el `Order in Layer`: A empate de `Sorting Layer`, se emplea el `Order in Layer` para decidir cuál se muestra por encima de cuál

3. En caso de empate tanto en `Sorting Layer` como en `Order in Layer`, se emplea la `Z` del `Transform` (estando la cámara en la posición por defecto, a más negativa la `Z` (hasta -21, inclusive) más cerca; y viceversa).

> [!note]
> Creo que si hay `Sorting Group`, lo que hace es **sobreescribir** los valores de `Sorting Layer` y `Order in Layer` del grupo (`Sprite Renderer` en el que se encuentra y todos los hijos).

![[Pasted image 20250622185211.png]]

# Canvas

Por defecto `Canvas Overlay` es el que más cercano se dibuja, `Canvas World` se dibuja en medio y `Camera Canvas` se dibuja al fondo

El `Canvas World` se comporta como un `Sprite Renderer`, en el sentido explicado en sección *World*

Tanto `World` como `Camera Canvas` puede cambiar el `Order in Layer` para verse dibujados en otro orden, pero nunca por encima del `Overlay` y viceversa, `Overlay` no puede estar nunca por detrás de los otros dos tipos de `Canvas`, el `Order in Layer` en este caso solo sirve para interacción entre otros `Overlay`

![[Pasted image 20250622185332.png]]