# Índice
[[10 consejos de Clean Code]]
[[Orden de aparición en los archivos de código]]



# Otros recursos

[Orden de aparición en los archivos de código](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.bg0lpadl3y0b)

[Principio de reutilización de abstracciones (RAP Reused Abstraccions Principle)](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.qo74tjwfp88q)

[Consejos generales](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.ijr37a3sdq37)

[Eliminar el else de la condición (en un método)](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.p1skdey5jem8)

[Diccionario en vez de block if-ifelse-else](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.fo5budnnlfc4)

[Métodos largos](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.835owzgsg0s9)

[Extrae funcionalidad (aunque sea solo 1 línea) y pon un nombre descriptivo, de tal forma que será más legible](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.medscqhmah0i)

[Problemas derivados](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.fe5hsbiksx9u)

[Variables locales interfiriendo](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.hfoga5ccdmvc)

[Parametros repetitivos](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.aknobpejhy39)

[Obtener mucha info de un objeto para pasarla a un método](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.xg5gab3bhgn0)

[Variables demasiado entrelazadas](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.86q25ocw30d)

[Código confuso](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.ckyy2koj0frq)

[Intrincadas condiciones](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.4m42jh51c90b)

[Pasarse de buenas prácticas](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.ajtpjnz1h5qt)

[Bibliografía](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.njj6hqcxop7o)

[Keywords](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/clean-code?authuser=0#h.4phgfdcy6afq)

# [[Orden de aparición en los archivos de código]]

#  Principio de reutilización de abstracciones (RAP Reused Abstraccions Principle) 

Este principio indica que no debemos pasar de crear abstracciones ya que pueden consumir tiempo y no servir realmente para nada.

Por defecto, si vemos que una clase no va a tener más implementaciones concretas, no se abstrae.

Ejemplo:

Si tenemos una clase DisableImageInSpecificContext y sabemos que nadie más va a usar los métodos que dicha clase tiene, mejor no hacemos una interfaz

Sin embargo MeteoRef ([ejemplo de Dependency Inversion](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/patrones-de-dise%C3%B1o/solid-design-pattern-patr%C3%B3n-de-dise%C3%B1o#h.h7far0ofbd38)) que es una clase que obtiene la información de diferentes herramientas meteorológicas, debería tener diferentes implementaciones dependiendo de dicha herramienta, por lo que tendría sentido crear una interfaz para que todos los elementos creados a partir de MeteoRef tengan el método Mostrar()

# Consejos generales

## Eliminar el else de la condición (en un método)

  
```python
def function():
  if a == True :
    #do this
  else:
    #do this
```
  
⬇️

```python
def function():
 if a == True :
   #do this
   return value
 #do this 
```

## Diccionario en vez de block if-ifelse-else

```python
variable_one = 'variable'
 if variable_one == 'a' :
   variable_two = 1
 elif variable_one == 'b' :
   variable_two = 2
 elif variable_one == 'b' :
   variable_two = 3 
 else:
   variable_two = 4 
   ```
   
   ⬇️
   
```python
variable_one = 'variable'
dict_ = {'a' = 1, 'b' = 2, 'c' = 3}
variable_two = dict_.get(variable_one,4) 
```
# [Métodos largos](https://refactoring.guru/es/smells/long-method)

### [Extrae funcionalidad](https://refactoring.guru/es/extract-method) (aunque sea solo 1 línea) y pon un nombre descriptivo, de tal forma que será más legible

![[../../../../zz Media/Pasted image 20240810113502.png]]

## Problemas derivados

### [Variables locales interfiriendo](https://refactoring.guru/es/replace-temp-with-query)

Crea un método para que calcule su valor (si no es demasiado costoso computacionalmente)

`float TargetSpeed => baseSpeed * gameSpeed {:csharp}`
### [Parametros repetitivos](https://refactoring.guru/es/introduce-parameter-object)

Crea con dichos parámetros un objeto

![[../../../../zz Media/Pasted image 20240810113622.png]]

### [Obtener mucha info de un objeto para pasarla a un método](https://refactoring.guru/es/preserve-whole-object)

Pasa el objeto entero al método

![[../../../../zz Media/Pasted image 20240810113657.png]]

### [Variables demasiado entrelazadas](https://refactoring.guru/es/replace-method-with-method-object)

Convierte el método en un objeto

# Código confuso

### [Intrincadas condiciones](https://refactoring.guru/es/decompose-conditional)

Descomponer las condiciones (sacarlas a un método que se encargue de evaluarlas) y de paso [[#[Extrae funcionalidad](https //refactoring.guru/es/extract-method) (aunque sea solo 1 línea) y pon un nombre descriptivo, de tal forma que será más legible|extrae funcionalidad]] de los then y else

![[../../../../zz Media/Pasted image 20240810113751.png]]

# Pasarse de buenas prácticas

Hay que tener cuidado al aplicar estas mejoras ya que el exceso de las mismas puede llevar a la anti-refactorización

[La condición extraída es menos legible](https://refactoring.guru/es/inline-method) (ref [[#[Intrincadas condiciones](https //refactoring.guru/es/decompose-conditional)|Descomponer condiciones]])

![](https://lh5.googleusercontent.com/vpq2zksFqLauk457r0UfeTj_tRRnga1xkLRZ7MKO36QhrgJH1Uzcbhl-joNyZE_hhlYJWUTF-xxQKJPqTV9A5ls5EWBzEwNWhzvBa0bFG-WVyfqaNdEzNSVM5OzuXigKhA=w1280)

[patrón de diseño SOLID design pattern](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/patrones-de-dise%C3%B1o/solid-design-pattern-patr%C3%B3n-de-dise%C3%B1o?authuser=0) 

# Bibliografía

[https://refactoring.guru/es/refactoring](https://refactoring.guru/es/refactoring)

# Keywords

Legibilidad codigo