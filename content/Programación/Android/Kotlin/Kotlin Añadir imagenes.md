
# Carpetas

Los archivos de imagen van en `res > drawable`. Carpeta real `PreparadorCajas\app\src\main\res\drawable`

Si fuera un fondo, en la carpeta `drawable-nodpi`, ya que eso detendrá el comportamiento de cambio de tamaño.

`mipmap` es para iconos

`values` es para strings más en 

# Importación

Parece que hay un gestor de recursos en `View > Tool Windows > Resource Manager` 

**+ (Add resources to the module) > Import Drawables**.

 Selecciona `Density > No density` en la lista desplegable **QUALIFIER TYPE**

> [!note] Y esto, por qué?
> Esto es porque hay dispositivos que tienen 160 píxeles por pulgada cuadrada y otros que adaptan 480 píxeles en el mismo espacio. Si no tienes en cuenta estas variaciones de densidad, lo que podría producir que se vean borrosas, imágenes grandes que consumen demasiada memoria o imágenes cuyo tamaño es incorrecto.
# Uso

![[Pasted image 20260128083835.png]]

```kotlin 
Image(  
    painter = painterResource(id = R.drawable.miImagen),  // miImagen es el identificador, normalmente será el nombre de archivo sin extensión
    contentDescription = label,  
    modifier = Modifier.size(100.dp, 50.dp)  
)
``` 


# Bibliografía

https://developer.android.com/codelabs/basic-android-kotlin-compose-add-images?hl=es-419#1

