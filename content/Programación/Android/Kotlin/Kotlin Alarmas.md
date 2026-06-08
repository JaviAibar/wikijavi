A partir de la API 31 (Build S, Android 12)

Permiten ejecutar un trabajo fuera del ciclo de vida de la app

pueden [poner inexactas](https://developer.android.com/develop/background-work/services/alarms?hl=es-419#inexact) (rollo para actualizaciones) y que consumen menos. O [poner exactas](https://developer.android.com/develop/background-work/services/alarms?hl=es-419#exact), que consumen mas pero se ejecutan exactamente cuando lo necesitas

# Podría interesar

Se pueden programar también [repetitivas](https://developer.android.com/develop/background-work/services/alarms?hl=es-419#inexact-repeating) 

## Crear Alarma

_voy a referirme siempre a exactas, creo que es igual para las inexactas_
Hay tres tipos

[`setExact()`](https://developer.android.com/reference/android/app/AlarmManager?hl=es-419#setExact\(int,%20long,%20android.app.PendingIntent\))

Invoca una alarma en un momento casi preciso en el futuro, siempre y cuando no estén en efecto otras medidas de ahorro de batería.

Usa este método para configurar alarmas exactas, a menos que el trabajo de tu app sea fundamental para el usuario.

[`setExactAndAllowWhileIdle()`](https://developer.android.com/reference/android/app/AlarmManager?hl=es-419#setExactAndAllowWhileIdle\(int,%20long,%20android.app.PendingIntent\))

Invoca una alarma en un momento futuro casi preciso, incluso si hay medidas de ahorro de batería vigentes.

[`setAlarmClock()`](https://developer.android.com/reference/android/app/AlarmManager?hl=es-419#setAlarmClock\(android.app.AlarmManager.AlarmClockInfo,%20android.app.PendingIntent\))

Invoca una alarma en un momento preciso en el futuro. Debido a que estas alarmas son muy visibles para los usuarios, el sistema nunca ajusta su hora de entrega. El sistema identifica estas alarmas como las más críticas y abandona los modos de bajo consumo si es necesario para emitirlas.

>[!warning] **Precaución**
 Cuando tu app programa una alarma exacta con este método, la invocación de la alarma puede afectar de manera significativa los recursos del dispositivo, como la duración de batería.

Sin embargo, esta forma (setAlarmClock) es la única que funciona con la app apagada

Si queremos cancelar la alarma, podríamos hacerlo creando un indent con el mismo id

```kotlin 
alarmManager.cancel(pendingIntent)
``` 

Y queda así

```kotlin 
fun exec (time: Long) {  
    val intent = Intent(context, AlarmReceiver::class.java)  
    val pendingIntent = PendingIntent.getBroadcast(  
        context,  
        0,  
        intent,  
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE  
    )  
  
    alarmManager.cancel(pendingIntent)  
    alarmManager.setAlarmClock(
	    AlarmManager.AlarmClockInfo(System.currentTimeMillis() + time, pendingIntent),
        pendingIntent  
    )  
  
}
``` 


>[!warning] El siguiente código falla si cierras la app

```kotlin 
val intent = Intent(context, Notificator::class.java).apply {  
    action = "MI_ALARMA"  
}

val pendingIntent = PendingIntent.getBroadcast(  
    context,  
    0, // Request code (usar constante)  Es un id
    intent,  
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE  
)


alarmManager.setExactAndAllowWhileIdle(  
    AlarmManager.RTC_WAKEUP,  
    1000,  
    pendingIntent  
)
``` 

# Tengo un problema

## canScheduleExactAlarms() es siempre false

probablemente te falta el otro permiso, aquí ambos:

```xml
<manifest ...>
	<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"/>  
	<uses-permission android:name="android.permission.USE_EXACT_ALARM" />
	<application ...>
        ...
	</application>
</manifest>
``` 

https://stackoverflow.com/questions/72698781/android-12-schedule-exact-alarm-permission-not-applied-in-new-process

No sé como funciona el tema permisos, pero creo que el de `SCHEDULE_EXACT_ALARM` lo tiene que proporcionar el usuario. Si pones el `USE_EXACT_ALARM` fuerzas que lo tenga

https://developer.android.com/develop/background-work/services/alarms?hl=es-419#exact-permission-declare

# Bibliografía

https://developer.android.com/develop/background-work/services/alarms?hl=es-419#type

