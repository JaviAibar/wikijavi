1. Configurar el DHCP para que siempre te de la misma ip local para tu mac

2. En el router de PTV está en Local Network > LAN > DHCP Binding

3. Dirigir las peticiones que lleguen a nuestra ip pública (la que dirige a nuestro router) al ordenador con el servidor de minecraft

Router PTV

1. En el router de PTV está en Internet > Security > Port Forwarding

Router ZTE F680

1. Application > UPnP -> Hay que habilitar el UPnP (en el mío venía por defecto)

2. Application > Application List -> Add an application

3. Application > PortForwarding (Application List)

 Abrir el puerto en el firewall

4. Si no se abre el puerto (se puede comprobar con netstate -an en windows)

5. Comprueba que el servidor está iniciado

6. Recuerda que el puerto de por si no escucha, si no que lo hace la aplicación, esta debe estar escuchando a través del puerto seleccionado

7. Para comprobar definitivamente que el puerto está abierto, probarlo desde esta web: [https://www.yougetsignal.com/tools/open-ports/](https://www.yougetsignal.com/tools/open-ports/)


## Bibliografía:

- [https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)
    
- [https://superuser.com/questions/396002/how-to-get-a-port-to-listen-on-windows-7](https://superuser.com/questions/396002/how-to-get-a-port-to-listen-on-windows-7)
    

[https://www.yougetsignal.com/tools/open-ports/](https://www.yougetsignal.com/tools/open-ports/)