?: 

Sirve para dar un valor por defecto a variables que pueden ser null. Si es null, devuelve esto.

```kotlin 
fun main() {
    val nullString: String? = null
    println(nullString?.length ?: 0)
    // 0
}
``` 