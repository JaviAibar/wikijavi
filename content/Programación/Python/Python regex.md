
## re.match (comprobar si existe)
```python
import re

text = "12A"
numbersAndALetter = re.match("\d+[A-Za-z]", text)
```

En caso de contener, devuelve un objeto con la captura:

```python
numbersAndALetter.span()  #(0, 3) - Esto 
```

y podemos usarlo como condición

```python
if numbersAndALetter:
	doIfTrue()
else:
	doIfFalse()
```

## re.sub (reemplazar remplazar replace sustituir substitutir substitute)

```python 
regex = "[0-9]"

entrada = "f21s545"
aSustituir = "NUM"

res = re.sub(regex, aSustituir, entrada)
print(res) # fNUMNUMsNUMNUMNUM
``` 

## re.compile (crea objeto regex para usarlo luego cómodamente)

Para más info se usa `compile`

```python
import re

capturadorDeNumeros = re.compile("(\d+)")

#...

nums = capturadorDeNumeros.findall("lnfaslkn3knfal6k") # nums = ['3', '6']
```

## re.split (separar en base a la expresión regular)


## re.findAll (busca todas las ocurrencias de una exp reg)

```python
import re

capturadorDeNumeros = re.compile(".*\d+.*")

#...

nums = capturadorDeNumeros.findall("lnfaslkn3knfalk")


```
# Keywords
Regexp regular expressions