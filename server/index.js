const express = require('express');
const fs = require('fs/promises'); // Importar el módulo fs para trabajar con archivos
const app = express();
const port = 3007;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Consulta de Provincias</h1>
        <form action="/buscar-provincia" method="get">
          <label for="provincia">Nombre de la provincia:</label>
          <input type="text" id="provincia" name="provincia">
          <button type="submit">Buscar</button>
        </form>
      </body>
    </html>
  `);
});

app.get('/buscar-provincia', async (req, res) => {
  const provinciaNombre = req.query.provincia;

  if (!provinciaNombre) {
    return res.send('Por favor, ingrese el nombre de una provincia.');
  }

  try {
    // Leer el archivo de provincias y temperaturas
    const data = await fs.readFile('provincias.txt', 'utf8');
    const lineas = data.split('\n');
    const provinciasTemperaturas = {};

    // Parsear el archivo y almacenar las temperaturas en un objeto
    lineas.forEach((linea) => {
      const [provincia, temperatura] = linea.split(',');
      provinciasTemperaturas[provincia] = parseInt(temperatura);
    });

    // Buscar la temperatura de la provincia ingresada
    const temperatura = provinciasTemperaturas[provinciaNombre];

    if (temperatura !== undefined) {
      res.send(`
        <html>
          <body>
            <h1>Temperatura de ${provinciaNombre}</h1>
            <p>La temperatura en ${provinciaNombre} es de ${temperatura} grados Celsius.</p>
          </body>
        </html>
      `);
    } else {
      res.send(`
        <html>
          <body>
            <h1>Provincia no encontrada</h1>
            <p>No se encontró una provincia con el nombre "${provinciaNombre}".</p>
          </body>
        </html>
      `);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la temperatura de la provincia.');
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
