var jogosAntigos;
var matches = [];
var jogosEncontrados = [];

function btnGerar(){
  const M = getM();
  const P = getP();

  combinations(M, P);
  printarResultado(getJogosEncontrados());
};

function printarResultado(resultado){
  document.getElementById("areaResultado").value="";
  if(resultado.length == 0){
    document.getElementById("areaResultado").value = "Nenhuma correspondencia encontrada!"
  }
  resultado.forEach(r => {
    document.getElementById("areaResultado").value += (r + "\n");
  });
}

function preencherTextArea(valores){
  document.getElementById("area").clear;
  document.getElementById("area").value = valores;
};

function combinations(qtx, qty) {
  var inpSet = [];

  //Preencher ARRAY com so números póssiveis ex: de 1 a 25
  for(i=0;i<qtx;i++){
    inpSet[i] = i+1;
  };

  var inpLen = inpSet.length;
  var combi = [];
  
  var resultAtual = "";
  
  if(jogosAntigos == undefined)
    jogosAntigos = [];
  var recurse = function(left, right) {
    if ( right == 0 ) {
      resultAtual = combi.slice(0);
      //Ponto e que gera um resultado novo. Comparar com os jogos antigos aqui.
      var booleanArray = []; 
      for(var i=0; i<jogosAntigos.length; i++){
        var validarMatch = 0;
        booleanArray.push(compareArray(resultAtual, jogosAntigos[i], matches[i]));
      };

      if(booleanArray.every(checkIsTrue)){
        setjogosEncontrados(resultAtual);
      };
    } else {
      for (var i= left; i <= inpLen - right; i++ ) {
        combi.push( inpSet[i] );
        recurse( i + 1, right - 1 );
        combi.pop();
      };
    };
  };
  recurse(0, qty);
    
  jogosEncontrados = uniq(jogosEncontrados);
};

function compareArray(jogoAtual, jogoPassado, alvo){
  var interseccao = jogoAtual.filter(value => jogoPassado.includes(value));
  if(interseccao.length>= alvo){
    return true;
  }else{
    return false;
  };
};

function uniq(a) {
  return Array.from(new Set(a));
};

//captura o control C
document.addEventListener('paste', function (evt) {
  var areaTransferencia;
  matches = [];
  vetor2 = [];
  // clipdata = evt.clipboardData || window.clipboardData;
  clipdata = evt.clipboardData;
  areaTransferencia = clipdata.getData('text/plain');
  vetor1 = areaTransferencia.split("\n");
  vetor1.forEach(v=>{
    vetor2.push(v.split("	"));
  });
  vetor2.pop();
  preencherTextArea(areaTransferencia);
  setMatches(vetor2);
  setJogosAntigos(vetor2);
});

function getM(){
  return document.getElementById("inputM").value;
};

function getP(){
  return document.getElementById("inputP").value;
};

function getJogosAntigos(){
  return jogosAntigos;
};

function getMatches(){
  return matches;
};

function getJogosEncontrados(){
  return jogosEncontrados
};

function setMatches(valores){
  valores.forEach(v => {
    matches.push(v.pop());
  });
};

function setJogosAntigos(valores){
  for(var i=0; i<valores.length; i++){
    for(var j=0; j<valores[i].length; j++){
      valores[i][j] = parseInt(valores[i][j]); 
    }
  };
  jogosAntigos = valores;
};

function setjogosEncontrados(array){
  jogosEncontrados.push(array)
};

function checkIsTrue(boleano) {
  return boleano == true;
}