# numpy.arange

Devuelve un intervalo uniformemente espaciado
`numpy.arange([_start_, ]_stop_, [_step_, ]_dtype=None_, _*_, _device=None_, _like=None_)`

Ejemplo, si quieres los pares entre 2 y 12 (sin incluir el 12, pues 
`numpy.arange(2, 12, 2)`,
esto devolverá  `[2 4 6 8 10]`

Solo es obligatorio un numero, pues por defecto start es 0 y step es 1
`numpy.arange(12)`
devolverá
`[0 1 2 3 4 5 6 7 8 9 10 11]`