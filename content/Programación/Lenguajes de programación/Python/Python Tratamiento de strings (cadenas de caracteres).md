## Interpolación de strings (cadenas de carácteres)

```python
name = "Javi"

text = f'Hola, {name}'
```

## Cadena multilinea

```python
name = "Javi"

text = f"""
Hola,
{name}
"""
```

## Cadenas r (raw)

Sirven para que no se interprete nada. Por ejemplo, cuando se usa la contrabarra (\\), deja de servir para escapar para significar contrabarra

```python
# Sin la r, hace falta contrabarra doble
print('path\\to\\the\\thing') # path\to\the\thing

# Con la r, se interpreta la \ como literal
print(r'path\to\the\thing') # path\to\the\thing
```

## str.replace()

> [!note] Reemplaza de forma case-sensitive todas las ocurrencia

```python
text = "aDd mdu"
sustituir="d"
por = "x"
res= text.replace(sustituir, por)
print(res) # aDx mxu
```

# Bibliografía


https://www.datacamp.com/es/tutorial/python-string-interpolation

https://packetpushers.net/blog/what-does-an-r-before-a-string-mean-in-python/#:~:text=R%20Means%20'Raw%20String',a%20literal%20(raw)%20character.