

Para ordenar valores de forma eficiente, tenemos el algoritmo de Quicksort, que parece ser uno de los más eficientes que existen

# Cómo funciona Quicksort

Tomamos un valor que sirva como mediana (mediana de 3) ejemplo

Hemos tomado el primer, medio y último elemento del array. Aquel cuyo valor está entre medias es el 3

![[Pasted image 20251201182236.png]]

Se reserva dicho valor (conocido como pivot) en uno de los lados del array (para ajustarnos al vídeo de referencia, será al final)

![[Pasted image 20251201182244.png]]

Ese valor (3) nos servirá como referencia para la ordenación.

El mecanismo será, ir buscando desde izquierda como desde derecha el primer valor que supere (izquierda por encima (>3) y derecha por debajo (<3)) al pivote

![[Pasted image 20251201182259.png]]

Si al encontrarlos, los indices no se han superado el uno al otro, quiere decir que queda faena

![[Pasted image 20251201182309.png]]

Los intercambiamos y seguimos desde ahí...

![[Pasted image 20251201182319.png]]


... hasta que el índice izquierdo, supere al derecho (y viceversa)

![[Pasted image 20251201182330.png]]

Entonces, sustituimos el valor de indice izquierdo (5) por el último (3, porque pusimos el pivot ahí, si fuera al revés pues indice derecho e intercambiamos por i=0)

![[Pasted image 20251201182343.png]]

Ahora el que fuera nuestro pivote, está correctamente ubicado

![[Pasted image 20251201182355.png]]

Otra característica de nuestro punto actual es el que fuera nuestro pivote, ahora está separando los valores altos de los bajos

Lo que nos permite ejecutar 2 Quicksort, uno para la parte izquierda y otro para la derecha

![[Pasted image 20251201182408.png]]

# Análisis de eficiencia 

Caso peor: O(n^2)

Caso medio: O(n log n)

[[Analisis de eficiencia de algoritmos|¿Qué significa todo esto?]]
# Bibliografía

[https://www.youtube.com/watch?v=Hoixgm4-P4M&ab_channel=MichaelSambol](https://www.youtube.com/watch?v=Hoixgm4-P4M&ab_channel=MichaelSambol)