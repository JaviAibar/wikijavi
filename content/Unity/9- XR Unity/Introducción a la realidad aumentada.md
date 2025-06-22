
Antes de comenzar creo que debes tener instalado [Servicios de Google Play para RA](https://play.google.com/store/apps/details?id=com.google.ar.core&pli=1) (o un nombre parecido)  y tal vez ARCore Elements 

Unity provee una plantilla que puedes descargar de `Unity Hub` y viene ajustes hechos, librerias instaladas y 3 Gameobjects preestablecidos: el sol, y 3 específicos relacionados con el AR: `AR Session, AR Session Origin y la cámara AR` y que veremos más tarde

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

![[Pasted image 20250622190300.png]]

El `GO AR Session` contiene un script de mismo nombre que controla el ciclo de vida de la aplicación AR, por lo que es fundamental que esté

![[Pasted image 20250622190327.png]]

El `AR Session Origin` se encarga de mapear el mundo real y situar en él los objectos creados (el tipo cree que en el futuro se llamará XR Session Origin)

> [!importante] ACTUALIZACIÓN Dic '23
> El tipo tenía razón, sin embargo, en este momento todavía se descarga obsoleto, arreglarlo es fácil porque funciona idéntico

El tipo elimina todos los componentes a excepción de AR Session Original ya que son extensiones que no quiere emplear para su ejemplo, pero en la realidad, tal vez los necesites si lo que te has planteado lo requiere.

  

En su lugar añade `AR Tracked Image Manager` esto detectará una imagen del mundo real y situará ahí nuestro GameObject

![[Pasted image 20250622190339.png]]

# Detección de imágenes

El componente que hemos añadido en el apartado anterior, el que reconoce imagenes, busca en base a una librería que deberemos crear con `Create > XR > Reference Image Library`

![[Pasted image 20250622190549.png]]

![[Pasted image 20250622190603.png]]

Ponerle las dimensiones no es obligatorio pero mejora la detección

![[Pasted image 20250622190611.png]]

Evidentemente le pasamos la librería que acabamos de crear al origin

![[Pasted image 20250622190619.png]]

# Prefabs

Deben ser 100 veces más pequeños de lo planeado. scale = 0.01

# ¿Qué imágenes son válidas?

La resolución de las imágenes debe ser de al menos 300x300. Las imágenes HD NO mejoran el rendimiento.

El color es irrelevante

Evitar alta compresión de imagen

La herramienta arcoreimg del SDK de ARCore te indica la calidad de la imagen. Recomendado mínimo 75. Esta app está en 

```
C:\Users\<username>\Documents\Unity Projects\<projectname>\Library\PackageCache\com.unity.xr.arcore@5.0.7\Tools~\Windows
```

![[Pasted image 20250622190700.png]]

# ¿Qué limitaciones tienen las bases de datos?

Solo puedes seguir hasta 20 imágenes simultáneamente

# Código / Creando el efecto

El tipo pega el código y si lo quieres descargar lo tiene super escondido por ahí, ahora se puede descargar [desde mi Drive aquí](https://docs.google.com/document/d/1ceOlLyRLJF0j5PIRvvOAub6ERtR9XEQv9lK1Hz2icVA/edit?usp=share_link)

# Bibliografía

[Augmented Reality (AR) tutorial for beginners using Unity 2022](https://youtu.be/gpaq5bAjya8)

Mejores prácticas imágenes de seguimiento: [https://developers.google.com/ar/develop/augmented-images?hl=es-419](https://developers.google.com/ar/develop/augmented-images?hl=es-419)

# Keywords

Augmented reality AR