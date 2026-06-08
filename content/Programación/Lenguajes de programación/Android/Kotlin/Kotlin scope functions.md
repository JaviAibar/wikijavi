| Function | Access to `x` via | Return value  | Use case                                                                               |
| -------- | ----------------- | ------------- | -------------------------------------------------------------------------------------- |
| `let`    | `it`              | Lambda result | Revisa que la variable no sea null y después realiza acciones con el objeto resultante |
| `apply`  | `this`            | `x`           | Inicializa objetos en el momento de la creación                                        |
| `run`    | `this`            | Lambda result | Inicializa objetos en la creación Y computa un resultado                               |
| `also`   | `it`              | `x`           | Completa acciones adicionales antes de devolver el objeto                              |
| `with`   | `this`            | Lambda result | Llama a multiples funciones en un objeto                                               |
funciones ámbito ambito

# Ejemplos

## Let

Revisa que la variable no sea null y después realiza acciones con el objeto resultante

```kotlin 
fun sendNotification(recipientAddress: String): String {
    println("Yo $recipientAddress!")
    return "Notification sent!"
}

fun main() {
    val address: String? = AddressList.getNextAddress()
    sendNotification(address) // ⚠️ sendNoti requiere no-null
}
``` 

Podríamos resolver con if else

```kotlin 
val address: String? = getNextAddress()
val confirm = if(address != null) {
    sendNotification(address)
} else { null }
``` 

Pero queda más limpio con let.
En este caso significa "si no fuera null, qué hacemos"

```kotlin 
val address: String? = getNextAddress()
val confirm = address?.let {
    sendNotification(it)
}
``` 

## apply

Inicializa objetos en el momento de la creación

```kotlin 
class Client() {
    var token: String? = null
    fun connect() = println("connected!")
    fun authenticate() = println("authenticated!")
    fun getData() : String {
        println("getting data!")
        return "Mock data"
    }
}

val client = Client()

fun main() {
    client.token = "asdf"
    client.connect()
    client.authenticate()
    client.getData()
}
``` 

Lo hacemos todo a la vez

```kotlin
val client = Client().apply {
    token = "asdf"
    connect()
    authenticate()
}

fun main() {
    client.getData()
}
``` 

## Run

Inicializa objetos en la creación Y computa un resultado

> Similar al `apply`, puedes inicializar un objeto, pero es mejor usar `run` para inicializar en un momento especifico en tu código e inmediatamente computar un resultado

```kotlin 
val client: Client = Client().apply {
    token = "asdf"
}

fun main() {
    val result: String = client.run {
        connect()
        authenticate()
        getData()
    }
}
``` 

Este no me queda claro, tal vez sea por el `getData()`

## Also

Completa acciones adicionales antes de devolver el objeto

```kotlin 
fun main() {
    val medals: List<String> = listOf("Gold", "Silver", "Bronze")
    val reversedLongUppercaseMedals: List<String> =
        medals
            .map { it.uppercase() }
            .filter { it.length > 4 }
            .reversed()
    println(reversedLongUppercaseMedals)
    // [BRONZE, SILVER]
}
``` 

con alsos

```kotlin 
fun main() {
    val medals: List<String> = listOf("Gold", "Silver", "Bronze")
    val reversedLongUppercaseMedals: List<String> =
        medals
            .map { it.uppercase() }
            .also { println(it) }
            // [GOLD, SILVER, BRONZE]
            .filter { it.length > 4 }
            .also { println(it) }
            // [SILVER, BRONZE]
            .reversed()
    println(reversedLongUppercaseMedals)
    // [BRONZE, SILVER]
}
``` 

Entiendo que te permite hacer logs entremedias de la ejecución

## With

Llama a múltiples funciones en un objeto

A diferencia del resto, no es de extensi´n

```kotlin 
fun main() {
    val mainMonitorPrimaryBufferBackedCanvas = Canvas()

    mainMonitorPrimaryBufferBackedCanvas.text(10, 10, "Foo")
    mainMonitorPrimaryBufferBackedCanvas.rect(20, 30, 100, 50)
    mainMonitorPrimaryBufferBackedCanvas.circ(40, 60, 25)
    mainMonitorPrimaryBufferBackedCanvas.text(15, 45, "Hello")
    mainMonitorPrimaryBufferBackedCanvas.rect(70, 80, 150, 100)
    mainMonitorPrimaryBufferBackedCanvas.circ(90, 110, 40)
    mainMonitorPrimaryBufferBackedCanvas.text(35, 55, "World")
    mainMonitorPrimaryBufferBackedCanvas.rect(120, 140, 200, 75)
    mainMonitorPrimaryBufferBackedCanvas.circ(160, 180, 55)
    mainMonitorPrimaryBufferBackedCanvas.text(50, 70, "Kotlin")
}
``` 

pasa a ser

```kotlin 
val mainMonitorSecondaryBufferBackedCanvas = Canvas()
with(mainMonitorSecondaryBufferBackedCanvas) {
    text(10, 10, "Foo")
    rect(20, 30, 100, 50)
    circ(40, 60, 25)
    text(15, 45, "Hello")
    rect(70, 80, 150, 100)
    circ(90, 110, 40)
    text(35, 55, "World")
    rect(120, 140, 200, 75)
    circ(160, 180, 55)
    text(50, 70, "Kotlin")
}
``` 

