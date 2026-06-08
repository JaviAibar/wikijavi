---
title: Kotlin titulo
---

## `LaunchedEffect`: Explicación breve

`LaunchedEffect` lanza una corrutina cuando **cambia su clave** y la **cancela** si la clave vuelve a cambiar antes de que termine.

```kotlin 
LaunchedEffect(minutos) {
    // 1. Cuando 'minutos' cambia, se lanza esta corrutina
    // 2. Si 'minutos' vuelve a cambiar antes de terminar, se CANCELA y empieza una nueva
    delay(3000)  // 3. Espera 3 segundos... si no hay nuevo cambio
    // 4. Llega aquí solo si pasaron 3 segundos sin que 'minutos' cambiara
    ejecutarAlarma()
}
``` 

> [!note] Debe estar dentro de una funcion @Compose

