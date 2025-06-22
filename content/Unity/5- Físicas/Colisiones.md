De todas las formas que hay, esta funciona, así que vamos a usar esta:

La pieza que se mueve y genera la colisión tendrá un collider y un rigidbody

- Tanto el rigidbody, como el collider, como los métodos serán del mismo tipo i.e. 2D o 3D
    

Para que la pieza no caiga, el Rigidbody se puede tanto poner tanto kinematic como normal con gravedad 0

![[Pasted image 20250612194556.png]]

La pieza que recibe la colisión tendrá el collider (el cual estará con isTrigger activado) y tendrá un script OnTriggerEnter

![[Pasted image 20250612194612.png]]

```cs 
private void OnTriggerEnter2D(Collider2D other)
{
	print("Colisión");
}
``` 

