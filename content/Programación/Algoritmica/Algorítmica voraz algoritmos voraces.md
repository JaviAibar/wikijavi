Es la solución a un problema mediante un algoritmo que no se para a revisar sus decisiones. Se elige una estrategia de resolución, se seleccionan las ramas y se continúa hasta la hoja (solución) con la esperanza de tener una solución factible y óptima.

Spoiler, no tiene porqué ser ni una ni otra

La parte positiva de estos algoritmos es que son muy eficientes aunque es difícil demostrar que sean correctos

Para ejemplificar nos vamos a basar en el ejemplo de las monedas

más problemas [[Problemas de algoritmica|aquí]]

Queremos devolver una cantidad de dinero con el menor número de monedas posibles

Para que funcione la disponibilidad de monedas debe ser infinita.

# Tipos de voraz

## Fuerza bruta

Consiste en calcular todas las posibilidades y devolver la óptima. Evidentemente este método se puede ir muchísimo de coste.

## Voraz naif

En cualquier orden, seleccionar la cantidad máxima posible. (ejemplo de monedas abajo). No tiene por qué conducir a solución óptima.

Si ordenamos en sentido ascendente `{python}[1, 2, 5, 10]`, la devolución de 11€ serían 11 monedas, es decir, la peor solución posible.


## Más elaborada

Ordenar en sentido descendente. La solucion factible y óptima depende del sistema monetario y la cantidad a devolver.

**A veces no hay solución

> Si el sistema monetario es `[7, 3]`, no existe solución factible.

**A veces no encuentra la solución óptima aunque la hay**

> 12€ en el sistema [5, 4, 1] devolvería 2 de 5€ y 2 de 1€ (4 monedas) cuando lo óptimo son 3 de 4€

**A veces ni siquiera encuentra una solución factible aunque la hay**

> 5€ en el sistema [4, 3, 2], devolvería 4 cuando la solución sería 1 de 3€ y otra de 2€

Esta estrategia funcionaría siempre con monedas de potencias específicas, de base `c` que **incluyan** `c^0`. ejemplo 2^0, 2^1, 2^2...
