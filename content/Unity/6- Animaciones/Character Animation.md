Para los problemas que pueden surgir con los CharacterController, [[Character Animation - Origenes diferentes|mirar este enlace]], probablemente sea suficiente para resolver cualquier cosa.

Para poder obtener el eje cartesiano en el que añadir las animaciones, ejemplo:

![[Pasted image 20250622132402.png]]

Deberemos crear un `AnimatorController` en el avatar que se va a mover.

![[Pasted image 20250622132417.png]]

Dentro de la pestaña Animator, haremos botón derecho y `Create State > From New Blend Tree`.

Y añadimos en la parte izquierda los parámetros necesarios (en la captura son "Horizontal" y "Vertical").

![[Pasted image 20250622132435.png]]

Accedemos dentro del nuevo estado creado, y ponemos el `blend tree` en foto (hacemos click)

![[Pasted image 20250622132909.png]]

En la ventana inspector ponemos el `Blend Type` a `2D Direccional`

![[Pasted image 20250622132930.png]]

Parecerá que no ha cambiado nada, pero al añadir 2 `Motion Field`, se creará el eje cartesiano

![[Pasted image 20250622132940.png]]