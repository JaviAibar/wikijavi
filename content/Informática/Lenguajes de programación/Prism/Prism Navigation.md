# Por defecto

24-NavigationJournal (entre otras)

Para situar una vista por defecto, podemos hacer una request en el `OnInitialized`

_ModuleAModule.cs_
```cs 
public void OnInitialized(IContainerProvider containerProvider)
{
    var regionManager = containerProvider.Resolve<IRegionManager>();
    regionManager.RequestNavigate("ContentRegion", "PersonList");
} 
```
# Navegación entre regiones

17-BasicRegionNavigation

Para poder navegar entre las vistas, es necesario registrarlo para la navegación `RegisterForNavigation`

_ModuleAModule.cs_
```cs 
public void RegisterTypes(IContainerRegistry containerRegistry)
{
    containerRegistry.RegisterForNavigation<ViewA>();
    containerRegistry.RegisterForNavigation<ViewB>();
}
``` 

Opcionalmente, se puede añadir una callback a la request

_MainWindowViewModel.cs_
```cs 
public DelegateCommand<string> NavigateCommand { get; private set; }

public MainWindowViewModel(IRegionManager regionManager)
{
    _regionManager = regionManager;

    NavigateCommand = new DelegateCommand<string>(Navigate);
}

private void Navigate(string navigatePath)
{
    if (navigatePath != null)
        _regionManager.RequestNavigate("ContentRegion", navigatePath);
}
``` 


_MainWindow.xaml_
```xml 
<StackPanel Orientation="Horizontal" DockPanel.Dock="Top" Margin="5" >
    <Button Command="{Binding NavigateCommand}" CommandParameter="ViewA" Margin="5">Navigate to View A</Button>
    <Button Command="{Binding NavigateCommand}" CommandParameter="ViewB" Margin="5">Navigate to View B</Button>
</StackPanel>
<ContentControl prism:RegionManager.RegionName="ContentRegion" Margin="5"  />
``` 

# INavigationAware

19-NavigationParticipation

Las `ViewModel` pueden implementar `INavigationAware`, en la que en estos métodos podemos ampliar funcionalidades

En este caso tenemos una propiedad en la clase llamada `PageViews`, que luego se muestra en la vista

Si `IsNavigationTarget` devuelve `False`, crea una nueva vista (o eso me ha parecido entender del ejemplo ==20-NavigateToExistingViews==)

_ViewAViewModel.cs_
```cs 
public void OnNavigatedTo(NavigationContext navigationContext)
{
    PageViews++;
}

public bool IsNavigationTarget(NavigationContext navigationContext)
{
    return true;
}

public void OnNavigatedFrom(NavigationContext navigationContext)
{
            
}
``` 

# Pasar parámetros al navegar

21-PassingParameters

Al hacer click a un [[Prism Comandos y eventos|Command con una persona como argumento]], se ejecuta este método, y sencillamente, agregamos un `NavigationParameters` junto a la petición

_ModuleA>PersonListViewModel.cs_
```cs 
private void PersonSelected(Person person)
{
    var parameters = new NavigationParameters();
    parameters.Add("person", person);

    if (person != null)
        _regionManager.RequestNavigate("PersonDetailsRegion", "PersonDetail", parameters);
}
``` 

Esta info está siendo recogida y usada en `PersonDetailViewModel`, que implementa `INavigationAware`. Entonces tanto `OnNavigatedTo`, `OnNavigatedFrom` como `IsNavigationTarget` reciben un `contexto` `NavigationContext` entre los argumentos

_ModuleA > PersonDetailViewModel.cs_
```cs 
public void OnNavigatedTo(NavigationContext navigationContext)
{
    var person = navigationContext.Parameters["person"] as Person;
    if (person != null)
        SelectedPerson = person;
}

public bool IsNavigationTarget(NavigationContext navigationContext)
{
    var person = navigationContext.Parameters["person"] as Person;
    if (person != null)
        return SelectedPerson != null && SelectedPerson.LastName == person.LastName;
    else
        return true;
}
``` 

Interesante a mencionar de este ejemplo es que crea pestañas pidiendo navegar, lo cual es poco intuitivo

He modificado posteriormente este ejemplo para que las pestañas puedan cerrarse.

Utiliza para ello una propiedad de los [[Prism Comandos y eventos|Comandos]] mediante el cual se puede pasar el propio objeto a eliminar

_PersonList.xaml_
```xml 
<TabControl Grid.Row="1" Margin="10" prism:RegionManager.RegionName="PersonDetailsRegion">
    <TabControl.ItemTemplate>
        <DataTemplate>
            <DockPanel Width="Auto">
                <Button Command="{Binding DataContext.DataContext.CloseTabCommand, RelativeSource={RelativeSource AncestorType={x:Type TabItem}}}"
        CommandParameter="{Binding Path=DataContext, RelativeSource={RelativeSource AncestorType={x:Type TabItem}}}"
        Content="X"
        Cursor="Hand"
        DockPanel.Dock="Right"
        Focusable="False"
        FontFamily="Courier"
        FontWeight="Bold"
        Margin="4,0,0,0"
        FontSize="10"
        VerticalContentAlignment="Center"
        Width="15" Height="15" />

                <ContentPresenter Content="{Binding DataContext.DataContext.HeaderText, RelativeSource={RelativeSource AncestorType={x:Type TabItem}}}" />
            </DockPanel>
        </DataTemplate>
    </TabControl.ItemTemplate>
</TabControl>
``` 

```cs 
public DelegateCommand<object> CloseTabCommand { get; }

private void OnExecuteCloseCommand(object tabItem)
{
    _regionManager.Regions["PersonDetailsRegion"].Remove(tabItem);
}

public PersonDetailViewModel(IRegionManager regionManager)
{
    _regionManager = regionManager;
    CloseTabCommand = new DelegateCommand<object>(OnExecuteCloseCommand);
}
``` 

# Confirmar/Cancelar navegación

22-ConfirmCancelNavigation

Podemos implementar `IConfirmNavigationRequest` para cancelar la navegación

_ViewAViewModel.cs_
```cs 
public void ConfirmNavigationRequest(NavigationContext navigationContext, Action<bool> continuationCallback)
{
    bool result = true;

    if (MessageBox.Show("Do you to navigate?", "Navigate?", MessageBoxButton.YesNo) == MessageBoxResult.No)
        result = false;

    continuationCallback(result);
}
``` 

# IRegionMemberLifetime

23-RegionMemberLifetime

Tras instancia inicializar y añadir una vista a la región destino, ésta se convierte en la activa, y desactiva a la anterior. En ocasiones querrás que esa vista, se elimine de la región, implementando `IRegionMemberLifetime` podremos definir si la vista se elimina o no

_ViewAViewModel.cs_
```cs 
public bool KeepAlive
{
    get
    {
        return false;
    }
}
``` 

# Navegación palante patrás (adelante y atrás, avanzar retroceder, abrir cerrar, entrar salir, journal, página)

24-NavigationJournal

Recibimos siempre dentro de nuestro `NavigationContext (Contexto de navegación)` el objeto `Journal`...

```cs 
public void OnNavigatedTo(NavigationContext navigationContext)
{
    _journal = navigationContext.NavigationService.Journal;

    var person = navigationContext.Parameters["person"] as Person;
    if (person != null)
        SelectedPerson = person;
}
``` 

...que será el que podremos luego emplear para echar para atrás si lo necesitamos

```cs 
private void GoBack()
{
    _journal.GoBack();
}
``` 

