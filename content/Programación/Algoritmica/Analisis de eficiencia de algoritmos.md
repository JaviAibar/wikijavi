# Benchmark en C#

Para comparar la diferencia de consumo entre dos métodos hay un `framework` llamado `BenchMarkDotNet`, el cual, tras marcar los métodos a comparar con un `[Benchmark]` te sacará la comparación con el error y la desviación típica

`Big O` es una forma simplificada de analizar algoritmos para compararlos y crearnos una idea de su ejecución y toma como referencia el caso peor.

La talla del problema (los items que entran en juego) se representan con una `n`

Normalmente se habla de:
* caso mejor (cuando todo sale bien, solución trivial o ya encontrada) también llamado `Big Omega`, 
* caso medio (que es el que se dará con mayor frecuencia) que llamamos `big theta` 
* y caso peor (que analiza el punto más débil del algoritmo, por ejemplo, que nunca tome el mejor pivote en el caso de [Quicksort](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1vVbHuf7NgWKXYMd2D2KvPCRbP32554UG/edit), por ejemplo) que ya hemos comentado que llamamos Big O

# Reglas generales

Las constantes no importan

Si el algoritmo funciona del orden de `5n`, pasará a ser `O(n)`, ya que según se haga grande la `n`, no es suficientemente relevante si es `x5`,

La jerarquía de eficiencia es la siguiente

![[Pasted image 20250610114137.png]]

![[Pasted image 20250610114143.png]]

# Aprender a calcularlo

## tiempo constante

en la operación $$x = 5 + (15* 20)$$
no depende de la talla de entrada, por tanto $$O(1)$$

Cómo sería si ahora tenemos el siguiente trozo de código?

```python
x = 5 + (15* 20)

y = 15 - 2

print x + y
```


Pues que sería $$O(1) + O(1) + O(1) = O(3)$$

Pero recordemos que despreciamos las constantes, así que, resultado final O(1)

## Tiempo lineal

Para el siguiente trozo de código tenemos un bucle de n veces

```python
for x in range(n):
    print x
```

Sabemos que print es `O(1)`, pero como se repite n veces, será `n * O(1)`, por tanto `O(n)`

Depende de la talla del problema por eso no se puede despreciar como una constante

Por último tenemos la siguiente línea de código

```python
y = 15 - 2     # O(1)

for x in range(n):  # O(n)
    print x

O(1) + O(n)
```

Como hemos visto en la jerarquía `O(n) > O(1)`, por tanto, resultado `O(n)`. Porque en comparación `O(1)` es despreciable

## Tiempo cuadrático

```python
for x in range(n):
    for y in range(n):
        print x * y      # O(1)
```

Tenemos que la operación `O(1)` se ejecuta `n*n` veces, por tanto $$O(n^2)$$
Otro ejemplo

```python
x = 5 + (15* 20)         # O(1) 

for x in range(n):       # O(n)
    print x * y          # O(1)

for x in range(n):       # O(n^2)
    for y in range(n):
        print x * y      # O(1)
```

Tenemos `O(1) + O(n) + O(n^2)`. Como domina la `n^2`, pues el resultado es `O(n^2)`

## Pero qué pasa con las condiciones?

```python
if x > 0:
   # O(1)

elif x < 0:
   # O(log n)

else:
   # O(n^2)
```

Tomaríamos el peor escenario posible: $$O(n^2)$$