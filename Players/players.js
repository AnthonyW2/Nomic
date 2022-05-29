/**
 * JavaScript functions used by the Players page
 * 
 * @author Anthony Wilson
 */



"use strict";

//Store a reference to the players-list element
var playerListElement;

body.addEventListener("playerload", e => {
  
  //Display the players when the players finish loading from players.json
  DisplayPlayers();
  
});


var DisplayPlayers = () => {
  
  //Get the reference to the player-list element
  playerListElement = document.getElementById("player-list");
  
  playerListElement.innerHTML = "";
  
  for(var p = 0;p < players.length;p ++){
    
    var playerLink = document.createElement("a");
    
    playerLink.href = "./?p="+p;
    playerLink.innerHTML = players[p].name;
    
    playerListElement.appendChild(playerLink);
    playerListElement.appendChild(document.createElement("br"));
    
  }
  
}
