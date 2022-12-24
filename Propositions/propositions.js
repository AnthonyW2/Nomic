/**
 * JavaScript functions used by the Propositions page
 * 
 * @author Anthony Wilson
 */



"use strict";

//Store a reference to the proposition-list element
var propositionListElement;

body.addEventListener("propositionload", e => {
  
  //Display the propositions when the propositions & players finish loading
  DisplayPropositions();
  
});

body.addEventListener("playerload", e => {
  
  //Display the propositions when the propositions & players finish loading
  DisplayPropositions();
  
  
  var authorSelector = document.getElementById("parser-author-selector");
  
  for(var p = 0;p < players.length;p ++){
    
    var option = document.createElement("option");
    option.value = p;
    option.innerHTML = players[p].name;
    
    authorSelector.appendChild(option);
    
  }
  
});


var DisplayPropositions = () => {
  
  if(!players || !propositions){
    return;
  }
  
  //Get the reference to the player-list element
  propositionListElement = document.getElementById("proposition-list");
  
  propositionListElement.innerHTML = "";
  
  for(var p = 0;p < propositions.length;p ++){
    
    var propositionElement = document.createElement("div");
    
    var dateStr = new Date(propositions[p].timestamp*1000).toUTCString();
    var voteStr = "<img src=\"../Resources/upvote.png\" alt=\"UP\" class=\"vote-icon\"> "+propositions[p].votes[0].length;
    var voteStr = VoteIcon(0,propositions[p].votes[0].length)+" "+VoteIcon(1,propositions[p].votes[1].length)+" "+VoteIcon(2,propositions[p].votes[2].length)+" "+VoteIcon(3,propositions[p].votes[3].length);
    
    propositionElement.classList.add("proposition");
    propositionElement.id = "proposition-"+p;
    propositionElement.innerHTML = "#"+p+" - <b>"+players[propositions[p].author].name+"</b> - "+dateStr+"<br>";
    propositionElement.innerHTML += voteStr;
    propositionElement.innerHTML += " - <a href=\"" + propositions[p].link + "\" target=\"_blank\">"+(propositions[p].majority ? "Majority Reached" : "Awaiting Votes")+"</a><br><br>";
    propositionElement.innerHTML += propositions[p].content.replaceAll("\n","<br>\n");
    
    propositionListElement.insertBefore(propositionElement, propositionListElement.children[0]);
    
  }
  
}


var ParseProposition = () => {
  
  var inputType = document.getElementById("parser-input-type-selector").value;
  
  var propositionText = "";
  
  if(inputType == "existing"){
    
    var ID = parseInt(document.getElementById("proposition-parse-ID-input").value, 10);
    propositionText = propositions[ID].content;
    
    document.getElementById("parser-author-selector").value = propositions[ID].author;
    
  }else{
    
    propositionText = document.getElementById("proposition-parse-text-input").value;
    
  }
    
  var modifications = parse(propositionText);
  
  //Update the JSON output
  document.getElementById("proposition-parse-JSON-output").value = JSON.stringify(modifications, null, 2);
  
  //Update the human-readable output
  var output = document.getElementById("parser-HR-output");
  output.innerHTML = "";
  
  for(var m = 0;m < modifications.length;m ++){
    
    var mod = modifications[m];
    
    output.innerHTML += "<b>"+mod.type+"</b><br>";
    output.innerHTML += "<span class=\"discord-quote-indent\"></span><i>"+mod.path+"</i><br>";
    output.innerHTML += (mod.content != undefined ? mod.content.replaceAll("\n","<br>\n")+"<br>" : "")+"<br>";
    
  }
  
}

var ApplyToTree = () => {
  
  var author = parseInt( document.getElementById("parser-author-selector").value, 10);
  var timestamp = parseInt( document.getElementById("parser-timestamp-input").value, 10);
  var data = {
    author: author,
    timestamp: timestamp
  };
  
  var modString = document.getElementById("proposition-parse-JSON-output").value;
  if(modString == ""){
    document.getElementById("proposition-parse-rule-output").value = JSON.stringify(rawRules, null, 2);
    return;
  }
  var modifications = JSON.parse(modString);
  
  console.log(modifications);
  
  var newRules = modifyRuleTree(modifications, data, rawRules, false).getRaw();
  
  console.log(newRules);
  
  document.getElementById("proposition-parse-rule-output").value = JSON.stringify(newRules, null, 2);
  
}

var UpdateInputType = () => {
  
  var type = document.getElementById("parser-input-type-selector").value;
  
  if(type == "existing"){
    
    document.getElementById("parser-existing-input").hidden = false;
    document.getElementById("parser-custom-input").hidden = true;
    
  }else{
    
    document.getElementById("parser-existing-input").hidden = true;
    document.getElementById("parser-custom-input").hidden = false;
    
  }
  
}

var UpdateOutputType = () => {
  
  var type = document.getElementById("parser-output-type-selector").value;
  
  if(type == "json"){
    
    document.getElementById("parser-JSON-output").hidden = false;
    document.getElementById("parser-HR-output").hidden = true;
    
  }else{
    
    document.getElementById("parser-JSON-output").hidden = true;
    document.getElementById("parser-HR-output").hidden = false;
    
  }
  
}

var FixSelectors = () => {
  
  document.getElementById("parser-input-type-selector").value = "existing";
  document.getElementById("parser-output-type-selector").value = "json";
  
}
