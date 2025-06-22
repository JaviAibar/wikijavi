# Recursos

Adri ha creado [estos subgraph](https://drive.google.com/file/d/1PHfL8AH4glp7nDBYBES8kSOjYw8oV2vn/view?usp=drive_link) para pillar las luces y sombras

# Materiales

Para crear un material debemos tener claros los tipos de `Shaders` y sus diferentes usos

# Configuración Shader Graph

**Depth texture** es mapa de profundidad que genera el render, y guarda en el buffer. Lo que nos permite saber la distancia de los objetos a la camara (nos devuelve un valor entre menos mucho y mucho )

**Opaque texture**: Lo que renderiza la pantalla (Scene Color) omitiendo objetos transparentes. Esto nos permite crear filtros (pantallas que rendericen lo que tienen detrás y no sea transparente (para que un sprite no sea transparente, se le tiene que poner un material `Lit` por ejemplo))

Ambos valores se pueden configurar en el archivo URP Project `Settings > Graphics > Scriptable Graphics`, haces click en el archivo y desde el Inspector podremos encontrar las casillas de Depth texture y Opaque texture que hablabamos antes

# Shaders

A parte de los `Shaders` por defecto, tenemos unos maravillosos disponibles en los diferentes [Render Pipeline](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1zuklWXbpbvuf0sPPPEyb_11t7al404tm/edit)

Para poder crear un shader personalizado editable con el Shader Graph deberemos crear un Shader propio del programa, por ejemplo: `Unlit Shader Graph` o `Lit Shader Graph`, disponibles desde `Botón derecho > Create > Shader Graph > Built in > Simple Unlit`

Al dar doble click sobre el archivo que acabamos de crear, se abrirá la ventana de Shader Graph. NOTA: para el tutorial he creado Unlit

Podremos ver esta pantalla

![[Pasted image 20250612202304.png]]

A la izquierda tenemos las variables

En el centro, el entorno de trabajo, con dos grandes bloques, `Vertex`, para tema de movimiento y `Fragment`, para tema de color y transparencia

A la derecha tenemos configuración general (`Graph Settings`) o específica del nodo que tengamos seleccionado (`Node Settings`)

Y abajo derecha la previsualización del resultado

# Nodos importantes y ejemplo

**Scene Color**: Es la textura de la renderización de la escena en cada punto dentro del objeto que lleva el shader.

![[Pasted image 20250612202353.png]]

**Scene Position**: Nos indica la posición de los píxeles en la pantalla

![[Pasted image 20250612202440.png]]

Le hemos pasado el Scene Position a Scene Color, esto lo dejará igual que estaba, ya que toma los mismos valores que ya estaban.

Ponerlo de esta forma nos permite meter entre medias algunas modificaciones.

**Normal Vector**: Nos devuelve hacia dónde mira cada polígono en el cual están dibujados los píxeles (la tangente).

**Tilling and Offset**: Nos permite repetir una textura y desplazarla en X e Y

# Nodos importantes externos

**Sub Graphs**: Se pueden crear nodos propios o importar a través de Packages. Quedarán accesibles desde el apartado Sub Graphs al crear un nuevo nodo.

![[Pasted image 20250612202516.png]]

**Lightning for Shader Graph**: Es un package que añade nuevos nodos para acceder a la información de luces y sombras de la escena.

- **Main Light**: Devuelve la dirección de la luz principal (Direction), el Color de la luz (Color), un mapa de sombras según la distancia a la luz (DistanceAtten) y un mapa de sombras arrojadas por otros objetos (ShadowAtten)
    
- **Aditional Lights**: Devuelve un mapa de color con la iluminación de todas las luces distintas a la principal en la escena (Diffuse) y un mapa de color con todos los especulares calculados (Specular)
    

**Direct Specular**: Permite calcular el brillo especular pasando la dirección y el color de la luz. Devuelve un mapa de color del reflejo.

# Keywords

sub-graph subgraf sub-graf