## Transformar la posición del ratón a la posición en la escena

Por defecto, la posición del ratón que obtenemos con `Input.mousePosition` corresponde a la posición en la UI, para transformar dicha posicion en la correspondiente en la escena, es necesario el siguiente código:

```cs 
Camera.main.ScreenToWorldPoint(Input.mousePosition); 
``` 

No obstante, esta posición es relativa a la cámara (z = -10, o la que sea), para solucionar este sencillo problema, se puede modificar de la siguiente forma

```cs 
Camera.main.ScreenToWorldPoint(Input.mousePosition + Vector3.forward * Camera.main.transform.position.z * -1);
``` 