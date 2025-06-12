Seguramente deberías poner al rigidbody la velocidad en lugar de aplicarle una fuerza

i.e

en vez de

<code style="color: #F445FF">
rb.AddForce(direction * Time.deltaTime);
</code>

usar

<code style="color: #76ffc3">
rb.velocity = characterController.velocity;
</code>

