[Resto del articulo aquí](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1S96P01omU_7KyNS12pMGUxYxJSrEG3v_/edit)

Se necesita la carpeta `StreamingAssets` dentro de la carpeta Assets

Puedes listar los archivos y carpetas gracias a la siguiente línea

```cs 
FileInfo[] files = new DirectoryInfo(Application.streamingAssetsPath + $"/{path}").GetFiles();
``` 

La alternativa (que parece ser mejor incluso aunque no te arrastra los archivos que pusiste a la Build a diferencia de StreamingAssets) es usar `Resources`. Igual que `StreamingAssets`, debe haber una carpeta llamada `Resources` que cuelgue directamente de `Assets`