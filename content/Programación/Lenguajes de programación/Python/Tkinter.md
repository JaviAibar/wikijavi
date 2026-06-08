Es una librería estándar, así que no tienes que instalar nada

# Importar

```python 
import tkinter as tk
from tkinter import ttk
``` 

Con tk formamos la base
Con ttk tenemos herramientas

# Intro

```python 
ventana = tk.Tk()
``` 

# Uso

## Crear slider

```python 
slider = ttk.Scale(
    ventana,
    from_=0.1,
    to=2.0,
    orient="horizontal",
    command=evento_slider
)
``` 
## Usar slider

```python 
def evento_slider(value):
    """Actualiza el valor al mover el slider."""
    print(value)
    ``` 

Para poner un valor inicial

```python 
slider.set(1.0)
``` 

