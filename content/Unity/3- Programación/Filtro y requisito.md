## Filtro

where es para filtrar arrays:

```cs 
class WhereSample
{
    static void Main()
    {
        // Simple data source. Arrays support IEnumerable<T>.
        int[] numbers = { 5, 4, 1, 3, 9, 8, 6, 7, 2, 0 };

        // Simple query with one predicate in where clause.
        var queryLowNums =
            from num in numbers
            where num < 5
            select num;

        // Execute the query.
        foreach (var s in queryLowNums)
        {
            Console.Write(s.ToString() + " ");
        }
    }
}
//Output: 4 1 3 2 0
``` 

## Requisito

También se puede usar para que la T de una clase genérica implemente una interfaz en concreto, así:

```cs 
public class AGenericClass<T> where T : IComparable<T> { }
``` 

Esta clase obliga a que el tipo introducido en T sea comparable