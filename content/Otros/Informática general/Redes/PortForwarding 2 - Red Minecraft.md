Realmente no voy a escribir sobre Port Forwarding, si no de una VPN (al estilo Hamachi) con ZeroTier, más claro y mejor

Para configurar correctamente ZeroTier, el que crea la red, deberá pedir al resto que se unan mediante el código de red, esos que son del estilo (d5e5fb6...)

Una vez ya estén todos en la red hay que hacer dos cositas en la web de ajustes ([https://my.zerotier.com/](https://my.zerotier.com/) )

1. Autorizar a los usuarios mediante el checkbox que les sale a la izquierda

2. En el apartado de Auto-assign IPv4, hay que seleccionar manualmente una, ese será nuestro rango de IPs, los cuales usaremos para conectarnos (el que hostee minecraft, deberá pasar la IP de ZeroTier al resto para que se conecten) en la aplicación se la conoce como "Managed IPs"

Por último, habrá que crear una regla en el Firewall TCP/UDP para el puerto 25565

  

Y en principio, ya está