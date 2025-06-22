Crear un batch con el siguiente contenido

```powershell
cd C:\Program Files\Unity\Hub\Editor\2021.3.17f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK\tools
adb logcat | findstr -i unity
```

Hay que ejecutar el monitor en las tools de Android

En mi caso se encuentra en 

```powershell
C:\Program Files\Unity\Hub\Editor\2022.1.2f1\Editor\Data\PlaybackEngines\AndroidPlayer\SDK\tools\monitor 
```

primera parte

```powershell
C:\Program Files\Unity\Hub\Editor\
``` 

segunda parte

```powershell
\Editor\Data\PlaybackEngines\AndroidPlayer\SDK\tools
``` 

En la parte de abajo izquierda, debería haber una pestaña llamada `LogCat`

Creamos un nuevo Filtro

![[Pasted image 20250612190203.png]]

![[Pasted image 20250612190210.png]]

