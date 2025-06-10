Para referenciar las plantillas que creemos usaremos StaticResource como se explica en la sección [[WPF Referenciar recursos]]

# Bindings

`TemplateBinding` es una forma optimizada de enlazar plantillas. Util para enlazar partes de una plantilla a propiedades de un control. Ejemplo: Cada control tiene una propiedad `BorderThickness`. Puedes usar un TemplateBinding para manejar qué elemento en la plantilla se ve afectada por esta configuración del control.

# ContentControl e ItemsControl

Si el ContentPresenter está declarado en el ControlTemplate, enlazará automáticamente las propiedades del ControlTemplate y del Content. De la misma forma, si está presente el ItemPresenter en el ControlTemplate, éste enlazará las propiedades del ItemTemplate y de los Items automáticamente

# DataTemplates

Se trata de otro recurso, pero en vez de ser gráfico, es de datos. Se debe incluir la propiedad DataType, que es el equivalente a TargetType del Style o ControlTemplate

Puedes omitir el x:Key para que la info se aplique a todos los DataType que hayas que correspondan

Para ver como tratar con datos y archivos leer [esta página](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1jvyVASY5bHMIt63oXnoi7o9rZp4RUoV7/edit)

# Pasar estilos a archivos separados

Deberemos crear en `App.xaml` un diccionario combinado con cada archivo representado por su ruta (incluida la extensión) en la propiedad `Source`

_App.xaml_
```xml
<Application x:Class="ImageViewer.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:ImageViewer"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="Theme/MenuButtonTheme.xaml" />
                <ResourceDictionary Source="Theme/TextBoxTheme.xaml" />
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Application.Resources>
</Application>
```

# Bibliografía

[https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/styles-templates-overview?view=netdesktop-7.0](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/styles-templates-overview?view=netdesktop-7.0) 

[https://github.com/microsoft/WPF-Samples/tree/master/Styles%20%26%20Templates/IntroToStylingAndTemplating](https://github.com/microsoft/WPF-Samples/tree/master/Styles%20%26%20Templates/IntroToStylingAndTemplating)