

const dadosQuebrados = require('./broken-database.json');

const fs = require('fs');
const { totalmem, type } = require('os');

let bancoCerto = dadosQuebrados;

//função de coreção de letras alteradas
function updateChar(text) {
  const mapObj = {
    'æ': 'a',
    '¢': 'c',
    'ß': 'b',
    'ø': 'o',
  }
  return text.replaceAll(/æ|¢|ß|ø/gi,
    function (match) {
      return mapObj[match]
    })
}

//chamada da função de alteração de letras alteradas
for (var i = 0; i < bancoCerto.length; i++) {
  bancoCerto[i].name = updateChar(bancoCerto[i].name);
}

// converte o atribulo Price para tipo number float.
for (var i = 0; i < bancoCerto.length; i++) {
  bancoCerto[i].price = parseFloat(bancoCerto[i].price);
}

//Verifica se o objeto tem a propriedade "quantity" e se não tiver adiciona no lugar certo.
let tempPrice = 0;
let tempCategory = "";

for (var i = 0; i < bancoCerto.length; i++) {
  if (!bancoCerto[i].hasOwnProperty('quantity')) {
    //armazena temporariamente os valores das propriedades price e category
    tempPrice = bancoCerto[i].price;
    tempCategory = bancoCerto[i].category;

    //deleta  as propriedades price e category
    delete bancoCerto[i].price;
    delete bancoCerto[i].category;

    //Cria as 3 ultimas propriedades do objeto na ordem correta com os valores corretos
    bancoCerto[i].quantity = 0;
    bancoCerto[i].price = tempPrice;
    bancoCerto[i].category = tempCategory;
  }
}

//Exporta o Banco de dados corrigido para um novo arquivo.JSON com o nome "saida.json" na pasta de execução da "resolução.js"
const data = JSON.stringify(bancoCerto);
fs.writeFile('saida.json', data, (err) => {
  if (err) {
    throw err;
  }
  console.log("JSON data is saved.");
});

//Funções de validação a baixo
//organiza em ordem alfabetica o objeto corrigido baseado na propriedade "category"
let ordemAlfa = bancoCerto;
ordemAlfa.sort(function (a, b) {
  if (a.category > b.category) {
    return 1;
  }
  else if (a.category < b.category) {
    return -1;
  } else {
    return 0;
  }
});

//organizando em ordem Crescente baseado na propriedade "id" respeitando a ordem da propriedade "category"
ordemAlfa.sort(function (a, b) {
  if (a.category == b.category & a.id > b.id) {
    return 1;
  } else if (a.category == b.category & a.id < b.id) {
    return -1;
  } else {
    return 0;
  }
});

//imprime a lista com todos os nomes dos produtos, ordenados primeiro por "categoria" em ordem alfabética e depois por "id" em ordem crescente.
for (i = 0; i < ordemAlfa.length; i++) {
  console.log(i + 1, "-", ordemAlfa[i].category, "-", ordemAlfa[i].id, "-", ordemAlfa[i].name)
};

//Cria Propriedades dentro do array do objeto "total" baseado na tabela de dados, sem repetir o nome.
let total = new Object();
for (i = 0; i < bancoCerto.length; i++) {
  //se a categoria ainda não existe, aqui é criado uma propriedade com o nome da categoria.
  if (!total.hasOwnProperty(bancoCerto[i].category)) {
    if (bancoCerto[i].price != 0) {
      total[bancoCerto[i].category] = bancoCerto[i].price * bancoCerto[i].quantity;
    }

    //se o atributo já existe aqui é somado com o valor já armazenado.
  } else if (total.hasOwnProperty(bancoCerto[i].category)) {
    if (bancoCerto[i].price != 0) {
      total[bancoCerto[i].category] += bancoCerto[i].price * bancoCerto[i].quantity;
    }
  }
}
//Exibe qual é o valor total do estoque por categoria
console.log("\n", "Valor Total dos Produtos separados por estoque é:\n",
  "Acessórios: R$", parseFloat(total.Acessórios).toFixed(2), "\n",
  "Eletrodomésticos: R$", parseFloat(total.Eletrodomésticos).toFixed(2), "\n",
  "Eletrônicos: R$", parseFloat(total.Eletrônicos).toFixed(2), "\n",
  "Panelas: R$", parseFloat(total.Panelas).toFixed(2), "\n");