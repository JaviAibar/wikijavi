Contenedores de UI. Pueden ser por ejemplo un TabControl o un ContentControl

Los RegionManager pueden crear regiones tanto en el Xaml como en el código, identificados por el RegionManager.RegionName.

Los region pueden tener datos dinámicos.

Un módulo puede contener contenido UI presentado como un UserControl, un tipo de dato que está asociado a un DataTemplate, un CustomControl o cualquier combinación de estas.

# Importante

La Window que está siendo cargada aquí...:

```cs
protected override Window CreateShell()
{
    return Container.Resolve<MainWindow>();
}
```

Tendrá inyectados los diferentes tipos, que podremos obtener a través del constructor: IContainerExtension, IRegionManager...

Dos opciones de constructores diferentes para MainWindow (tomado de dos ejemplos diferente, ==dudo== que puedan funcionar ambos simultaneamente)

```cs
public MainWindow(IRegionManager regionManager)
{
    InitializeComponent();
    //view discovery
    regionManager.RegisterViewWithRegion("ContentRegion", typeof(ViewA));
}

public MainWindow(IContainerExtension container, IRegionManager regionManager)
{
    InitializeComponent();
    _container = container;
    _regionManager = regionManager;
}
```

Las regiones que queramos que se puedan visualizar deberemos resolverlas y añadirlas a la región

```cs 
private void MainWindow_Loaded(object sender, RoutedEventArgs e)
{
    _viewA = _container.Resolve<ViewA>();
    _viewB = _container.Resolve<ViewB>();

    _region = _regionManager.Regions["ContentRegion"];

    _region.Add(_viewA);
    _region.Add(_viewB);
}
```

Despues podemos activarlas o desactivarlas según necesitemos

```cs
private void Button_Click(object sender, RoutedEventArgs e)
{
    //activate view a
    _region.Activate(_viewA);
}

private void Button_Click_1(object sender, RoutedEventArgs e)
{
    //deactivate view a
    _region.Deactivate(_viewA);
}
``` 


# Crear y asociar una región

Como se comentaba al principio, para crear una región, simplemente en el xaml ponemos el nombre

_MainWindow.xaml_
```xml 
<Grid>
        <ContentControl prism:RegionManager.RegionName="ContentRegion" />
</Grid>
``` 

_MainWindow.xaml.cs_
```cs 
public MainWindow(IRegionManager regionManager)
{
    InitializeComponent();
    //view discovery
    regionManager.RegisterViewWithRegion("ContentRegion", typeof(ViewA));
}
``` 

# Inyección de vista

```cs 
private void Button_Click(object sender, RoutedEventArgs e)
{
    var view = _container.Resolve<ViewA>();
    IRegion region = _regionManager.Regions["ContentRegion"];
    region.Add(view);
}
``` 

# Contextos / asociación de datos

## De un módulo a un región

16-RegionContext

_ModuleAModule.cs_
```cs 
public void OnInitialized(IContainerProvider containerProvider)
{
    var regionManager = containerProvider.Resolve<IRegionManager>();
    regionManager.RegisterViewWithRegion("ContentRegion", typeof(PersonList));
    regionManager.RegisterViewWithRegion("PersonDetailsRegion", typeof(PersonDetail));
}
``` 

# Navegación entre regiones

Para ver la Navegación entre regiones visitar [[Prism Navigation]]