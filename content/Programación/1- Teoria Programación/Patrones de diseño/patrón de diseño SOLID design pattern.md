
Aplicar el patrón de diseño [[Programacion (DI) Dependency Inyection]] debería cumplir automáticamente los principio de Single Responsibility y Dependency Inversion
# Definiciones

- Módulo / clase de alto nivel es aquella que está más cerca del usuario, la que el usuario acciona
    
- Módulo / clase de bajo nivel es aquella que subyace, las clases de alto nivel son las que el hacen uso de las de bajo nivel
# Single Responsibility

Una clase se tiene que encargar de solo una tarea.

![[Pasted image 20250611171916.png]]
Ese método trata sobre persistencia, no sobre datos

### Solución

Mover el método discordante a otra clase destinada a la persistencia

![[Pasted image 20250611171943.png]]


# Open Close

El código debe estar abierto a mejoras pero cerrado a modificaciones

Según lo entiendo yo es, gracias a crear la interfaz (Liskov Substitution) si quiere modificar la funcionalidad, crearás una nueva clase que derive de la interfaz en lugar de modificar el código original

### Ejemplo mala praxis

![[Pasted image 20250611172007.png]]

En este ejemplo, por cada clase representando a una figura que añadamos, deberíamos estar editándola.

### Solución

Abstraer las posibles futuras formas con una interfaz que nos defina el método en la propia figura.

![[Pasted image 20250611172047.png]]

![[Pasted image 20250611172108.png]]

# Liskov Substitution

Una clase nunca podrá reducir or sustituir funcionalidad de una clase padre, solo aumentarla / añadir funcionalidad

### Ejemplo mala praxis

![[Pasted image 20250611172124.png]]

Se cambia la funcionalidad de Rectangle poniendo el mismo valor a ambas independientemente de si editar altura o anchura

### Solución (en este caso)

No heredar, sencillamente añadir un método IsSquare() que nos indica si lo es o no, el resto de la funcionalidad es idéntica.

![[Pasted image 20250611172143.png]]

# Interface Segregation

Es como la de Single Responsability pero aplicado a las interfaces

### Ejemplo mala praxis

![[Pasted image 20250611172157.png]]

Al tener una interfaz con métodos tan diversos, nos obliga a implementar métodos vacíos en clases que no lo necesitan, ya que, siguiente este ejemplo...

... un personaje Goblin, no debería poder disparar o hablar, ya que carecen de estas habilidades


![[Pasted image 20250611172212.png]]

### Solución

Dividir esa interfaz en tantas como sea necesario.

![[Pasted image 20250611172245.png]]


## Dependency Inversion

Nota: Dependiente depende de dependencia. Por tanto Dependiente --> Dependencia

La más confusa. Una clase de alto nivel no debe estar acoplada a una de bajo nivel. Sirve para analizar 3 posibles problemas: el nivel de rigidez, la fragilidad y la inmovilidad del sistema.

