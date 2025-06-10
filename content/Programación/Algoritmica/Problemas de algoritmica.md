#WIP 
# Problema de las monedas

Queremos devolver una cantidad de dinero con el menor número de monedas posibles

Para que funcione la disponibilidad de monedas debe ser infinita.

# Problema de la mochila

Consiste en el problema de tener un almacenamiento (mochila, barco, avión, camión...) con un límite de peso y de objetos que puedo transportar. Los objetos tienen diferentes valores (precio) y el objetivo es maximizar el valor sin superar los límites

Existen dos variantes con o sin fraccionamiento. Es decir, se puede dividir o no la carta en infinitas partes?

## Mochila con fraccionamiento

Supongamos que en la mochila caben W = 20 kg de peso, y que tenemos tres productos (N = 3) con pesos w1 = 18 kg, w2 = 15 kg y w3 = 10 kg. El valor de cada uno de los productos es v1 = 25€, v2 = 24€ y v3 = 15€. Una carga factible de la mochila sería (1/2, 1/3, 1/4). Su peso es de 16.5 kg y el beneficio que nos reporta, de 24.25€. 

Naturalmente, no es la única solución factible. Por ejemplo, (1, 2/15, 0), supone cargar la mochila con un peso de 20 kg y obtener un beneficio de 28.20€. No podemos plantearnos siquiera enumerar todo el conjunto de soluciones factibles para buscar la óptima, una por una, pues su numero es infinito.

Otro supuesto

Capacidad = 50, valores = [60, 30, 40, 20, 75], pesos = [40, 30, 20, 10, 50]. 

Una solución óptima es 100% del 3 y 4 y 40% del 5 -> peso 50 valor 90

### Solución voraz naif

100% del primero 33% del segundo. Peso 50, Valor 70.

Es factible pero no óptimo.

### Solución voraz ordenada

Tenemos 3 formas de ordenar:

a) De mayor a menor valor.

b) De menor a mayor peso.

c) De mayor a menor relación valor/peso

La última nos da la solución óptima

![[Pasted image 20250610134423.png]]

# Selección de actividades