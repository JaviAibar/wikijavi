El problema que tenía es que quería que dando igual la cantidad de archivos que se añadiesen (crece en altura) el botón estuviera siempre abajo derecha, por encima de los premios, por lo que no podía ser relative ya que no podía hacer `right: 0; bottom: 0;` (son cualidades del `absolute`) ni tampoco podía ponerlo en absoluto ya que tomaría como espacio disponible todo la vista, y yo quería que se apoyase en los premios (más o menos mitad de la vista)

![[../../../../zz Media/Pasted image 20240804184830.png]]

Esta situación se ha solucionado creando un div que englobe los documentos y el propio botón pero seguía tomando el tamaño de la vista completa, la solución a esto ha sido poner este div como relative sin ningún posicionamiento, por alguna razon css ahora este div como un contenedor con sus límites y puede utilizar tranquilamente el posicionamiento absoluto dentro

![[../../../../zz Media/Pasted image 20240804184839.png]]

En conclusión, se pone el objeto que quieres con `absolute` y su contenedor con `relative`