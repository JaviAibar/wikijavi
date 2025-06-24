# ¿Qué es?

Es un conjunto de código y recursos que se compila o bien en un ejecutable (exe) o una dll (librería de enlace dinámica). Por defecto Unity incluye todo el código en una Assembly predefinido llamada Assembly-c-sharp.dll. Sirve para organizar el código.

# ¿Para qué lo quiero?

Podemos definir varios para que Unity solo tenga que recompilar las partes que hayas cambiado en ver de todo el proyecto

Sirve para organizar, que permite trocear tu proyecto y mantenerlo en piezas pequeñitas.

Cada Assembly representa un sistema de limites, lo que te limita a la hora de escribir [[Evita el código espaguetti|código espaguetti]].

# Como lo añado

Simplemente tienes que ir a la carpeta en la que tienes el código y crear un Assembly con botón derecho (`Create > Assembly Definition`) eso es todo, puedes comprobar que funcionó clicando a un script y mirando en el inspector

![[Pasted image 20250624181221.png]]

# Ahora todo está lleno de errores T-T

Es un resultado de los límites de los que comentábamos en el apartado *¿para qué lo quiero? *

Ahora tenemos clases que dependen de clases que están en un Assemble completamente diferente. Es el momento de decidir si queremos permitírselo o no. En el ejemplo, la dependencia era por una clase llamada Core (nucleo) es normal que esa clase sea dependencia de muchas otras, por lo que tiene sentido que se lo permitamos. Para ellos, vamos al Assembly que depende del otro y en el inspector añadimos en Assembly Definition References el Assembly del que dependemos

# Bibliografía

[https://youtu.be/HYqOSkHI674](https://youtu.be/HYqOSkHI674)