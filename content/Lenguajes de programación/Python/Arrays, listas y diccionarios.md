Las listas son objetos de tipo colección

parece que es equivalente

```python
people = ['Jon', 'Marcos', 'Maria', 'Ana']
poeple = list(['Jon', 'Marcos', 'Maria', 'Ana'])
```

Cualquier elemento iterable se puede descomponer con `list`

```python
res = list("Erika Vikman")
print(res) # ['E', 'r', 'i', 'k', 'a', ' ', 'V', 'i', 'k', 'm', 'a', 'n']
```

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


# Bibliografía

https://ellibrodepython.com/diccionarios-en-python#m%C3%A9todos-diccionarios-python
https://elpythonista.com/listas-python
