const Express = require('express');
const Formidable = require("formidable")
const Router = Express.Router();

/* GET home page. */
Router.get('/', function(Requisicao, Resposta, Next) {

  Resposta.render('index', { title: 'Express' });

})

Router.post("/upload", function(Requisicao, Resposta, Next){

  var Form = new Formidable.IncomingForm({
    uploadDir: "./upload",
    keepExtensions: true
  })

  Form.parse(Requisicao, function(Erro, Fields, Arquivos) {

    Resposta.json({
      Arquivos: Arquivos
    })

  })
})

module.exports = Router;
