// preenchenco o conteúdo do jogo a partir do javascript
function novoElemento(tagName, className){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barreira(reversa = false){
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

//teste barreiras
/*
const b = new Barreira(false)
b.setAltura(300)
document.querySelector('[wm-flappy]').appendChild(b.elemento)
*/

//x é a posição do par de barreiras
function parBarreiras(altura, abertura, x){
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

//teste 2
/*
const b = new parBarreiras(700, 200, 400)
document.querySelector('[wm-flappy]').appendChild(b.elemento)
*/

function Barreiras(altura, largura, abertura, espaco, notificarPonto){
    this.pares = [
        new parBarreiras(altura, abertura, largura),
        new parBarreiras(altura, abertura, largura + espaco),
        new parBarreiras(altura, abertura, largura + espaco * 2),
        new parBarreiras(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            //quando o elemento sair da área do jogo
            if(par.getX() < -par.getLargura()){
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            
            const meio = largura / 2
            const cruzouMeio = par.getX() + deslocamento >= meio
                && par.getX() < meio
            if(cruzouMeio) notificarPonto()  
        })
    }
}

function Passaro(alturaJogo){
    let voando = false

    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = 'imgs/passaro.png'

    //pegando a possição do passaro, e configurando
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    //key down é quando pressiona e o up é quando solta
    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)
        //altura do jogo menos a altura do passaro é o limite do passaro
        const alturaMaxima = alturaJogo - this.elemento.clientHeight

        //configurando os limites do passaro
        if(novoY <= 0){
            //não pode ir abaixo do chao
            this.setY(0)
        }else if (novoY >= alturaMaxima){
            //nao pode ultrapassar a altura maxima
            this.setY(alturaMaxima)
        }else{
            //voando normalmente
            this.setY(novoY)
        }
    }
    this.setY(alturaJogo / 2)
}

//teste 3
/*
const barreiras  = new Barreiras(700, 1100, 200, 400)
const passaro = new Passaro(700)
const areaDoJogo = document.querySelector('[wm-flappy]')

//adicionando o passaro na area do jogo
areaDoJogo.appendChild(passaro.elemento)
//colocando os pares de barreiras
barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
//animando
setInterval(() => {
    barreiras.animar()
    passaro.animar()
}, 20)
*/

function Progresso(){
    this.elemento = novoElemento('span', 'progresso')
    this.atualizaPontos = pontos => {
        this.elemento.innerHTML = pontos
    }

    this.atualizaPontos(0)
}

function EstaoSobrepostos(elementoA, elementoB){
    //retangulo associado ao elemento A
    const a = elementoA.getBoundingClientRect()
    //retangulo associado ao elemento A
    const b = elementoB.getBoundingClientRect()

    const ladoDireitoA = a.left + a.width
    const ladoEsquerdoA = a.left
    const ladoDireitoB = b.left + b.width
    const ladoEsquerdoB = b.left

    const ladoInferiorA = a.top + a.height
    const ladoSuperiorA = a.top
    const ladoInferiorB = b.top + b.height
    const ladoSuperiorB = b.top

    //verificação de sobreposição horizontal
    const horizontal = ladoDireitoA >= ladoEsquerdoB && ladoDireitoB >= ladoEsquerdoA
    const vertical = ladoInferiorA >= ladoSuperiorB && ladoInferiorB >= ladoSuperiorA
    return horizontal && vertical
}

function Colidiu(passaro, barreiras){
    let colidiu = false
    barreiras.pares.forEach(parBarreiras => {
        if(!colidiu){
            const superior = parBarreiras.superior.elemento
            const inferior = parBarreiras.inferior.elemento
            //verificação da colisão
            colidiu = EstaoSobrepostos(passaro.elemento, superior)
                || EstaoSobrepostos(passaro.elemento, inferior)
        }
    })
    return colidiu
}

function flappyBird(){
    let pontos = 0

    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth

    const progresso = new Progresso()
    const barreiras = new Barreiras(altura, largura, 200, 400,
        () => progresso.atualizaPontos(++pontos))
    const passaro = new Passaro(altura)

    areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(passaro.elemento)
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
    
    //iniciar o jogo
    this.start = () => {
        // loop do jogo
        const temporizador = setInterval(() => {
            barreiras.animar()
            passaro.animar()

            if(Colidiu(passaro, barreiras)){
                clearInterval(temporizador)
            }
        }, 20)
    }
}

new flappyBird().start()

