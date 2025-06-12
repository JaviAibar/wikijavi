Lo primero es que Content tiene que tomar el tamaño de sus hijos, para ello es necesario el componente `Content Size Fitter`.

El problema radica en que `Content Size Fitter` solo detecta texto, imágenes y Layouts que estén **en el mismo GameObject** que él, por lo que, para que funcione, Content debe tener el componente `Layout`

![[Pasted image 20250612182019.png]]

## Más cosas a tener en cuenta:

El Content debería tener (en principio) el pivote X=0.5, Y=1 para que caiga de arriba y X=0.5, Y=0 para que caiga de abajo

El Grid Layout puede dar mucho problema, de esta forma me ha funcionado:

Scrollview con Stretch Top (si cae de arriba). Solo con Scroll Rect, Clamped y 50 de sensibilidad

![[Pasted image 20250612182204.png]]

Del Viewport en principio no se cambia nada

![[Pasted image 20250612182213.png]]

Como decíamos antes, el Content con el Grid y el Content Size Fitter

Stretch top (si cae de arriba)

Vertical Fit Min

![[Pasted image 20250612182233.png]]