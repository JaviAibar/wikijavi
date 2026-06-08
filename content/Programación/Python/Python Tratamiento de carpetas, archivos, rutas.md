Como separador independiente del SO tenemos `os.sep`, para unir una ruta y el archivo, se usa el siguiente comando 

```python
os.sep.join([path, filename])
```

Separa ruta de extensión

```python
base_name, ext = os.path.splitext(file)

#input C:\Users\Danzante del filo.mp3

#output
#base_name = C:\Users\Danzante del filo
#ext = ".mp3"
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

Para listar archivos y carpetas de una ruta

```python
f = []
for (dirpath, dirnames, filenames) in os.walk(mypath):
    f.extend(filenames)
    break
```

o solo archivos

```python
filenames = next(os.walk(mypath), (None, None, []))[2]  # [] if no file
```

Leer un archivo

```python 
f = open("demofile.txt", "r")  
print(f.read())
``` 

para guardar un archivo

>[!warning] Diferencia entre a y w
>en el ejemplo se usa "a" para añadir al final, con w, el archivo será vacio antes de que el texto se inserte

```python 
f = open("demofile2.txt", "a")  
f.write("See you soon!")  
f.close()  
  
#open and read the file after the appending:  
f = open("demofile2.txt", "r")  
print(f.read())
``` 

