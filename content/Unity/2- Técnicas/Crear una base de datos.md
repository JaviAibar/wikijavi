Hay que descargar [https://sqlite.org/download.html](https://sqlite.org/download.html) para Windows, y mete los archivos que contiene `sqlite3.def` y `sqlite3.dll` a la carpeta `Plugins` y copiar el archivo ubicado en 

```
C:\Program Files\Unity\Hub\Editor\2022.1.2f1\Editor\Data\MonoBleedingEdge\lib\mono\unityjit-win32 cambiando la versión por la que corresponda (subrayada en el enlace)
``` 

Debe quedar así

![[Pasted image 20250624222506.png]]

Lo primero es importar SQLite en el código con

```cs 
using Mono.Data.Sqlite; 
using System.Data;
``` 

Para crear una conexión con la base de datos creamos el siguiente método (más info como comentarios en el código)

```cs 
private IDbConnection CreateAndOpenDatabase() {
 	// Open a connection to the database.
        string dbUri = "URI=file:MyDatabase.sqlite"; // Aquí definimos el nombre de la base de datos, en este caso se llama "MyDatabase"
        IDbConnection dbConnection = new SqliteConnection(dbUri);
        dbConnection.Open();

        // Aquí creamos la tabla 
        IDbCommand dbCommandCreateTable = dbConnection.CreateCommand();
        dbCommandCreateTable.CommandText = "CREATE TABLE IF NOT EXISTS HitCountTableSimple (id INTEGER PRIMARY KEY, hits INTEGER )";
        dbCommandCreateTable.ExecuteReader(); // esta instrucción creo que hace efectiva la query

        return dbConnection;
}
``` 

# Bibliografía

[https://www.mongodb.com/developer/code-examples/csharp/saving-data-in-unity3d-using-sqlite/](https://www.mongodb.com/developer/code-examples/csharp/saving-data-in-unity3d-using-sqlite/)

