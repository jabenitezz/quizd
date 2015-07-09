var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
  var isearch = req.query.search;
  if (isearch!==undefined){
    console.log("Parametro de busqueda: " + isearch);
    console.log("Parametro de busqueda traducido: " + isearch.replace(/\s/g, '%') );

    
  } else {
    console.log("Parametro de busquedai: " + isearch);
    console.log("Parametro de busqueda: undefined" );
    isearch="";
    console.log("Parametro de busquedai modificado: " + isearch);
  }

    isearch="%"+isearch+"%";
  //models.Quiz.findAll().then(function(quizes) {
  models.Quiz.findAll({where: ["pregunta like ?", isearch]}).then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes});
  })
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', { quiz: quiz});
  })
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === quiz.respuesta) {
      res.render('quizes/answer', 
                 { quiz: quiz, respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', 
                 { quiz: quiz, respuesta: 'Incorrecto'});
    }
  })
};
