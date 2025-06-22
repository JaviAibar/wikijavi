# Introducción

Este tutorial está pensado para Unity XR Toolkit 2022 y fue publicado en julio de 2022

## Activar VR

`Edit > Project Settings > XR Plugin Management`

Para abarcar el máximo número de gafas posible, tendremos que seleccionar Open XR en Desktop y en Android

Seleccionamos OpenXR

![[Pasted image 20250622192322.png]]

Y configuramos el perfil de interacción en la pestaña Desktop

![[Pasted image 20250622192330.png]]

Y añadimos un montón

![[Pasted image 20250622192343.png]]

También en Android, pero aquí solo pone Oculus

![[Pasted image 20250622192352.png]]

Ya se puede ver las escena en las gafas, pero no reconoce el movimiento de la cabeza

![[Pasted image 20250622192403.png]]

Para ello, deberemos incluir el componente Tracked Pose Driver en algún GameObject (él lo pone en la cámara)

![[Pasted image 20250622192410.png]]

Adicionalmente, para poder probarlo en el editor de Unity, deberás configurar el ordenador para que las gafas 

No estoy seguro de que explique cómo se hace, [lo dice aquí](https://youtu.be/HhtTtvBF5bI?list=PLpEoiloH-4eP-OKItF8XNJ8y8e1asOJud&t=443)

# Acelerando las pruebas

Ahora se descarga [Unity XR Interaction Toolkit](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.5/manual/index.html)

![[Pasted image 20250622192432.png]]

Ahora sustituye la camara original por un XR Origin y lo ubica en el centro (0, 0, 0)

![[Pasted image 20250622192439.png]]

Hace esto porque ahora tiene lo mismo que antes pero con muchas más cosas

Y descarga el Asset Starter del toolkit

![[Pasted image 20250622192446.png]]

# Controles

Dentro del Camera Offset crear un GO vacío que llama "Left hand"

Y le añade un componente XR Controller

![[Pasted image 20250622192508.png]]

Lo duplica como "Right hand"

![[Pasted image 20250622192515.png]]

Pone los presets correspondientes (que nos descargamos del toolkit) en cada mano

![[Pasted image 20250622192522.png]]

En el XR Origin le añade el componente Input Action Manager

![[Pasted image 20250622192534.png]]

Y le arrastra el Default Input Actions del Toolkit

![[Pasted image 20250622192541.png]]

A cada mano, le pone cubitos pequeños en el (0, 0, 0) quitando los colliders para que no colisionen

![[Pasted image 20250622192550.png]]

Y ya tiene manitas

![[Pasted image 20250622192557.png]]

# Bibliografía

[How to make a VR game - Unity XR Toolkit 2022](https://www.youtube.com/playlist?list=PLpEoiloH-4eP-OKItF8XNJ8y8e1asOJud)

[How to Make a VR Game in Unity - PART 1](https://youtu.be/HhtTtvBF5bI?list=PLpEoiloH-4eP-OKItF8XNJ8y8e1asOJud)

