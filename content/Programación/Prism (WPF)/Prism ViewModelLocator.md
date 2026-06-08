Nada de esto hace falta saberlo, porque si creas las vistas con la plantilla de Prism, se creará todo automáticamente. En caso de querer cambiar esta convención. mirar al final

Pero si hubiera alguna necesidad, se hace así:

En la cada `vista / usercontrol` que creemos (MainWindow.xaml) añadimos `prism:ViewModelLocator.AutoWireViewModel="True"` y `deberá` existir un script en el namespace `ViewModels` con `el mismo nombre sufijado con "ViewModel"`. 

_Excepción, si el nombre de la vista acaba en "View", el sufijo no duplicará "View" y añadirá simplemente "Model" al final_

```xml 
<Window x:Class="ViewModelLocator.Views.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:prism="http://prismlibrary.com/"
        prism:ViewModelLocator.AutoWireViewModel="True"
        Title="{Binding Title}" Height="350" Width="525">
    <Grid>
        <ContentControl prism:RegionManager.RegionName="ContentRegion" />
    </Grid>
</Window>
``` 

Lo cual buscará si existe un equivalente acabado en `ViewModel`


![[Pasted image 20250611182825.png]]


# Cambiar convención

09 - ChangeConvention

Deberemos incluir esto en `App.xaml.cs`

```cs 
protected override void ConfigureViewModelLocator()
{
    base.ConfigureViewModelLocator();

    ViewModelLocationProvider.SetDefaultViewTypeToViewModelTypeResolver((viewType) =>
    {
        var viewName = viewType.FullName;
        var viewAssemblyName = viewType.GetTypeInfo().Assembly.FullName;
        var viewModelName = $"{viewName}ViewModel, {viewAssemblyName}";
        return Type.GetType(viewModelName);
    });
}
```


10 - CustomRegistration

Podemos combinar una vista y un ViewModel que cuyos nombres no coincidan de estas 4 formas diferentes

_App.xaml.cs_
```cs 
protected override void ConfigureViewModelLocator()
{
    base.ConfigureViewModelLocator();

    // type / type
    //ViewModelLocationProvider.Register(typeof(MainWindow).ToString(), typeof(CustomViewModel));

    // type / factory
    //ViewModelLocationProvider.Register(typeof(MainWindow).ToString(), () => Container.Resolve<CustomViewModel>());

    // generic factory
    //ViewModelLocationProvider.Register<MainWindow>(() => Container.Resolve<CustomViewModel>());

    // generic type
    ViewModelLocationProvider.Register<MainWindow, CustomViewModel>();
}
``` 

# Bibliografía

[https://prismlibrary.com/docs/viewmodel-locator.html](https://prismlibrary.com/docs/viewmodel-locator.html)