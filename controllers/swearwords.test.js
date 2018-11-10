/* globals describe test jest expect beforeAll */

const faker = require('faker');
const swearwords = require('./swearwords');

faker.locale = 'es_MX';

describe('swearword controller', () => {
  jest.setTimeout(40e3);
  beforeAll(async () => {
    // make shure the dictionaries are loaded
    await swearwords.isItReady();
  });

  test('deberia dejar pasar un texto limpio', async () => {
    const frase = 'Es una persona sumamente profesional, enfocado a alcanzar objetivos';
    const retVal = await swearwords.confirmaFrase(frase);
    expect(retVal.length).toBeLessThan(1);
  });
  test('deberia censurar texto con una palabra explicita', async () => {
    const frase = 'Es un pendejo';
    const retVal = await swearwords.confirmaFrase(frase);
    expect(retVal.length).toBeGreaterThan(0);
  });
  test('deberia cesurar texto con una palabra similar', async () => {
    const frase = 'Es un pendejazo';
    const retVal = await swearwords.confirmaFrase(frase);
    expect(retVal.length).toBeGreaterThan(0);
  });
});
