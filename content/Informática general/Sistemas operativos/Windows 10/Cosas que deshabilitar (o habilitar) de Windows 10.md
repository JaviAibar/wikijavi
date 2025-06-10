El equipo de Windows 10 activa un conjunto de configuraciones y aplicaciones que deben ser deshabilitadas por el usuario porque son absolutamente innecesarias

- Si inicias sesión en un Win10 con tu cuenta Microsoft, se van a sincronizar una serie de opciones de #@!% super molestas, en qué #@!% están pensando? Si tienes más de un ordenador con la misma cuenta (que es algo que se pasa totalmente por alto, porque no se nota, y para colmo está oculto como cerrar sesión), se empezarán a cambiar ciertas opciones porque la otra persona se está configurando el ordenar...
    

Tan solo hay que ir a Configuración, una vez allí: Opciones > Sincronizar la configuración y desactivar

Para cerrar sesión, es en el mismo sitio, pero en Tu Información, abajo y uno de los enlaces que aparecen abajo (esta #@!% de SO ahora no me deja iniciar sesión... (parece que ya no)

Ahora tienes que ir a Correo electrónico y cuentas > Click en el correo > Administrar > Eliminar esta cuenta de este dispositivo

Ejecutar la aplicación Microsoft Store > Click en la personita en gris (arriba derecha) > Click en la cuenta >  Cerrar sesión

![[Pasted image 20250610140616.png]]
![[Pasted image 20250610140620.png]]
![[Pasted image 20250610140624.png]]
- Deshabilitar el quick start, que hace que el ordenador nunca se apague del todo, qué asco me da eso, #@!%...
    

Panel de control > Opciones de energía > Elegir el comportamiento 

Ahí seleccionamos "Cambiar la configuración actualmente no disponible" y quitamos el inicio rapido

![[Pasted image 20250610140636.png]]

![[Pasted image 20250610140643.png]]
Privacidad en Windows (si es que se puede decir que vayas a tener ni un mínimo...)

1. Busca "Privacidad" en el buscador de Windows
    
2. Desactivar todo

## Desinstalar el bloatware

Una cosa que siempre debe ser activada es el visor de imagenes de Win7 en sustitución de la #@!% esa de MetroUI que es muy basura... Sencillamente hay que ejecutar [este archivo](https://drive.google.com/file/d/1zo_tp5z3gFf-mu2przRBxXglSZ3WV4P4/view?usp=sharing) en el ordenador

Eliminar el archivo Hiberfil.sys:

Abrir cmd y ejecutar 
```powershell
powercfg /h off
```

## Quitar OneDrive de Explorer 

Ir a la dirección `HKEY_CURRENT_USER\Software\Classes\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}` y cambiar `System.IsPinnedToNameSpaceTree` de `1` a `0`

![[Pasted image 20250610140814.png]]