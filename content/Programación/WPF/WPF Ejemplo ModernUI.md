![[Pasted image 20250611180550.png]]

# Preambulos

Elimina el título, porque esta interfaz no los usa, el tamaño de la ventana lo cambia por `600Hx920W` y añade `WindowStyle="None" ResizeMode="NoResize" Background="Transparent" AllowsTransparency="True"`

Crea las siguientes carpetas: `Core, Fonts, Images, Theme, MVVM, MVVM/Model, MVVM/View, MVVM/ViewModel`

_MainWindow.xaml ==Implementación parcial==_
```xml
<Window x:Class="ModernUI.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:ModernUI"
        mc:Ignorable="d"
        Height="600" Width="920"
        WindowStyle="None"
        ResizeMode="NoResize"
        Background="Transparent"
        AllowsTransparency="True">
    
</Window>
```

# ObservableObject

En `Core` crea una clase llamada `ObservableObject` que implementa `INotifyPropertyChanged`

[CallerMemberName] es para tener el nombre de la función que lo llama

```cs
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace ModernUI.Core
{
    internal class ObervableObject : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler? PropertyChanged;
        
        protected void OnPropertyChanged([CallerMemberName] string? name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}
```

# RelayCommand

Comenta que ya existe uno por defecto, pero que es un tanto inflexible y quiere crear el suyo propio

```cs
using System;
using System.Windows.Input;

namespace ModernUI.Core
{
    class RelayCommand : ICommand
    {
        public event EventHandler? CanExecuteChanged
        {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }

        private Action<object> _execute;
        private Func<object, bool> _canExecute;

        public RelayCommand(Action<object> execute, Func<object, bool> canExecute = null)
        {
            _execute = execute;
            _canExecute = canExecute;
        }

        public bool CanExecute(object? parameter)
        {
            return _canExecute == null || _canExecute(parameter);
        }

        public void Execute(object? parameter)
        {
            _execute(parameter);
        }
    }
}
```

# Rejilla y menu lateral

_MainWindow.xaml ==Implementación parcial==_
```xml
<Window x:Class="ModernUI.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:ModernUI"
        mc:Ignorable="d"
        Height="600" Width="920"
        WindowStyle="None"
        ResizeMode="NoResize"
        Background="Transparent"
        AllowsTransparency="True">
    <Border Background="#272537"
            CornerRadius="20">
        <Grid>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="200" />
                <ColumnDefinition />
            </Grid.ColumnDefinitions>
            <Grid.RowDefinitions>
                <RowDefinition Height="75"/>
                <RowDefinition />
            </Grid.RowDefinitions>

            <TextBlock HorizontalAlignment="Left"
                       Margin="20, 0, 0, 0"
                       VerticalAlignment="Center"
                       FontSize="25"
                       Foreground="White">JaviApp</TextBlock>
            <StackPanel Grid.Row="1">
                <RadioButton Content="Home"
                             Height="50"
                             Foreground="White" 
                             FontSize="14"/>
            </StackPanel>
        </Grid>
    </Border>
</Window>
```

# Estilo reutilizable (ResourceDictionary)

_MenuButtonTheme.xaml (explicado parte a parte abajo)_
```xml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Style BasedOn="{StaticResource {x:Type ToggleButton}}"
            TargetType="RadioButton"
            x:Key="MenuButtonTheme">
        <Style.Setters>
            <Setter Property="Template">
                <Setter.Value>
                    <ControlTemplate>
                        <Grid VerticalAlignment="Stretch"
                        HorizontalAlignment="Stretch"
                        Background="{TemplateBinding Background}">
                            <TextBlock Text="DefaultText"
                                VerticalAlignment="Center"
                                Margin="50, 0, 0, 0"/>
                        </Grid>
                    </ControlTemplate>
                </Setter.Value>
            </Setter>

            <Setter Property="Background" Value="Transparent" />
            <Setter Property="BorderThickness" Value="0" />
        </Style.Setters>

        <Style.Triggers>
            <Trigger Property="IsChecked" Value="True">
                <Setter Property="Background" Value="#22202f" />
            </Trigger>
        </Style.Triggers>
    </Style>
</ResourceDictionary>
```

