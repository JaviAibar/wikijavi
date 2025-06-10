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
