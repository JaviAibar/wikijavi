
# Permiso

Se añade en AndroidManifest.xml

Dentro de `<manifest>` fuera de `<application>`

```xml 
<uses-permission android:name="android.permission.VIBRATE" />
``` 

# Uso del código de abajo

```kotlin 
StaticVibrator.vibrate(this)
``` 

# Código para todas las versiones. Viene de ChatGPT

```kotlin 
package com.javi.contadorpausas  
  
import android.content.Context  
import android.os.Build  
import android.os.VibrationEffect  
import android.os.Vibrator  
import android.os.VibratorManager  
  
object StaticVibrator {  
  
    /**  
     * Realiza una vibración corta (click)     * @param context Contexto de la aplicación  
     */    fun vibrate(context: Context) {  
        try {  
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {  
                // Android 12+ (API 31+)  
                vibrateApi31AndAbove(context)  
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {  
                // Android 8.0-11 (API 26-30)  
                vibrateApi26To30(context)  
            } else {  
                // Android 7.1 y anteriores  
                vibrateLegacy(context)  
            }  
        } catch (e: Exception) {  
            // Silenciar errores de vibración  
            e.printStackTrace()  
        }  
    }  
  
    /**  
     * Vibración para API 31+ (Android 12+)     */    @androidx.annotation.RequiresApi(Build.VERSION_CODES.S)  
    private fun vibrateApi31AndAbove(context: Context) {  
        val vibratorManager = context.getSystemService(  
            Context.VIBRATOR_MANAGER_SERVICE  
        ) as VibratorManager  
        val vibrator = vibratorManager.defaultVibrator  
  
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {  
            // Android 10+ tiene EFFECT_CLICK  
            vibrator.vibrate(VibrationEffect.createPredefined(VibrationEffect.EFFECT_CLICK))  
        } else {  
            // Android 8.0-9.0  
            val effect = VibrationEffect.createOneShot(  
                50, // duración en ms  
                VibrationEffect.DEFAULT_AMPLITUDE  
            )  
            vibrator.vibrate(effect)  
        }  
    }  
  
    /**  
     * Vibración para API 26-30 (Android 8.0-11)     */    @androidx.annotation.RequiresApi(Build.VERSION_CODES.O)  
    private fun vibrateApi26To30(context: Context) {  
        val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator  
  
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {  
            // Android 10-11  
            vibrator.vibrate(VibrationEffect.createPredefined(VibrationEffect.EFFECT_CLICK))  
        } else {  
            // Android 8.0-9.0  
            val effect = VibrationEffect.createOneShot(  
                50, // duración en ms  
                VibrationEffect.DEFAULT_AMPLITUDE  
            )  
            vibrator.vibrate(effect)  
        }  
    }  
  
    /**  
     * Vibración para API < 26 (Android 7.1 y anteriores)     */    @Suppress("DEPRECATION")  
    private fun vibrateLegacy(context: Context) {  
        val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator  
        vibrator.vibrate(50) // 50ms de vibración  
    }  
  
    /**  
     * Vibración personalizada     * @param durationMillis Duración en milisegundos  
     * @param amplitude Amplitud (1-255), opcional  
     */    fun vibrate(context: Context, durationMillis: Long, amplitude: Int? = null) {  
        try {  
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {  
                vibrateCustomApi26AndAbove(context, durationMillis, amplitude)  
            } else {  
                vibrateCustomLegacy(context, durationMillis)  
            }  
        } catch (e: Exception) {  
            e.printStackTrace()  
        }  
    }  
  
    @androidx.annotation.RequiresApi(Build.VERSION_CODES.O)  
    private fun vibrateCustomApi26AndAbove(  
        context: Context,  
        durationMillis: Long,  
        amplitude: Int?  
    ) {  
        val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {  
            val vibratorManager = context.getSystemService(  
                Context.VIBRATOR_MANAGER_SERVICE  
            ) as VibratorManager  
            vibratorManager.defaultVibrator  
        } else {  
            context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator  
        }  
  
        val effect = if (amplitude != null) {  
            VibrationEffect.createOneShot(durationMillis, amplitude)  
        } else {  
            VibrationEffect.createOneShot(durationMillis, VibrationEffect.DEFAULT_AMPLITUDE)  
        }  
  
        vibrator.vibrate(effect)  
    }  
  
    @Suppress("DEPRECATION")  
    private fun vibrateCustomLegacy(context: Context, durationMillis: Long) {  
        val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator  
        vibrator.vibrate(durationMillis)  
    }  
  
    /**  
     * Verifica si el dispositivo soporta vibración     */    fun hasVibrator(context: Context): Boolean {  
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {  
            val vibratorManager = context.getSystemService(  
                Context.VIBRATOR_MANAGER_SERVICE  
            ) as VibratorManager  
            vibratorManager.defaultVibrator.hasVibrator()  
        } else {  
            val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator  
            vibrator.hasVibrator()  
        }  
    }  
  
    /**  
     * Cancela la vibración actual     */    fun cancel(context: Context) {  
        try {  
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {  
                val vibratorManager = context.getSystemService(  
                    Context.VIBRATOR_MANAGER_SERVICE  
                ) as VibratorManager  
                vibratorManager.defaultVibrator.cancel()  
            } else {  
                val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator  
                vibrator.cancel()  
            }  
        } catch (e: Exception) {  
            e.printStackTrace()  
        }  
    }  
}
``` 

