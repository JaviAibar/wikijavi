# Instalación

Ahora es necesario instalarlo

![[Pasted image 20251012134933.png]]

# Ventana

![[Pasted image 20251012135031.png]]

# Crear paletas

![[Pasted image 20251012135919.png]]

Preparamos los sprites [[Unity Sprite vs Texture#Cargar los sprites con calidad|correctamente]] y podemos arrastrarlos individualmente o todo el contendor de sprites

![[Pasted image 20251012142537.png]]
# Aplicar

![[Pasted image 20251012135210.png]]

Fíjate siempre en qué capa y paletas estás trabajando

![[Pasted image 20251012140254.png]]
# Configuración

![[Pasted image 20251012135716.png]]

# Físicas

Aplicamos el componente `Tilemap Collider 2D` a la capa donde están nuestros tiles que queremos que tengan colisión

Por motivos de eficiencia, podemos añadir, además, un `Composite Collider 2D` para combinar aquellos colliders de tiles distintos que forman un mismo conjunto.

>[!warning] Para que `Composite Collider 2D` funcione, hay que activar en `Tilemap Collider 2D` la opción `Used by Composite`

Y debemos poner `BodyType` del `RigidBody 2D` en `Static`, sino, nuestros tile se caerán (literalmente)

# Aplicación inteligente de los tiles

Tal y como lo tenemos ahora, si queremos hacer una superficie grande, deberemos poner las esquinas, los bordes y rellenar, haciendo el trabajo tedioso. Podemos indicar a Unity las reglas para que aplique los bordes en los extremos y las esquinas en su lugar automáticamente

Para ello necesitamos instalar el paquete `2D Tilemap Extras`

![[Pasted image 20251012144551.png]]

Tenemos que crear un archivo de reglas `Create > 2D > Tiles > Rule Tile`



![[Pasted image 20251012144806.png]]

Creo que la imagen por defecto se usa para los centros

![[Pasted image 20251012145116.png]]

Las reglas se ordenan de arriba hacia abajo como indica la captura, primero la 1, después la 2. Es decir, en igualdad de condiciones, se aplicará la regla más superior de la jerarquía

Las X determinan que esa casilla debe estar vacía para que se aplique esta casilla. Además deberá tener rellenadas las casillas que estén marcadas con una flecha verde. En el numero 1 del ejemplo. Las casillas superior e izquierda deben estar libres mientras que abajo y derecha deben estar ocupadas por otra casilla para que se aplique la esta en cuestion (el dibujo de borde superior izquierdo)

![[Pasted image 20251012151926.png]]

# Bibliografía

[Creating Tilemaps For Your 2D Game in Unity 2021 - Tutorial @ Velvary](https://youtu.be/DTp5zi8_u1U) 
[Auto Tiling in Unity - Tilemap Rule Tiles - 2021 Tutorial @ Velvary](https://www.youtube.com/watch?v=IS_RIdYZa9M)