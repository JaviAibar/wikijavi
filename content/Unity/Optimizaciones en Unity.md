# Consejos de Toptal

## UpdateLoops

Cachear calculos y las operaciones costosas posibles en Awake en lugar de Update, por ejemplo para cachearlas y no tengas que repetirlas

## Instanciación

Crear una pool de prefabs para poder reutilizarlos. Especialmente para prefabs muy pesados

## Renderizado

LOD u Occlusion Culling. Optimización de modelos (polígonos, normales (hard edges), coordenadas UV o vértices de color). Limitar luces dinámicas, intenta bakear todo lo posible.

## Llamadas a Dibujado

Static Batching (procesamiento estático) para objetos inmóviles (paredes, suelos, rocas, árboles...) y dinámico para el resto. Para ello, primero hace falta preparar la escena (los objetos que van en lote (batch) deben compartir materiales). Y el dinámico solo se puede usar con modelos lowpoly.

You may need to create an atlas from a texture to be able to share one material between distinct objects. A good [tip](https://www.toptal.com/unity-unity3d/tips-and-practices) is to use higher resolution scene lightmap textures (not generated resolution, but texture output resolution) to lower the texture total when you are baking light in a larger environment.

## Problemas de sobredibujado

Limita el uso de texturas transparentes porque causan problemas de ratio de rellenado. Sin embargo son un buen recurso para renderizar objetos geométricos en la lejanía, p.e. árboles o arbustos

Para aplicar una textura transparente, favorece los shaders con mezcla alfa (alpha-blended)  sobre aquellos con prueba alfa (alpha testing) o shaders de recorte (cutout) para plataformas móviles.

## Shaders

Optimiza tus shaders reduciendo el numero de pases usando variables de baja precision y sustituyendo complicados cálculos matemáticos por texturas pregeneradas

# Consejos del vídeo de [Profiling (sobre este tema se puede leer en esta página)](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1kWCac4hCNW-5D1MYLnmG4BG5ycSqBMSr/edit)

## Object Pooling

Instanciar y destruir GameObjects es muy costoso. Es mejor utilizar Object Pooling. Para un ejemplo de Object Pooling ir a esta página

## Nada es gratis

Los GameObjects vacíos, las cámaras que no renderizan o los scripts MonoBehaviour sin Update también tienen un impacto en el rendimiento

## Dividir la carga de trabajo entre diferentes frames

Si tienes que hacer un calculo complejo como un pathfinding o algo así, puedes hacer calculos intermedios para dividir la carga en varios frames

Otro ejemplo sería dividir una escena grande en escenas más pequeñas e ir cargandolas según sea necesario

# Bibliografía

[https://www.toptal.com/unity-unity3d/top-unity-development-mistakes](https://www.toptal.com/unity-unity3d/top-unity-development-mistakes) 

[7 Ways to Optimize your Unity Project with URP @Unity](https://www.youtube.com/watch?v=NFBr21V0zvU)

# Keywords

Optimization Performance Rendimiento Eficiencia Eficiente Óptimo Optimo Optimización