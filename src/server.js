require('dotenv').config();
const router = require('./routes/route');
const cors = require('cors');
const app = require('./api');

const db = require('./database/models');

const port = process.env.API_PORT || 8800;

app.use(cors());

app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');

  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();

});

app.use(router);

app.get('/', (_request, response) => {
  response.status(200).json({ message: 'voce esta na pagina home' });
});

app.listen(port, () => {
  console.log(`Online na porta ${port}`);
});
