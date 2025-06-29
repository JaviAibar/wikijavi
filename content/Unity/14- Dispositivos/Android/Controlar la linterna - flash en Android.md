Este código es completamente propiedad de [Glazunov](https://github.com/glazunov) que ha dejado esta [librería Android](https://github.com/glazunov/MyAwesomeFlashlight/blob/main/Assets/MyAwesomeFlashlight/Plugins/Android/flashlightlib-release.aar) y script C# con licencia MIT. Paquete completo disponible en su [Github](https://github.com/glazunov/MyAwesomeFlashlight/blob/main/AwesomeFlashlight.unitypackage) y en mi [Drive](https://drive.google.com/file/d/1M7Y2fFTSiSkJZW4ceIGLHnJWBZgw4884/view?usp=share_link) probado en Unity 2021.3.17f1 para minAndroidSDK=23

# Implementación C#

Importa la librería 

```cs 
javaObject = new AndroidJavaClass("com.myflashlight.flashlightlib.Flashlight");
``` 

Activa y desactiva la linterna con una llamada estática a la librería 
```cs 
javaObject.CallStatic("on", GetUnityActivity());
``` 


Pasándole, como vemos en la línea anterior, una Activity. Dicha Activity la consigue creando un objeto Clase Java (AndroidJavaClass) `"com.unity3d.player.UnityPlayer"`

Y con `GetStatic` obtiene la propiedad "`currentActivity`" de la clase android que veíamos antes

Código completo en C#:

```cs 
using UnityEngine;

public class FlashlightPlugin : MonoBehaviour
{
    public AndroidJavaClass javaObject;
    void Start()
    {
        javaObject = new AndroidJavaClass("com.myflashlight.flashlightlib.Flashlight");
    }

    public void TurnOn()
    {
        javaObject.CallStatic("on", GetUnityActivity());
    }
    
    public void TurnOff()
    {
        javaObject.CallStatic("off", GetUnityActivity());
    }
    
     AndroidJavaObject GetUnityActivity(){
         using ( var unityPlayer = new AndroidJavaClass("com.unity3d.player.UnityPlayer"))
         {
             return unityPlayer.GetStatic<AndroidJavaObject>("currentActivity");
         }
     }
}
``` 

# Implementación en Java (Parte librería)

Contiene dos métodos estáticos "on" y "off" que son los que llamabamos desde C# que reciben la Activity que le pasabamos desde C# y de la cuál obtenemos la cámara con 

```cs 
(CameraManager)activity.getSystemService("camera");
``` 

Obtiene el `ID` de la cámara y se la pasa al método `setTorchMode` de la siguiente forma:

```cs 
String cameraId = cameraManager.getCameraIdList()[0];
cameraManager.setTorchMode(cameraId, true);
``` 

El código completo aquí:

```cs 
package com.myflashlight.flashlightlib;

import android.app.Activity;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.util.Log;

public class Flashlight {
  public static Flashlight inst;
  
  public Flashlight() {
    inst = this;
  }
  
  public static void on(Activity activity) {
    CameraManager cameraManager = (CameraManager)activity.getSystemService("camera");
    try {
      String cameraId = cameraManager.getCameraIdList()[0];
      cameraManager.setTorchMode(cameraId, true);
    } catch (CameraAccessException e) {
      Log.e("flashlight", "flashLightOn: " + e.toString());
    } 
  }
  
  public static void off(Activity activity) {
    CameraManager cameraManager = (CameraManager)activity.getSystemService("camera");
    try {
      String cameraId = cameraManager.getCameraIdList()[0];
      cameraManager.setTorchMode(cameraId, false);
    } catch (CameraAccessException e) {
      Log.e("flashlight", "flashLightOff: " + e.toString());
    } 
  }
}
``` 

# Bibliografía

[https://github.com/glazunov/MyAwesomeFlashlight/blob/main/AwesomeFlashlight.unitypackage](https://github.com/glazunov/MyAwesomeFlashlight/blob/main/AwesomeFlashlight.unitypackage)

# Keywords

Flashlight Torch TorchLight

