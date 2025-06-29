Para que un juego vaya a unos determinados FPS, debemos apuntar a un presupuesto (budget) máximo de milisegundos por frame. Este presupuesto se calcula de la siguiente forma: 1000 / FPS objetivo. Ejemplos:

- Para 60FPS -> 1000 / 60 -> 16.6 ms
    
- Para 30FPS -> 33.3 ms
    
- Para 90FPS (VR) -> 11 ms

# ¿Qué es el VSync?

El VSync busca evitar el screen tearing

Este ocurre cuando la tasa de refresco de la pantalla y la de renderizado de la tarjeta no están correctamente sincronizadas. Una fácil solución es activar el VSync que reciclará renderizados en caso de que no tenga todavía el nuevo frame, ejemplo:

![[Pasted image 20250629154046.png]]

En esta imagen vemos como el monitor se refresca cada 16ms, pero nuestra GPU está proporcionando el renderizado 1ms tarde, por lo que el monitor espera al siguiente refresco para mostrar el nuevo renderizado, haciendo que, aunque el monitor funciona a 60FPS, el juego se ve de forma efectiva a 30

La conclusión es que si nuestro juego no es capaz de respetar el presupuesto de tiempo, y está el VSync, los FPS serán siempre la mitad de lo que debería

![[Pasted image 20250629154056.png]]

![[Pasted image 20250629154104.png]]

El VSync está forzado por HW en dispositivos móviles, no sirve intentar quitarlo.

# Consejos antes de entrar en materia con el Profiler

## Activa la grabadora

Esto más que un consejo es un requisito, si no le das click al `botón rojo de grabar`, el `Profiler` no recogerá datos.

## Analizar la build o en el Editor

Depende.

Los ciclos `EditorLoop` no son interesantes ya que los genera el editor de Unity y `no tendrán efecto en la build`. El mayor consejo que se puede dar (según el tipo del vídeo) es que, en lugar de analizar el profiler en el editor, lo hagas en la build. Para configurarlo:

``` 
Build Settings > Development Build y Autoconnect Profiler
``` 


Sin embargo, si no está claro quién puede ser el culpable del problema de rendimiento, posiblemente sea más cómodo y tardes menos si empiezas a activar y desactivar GameObjects en el editor para acotar el problema en lugar de hacer mil builds y perder muchísimo tiempo


Y como consejito. En las `Project Settings > Player > Resolution and Presentation` desactivar `Run in background` Este ajuste nos permitirá que si quitamos el foco a la build, se pare el juego, y por tanto el profiler pare de tomar datos.

![[Pasted image 20250629154216.png]]

Por último tienes que indicar en el profiler de dónde debe obtener datos

PD. En este dropdown hay una opción que es `<Enter IP>` que potencialmene puede servir para analizar un dispositivo con un móvil.

![[Pasted image 20250629154228.png]]

## Cuándo profilear

Hay que buscar puntos clave en el desarrollo. No dejarlo para el final. Anotar las conclusiones (cuantos ms por frame tardaba antes, cómo lo mejoraste, en qué estado estaba el proyecto y, tal vez, poner una referencia a un commit)

## Crear un archivo desde Build

Puede crear un dump de la info gracias a `Profile.logFile()` que generará un fichero para que puedas analizar qué tal fue el rendimiento de la build

## Crear tu propia marca / etiqueta

Para optimizar el código, es muy interesante poder colocar una etiqueta que mida el impacto que ha tenido los cambios que acabas de realizar, de tal forma que el Profiler te señale cuánto tarda tu trozo de código en concreto. Esto se puede hacer gracias a las siguientes instrucciones:

```cs 
Profiler.BeginSample("Nombre de tu etiqueta");
MetodoAOptimizar();
Profiler.EndSample();
``` 

De esta forma, cuando vayas al profiler podrás hacer el seguimiento (en la captura no se llama "Nombre de etiqueta", sino "RandCube")

![[Pasted image 20250629154313.png]]

