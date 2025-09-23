[[Fundamentos XR|Lee esto primero]]

Antes de comenzar creo que debes tener instalado en tu movil [Servicios de Google Play para RA](https://play.google.com/store/apps/details?id=com.google.ar.core&pli=1) (o un nombre parecido)  y tal vez ARCore Elements 

Unity provee una plantilla que puedes descargar de `Unity Hub` (en `Projects > + New project > Core`) y viene ajustes hechos, librerias instaladas y 3 Gameobjects preestablecidos: el sol, y 3 específicos relacionados con el AR: `AR Session, AR Session Origin y la cámara AR` y que veremos más tarde

![[Pasted image 20250622190022.png]]

# Ajustes

Por defecto tiene ciertos ajustes hechos y que se pueden modificar en `Edit > Project Settings` y son los siguientes:

![[Pasted image 20250622190042.png]]

`XR` significa `Xtended Reality` y es la forma en la que Unity se refiere tanto a Realidad aumentada como Realidad virtual

Ahí vamos a Android y activamos `ARCore` (la biblioteca AR de Google)

![[Pasted image 20250622190107.png]]

> [!warning] Es crucial que esto esté activado
>  ![[Pasted image 20250622190128.png]]

El API de Android debe ser, como mínimo, 24. El Scripting Backend debe ser IL2CPP y la arquitectura objectivo debe contener ARM64 (Si por algún ajuste no funcionase, compararlos con los del tipo del vídeo en la bibliografía [o aquí](https://youtu.be/gpaq5bAjya8))

_ProjectSettings > Player > Other Settings_
![[Pasted image 20250622190237.png]]

El tipo recomienda actualizar todos package relacionados con XR / AR

![[Pasted image 20250622190245.png]]

# La escena

>[!warning] Obsoleto
>Esto está más o menos obsoleto. Revisión un poco más abajo

![[Pasted image 20250622190300.png]]

El `GO AR Session` contiene un script de mismo nombre que controla el ciclo de vida de la aplicación AR, por lo que es fundamental que esté

![[Pasted image 20250622190327.png]]

El `AR Session Origin` se encarga de mapear el mundo real y situar en él los objectos creados (el tipo cree que en el futuro se llamará XR Session Origin)

> [!importante] ACTUALIZACIÓN Dic '23
> El tipo tenía razón, sin embargo, en este momento todavía se descarga obsoleto, arreglarlo es fácil porque funciona idéntico

El tipo elimina todos los componentes a excepción de AR Session Original ya que son extensiones que no quiere emplear para su ejemplo, pero en la realidad, tal vez los necesites si lo que te has planteado lo requiere.

  

En su lugar añade `AR Tracked Image Manager` esto detectará una imagen del mundo real y situará ahí nuestro GameObject

![[Pasted image 20250622190339.png]]


> [!note] Revisión

Por defecto ahora el API mínimo son 30. Como mi móvil es 28, lo reduzco

* AR Foundation --> 5.2.0
* Google ARCore XR Plugin --> 5.2.0
* XR Core Utilities --> 2.5.2
* XR Interaction Toolkit --> 3.1.2
* XR Legacy Input Helpers --> 2.1.12
* XR Plugin Management --> 4.5.0

AR Session está idéntico

AR o XR Session Origin ya no viene por defecto, ahora se llama XR Origin (AR Rig) y tiene los siguientes cambios:
*Añadido* Input Action Manager
*Eliminado* AR Anchor Manager
*Eliminado* Anchor Creator

> [!note] Extracto del tutorial de la web https://learn.unity.com/pathway/mobile-ar-development/unit/get-started-with-ar/tutorial/configure-your-ar-development#64a51c4dedbc2a75176df399

El GameObject [AR Session Origin](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@1.0-preview.8/api/UnityEngine.XR.ARFoundation.ARSessionOrigin.html) representa el dispositivo en el espacio. Cuando el usuario se mueve o gira en el mundo real, AR Session Origin se mueve igual en la escena. AR Session Origin tiene AR Camera conectado igual que el móvil tiene cámara propia.

El GameObject `AR Camera` (hijo de AR Session Origin) es la cámara principal (con etiqueta `MainCamera`). Necesita componentes AR. Info sobre estos: [AR Pose Driver (Controlador de la pose de AR)](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@4.1/api/UnityEngine.XR.ARFoundation.ARPoseDriver.html), [AR Camera Manager (Administrador de la cámara de AR)](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@4.1/api/UnityEngine.XR.ARFoundation.ARCameraManager.html) y [AR Camera Background o Fondo de la cámara de AR](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@4.0/api/UnityEngine.XR.ARFoundation.ARCameraBackground.html). 

>[!important] Recomendado eliminar todas las demás cámaras de la Escena para evitar conflictos.

El GameObject [AR Session](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@4.2/api/UnityEngine.XR.ARFoundation.ARSession.html) administra cada sesión AR individual, lo que incluye la frecuencia de imagen y la comunicación con el dispositivo, entre otras cosas. 

>[!warning] Solo puede haber un GameObject AR Session activo en una Escena.

> [!info] Al clicar Play, cambian los GameObjects

Aparece un GameObject llamado `Trackables` (Objetos que se pueden rastrear) hijo de `AR Session Origin`. Almacenará todos los objetos detectados en el entorno del mundo real, como las caras, los planos y los puntos rastreados.

Si mientras esta en play, cambias el transform de AR Session Origin verás que el cubo parece cambiar de lugar, pero lo que se mueve en realidad es el dispositivo simulado, como si movieras el móvil

Para configurar una Escena AR de cero y más info sobre cada uno de estos objetos, consulta la [documentación de AR Foundation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@4.1/manual/index.html#scene-setup).
# Detección de imágenes

El componente que hemos añadido en el apartado anterior, el que reconoce imagenes, busca en base a una librería que deberemos crear con `Create > XR > Reference Image Library`

![[Pasted image 20250622190549.png]]

![[Pasted image 20250622190603.png]]

Ponerle las dimensiones no es obligatorio pero mejora la detección y también mejora el rendimiento ya que no debe estimarlo automáticamente (especialmente imágenes grandes, de más de 75cm)

![[Pasted image 20250622190611.png]]

Evidentemente le pasamos la librería que acabamos de crear al origin

![[Pasted image 20250622190619.png]]

## Prefabs

Deben ser 100 veces más pequeños de lo planeado. scale = 0.01

## ¿Qué imágenes son válidas?

La resolución de las imágenes debe ser de al menos 300x300. Las imágenes HD NO mejoran el rendimiento.

El color es irrelevante

Evitar alta compresión de imagen

La herramienta arcoreimg del SDK de ARCore te indica la calidad de la imagen. Recomendado mínimo 75. Esta app está en 

```
C:\Users\<username>\Documents\Unity Projects\<projectname>\Library\PackageCache\com.unity.xr.arcore@5.0.7\Tools~\Windows
```

![[Pasted image 20250622190700.png]]

## ¿Qué limitaciones tienen las bases de datos?

La base de datos puede contener hasta 1000 imágenes. Aunque solo puedes seguir hasta 20 imágenes ==simultáneamente==. Es decir, individualmente puedes llegar a seguir 1000 imágenes pero solo 20 a la vez.

## Código / Creando el efecto

El tipo pega el código y si lo quieres descargar lo tiene super escondido por ahí, ahora se puede descargar [desde mi Drive aquí](https://docs.google.com/document/d/1ceOlLyRLJF0j5PIRvvOAub6ERtR9XEQv9lK1Hz2icVA/edit?usp=share_link) y tiene su propia pagina
## Si la imagen a seguir no se va a mover

Es útil añadirle un ancla. Al parecer se quedan con datos como la latitud, longitud y demás para estabilizar la detección.

https://developers.google.com/ar/develop/anchors?hl=es-419

# Filtros de cara...

Crea un `AR Default Face` (Jerarquía -> `Botón derecho > XR > AR Default Face`) y ponle un material

Hay que añadir al `XR Origin`, un compo `AR Face Manager` y pásale el Prefab

Como es una app de filtro de cara, mejor usar la cámara de delante. Para ello `AR Camera Manager > Facing Direction > User`

![[Pasted image 20250707111641.png]]

Ten en cuenta la [[Optimización de imágenes]]

>[!warning] Atento!
>Para que un GameObject haga el seguimiento de la cara debe tener un compo AR Face [ref](https://learn.unity.com/pathway/mobile-ar-development/unit/interactive-face-filter/tutorial/como-crear-una-nueva-escena-con-anteojos?version=2021.3#64a52984edbc2a7708fa9076)


# Bibliografía

[Augmented Reality (AR) tutorial for beginners using Unity 2022](https://youtu.be/gpaq5bAjya8)

Mejores prácticas imágenes de seguimiento: [https://developers.google.com/ar/develop/augmented-images?hl=es-419](https://developers.google.com/ar/develop/augmented-images?hl=es-419)

Mejorar el rendimiento
https://developers.google.com/ar/develop/performance?hl=es-419

anclas
https://developers.google.com/ar/develop/anchors?hl=es-419

Config desde 0
[documentación de AR Foundation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@4.1/manual/index.html#scene-setup).

https://learn.unity.com/pathway/mobile-ar-development/unit/create-a-basic-face-filter-tutorials?version=2021.3
# Keywords

Augmented reality AR