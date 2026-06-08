```kotlin
fun circleArea(radius:Int) : Double {
	return radius * radius * PI
}
``` 

Se puede reescribir como porque es una función de una sola expresión

```kotlin
fun circleArea(radius:Int):Double = radius * radius * PI
``` 

> [!note] 
> 1. No se pueden poner ni var ni val
> 2. Void en este lenguaje es `Unit` pero se puede omitir

```kotlin
fun circleArea(radius:Int) = radius * radius * PI
``` 

> [!note] Las funciones de una sola expresión no necesitan definir el tipo que devuelven


## Argumentos con nombre

Para facilitar la lectura puedes añadir nombre a los argumentos

```kotlin 
printMessageWithPrefix(prefix = "Log", message = "Hello")
``` 

> [!note]  gracias a esta técnica podemos pasar los argumentos en el orden que queramos

## Valores por defecto de los parámetros

```kotlin 
fun printMessageWithPrefix(message: String = "Hola mundo", prefix: String = "Info") {
    println("[$prefix] $message")
}
``` 

En este ejemplo, las variables message y prefix tiene un argumento por defecto, si solo quisieramos cambiar el segundo podríamos usar los [[#argumentos con nombre]] para saltarnos el de message

```kotlin 
printMessageWithPrefix(prefix = "Log")
``` 

# Lambdas

```kotlin
fun main() {
    val upperCaseString = { text: String -> text.uppercase() }
    println(upperCaseString("hello"))
}
```
  
Lo que hay entre llaves es LA expresión lambda (se escriben entre llaves). Los parámetros antes de la flecha, el cuerpo, después

> [!note] Esta expresión se puede guardar en una variable

> [!note] Si escribes una lambda que no requiere argumentos, entonces te puedes ahorrar el ->
> ```kotlin 
> {"holamundo".uppercase()}
> ``` 

## Pasar una lambda a una función

```kotlin
val isNegative = { x: Int -> x < 0 }
``` 

y luego pasarsela a una función como filter

```kotlin
val numbers = listOf(1, -2, 3, -4, 5, -6)

val negatives = numbers.filter(isNegative)
``` 

> [!note] la función filter aplica la condición de la expresión lambda a cada elemento de una lista

.map() aplica la expresión lambda a cada elemento

Podemos pasarla directamente, en cuyo caso, kotlin infiere su tipo

```kotlin 
val negatives = numbers.filter({ x -> x < 0 })
``` 

Si una función solo tiene como parámetro la expresión lambda (como el caso del filtro, los paréntesis se pueden eliminar)

```kotlin 
val negatives = numbers.filter { x -> x < 0 }
``` 

## Tipo de función

En ocasiones es necesario indicar a Kotlin qué tipo recibe y devuelve una función

```kotlin 
val upperCaseString: (String) -> String = { text -> text.uppercase() }
``` 

Lo necesitamos si vamos a devolver una lambda de una función

Ejemplo, una función que te devuelve un conversor de cualquier unidad a segundos de tal forma que

```kotlin 
val conversorHoraSegundos = toSeconds("hour")

val conversorMinutosSegundos = toSeconds("minute")
``` 

Se haría de la siguiente forma 

```kotlin 
fun toSeconds(time: String): (Int) -> Int = when (time) {
    "hour" -> { value -> value * 60 * 60 }
    "minute" -> { value -> value * 60 }
    "second" -> { value -> value }
    else -> { value -> value }
}
``` 

## Invocación al momento

```kotlin 
println({ text: String -> text.uppercase() }("hello"))
``` 

## Lambda por fuera

Si la lambda es el último argumento, también se puede sacar de los paréntesis

```kotlin 
println(listOf(1, 2, 3)
	.fold(0, { x, item -> x + item }))
                            
println(listOf(1, 2, 3)
	.fold(0) { x, item -> x + item })
``` 