fuente: [Profiling and Improve Performance in Unity](https://youtu.be/GYiZ5Pt6pAM?t=396)

# Métodos comunes del Profiler

El ciclo de funcionamiento de un juego tiene que ver con la CPU y GPU funcionando en paralelo. Y cada una esperará información de la otra constantemente. La cuestión es que esas esperas sean lo mínimo posible.

**WaitForTargetFPS** -> Este método se encarga de que si nuestro juego va a más fps de los fijados, esperará para que se cumpla con el límite

**Gfx.WaitForPresent** -> `GPU Bound`. Se trata de cuando la CPU debe esperar a que la GPU acabe de renderizar

ese rectángulo que pone `Wait` representa el método `Gfx.WaitForPresent` siendo ejecutado

![[Pasted image 20250629154351.png]]

***Gfx.WaitForRenderThread*** -> (según manual de Unity) Indica que `el hilo principal estuvo esperando a que el hilo de renderizado acabara` de procesar todos los comandos en el flujo de comandos. Las muestras con esta marca solo aparecen en renderizado multihilo

**Gfx.PresentFrame** -> Tiempo gastado en esperar que la GPU renderice y presente el frame. Incluye tiempo VSync. Las muestras con `WaitForTargetFPS` en el hilo principal muestran cuanto se ha gastado esperando al VSync.

# Garbage Collector

Es relativamente sencillo saber si estamos creando tipos no primitivos (GameObjects y demás) que no están siendo útiles, y por tanto, son basura de la que deberá borrarse luego, causando un consumo ineficiente de la memoria y procesadores.

Ya que el colector de basura usa 2 métodos que podemos rastrear para localizar esta basura e intentar minimizarla (siempre se va a necesitar el colector, es imposible bajar sus llamadas a 0 y está bien). Estos métodos son

### GC.Alloc

Se encarga de ubicar la basura

### GC.Collect

Borrar la basura

![[Pasted image 20250629154522.png]]

Los picos se deben a estas acciones de ubicado y borrado de la basura.

Hay poco control sobre el GC, pero se puede intentar minimizar la cantidad de elementos que se crean para así reducir su uso.

  
Se ha reproducido una situación subobtima.

Al seleccionar el problema, pulsamos F para ver de dónde vienen esas llamadas

![[Pasted image 20250629154540.png]]

El Script se llama StringCreator y las llamadas se hacen desde el Update()

![[Pasted image 20250629154547.png]]

Podemos activar en el dropdown de la derecha para ver con qué objetos está relacionado

![[Pasted image 20250629154554.png]]

Una funcionalidad experimental de Unity nos permite usar una version incremental del GarbageCollector, se puede habilitar en `Project Settings > Player > Use Incremental GC`

## Consejo

Para reducir la basura, es conveniente quedarse con una referencia a algo que creas que vas a usar varias veces, en lugar de llamar varias veces a GetComponent

# Comparar frames entre sí (Profile Analyzer)

Para ello, se recomienda usar `Profile Analyzer`

Teniendo la info en el Profiler, vamos a Profile Analyzer y clicamos `Pull Data` o cargamos info previa que tengas guardada

Tiene 2 modos de uso, si quieres analizar un solo rango de frames, usa `Single`, si tienes más archivos de datos o quieres comparar varios rangos de frames entre sí, usa `Compare`


Esta herramienta nos permite seleccionar un rango de frames

![[Pasted image 20250629154648.png]]

  
Esta parte nos muestra los 10 marcadores más comunes, es decir, qué llamadas son más frecuentes

![[Pasted image 20250629154654.png]]

Aquí podemos ver la info medida en milisegundos

![[Pasted image 20250629154701.png]]

En el modo Compare puedes ver las diferencias entre un rango y otro

![[Pasted image 20250629154710.png]]

# Mejorar renderizado (Frame Debugger)

Gracias al Frame Debugger podemos ver qué pasos toma el renderizador y nos dará consejos sobre cómo podemos optimizarlo

En la captura podemos ver como renderiza de forma separada varios barriles (cosa que, en teoría, se podría hacer de 1, mejorando el rendimiento).

En la zona marcada en rojo, nos indica que no se puede hacer así ya que el material estos barriles "no tiene la instanciación GPU activada"

![[Pasted image 20250629154749.png]]

Para solucionar este problema concreto, selecciona el objeto en cuestión y activa ese ajuste

![[Pasted image 20250629154800.png]]

Tras activar esa casilla, podemos ver instantáneamente como se han fusionado en una sola llamada

![[Pasted image 20250629154807.png]]

Para optimizaciones comunes (mencionadas en el vídeo) ir a la página de [[Optimizaciones en Unity]]


# Bibliografía

[Introducción a la generación de perfiles (YouTube)](https://www.youtube.com/watch?v=uXRURWwabF4&ab_channel=Unity)

[https://learn.unity.com/tutorial/diagnosing-performance-problems-2019-3#](https://learn.unity.com/tutorial/diagnosing-performance-problems-2019-3#) 

[https://docs.unity3d.com/Manual/profiler-markers.html](https://docs.unity3d.com/Manual/profiler-markers.html)

# Keywords

Optimización eficiencia eficacia CPU GPU FPS profile generating analisis analyse analysis profiler debug degubber debugging
