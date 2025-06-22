Por simplicidad, ya que existen varios tipos, hablaremos en términos del Vertical Layout Group, pero se puede aplicar al resto

Este componente sitúa los elementos uno encima de otro, diviendo por defecto el espacio disponible entre los elementos, independientemente de su tamaño


| ![[Pasted image 20250622135138.png]] | ![[Pasted image 20250622135141.png]] |
| ------------------------------------ | ------------------------------------ |
|                                      |                                      |
# Ajustes

![[Pasted image 20250622135155.png]]


| ![[Pasted image 20250622135205.png]] | ![[Pasted image 20250622135209.png]] |
| ------------------------------------ | ------------------------------------ |
|                                      |                                      |

## Spacing

espacio **entre** elementos


| ![[Pasted image 20250622135227.png]] | ![[Pasted image 20250622135229.png]] |
| ------------------------------------ | ------------------------------------ |
|                                      |                                      |

## Child Alignment

Básicamente es la posición del pivote para el conjunto de elementos. Ejemplo con `Abajo derecha`, en vez del por defecto `Arriba izquieda`

![[Pasted image 20250622135258.png]]

## Control Child Size

Activa o desactiva que LayoutGroup controle el ancho y alto de los hijos. 


> [!Warning] CUIDADO
> Si Child Force Expand está activado hará que ocupen todo el espacio deformando los objetos (me pasó en el ejemplo xD)

Creo que para que funcione bien se tiene que activar `Child Force Expand` o añadir un `Element Layout` para ajustar el tamaño

*Ejemplo con ambos activados*
![[Pasted image 20250622135348.png]]

Para ilustrar mejor si esto tiene alguna clase de uso podemos dejar el alto para que se autoajuste con el tamaño del padre (Vertical Layout Group) y quitar el ancho para que el tamaño dependa de los hijos.

Partiendo de esta posición hacemos lo dicho: mantener alto y quitar ancho.

![[Pasted image 20250622135405.png]]

  
Aumentando alto y dismenuyendo el alto del padre, se ve como se ha ajustado el alto (sigue ocupando todo el espacio) y el ancho permanece fijo (se sale del marco del padre)

![[Pasted image 20250622135416.png]]

## Use Child Scale

Sirve para objetos que tengan una escala definida. La cosa es que si un objeto tiene una escala diferente de x=1 y=1 irá mal. Activando esta opción, los considerará como toca. Para el ejemplo se ha puesto el círculo con una escala de x=2 y=2

Fíjate que en el de la izquieda el círculo y el texto están superpuestos

| Sin `Use Child Scale`                | Con `Use Child Scale`                |
| ------------------------------------ | ------------------------------------ |
| ![[Pasted image 20250622135453.png]] | ![[Pasted image 20250622135457.png]] |

## Child Force Expand

Hace que los hijos ocupen todo el tamaño del padre

# Controladores del Layout / Layout Controllers

## Min Width

## Min Height

## Preferred Width

## Preferred Height

## Flexible Width

## Flexible Height

## Layout Priority

# Usos comunes

## Poner límite máximo de tamaño

Según parece hay que poner el `Prefered Size` al tamaño que quieres, `Flexible Size a 0` y **desmarcar** `Child Force Expand` del padre

## Quiero que se vea como en un movil aunque la pantalla sea demasiado ancha

Empleando el concepto que hemos visto en Poner límite máximo de tamaño, vamos a meter el elemento a limitar dentro de un padre, al cual le vamos a añadir un horizontal layout para poder emplear el Layout Element, que nos permitirá controlar los limites

Este es el estado inicial, vamos a ajustar los botones!

![[Pasted image 20250622135702.png]]

Como avanzabamos, metemos el elemento en un padre con el Preset de ocupar al padre al completo

![[Pasted image 20250622135713.png]]

Mismo preset para el hijo

![[Pasted image 20250622135721.png]]


Añadimos un `Horizontal Layout` al padre y lo centramos en el Child Alignment

![[Pasted image 20250622135730.png]]

`Control Child Size` de ambos para reajustar y nos adelantamos quitando el `Child Force Expand` del ancho, para que luego el `Preferred Width` del hijo tenga efecto

![[Pasted image 20250622135805.png]]

Añadimos el `Layout Element` en el hijo y se asignamos el mínimo, el máximo y ==**MUY IMPORTANTE==,** para que el máximo funcione poner `Flexible Width a 0`

![[Pasted image 20250622135814.png]]