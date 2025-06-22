# El personaje no resbala

Resulta que charController.isGrounded y el slope limit funcionan regular, así que sugiere sustituir estas funciones por las nuestras.

Esta persona se basa en el funcionamiento de su [controller disponible en GitHub](https://github.com/GreenByteSoftware/UNet-Controller) donde hace cosas muy locas

Necesitamos las siguientes propiedades

```cs 
public float slopeLimit = 0.2f;
public float slideFriction = 0.3f; 
public Vector3 hitNormal;
``` 


Básicamente obtiene las normales de la colisión del character controller con cualquier cosa

```cs 
void OnControllerColliderHit (ControllerColliderHit hit) {
    hitNormal = hit.normal;
}
``` 

Comprobamos la inclinación del suelo, aunque previamente habría que comprobar si estamos en el suelo con ayuda de un [Raycast](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1I8nT_wscDSQq6oCmv2nO9BcKjuPSFq2l/edit)

```cs 
isGrounded = (Vector3.Angle (Vector3.up, hitNormal) <= slopeLimit);
``` 

junto con el `Raycast` quedaría así:

```cs 
isGrounded = Physics.SphereCast(new Ray(transform.position + Vector3.up * raycastheight, Vector3.down), raycastRadius, out RaycastHit hit, raycastLength) && (Vector3.Angle(Vector3.up, hitNormal) <= slopeLimit);
``` 

Una vez tenemos esos dos valores (el grounded correcto y la normal con el suelo) deberíamos aplicar un aumento de la velocidad en dirección hacia la normal para que el jugador empiece a resbalar:

```cs 
if (!grounded)
{
     dir.x += (1f - hitNormal.y) * hitNormal.x * (1f - slideFriction);
     dir.z += (1f - hitNormal.y) * hitNormal.z * (1f - slideFriction);
 }
 ``` 

# Bibliografía

AurimasBlazulionis nos lo explica [aquí](https://answers.unity.com/questions/1358491/character-controller-slide-down-slope.html)