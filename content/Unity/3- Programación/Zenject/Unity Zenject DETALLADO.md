Es una librería gratuita para la implementación de la [[(DI) Dependency Inyection|inyección de dependencias (DI)]] que puedes [encontrar aquí, en Github](https://github.com/modesttree/Zenject)

Para info general del patrón de diseño (DI) Dependency Inyection,  [[(DI) Dependency Inyection|mira aquí]] 

Para ver la instalación y primeros pasos, [[Unity Zenject GUÍA RÁPIDA|ve a la guía rápida]]

Para ver el analisis a un proyecto real de Zenject, [[Análisis Zenject-Hero|click aquí]]

_Guía actualizada a Febrero del 2024, he instalado la versión 9.2.0 de la librería en Unity 2022.3.4f1, pero debería valer para Unity >= 2018.4.13_

# Resolución de dependencias / Tipos de inyección o patrones de inyección

## Por constructor (preferible)

Es preferible porque 

- Puedes ver **de un golpe** todas las dependencias y elimina cualquier duda sobre **cuándo** serán resueltas. 
    
- Te permite utilizar propiedades de **solo lectura** para asegurarte de que las dependencias no se pueden modificar durante la ejecución
    
- Mantiene tu código agnóstico del contenedor de DI, lo cual te permite **cambiar** de framework o **eliminarlo** por completo fácilmente
    

Hace evidente cuándo estás violando el principio de **[[patrón de diseño SOLID design pattern#Single Responsibility|Responsabilidad Única]]**, ya que un constructor con demasiados argumentos es probable que lo esté violando y que debería dividirse en varias clases

![[Pasted image 20250624171122.png]]

## Por campo

La inyección sucede exactamente después de que el constructor haya sido llamado

![[Pasted image 20250624171231.png]]

## Por propiedad

Es muy similar a por campo, **pero** se debe usar con cautela porque complica ver las dependencias de un vistazo y averiguar cuándo y dónde se han rellenado

![[Pasted image 20250624171247.png]]

## Por método

Vas a usar mucho este porque como MonoBehaviour no permite constructores, usarás este en su lugar

![[Pasted image 20250624171310.png]]

Para un análisis del uso correcto de los diferentes métodos, puede [leer esto](https://github.com/ninject/Ninject/wiki/Injection-Patterns)

En una clase ==NO MonoBehaviour==, se pone en el constructor haciendo referencia a la interfaz

![[Pasted image 20250624171351.png]]

Para las clases ==MonoBehaviour==, Zenject escanea estas clases en busca de la etiqueta `[Inject]` e intenta resolver las dependencias

# Configuración de dependencias

[[#Resolución de dependencias / Tipos de inyección o patrones de inyección|Los primero pasos están indicados arriba]]

Podemos añadir una configuración más precisa con los métodos que trae Zenject

Todas están siendo usadas con una lógica predefinida, pero puedes especificar tú manualmente para lo que necesites

![[Pasted image 20250624171754.png]]

## Identificador

WithId() nos permite establecer un identificador por si tenemos diferentes implementaciones para una misma resolución de contrato, es decir, IWeapon podría tener un PlayerWeapon y un EnemyWeapon que la implementen y Zenjekt te sirva la que le especifiques con este ID.

No tiene por qué ser string, cualquier cosa que implemente el operador equals, podría ser un Enum o una clase entera

![[Pasted image 20250624171812.png]]

## Método de construcción de la instancia

3 de los métodos más usados para generar o usar la instancia es poniendo From y el tipo de generados, te permite elegir de qué forma se va a generar la instancia, en este caso

### FromNew
`FromNew` utilizará el operador `new` de C# (por defecto se usa este)
![[Pasted image 20250624171842.png]]

### FromInstance
`FromInstance` que obtiene la referencia del resultado de un tipo que le hayas pasado. Es útil para encapsular dependencias con construcciones más complejas
![[Pasted image 20250624171857.png]]

### FromFactory
`FromFactory` lo cual te permite encapsular la lógica de creación todavía más con la creación de Factories, las cuales son perfectas para situaciones en las que tus dependencias tienen sus propias dependencias, que pueden ser inyectadas directamente en tu factoría
![[Pasted image 20250624171919.png]]

### FromResolve
`FromResolve` Creo que busca alguna instancia que ya existiera en el contenedor
![[Pasted image 20250624171936.png]]


# Ámbito

Estos métodos comienzan por `As` seguido del ámbito

El ámbito determina cuán común se van a reutilizar las diferentes inyecciones

## AsTransient

Por defecto es `AsTransient` que indica al constructor no reutilizar la instancia, es decir, se creará una nueva cada vez que sea pedida. Es lo contrario a Singleton

![[Pasted image 20250624171959.png]]

## AsCached

`AsCached` pide reutilizar la misma instancia de resolución de tipo para cada tipo de inyección, pero crea una nueva para cada tipo enlazado, aunque deriven de la misma clase (con el ejemplo de abajo se entiende)

![[Pasted image 20250624172241.png]]

## AsSingle

`AsSingle` es idéntico a `Singleton`, solo una instancia para toda la app
Por lo general usarás esta forma, `AsTransition` y `AsCached` serán solo para casos especiales

## Ejemplo

En este caso, aunque `AudioService` implementa `IAudioService`, `AsCached` creará una instancia para `AudioService` y otra para `IAudioService`. Es decir, tendremos dos instancias, una que corresponde a `AudioService` y otra a `IAudioService`

Por el contrario, si están puestas como `Single`, independientemente del tipo que pidas (`IAudioService` o `AudioService`) te devolverá la misma instancia

![[Pasted image 20250624172326.png]]

![[Pasted image 20250624172330.png]]

# Instaladores 2

Existen 3 tipos:

## Installer<>

Uno de los métodos más sencillos es crear una subclase de Installer, entonces referenciarse a sí misma como argumento genérico, con lo que la clase base (madre), puede definir un método estático que la exponga. Eso hace que el instalador sea mucho más fácil de reutilizar.

```cs 
public void GameInstaller : Installer<GameInstaller>
{
    public override void InstallBindings()
    {
        Container.Bind<IPlayer>.To<Player>();
    }
}
``` 

```cs 
public void AppInstaller : MonoInstaller
{
    public override void InstallBindings()
    {
        GameInstaller.Install(Container);
    }
}
``` 

Además también puede añadir más parámetros incluyendo más argumentos genéricos

Según InfallibleCode, aunque este sea el más simple, seguramente sea el que menos uses

![[Pasted image 20250624173017.png]]

## MonoInstaller

Es lo mismo pero siendo un MonoBehaviour, por lo que puedes ponerlos en GameObjects, es el tipo más común de instalador porque sus propiedades se pueden modificar directamente desde el Inspector

```cs 
public void AppInstaller : MonoInstaller
{
    public string PlayerName;
    public override void InstallBindings()
    {
        GameInstaller.Install(Container, PlayerName);
    }
}
``` 


## ScriptableObjectInstaller

Son igual que MonoInstaller ya que puedes editar sus propiedades desde el inspector, pero tienes todos los beneficios de los ScriptableObjects, como mantener los cambios hecho en play. Además, puedes crear versiones del mismo (configuración de dificultad fácil, medio, dificil...) y ponerlas en uso según necesites

```cs
public class DifficultySettingsInstaller : ScriptableObjectInstaller
{
    public Player.Settings Player;
    public SomethingElse.Settings SomethingElse;
    // ... etc.

    public override void InstallBindings()
    {
        Container.BindInstances(Player, SomethingElse, etc.);
    }
}
``` 

![[Pasted image 20250624173113.png]]

# Reutilizar los MonoInstallers

## Prefabs en escena

Los MonoInstaller se deben poner en un GO, puedes ponerlos como componente junto al SceneContext pero si quieres reutilizarlo, también pueden ir en su propio GO y de él, crear un prefab.

![[Pasted image 20250624173146.png]]

Varias escenas pueden referenciar ese prefab y cambiar las propiedades para ajustarse a las necesidades especificas de cada escena

![[Pasted image 20250624173151.png]]

## Instaladores Prefab 

Otro método es añadiendo los prefabs directamente al Scene Context

Permite mantener la jerarquía más limpia pero no te permite hacer modificaciones específicas de la escena


![[Pasted image 20250624173223.png]]

## Recursos

Por último, puedes tener el prefab en Resources y cargarlo desde otro instalador

![[Pasted image 20250624173234.png]]

![[Pasted image 20250624173238.png]]


# Contextos

Son la forma en la que Zenject une los contenedores con los instaladores

Cada contenedor está unido a un contexto, y cada contexto tiene una lista de instaladores. Así es como cada contenedor sabe qué dependencias debe crear. Existen los siguiente **tipos**:

## Scene Context (Contexto de escena)

Es el punto de entrada de cada escena. Es el primer script que se ejecutará una vez se ha inicializado el del contexto de proyecto (que veremos en seguida)

![[Pasted image 20250624173303.png]]

## GameObject Context (Contexto de GO)

Es un contexto de subcontenedor y sirve como un mecanismo de agrupado en base a los GameObject. Una escena puede tener múltiples instancias del mismo contexto GO. Se suelen utilizar para implementar [el patrón de diseño fachada](https://refactoring.guru/es/design-patterns/facade)

![[Pasted image 20250624173318.png]]

## Decorator Context (Contexto de Decorador)

Es un contexto anidado asociado a su propia escena. Su objetivo es añadir funcionalidad dinámicamente a una escena a través de la característica de edición multiescena. Lo hace anidandose a sí mismo en el Scene Context de la escena en la que se añade. A diferencia del contexto de GO, el Scene Context y el Deco Context comparten el mismo contenedor

![[Pasted image 20250624173339.png]]

## Project Context (Contexto de Proyecto)

Este es global y debe estar como prefab en la carpeta Resources. Se usa para crear dependencias globales a lo largo de todo el proyecto. Solo se inicializa una vez justo al ejecutar la app y sus dependencias se reutilizan en cada escena.

![[Pasted image 20250624173356.png]]

Este es el orden en el que se ejecuta cada contexto

![[Pasted image 20250624173409.png]]

![[Pasted image 20250624173420.png]]

![[Pasted image 20250624173424.png]]

# Métodos alternativos para asociarlo cada interfaz en el instalador

Mirar [[Unity Zenject GUÍA RÁPIDA#Evita usar MonoBehaviour cuando no es necesario|Evita usar MonoBehaviour cuando no es necesario]] ahí se explica que es esto y está la forma buena de hacerlo

Se puede hacer así pero es mejorable

```cs 
public class GameInstaller : MonoInstaller<GameInstaller>
{
    public void override InstallBindings()
    {
        Container.Bind<IInitializable>().To<TwitterService>().AsSingle();
        Container.Bind<IDisposable>().To<TwitterService>().AsSingle();
        Container.Bind<ITickable>().To<TwitterService>().AsSingle();
    }
}
``` 

Esta opción es un poco mejor

![[Pasted image 20250624173607.png]]

Usando un poco de Refletion podemos evitar tener que escribir cada interfaz que tiene la dependencia, pero queda feo

  ![[Pasted image 20250624173625.png]]

![[Pasted image 20250624173636.png]]

la forma buena está [[Unity Zenject GUÍA RÁPIDA#Evita usar MonoBehaviour cuando no es necesario|en la guía rápida, en la parte Evita usar MonoBehaviour cuando no es necesario]]

# Métodos de comunicación

Pero qué pasa si el dependiente (o clase de alto nivel, [[patrón de diseño SOLID design pattern#Definiciones|definición explicada aquí]] necesita comunicarse con la dependencia (o clase de bajo nivel)?

> [!Note] Atención
>  [[Unity Zenject GUÍA RÁPIDA#Métodos de comunicación|La forma buena está en la guía rápida]]

## Método 1: Clase dependiente ejecuta método en clase dependencia

> [!warning] No recomendable

Este método nos lleva a pasar una referencia de la clase dependencia a la dependiente.

Lo cual acopla las clases entre sí

![[Pasted image 20250624174148.png]]

## Método 2: Clase dependencia escucha evento elevado por clase dependiente

> [!warning] No recomendable

Este método nos lleva a pasar una referencia de la clase dependiente a la dependencia, lo cual también nos acopla las clases

![[Pasted image 20250624174214.png]]

# # Inyecciones complejas

Zenject es muy bueno para proyectos extensos y complejos y permite este tipo de inyecciones. Veamos los subcontenedores o contenedores anidados

Lo bueno es que ya se han visto :P

SceneContext que es necesario para cada escena es, en realidad, un subcontenedor ya que tanto SceneContext como cualquier otro hereda de sus asociaciones de ProjectContext. A su vez, GameObjectContext hereda de SceneContext sus asociaciones

Un Subcontenedor (Sub-Container (Nested Container)) en realidad se trata de

- Child of another container
    
- Bindings are only visible to itself and its children
    
- Used to abstract related dependency

![[Pasted image 20250624174406.png]]

Este es el método más sencillo de implementar un subcontenedor

Pero esta forma rara vez se ve

![[Pasted image 20250624174437.png]]

Esto ya me dio pateo hacerlo, es básicamente un ejemplo bastante completo en el que pone a prueba los beneficios del uso de los subcontenedores, [el enlace al vídeo es este](https://www.youtube.com/watch?v=hLuxWZHNW9U)

# Factorías (Factories)

Para que se usan mucho. [Explicadas aquí](https://github.com/modesttree/Zenject/blob/master/Documentation/Factories.md).

Sirven para crear objetos de forma dinámica.

El ejemplo adapta esta clase Enemy que requiere una instancia de Player, para tener un objetivo que atacar

![[Pasted image 20250624174500.png]]

Creamos la clase anidada Factory

Podría no ser anidada, pero es conveniente

Esta clase Factory debe heredar de `PlaceholderFactory<Enemy>`

![[Pasted image 20250624174516.png]]

Creamos la clase que, por cada tick, intentará crear una instancia de Enemy

![[Pasted image 20250624174531.png]]

Vamos a instalar todo lo que acabamos de hacer:

1er paso: Como EnemySpawner tiene la dependencia de la interfaz ITickable, se la asociamos

2do paso: Registramos Player como una dependencia de tipo Singleton. Como no indica nada, la instancia se crea FromNew, es decir, por defecto

3er paso: Registramos que el objeto Enemy, se creará gracias a Enemy.Factory

![[Pasted image 20250624174542.png]]

Esto funciona porque `PlaceholderFactory<T>` tiene un método Create (lo usamos en `EnemySpawner.Tick()`). Que emplea genera una instancia del tipo T, con los argumentos que T le solicita. En este caso, Player, que lo asociamos en el instalable y, por tanto, ya lo tiene

## Parámetros de tiempo de ejecución: Variación de variables

Pero ¿qué pasa si queremos hacer variaciones entre los distintos valores de Enemy?

Entiendo que hay que respetar el orden de los tipos para que funcione

![[Pasted image 20250624174621.png]]

Este nuevo valor, que estamos pidiendo en el PlaceholderFactory, lo estamos satisfaciendo en el Create

![[Pasted image 20250624174638.png]]

Por último, hay que adaptar la asociación al nuevo valor

![[Pasted image 20250624174650.png]]

![[Pasted image 20250624174658.png]]
# MemoryPools

Si un objeto se crea y destruye repetidas veces, puede dar tirones

![[Pasted image 20250624174716.png]]

Para evitar este problema, podemos acudir a las MemoryPool

![[Pasted image 20250624174727.png]]

Básicamente se gestiona igual, pero haciendo Spawn y Despawn

![[Pasted image 20250624174738.png]]

  
Lo mismo con el instalador

![[Pasted image 20250624174800.png]]

Esto sirve para que precargue 10 instancias de la clase Drink

![[Pasted image 20250624174813.png]]

Con más argumentos (p.e. nombre y precio de la bebida?)

![[Pasted image 20250624174824.png]]

![[Pasted image 20250624174835.png]]

# Bibliografía

[Readme de Zenject en Github](https://github.com/modesttree/Zenject/blob/master/README.md)

[Getting Started with Zenject @Infallible Code (Playlist)](https://www.youtube.com/watch?v=IS2YUIb_w_M&list=PLKERDLXpXl_jNJPY2czQcfPXW4BJaGZc_)

[Factories - Zenject - Github](https://github.com/modesttree/Zenject/blob/master/Documentation/Factories.md)