La explicación de qué es alto y bajo nivel, en está [Definiciones](https://sites.google.com/view/wikijavi/inform%C3%A1tica/buenas-pr%C3%A1cticas/patrones-de-dise%C3%B1o/solid-design-pattern-patr%C3%B3n-de-dise%C3%B1o#h.hczk9uefvttm)

### Ejemplo mala práxis (1)

![[Pasted image 20250611172305.png]]

Una clase de alto nivel es esa que hace uso de otra de bajo nivel.

En este ejemplo EstacioMeteorologica usa Termometro

termometro.MostrarTemperaturaActual();

En este ejemplo hay 3 cosas mal. Las vemos una a una:

Por una parte EstacioMeteorologica depende de Termometro y de Console. Por su parte Termometro depende de Console

![[Pasted image 20250611172332.png]]
Como Termometro devuelve el valor, ya no depende de Console, por lo que, de cambiar la implemetación de Console, Termometro ya no se vería afectada

Evidentemente siempre va a haber dependencias. Pero cuantas menos, mejor

![[Pasted image 20250611172410.png]]


Esta estación meteorológica no es muy útil si solo puede dar la temperatura. Sería interesante abstraer con una interfaz todos los sensores para poder dar flexibilidad a EstacioMeterologica. (Esta implementación se llama [patrón de la Fachada](https://refactoring.guru/es/design-patterns/facade))

La interfaz nos servirá como contrato para todas las clases que la necesiten

Gracias a esto, hemos desacoplado EstacioMeterologica de la implementación concreta de Termometro, podríamos crear otros tipos de termómetro sin tener que editar EstacioMeterologica

![[Pasted image 20250611172430.png]]

Como creamos el objeto Termometro (dependencia) dentro del método o constructor, nos limita el uso a ese y solo ese termómetro, por que lo suyo es inyectarlo. Hay tres opciones: en el constructor, por un setter o por interfaz

![[Pasted image 20250611172446.png]]

Desde fuera (en el `Start()`) podríamos crear varios objetos `EstacioMeteorologica`

```cs
new EstacioMeteorologica(new Termometro()) 
```

o 
```cs 
new EstacioMeteorologica(new Barometro())
``` 

![[Pasted image 20250611172500.png]]

### Ejemplo mala práxis (2)

![[Pasted image 20250611172522.png]]

### Solución

Emplear una interfaz para que cada clase de bajo nivel la implemente

![[Pasted image 20250611172534.png]]

De tal forma que la clase de alto nivel, no tiene por qué saber cuántas hay ni cuales son las de bajo nivel.

De esta forma está desacoplado, puedes añadir tantas de bajo nivel como necesites, eliminar alguna que ya no necesites o editarlas sin que cambie la implementación de la de alto nivel

![[Pasted image 20250611172546.png]]


# Ejemplo completo usando Unity

Esta clase se encarga de

1. Lanzar un rayo para buscar si choca
    
2. Comprobar si lo chocado es seleccionable
    
3. Aplicar / Retirar el efecto de la selección

![[Pasted image 20250611172600.png]]

Para poder aplicar Single Resp, debemos sacar toda esta funcionalidad a diferentes clases. Vamos paso a paso

Comenzamos por la de aplicar o retirar el efecto de la selección

## Aplicar o retirar el efecto de la selección

Lo primero que podemos hacer es aislar la funcionalidad en un método

![[Pasted image 20250611172615.png]]

Creamos la referencia a la nueva clase, en la clase que la usa

![[Pasted image 20250611172632.png]]

Antes de pasar los métodos a la nueva clase, debemos asegurarnos que tiene todas las variables miembro que necesita. En este caso, le faltan las referencias a defaultMaterial y highlightMaterial

Así queda una vez movida esa responsabilidad a la nueva clase.

Sin embargo, todavía no hemos aplicado el principio de Open-Close. ya que si quieramos modificar el comportamiento, pero para ello, vamos a aplicar el principio de sustutición de Liskov.

![[Pasted image 20250611172652.png]]


Para ello vamos a extraer de la nueva clase, una interfaz, sobre la que dependeremos.

De esta forma, en vez de depender de la clase concreta, dependemos de la interfaz que puede ejecutar la funcionalidad de cualquier clase concreta que implemente ISelectionResponse

![[Pasted image 20250611173048.png]]

Esto nos permite también cumplir con el principio de inversión de dependencias, ya que, en lugar de depender de lo concreto, dependemos de lo abstracto

![[Pasted image 20250611173131.png]]

Ahora SelectionManager está adscrita al principio Open-Close ya que podemos crear la implementación que queramos de ISelectionResponse y funcionará sin editar el código. Ejemplo:

En lugar de aplicar un material, coge otro componente y le aplica un cambio

![[Pasted image 20250611173151.png]]

## Crear el RayCast

Vamos a hacer lo mismo moviendo esta funcionalidad a una clase y extrayendo de ésta una interfaz

![[Pasted image 20250611173221.png]]

Clase nueva (Single Responsibility)

![[Pasted image 20250611173238.png]]

Extraemos la interfaz (Liskov Substitution)

![[Pasted image 20250611173254.png]]

Referencia a la interfaz (Dependency Inversion)

![[Pasted image 20250611173309.png]]

## Comprobar si lo chocado es seleccionable

Esta es la parte más complicada

1. Pasamos el código a la nueva clase
    
2. Pasamos los miembros que necesita
    
3. Creamos un método para devolver la selección

![[Pasted image 20250611173328.png]]

Liskov substitution

![[Pasted image 20250611173344.png]]
Dependency Inversion

![[Pasted image 20250611173600.png]]

## Resultado final

![[Pasted image 20250611173606.png]]

# Bibliografía

[Clean Code Teil 2: Die SOLID Design Prinzipien](https://youtu.be/QKX9VJAvGWM)

[https://desarrolloweb.com/articulos/patron-diseno-contenedor-dependencias.html](https://desarrolloweb.com/articulos/patron-diseno-contenedor-dependencias.html) 

[https://youtu.be/QDldZWvNK_E](https://youtu.be/QDldZWvNK_E)

