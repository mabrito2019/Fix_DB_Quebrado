

const dadosQuebrados= require('./broken-database.json'); 

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


for (var i = 0; i < bancoCerto.length; i++){
bancoCerto[i].name = updateChar(bancoCerto[i].name);
}

// converte o atribulo Price para tipo number float com duas casas decimais.
for (var i = 0; i < bancoCerto.length; i++){
    bancoCerto[i].price = parseFloat(bancoCerto[i].price).toFixed(2);
    }

//Verificador de Propriedade

for (var i = 0; i < bancoCerto.length; i++){
if (!bancoCerto[i].hasOwnProperty('quantity')){
    
    bancoCerto[i].quantity= 0;
    console.log(bancoCerto[i]);
}
}
console.log(bancoCerto);
