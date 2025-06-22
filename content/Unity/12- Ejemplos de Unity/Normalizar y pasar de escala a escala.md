Para normalizar un valor, se usa `Mathf.InverseLerp(valorMinimo, valorMaximo, valorANormalizar)`

Para pasar de un valor normalizado a otra escala se usa `Mathf.Lerp(valorMinimo, valorMaximo, valorANormalizar)`

  

`Lerp` pasa de un valor normalizado (0 a 1) a uno dentro del rango, e `InverseLerp`, te dice, de 0 a 1, en qué posición dentro del rango está un valor, ejemplo

```cs 
Lerp(10, 20, 0.25) = 13

InverseLerp(10, 20, 13) = 0.25
``` 
