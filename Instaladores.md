

Debemos crear una clase que derive de MonoInstaller (más opciones en la sección [Instaladores 2](https://sites.google.com/view/wikijavi/unity/medio/unity-zenject#h.k77jyo5nwzny)), podemos llamarla como [Infallible Code](https://www.youtube.com/@InfallibleCode), GameInstaller.cs

Este será el punto de inicio de la app, donde se configuran todas las dependencias y que será el esqueleto de nuestro juego

```csharp
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