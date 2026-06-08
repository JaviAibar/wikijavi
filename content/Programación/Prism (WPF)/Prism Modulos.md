Puedes crear un proyecto como modulo para ser compilado como `librería dll` y luego ser cargado por la aplicación principal

Aunque también puedes evitar crear la librería si haces la carga manual que se explica después, pero supongo que lo suyo es compilar que será más óptimo

`ModuleA` es el que será cargado y Modules es la aplicación principal

![[Pasted image 20250611182613.png]]


Si accedemos a las propiedades de `ModuleA (csproj)`, deberemos cambiar ciertos valores, entre los que se encuentran poner el `Tipo de resultado` como `Biblioteca de clases`


![[Pasted image 20250611182733.png]]

Y en la sección de evento hay que añadir la linea 

``` 
xcopy "$(TargetDir)*.*" "$(SolutionDir)\$(SolutionName)\bin\Debug\net6.0-windows\" /Y 
``` 

tal y como se ve en la captura

![[Pasted image 20250611182742.png]]



# Cargar con App.config

Gracias a lo que hemos hecho, cuando `compilemos`, nos generará una `librería dll` que luego tendremos que cargar en `Modulos`

Para ello, deberemos añadir un archivo `App.config` con el siguiente contenido

```xml 
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <configSections>
    <section name="modules" type="Prism.Modularity.ModulesConfigurationSection, Prism.Wpf" />
  </configSections>
  <startup>
  </startup>
  <modules>
    <module assemblyFile="ModuleA.dll" 
			moduleType="ModuleA.ModuleAModule, ModuleA, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" 
			moduleName="ModuleAModule" 
			startupLoaded="True" />
  </modules>
</configuration>
``` 

En `App.xaml.cs` añadimos esto

```cs 
protected override IModuleCatalog CreateModuleCatalog()
{
    return new ConfigurationModuleCatalog();
}
``` 

# Cargar con código

En `App.xaml.cs` añadimos esto

```cs 
protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
{
    moduleCatalog.AddModule<ModuleA.ModuleAModule>();
}
``` 

# Cargar mediante carpeta / directorio

En App.xaml.cs le indicamos que la carpeta donde está el dll está en la `raíz\Modules (bin\Debug\net6.0-windows\Modules)`. Esta ubicación se la indicamos en las propiedades del proyecto (botón derecho en `ModuleA(csproj) >Propiedades`)

```cs 
protected override IModuleCatalog CreateModuleCatalog()
{
    return new DirectoryModuleCatalog() { ModulePath = @".\Modules" };
}
``` 

# Carga manual (sin librería dll)

_Modules.csproj_
```xml 
<ItemGroup>
    <ProjectReference Include="..\ModuleA\ModuleA.csproj" />
</ItemGroup>
``` 

En `App.xaml.cs` añadimos esto

```cs 
protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
{
    var moduleAType = typeof(ModuleAModule);
    moduleCatalog.AddModule(new ModuleInfo()
    {
        ModuleName = moduleAType.Name,
        ModuleType = moduleAType.AssemblyQualifiedName,
        InitializationMode = InitializationMode.OnDemand
    });
}
``` 

Y esto a `MainWindow.xaml.cs`

```cs 
IModuleManager _moduleManager;

public MainWindow(IModuleManager moduleManager)
{
    InitializeComponent();
    _moduleManager = moduleManager;
}

private void Button_Click(object sender, RoutedEventArgs e)
{
    _moduleManager.LoadModule("ModuleAModule");
}
``` 

# Carga mediante catalogo

Partiendo del método App.config, en lugar de  realizar la carga con new ConfigureModuleCatalog(), que entiendo que te lo crea por defecto, creamos uno propio mediante un archivo xaml con el siguiente contenido

```xml 
<m:ModuleCatalog xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                    xmlns:m="clr-namespace:Prism.Modularity;assembly=Prism.Wpf">

    <m:ModuleInfo ModuleName="ModuleAModule" 
                  ModuleType="ModuleA.ModuleAModule, ModuleA, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />

</m:ModuleCatalog>
``` 

y creando nuestra referencia al `ModuleCatalog en App.xaml.cs`

```cs 
protected override IModuleCatalog CreateModuleCatalog()
{
    return new XamlModuleCatalog(new Uri("/Modules;component/ModuleCatalog.xaml", UriKind.Relative));
}
``` 

Para asociar el contexto de estos módulos, ver [[Prism Regions|Contextos / asociación de datos en Regions]]