En esta etiqueta heredamos gracias a  `BasedOn` el estilo que tiene un elemento en concreto (en este caso `ToggleButton`)

Definimos a qué tipo de elemento se lo aplicaremos (en este caso a los RadioButton)

Y le ponemos nombre para luego poder referenciarlo a la hora de aplicarlo

`StaticResource` permite obtener contenido que esté definido en otra parte (en algún nivel de la página, la aplicación, los temas de control y los recursos externos disponibles, o los recursos del sistema). Para cargarlo se deberá utilizar el nombre (`ResourceKey`) especificado en `x:Key`

_MenuButtonTheme.xaml_
```xml
<Style BasedOn="{StaticResource {x:Type ToggleButton}}"
        TargetType="RadioButton"
        x:Key="MenuButtonTheme">

    ...

</Style>
```


Dentro del Style tenemos 2 secciones: los Setters que aplican un valor a una propiedad concreta del elemento al que el Style haga referencia

Y los Triggers que definen básicamente una condición para aplicar otro Setter diferente

En la sección de Setters tenemos estos simples

_MenuButtonTheme.xaml_
```xml
<Setter Property="Background" Value="Transparent" />
<Setter Property="BorderThickness" Value="0" />
```

Y este que es bastante más complejo ya que se aplica al template completo

ControlTemplate parece una etiqueta que define una parte reutilizable, lo que en terminología Unity sería (aprox) un Prefab

TemplateBinding establece para esa propiedad en concreto, al valor del control de la plantilla

_MenuButtonTheme.xaml_
```xml
<Setter Property="Template">
    <Setter.Value>
        <ControlTemplate>
            <Grid VerticalAlignment="Stretch"
                        HorizontalAlignment="Stretch"
                        Background="{TemplateBinding Background}">
                <TextBlock Text="DefaultText"
                                VerticalAlignment="Center"
                                Margin="50, 0, 0, 0"/>
            </Grid>
        </ControlTemplate>
    </Setter.Value>
</Setter>
```

Se entiende que al activarse el evento `IsChecked`, el `Background` del `RadioButton` será cambiado a `#22202F`

_MenuButtonTheme.xaml_
```xml
<Style.Triggers>
    <Trigger Property="IsChecked" Value="True">
        <Setter Property="Background" Value="#22202f" />
    </Trigger>
</Style.Triggers>
```

Por último, para que este diccionario se pueda utilizar ==es necesario referenciarlo en el archivo App.xaml==

_App.xaml_
```xml
<Application x:Class="ModernUI.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:ModernUI"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="Theme/MenuButtonTheme.xaml" />
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>         
    </Application.Resources>
</Application>
```

Por último lo aplicamos con Style="{StaticResource MenuButtonTheme}", pero hay un problema, y es que todos los RadioButton a los que le apliquemos este estilo, tendrán el texto por defecto DefaultText que le pusimos antes. Debemos cambiarlo

```xml
<TextBlock Text="{TemplateBinding Content}"
                                VerticalAlignment="Center"
                                Margin="50, 0, 0, 0"/>
```

Sin embargo da error, ya que nos falta añadir en ControlTemplate TargetType="RadioButton" y quedaría:

_MenuButtonTheme.xaml_
```xml
<ControlTemplate TargetType="RadioButton">
    <Grid VerticalAlignment="Stretch"
    HorizontalAlignment="Stretch"
    Background="{TemplateBinding Background}">
        <TextBlock Text="{TemplateBinding Content}"
            VerticalAlignment="Center"
            Margin="50, 0, 0, 0"/>
    </Grid>
</ControlTemplate>
```

# Bibliografía

[https://www.youtube.com/watch?v=PzP8mw7JUzI&ab_channel=Payload](https://www.youtube.com/watch?v=PzP8mw7JUzI&ab_channel=Payload)
