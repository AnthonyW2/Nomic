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
    propositionElement.innerHTML = "<b>"+players[propositions[p].author].name+"</b> - "+dateStr+"<br>";
    propositionElement.innerHTML += voteStr;
    propositionElement.innerHTML += " - "+(propositions[p].majority ? "Majority Reached" : "Awaiting Votes")+"<br><br>";
    propositionElement.innerHTML += "Content: "+propositions[p].content.replaceAll("\n","<br>\n");
    
    propositionListElement.appendChild(propositionElement);
    
  }
  
}
