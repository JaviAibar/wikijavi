# Instalar

el paquete se llama 

``` 
opencv-python
``` 

para importar

```python
import cv2
``` 

# Usar Google Colab

Para poder usar OpenCV en Google Colab, aparentemente solo falta el imshow, por lo que podemos importarlo así

```python 
from google.colab.patches import cv2_imshow
``` 

y luego llamar a esta función

```python 
cv2_imshow(image)  # Display the image
``` 


# Importar (y mostrar) imagen

```python 
import cv2

img = cv2.imread("garnet.jpg", cv2.IMREAD_COLOR)

print(img) # esto muestra una matriz (de enteros)

cv2.imshow("Titulo de ventana", img) # Muestra la imagen en una ventana

cv2.waitKey(0) # Esperar a pulsar una tecla

cv2.destroyAllWindows()
``` 

> [!info] Importante
> Las imágenes se cargan como una matriz de varios canales según la etiqueta empleada

## Etiquetas de carga (flags)

| **Etiqueta**         | **Valor alternativo** | **Descripción**                                                                                  |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------ |
| **IMREAD_UNCHANGED** | -1                    | Carga la imagen tal cual, incluyendo el canal alfa (si existe). Total 4 canales (3 BGR y 1 alfa) |
| **IMREAD_GRAYSCALE** | 0                     | Carga la imagen en escala de grises (solo 1 canal)                                               |
| **IMREAD_COLOR**     | 1                     | Carga la imagen a todo color (por defecto 3 BGR) ignora el canal alfa                            |
|                      |                       |                                                                                                  |
# Guardar imagen

```python 
cv2.imwrite("nuevaImagen.png", img)
``` 

# Info básica de la imagen

## dimensiones

```python 
img.shape[:2] # tamaño de las dos primeras dimensiones (los pixeles de alto y ancho)
``` 

> [!note] Info
> Para ver cómo funciona shape de numpy [[Numpy#Shape|mirar aquí]]

# Rotar

## 90º y 180º

```python 
image = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
``` 

## Por un ángulo arbitrario

Necesitamos una matriz, que genera el cv2

Le pasamos las pixeles que mide la imagen, los [[#dimensiones|obtenemos con shape]]

```python
(filas, cols) = img.shape[:2]

matrix = cv2.getRotationMatrix2D((cols/2, filas/2), 12, 1)
imagen_rotada = cv2.warpAffine(img, matrix, (cols, filas))

cv2.imshow("Titulo de ventana", imagen_rotada)
``` 

>[!warning] Ojo!
>el método `img.shape[:2]` te da (filas, cols) -> _primero filas, luego columnas_, pero tanto a `getRotationMatrix2D` como a `warpAffine` debes pasarle (cols, filas) -> _primero columnas y luego filas_

## Redimensionar


```python 
# Dividimos los pixeles entre 2
imagen_peque = cv2.resize(img, (int(cols/2), int(filas/2)))
cv2.imshow("Imagen", imagen_peque)
``` 

```python 
# Dividimos usando un factor
imagen_peque = cv2.resize(img, None, fx=0.5, fy=0.5)
cv2.imshow("Imagen", imagen_peque)
``` 

> [!note] Nota
> El segundo argumento (como en el primer ejemplo) es para las dimensiones objetivo, en este ejemplo, como hemos usado un factor, se calculan solas, por eso el None.
> También podríamos haber puesto `(0, 0)` para que no la tenga en cuenta


```python 
# Define different scaling factors for width and height
fx = 0.88  
fy = 0.66  
 
# cv2.INTER_AREA
resized_area = cv2.resize(image, None, fx=fx, fy=fy, interpolation=cv2.INTER_AREA)
# cv2.INTER_LINEAR
resized_linear = cv2.resize(image, None, fx=fx, fy=fy, interpolation=cv2.INTER_LINEAR)
# cv2.INTER_CUBIC
resized_cubic = cv2.resize(image, None, fx=fx, fy=fy, interpolation=cv2.INTER_CUBIC)
# cv2.INTER_NEAREST
resized_nearest = cv2.resize(image, None, fx=fx, fy=fy, interpolation=cv2.INTER_NEAREST)
 
cv2.imshow("Original Image", image)
cv2.imshow("Resized with INTER_AREA", resized_area)
cv2.imshow("Resized with INTER_LINEAR", resized_linear)
cv2.imshow("Resized with INTER_CUBIC", resized_cubic)
cv2.imshow("Resized with INTER_NEAREST", resized_nearest)

cv2.waitKey(0)
cv2.destroyAllWindows()
``` 


| Method         | Description                                               | Best Used For                                                     |
| -------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| INTER_NEAREST  | Nearest-neighbor interpolation (fastest, but low quality) | Simple, fast resizing (e.g., pixel art, binary images)            |
| INTER_LINEAR   | Bilinear interpolation (default method)                   | General-purpose resizing (good balance of speed & quality)        |
| INTER_CUBIC    | Bicubic interpolation (uses 4×4 pixel neighborhood)       | High-quality upscaling, smoother results                          |
| INTER_AREA     | Resampling using pixel area relation                      | Best for **shrinking** images (avoids aliasing)                   |
| INTER_LANCZOS4 | Lanczos interpolation using 8×8 pixel neighborhood        | High-quality **upscaling & downscaling** (preserves fine details) |

# Espacios de colores

> [!note] Atento
> Por defecto OpenCV utiliza BGR


```python 
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image_hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
image_lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)

cv2.imshow("Original", image)
cv2.imshow("RGB", image_rgb)
cv2.imshow("HSV", image_hsv)
cv2.imshow("Grayscale", image_gray)
cv2.imshow("LAB (Lightness, A, B)", image_lab)
``` 

![[Pasted image 20251026173957.png]]


# Bibliografía

https://www.geeksforgeeks.org/python/getting-started-with-python-opencv/