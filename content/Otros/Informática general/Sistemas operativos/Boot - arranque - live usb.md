# Iniciar menú de arranque | boot menu

Ordenador de casa de mis padres (Asus): Esperar a que salga el mensaje "Acceder a BIOS con F2 o Del" (o algo parecido). Pulsar 1 vez F8

Portatil Sergio (Asus Tuf Gaming Apu): Antes de encender, mantener pulsado no recuerdo qué tecla y esperar

Portatil Javi (HP): Antes de encender, mantener pulsado ESC o cuando aparece el logo HP pulsar 1 vez o mantener

Portatil Papá (Huawei): F8 cuando sale la info de la placa base.

# Cosas a tener en cuenta crear LiveUSB

- Si usamos Rufus: elegir MBR en lugar de GPT. (esto para Windows)
    
- Desactivar el secure boot en la BIOS / UEFI
    
- Desactivar el boot rápido en BIOS / UEFI
    
- Permitir boot tanto UEFI como CSM (depende de la BIOS)

![[Pasted image 20250610140344.png]]

A Eleni no le funcionaba ninguna de estas soluciones. A ella le daban muchos BSOD y alguna pantalla y negro y demás problemas.

Al final lo solucionó quitando cosas: gráfica, tarjeta de red, ventilador secundario y cambio el monitor por uno chustero (aunque duda que fuese este último). Básicamente dejó Placa base, cpu, disipador, ram y ssd

Según mi padre, la versión 3.21 de Rufus se ha vuelto más sencilla de usar, con esta versión, al menos para instalar Linux, no hace falta hacer ningún cambio.

En ocasiones es importante que el pen esté formateado con Fat32

# bibliografía

[https://superuser.com/questions/1705044/my-pc-gets-a-blue-screen-when-booting-windows-installation-wizard-through-a-boot](https://superuser.com/questions/1705044/my-pc-gets-a-blue-screen-when-booting-windows-installation-wizard-through-a-boot) 

Eleni

Keys: LiveUSB Windows Win10 Win Win7 Win11 11 10 7 8 8.1 Ubuntu Mint Linux GNU LiveCD CD iniciar sesión sesion instalar sistema operativo pen drive fat 32