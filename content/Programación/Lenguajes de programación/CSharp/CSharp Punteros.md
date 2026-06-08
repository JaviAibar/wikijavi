
El tipo especificado antes de * en un tipo de puntero se denomina tipo referente. Solo un tipo no administrado puede ser un tipo de referente.

Los tipos de puntero **no heredan de object** y no existe ninguna conversión entre tipos de puntero y object. Sin conversiones boxing y unboxing. Sin embargo, puede realizar la conversión entre diferentes tipos de puntero y entre tipos de puntero y tipos enteros.

```cs 
int* p1, p2, p3;   // Ok

int *p1, *p2, *p3;   // Inválido en C#

int[] a = [10, 20, 30]
``` 

& obtiene la dirección de una variable (el puntero) 

```cs
int* p1 = &a[0]
```

\* obtiene el valor de un puntero