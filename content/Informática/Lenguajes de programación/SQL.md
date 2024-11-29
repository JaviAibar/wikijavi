Para ver cómo funciona SQLite en JS ve a [[SQLite en JS|esta nota]]

# Crear / Create table

```sql
CREATE TABLE Ingredients (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, name TEXT, image TEXT)
``` 

https://www.w3schools.com/sql/sql_create_table.asp

# Seleccionar / Select

```sql
SELECT * from Ingredients
```

https://www.w3schools.com/sql/sql_select.asp

# Añadir / Insert into

```sql
INSERT INTO table_name (column1, column2, column3, ...)  
VALUES (value1, value2, value3, ...);
```

Si estás añadiendo para todas las columnas, no tienes que especificarlas. Pero evidentemente se tienes que añadirlas en el orden en que están dispuestas las columnas!!

```sql
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```
# Actualizar / Update

SQLite

```sql
UPDATE Ingredients SET date = ? WHERE id = ?
```

```sql
UPDATE Ingredients  
SET column1 = value1, column2 = value2, ...  
WHERE id = ?;
```

https://www.w3schools.com/sql/sql_update.asp

# Borrar / Delete

```sql
DELETE FROM table_name WHERE _condition_;
```

# Joins

¿Por qué los ejemplos que salen de LEFT y RIGHT JOIN no son lo mismo que hacer sencillamente `SELECT * FROM A` o `SELECT * FROM B` respectivamente?

Porque añade la info que hay en B

Mejor poner un ejemplo ilustrativo

A = Personas

| Nombre | Edad |
| ------ | ---- |
| Juan   | 45   |
| Luisa  | 32   |


B = Localidades

| Nombre   |
| -------- |
| Valencia |

Juan vive en Valencia, pero Luisa no tiene asignada una localidad

En el resultado al hacer `A LEFT JOIN B` el resultado sería

| Nombre | Edad | Localidad |
| ------ | ---- | --------- |
| Juan   | 45   | Valencia  |
| Luisa  | 32   |           |
Si este mismo ejemplo fuera `INNER JOIN` daría el siguiente resultado

| Nombre | Edad | Localidad |
| ------ | ---- | --------- |
| Juan   | 45   | Valencia  |

![[Pasted image 20241129142506.png]]
# Bibliografía

https://www.w3schools.com/sql/

Eleni