# Project Context

[[Unity Zenject DETALLADO#Project Context (Contexto de Proyecto)|Lo primero que se ejecuta es el Project Context]], que define las dependencias globales.

En `Resources` hay un prefab llamado `ProjectContext` que tiene su correspondiente componente y un ScriptableObject llamado `GameSettings`, ambas cosas están en `Resources. 

> [!note] Nota
>El código que ha generado este SO se llama `GameSettingsInstaller` y está en la carpeta `Code > Installers`

## GameInstaller (componente)

`SignalBusInstaller.Install(Container);` Esto activa los `signals`, puede estar en cualquier `installer` y se pone tal cual. Recomiendan hacerlo 1 vez en el `ProjectContext` o una por cada escena

## GameSettings (ScriptableObject)

![[Pasted image 20250624175228.png]]

Asocias los valores de las instancias

![[Pasted image 20250624175237.png]]

En otro sitio (en este caso la UI), se recibe el valor

![[Pasted image 20250624175245.png]]

# Escena Main

El punto de partida es la escena "Main" en `Assets > Scenes`. Ahí hay un `SceneContext` vacío, creo que podría no estar ya que también está en la escena Level y un botón en `UI - Canvas > Start Game - Btn`

Ese botón tiene el componente `ZenjectBinding` que se referencia a sí mismo como componente y tiene `UseSceneContext` activado

![[Pasted image 20250624175344.png]]

El SceneContext crea un GO DontDestroyOnLoad. Sinceramente creo que nada de esta escena es interesante, ya que todo lo vuelve a crear en Level
# Escena Level

Ahora SceneContext sí tiene cosas:

Podemos ver los `Installers` arriba, con los que ya estamos familiarizados, y abajo los de tipo `ScriptableObject`

Vamos a analizar las cosas que tengan que ver con el Player, tiene 3 Installer:

**PlayerSettingsInstaller** corresponde a un SO, lo que nos permitirá ir variando entre diferentes para comprobar 

**PlayerPrefabInstaller** Instancia el prefab y asocia su `PlayerFacade`

Estos dos se utilizan en el SceneContext, en la escena

**PlayerInstaller** se encuentra en el raíz del prefab e inicializa la mayoría de cosas mediante un `GameObjectContext` en el mismo GameObject

![[Pasted image 20250624175447.png]]
# PlayerSettingsInstaller (ScriptableObject)

Tiene como nombre de archivo `PlayerSettings` y se resume en 2 variables pero distribuídas entre varias clases

![[Pasted image 20250624175506.png]]

Supongo que con el objetivo de que finalmente se vea con esta configuración en el Inspector

![[Pasted image 20250624175519.png]]

  
En este Installer, estamos haciendo uso de las propiedades de has instanciado en el propio SO

Lo que estamos haciendo aquí es decirle a Zenject que cuando necesite un PlayerMovement.Settings, utilice la instancia que hemos creado, es decir, Player.Movement

![[Pasted image 20250624175528.png]]

Esto nos da la flexibilidad de poder cambiar las propiedades del Player creando los SO que queramos, de tal forma que creas una instancia de este SO, se lo pasas al ScriptableObjectInstaller y ya tienes esas propiedades enlazadas

![[Pasted image 20250624175535.png]]

Ejemplo de uso de las asociaciones que hemos creado en este SOInstaller

En la clase `PlayerMovement` vemos varios requisitos i.e `Settings` (`PlayerMovement.Settings`), `PlayerModel`, `PlayerInputState` y `PlayerAnimationStates`

Pues ese Settings se satisface gracias a que en el `ScriptableObjectInstaller` hemos enlazado que si quiere un Settings, coja ese

Como comentamos antes, `PlayerMovement` necesita un `PlayerMovement.Settings` y como hicimos el `BindInstance(PlayerMovement.Settings)` ahora lo detectar y satisface con él la dependencia

# PlayerPrefabInstaller

![[Pasted image 20250624175656.png]]

![[Pasted image 20250624175701.png]]


**Tan solo tiene esto, pero qué hace?**

`FromComponentInNewPrefab` crea una instancia de ese prefab en la escena (`Instantiate`) y toma de dicha Instance el componente `PlayerFacade` y lo enlaza `Bind`, de tal forma que cada dependencia que necesite un `PlayerFacade` cogerá ese (y solo ese `AsSingle`)

`UnderTransformGroup`, le indica de qué GameObject debería caer esta nueva instancia, por lo que parece ser que busca un `GameObject` de nombre `Player` y es ahí donde instancia ese prefab, como no existe, crea uno nuevo

# Resumen

1. El PlayerSettingsInstaller asocia los valores del SO (una clase que contiene un float y una clase que contiene un prefab)
    
2. El PlayerPrefabInstaller pide mediante `[Inject]` la clase con el prefab que PlayerSettingsInstaller acaba de asociar, crea la instancia de este prefab, y de esa instancia toma y asocia PlayerFacade
    
3. La instancia que acaba de crear PlayerPrefabInstaller es el prefab player, y tiene un GameObjectContext con el que asocia todo el contenido de PlayerInstaller

# PlayerInstaller

![[Pasted image 20250624175807.png]]


# FlipScreen (Signals)

En el GameObject SceneContext nos encontramos un installer llamado `FlipScreenInstaller`

Suscribe con `DeclareSignal` la señal `PlayerMovedOutOfScreenSignal` 

Además registra en la instancia que creamos en la línea anterior (accedida mediante [[Unity Zenject DETALLADO#FromResolve|FromResolve]]) que cuando esta se ejecute, se lance el método `FlipScreen` de la clase `FlipScreenManager`. No estoy nada seguro, pero creo que gracias a estar usando el `FromResolve`, podemos obtener obtener las variables `flipScreenManager` y `signalOutScreen` y pasarlas al método

![[Pasted image 20250624175827.png]]

Una vez todo registrado, se ejecuta en la clase `BorderCollider`, cuando detecta que el jugador ha tocado una pared, lanza el evento

![[Pasted image 20250624180542.png]]