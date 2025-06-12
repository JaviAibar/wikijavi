# Commit sin pull

Cuando haces un Commit + Push (subir) sin hace Pull (descargar), y los archivos que has cambiado, tienen modificaciones en el repositorio, te saldrá este mensaje de error:

![[Pasted image 20250612181322.png]]

Te sale el botón de hace pull, púlsalo

# Conflicto

Cuando haces un pull, automáticamente intenta combinar los archivos, pero a veces, se modifica la misma linea y es imposible de hacer automáticamente, por lo que te da este mensaje (que recomiendo marcar que no te lo muestre de nuevo) y el mensaje de error (el que tiene color rojo debajo:


![[Pasted image 20250612181341.png]]


Como en el mensaje de error anterior (el de pull), te muestra la recomendación de lo que debes hacer con un comodo botón, déjate llevar

![[Pasted image 20250612181358.png]]

Te saldrá una lista con los archivos que tienen conflicto, con doble click en el archivo, se abre un programita para decidir qué hacer

![[Pasted image 20250612181409.png]]

En el programita se pueden ver los cambios:

- Arriba izquierda está la versión que hay en el repo
    
- Arriba derecha está la versión que hay en tu ordenador
    
- Abajo sale la versión final
    
- En naranja sale la versión antes de modificarse
    
- En rojo la modificación que cada uno ha hecho de esa línea en concreto

![[Pasted image 20250612181422.png]]

Para simplificar, se pueden tomar 3 decisiones:

- Quedarse con la versión del repo
    
- Quedarse con nuestra versión (la del ordenador)
    
- Combinar ambas
    

(En la captura se toma la segunda opción)

![[Pasted image 20250612181436.png]]


Guardar y marcar como resuelto


![[Pasted image 20250612181446.png]]

# IMPORTANTE!

Se **DEBE** hacer un commit obligatorio cuando se resuelve el conflicto!

![[Pasted image 20250612181507.png]]

![[Pasted image 20250612181511.png]]

![[Pasted image 20250612181514.png]]