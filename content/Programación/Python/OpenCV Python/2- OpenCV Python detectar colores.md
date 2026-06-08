## Detectar un color concreto

Creamos una máscara poniendo un rango del color que necesitamos, en este caso el rojo

```python
image_hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

lower_red = np.array([0, 120, 70])
upper_red = np.array([10, 255, 255])

mask = cv2.inRange(image_hsv, lower_red, upper_red)

result = cv2.bitwise_and(image, image, mask=mask)

cv2.imshow("Resultado", result)
``` 

>[!warning] Ojo!
>Gimp te muestra los valores en los siguientes rangos `H: 0 - 360`, `S: 0 - 100` y `V: 0 a 100`, mientras que OpenCV espera `H: 0 - 179`, `S: 0 - 255` y `V: 0 - 255`. Por lo que deberás ajustar los valores

```python 
image_hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

lower_amarillo = np.array([17, 0, 0])
upper_amarillo = np.array([39, 255, 255])

mask = cv2.inRange(image_hsv, lower_amarillo, upper_amarillo)

result = cv2.bitwise_and(image, image, mask=mask)
``` 

![[Pasted image 20251026181219.png]]

