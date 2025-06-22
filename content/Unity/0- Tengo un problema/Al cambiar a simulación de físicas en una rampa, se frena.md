Seguramente deberías poner al rigidbody la velocidad en lugar de aplicarle una fuerza

i.e

en vez de

<code style="color: #ff5454">
rb.AddForce(direction * Time.deltaTime);
</code>

usar

<code style="color: #92ff54">
rb.velocity = characterController.velocity;
</code>

