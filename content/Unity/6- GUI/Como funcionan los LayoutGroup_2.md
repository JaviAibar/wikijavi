Usamos como ejemplo el Vertical Layout Group (abreviado como VLG y Layout Group como LG).

## Child Force Expand

Le ponemos 2 imágenes (con Child Force Expand y 5 px de Spacing para que se vea)

![[Pasted image 20250715210948.png]]

`Child force expand` estira los objetos para que se distribuyan el espacio total del padre, el `Spacing` pone un poco de espacio entre los elementos

Este modo, sin embargo, también nos permite modificar el tamaño de los elementos, que se distribuirán también ese nuevo espacio libre. En esencia, estamos añadiendo espaciado (Spacing)

![[Pasted image 20250715211302.png]]

Si decidiéramos en este punto desactivar el `Child force expand` (vertical), lo que harán será apilarse

![[Pasted image 20250715211451.png]]

## Control Child Size

Básicamente le indica que el tamaño de este elemento debe ser contrado con un `Layout Element`

Teniendo de nuevo activado el Child Force Expand (Height), si activamos Control Child Size (Height) lo que ocurre es que nos reestablece la altura de los elementos a como la teníamos (ocupando el alto completo)

![[Pasted image 20250715211831.png]]

![[Pasted image 20250715211845.png]]

Y si quitamos el `Child Force Expand`, parece que desaparezcan (porque Height=0)

Por tanto, si `Child Force Expand` y `Control Child Size` están activados, el `Vertical Layout Group` controlará el tamaño de sus hijos. Sin embargo, si el Expand está desactivado, El VLG buscará un `Layout Element`, si no lo encuentra, pondrá la altura a 0
# Layout Element

Le indica a Unity como se debe mostrar un GO específico en un LG. Y permite que ciertas áreas tengan más prioridad que otras

## Min Height

Con Min Height indicamos el mínimo (por tanto volvemos a ver nuestra imagen)

## Preferred Height

y al indicar el Preferred, intenta expandirse, ocupando más espacio que el resto hasta intentar cubrir dicho valor

## Orden

Los LG intentarán cubrir primero con los min size, luego el espacio restante lo divide entre los elementos marcados como `preferred`

## Flexible Size
La config con `Flexible size` consiste en la cantidad de espacio relativa adicional que el Layout Element debería rellenar relativo a sus hermanos. 

## Conclusión

Creo que esto quiere decir que, tras haber cumplido con el Min y el Preferred, si todavía queda espacio, se añade de esa forma en concreto. Básicamente añade una capa extra de control que normalmente no hace falta usar

# Bibliografía

https://youtu.be/HwdweCX5aMI?t=364