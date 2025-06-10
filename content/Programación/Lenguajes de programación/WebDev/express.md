
## Unidad mínima

_server.js_
```js 
const express = require('express');

const app = express();

app.get('*', () => {

});

app.listen(port, () => {  
    console.log(`Server listening on port ${port}`);  
});
``` 


## peticiones html

```js 
app.get('/nombre', (req, res) => { // también post, update, delete...
	
})
``` 

## peticiones paramétricas

```js 
app.delete('/borrar-registro/:id', (req, res) => { // también post, update, delete...
	const { id } = req.params;
})
``` 


## para tratamiento de archivos

_sumado a lo ya indicado en [[#Unidad mínima]]_

_server.js_
```js 
const multer = require('multer');
const path = require('path');  // tal vez
const fs = require('fs'); // probablemente

// Configurar Multer para manejar la subida de archivos  
const storage = multer.diskStorage({  
    destination: path.join(__dirname, 'uploads'),  
    filename: (req, file, cb) => {  
        cb(null, file.originalname);  
    }  
});  
  
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // supongo que hace falta

app.post('/upload-file', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), (req, res) => {
  const { archivo, imagen } = req.files;
  const { volumen } = req.body;

  // Verifica si se proporcionó un archivo de sonido
  if (!archivo || archivo.length === 0) {
    return res.status(400).json({ message: 'No se ha proporcionado un archivo de sonido' });
  }

  // Ruta del archivo de sonido en el servidor
  const audioFilePath = path.join(__dirname, 'uploads', archivo[0].originalname);
  const audioUrl = `https://simple-sound-board-javii-backend.glitch.me/uploads/${archivo[0].originalname}`;

  // Verifica si se proporcionó una imagen
  let imageUrl = '';
  if (imagen && imagen.length > 0) {
    // Ruta del archivo de imagen en el servidor
    const imageFilePath = path.join(__dirname, 'uploads', imagen[0].originalname);
    imageUrl = `https://simple-sound-board-javii-backend.glitch.me/uploads/${imagen[0].originalname}`;

    // Puedes mover la imagen a la carpeta de subidas si lo necesitas
    fs.renameSync(imagen[0].path, imageFilePath);
  }

  // Puedes utilizar el valor de volumen como lo necesites (ej. guardarlo en la base de datos)
  const floatVolume = parseFloat(volumen);

  // Verifica si la entrada ya existe en la base de datos
  const db = new sqlite3.Database('database.db');
  db.get('SELECT * FROM audios WHERE name = ?', [archivo[0].originalname], (err, row) => {
    if (err) {
      console.error('Error checking database for existing entry:', err);
      res.status(500).json({ message: 'Error checking database for existing entry' });
      db.close();
      return;
    }

    // Si no existe, inserta los datos en la base de datos
    if (!row) {
      db.run('INSERT INTO audios (name, link, image, volume) VALUES (?, ?, ?, ?)', [archivo[0].originalname, audioUrl, imageUrl, floatVolume], (err) => {
        if (err) {
          console.error('Error inserting data into database:', err);
          res.status(500).json({ message: 'Error inserting data into database' });
        } else {
          res.json({ message: 'Archivo subido con éxito', audioUrl, imageUrl });
        }
        // Cierra la conexión a la base de datos
        db.close();
      });
    } else {
      // Si ya existe, responde indicando que el archivo ya está en la base de datos
      res.json({ message: 'El archivo ya está en la base de datos', audioUrl, imageUrl });
      // Cierra la conexión a la base de datos
      db.close();
    }
  });
});

``` 


## Adicional

Para tratamiento de cors, [[Cors|aquí]]
Para uso de bd (sqlite) [[SQLite en JS|aquí]]