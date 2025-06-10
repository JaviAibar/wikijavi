`Elemento` o `Control` es cada componente que añades a la interfaz, lo que en terminología de Unity sería un GameObject

`Los atributos` proporcionan una manera de asociar la información con el código de manera <abbr title="Programación donde se expresa el resultado y no el proceso">declarativa</abbr>. También pueden proporcionar un elemento reutilizable que se puede aplicar a diversos destinos. Son los típicos `[ObsoleteAttribute("Use NewMethod instead")]` o `[UnityTest]` o `[SerializeField]`

El código donde está la lógica y que está asociado con el XAML es conocido como "`code-behind`"

Las plantillas o Templates (si no me equivoco) son los bloques con los que compone la interfaz, existen de dos tipos:

### Control

Se trata de la clase base para los elementos de interfaz (UI)

### ControlTemplate

Especifica la estructura visual y los aspectos de comportamiento de un control que se pueden compartir entre varias instancias del control.

### DataTemplate

te permite especificar la apariencia del ==contenido== de un control
## Propiedad 

en el contexto de XAML son las características que configuras dentro de las etiquetas; 

Ejemplo:

\<Label 
	==Height="20" Content="Mi etiqueta"==
/>

en el contexto de C# la de crear ese mix entre variable y método

Ejemplo: 

```cs
public string Name {get; set;}
```

# Bibliografía
https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.control?view=windowsdesktop-8.0
https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.controltemplate?view=windowsdesktop-8.0 
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/overview/?view=netdesktop-8.0