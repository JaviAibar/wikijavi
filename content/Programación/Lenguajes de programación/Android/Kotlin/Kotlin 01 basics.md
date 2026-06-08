
# for bucle 

```kotlin 
for (item in collection) print(item)
``` 

```kotlin 
println("Closed-ended range:")
for (i in 1..6) {
    print(i)
}
// Closed-ended range:
// 123456

println("\nOpen-ended range:")
for (i in 1..<6) {
    print(i)
}
// Open-ended range:
// 12345

println("\nReverse order in steps of 2:")
for (i in 6 downTo 0 step 2) {
    print(i)
}
// Reverse order in steps of 2:
// 6420
``` 

```kotlin 
for (i in routineSteps.indices) {
    println(routineSteps[i])
}
// Wake up
// Brush teeth
// Make coffee
``` 

```kotlin 
for ((index, value) in routineSteps.withIndex()) {
    println("The step at $index is \"$value\"")
}
// The step at 0 is "Wake up"
// The step at 1 is "Brush teeth"
// The step at 2 is "Make coffee"
``` 


# Biblio

https://kotlinlang.org/docs/control-flow.html#while-loops
