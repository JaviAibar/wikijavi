Hay 3 formas diferentes de obtener archivos para la app

- Archivos recurso: Archivos que se encuentran compilados, o bien en el ejecutable o en una librería de ensamblaje WPF y no necesitas que se actualicen
    
- Archivos de contenido: Ficheros independientes que tienen una asociación explícita con el ensamblaje de un ejecutable WPF
    
- Archivos lugar de origen: Ficheros independientes no tienen asociación con el ensamblaje de un ejecutable WPF (se copian junto con el ejecutable al compilar)

# Archivos recurso

Este tipo de archivos estarán compilados dentro del ensamblador (assembly) del ejecutable. Es la única forma de garantizar al 100% que este archivo estará disponible

Para que esto ocurra se deben seleccionar los `archivos en Visual Studio > Botón derecho > Propiedades` y marcar

- `Acción de compilación: Recurso`

![[Pasted image 20250611182854.png]]

Es necesario crear un uri [siguiendo sus reglas](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/app-development/pack-uris-in-wpf?view=netframeworkdesktop-4.8)

_MultiApp/MusicModule/Views/PlayerView.xaml_
```xml
<BitmapImage UriSource="pack://application:,,,/MusicModule;component/Icons/IconPlay.png" />
```

Desde el código se hace así, igual que antes, pero podríamos necesitar el reader concreto acorde al tipo que necesitemos cargar

```cs
Uri uriModel = new Uri(@"pack://application:,,,/Visualizer3D;component/Models3D/montserra.obj");
StreamResourceInfo info = Application.GetResourceStream(uriModel);
// Se usa el reader que corresponda al tipo de archivo que deseemos cargar
SelectedModel = _helixObjReader.Read(info.Stream);
```


# Archivos de contenido

Este tipo de archivos están distruídos de forma poco acoplada a lo largo del ensamblado del ejecutable. Aunque no están compilados en el assembly. Éste está compilado con un metadato que establece una asociación con estos archivos

Cargar estos archivos es idéntico a [[#Archivos Recurso]]

# Archivos lugar de origen

Este tipo de archivos se copiarán a la carpeta del ejecutable.

Para que esto ocurra, se deben seleccionar los archivos en Visual Studio > Botón derecho > Propiedades y marcar 

- Acción de compilación: ninguna y 
    
- Copiar en el directorio de salida: Copiar siempre


![[Pasted image 20250611182903.png]]



# Bibliografía

[https://learn.microsoft.com/en-us/dotnet/desktop/wpf/app-development/wpf-application-resource-content-and-data-files?view=netframeworkdesktop-4.8](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/app-development/wpf-application-resource-content-and-data-files?view=netframeworkdesktop-4.8)

# Keywords

Resource Content Site of Origin Files Data Source