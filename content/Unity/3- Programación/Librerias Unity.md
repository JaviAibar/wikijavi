Ir a la web de la librería en NuGet y descargar manualmente

![[Pasted image 20250624222237.png]]

Le cambiamos la extensión de .nupkg a .zip

Así podremos acceder a sus dulces, dulces librerías

## En Visual Studio

Ver > Explorador de soluciones

En el explorador de soluciones: Hacemos click derecho en Referencias y Agregar Referencia

- En caso de que no esté "Agregar referencia" que es lo más probable:
    

- Lo más seguro es que haya que instalar Desarrollo de escritorio de .NET
    
- Otra posible solución es cambiar en Unity el target de .Net en PlayerSettings > Other settings > Configuration > Api Compatibility Level a .NET 4.x

![[Pasted image 20250624222252.png]]

Espero que ahora esté lo de Agregar referencia T-T. Si no, tocará buscar en Google...

Agregar referencia > Examinar... y seleccionas la librería

## En Unity

Bajo la carpeta Assets, hay que crear una carpeta llamada "Plugins" (imprescindible que se llame así)

Dentro de esa carpeta se arrastran las librerias y ya

![[Pasted image 20250624222300.png]]

## Referencias

[https://docs.microsoft.com/en-us/visualstudio/gamedev/unity/unity-scripting-upgrade](https://docs.microsoft.com/en-us/visualstudio/gamedev/unity/unity-scripting-upgrade)

[https://stackoverflow.com/questions/56231655/cant-add-reference-in-visual-studio-2019](https://stackoverflow.com/questions/56231655/cant-add-reference-in-visual-studio-2019)

Por lo que creo que hay que instalar las herramientas de Visual Studio: "Inside the Visual Studio Installer enable MS Build Tools and VC++ 2019 v16.00 (v160) toolset for desktop. " [https://github.com/mozilla/DeepSpeech/blob/master/native_client/dotnet/README.rst](https://github.com/mozilla/DeepSpeech/blob/master/native_client/dotnet/README.rst)