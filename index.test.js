/* globals describe test expect */

const request = require('supertest');
const app = require('./index');


describe('Prueba de operacion del servidore', () => {
  test('Deberia poder obtener la raiz del servicio', (done) => {
    request(app).get('/').then((response) => {
      expect(response.text).toBe('Ok');
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
