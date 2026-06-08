> [!note] Mucha info aquí [[CS Optimizaciones generales Núcleo CS]]
# Comprobar consumo (eficiencia) de un método

>[!warning] No usar Stopwatch
>Por varias razones mencionadas aquí https://www.freecodecamp.org/news/how-to-benchmark-your-code-in-csharp/#heading-why-using-a-stopwatch-is-not-reliable

instalar BenchMarkDotnet

```plaintext
dotnet add package BenchmarkDotnet
```

```csharp
// Program.cs
using BenchmarkDotNet.Running;
using BenchmarkDotNet.Attributes;

BenchmarkRunner.Run<Benchmarks>();
```

```csharp
//Benchmarks.cs
using BenchmarkDotNet.Attributes;

public class Benchmarks
{
    private readonly int[] _numbers = Enumerable.Range(1, 1000).ToArray();

    [Benchmark]
    public int ForLoopSum()
    {
        int sum = 0;
        for (int i = 0; i < _numbers.Length; i++)
        {
            sum += _numbers[i];
        }

        return sum;
    }

    [Benchmark]
    public int ForeachLoopSum()
    {
        var sum = 0;
        foreach (int number in _numbers)
        {
            sum += number;
        }

        return sum;
    }

    [Benchmark]
    public int LinqSelect()
    {
        return _numbers.Sum();
    }
}
```

`Ver > Terminal` o `Ctrl + ñ`

```bash
dotnet build
``` 

```bash 
dotnet run -c Release
```

## Interpretar los resultados

Te dará una tabla como la siguiente

```bash
| Method         | Mean     | Error   | StdDev  |
|--------------- |---------:|--------:|--------:|
| ForLoopSum     | 434.2 ns | 0.40 ns | 0.31 ns |
| ForeachLoopSum | 321.9 ns | 1.22 ns | 1.14 ns |
| LinqSelect     | 189.4 ns | 0.84 ns | 0.70 ns |
```

### Mean 
es el tiempo de media que ha tardado
### Error 
representa el margen en plan como puede variar el Mean dependiendo de factores random del sistema (cuanto menos, mejor) 

### StdDev (Desviación estándar)
Representa como de consistentes son los resultados. Una puntuación baja indica que el tiempo es muy similar entre las ejecuciones, aumentando la confiabilidad. 


# Para comprobar la memoria

Añadimos el atributo `[MemoryDiagnoser]` a la clase
```cs
[MemoryDiagnoser]
public class BenchmarkTest
{
	...
``` 

>[!warning] Tenemos que cambiar el ejemplo
>Porque las operaciones simples no asignan memoria

| Method                     |       Mean |     Error |    StdDev |     Gen0 |  Allocated |
| -------------------------- | ---------: | --------: | --------: | -------: | ---------: |
| StringConcatenation        | 218.930 us | 0.7230 us | 0.6409 us | 641.8457 | 3933.56 KB |
| StringBuilderConcatenation |   1.645 us | 0.0034 us | 0.0030 us |   2.6875 |   16.47 KB |

## Interpretar resultados

Las columnas Gen se refieren a garbage collector
.Net usa un sistema generacional de basura, donde la memoria se divide en 3 "generaciones"

### Gen0
recoge las variables peques, temporales de rápido descarte. Es el tipo mas rápido. Ejs variables locales en métodos

### Gen1 y Gen2
objs más duraderos, rollo estáticos, singeltons, objetos cacheados o grandes colecciones usadas por muchas operaciones

Tener mucho Gen0 puede ser indicativo de uso de mem ineficiente. Mucho Gen2 o 3 puede ser que tu app demasiada caca de larga vida 

### Allocated
Es el total

>[!warning] Hay más info en el enlace https://www.freecodecamp.org/news/how-to-benchmark-your-code-in-csharp/ Leer a partir de **What Else Can You Test with BenchmarkDotnet**?
# Bibliografía

https://www.freecodecamp.org/news/how-to-benchmark-your-code-in-csharp/