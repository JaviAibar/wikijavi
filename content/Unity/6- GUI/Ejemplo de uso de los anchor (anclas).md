Cuando las anclas están juntas. Indican su punto de origen, dejando las dimensiones de la pieza fijas

El monitor tiene las anclas en el centro **del canvas**, por lo que aunque cambiemos el tamaño de la ventana, el monitor mantiene posición (centro del canvas) y tamaño

![[Pasted image 20250622135946.png]]

![[Pasted image 20250622140235.png]]

![[Pasted image 20250622140239.png]]

Ahora hemos igualado el ancho de las anclas **al del monitor**, es decir, es una fracción del tamaño de la pantalla.

Ahora lo que hará será cambiar el tamaño del monitor de tal forma que ocupe el 60% de la pantaña y deje 20% de espacio a cada lado. De igual forma pasará con el alto, que crecerá ocupando el porcentaje corresponiente y dejando el espacio corresponiente

![[Pasted image 20250622140304.png]]

![[Pasted image 20250622140309.png]]

Ahora tenemos una combinación de las anteriores, ocupara el 60% de ancho, dejando el 20% a cada lado. pero no cambiará el alto, sino que se mantenderá a

![[Pasted image 20250622140320.png]]

He ampliado la ventana tanto de ancho como de alto

Vemos que el monitor a crecido de ancho, pero se ha quedado de la misma altura, guardando la misma posición relativa (%) de espacio con los bordes inferior y superior (15% de espacio abajo, 85% arriba)

![[Pasted image 20250622140431.png]]

## Ejemplo de resolución de problemas

Tenemos el indicador ese con la posición relativa al centro del canvas

![[Pasted image 20250622140453.png]]

Por lo que al estrechar la pantalla, queda fuera de la escena

![[Pasted image 20250622140501.png]]

Tenemos algunas opciones a considerar

Podemos poner las anclas en el centro de la pieza, de esa forma, siempre mantendrá una posición dentro de la pantalla

La parte negativa es que, al estar a un lado del canvas, el porcentaje que deja a la izquierda es menor que a la derecha, por lo que al final

Por lo que pasa de estar centrado en el hueco

![[Pasted image 20250622140517.png]]

A estar cada vez más alejado de la pantalla

![[Pasted image 20250622140526.png]]

Eso nos lleva al siguiente punto, si lo que queremos es mantenerlo cerca de la pantalla, podemos guardar la relación entre ellos

De esta forma, la distancia entre el elemento y el borde del monitor siempre será un 9% del total del canvas

![[Pasted image 20250622140536.png]]

Da un poco mejor resultado, pero sigue alejándose mucho

![[Pasted image 20250622140545.png]]

Además, esta solución solo está funcionando porque se está aplicando sobre un contendor, si tuvieramos una imagen, esta estaría deformándose

![[Pasted image 20250622140552.png]]

![[Pasted image 20250622140556.png]]

Probablemente una de las mejores opciones por las que podemos optar es esta

Toma como referencia el espacio que hay entre el borde del monitor y el elemento sin deformar

![[Pasted image 20250622140605.png]]

