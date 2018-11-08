/* globals describe test expect beforeAll */

const request = require('supertest');
const faker = require('faker');
const app = require('../index');
const profesores = require('../node_modules/profesores_prueba.json');
const autores = require('../node_modules/autores_prueba.json');

faker.locale = 'es_MX';
delete process.env.SENDGRID; // desactiva el envio de correos

describe('controlador autores', () => {
  const getToken = async () => {
    const { email, password } = autores[faker.random.number({ min: 0, max: (autores.length - 1) })];
    const response = await request(app).post('/autores/login').send({
      email,
      password,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    return response.body.token;
  };
  test('un autor deberia poder obtener un token de autenticacion ', async () => {
    // Obtenes el token para un usuario valido
    const token = await getToken();
    expect(token).not.toBeFalsy();
  });
  describe('usuario nuevo', () => {
    const email = faker.internet.email();
    test('un usuario deberia poder registrarse', async () => {
      const response = await request(app).post('/autores/registrar')
        .send({
          email,
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('filename');
      const msj = require(`../node_modules/${response.body.filename}`);
      expect(msj).toHaveProperty('signUpToken');

      // verificamos el token de alta de usuario
      const responseVerify = await request(app).get(`/autores/confirmarRegistro/${msj.signUpToken}`);
      expect(responseVerify.statusCode).toBe(200);

      // guardamos la contraseña para el usuario nuevo
      const password = faker.internet.password();
      const responseSave = await request(app).post(`/autores/confirmarRegistro/${msj.signUpToken}`)
        .send({
          password,
          nombre: faker.name.findName(),
        });
      expect(responseSave.statusCode).toBe(200);
      expect(responseSave.body).toHaveProperty('token');
      expect(responseSave.body.token).not.toBeFalsy();
    });
  });
  describe('usuario autenticado', () => {
    let token;
    beforeAll(async () => {
      token = await getToken();
    });
    test('deberia poder calificar a un maestro', async () => {
      const profesor = profesores[faker.random.number({ min: 0, max: (profesores.length - 1) })].id;
      const response = await request(app).post('/profesores/evaluar')
        .auth('', token)
        .send({
          profesor,
          calificacion: faker.random.number({ min: 0, max: 100 }),
        });
      expect(response.statusCode).toBe(200);
    });
  });
});
