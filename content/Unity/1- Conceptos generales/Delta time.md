`Time.deltaTime` es el tiempo transcurrido entre un frame y el anterior.

Si cada frame sumase el delta time, el resultado después de un segundo será aprox uno

Si le pones, por ejemplo, velocidad de 20 y lo multiplicamos por `deltaTime`, el resultado tras un segundo de ejecución sería haberse movido 20 unidades

`FixedDeltaTime` es estable porque devuelve el tiempo entre un `FixedUpdate` y el siguiente. Siempre devuelve lo mismo, no tiene sentido usarlo en el `Update`.

`FixedUpdate` es más preciso y es configurable (`ProjectSettings > Time`)
  
  
```cs 
tranform.position = new Vector2(0, tranform.position.y + velocidad * Time.deltaTime);
``` 


Hará qué el gameobject en cuestión se mueva equitativamente, a tantas unidades por segundo como le indiquemos en el parámetro velocidad