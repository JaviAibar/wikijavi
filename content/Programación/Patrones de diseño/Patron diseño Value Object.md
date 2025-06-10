# ¿Qué es?

Los Value Object son objetos en los que encapsulamos variables. Esto nos permite que se autovalide. En el ejemplo, el Email se está validando con una expresión regular en el momento de la instancia

Además nos permite crear otros métodos con los que manejar el objeto. Por ejemplo si quisieramos tener un int, luego podríamos hacer variable.next() y el estado del objeto cambiaría

![[Pasted image 20250610130950.png]]

# ¿Para qué?

Sirve para poder extraer la funcionalidad que no es realmente de una clase (por ejemplo, la validacion de email, no es responsabilidad del usuario) y así respetar el [[patrón de diseño SOLID design pattern#Single Responsibility|principio de responsibilidad única]] 

![[Pasted image 20250610131018.png]]

# Bibliografía

[https://www.youtube.com/watch?v=q_biZCsoloU&ab_channel=CodelyTV-Redescubrelaprogramaci%C3%B3n](https://www.youtube.com/watch?v=q_biZCsoloU&ab_channel=CodelyTV-Redescubrelaprogramaci%C3%B3n)