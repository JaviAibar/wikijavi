En el momento de crear la cámara virtual, deberemos tener seleccionada la main camara que viene por defecto

# Rotar la cámara

Para que la vcam rote al rededor del personaje, debemos crear un gameobject vacío dentro del personaje, que lo seguirá en su lugar, es decir, en lugar de seguir al personaje, seguirá al gameobject vacío, de tal forma que al girar dicho gameobject gire la camara quedando el personaje quieto

Steven es el personaje, FollowTarget es el gameobject vacío

![[Pasted image 20250624180911.png]]

![[Pasted image 20250624180914.png]]

Otra forma de rotar la cámara, haciendo más uso de las características predefinidas de cinemachine es mediante el uso de OTRA cámara virtual llamada "FreeLook".

  

Tuvimos un problema con el giro de la cámara. Si moviamos un poco la cámara, y movias al personaje hacia adelante, se quedaba contínuamente girando. Imagino que por algo de coger la dir de la camara o yo qué sé. El caso es que existe en cinemachine (al menos, en la cámara de FreeLook) una opción que permite reajustar

# OPCIONES GENERALES

Damping tarda unos segundos en volver a la posición centrada.

Lookahead cambia un poco el punto central en el momento de moverse, cuando te quedas parado, vuelve a centrarse