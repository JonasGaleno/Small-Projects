
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }

        body {
            background-color: rgb(66,66,66);
            color: white;
        }

        .button{
            width: 50px;
            height: 50px;
            margin: 2px;
            background-color: gray;
            border: 1px solid rgb(2, 0, 0, 0.25);
            color: white;
            font-size: 18pt;
            cursor: pointer;
            transition: 100ms ease;
        }

        .button:hover{
            opacity: 50%;
        }

        .display{
            width: 220px;
            padding: 10px;
            font-size: 18pt;
        }

        .main{
            background-color: rgb(21,21,21);
            width: 14%;
            height: 47%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border-radius: 10px
        }

        .y{
            background-color: orange;
            transition: 100ms ease;
        }

        .y:hover{
            opacity: 50%;
        }

        .backspace{
            background-color: red;
        }

        h1{
            position: absolute;
            top: 4%;
            left: 20%;
            color: orange;
        }
    </style>
</head>
<body>

    

    <div class="main">
        <h1>Calculadora</h1>
        <form class="form" name="form">
            <input type="text" id="tela" class="display"style="text-align: right;" value="">
        </form>
    
        <table class="botao">
            <tr>
                <td><input type="button" id="zera"class="button y" name="zera" value="C" onclick="limpar()"></td>
                <td><input type="button" id="multiplicacao"class="button y" name="multiplicacao" value="*" onclick="operador('*')"></td>
                <td><input type="button" id="divisao"class="button y" name="divisao" value="/" onclick="operador('/')"></td>
                <td><input type="button" id="apaga" class="button y" name="backspace" value="<" onclick="apagar()"></td>
            </tr>
            <tr>
                <td><input type="button" id="7"class="button"name="number7" value="7" onclick="insere(7)"></td>
                <td><input type="button" id="8"class="button"name="number8" value="8" onclick="insere(8)"></td>
                <td><input type="button" id="9"class="button"name="number9" value="9" onclick="insere(9)"></td>
                <td><input type="button" id="subtracao"class="button y" name="subtracao" value="-" onclick="operador('-')"></td>
            </tr>
            <tr>
                <td><input type="button" id="4"class="button"name="number4" value="4" onclick="insere(4)"></td>
                <td><input type="button" id="5"class="button"name="number5" value="5" onclick="insere(5)"></td>
                <td><input type="button" id="6"class="button"name="number6" value="6" onclick="insere(6)"></td>
                <td><input type="button" id="soma" class="button y" name="soma" value="+" onclick="operador('+')"></td>
            </tr>
            <tr>
                <td><input type="button" id="1"class="button"name="number1" value="1" onclick="insere(1)"></td>
                <td><input type="button" id="2"class="button"name="number2" value="2" onclick="insere(2)"></td>
                <td><input type="button" id="3"class="button"name="number3" value="3" onclick="insere(3)"></td>
                <td rowspan="5"><input type="button" style="height: 106px" id="resultado"class="button y" name="resultado" value="=" onclick="resultado()"></td>
            </tr>
            <tr>
                <td colspan="2"><input type="button" style="width: 96%;" id="0"class="button"name="number0" value="0" onclick="insere(0)"></td>
                <td><input type="button" id="decimal"class="button"name="decimal" value="." onclick="insere('.')"></td>
            </tr>	
        </table>
    </div>

    <script>
        const calculadora = {
            soma: function(x,y) {return x+y},
            subtracao: function(x,y) {return x-y},
            multiplicacao: function(x,y) {return x*y},
            divisao: function(x,y) {return x/y},
        }
        const somar = calculadora.soma
        const subtrair = calculadora.subtracao
        const multiplicar = calculadora.multiplicacao
        const dividir = calculadora.divisao


        let tela = document.getElementById('tela')
        let valor = 0
        let valor1
        let result = null
        
        function insere(numero){
            if(valor == null || result != null){
                tela.value = numero
                result = null
                valor = 0
            /*}else if(operador == "-" && valor == null){
                tela.value = (-1*numero)
                operador = null*/
            }else{
                tela.value += numero
            }
            valor = +(tela.value)
        }

        function apagar (){
            tela.value = tela.value.substring(0 , tela.value.length - 1)
            result = null
            valor = +(tela.value)
        }

        function limpar (){
            tela.value = ""
            valor = null
            sinal = null
            valor1 = null
            result = null
        }

        function operador(simbolo){
            if(result != null){
                valor1 = result
            }else{
                valor1 = valor
            }
            valor = null
            sinal = simbolo
        }

        function resultado(){
            switch(sinal){
                case "+":
                    tela.value = somar(valor1,valor)
                    break;
                case "-":
                    tela.value = subtrair(valor1,valor)
                    break;
                case "*":
                    tela.value = multiplicar(valor1,valor)
                    break;
                case "/":
                    tela.value = dividir(valor1,valor)
                    break;
                default:
                    break;
            }
            sinal = null
            result = +(tela.value)
        }
    </script>



</body>
</html>