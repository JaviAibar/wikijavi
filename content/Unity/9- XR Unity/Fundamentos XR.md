Es importante leer esto antes de desarrollar nada con XR porque muchos conceptos se comparten entre todas las tecnologías y desconocerlos te hará sentir muy perdido y frustrado

Hay una serie de paquetes que debes conocer:

## XR Interaction Toolkit

Creo que esto es el conjunto de herramientas que te permiten desarrollar todo el tema XR, ejemplos: Cámara AR, seguimiento de imágenes para situar GO, anclas o reconocimiento de superficies entre otros

>[!warning] Cuidado
>Este paquete utiliza `Input System`, es decir, el nuevo. Osea que ==NO== desarrolles utilizando la clase `Input`

## AR Foundation

Parece ser el encargado de convertir nuestro juego a las diversas plataformas. En plan Android (ARCore), Apple (ARKit / Apple Vision Pro), entre otros.

## AR Core

AR Foundation se comunica con ARCore para obtener las características de AR en los dispositivos Android. Creo que es un API

Incluye seguimiento de movimiento, comprensión ambiental y estimación de luz

## ARKit

Es el ARCore de iOS

## XR Plugin Management

Aparentemente sirve para coordinar el resto de paquetes. Gestiona y ofrece ayuda con la carga, inicialización, configuración y soporte de compilación para los plug-ins XR.

![[Pasted image 20250706193000.png]]

# Limitaciones

ARCore no permite seguimiento de objetos 3D, Meshing, seguimiento de cuerpos 2D y 3D, participantas colaborativos o segmentaciones humana 
# Bibliografía

[AR Foundation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@4.2/manual/index.html)

[ARCore](https://developers.google.com/ar/develop?hl=es-419)

[XR Plugin Management](https://docs.unity3d.com/Manual/com.unity.xr.management.html)

[Configuración proyecto AR](https://learn.unity.com/pathway/mobile-ar-development/unit/get-started-with-ar/tutorial/configure-your-ar-development)
