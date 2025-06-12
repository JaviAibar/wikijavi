Esta entrada trata el caso concreto del proyecto de animación 4 de la asignatura ADV (Animation and Design of Videogames). Podría no aplicar a diferentes situaciones

La cosa comienza con que me descargué de la Unity Store un Character ya riggeado y con animaciones ya hechas, pero traía 2 problemas:

1. Las animaciones no incluyen root motion, eso quiere decir, que el movimiento es estático, es decir, se mueven los pies, pero el personaje queda en la misma posición
    
2. El nombre de los huesos no coincide con el establecido por mixamo
    

Para evitar problemas con que las animaciones no tengan root motion, se han descargado animaciones de mixamo, de ahí el segundo problema, que no funciona directamente

Para hacerlo funcionar hay que tener en cuenta y llevar a cabo las siguientes acciones y comprobaciones (para hacerlo más cómodo, me referiré a los Characters como Unity, porque de ahí los descargué, y a las animaciones como Mixamo, por la misma razón)

![[Pasted image 20250612181144.png]]

1. Se ha añadido a la escena el **prefab** de Character Unity y se ha arrastrado dicho prefab **NO el root** al timeline

![[Pasted image 20250612181226.png]]

2. Se debe ir al Avatar (no prefab) del Character Unity y debe poner **Humanoid y Create From This Model**

3. Entrar en **Configure** y revisar que todo esté en verde, en T-Pose

4. Aunque parezca antiintuitivo, la Animación Mixamo se debe poner con su propio **Avatar y NO usar el de Character Unity**. i.e. Clicar en el pack de la Animación Mixamo y seleccionar Humanoid y **Create From This Model !!**

![[Pasted image 20250612181257.png]]

Y si no me equivoco, ya debería funcionar la Animación Mixamo