
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const profesoresController = require('./controllers/profesores.js');
const autoresController = require('./controllers/autores.js');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

const checkAuthorToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No se recibieron las credenciales' });
  }
  try {
    const token = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString().split(':')[1];
    const { email } = jwt.verify(token, process.env.PRIVATE_KEY);
    req.author = { email };
  } catch (err) {
    return res.status(401).json({ error: 'Credenciales Invalidas' });
  }
  next();
};

// rutas publicas
app.get('/', (req, res) => res.send('Ok'));
app.post('/autores/registrar', autoresController.register);
app.get('/autores/confirmarRegistro/:signUpToken', autoresController.confirmRegistration);
app.post('/autores/confirmarRegistro/:signUpToken', autoresController.confirmRegistration);
app.post('/autores/login', autoresController.loginAutor);
app.get('/profesores', profesoresController.getAll);

// rutas con autorizacion
app.post('/profesores/evaluar', checkAuthorToken, profesoresController.evaluateProfesor);
app.post('/profesores/comentar', checkAuthorToken, profesoresController.commentProfesor);

if (require.main === module) { // modulo no esta siendo requerido, arrancando servidor
  app.listen(port, () => console.log(`Listening on port ${port}!`));
} else { // expportar servidor para pruebas
  module.exports = app;
}
