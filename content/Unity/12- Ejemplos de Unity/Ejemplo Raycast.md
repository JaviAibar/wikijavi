```cs 
public float raycastheight = 0.2f;
public float raycastLength = 0.2f;
public float raycastRadius = 0.02f;

grounded = Physics.SphereCast(new Ray(transform.position + Vector3.up * raycastheight, Vector3.down), raycastRadius, out RaycastHit hit, raycastLength);

---------------------

if (Physics.SphereCast(new Ray(transform.position + Vector3.up * raycastheight, Vector3.down), raycastRadius, out RaycastHit hit, raycastLength)) {
	// Aquí podemos obtener mogollón de info de hit
}
``` 


Para mostrar el raycast [mirar aquí](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1hNacgtG4Dp2i-lDXKY66ucBlIgTzqs8q/edit)

  

## Raycast 2D

```cs 
// Es un rayo muy pequeñito (para localizar lo que tienes muy cerca)
// El objeto con el que queremos colisionar, está en el Layer 9
// Para pasarle la máscara hacemos 1 << 9 que nos filtro SOLO dicho Layer
// Si quisieramos, por el contrario, que nos filtrara TODO excepto dicho layer, debería invertir los bits, es decir ~(1<<9)
RaycastHit2D raycast = Physics2D.Linecast(transform.position, transform.position + transform.up * 0.02f, 1 << 9);

if (raycast) print("Hemos dado con un Collider, de nombre "+raycast.collider.name);
``` 
