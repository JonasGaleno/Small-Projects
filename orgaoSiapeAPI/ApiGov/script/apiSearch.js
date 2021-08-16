//requisição para a API
function enviar()

{	
	//buscando o codigo digitado
	let cod = document.getElementById("cod").value
	//debugger
	

	var requisicao = new XMLHttpRequest();	

	requisicao.addEventListener("load", main);

	//a fim de buscar pelo input é necessario fazer essa modificação "&codigo= +cod"
	requisicao.open("GET", "http://api.portaldatransparencia.gov.br/api-de-dados/orgaos-siafi?pagina=1&codigo="+ cod);	

	requisicao.setRequestHeader("chave-api-dados", "302acc16dc8bde0041b21f6ff688c204");

	requisicao.send();
}


//criando linha no html para jogar os dados
function criaLinha(consulta){
	//criando linhas no html
	let linha = document.createElement("tr")
	//criando campo de inserção de dados no html
	tdCodigo = document.createElement("td")
	tdDescricao = document.createElement("td")
	//igualando os valores dos atributos da api nos campos de dados do html
	tdCodigo.innerHTML = consulta.codigo
	tdDescricao.innerHTML = consulta.descricao
	//adicionando todo o conteudo nas linhas
	linha.appendChild(tdCodigo)
	linha.appendChild(tdDescricao)

	return linha
}


function main(){
	//transferindo a api para uma variável
	let data = this.responseText
	//Transformando de JSON para Objeto
	let consulta = JSON.parse(data)
	//adicionando os dados da api na tabela do html
	let tabela = document.getElementById("tabela")
	tabela.innerHTML = ""
	consulta.forEach(element =>{
		
		//chama função linha
		linha = criaLinha(element)
		//adiciona as linhas criadas da função na tabela
		tabela.appendChild(linha)
		console.log(consulta)
		
	});

}




