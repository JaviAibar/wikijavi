
# Importar

```python 
import numpy as np
``` 

# Array

Se crean como

```python 
np.array([[1, 2, 3, 4], [5, 6, 7, 8]])
``` 

>[!warning] Ojo!
>Los array de numpy deben ser **siempre** homogéneos. Es decir, cada dimensión tener siempre el mismo número de elementos.
>Esto daría **error**
>```python 
>np.array([[1, 2, 3, 4], [5, 6]])
>``` 
# numpy.arange

Devuelve un intervalo uniformemente espaciado

```python 
np.arange([_start_, ]_stop_, [_step_, ]_dtype=None_, _*_, _device=None_, _like=None_)`
``` 

Ejemplo, si quieres los pares entre 4 y 18 ==(sin incluir el 18)==, pues 

```python 
arr = np.arange(4, 18, 2)
print(arr)

# Resultado [ 4  6  8 10 12 14 16]
``` 

Solo es obligatorio un numero, pues por defecto start es 0 y step es 1

```python
arr = np.arange(12)
print(arr)

# Resultado `[0 1 2 3 4 5 6 7 8 9 10 11]`
``` 

# Tratamiento de matrices

## Shape

Nos indica el tamaño de cada dimensión (recuerda, deben ser [[#Array|homogéneos]])

```python 
import numpy as np  
  
arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]]) 
print(arr.shape)

# Resultado (2, 4)
``` 


## Sumar arrays

```python 
# a y b son arrays
res = a + b
``` 


>[!warning] Cuidado
>Los arrays deben tener exactamente el mismo [[#Shape]]
>Si no lo tienen puedes forzarlo así
> ```python 
> # a y b son arrays
> target_shape = ( # para tantas dimensiones como tengan
>     max(a.shape[0], b.shape[0]),
>     max(a.shape[1], b.shape[1])
> )
> a_padded = np.zeros(target_shape, dtype=a.dtype)
b_padded = np.zeros(target_shape, dtype=b.dtype)
>
> a_padded[:a.shape[0], :a.shape[1], :] = a
> b_padded[:b.shape[0], :b.shape[1], :] = b
> 
> res = a_padded + b_padded
> ``` 


