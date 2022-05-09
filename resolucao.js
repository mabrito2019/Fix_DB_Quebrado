

const dadosQuebrados= require('./broken-database.json'); 

const fs = require('fs');

let bancoCerto = dadosQuebrados;

//função de coreção de letras alteradas
function updateChar(text){
const mapObj ={ 
    'æ':'a', 
    '¢':'c', 
    'ß':'b', 
    'ø':'o', 
}
    return text.replaceAll(/æ|¢|ß|ø/gi,
 function(match){   
     return mapObj[match]
})
}

//chamada da função de alteração de letras alteradas
for (var i = 0; i < bancoCerto.length; i++){
bancoCerto[i].name = updateChar(bancoCerto[i].name);
}

// converte o atribulo Price para tipo number float com duas casas decimais.

for (var i = 0; i < bancoCerto.length; i++){
    bancoCerto[i].price = parseFloat(bancoCerto[i].price).toFixed(2);
    }

//Verificador de Propriedade
let tempPrice = 0;
let tempCategory = "";

for (var i= 0; i < bancoCerto.length; i++){
if (!bancoCerto[i].hasOwnProperty('quantity')){
    //armazena temporariamente os valores das propriedades price e category
    tempPrice = bancoCerto[i].price;
    tempCategory = bancoCerto[i].category;

    //deleta  as propriedades price e category
    delete bancoCerto[i].price;
    delete bancoCerto[i].category;    

    //Cria as 3 ultimas propriedades do objeto na ordem correta com os valores corretos
    bancoCerto[i].quantity= 0;
    bancoCerto[i].price= tempPrice;
    bancoCerto[i].category= tempCategory;
}
}
const data = JSON.stringify(bancoCerto);
fs.writeFile('banco-corrigido.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});

//testes sugeridos
console.log(bancoCerto.sort(bancoCerto.name, bancoCerto.name));
