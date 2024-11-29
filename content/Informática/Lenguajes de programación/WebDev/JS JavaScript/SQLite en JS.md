> [!Warning] Servidor
> Es obligatorio utilizar un servidor para usar una base de datos. No se puede usar vanilla JS sino un servidor como [[NodeJS]]

La base de datos en sqlite es un archivo basededatos.db, si queremos hacer drop de la base de datos, simplemente tendremos que borrar ese archivo. En [[Glitch]] se encuentra en la carpeta ./.data

Tenemos un script que se encarga de la lógica de sqlite llamado sqlite.js y tenemos un script que se encarga de la lógica del servidor llamada server.js

Desde `server.js` importamos `sqlite.js`

```js
const db = require("./src/sqlite.js");
``` 

Y aquí tenemos el contenido de `sqlite.js`

```js 
const fs = require("fs");

// Initialize the database
const dbFile = "./.data/events.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async dBase => {
    db = dBase;

    // We use try and catch blocks throughout to handle any database errors
    try {
      // The async / await syntax lets us write the db operations in a way that won't block the app
      if (!exists) {
        // Database doesn't exist yet - create Choices and Log tables
        await db.run(
          "CREATE TABLE Events (id INTEGER PRIMARY KEY AUTOINCREMENT, game_id INTEGER FOREIGN KEY, name TEXT)"
        );
        
        await db.run(
          "CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, pass TEXT)"
        );
        
        await db.run(
          "CREATE TABLE Games (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
        );
        
        await db.run(
          "CREATE TABLE Log (id INTEGER PRIMARY KEY AUTOINCREMENT, event_id INTEGER FOREIGN KEY, game_id INTEGER, time STRING)"
        );
      } else {
        // We have a database already - write Choices records to log for info
        console.log(await db.all("SELECT * from Games"));

        //If you need to remove a table from the database use this syntax
        //db.run("DROP TABLE Logs"); //will fail if the table doesn't exist
      }
    } catch (dbError) {
      console.error(dbError);
    }
  });
  ``` 

Para que los métodos de manipulación de la base de datos se pueda acceder desde lo que hemos importado en `server.js`, se debe poner en un `module.exports` y queda así (con algunos métodos útiles de ejemplo):

```js 
module.exports = {
  addTest: async () => {
    try {
     await db.run("INSERT INTO Games(name) VALUES(?)", "Juego de prueba");
    } catch (dbError) {
      console.error(dbError);
    }
  },
  removeTest: async () => {
    try {
      await db.run("DELETE FROM Games WHERE name=?", "Juego de prueba");
    } catch (dbError) {
      console.error(dbError);
    }
  },
  getLogs: async () => {
    try {
      return await db.all("SELECT * from Log ORDER BY time DESC LIMIT 20");
    } catch (dbError) {
      console.error(dbError);
    }
  },
  updateLog: async (log_id, new_value) => {
    try {
      await db.run(
        "UPDATE Log SET name = ? WHERE log_id = ?",
        new_value, log_id
      );
    } catch (dbError) {
      console.error(dbError);
    }
  },
  emptyLog: async () => {
    try {
      await db.run("DELETE from Log");
    } catch (dbError) {
      console.error(dbError);
    }
  },
};
``` 

Entonces desde `server.js` podemos hacer

```js
db.addTest()
```

o
```js 
db.updateLog(2, "Mi prueba")
``` 

# Manejo de bases de datos (SQL)

Esto se trata en la nota [[SQL]]

# Keywords
Base de datos DDBB BD BBDD DB