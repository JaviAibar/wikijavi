Es una librería gratuita para la implementación de la [[(DI) Dependency Inyection]] que puedes [encontrar aquí, en Github](https://github.com/modesttree/Zenject)

Para info general del patrón de diseño (DI) Dependency Injection, [[(DI) Dependency Inyection]]

Esta guía se complementa con otra guía más detallada de la librería [en esta pág de WikiJavi](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1VDRe4rp1U995hTahOzxDj_egroxJkGSW/edit), son complementarias, eso quiere decir que casi no se repite información, por tanto, deberías leer las dos, pero como la detallada trata tanto teoría como casos especiales / alternativos, en la mayoría de casos puedes saltarte el detalle si la teoría ya la conoces.

# Proyecto de ejemplo

⭐ [[Análisis Zenject-Hero|Además hay un análisis mío a un ejemplo aportado por la gente de Zenject aquí]] 

> [!note] Guía actualizada a Febrero del 2024, he instalado la versión 9.2.0 de la librería en Unity 2022.3.4f1, pero debería valer para Unity >= 2018.4.13

# Instalacion

Existen 4 métodos

1. Desde [Github](https://github.com/modesttree/Zenject) importando el [package](https://github.com/modesttree/Zenject/releases)
    
2. Desde la [Asset Store de Unity](https://assetstore.unity.com/packages/tools/utilities/extenject-dependency-injection-ioc-157735)
    
3. UPM Branch (ni idea)
    
4. Desde el repo de [Github](https://github.com/modesttree/Zenject) importando el dll
    

Yo lo he instalado desde la Asset Store (Por alguna razón se llama Extenject)

> [!note] NOTA ADICIONAL
>  En el [manual de Zenject](https://github.com/modesttree/Zenject?tab=readme-ov-file#reflection-baking) indican que puedes activar una movida que optimiza el juego entero ya que mueve operaciones de ejecución a la build, por lo que lo hará más rápido. Se hace una vez y te olvidas. Para hacerlo se debe hacer ir al menú `Create > Zenject > Reflection Baking Settings`


# CheatSheet mejorado

He cambiado el CheatSheet por nombres que se entienden en vez de la caca de Foo y Bar. Traducido automáticamente por ChatGPT y en la versión que tienen el 04.03.2024 en [su github](https://github.com/modesttree/Zenject/blob/master/Documentation/CheatSheet.md)

Disponible [en mi Drive](https://colab.research.google.com/drive/1PlY01YgKmsmuDKo_lccvclw8yP0w13_T#scrollTo=VkIjJ2SSasDB&line=393&uniqifier=1)

# Tengo un problema

## He puesto un ITickable, IInitializable... y no se ejecutan su métodos, pero no da error

Probablemente sea porque has hecho Bind y no BindInterfacesAndSelfTo. Si haces solo Bind, no estarás inyectando las interfaces pese a no dar un error

## Error CS0119 `'DiContainer.Bind<TContract>()'` es método, que no es válida en el contexto indicado

Fíjate si has puesto los paréntesis en el método Bind. Es decir

`Container.Bind<ClockAudioManager>()` en lugar de `Container.Bind<ClockAudioManager>`

## Error CS0119 `'ConcreteBinderGeneric<IClockAudioManager>.To<TConcrete>()'` es método, que no es válida en el contexto indicado

Mismo problema, pero con To en vez de Bind. Fíjate si has puesto los paréntesis. Es decir

```cs 
Container.Bind<IClockAudioManager>().To<ClockAudioManager>() 
``` 

en lugar de 

```cs 
Container.Bind<IClockAudioManager>.To<ClockAudioManager>
``` 

# Instaladores

Debemos crear una clase que derive de `MonoInstaller` (más opciones en la sección 
[[Unity Zenject DETALLADO#Instaladores 2|Instaladores 2]]), podemos llamarla como [Infallible Code](https://www.youtube.com/@InfallibleCode), `GameInstaller.cs`

Este será el punto de inicio de la app, donde se configuran todas las dependencias y que será el esqueleto de nuestro juego

```cs 
using System;
using Zenject;

public class GameInstaller : MonoInstaller
{
    public override void InstallBindings()
    {
        // Container es el objeto donde ven a parar las dependencias
        // Bind es el método que las añade
        Container.Bind<IAudioService>()
        // To es la implementación concreta que recibirán los clientes
            .To<DebugAudioService>()
        // As single se refiere a que la instancia es única (Singleton)
            .AsSingle();

        // NonLazy quiere decir que la instancia de EnemySpawner debe crearse en cuanto la escena cargue
        Container.Bind<EnemySpawner>().AsSingle().NonLazy();
    }
}
``` 

[[Unity Zenject DETALLADO#Instaladores 2|Más en profundidad en la guía detallada]]

Creamos un `Scene Context`, que está en el 

- `Menú contextual de crear un GameObject > Zenject > Scene Context`

![[Pasted image 20250622195016.png]]

El script instalador `GameInstaller.cs`, debe estar como componente en un GameObject, supongo que estaría bien que estuviese junto al `SceneContext`

![[Pasted image 20250622195030.png]]

Ahora hay que validar que todo vaya bien en 

- `Edit > Zenject > Validate Current Scenes `
    
- `Alt + Shift + V`
    
- `Alt + Shift + R` (este comando además incia el juego)

![[Pasted image 20250622195059.png]]


# Resolución de dependencias / Tipos de inyección o patrones de inyección

## Por constructor (preferible) pero solo para No MonoBehaviour

Es preferible porque 

- Puedes ver **de un golpe** todas las dependencias y elimina cualquier duda sobre **cuándo** serán resueltas. 
    
- Te permite utilizar propiedades de **solo lectura** para asegurarte de que las dependencias no se pueden modificar durante la ejecución
    
- Mantiene tu código agnóstico del contenedor de DI, lo cual te permite **cambiar** de framework o **eliminarlo** por completo fácilmente
    
- Hace evidente cuándo estás violando el principio de [[patrón de diseño SOLID design pattern#Single Responsibility|Responsabilidad única]], ya que un constructor con demasiados argumentos es probable que lo esté violando y que debería dividirse en varias clases

![[Pasted image 20250622195123.png]]

## Por campo

La inyección sucede exactamente después de que el constructor haya sido llamado

![[Pasted image 20250622195302.png]]

## Por propiedad

Es muy similar a por campo, `pero` se debe usar con cautela porque complica ver las dependencias de un vistazo y averiguar cuándo y dónde se han rellenado

![[Pasted image 20250622195321.png]]

## Por método (preferible para MonoBehaviour)

Deberías usar mucho este porque como MonoBehaviour no permite constructores, este es su sustituto

![[Pasted image 20250622195334.png]]

Para un análisis del uso correcto de los diferentes métodos, puede [leer esto](https://github.com/ninject/Ninject/wiki/Injection-Patterns)

En un clase ==NO MonoBehaviour==, se pone en el constructor haciendo referencia a la interfaz

![[Pasted image 20250622195357.png]]

Para las clases **MonoBehaviour**, Zenject escanea estas clases en busca de la etiqueta `[Inject]` e intenta resolver las dependencias

![[Pasted image 20250622195418.png]]

# Incluir Scripts y Gameobjects de la escena como inyección

Podríamos poner en el GameInstaller una referencia, y pasar esa referencia como argumento, pero eso es tedioso y no mejora mucho el sistema que ya podías implementar sin usar DI. Para eso está ZenjectBinding

Es un componente que nos permite dar a conocer un Script o GameObject a Zenject

![[Pasted image 20250622195427.png]]

De tal forma que en el installer, en lugar de poner la referencia, pones el nombre de la clase y se resuelve solo

![[Pasted image 20250622195441.png]]

# Configuración de dependencias

[[Unity Zenject GUÍA RÁPIDA#Instalacion|Los primeros pasos están indicados arriba]+

Para ver las posibles configuraciones, están [[Unity Zenject DETALLADO#Configuración de dependencias|en la guía detallada]]

Podemos añadir una configuración más precisa con los métodos que trae Zenject

Todas están siendo usadas con una lógica predefinida, pero puedes especificar tú manualmente para lo que necesites


![[Pasted image 20250622195850.png]]


## Ámbito

Para saber también del método `AsCached` [[Unity Zenject DETALLADO#Ámbito|visitar la guía detallada]]

Estos métodos comienzan por `As` seguido del ámbito

El ámbito determina cuán común se van a reutilizar las diferentes inyecciones

> [!note] Fíjate
Por defecto es `AsTransient` que indica al constructor no reutilizar la instancia, es decir, se creará una nueva cada vez que sea pedida. Es lo contrario a Singleton

![[Pasted image 20250622200010.png]]

# Reutilizar los MonoInstallers

[[Unity Zenject DETALLADO#Reutilizar los MonoInstallers|Esto está en la guía detallada]]

# Contextos

Son la forma en la que Zenject une los contenedores con los instaladores

[[Unity Zenject DETALLADO#Contextos|Esto está en la guía detallada]]

# Evita usar MonoBehaviour cuando no es necesario

Muchas veces usamos `MonoBehaviour` en servicios para poder usar el ciclo de vida de Unity (`Start()`, `Update()` o `OnDestroy()`) pero ni siquiera lo necesitamos en la escena para nada.

Para ello, se pueden utilizar la interfaces de Zenject `IInitializable`, `ITickable`, `ILateTickable`, `IFixedTickable` o `IDisposable`

`IInitializable` para implementar `Initialize()` que emplea `Start()`

`ITickable`, `ILateTickable`, `IFixedTickable` para implementar `Tick()` que emplean `Update()`, `LateUpdate()` y `FixedUpdate()`

`IDisposable` para implementar `Dispose()` que se llama cuando la app se cierra, la escena cambia o cuando se destruye el objecto `SceneContext`, por lo que se debe usar para la limpieza de la clase


> [!warning] Cuidado: Versión parcial

Ahora hay que asociar cada interfaz con la clase que las implementa en el instalador

Para otros métodos alternativos de asociar interfaces a una dependencia [[Unity Zenject DETALLADO#Métodos alternativos para asociarlo cada interfaz en el instalador|mirar su apartado en la guía completa]]

```cs 
public class GameInstaller : MonoInstaller<GameInstaller>
{
    public void override InstallBindings()
    {
        Container.BindInterfacesTo<TwitterService>();
    }
}
``` 

> [!warning] Cuidado: Versión parcial

Como el punto de esto es que otras clases pueden referenciarlo, debemos añadir también la propia clase

```cs 
public class GameInstaller : MonoInstaller<GameInstaller>
{
    public void override InstallBindings()
    {
        Container.BindInterfacesTo<TwitterService>();
        Container.Bind<TwitterService>();
    }
}
``` 

Pero se puede hacer todo en una línea

```cs 
public class GameInstaller : MonoInstaller<GameInstaller>
{
    public void override InstallBindings()
    {
        Container.BindInterfacesAndSelfTo<TwitterService>();
    }
}
``` 

# Métodos de comunicación

Pero qué pasa si el dependiente (o clase de alto nivel, [[patrón de diseño SOLID design pattern#Definiciones|definición explicada aquí]]) necesita comunicarse con la dependencia (o clase de bajo nivel)?

Pero qué pasa si la dependencia (o clase de bajo nivel, definición explicada aquí) necesita comunicarse con la dependiente (o clase de alto nivel) o a cualquier otro (sub)sistema?

Info detallada [[Unity Zenject DETALLADO#Métodos de comunicación|aquí]]

Una solución muy popular es tener un intermediario que avise de los cambios a la dependencia, esto se llama [patrón observer](https://refactoring.guru/es/design-patterns/observer), en Zenject está implementado como señales (`Signals`)

## Señal básica

En el siguiente ejemplo, la clase de alto nivel, una UI, manda a otra de bajo nivel `Player` un cambio en la variable de salud.

![[Pasted image 20250622201007.png]]

La solución es crear una clase llamada `PlayerHealedSignal` (Nombre de la dependencia, Evento en pasado, Palabra Signal). Por organización la mete en una clase dedicada a las `Signals`

  

Esta es la forma básica de `Signal`, así ya funciona, pero después le añadiremos más complejidad (no mucha)

![[Pasted image 20250622201019.png]]

![[Pasted image 20250622201023.png]]

En la dependencia se inyecta la clase señal, y se lanza cuándo es preciso

Aunque también podríamos haber creado una nueva instancia. i.e.

```cs 
{
 new PlayerHealedSignal().Fire()
}
``` 

![[Pasted image 20250622201125.png]]

Registramos en el instalador, inyecta (primera línea en amarillo) la señal a las clases que la hayan pedido (en este caso, solo `Player`)

Después, asocia el desencadenado de la señal (`PlayerHealedSignal`) con quién deba escuchar o qué se deba ejecutar. En este caso esta usando una asociación estática, es decir un método, pero podría haberlo hecho con otra clase


> [!nota] Nota
> `CombatTextFactory` requiere el prefab de `CombatText` y el `canvas` donde será ubicado


# Señal con argumentos

Ahora queremos pasar qué cantidad de vida ha cambiado, lo podemos hacer mediante otro argumento genérico en la señal

De esta forma ya acepta variable enteras como argumento y la línea anterior de `.Fire()` ahora da error

![[Pasted image 20250622201226.png]]

Y deberemos actualizar la llamada

_Player.cs_
![[Pasted image 20250622201242.png]]

También hay que actualizar el instalador

_GameInstaller.cs_
![[Pasted image 20250622201314.png]]

Ahora crea una asociación adicional (más útil) para que se genere el mensaje a partir de la factory.

Para ello le pasa una función lambda que crea el mensaje con el mensaje correspondiente.

![[Pasted image 20250622201325.png]]

Y ahora esto lo puedes asociar con cualquier acción o subsistema como una barra actualizando automáticamente, partículas, sonidos...

# Inyecciones complejas

[[Unity Zenject DETALLADO#Inyecciones complejas|Mirar el manual detallado]]

# Testing

Se configura igual que [[Testing - Pruebas unitarias|un test normal de Unity]] pero debes añadir a las referencias el assembly `Zenject-TestFramework`

## EditTests (Unit Tests)

Las particularidades es que la clase debe heredar de ZenjectUnitTestFixture e ir decorada con un atributo [TestFixture]

Lo único que hace ZenjectUnitTestFixture es que cada vez que se ejecuta un test, el contenedor es creado de nuevo, lo cual nos evita que hayan contaminaciones entre los test

_Utilizando Resolve_
```cs 
using System;
using Zenject;
using NUnit.Framework;

[TestFixture]
public class TestLogger : ZenjectUnitTestFixture
{
    [SetUp]
    public void CommonInstall()
    {
        Container.Bind<Logger>().AsSingle();
    }

    [Test]
    public void TestInitialValues()
    {
        var logger = Container.Resolve<Logger>();

        Assert.That(logger.Log == "");
    }

...
``` 

> [!note] Fíjate
> En el método `[SetUp]` podemos ver una asociación con el contenedor de dependecias y su resolución en el `[Test]`

Mejor incluso, para evitar tanta llamada a Resolve y tanta variable inútil, inyectar en el propio test

```cs 
using System;
using Zenject;
using NUnit.Framework;

[TestFixture]
public class TestLogger : ZenjectUnitTestFixture
{
    [SetUp]
    public void CommonInstall()
    {
        Container.Bind<Logger>().AsSingle();
    }

    [Inject]
    Logger _logger;

    [Test]
    public void TestInitialValues()
    {
        Assert.That(logger.Log == "");
    }

...
``` 

## PlayTests

### Integration Tests

El siguiente ejemplo lo mejora

```cs 
public class SpaceShipTests : ZenjectIntegrationTestFixture
{
    [UnityTest]
    public IEnumerator TestVelocity()
    {
        // Aquí configura el estado inicial creando los GO de cero, cargando prefabs/escenas, etc

        PreInstall();

        // Métodos bind
        Container.Bind<SpaceShip>().FromNewComponentOnNewGameObject()
            .AsSingle().WithArguments(new Vector3(1, 0, 0));

        PostInstall();

        // A partir de aquí las pruebas utilizando los Resolve o campos [Inject]
        var spaceShip = Container.Resolve<SpaceShip>();

        Assert.IsEqual(spaceShip.transform.position, Vector3.zero);

        yield return null;

        // Should move in the direction of the velocity
        Assert.That(spaceShip.transform.position.x > 0);
    }
}
``` 

Variante de lo mismo

```cs 
public class SpaceShipTests : ZenjectIntegrationTestFixture
{
    void CommonInstall()
    {
        PreInstall();

        Container.Bind<SpaceShip>().FromNewComponentOnNewGameObject()
            .AsSingle().WithArguments(new Vector3(1, 0, 0));

        PostInstall();
    }

    [Inject]
    SpaceShip _spaceship;

    [UnityTest]
    public IEnumerator TestInitialState()
    {
        CommonInstall();

        Assert.IsEqual(_spaceship.transform.position, Vector3.zero);
        Assert.IsEqual(_spaceship.Velocity, new Vector3(1, 0, 0));
        yield break;
    }

    [UnityTest]
    public IEnumerator TestVelocity()
    {
        CommonInstall();

        // Wait one frame to allow update logic for SpaceShip to run
        yield return null;

        // Should move in the direction of the velocity
        Assert.That(_spaceship.transform.position.x > 0);
    }
}
``` 

###  SceneTests

#WIP 

# Bibliografía

[Readme de Zenject en Github](https://github.com/modesttree/Zenject/blob/master/README.md)

[Getting Started with Zenject @Infallible Code (Playlist)](https://www.youtube.com/watch?v=IS2YUIb_w_M&list=PLKERDLXpXl_jNJPY2czQcfPXW4BJaGZc_)

[Unit tests](https://github.com/modesttree/Zenject/blob/master/Documentation/WritingAutomatedTests.md#unit-tests)

[Integration Tests](https://github.com/modesttree/Zenject/blob/master/Documentation/WritingAutomatedTests.md#integration-tests)

[Scene tests](https://github.com/modesttree/Zenject/blob/master/Documentation/WritingAutomatedTests.md#scene-tests)

# Keywords

Tests unit test unittest pruebas unitarias