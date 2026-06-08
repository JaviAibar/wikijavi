Por defecto se crea automáticamente la siguiente función en `Theme.tk` en la carpeta `kotlin+java > ui.theme`, carpeta real `ContadorPausas\app\src\main\java\com\javi\contadorpausas\ui\theme\`

```kotlin 
@Composable  
fun ContadorPausasTheme(  
    darkTheme: Boolean = isSystemInDarkTheme(),  
    // Dynamic color is available on Android 12+  
    dynamicColor: Boolean = true,  
    content: @Composable () -> Unit  
) {
// ...
}
``` 

Esto es un wraper de toda la UI, es decir, debe ser la raíz de tu UI

```kotlin 
setContent {  
    ContadorPausasTheme(dynamicColor = false){
    // La UI
    
    }
}
``` 

Pero falta una cosa, ==necesitamos== `Surface` para que el fondo sea del color que toque 🤷‍♂️

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

