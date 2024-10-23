Consisten en la siguiente estructura (aunque puedes implementar rápidamente uno con los snippets que traen o que he reproducido [[Snippets|aquí]])

# DelegateCommand

11-UsingDelegateCommands

## Forma básica

Una propiedad `DelegateCommand`

Un método `Execute` con la acción

Un método `CanExecute` que devuelve si es posible ejecutar ese método

Y por último, la instanciación del `DelegateCommand`, a la cual le pasamos tanto la acción a realizar como la comprobación de si el botón debería estar deshabilitado

```cs 
public DelegateCommand ExecuteDelegateCommand { get; private set; }

public MainWindowViewModel()
{
    ExecuteDelegateCommand = new DelegateCommand(Execute, CanExecute);
}

private void Execute()
{
    UpdateText = $"Updated: {DateTime.Now}";
}

private bool CanExecute()
{
    return IsEnabled;
}
``` 

La parte negativa de esta implementación es que debemos `elevar el evento` de que ha habido un cambio manualmente

```cs 
private bool _isEnabled;
public bool IsEnabled
{
    get { return _isEnabled; }
    set
    {
        SetProperty(ref _isEnabled, value);
        ExecuteDelegateCommand.RaiseCanExecuteChanged();
    }
}
``` 

A partir de aquí, son modificaciones de la estructura


## CanExecute sin desencadenar evento (raise event)

Tenemos 2 formas de hacer esto.

\1. Mediante ObserveProperty

```cs 
DelegateCommandObservesProperty = new DelegateCommand(Execute, CanExecute).ObservesProperty(() => IsEnabled);
``` 


\2. Mediante ObserveCanExecute

Esta opción además, nos permite eliminar el método CanExecute

```cs 
DelegateCommandObservesCanExecute = new DelegateCommand(Execute).ObservesCanExecute(() => IsEnabled);
``` 

## Comando genérico

Este nos permite pasar una variable por argumento

Se implementaría así

```cs 
ExecuteGenericDelegateCommand = new DelegateCommand<string>(ExecuteGeneric).ObservesCanExecute(() => IsEnabled);
private void ExecuteGeneric(string parameter)
{
    UpdateText = parameter;
}
``` 


Y el argumento llegaría mediante la propiedad CommandParameter en el xaml

```xml 
 <Button Command="{Binding ExecuteGenericDelegateCommand}" CommandParameter="Passed Parameter" Content="DelegateCommand Generic" Margin="10"/>
 ``` 

# Comandos compuestos

12-UsingCompositeCommands

Sirven para combinar tanto los Execute de varios comandos, como sus CanExecute

Para este caso, se ha creado una vista para que vaya en 3 pestañas (`TabControl`)

En el `OnInitialized` de `ModuleAModule` se han instanciado la vista de las 3 pestañas y añadido al `TabControl` a través de la `Region`, que estará en la `MainWindow`

_ModuleAModule_
```cs 
public void OnInitialized(IContainerProvider containerProvider)
{
    var regionManager = containerProvider.Resolve<IRegionManager>();
    IRegion region = regionManager.Regions["ContentRegion"];

    var tabA = containerProvider.Resolve<TabView>();
    SetTitle(tabA, "Tab A");
    region.Add(tabA);

    var tabB = containerProvider.Resolve<TabView>();
    SetTitle(tabB, "Tab B");
    region.Add(tabB);

    var tabC = containerProvider.Resolve<TabView>();
    SetTitle(tabC, "Tab C");
    region.Add(tabC);
}
``` 


Al hacer el Resolve de las vistas (paso anterior), se están instanciando sus correspondientes ViewModel, por lo que sus constructores se están ejecutando y, por tanto, registrando los comandos en el CompositeCommand, que está en ApplicationCommands (lo veremos a continuación).

```cs 
public TabViewModel(IApplicationCommands applicationCommands)
{
    _applicationCommands = applicationCommands;

    UpdateCommand = new DelegateCommand(Update).ObservesCanExecute(() => CanUpdate);

    _applicationCommands.SaveCommand.RegisterCommand(UpdateCommand);
}
``` 


Aquí está ApplicationCommands, que es básicamente un CompositeCommand en el que vamos a añadir todos los Command que queramos sincronizar

```cs 
public interface IApplicationCommands
{
    CompositeCommand SaveCommand { get; }
}

public class ApplicationCommands : IApplicationCommands
{
    private CompositeCommand _saveCommand = new CompositeCommand();
    public CompositeCommand SaveCommand
    {
        get { return _saveCommand; }
    }
}
``` 


Requisito para hacer esto (tanto ApplicationCommands como TabView están en Modulos diferentes (en total tenemos 3 modulos))

```cs 
protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
{
    moduleCatalog.AddModule<ModuleA.ModuleAModule>();
}

protected override void RegisterTypes(IContainerRegistry containerRegistry)
{
    containerRegistry.RegisterSingleton<IApplicationCommands, ApplicationCommands>();
}
``` 

# CanExecute dinámico

13-IActiveAwareCommands

Se debe implementar `IActiveAware` allá donde estas registrando los comandos

  
Y ya, de hecho creo que ni el IsActiveChanged?.Invoke hace falta

```cs 
bool _isActive;
public bool IsActive
{
    get { return _isActive; }
    set
    {
        _isActive = value;
        OnIsActiveChanged();
    }
}
private void OnIsActiveChanged()
{
    UpdateCommand.IsActive = IsActive;

    IsActiveChanged?.Invoke(this, new EventArgs());
}

public event EventHandler IsActiveChanged;
``` 

# IEventAggregator EventAggregator

14-UsingEventAggregator

Este ejemplo consiste en un lado que ejecuta un evento con un mensaje y el otro que se suscribe al evento y lo añade a una lista

Crea una clase vacía solo para heredar PubSubEvent

```cs 
public class MessageSentEvent : PubSubEvent<string>
{
}
```


Un lado se suscribe al evento

```cs 
IEventAggregator _ea;

public MessageListViewModel(IEventAggregator ea)
{
    _ea = ea;
    Messages = new ObservableCollection<string>();

    _ea.GetEvent<MessageSentEvent>().Subscribe(MessageReceived);
}

private void MessageReceived(string message)
{
    Messages.Add(message);
}
``` 

El otro lado lanza el evento

```cs 
IEventAggregator _ea;

public DelegateCommand SendMessageCommand { get; private set; }

public MessageViewModel(IEventAggregator ea)
{
    _ea = ea;
    SendMessageCommand = new DelegateCommand(SendMessage);
}

private void SendMessage()
{
    _ea.GetEvent<MessageSentEvent>().Publish(Message);
}
``` 


## Filtrado

15-FilteringEvents

Podemos filtrar la recepción de los eventos. Para ello, simplemente le pasamos un par de argumentos y una función lambda o un método que devuelva un bool (los argumentos 2 y 3 son opcionales)

```cs 
_ea.GetEvent<MessageSentEvent>().Subscribe(MessageReceived, ThreadOption.PublisherThread, false, (filter) => filter.Contains("Brian"));
``` 

# Bibliografía

Cerrar tab modo Prism (sin x:Name) [https://stackoverflow.com/questions/42652206/close-dynamically-added-tab-items-using-prism-wpf](https://stackoverflow.com/questions/42652206/close-dynamically-added-tab-items-using-prism-wpf)

