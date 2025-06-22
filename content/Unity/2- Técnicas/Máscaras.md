# UI

Para crear una máscara en la UI necesitamos el componente `Mask` o `RectMask2D` **(no confundir con Sprite Mask)**. El componente `Mask` utiliza un Stencil Shader para enmarcar los componentes de la interfaz. `RectMask2D` solo puede enmascarar en forma rectangular, pero parece ser más eficiente. 

**Para que se aplique la máscara, la imágen (o componente en general) tiene que ser hija de esta.**

![[Pasted image 20250612193628.png]]

# Mundo

Necesitamos el GameObject `Sprite Mask` del menu 2D.

En el campo `Sprite` de dicho gameobject, se le pone la imagen de la cual tomará la forma para hacer la máscara

![[Pasted image 20250612193648.png]]

En el resto de `GameObjects Sprite`, vamos al componente `Sprite Renderer` y podemos editar cómo se comportará con respecto a la mascara gracias a la propiedad `Mask Interaction`

![[Pasted image 20250612193713.png]]

## Ajustes

**Alpha Cutoff** sirve para determinar hasta qué punto muestra usando una máscara semitransparente

![[Pasted image 20250612193734.png]]

![[Pasted image 20250612193738.png]]

![[Pasted image 20250612193741.png]]

Creo que por defecto, las `Sprite Mask` afectan a todo `Sprite Renderer` que tenga activada la interacción, creando este efecto:

![[Pasted image 20250612193758.png]]

Para solucionar este problema se puede activar `Custom Range` en las correspondientes `Sprite Mask`

Y elegir si prefieres discriminar por `Sorting Layer` o por `Order in Layer`

Bajo la siguiente configuración (Steven Estella tiene `Order in Layer` = 0) se aplica solo a los `Sprite Renderer` con `Sorting Layer = 0`

![[Pasted image 20250612193841.png]]

Por tanto, podemos poner a Steven Rombo a `Sorting Layer = 1` y, pese a tener un `Sorting Layer` superior  a Steven Estrella quedar por encima , al no afectarle la máscara estrella, la parte baja de la estrella ya no se renderiza y queda así.

![[Pasted image 20250612193906.png]]

Si por el contrario no quieres emplear los `Order in Layer` porque, simplemente no te encaja está la alternativa de los `Sorting Layers` que permite crear grupos de `Sprite Renderers` a los cuales se aplicarán las máscaras seleccionadas.

*Para volver a la situación anterior, pondremos todos los Order in Layer a 0*

Para ello tenemos que crear 2 grupos que voy a llamar "Estrella" y "Rombo"

![[Pasted image 20250612193936.png]]

Aplicamos tanto a la Sprite Mask como al Sprite Renderer la capa correspondiente y listo

![[Pasted image 20250612193945.png]]

![[Pasted image 20250612193948.png]]

![[Pasted image 20250612193950.png]]

![[Pasted image 20250612193953.png]]

![[Pasted image 20250612193956.png]]

