# Desde blender

Creamos la figura básica, a partir de la cual queramos que se generen deformaciones.

En mi caso y siguiendo el tutorial, he puesto un cubo alargado y varias divisiones

![[Pasted image 20250612205556.png]]

Desde el menu de Propiedades del objeto, creamos una Shape Key

De nuevo, vamos a tomar esta forma como base para las siguientes

![[Pasted image 20250612205607.png]]

Teniendo la forma base (Basis) seleccionada, le damos de nuevo al "más" para crear otra forma a partir de la anterior que voy a llamar "Tree", si nos fijamos pone que esta nueva será relativa a la primera que creamos (Basis). Pero podemos cambiarlo para que derive de otra forma base

![[Pasted image 20250612205617.png]]

Sin más, vamos al modo editar y creamos el resultado final, en mi caso, un pino

  

Cuando volvamos al modo objeto, la figura desaparecerá, pero no te asustes, está guardada en el estado que creamos antes "Tree"

![[Pasted image 20250612205627.png]]

Si volvemos al menú anterior podremos modificar el campo "value" para ver cómo va pasando de una figura a la otra

![[Pasted image 20250612205638.png]]

Podemos modificar el valor de Max para limitar la fusión o incluso exagerarla, tal y como se ve en la captura

![[Pasted image 20250612205652.png]]

Creo que para exportarlo simplemente hay que hacerlo en `fbx` y fijarse que está `Mesh` seleccionado

![[Pasted image 20250612205708.png]]

# Desde Unity

Una vez disponemos del fbx, podemos ponerlo en la escena. Se importará como un Skinned Mesh Renderer, el cual expone los "value" que teníamos en blender con el nombre BlendShapes

![[Pasted image 20250612205720.png]]

Estos valores pueden ser perfectamente animable, sin embargo hay que tener en cuenta que mientras que en Blender el rango era de 0 a 1, en Unity lo es de 0 a 100

![[Pasted image 20250612205732.png]]

# Bibliografía

[En Blender] https://youtu.be/OITWiN8Dplo

[En Unity] https://youtu.be/unFd5a9-Ga8

# Keywords

Parametric mesh blend shapes blender unity Shape Keys BlendShapes modelo paramétrico

