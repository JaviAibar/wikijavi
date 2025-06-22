# Preámbulos

El pack se compone del código base y el editor

  

# Window

La ventana de edición se puede acceder desde `Window > Multilanguage`

  

# Procedimiento

Primero creamos el idioma introduciendo el código de identificación y click en `Nuevo idioma`

![[Pasted image 20250612204554.png]]

Ahora creamos un archivo para ese idioma, que será el que contenga las traducciones

Le damos un nombre descriptivo y click en `Nuevo archivo`

![[Pasted image 20250612204606.png]]

**Término** se refiere variables inteligentes. e.g: `have_{apple}_apples` -> Tengo 2 manzanas

**Sentencia** se refiere a oraciones simples. e.g: camera_speed -> Velocidad de cámara

![[Pasted image 20250612204855.png]]

Click en guardar

Y, alternativamente, guardado automático

![[Pasted image 20250612204911.png]]

Este check permite la transferencia de la carpeta de traducciones a `Streaming Assets` para que los usuarios finales puedan crear o editar los idiomas existentes

![[Pasted image 20250612204919.png]]

# Bugs

1. En la ventana de creación de términos, si clicas en la escena y vuelves, se reinicia. (para replicarlo, crear un nuevo término, click en la escena, click en la ventana Multilanguage)
    
2. Autoguardado no parece tener efecto tampoco y si se recarga la vista (Bug 1) sin haber clicado al botón Guardar, no se guarda automáticamente
    
3. Al cambiar de archivo, parece que sí ha autoguardado
    
4. Permitir al usuario generar la carpeta de traducciones dónde prefiera