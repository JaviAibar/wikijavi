Existen las siguientes
+ Adición
+ Sustracción
+ Operaciones bit a bit (AND, OR, NOT, XOR)

He decidido sumar dos imágenes

```python 
img = cv2.imread("garnet_banner.jpg", cv2.IMREAD_COLOR)
img2 = cv2.imread("mine.jpg", cv2.IMREAD_COLOR)

new_img = np.zeros(img2.shape, dtype=img2.dtype)
new_img[:img.shape[0], :img.shape[1], :] = img
suma = (new_img.astype(np.uint16) + img2.astype(np.uint16))

suma = suma.astype(np.uint8)

cv2.imshow("add", suma)
cv2.waitKey(0)
cv2.destroyAllWindows()
``` 