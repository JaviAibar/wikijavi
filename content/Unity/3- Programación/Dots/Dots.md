#WIP 
# ¿Qué es?

Es una nueva forma de trabajar que está implementando Unity

# ¿Por qué es mejor?

Está enfocada en 3 pilares fundamentales:

[ECS (Entity Component System)](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1sJCQ6krqI54_X8y_dwQr-UQAr9yyDZx4/edit). Relacionado con la memoria y la información (data). Sirve para que el procesador tenga menos "fallos" (se llaman así) al acceder a la info en la cache. Vamos, que es más eficiente en cuanto a lectura de datos. Por lo visto también es más escalable.

[Jobs (C# Jobs System)](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1tGevG58An89Hn4DoVp7FJDqVCMoOrXzk/edit) para programación multihilo. (proceso en paralelo, muchísimo más eficiente)

[Burst compiler](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1uMTlZgiqC6APlJe9IJuxYeGonLWITXoo/edit) (en lugar de Roslyn supongo) Genera código nativo para que el hardware lo ejecute de forma más eficiente u óptima.

# ¿Cómo funciona?

Se compone de 3 packages, uno para cada pilar y se pueden usar de manera independiente.

Han preparado un tuto para ECS [aquí](https://learn.unity.com/tutorial/entity-component-system#) y más info [aquí](https://blogs.unity3d.com/2019/03/08/on-dots-entity-component-system/)

También hay un proyecto ultra lightweight para desarrollar juegos para móviles muy limitados [aquí](https://docs.unity3d.com/Packages/com.unity.tiny@0.16/manual/index.html)

# ¿Cómo se instala?

En un proyecto URP o HDRP debes entrar en el Package Manager y, como está en desarrollo, hay que añadir por nombre y poner (se supone que en este order (según el tipo del video de Youtube y a 12/03/2023):

1. com.unity.rendering.hybrid
    

Sin embargo, a mi no se me añadieron las depencias, así que probablemente hay que hacerlo como lo dicen (aunque no lo explicitan) en el manual de Unity (12/03/2023):

1. com.unity.entities
    
2. com.unity.entities.graphics
    
3. com.unity.dots.editor
    

Aunque creo que con que instales el primero, se te instalan los demás (como tiene sentido, compruebalo por si acaso)

Es recomendable ahora ponerse el [layout que preparé](https://drive.google.com/file/d/1x4z7zh0O2BY5GTWwPr4HbGTFecJXHaoH/view?usp=sharing) para trabajar cómodamente con este sistema [(otros layouts aquí)](https://drive.google.com/drive/folders/1SuTLLBZ9pYUbVfDoTrM9lsn21yTXoIo_?usp=sharing)

Si entramos en Project Settings > Editor y bajamos hasta Enter Play Mode Settings, podemos activar Enter Play Mode Options, lo cual hará que Play Mode sea más rápido. Este magia negra tiene sus limitaciones que pueden verse en algún sitio de [aquí](https://docs.unity3d.com/Packages/com.unity.entities@1.0/manual/index.html) (según el tipo del vídeo)

Comprobaciones, por si acaso:

- `Project Settings > Graphics` Debería ser `URP` o `HDRP`
    
- `Project Settings > Player > Other Settings > Rendering > Color Space` Debe ser `Linear`
    
- En la pestaña `Jobs > Burst > Enable Compilation` esto es primordial y nos permitirá aumentar increíblemente el rendimiento.

# ¿Cómo se usa?

Para que los GameObjects se conviertan en `entidades` debemos meterlos en una sub escena. Entonces en la jerarquía, botón derecho > Nueva sub escena

## Inspector

![[Pasted image 20250624223450.png]]

![[Pasted image 20250624223453.png]]

![[Pasted image 20250624223456.png]]

## Convertir GameObjects a Entities (Subescenas)

La subescenas se pueden cerrar con estos dos botones

![[Pasted image 20250624223513.png]]

Sin embargo, los GameObjects quedarán cargados hasta haber pulsado Unload

![[Pasted image 20250624223522.png]]

## Programación

### Instancias (carpetas y Baker)

Estructura de carpetas para el código

![[Pasted image 20250624223540.png]]

Este Script está en `ComponentsAndTags`

Como Entities no maneja objetos -> usamos `Struct`

Como Entities no maneja `GameObjects` -> usamos `Entity`

Creo que usamos `float2` porque viene de `Mathematics`, librería especial para `BurstCompiler`

Nótese que estamos implementando `IComponentData`, no sé para qué, pero creo que es obligatorio

*ComponentsAndTags/GraveyardProperties.cs*
![[Pasted image 20250624223618.png]]

Sin embargo, este código no lo podemos poner en un `GameObject` porque no hereda de `MonoBehaviour`, por lo que crearemos un `Custom Baker`

Lo que haremos será crear un script normal `MonoBehaviour` en `AuthoringAndMono` y copiar todos los campos que creamos en el `Struct` pero cambiando el `Entity` por `GameObject`, ya que `Entity` no es un tipo editable (por lo menos desde el `Inspector`)

*AuthoringAndMono/GraveyardMono.cs*
![[Pasted image 20250624223755.png]]

Y aquí viene la clave (el `Baker`) que se encargará de inicializar el `struct` con los valores que obtiene del componente `GraveyardMono`


En el mismo archivo (`GraveyardMono.cs`) creamos una nueva clase que herede de `Baker<>` con nuestra recien creada clase Mon`MonoBehaviour` entre diamantes.

E implementamos el método abstracto `Bake()` tal y como se ve en la captura

*AuthoringAndMono/GraveyardMono.cs*
![[Pasted image 20250624223902.png]]

Gracias a lo que hemos hecho, ahora consta como `EntityComponent`

El `44` que sale en el prefab es el índice y el `1` que sale tras los dos puntos es la versión

*GameObject que tiene GraveyardMono*
![[Pasted image 20250624223922.png]]

Si en Entities Hierarchy clicamos en el circulito y pone Runtime podremos ver el GameObject referenciado por el Component que hemos creado

![[Pasted image 20250624223944.png]]

### Valores aleatorios

Por una parte debemos crear una estructura nueva

Recuerda que debe ser la librería de Mathematics!

![[Pasted image 20250624224000.png]]

> [!info] Marcado en rojo lo nuevo

Recuerda que debe ser la librería de Mathematics!

![[Pasted image 20250624224007.png]]

Comprobamos que ha salido bien

![[Pasted image 20250624224026.png]]

### Aspects (usamos ambos structs)

Esto nos permitirá combinar varios ComponentData en un mismo coso y nos dará una interfaz "fácil de usar" para nosotros. Tiene muchas cosas muy chulas, pero al principio será confuso

Tenemos que hacer los struct de Aspect como readonly y partial por temas internos sobre la generación de código automática. Simplemente radiofórmula y ya

El campo instance se refiere a la propia entidad asociada a este Aspect

El campo TransformAspect se refiere a uno de los dos Aspect que viene por defecto

El campo GraveyardProperties debe ser RefRO, que lo que nos generará es una referencia de solo lectura (ReadOnly). La razón por la que queremos que sea readonly es porque cuando empecemos a lanzar un montón de tareas en paralelo que tendrán sus correspondientes dependencias, se deben poder leer en paralelo pero no escribir en ellas, ya que para escribir hay que ser muy cauteloso y dice algo de que Unity se encarga de no sé qué y que GraveyardProperties estará estático durante toda la ejecución

En el campo de GraveyardRandom sí necesitamos tener derechos de escritura porque vamos a estar generando números aleatorios, ya que va a estar cambiando la seed

(añadiremos más cosas según avancemos)

![[Pasted image 20250624224047.png]]

Y teóricamente debería verse

![[Pasted image 20250624224103.png]]

### Systems

ISystem es la forma preferente de crear código ejecutable ya que es completamente compatible con BurstCompiler, sin embargo, si tienes problemas, se puede cambiar a SystemBase

OnCreate equivale a Start o Awake

OnDestroy para cuando se destruye

y

OnUpdate se ejecuta cada frame

![[Pasted image 20250624224122.png]]

# Tengo un problema

## La tarea previa lee de una propiedad en la que se esta escribiendo

InvalidOperationException: The previously scheduled job LocalToWorldSystem:ComputeRootLocalToWorldJob reads from the ComponentTypeHandle<Unity.Collections.NativeText.ReadOnly> ComputeRootLocalToWorldJob.JobData.LocalTransformTypeHandleRO. You are trying to schedule a new job SpawnZombieJob, which writes to the same ComponentTypeHandle<Unity.Collections.NativeText.ReadOnly> (via SpawnZombieJob.JobData.__GraveyardAspectTypeHandle.GraveyardAspect_TransformAspect_m_LocalTransformCAc). To guarantee safety, you must include LocalToWorldSystem:ComputeRootLocalToWorldJob as a dependency of the newly scheduled job.


# Bibliografía

[https://learn.unity.com/tutorial/what-is-dots-and-why-is-it-important#5ef9fe65edbc2a002094eff5](https://learn.unity.com/tutorial/what-is-dots-and-why-is-it-important#5ef9fe65edbc2a002094eff5)

[https://learn.unity.com/tutorial/entity-component-system#](https://learn.unity.com/tutorial/entity-component-system#)

[https://blogs.unity3d.com/2019/03/08/on-dots-entity-component-system/](https://blogs.unity3d.com/2019/03/08/on-dots-entity-component-system/)

[https://www.youtube.com/watch?v=IO6_6Y_YUdE&ab_channel=TurboMakesGames](https://www.youtube.com/watch?v=IO6_6Y_YUdE&ab_channel=TurboMakesGames)
