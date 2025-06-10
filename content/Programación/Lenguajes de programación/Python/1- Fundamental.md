Para el tratamiento de listas, he creado su propia página [[Arrays, listas y diccionarios]]
## importar paquetes

Los paquetes son como objetos que contiene una lista de métodos. Podemos importar un paquete entero y acceder a sus métodos

```python
import random
random.randint(1, 10)
```

o podemos importar aquellos métodos que nos interesen para usarlos directamente

```python
from random import randint

randint(1, 10)
```

# funciones

```python
def suma(a, b):
    return a+b
```

> [!note] devolver más de un solo elemento

```python
def suma_y_resta (a, b):
    return a+b, a-b

suma, resta = suma_y_resta(5, 3)
print(suma) # 8
print(resta) # 2
```

## Entrada estándar (de teclado, por consola)

```python
valor = input()


```

## Excepciones

```python
try:
        respuesta_usuario = float(input("¿Cuál es la nueva cifra de cambio total? ").replace(",", "."))
    except ValueError:
        print("Por favor, introduce un número válido.")
        return
```
## operador ternario

es diferente a otros lenguajes, funciona como

`valor_si_true if condición else valor_si_false`

```python
valor = 100

a = 200
b = 50

print("menor que 100" if a < valor else "mayor que 100") # mayor que 100
print("menor que 100" if b < valor else "mayor que 100") # menor que 100
```
## nums aleatorios

```python
import random

random.uniform(1, 100) # genera un numero entre 1 y 100 (ambos inclusive)
random.uniform(1.2, 2.5) # igual, pero entre 1.5 y 2.5 (ambos inclusive) 
random.randint(1, 100) # genera un ENTERO entre 1 y 100 (ambos inclusive)
random.randrange(2) # genera un ENTERO entre 0 y el numero (SIN incluir), en este caso, solo 0 o 1
```


## Elegir un elemento de una lista

```python
from random import choice

choice(['win', 'lose', 'draw'])
```

## Mezclar elementos de una lista

> [!warning] Cuidado
> Shuffle modifica la lista y devuelve None, por lo que, para que tenga efecto, debes hacer como sigue

```python
from random import shuffle

lista = ['win', 'lose', 'draw']
shuffle(lista)
print(lista) # ['draw', 'lose', 'win']
```