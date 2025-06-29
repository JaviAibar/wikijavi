# Intro

Se recomienda utilizar un workflow predefinido como plantilla. Yo he convertido un proyecto antiguo de prueba para aprender git en uno para CI/CD con Python, donde se ejecutarán unas pruebas unitarias.

El archivo yaml se ubica en .github/workflows

# Formato

![[Pasted image 20250610113338.png]]

name: El nombre que se mostrará en 

on: para eventos (dentro están los eventos con su nombre seguido de dos puntos

Lo que vemos en la captura nos indica: cada vez que alguien haga push o pull-request a nuestra rama "main" se ejecuta el contenido de este workflow

El resto de eventos están [descritos aquí](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

![[Pasted image 20250610113406.png]]

jobs describe qué va a ocurrir cuando, el cuerpo del workflow

en la captura vemos "build" pero no es una palabra registrada, es arbitrario, es el nombre que quieras asignar a esa acción correspondiente

steps describe cada una de las acciones que se van a ir ejecutando.

Lo primero que vemos que hace es uses que ejecuta un comando, en este caso hacer un checkout del repositorio. pone "actions/" porque esta acción está predefinida en Github. Más [acciones predefinidas aquí](https://github.com/actions)

Lo siguiente que hace es configurar el entorno Python con la versión indicada

![[Pasted image 20250610113437.png]]

Despues lanza algunos comandos para instalar y configurar las dependencias

Se puede notar que cada paso tomado, se define mediante un guión

![[Pasted image 20250610113452.png]]
  
Si quisieramos obtener información sobre el entorno, podríamos hacer

-name: Listar carpetas

run: ls -la

Por último, ejecuta los tests

# Bibliografía

[GitHub Actions Tutorial - Basic Concepts and CI/CD Pipeline with Docker](https://www.youtube.com/watch?v=R8_veQiYBjI)

[Eventos](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

[Acciones predefinidas de Github](https://github.com/actions)