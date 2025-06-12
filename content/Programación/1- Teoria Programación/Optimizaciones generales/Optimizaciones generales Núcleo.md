# Optimizaciones generales

Mira también [Analisis de eficiencia](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1v4Qi7cySAm4IN5-5VLyU8nWjhdNi7gc3/edit). Ahí se explica cómo comparar el coste dos métodos entre sí

# Tips generales

## Función módulo es costosa

Para calcular par / impar, en lugar de usar módulo, podemos comparar los bits.


| ![[Pasted image 20250611174642.png]] | ->  | ![[Pasted image 20250611174730.png]] |
| ------------------------------------ | --- | ------------------------------------ |
|                                      |     |                                      |
## Punteros para evitar la comprobación de los límites del array

La mayoría de código que se escribe en C# "código seguro comprobable". C# permite un contexto [unsafe](https://learn.microsoft.com/es-es/dotnet/csharp/language-reference/keywords/unsafe) (no seguro), donde el código puede usar punteros, asignar y liberar bloques de memoria y llamar a métodos mediante punteros de función. El código no seguro en C# no es necesariamente peligroso; solo es código cuya seguridad no se puede comprobar.

Sobre punteros [[Punteros en CSharp|aquí]]

![[Pasted image 20250611174908.png]]

# Algoritmos de ordenación

### [[Quicksort]]

# Reducir el consumo por el GB Collector / optimización uso memoria

## Reservar memoria en listas

Al crear una lista por defecto, i.e. 

```cs
List<int> m_objects = new List<int>()
``` 

estamos creando una lista sin reservar ni un solo hueco en memoria, por lo que al añadir y eliminar, se están creando huecos que la memoria tenderá a limpiar y reordenar para ser reutilizado por otros datos.

Sin embargo, si tenemos idea de cuántos elementos aproximadamente tendrá nuestra lista, es más eficiente asignar un tamaño 
```cs
List<int> m_objects = new List<int>(1000)
```
esto reservará un espacio equivalente a 1000 elementos de tipo entero (2MB)

![[Pasted image 20250611175011.png]]

## Que los métodos NO devuelvan colecciones

Cuándo un método devuelve una lista, e.g:

```cs 
public string[] SortStringArray(string[] unsorted) {
    return unsorted.Sort();
}
``` 

genera faena al GC, para evitarlo, podemos aprovechar el paso por valor que tiene por defecto el array

```cs 
public void SortStringArray(string[] array) {
    array = array.Sort();
}
``` 

## Cachear siempre

```cs 
foreach (var obj in objects.ToArray())
{
    ...
}
foreach (var obj in objects.ToArray())
{
    ...
}
``` 

En el ejemplo anterior se ve claramente que la lista objetos se está convirtiendo dos veces en array, si lo haces solo una, eso que ahorras

```cs 
List<int> cachedObjects = new List<int>(1000);

foreach (var obj in cachedObjects)
{
    ...
}
foreach (var obj in cachedObjects)
{
    ...
}
``` 

Esto está claramente mejor, pero todavía tiene un problema, y es que, cada vez que llamemos a este método (y es Update xD) va a crearse una lista de 1000 elementos que se va a borrar cada frame. Para evitarlo, debemos subirlo al scope de la clase, para hacerlo permanente entre frames

## Cachear info

No tener que calcular el valor cada vez

| `l = 'abc'`<br>`for i in range(100):`<br>   `print(i * len(l))` | --> | `l= 'abc'`<br>`k = len(l)`<br>`for i in range(100):`<br>   `print(i * k)` |
| --------------------------------------------------------------- | --- | ------------------------------------------------------------------------- |
## Evita variables innecesarias

Es más trabajo para el GC

| `def function(b,c):`<br><br>   `a = sum(b,c)`<br><br>   `return a` | --> | `def function(b,c):`<br><br>   `return sum(b,c)` |
| ------------------------------------------------------------------ | --- | ------------------------------------------------ |

# [[Conceptos de algorítmica]]
## Programación dinámica

[[Programación dinámica|Ver aquí]]

## Algorítmica voraz algoritmos voraces

[[Algorítmica voraz algoritmos voraces|Ver aquí]]

# Programación asincrónica

[[Programación asincrónica|Ver aquí]]

# Para código frecuentemente ejecutado

Creo que los cambios que se describen aquí ([ref](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/performance/)) son hilar más fino, por lo que solo deben aplicarse en código que se ejecuta frecuentemente , en caso contrario, el impacto será mínimo. Debes hacer un estudio sobre la frecuencia de ejecución del código antes de proceder.

