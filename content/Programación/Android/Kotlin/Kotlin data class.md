Especialmente pensadas para almacenar info. Tienen las mismas funcionalidades que las lases pero tiene miembros automaticos para imprimir la instancia de forma legible, comparar, copiar y demás.

```kotlin 
data class User(val name: String, val id: Int)

val user = User("Alex", 1)

println(user)            
// User(name=Alex, id=1)
``` 

## copiar

```kotlin 
val user = User("Alex", 1)

// Creates an exact copy of user
println(user.copy())       
// User(name=Alex, id=1)

// Crea una copia (mantiene todos los valores), pero cambia el nombre 
println(user.copy("Max"))  
// User(name=Max, id=1)

// Creates a copy of user with id: 3
println(user.copy(id = 3)) 
// User(name=Alex, id=3)
``` 

