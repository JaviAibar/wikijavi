# Introducción

El código c++ normalmente se escribe en archivos .cpp

```c
#include <iostream>

int main() {
  std::cout << "Hello World!\n";
}
``` 

std::cout significa “character output stream”. Se pronuncia “see-out”.

# Punteros

Se trata de variables que contiene la dirección en memoria a otra variable

para obtener la dirección de una variable, se utiliza &

```c
num = 20;
cout << "Dirección de num: "<< &num << endl;

// resultado: Dirección de num: 0x35f32
``` 
  

Estas direcciones podemos guardarlas en una variable, para definir el variable de tipo puntero, se utiliza *

```c
*dir = &num;
``` 

Para obtener el valor que está en una dirección de memoria, también se emplea *

```c
cout << "Contenido en dirección de memoria: " << *dir << endl;

// resultado: Contenido en dirección de memoria: 20
``` 
  

## ¿Para qué sirven los punteros?

En lenguajes de más alto nivel, los punteros se gestionan automáticamente, sin embargo en C y C++ lo tenemos que gestionar nosotros, esto quiere decir que si tenemos un array, no podremos acceder directamente a la posición  `numeros[2]`, en su lugar, deberemos quedarnos con el puntero a la primera posición, sumar 2 a dicho puntero y acceder al contenido del puntero.

Ejemplo:
```c
int numeros[] = {4, 6, 2 ,7, 8}
int *dir_numeros;
dir_numeros = &numeros;
for (int i = 0; i < 5; i++) {
    cout << "Elemento del vector [" << i << "]: " << *dir_numeros++ << endl;
}
// resultado: 
	Elemento del vector [0]: 4
	Elemento del vector [1]: 6
	Elemento del vector [2]: 2
	Elemento del vector [3]: 7
	Elemento del vector [4]: 8
``` 