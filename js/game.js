/* VARIAVEIS DE CONTROLE DO NOSSO JOGO */

let perguntasFeitas = [];

//PERGUNTAS DO JOGO
const perguntas = [
    //pergunta 0
    {
        pergunta: 'Qual dessas linguagens não é considerada uma linguagem de programação?',
        respostas: ['PHP', 'Javascript', 'C++', 'HTML'],
        correta: 'resp3'

    },
    //pergunta 1
    {
        pergunta: 'Em que ano o Brasil foi descoberto?',
        respostas: ['1498', '1500', '1375', '1828'],
        correta: 'resp1'

    },
    //pergunta 2
    {
        pergunta: 'O que significa a sigla HTML?',
        respostas: ['Hyper Tonto Maluco Legal', 'Hyper Text Markup Language', 'Hey Trade More Language', 'Hyper Text Mark Lang'],
        correta: 'resp1'

    },
    //pergunta 3
    {
        pergunta: 'Qual dessas linguagens é considerada de marcação?',
        respostas: ['HTML', 'Javascript', 'C++', 'PHP'],
        correta: 'resp0'

    }
]

var qtdPerguntas = perguntas.length - 1;

gerarPergunta(qtdPerguntas)

function gerarPergunta(maxPerguntas) {
    //GERAR UM NUMERO ALEATORIO
    let aleatorio = (Math.random() * maxPerguntas).toFixed()
    //CONVERTER PARA NUMERO 
    aleatorio = Number(aleatorio)
    //MOSTRAR NO CONSOLE QUAL FOI A PERGUNTA SELECIONADA
    console.log('A pergunta sorteada foi a: ' + aleatorio)

    if (!perguntasFeitas.includes(aleatorio)) {
        //COLOCAR COMO PERGUNTA FEITA
        perguntasFeitas.push(aleatorio)

        //PREENCHER O HTML COM DADOS DA QUESTÃO SORTEADA
        var p_selecionada = perguntas[aleatorio].pergunta
        console.log(p_selecionada)

        //ALIMENTAR A PERGUNTA VINDA DO SORTEIO
        $('#pergunta').html(p_selecionada)
        $('#pergunta').attr('data-indice', aleatorio)

        //COLOCAR AS RESPOSTAS

        for (let i = 0; i < 4; i++) {
            $('#resp' + i).html(perguntas[aleatorio].respostas[i])
        }

        //EMBARALHAR AS RESPOSTAS

        var pai = $('#respostas')
        var botoes = pai.children()

        for (let i = 1; i < botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)))

        }
    } else {
        //SE A PERGUNTA JA FOI FEITA
        console.log('A pergunta ja foi feita. Sorteando outra...')
        if (perguntasFeitas.length < qtdPerguntas + 1) {
            return gerarPergunta(maxPerguntas)
        } else {
            console.log('Acabaram as perguntas!')

            $('#quiz').addClass('oculto')
            $('#mensagem').html('Parabéns você vemceu. Acertou todas as perguntas!')
            $('#status').removeClass('oculto')
        }
    }
}

$('.resposta').click(function () {
    if ($('#quiz').attr('data-status') !== 'travado') {
        //PERCORRE TODAS AS RESPOSTAS E DESMARCA A CLASSE SELECIONADA
        resetaBotoes()

        //ADICIONA A CLASSE SELECIONADA
        $(this).addClass('selecionada')
    }
})

$('#confirma').click(function () {
    //PEGAR O INDICE DA PERGUNTA
    var indice = $('#pergunta').attr('data-indice')

    //QUAL A RESPOSTA CERTA
    var respCerta = perguntas[indice].correta

    //QUAL A RESPOSTA QUE O USUARIO SELECIONOU
    $('.resposta').each(function () {
        if ($(this).hasClass('selecionada')) {
            var respostaEscolhida = $(this).attr('id')

            if (respCerta == respostaEscolhida) {
                console.log('Aceeeertou Miseraveeee!')
                proximaPergunta()
            } else {
                console.log('Errrrroooooou')
                $('#quiz').attr('data-status', 'travado')
                $('#confirma').addClass('oculto')
                $('#' + respCerta).addClass('correta')
                $('#' + respostaEscolhida).removeClass('selecionada')
                $('#' + respostaEscolhida).addClass('errada')
                //4 SEGUNDOS PARA DAR GAME OVER 
                setTimeout(function () {
                    gameOver()
                }, 4000)
            }
        }
    })
})

function newGame() {
    $('#confirma').removeClass('oculto')
    $('#quiz').attr('data-status', 'ok ')
    perguntasFeitas = []
    resetaBotoes()
    gerarPergunta(qtdPerguntas)
    $('#quiz').removeClass('oculto')
    $('#status').addClass('oculto')
}

function proximaPergunta() {
    resetaBotoes()
    gerarPergunta(qtdPerguntas)
}

function resetaBotoes() {
    //PERCORRE TODAS AS RESPOSTAS E DESMARCA A CLASSE SELECIONADA
    $('.resposta').each(function () {
        if ($(this).hasClass('selecionada')) {
            $(this).removeClass('selecionada')
        }
        if ($(this).hasClass('correta')) {
            $(this).removeClass('correta')
        }
        if ($(this).hasClass('errada')) {
            $(this).removeClass('errada')
        }
    })
}

function gameOver() {
    $('#quiz').addClass('oculto')
    $('mensagem').html('Game Over!')
    $('#status').removeClass('oculto')
}

$('#novoJogo').click(function () {
    newGame()
})
