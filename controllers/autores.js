
const jwt = require('jsonwebtoken');
const sqldb = require('../models/index');

const loginAutor = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password ) {
    return next(new Error('Informacion Inválida'));
  }
  try {
    // intentamos autenticar al usuario
    if (await sqldb.Autores.checkCredentials({ email, password })) {
      // creamos un token para el usuario
      const token = jwt.sign({ email }, process.env.PRIVATE_KEY, { expiresIn: '5 days' });
      return res.json({ token });
    }
    // usuario invalido
    return res.send(401);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};


module.exports = {
  loginAutor,
};
