
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const sqldb = require('../models/index');

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const loginAutor = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
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

const register = async (req, res, next) => {
  const { email } = req.body;
  if (!email || !validateEmail) {
    return next(new Error('Correo Inválido'));
  }
  try {
    const signUpToken = jwt.sign({ emailCheck: email }, process.env.PRIVATE_KEY, { expiresIn: '5 minutes' });
    const msg = {
      to: email,
      from: process.env.EMAILSENDER,
      subject: 'Confirmacion de correo electronico',
      text: `Para confirmar su correo debe visitar el siquiente link: \
      ${process.env.URLFRONTEND || 'http://localhost:1324/'}confirmarCorreo?signUpToken${signUpToken}`,
    };
    if (process.env.SENDGRID) { // sendgrid se encuentra configurado
      sgMail.setApiKey(process.env.SENDGRID);
      await sgMail.send(msg);
      res.send({});
    } else { // modo de pruebas o sendgrid no configurado
      const filename = `${uuidv1()}.json`;
      await fs.writeFileSync(`${__dirname}/../node_modules/${filename}`, JSON.stringify({ ...msg, signUpToken }));
      res.json({ filename });
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const confirmRegistration = async (req, res, next) => {
  const { signUpToken } = req.params;
  const { password, nombre } = req.body;
  if (!signUpToken) {
    return next(new Error('Token Invalido'));
  }
  try {
    // verificamos el token
    const { emailCheck } = jwt.verify(signUpToken, process.env.PRIVATE_KEY);
    if (!password) { // solo verificamos el token
      return res.json({ token: 'ok' });
    }
    await sqldb.Autores.create({ email: emailCheck, password, nombre });
    // send a token to automate the login after saving the password
    const token = jwt.sign({ emailCheck }, process.env.PRIVATE_KEY, { expiresIn: '5 days' });
    return res.json({ token });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};


module.exports = {
  loginAutor,
  register,
  confirmRegistration,
};
