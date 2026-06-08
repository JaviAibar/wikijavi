# La vista no se me actualiza

[[Kotlin Actualizar vista]]

# Error de memoria insuficiente

Podría ser porque no has tenido en cuenta la densidad de las imágenes en móviles antiguos

[[Kotlin Añadir imagenes#Ubicación]]

# Se ha cerrado la pestaña de proyecto (la que salen los archivos)

`Alt + 1` o `View > Tool Windows > Project

# He aplicado el tema oscuro, pero el fondo se ve blanco

Te falta el `Surface`

```kotlin 
setContent {  
    ContadorPausasTheme(dynamicColor = false){  
        Surface(  
            modifier = Modifier.fillMaxSize(),  
            color = MaterialTheme.colorScheme.background  
        ) {
        
        // Tu UI
        
        }
    }
}
``` 
# Unresolved reference \<cualquier clase, personal o importada de Android\>

Aparentemente hay una desconexión entre el sistema de compilación (Gradle) y lo que el IDE (Android Studio) tiene en su caché

Casi siempre debería arreglarse clicando en `Sync Project with Gradle Files` representado por un elefante con un flecha (en la parte superior)

![[Pasted image 20260517092525.png]]

e invalidar la caché

`File > Invalidate Caches and Restart...`

# Unresolved reference 'compose'.

Es mejor empezar de 0 de la web de dev de Android ([enlace](https://developer.android.com/develop/ui/compose/setup?hl=es-419))

> Cómo crear una app nueva compatible con Compose
> 
> Si quieres iniciar un proyecto nuevo que incluya compatibilidad con Compose de forma predeterminada, Android Studio incluye plantillas para varios proyectos que te ayudarán a comenzar. Para crear un nuevo proyecto que tenga configurado correctamente Compose, haz lo siguiente:
> 
> 1. Si te encuentras en la ventana **Welcome to Android Studio**, haz clic en **Start a new Android Studio project**. Si ya tienes abierto un proyecto de Android Studio, selecciona **File > New > New Project** en la barra de menú.
> 2. En la ventana **Select a Project Template**, elige **Empty Activity** y haz clic en **Next**.
> 3. En la ventana **Configure your project**, haz lo siguiente:
>     1. Establece los campos **Name, Package name** y **Save location** como lo harías normalmente. Ten en cuenta que, en el menú desplegable **Language**, **Kotlin** es la única opción disponible porque Jetpack Compose funciona solo con clases escritas en Kotlin.
>     2. En el menú desplegable **Minimum API level**, selecciona el nivel de API 21 o una versión posterior.
> 4. Haz clic en **Finish**.
> 
> Ya está todo listo para que comiences a desarrollar una app con Jetpack Compose. Para ayudarte a comenzar y conocer lo que puedes hacer con el kit de herramientas, sigue el [instructivo de Jetpack Compose](https://developer.android.com/develop/ui/compose/tutorial?hl=es-419).