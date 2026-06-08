
```python 
# Según aumentas el segundo número, más limpio el resultado
edges_1 = cv2.Canny(img, 100, 200) 
edges_2 = cv2.Canny(img, 200, 400) 

cv2.imshow("edges_1", edges_1)
cv2.imshow("edges_2", edges_2)
``` 

![[Pasted image 20251026182339.png]]
