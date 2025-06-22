# Menu Particle System

Algunos de estos valores tiene una flechita a la derecha para aleatorizar la cosa.

**Duration**: Segundos que dura un ciclo, si quitas el `loop`, una vez pasados dichos segundo, dejarán de aparecer nuevas particulas.

**Prewarm**: (necesario tener `Looping` activado) Para que al comenzar, aparezcan ya las primeras partículas en vez de esperar a que se vayan generando.

**Start lifetime**: tiempo inicial que durará cada particula antes de desaparecer. (ese inicial me da que pensar que tal vez haya algún valor que permita aumentar después el tiempo de vida según las partículas se reproducen).

**Start speed**: Velocidad.

**3D start size**: escalar en x, y o z.

**Start size**: escalar en todos los ejes simultáneamente.

**Start color**: Seleccionas el color (no tinte) inicial de la particula. Cuidado porque este color se mezclará con lo que selecciones en `Color over lifetime`.

**Flip rotation**: Causa que algunas partículas roten en el sentido opuesto.

**Gravity**: Para aplicar físicas.

**Simulation space**: 

- **Local**: Controla si las particulas se animan con el espacio local del objeto, por tanto con el objeto padre. 
    
- **World**: lo mismo pero en el espacio del mundo.
    
- **Custom**: Relativo a un objeto personalizado (se mueve con un objeto de tu elección).
    

**Scaling mode**:

- **Local**: Solo aplica la escalo del transform del sistema de partículas ignorando cualquier padre.
    
- **Shape**: Aplica la escala de la posición inicial de las partículas pero no afecta a su tamaño.
    

**Emitter velocity**: Si el sistema de partículas está en movimiento qué se debe usar para calcular la velocidad, el `Rigidbody` o el `transform`?

**Stop action**: Cuando acabe el ciclo, qué debe ocurrir con el sistema de particulas?

## Shape

Forma en la que se esparcen las particulas. Aquí también se controla el tamaño, la posición y rotación de las particulas

**Shape**: Las particulas se repartiran equitativamente en la forma seleccionada.

Obviando las evidentes:

**Sprite**: Se esparcirá en la forma del sprite

![[Pasted image 20250622133442.png]]

![[Pasted image 20250622133450.png]]

> [!warning] La textura tiene que estar en modo `Sprite (2D and UI)`

**Mesh / Mesh renderer**: Las particulas se dirigirán en dirección a las normales de las caras y saliendo de la propia malla

![[Pasted image 20250622133548.png]]

**Align to direction**: Rotadas en la dirección a la que se mueven. Solo se pueden ver si las partículas van en dirección a ti.

**Randomize direction**: direcciones aleatorizadas

##  Emission

**Rate over time**: Cantidad de partículas que se generan por segundo.

## Color over lifetime

Aplica un tinte entre el inicio y el fin de la vida de la partícula.

## Renderer

Como la mayoría de cosas en Unity, necesitamos un **Material**

**Render mode**

- **Billboard**: Las particulas se renderizan como un "cartel" (entiendo que planas) y se apuntarán a donde le indiquemos en render alignment.
    
- **Stretch billboard**: Las particulas siempre apuntan a cámara y les puedes aplicar un escalado.
    
- **Horizontal Billboard**: Igual que `billboard` pero perpendicular al suelo.
    
- **Vertical Billboard**: Alineado con la Y del mundo y apuntando a cámara.
    
- **Mesh**: Las particulas se renderizan en base a una malla 3D.

*Particulas renderizandose a partir de la malla del cuerpo de Amatista*
![[Pasted image 20250622133828.png]]


**Render alignment**

- **View**: Las partículas siempre apuntarán a cámara.
    
- **Local**: Las partículas estarán alineadas con el transform.
    
- **World**: Las partículas estarán alineadas con el eje del mundo.
    
- **Facing**: Según el manual de Unity 2020.3, las particulas apuntarán a la posición directa del GameObject de la cámara (no entiendo).
    
- **Velocity**: Las partículas apuntan hacia su velocidad.
    

**Pivot**

Util para si quieres añadirle un offset.