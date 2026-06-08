
```python 
import json
``` 

## Texto a Json

```python 
json_string =  '{ "name":"John", "age":30, "city":"New York"}'  
  
# parse x:  
json_obj = json.loads(json_string)  
  
# the result is a Python dictionary:  
print(json_obj["age"])
``` 

> [!note] Fíjate
> El objeto que obtienes con `json.loads` es un [[Python Arrays, matrices, listas y diccionarios#Diccionario|diccionario]]
## Python a Json

```python 
# a Python object (dict):  
json_obj = {  
  "name": "John",  
  "age": 30,  
  "city": "New York"  
}  
  
# convert into JSON:  
y = json.dumps(json_obj, ensure_ascii=False) # para que no convierta las tildes en mamarracho  
  
# the result is a JSON string:  
print(y)
``` 

