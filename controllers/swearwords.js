
const fs = require('fs');
const zlib = require('zlib');
const natural = require('natural');
const { PassThrough, Writable } = require('stream');
const { uniq } = require('ramda');

const dictPath = `${__dirname}/../swearwords`;
const swearWords = [];
let ready = false;
const preposiciones = 'a,ante,bajo,contra,de,desde,en,entre,hacia,hasta,para,por,según,sin,sobre,tras,durante,mediante'.split(',');
// distancia minima entre palabras para considerarlo como sinónimo
const minDistance = 0.94;

// inicia el stream para subir a memoria
const toMem = new PassThrough();
const writable = new Writable();

toMem.pipe(writable);
toMem.unpipe(writable);

// stream que guarda la lista en memoria
toMem.on('data', (chunk) => {
  swearWords.push(...chunk.toString().split('\n').map(e => e.replace('\r', '')));
});
toMem.on('end', () => {
  console.log(`.. dicionarios cargados, ${swearWords.length} palabras`);
  ready = true;
});
toMem.resume();

// obtenemos todos los diccionarios
fs
  .readdirSync(dictPath)
  .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.gz'))
  .forEach((file) => {
    console.log(`cargando ${file}`);
    // mandamos el contenido al stream memoria
    fs.createReadStream(`${dictPath}/${file}`)
      .pipe(zlib.createGunzip())
      .pipe(toMem);
  });

const isItReady = () => new Promise((resolve) => {
  const waitTimer = setInterval(() => {
    if (ready) {
      clearInterval(waitTimer);
      resolve();
    }
  }, 100);
});


const confirmaFrase = (phrase => new Promise((resolve) => {
  /*
    El algoritmo Jaro-Winkler, mide la distancia de ediciones entre dos cadenas, es una variante
    sobre la distancia Jaro (que mide la distancia minima entre dos palabras dad por el numero de
    transposiciones de caracteres para mutar de una palabra a la otra). En el caso de Jaro-Winker,
    le da preferencia o mejores ratings a palabras que coinciden al principio (mas acertado para
    lenguas romances donde la raiz de las palabras comunmente es el principo de la palabra).

    https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
  */
  const rejection = [];
  const tokenizer = new natural.RegexpTokenizer({ pattern: /[^Á-Úá-úA-Za-zА-Яа-я0-9_]+/ });
  const tokenizedString = uniq(tokenizer.tokenize(phrase) // solo elementos unicos
    .filter(e => e.length > 2) // solo palabras de mas de dos letras
    .filter(e => preposiciones.indexOf(e) < 0) // que no sean preposiciones
    .map(e => e.toLowerCase())); // en minusculas
  tokenizedString.some(
    currentWord => swearWords.some(
      (swearWord) => {
        const distance = natural.JaroWinklerDistance(
          currentWord,
          swearWord,
        );
        if (distance >= minDistance) {
          rejection.push({ currentWord, swearWord, distance });
          return true;
        }
        return false;
      },
    ),
  );
  resolve(rejection);
}));

module.exports = {
  confirmaFrase,
  swearWords,
  isItReady,
};
