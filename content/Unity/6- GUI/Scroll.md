*Jerarquía*
![[Pasted image 20250622134643.png]]

Esta es la jerarquía necesaria para tener un menú con scroll

**ScrollList** - Es el GameObject que hace de marco y lo conecta todo, tiene como componente `ScrollRect` que asociará el `Viewport` con la `Scrollbar` (sus dos hijos)

![[Pasted image 20250622134715.png]]

**Viewport** - Representa el límite visible de la lista, lo que se salga de esa **imagen con mascara** no se verá (contiene los componentes `Image` y `Mask`)

**Contenido** - Como hijo de Viewport, tenemos a Contenido, que es el contenedor de todos los items de la lista (contiene los componentes `VerticalLayout` y `ContentSizeFitter` - hace que los hijos se ajusten)

> [!important] Importante
> Marcar el **Pivot Y de Contenido a 1** para que los items caigan desde arriba de la lista en lugar de empezar en el centro

![[Pasted image 20250622134832.png]]

Dentro de contenido ya podemos poner tantos items como queramos y con el formato que queramos