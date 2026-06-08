
## Diccionario

### Diccionario con clave texto

```python
dct = dict(pepe=2, juan=7)
print(dct["pepe"]) # 2

jugador = {
	"Nombre": "Blinky",
	"Pais": "Francia",
	"Porcentaje_victoria": 72 
}


print(jugador["Porcentaje_victoria"]) # 72


```

### Diccionario con clave número

```python
dictPorIndice =  {
	3:"Tres",
	1:"Uno",
	2:"Dos"
}

print(dictPorIndice[2]) # Dos
```
### Comprobar si existe

```python
print(jugador.Contains("Velocidad")) # False
```

### Añadir elemento

se puede añadir un nuevo elemento directamente

```python
dictPorIndice[4] = "Cuatro"
print(dictPorIndice[4]) # "Cuatro"

jugador["Velocidad"] = 12
print(jugador["Velocidad"])
```


# Listas

Las listas son objetos de tipo colección

parece que es equivalente

```python
people = ['Jon', 'Marcos', 'Maria', 'Ana']
poeple = list(['Jon', 'Marcos', 'Maria', 'Ana'])
```

append

```python 
fruits = ['apple', 'banana', 'cherry']  
fruits.append("orange")
``` 

Cualquier elemento iterable se puede descomponer con `list`

```python
res = list("Erika Vikman")
print(res) # ['E', 'r', 'i', 'k', 'a', ' ', 'V', 'i', 'k', 'm', 'a', 'n']
```


## Generar automáticamente

```python 
lista = [x for x in range(9)]
print(lista)

# Resultado [0, 1, 2, 3, 4, 5, 6, 7, 8]
``` 


## Slicing (lonchear)

funciona como un substring de una lista

```python 
lista = [0, 1, 2, 3, 4, 5, 6, 7, 8]

print(lista[0:2]) # 1 - Especificamos el rango con los dos puntos (colon) (incluye el primer término y excluye el segundo, por tanto, tomará los 2 primero valores)
print(lista[:2])  # 2 - Si el término es 0, podemos omitirlo
print(lista[6:])  # 3 - Si el término es el último, podemos omitirlo
print(lista[6:-1])# 4 - También permite el índice invertido

# Resultado 1 [0, 1]
# Resultado 2 [0, 1]
# Resultado 3 [6, 7, 8]
# Resultado 4 [6, 7]
``` 



# Matrices

```python 
x = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
``` 

```python 
x[1][1] = 11
# Resultado [[1, 2, 3], [4, 11, 6], [7, 8, 9]]
``` 

índice invertido

```python 
x[-2][-1] = 21  # row = -2 , column = -1
# Resultado [[1, 2, 3], [4, 5, 21], [7, 8, 9]]
```

## Generar automáticamente

funciona igual que con las [[#Generar automáticamente|listas]] 

```python 
matriz = [[col for col in range(4)] for row in range(4)]
print(matriz)

# Resultado [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]]
``` 

## Obtener dimensiones

```python 
len(matriz) # número de filas
len(matriz[0]) # columnas de la primera fila
``` 

## Slicing (lonchear)
 
funciona igual que con las [[#Slicing (lonchear)|listas]] 

Para un ejemplo más claro, vamos a usar una matriz que no reinicie los numeros.

```python 
[[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]
``` 

la he conseguido con

```python 
matriz = [[col + row * 4 for col in range(4)] for row in range(4)]
``` 

```python 
matriz = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]

print(matriz[2][0:2]) # 1 - Especificamos el rango con los dos puntos (colon) (incluye el primer término y excluye el segundo, por tanto, tomará los 2 primero valores). de la lista en segunda posición [8, 9, 10, 11]
print(matriz[0][:2])   # 2 - Si el término es 0, podemos omitirlo
print(matriz[1][2:])   # 3 - Si el término es el último, podemos omitirlo
print(matriz[3][1:-1]) # 4 - También permite el índice invertido


# Resultado 1 [8, 9]
# Resultado 2 [0, 1]
# Resultado 3 [6, 7]
# Resultado 4 [13, 14]
``` 



https://www.geeksforgeeks.org/python/string-slicing-in-python/
# Bibliografía

https://ellibrodepython.com/diccionarios-en-python#m%C3%A9todos-diccionarios-python

https://elpythonista.com/listas-python

https://www.geeksforgeeks.org/python/python-matrix/