/**
 * JavaScript functions used by the Players page
 * 
 * @author Anthony Wilson
 */



"use strict";

//Store a reference to the players-list element
var activePlayerListElement;
var inactivePlayerListElement;
var quitPlayerListElement;

body.addEventListener("playerload", e => {
  
  //Display the players when the players finish loading from players.json
  DisplayPlayers();
  
});


var DisplayPlayers = () => {
  
  //Get the reference to the player-list element
  activePlayerListElement = document.getElementById("active-player-list");
  inactivePlayerListElement = document.getElementById("inactive-player-list");
  quitPlayerListElement = document.getElementById("quit-player-list");
  
  activePlayerListElement.innerHTML = "";
  inactivePlayerListElement.innerHTML = "";
  quitPlayerListElement.innerHTML = "";
  
  for(var p = 0;p < players.length;p ++){
    
    if(players[p].active && players[p].playing){
      activePlayerListElement.appendChild(displayPlayerInfo(players[p]));
      //activePlayerListElement.appendChild(document.createElement("br"));
    }else if(!players[p].active && players[p].playing){
      inactivePlayerListElement.appendChild(displayPlayerInfo(players[p]));
      //inactivePlayerListElement.appendChild(document.createElement("br"));
    }else{
      quitPlayerListElement.appendChild(displayPlayerInfo(players[p]));
      //quitPlayerListElement.appendChild(document.createElement("br"));
    }
    
  }
  
}


var displayPlayerInfo = (player) => {
  
  var playerBlock = document.createElement("div");
  playerBlock.classList.add("player-list-block");
  
  var playerLink = document.createElement("a");
    
  playerLink.href = "./?p="+player.PID;
  playerLink.innerHTML = player.name;
  
  playerBlock.appendChild(playerLink);
  
  playerBlock.appendChild(displayMice(player));
  
  return playerBlock;
  
}


var displayMice = (player) => {
  
  var miceContainer = document.createElement("div");
  miceContainer.classList.add("player-mice-container");
  
  miceContainer.innerHTML = "Mice: ";
  miceContainer.innerHTML += "<br>"+player.mice.length+" mice";
  
  return miceContainer;
  
}
