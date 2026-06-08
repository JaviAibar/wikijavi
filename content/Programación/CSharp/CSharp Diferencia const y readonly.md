La constante solo se puede inicializar a la vez que la declaramos, es decir:

```cs 
public const double PI = 3.14; 
``` 


Mientras que la de solo lectura, además, la podremos inicializar desde el constructor o una propiedad

```cs 
public readonly double PI; 
public void MiClase() {
    PI = 3.14;
}
``` 

Las constantes son siempre estáticas, pero para que una de solo lectura lo sea, hay que especificarlo

```cs 
public static readonly double PI; 
``` 

La diferencia menos evidente es que el compilador sustituye las referencia de la constante como literales, mientras que las de solo lectura las mantiene. Es decir, si tienes un par de variables (una constante y otra readonly en un dll), aunque ese dll cambie, las que fuesen constantes ya no podrán cambiar, ejemplo:

1ª ejecución

> print("Constante: "+dllRef.constPI+" | Readonly: "+dllRef.readonlyPI); // Constante: 3.14 | Readonly: 3.14
>
> Ahora el creador de la dll decide cambiar ambos valores para que tengan más decimales (3.14156)

2ª ejecución

> // Constante: 3.14 | Readonly: 3.14156

Como se puede ver, la constante es sustituida por su valor, mientras que la readonly mantiene la referencia
![[Pasted image 20250610160849.png]]


# Bibliografía

[https://www.campusmvp.es/recursos/post/que-diferencia-existe-entre-const-y-readonly-en-el-lenguaje-c.aspx](https://www.campusmvp.es/recursos/post/que-diferencia-existe-entre-const-y-readonly-en-el-lenguaje-c.aspx) 

# Keywords

read-only read only solo lectura solo-lectura constante