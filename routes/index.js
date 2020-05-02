const Express = require('express');
const Formidable = require("formidable")
const Router = Express.Router();
const FileSystem = require("fs")

/* GET home page. */
Router.get('/', function(Requisicao, Resposta, Next) {

    Resposta.render('index', { title: 'Express' });               

})

Router.get('/login', function(Requisicao, Resposta, Next) {

    Resposta.render('login', { title: 'Express' });   

})

Router.post("/upload", function(Requisicao, Resposta, Next) {

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

Router.get("/arquivos", function(Requisicao, Resposta, Next) {

    var Path = "./" + Requisicao.query.path

    if (FileSystem.existsSync(Path)) {

        FileSystem.readFile(Path, (Erro, Arquivo) => {

            if (Erro) {

                console.error
                Resposta.status(400).json({
                    
                    error: Erro
                
                })
            } 

            else {
                Resposta.status(200).end(Arquivo)
            }
        })

    } 

    else { Resposta.status(404).json({  Erro: "Arquivo não encontrado"  })}

})

Router.delete("/arquivos", function(Requisicao, Resposta, Next) {
    
    var Form = new Formidable.IncomingForm({
        uploadDir: "./upload",
        keepExtensions: true
    })

    Form.parse(Requisicao, function(Erro, Fields, Arquivos) {

        var Path = "./" + Fields.path

        if (FileSystem.existsSync(Path)) {

            FileSystem.unlink(Path, Erro => {
            
                if (Erro) {  Resposta.status(400).json({Erro})  }
        
            })
        } 
    
        else {

            Resposta.json({  Fields: Fields  })
        }
    })
})

module.exports = Router;