Para hacer el estudio hay que poner modo `Release` ir a `Depurar > Generador de perfiles de rendimiento...` Seleccionar `Seguimiento de asignación de objetos de .NET` y pulsar `Iniciar`

![[Pasted image 20250611175033.png]]

![[Pasted image 20250611175050.png]]


![[Pasted image 20250611175106.png]]


![[Pasted image 20250611175122.png]]

Al hacer doble click te indica donde ocurren esas asignaciones de memoria

![[Pasted image 20250611175138.png]]


[Aquí un ejemplo hecho por ellos para probar todos estos cambios](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/performance/ref-tutorial)

Una práctica común es pasar de tipo clase a [[Struct|tipo struct]] cuando sean "estructuras datos críticos" (no sé a qué se refiere). Deben ser, eso sí, objetos pequeños, de 3 palabras o menos (considerando que una palabra es un integer natural), ya que al pasar por valor, deberá crear una copia. Para evitar estos problemas con structs de tamaños más grandes, considera [[Struct|pasarlos por referencia con ref]]. Antiguamente, para conseguir esta mejora de eficiencia, los programadores tenían que [[#Punteros para evitar la comprobación de los límites del array]]

Para comprobar que no está mutando ningún aspecto dentro de un método (y llevar a errores porque esos valores no estén cambiando en el objeto original) simplemente ponemos readonly en la definición del struct. Si el código no se queja, es que no tenemos ese problema.

Debido a que el objeto pasa a ser no-null, deberemos evitar las variables como `EjemploStruct? ejemplo` y en los bucles de un array que comprobasemos si un elemento era null, podemos usar un elemento nullable que tenga el struct dentro, por tanto 

```cs
if (ejemplo[i] is not null) { // blabla }
```

```cs
if (ejemplo[i].Nombre is not null) { // blabla }
```

O cualquier estrategia que se te ocurra

Ahora toca pasarlo por referencia a todos los métodos que lo requieran para evitar copias. Siempre que puedas, intenta usar in y out en vez de ref

  

## En resumen

- Medir las asignaciones: Determina qué tipos se están asignando más y cuándo puede reducir las asignaciones del montón.
   
- **Convertir clase en struct**: Muchas veces, los tipos pueden convertirse de una clase a una struct. Su aplicación utiliza el espacio de la pila (heap) en lugar de realizar asignaciones al montón.

- **Preservar la semántica**: Convertir una clase en una estructura puede afectar a la semántica de los parámetros y valores de retorno. Cualquier método que modifique sus parámetros debe marcarlos con el modificador ref. Esto garantiza que las modificaciones se realizan en el objeto correcto. Del mismo modo, si una propiedad o el valor de retorno de un método debe ser modificado por la persona que llama, ese retorno debe ser marcado con el modificador ref.

* **Evite las copias**: Cuando pasas una estructura grande como parámetro, puedes marcar el parámetro con el modificador in. Puedes pasar una referencia en menos bytes, y asegurarte de que el método no modifica el valor original. También puedes devolver valores mediante readonly ref para devolver una referencia que no pueda ser modificada.

# Bibliografía

[https://medium.com/swlh/how-to-write-efficient-and-faster-code-67567e74ef87](https://medium.com/swlh/how-to-write-efficient-and-faster-code-67567e74ef87) 

[https://docs.unity3d.com/Manual/performance-garbage-collection-best-practices.html](https://docs.unity3d.com/Manual/performance-garbage-collection-best-practices.html)

[https://maherz.medium.com/garbage-collection-essentials-in-c-e31412a5797f](https://maherz.medium.com/garbage-collection-essentials-in-c-e31412a5797f)

[Tips generales (5 (Extreme) Performance Tips in C#)](https://www.youtube.com/watch?v=Tb2Fx9qku_o) 

[https://learn.microsoft.com/es-es/dotnet/csharp/language-reference/unsafe-code](https://learn.microsoft.com/es-es/dotnet/csharp/language-reference/unsafe-code) 

[WikiJavi/inform%C3%A1tica/lenguajes-de-programaci%C3%B3n/csharp/punteros-en-c?authuser=0](https://sites.google.com/view/wikijavi/inform%C3%A1tica/lenguajes-de-programaci%C3%B3n/csharp/punteros-en-c?authuser=0) 

[https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/performance/](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/performance/) 

[https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/performance/ref-tutorial](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/performance/ref-tutorial)

# Keywords

GarbageCollector Garbage recolector basura