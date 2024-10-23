## No puedo cambiar el namespace a ninguna clase "code behind"

Las clases code behind son parciales, comparten implementación con el xaml, de tal forma que, el nombre de la clase y el namespace deben coincidir. Para solucionarlo, debes ir al `xaml` y cambiar `x:Class="namespace.NombreClase"` por tu nueva ruta

## Me da error en un assembly (p.e System.Windows.Media) en un servicio. En Internet dicen que añada una referencia (p.e. PresentationCore.dll) pero no sale listada

Debes incluir la etiqueta <UseWPF>true</UseWPF> en el/los proyecto/s del servicio donde deseas usar ese `assembly`. Y asegúrate que el `TargetFramework` es `net6.0-windows`:  

```xml
\<TargetFramework>net6.0-windows\</TargetFramework>
```

