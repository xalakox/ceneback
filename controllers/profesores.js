
const sqldb = require('../models/index');

const getAll = async (req, res, next) => {
  try {
    const profesores = await sqldb.Profesores.findAll({ attributes: ['id', 'nombre', 'apellidos'] });
    return res.json(profesores);
  } catch (err) {
    return next(err);
  }
};

const evaluateProfesor = async (req, res, next) => {
  const { profesor, calificacion } = req.body;
  if (!profesor || !calificacion || isNaN(calificacion)) {
    return next(new Error('Informacion Inválida'));
  }
  try {
    // intentamos encontrar la evaluacion, si no existe la creamos
    const [existingRecord, created] = await sqldb.Evaluaciones.findOrCreate({
      where: {
        profesor,
        autorEmail: req.author.email,
      },
      defaults: {
        calificacion,
      },
    });
    if (created) {
      return res.json({ created });
    }
    // la evaluacion ya existe, la actualizamos con el nuevo valor
    existingRecord.calificacion = calificacion;
    const updated = await existingRecord.save();
    return res.json({ updated });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const commentProfesor = async (req, res, next) => {
  const { profesor, comentario } = req.body;
  if (!profesor || !comentario || comentario.trim().length < 1) {
    return next(new Error('Informacion Invalida'));
  }
  try {
    // agregamos un comentario del usuario
    const newrecord = await sqldb.Comentarios.create({
      profesor,
      autor: req.author.email,
      comentario,
    });
    res.json({ newrecord });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};


module.exports = {
  getAll,
  evaluateProfesor,
  commentProfesor,
};
