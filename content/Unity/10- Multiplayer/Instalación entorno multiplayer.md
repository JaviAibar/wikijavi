# Instalación

## Requisitos

- Unity 2020.3 o superior 
    
- Mono y IL2CPP (por defecto). Windows, Mac, Linux, iOS, Android y WebGL. WebGL requiere NGO 1.3.0+ y UTP 2.0.0+
    

### Esta guía está hecha en base a

- Unity 2021.3.17
    
- NGO 1.4.0
    
- ParrelSync 1.5.1
## Modo Package Manager

Desde el panel Package Manager (Windows/Package Manager) busca he instala Netcode for GameObjects. Asegúrate de tener seleccionado el filtro "Unity Registry" en la barra superior.

Instalaciones addicionales:

- Unity Transport
    
- Multiplayer Tools


## Modo Package Manager (Obsoleto)

>[!warning] Obsoleto

La forma más fácil sería desde el `Package Manager ("Window/Package Manager" en la barra de tareas):`

Pulsar el botón + de la ventana. Seleccionar "Add package by name" y escribie **com.unity.netcode.gameobjects**, después pulsar Add. 

En caso de no tener la opción usar "Add package git URL" con la dirección [https://github.com/Unity-Technologies/com.unity.netcode.gameobjects](https://github.com/Unity-Technologies/com.unity.netcode.gameobjects)

Instalaciones addicionales:

- com.unity.transport
    
- com.unity.multiplayer.tools


\>= 2021
![[Pasted image 20250624221807.png]]

< 2021
![[Pasted image 20250624221813.png]]

![[Pasted image 20250624221817.png]]


Puede que salga este error. Simplemente da OK y reinicia, es normal.

![[Pasted image 20250624221823.png]]

## Modo Proyecto

Otra forma más complicada (podría estar obsoleto) sería descargar este repositorio:

[https://github.com/Unity-Technologies/com.unity.netcode.gameobjects](https://github.com/Unity-Technologies/com.unity.netcode.gameobjects)

Y desde tu proyecto importar un par de packages:

Netcode y Unity Transport

Para importarlos deberemos ir a Package Manager.

![[Pasted image 20250624221833.png]]

![[Pasted image 20250624221836.png]]

Este es el repo que acabamos de descargar. Habrá que importar la carpeta que pone com.unity.netcode.gameobjects

![[Pasted image 20250624221847.png]]

El otro paquete está todavía más escondido, está en la misma carpeta que el de antes, pero hay que entrar además en testproyect > Library > PackageCache e importar el que dice com.unity.transport@1.0.0 (o la versión que sea)

![[Pasted image 20250624221906.png]]

## Parrel Sync

Para hacer pruebas tú mismo, puedes abrir varias instancias de Unity utilizando Parrel Sync.

Para hacer esto más cómodo en el futuro, Unity está creando una herramienta llamada [MPPM (MultiPlayer Play Mode)](https://docs-multiplayer.unity3d.com/tools/current/mppm/index.html). La chica del vídeo, no lo recomienda todavía.

Unity [en su guía](https://docs-multiplayer.unity3d.com/netcode/current/tutorials/testing/testing_locally/index.html#parrelsync) recomienda hacer backups antes de instalar.

El código (y su manual) están disponibles en [Github](https://github.com/VeriorPies/ParrelSync) en [mi Drive](https://drive.google.com/file/d/1Ha4xyQoakvq5DqNoytBMsWt5bbGMPeep/view?usp=share_link) puedes encontrar la versión 1.5.1 (usada en este manual)

![[Pasted image 20250624221924.png]]

