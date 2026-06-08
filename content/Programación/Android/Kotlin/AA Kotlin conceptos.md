# Funciones en línea (inline functions)

El compilador copiará el código de la función marcada con `inline` para evitar crear objetos lambda, lo cual causa overhead

Tomando este ejemplo de DeepSeek 

```kotlin 
// SIN inline (comportamiento normal)
fun ejecutar(tarea: () -> Unit) {
    tarea()  // Salta a otra función, crea objeto lambda
}

fun main() {
    ejecutar { println("Hola") }
}

// CÓMO LO VE EL COMPILADOR (simplificado):
// Crea una clase anónima para el lambda
// main() -> llama a ejecutar() -> ejecutar() llama al método del lambda
``` 

solo añadiendo `inline`

```kotlin 
// CON inline
inline fun ejecutar(tarea: () -> Unit) {
    tarea()
}

fun main() {
    ejecutar { println("Hola") }
}

// CÓMO LO VE EL COMPILADOR DESPUÉS DE inline:
fun main() {
    // El código se copia directamente
    println("Hola")
}
``` 

La regla nemotécnica es la siguiente:

**Cuándo usar `inline`:**

- ✅ Funciones pequeñas (3-5 líneas)
- ✅ Funciones que reciben lambdas como parámetros
- ✅ Código muy repetitivo en loops

**Cuándo NO usar `inline`:**

- ❌ Funciones grandes (el código duplicado empeora el rendimiento)
- ❌ Funciones que no usan lambdas (no hay beneficio)

# Funciones de orden superior (Higher-order functions)

# Closure

Es un ámbito de variables (scope) que puede ser accedido desde el cuerpo del método y conlleva un consumo de recursos

# Primera clase

Las funciones son de primera clase, lo que significa que se pueden guardar en una variable o estructura de datos y pasar como argumento

# Llamadas virtuales

Según Deepseek, se trata de una llamada que se resuelve en ejecución debido a que el método, al estar dentro de una interfaz, no ha sido concretado en tiempo de compilación

# Importante

Revisa también los [[Programación Conceptos transversales básicos|Conceptos transversales]]