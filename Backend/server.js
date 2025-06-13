const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// DB
const db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) console.error('Error al conectar a la base de datos', err.message);
  else console.log('Conectado a SQLite');
});

// Multer config (con extensión preservada)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // conservar extensión original
    const uniqueName = crypto.randomBytes(16).toString('hex') + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Crear tabla
db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    caption TEXT,
    image_url TEXT,
    is_approved INTEGER
  )
`);

// Endpoints
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts WHERE is_approved = 1 ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST con imagen
app.post('/posts', upload.single('image'), async (req, res) => {
  const { username, caption } = req.body;
  const image = req.file;

  if (!username || !caption || !image) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  const image_url = image.filename;
  const imagePath = path.join(__dirname, 'public/images', image.filename);

    console.log('Imagen guardada en:', imagePath);
    // Enviar imagen a Flask para YOLO recuperando el 
  console.log('Enviando imagen a Flask para YOLO:', imagePath);

  try {
    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));

    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });

    const data = await response.json();
    console.log('Resultado YOLO:', data);

    const is_approved = data["is_approved"];
    
    const query = `INSERT INTO posts (username, caption, image_url, is_approved) VALUES (?, ?, ?, ?)`;
    db.run(query, [username, caption, image_url, is_approved], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, image_url, result: data, is_approved});
    });

  } catch (error) {
    console.error('Error al enviar a Flask:', error);
    res.status(500).json({ error: 'Error al procesar imagen' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
