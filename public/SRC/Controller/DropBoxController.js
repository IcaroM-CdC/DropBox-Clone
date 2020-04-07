class DropBoxController {

    constructor() {

        this.BotaoEnviarArquivo_Elemento = document.querySelector("#btn-send-file")
        this.JanelaEnviarArquivo_Elemento = document.querySelector("#files")
        this.BarraProgEnviarArquivo_Elemento = document.querySelector("#react-snackbar-root")
        this.BarraProgPorcentagemEnviarArquivo_Elemento = this.BarraProgEnviarArquivo_Elemento.querySelector(".mc-progress-bar-fg")
        this.NomeArquivo_Elemento = this.BarraProgEnviarArquivo_Elemento.querySelector(".filename")
        this.TempoRestante_Elemento = this.BarraProgEnviarArquivo_Elemento.querySelector(".timeleft")

        
        this.IniciarEventos();

    }

    IniciarEventos() {

        // ABRE A JANELA DE ADICIONAR ARQUIVOS QUANDO O BOTÃO "ENVIAR ARQUIVOS" FOR CLICADO 
        this.BotaoEnviarArquivo_Elemento.addEventListener("click", event => {

            this.JanelaEnviarArquivo_Elemento.click();

        })

        // INICIA A BARRA DE PROGRESSO APOS O ARQUIVO A SER ENVIADO FOR SELECIONADO
        this.JanelaEnviarArquivo_Elemento.addEventListener("change", event => {

            console.log(event.target.files);

            this.MostrarBarraProgresso()
            this.UploadArquivo(event.target.files);
            this.JanelaEnviarArquivo_Elemento.value = "" // ZERA O VALOR DO ARQUIVO ENVIADO PARA OUTRO PODER SER ENVIADO

        })
    }

    // METODO PARA MOSTAR E ESCONDER A BARRA DE PROGRESSO
    MostrarBarraProgresso(Mostrar = true){

        if (Mostrar == true){
            this.BarraProgEnviarArquivo_Elemento.style.display = "block" //MOSTRA A BARRA
        }

        if (Mostrar == false){
            this.BarraProgEnviarArquivo_Elemento.style.display = "none" //ESCONDE A BARRA
        }

    }

    UploadArquivo(files) {

        var Promises = [];

        // CRIA UMA PROMISE PARA CADA ARQUIVO, PARA QUE CADA UM SEJA ENVIADO ASSINCRONICAMENTE
        [...files].forEach((Arquivo) => {

            //ADICIONA PROMISES NO ARRAY DE PROMISES PARA SEREM RESOLVIDAS
            Promises.push(new Promise((Resolve, Reject) => {

                var Ajax = new XMLHttpRequest()
                Ajax.open("POST", "/upload")

                Ajax.onload = (Evento) => {

                    this.MostrarBarraProgresso(false)
                    console.log("Arquivo enviado com sucesso") 

                    try {
                        Resolve(JSON.parse(Ajax.responseText))
                    }
                    catch (Erro){

                        Reject(Erro)

                    }

                }

                Ajax.onerror = (Evento) => {

                    this.MostrarBarraProgresso(false)
                    Reject(Evento)

                }

                Ajax.upload.onprogress = (Evento) => {

                    //console.log(Evento)
                    this.ProgressoDeUpload(Evento, Arquivo);

                }

                var formData = new FormData()

                formData.append("input-files", Arquivo)
                
                this.InicioTempoUpload = Date.now()

                Ajax.send(formData)

            }))

        })
        
        // RETORNA UMA PROMISE QUE RESOLVE QUANDO TODAS AS OUTRAS DO ARRAY FOREM RESOLVIDAS
        return Promise.all(Promises)
    }

    ProgressoDeUpload(Evento, Arquivo) {
        
        var Carregado = Evento.loaded
        var TamanhoTotal = Evento.total

        var PorcentagemCarregado = parseInt((Carregado / TamanhoTotal) * 100)
        var TempoGasto = Date.now() - this.InicioTempoUpload
        var TempoRestante = parseInt(((100 - PorcentagemCarregado) * TempoGasto) / PorcentagemCarregado)

        this.BarraProgPorcentagemEnviarArquivo_Elemento.style.width = `${PorcentagemCarregado}%`
        
        this.NomeArquivo_Elemento.innerHTML = Arquivo.name
        this.TempoRestante_Elemento.innerHTML = this.FormatarTempo(TempoRestante)
        console.log(TempoGasto, TempoRestante, PorcentagemCarregado)

    }
   
    FormatarTempo(Duracao){

        var Segundos = parseInt((Duracao / 1000) % 60)
        var Minutos = parseInt((Duracao / (1000 * 60)) % 60)
        var Horas = parseInt((Duracao / (1000 * 60 * 60)) % 24)

        if (Horas > 0){
            return `${Horas} Horas, ${Minutos} Minutos, ${Segundos} Segundos`
        }

        if (Minutos > 0){
            return `${Minutos} Minutos, ${Segundos} Segundos`
        }

        if (Segundos > 0){
            return `${Segundos} Segundos`
        }

        return ""
    }

}
