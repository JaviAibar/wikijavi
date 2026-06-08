|Category|Basic types|Example code|
|---|---|---|
|Integers|`Byte`, `Short`, `Int`, `Long`|`val year: Int = 2020`|
|Unsigned integers|`UByte`, `UShort`, `UInt`, `ULong`|`val score: UInt = 100u`|
|Floating-point numbers|`Float`, `Double`|`val currentTemp: Float = 24.5f`, `val price: Double = 19.99`|
|Booleans|`Boolean`|`val isEnabled: Boolean = true`|
|Characters|`Char`|`val separator: Char = ','`|
|Strings|`String`|`val message: String = "Hello, world!"`|


Pair<T, T>


| Collection type | Description                    |
| --------------- | ------------------------------ |
| Lists           | Elementos ordenados            |
| Sets            | Elementos **unicos** sin orden |
| Maps            | Diccionario                    |


# List (con orden)

Para solo lectura  ([`List`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-list/)), usa la funcion [`listOf()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/list-of.html) .

Para lista modificable ([`MutableList`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-mutable-list.html)), usa la funcion [`mutableListOf()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/mutable-list-of.html) .

Y para la [[Kotlin Actualizar vista#Objetos y colecciones observables|observable]] `MutableStateList`, usa la función `mutableStateListOf<T>()`

# Set (unicos sin orden)

Para el set solo lectura ([`Set`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-set/)), usa la funcion [`setOf()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/set-of.html) .

Para el set modificable ([`MutableSet`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-mutable-set/)), usa la funcion [`mutableSetOf()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/mutable-set-of.html) .

Parece no existir una version observable


# Map (diccionario)

Para el map solo lectura ([`Map`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-map/)), usa la funcion [`mapOf()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/map-of.html) .

Para el map modificable ([`MutableMap`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-mutable-map/)), usa la funcion [`mutableMapOf()`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/mutable-map-of.html) .

Para el map observado SnapshotStateMap usa [mutableStateMapOf](https://developer.android.com/reference/kotlin/androidx/compose/runtime/package-summary#mutableStateMapOf\(\))

