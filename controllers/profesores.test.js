/* globals describe test expect beforeAll */

const request = require('supertest');
const shell = require('shelljs');
const faker = require('faker');

const app = require('../index');
const profesores = require('../node_modules/profesores_prueba.json');
const autores = require('../node_modules/autores_prueba.json');


describe('Pruebas del controlador profesores', () => {
  test('deberia poder obtener el listado de profesores', async () => {
    await request(app).get('/profesores').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].id).toBeDefined();
    });
  });
  test('deberia poder calificar un profesor usando un autor que ya existe en la BD', async () => {
    // Obtenes el token para un usuario valido
    const { email, password } = autores[faker.random.number({ min: 0, max: (autores.length - 1) })];
    // obtenemos el token de autenticacion
    const loginResponse = await request(app).post('/autores/login').send({
      email,
      password,
    });
    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
    const { token } = loginResponse.body;

    // calificamos un profesor
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
