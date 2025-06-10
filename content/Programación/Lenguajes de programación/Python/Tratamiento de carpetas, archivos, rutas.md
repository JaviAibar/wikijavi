Como separador independiente del SO tenemos `os.sep`, para unir una ruta y el archivo, se usa el siguiente comando 

```python
os.sep.join([path, filename])
```

Para obtener el nombre de archivo a partir de una ruta se hace lo siguiente 

```cs 
os.path.basename(original_path)
``` 

Para obtener una ruta sin nombre de archivo 
```python
os.path.dirname(original_path)
```

Para saber si una ruta es archivo

```python 
os.path.isfile(path)
``` 

Para saber si una ruta es carpeta

```python 
os.path.isdir(path)
``` 