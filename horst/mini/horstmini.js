function runHorst(){
    var text = document.getElementById("horstIn").value;
    var divvv = document.getElementById('output');
var variables = {};
const keywords = ['schreib', 'var']

variables["pi"] = Math.PI;
variables["e"] = Math.E;
 var i;
var words;
var interpret = function(text){
  words = text.split(' ');
  for(i = 0; i < words.length; i++){
    var word = words[i];

    if(word == 'schreib'){
      var ress = getString();
      divvv.innerHTML += "> " + text + "<br>" + ress + "<br>"
    } else if(word == 'var'){
      i++
      variables[`${words[i]}`] = getString();
    } 
  }
}
var getString = function(){
  i++
  var string = "";
  while(i < words.length){
    if(words[i] == 'schreib'){
      i--;
      return string;
    } 
    if(words[i] == 'calc'){
      string += calc();
      i--;
      return string;
    } else{
      string += (variables[`${words[i]}`] || words[i]) + ' ';
    }
    i++
  }
  return string;
}

function getStringQuiet(i, words){
  i++
  var string = "";
  while(i < words.length){
    if(keywords.includes(words[i])){
      i--;
      return string;
    } 
    if(words[i] == 'calc'){
      string += calcQuiet(i, words) + ' ';
    } else{
      string += (variables[`${words[i]}`] || words[i]) + ' ';
    }
    i++
  }
  return string;
}

function calcQuiet(i, words){
  i++
  var number = "";
  while(i < words.length){
    if(keywords.includes(words[i])){
      return eval(number) || '';
    } else if(words[i] == 'calc'){ 
      number+= calcQuuet(i, words);
    }
    number += (variables[`${words[i]}`] || words[i]) || '';
    //console.log(variables[`${words[i]}`] || words[i])
    i++
  }
  //console.log(number)
  return eval(number);
}

function calc(){
  i++
  var number = "";
  while(i < words.length){
    if(keywords.includes(words[i])){
      return eval(number) || '';
    } else if(words[i] == 'calc'){ 
      number+= calc();
    }
    //console.log(words[i])
    number += (variables[`${words[i]}`] || words[i]) || '';
    //console.log(variables[`${words[i]}`] || words[i])
    i++
  }
  //console.log(number)
  return eval(number);
}
interpret(text);
}