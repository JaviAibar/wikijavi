# Optimización de desarrollo

# Build

Si la build está en modo desarollo `Build Settings > Development Build` tienes un par de ventajas: 

- por una parte, la compilación será bastante más rápida, aunque la ejecución será un poco más lenta, pero para ir haciendo builds de debug viene genial
    
- por otra parte, (solo Android, though) permite actualizar la build a base de parches, en lugar de tener que compilar el proyecto entero
    

Otra configuración que tiene un efecto similar es cambiar de compilación IL2CPP a Mono: Mono al estar menos comprimida / compilada que la otra, el tiempo de compilación será menos aunque el rendimiento será peor, perfecta para debug

# Uso ágil de Unity

La mejor recomendación para esto es usar los layouts, arriba derecha. Tengo preparados para Animación, Programación, Pruebas unitarias, Profiling, Settings y demás [en mi Drive](https://drive.google.com/drive/folders/1SuTLLBZ9pYUbVfDoTrM9lsn21yTXoIo_?usp=sharing)

[más tips aquí](https://www.udemy.com/course/master-programacion-de-videojuegos-con-unity-5-y-csharp/learn/lecture/14738886#announcements/7907454/)

[más tips todavía aquí](https://youtu.be/1W2jsoqLVEc)

# Organización de un proyecto Unity

[[Organización de un proyecto Unity]]

# Evita el código Spaguetti Espagueti

[[Evita el código espaguetti]]

# Optimización de rendimiento

Utilizar `StringBuilder` para optimizar el manejo de strings tochos. No utilizar en pequeños ya que empeora el rendimiento

## Assets

[[Addressable]]

From the window drop-down, select `Asset Management > Addressables > Groups`

# Profiling / perfiles

[[Profiling and optimizing]]

## Herramientas genéricas

### [CPU Profiler](https://docs.unity3d.com/es/2018.4/Manual/ProfilerCPU.html) 

[Memory Profiler](https://docs.unity3d.com/es/2018.4/Manual/ProfilerMemory.html)

Memory Analyzer

Las mejores herramientas son las específicas de la plataforma:

- Para iOS: Instruments y XCode Frame Debugger
    
- Para Android: Snapdragon Profiler
    
- Para plataformas que ejecutan CPU/GPU Intel: VTune e Intel GPA
    
- Para PS4: la suite Razor y VR Trace
    
- Para Xbox: la herramienta Pix
    

más [info aquí](http://blogs.unity3d.com/2016/02/01/profiling-with-instruments/?_ga=2.149780405.281275077.1655116202-1661557249.1653412476)

## Disección de trazas de inicialización

![[Pasted image 20250622143822.png]]

La captura de pantalla anterior es de un seguimiento de Instruments de un proyecto de ejemplo que se ejecuta en un dispositivo iOS. Dentro del método  `startUnity` específico de la plataforma, tenga en cuenta los métodos `UnityInitApplicationGraphics` y  `UnityLoadApplication`

  

`UnityLoadApplication` contiene métodos que cargan e inicializan la primera escena del proyecto. Esto incluye deserializar e instanciar todos los datos necesarios para mostrar la primera escena, como compilar sombreadores, cargar texturas e instanciar GameObjects. Además, todos los MonoBehaviours en la primera escena tienen sus devoluciones  `Awake` de llamada ejecutadas en este momento.

## Disección de trazas en tiempo de ejecución

el principal lugar de interés es el método `PlayerLoop` se ejecuta una vez por frame

![[Pasted image 20250622143900.png]]

La captura de pantalla anterior es de una ejecución de creación de perfiles de un proyecto de ejemplo de Unity 5.4 e ilustra varios de los métodos más interesantes dentro de `PlayerLoop`. Los nombres de los métodos dentro de `PlayerLoop` pueden variar entre las versiones de Unity.

  

`PlayerRender` es el método que ejecuta el sistema de renderizado de Unity. Esto incluye seleccionar objetos, calcular lotes dinámicos y enviar instrucciones de dibujo a la GPU. Cualquier efecto de imagen o devolución de llamada de secuencia de comandos basada en representación ( `OnWillRenderObject`, por ejemplo) también se ejecuta aquí. En general, este debería ser el principal consumidor de tiempo de CPU mientras el proyecto es interactivo.

  

`BaseBehaviourManager::CommonUpdate<UpdateManager>` es la familia de métodos más interesante para inspeccionar, porque es el punto de entrada para la mayor parte del código de script que se ejecuta dentro de un proyecto de Unity.

Se habla en más detalle de algún método del orden de ejecución de unity [en el enlace](https://docs.unity3d.com/es/2018.4/Manual/BestPracticeUnderstandingPerformanceInUnity1.html)

## Diseccionando un método de script

busque líneas de seguimiento que contengan un objeto `ScriptingInvocation` . Ahí hace la transición al tiempo de ejecución del script para ejecutar el código del script

## Carga de Assets

Asset loading can also be identified in CPU traces. The main method indicating an Asset load is `SerializedFile::ReadObject`. This method connects a binary data stream (from a file) to Unity’s serialization system, which operates via a method named `Transfer`. The `Transfer` method can be found on all Asset types, such as Textures, MonoBehaviours and Particle Systems.

In general, if a performance stutter is seen during runtime and a performance trace shows significant time being used by `SerializedFile::ReadObject`, the framerate is being reduced due to Asset loads. Note that, in most cases, `SerializedFile::ReadObject` can be found on the main thread only when synchronous Asset loads are requested via the `SceneManager`, `Resources` or `AssetBundle APIs.`

## Consumo de memoria

Para problemas de consumo de memoria se puede usar `Memory Profiler` package, más [info aquí del paquete](https://docs.unity3d.com/Packages/com.unity.memoryprofiler@latest) y para un [tutorial de Unity al respecto aquí](https://learn.unity.com/tutorial/memory-management-in-unity?_ga=2.179330855.281275077.1655116202-1661557249.1653412476#)

Sobre [corrutinas aquí](https://docs.unity3d.com/es/2021.1/Manual/BestPracticeUnderstandingPerformanceInUnity3.html)

Revisar [carga de Assets aquí](https://docs.unity3d.com/es/2021.1/Manual/BestPracticeUnderstandingPerformanceInUnity4.html)

# Biblio

[https://docs.unity3d.com/es/2018.4/Manual/BestPracticeUnderstandingPerformanceInUnity1.html](https://docs.unity3d.com/es/2018.4/Manual/BestPracticeUnderstandingPerformanceInUnity1.html) 

Mirar esto: [https://unity.com/how-to/unity-ui-optimization-tips](https://unity.com/how-to/unity-ui-optimization-tips)