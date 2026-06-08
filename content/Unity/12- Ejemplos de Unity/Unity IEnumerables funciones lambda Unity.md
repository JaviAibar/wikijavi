Para ejemplificar utilizaremos la siguiente lista

```cs 
List<int> lista = new List<int> { 1, 5, 2, 7, 10, 9,  4, 3, 6, 8};
List<int> aux = new List<int> { 7, 10, 9, 2135132};
``` 

## Find

Localiza el primer término que coincide con la condición 

```cs 
int termino = lista.Find(e => e > 4); // Devuelve 5
``` 

## Contains

Devuelve true si encuentra el elemento buscado

```cs 
bool hayUno = lista.Contains(10); // No devolverá true porque hay un 10
``` 

## Union (de Linq). Equivale a la operación OR

Fusiona dos listas sin incluir repetidos

```cs 
lista = lista.Union(aux).ToList(); // lista ahora contiene 1, 5, 2, 7, 10, 9,  4, 3, 6, 8, 2135132
``` 

## Concat

Fusiona dos listas INCLUYENDO repetidos

```cs 
lista = lista.Concat(aux).ToList(); // lista ahora contiene 1, 5, 2, 7, 10, 9,  4, 3, 6, 8, 7, 10, 9, 2135132
``` 

## Distinct
Elimina los repetidos de una lista (asumimos que la lista es `1, 5, 2, 7, 10, 9,  4, 3, 6, 8, 7, 10, 9, 2135132`)

```cs 
lista = lista.Concat(aux).ToList(); // lista ahora contiene 1, 5, 2, 7, 10, 9,  4, 3, 6, 8, 2135132
``` 

## Select

Proyecta la lista con un nuevo formato

```cs 
lista = lista.Select(e => ++e).ToList(); // Suma uno a toda la lista

lista = lista.Select(e => e + 1).ToList(); // Suma uno a toda la lista
``` 

## Where

Filtro. Evalua una condición y crea una nueva lista con los elementos que sí cumplen dicha condición.

```cs 
lista = lista.Where(e => e > 4).ToList(); // Obtenemos los aprobados (5, 7, 10, 9, 6, 8)
``` 

## ForEach

Ejecturá lo que le pidamos a cada elemento de la lista

```cs 
lista.ForEach(e => Console.WriteLine(e)); // Cómoda forma de imprimir una lista por pantalla
``` 

## Cast

Aplica un cast a todos los elementos de la lista

```cs 
listaDeComponentes.Cast<MonoBehaviour>().ToList();
``` 

## Except

Elimina de la lista los elemento de la otra lista. Equivalente a la operación AND

```cs 
lista = lista.Except(aux).ToList(); // El resultado es 1, 5, 2, 4, 3, 6, 8
``` 

## Intersect

El resultado son los que coinciden en ambas listas

```cs 
lista = lista.Except(aux).ToList(); // El resultado es 1, 5, 2, 4, 3, 6, 8
``` 

## Not Intersect

Quedarse con los elementos que no coincidan en ambas listas simultáneamente, es decir, si un elemento está en ambas, descartado; si está en una pero no en la otra, seleccionado. Realmente no existe un método que consiga este efecto, pero [Øyvind Bråthen en StackOverflow](https://stackoverflow.com/a/5620298) propone este método: Ha aplicado una [diferencia simétrica](https://es.wikipedia.org/wiki/Diferencia_sim%C3%A9trica)

```cs 
lista.Except(aux).Union( aux.Except(lista)); // la unión, de las [restas](https://es.wikipedia.org/wiki/Diferencia_de_conjuntos) de cada lista
``` 

# OrderBy

Permite ordenar un array por una propiedad arbitraria

```cs 
lista.OrderBy(e => Vector3.Distance(e, point))
``` 

# Usos interesantes

## Operación AND

```cs 
lista = lista.Except(aux).ToList();
``` 

## Operación OR (Union)

```cs 
lista = lista.Union(aux).ToList(); // lista ahora contiene 1, 5, 2, 7, 10, 9,  4, 3, 6, 8, 2135132
``` 

## Que el contenido de la lista pase a ser una propiedad de los elementos de la lista

Select *(asumiendo un struct Prueba con string e integer)*

```cs 
List<Prueba> pruebaLista = new List<Prueba> { new Prueba("a", 1), new Prueba("b", 2), new Prueba("c", 3) };

List<int> pruebaInt = pruebaLista.Select(e => e.integer).ToList(); // pruebaInt contendrá 1, 2, 3
``` 

Otros interesantes

FirstOrDefault

FindIndex

OfType

  

## Keywords

Order Ordenar

