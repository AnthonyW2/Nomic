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

var selectedPlayer;

body.addEventListener("playerload", e => {
  
  //Display the players when the players finish loading from players.json
  DisplayPlayers();
  
});


var DisplayPlayers = () => {
  
  selectedPlayer = parseInt(new URL(location.href).searchParams.get("p"));
  
  //Get the reference to the player-list element
  activePlayerListElement = document.getElementById("active-player-list");
  inactivePlayerListElement = document.getElementById("inactive-player-list");
  quitPlayerListElement = document.getElementById("quit-player-list");
  
  activePlayerListElement.innerHTML = "";
  inactivePlayerListElement.innerHTML = "";
  quitPlayerListElement.innerHTML = "";
  
  var selectedPlayerElement;
  
  for(var p = 0;p < players.length;p ++){
    
    var playerInfoElement;
    
    if(players[p].active && players[p].playing){
      playerInfoElement = displayPlayerInfo(players[p]);
      activePlayerListElement.appendChild(playerInfoElement);
      //activePlayerListElement.appendChild(document.createElement("br"));
    }else if(!players[p].active && players[p].playing){
      playerInfoElement = displayPlayerInfo(players[p]);
      inactivePlayerListElement.appendChild(playerInfoElement);
      //inactivePlayerListElement.appendChild(document.createElement("br"));
    }else{
      playerInfoElement = displayPlayerInfo(players[p]);
      quitPlayerListElement.appendChild(playerInfoElement);
      //quitPlayerListElement.appendChild(document.createElement("br"));
    }
    
    if(p == selectedPlayer){
      selectedPlayerElement = playerInfoElement
    }
    
  }
  
  if(selectedPlayerElement != undefined){
    selectedPlayerElement.scrollIntoView();
  }
  
}


var displayPlayerInfo = (player) => {
  
  //Outer element containing all player info
  var playerBlock = document.createElement("div");
  playerBlock.classList.add("player-list-block");
  
  //Details (collapsible) element containing all player info
  var playerDetails = document.createElement("details");
  playerDetails.open = true;
  playerDetails.classList.add("player-list-details");
  playerBlock.appendChild(playerDetails);
  
  //Player name
  var playerName = document.createElement("summary");
  playerName.innerHTML = "<b>"+player.name+"</b>";
  if(player.winner){
    playerName.innerHTML += " 👑";
  }
  playerDetails.appendChild(playerName);
  
  playerDetails.appendChild(document.createElement("br"));
  
  //Player wallet ("spacious pants hole")
  var wallet = document.createElement("div");
  wallet.innerHTML = "Spacious Pants Hole: " + player.moustaches + "<i><strike>m</strike></i>";
  playerDetails.appendChild(wallet);
  
  playerDetails.appendChild(document.createElement("br"));
  
  //Quality score & Action points
  var score = document.createElement("div");
  var totalQualityScore = 0;
  for(var i = 0;i < player.inventory.length;i ++){
    if(player.inventory[i].type == "medallion-fish"){
      totalQualityScore += player.inventory[i].quality;
    }
  }
  score.innerHTML = "Quality score: " + totalQualityScore;
  playerDetails.appendChild(score);
  
  var actionPoints = document.createElement("div");
  actionPoints.innerHTML = "Action points: " + (2 + Math.floor(Math.sqrt(totalQualityScore)));
  playerDetails.appendChild(actionPoints);
  
  playerDetails.appendChild(document.createElement("br"));
  
  //Inventory
  var inventory = document.createElement("details");
  inventory.innerHTML = "<summary>Inventory</summary>";
  if(player.inventory.length > 0 || player.mice.length > 0){
    playerDetails.appendChild(inventory);
  }
  var inventoryContent = document.createElement("div");
  inventory.appendChild(inventoryContent);
  inventoryContent.classList.add("detail-content");
  
  //Morbium (winning condition)
  if(player.inventory.length > 0 && player.inventory[0].name == "Morbium"){
    var morbium = document.createElement("div");
    morbium.innerHTML = "&#x2022 " + player.inventory[0].amount + "× <b>Morbium</b><br>";
    inventoryContent.appendChild(morbium);
  }
  
  //Items
  for(var i = 0;i < player.inventory.length;i ++){
    
    if(player.inventory[i].type != "medallion-fish" && player.inventory[i].name != "Morbium"){
      var item = document.createElement("div");
      item.innerHTML = "&#x2022 " + player.inventory[i].amount + "× " + player.inventory[i].name + "<br>";
      inventoryContent.appendChild(item);
    }
    
  }
  
  //Medallion Fish
  var fish = document.createElement("details");
  fish.innerHTML = "<summary>Medallion Fish</summary>";
  var fishContent = document.createElement("div");
  fish.appendChild(fishContent);
  fishContent.classList.add("detail-content");
  var hasMedFish = false;
  
  for(var i = 0;i < player.inventory.length;i ++){
    
    if(player.inventory[i].type == "medallion-fish"){
      fishContent.innerHTML += "&#x2022 " + player.inventory[i].amount + "× " + player.inventory[i].name + "<br>";
      hasMedFish = true;
    }
    
  }
  if(hasMedFish){
    inventoryContent.appendChild(fish);
  }
  
  //Mice
  if(player.mice.length > 0){
    
    //inventoryContent.appendChild(document.createElement("br"));
    
    inventoryContent.appendChild(displayMice(player));
    
  }
  
  
  
  //Add position
  //Add remaining actions (?)
  
  if(player.PID == selectedPlayer){
    inventory.open = true;
    fish.open = true;
  }
  
  return playerBlock;
  
}


var displayMice = (player) => {
  
  var mice = document.createElement("details");
  mice.innerHTML = "<summary>Mice</summary>";
  var miceContent = document.createElement("div");
  mice.appendChild(miceContent);
  miceContent.classList.add("detail-content");
  if(player.PID == selectedPlayer){
    mice.open = true;
  }
  
  for(var m = 0;m < player.mice.length;m ++){
    
    if(!player.mice[m].deceased){
      var mouse = document.createElement("div");
      miceContent.appendChild(mouse);
      mouse.classList.add("player-mouse");
      mouse.id = "mouse-"+player.name+"-"+m;
      
      mouse.innerHTML = "<b>"+player.mice[m].name.replaceAll("<","&lt;").replaceAll(">","&gt;")+"</b>";
      mouse.innerHTML += "<br><i>Eye Colour:</i> "+player.mice[m].eye_color;
      mouse.innerHTML += "<br><i>Favourite Food:</i> "+player.mice[m].fav_food;
      mouse.innerHTML += "<br><i>Age:</i> "+player.mice[m].age;
      mouse.innerHTML += "<br><i>Description:</i> "+player.mice[m].blurb.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\n","<br>\n");
      mouse.innerHTML += "<br>";
      
      var mouseStats = document.createElement("ul");
      mouse.appendChild(mouseStats);
      mouseStats.innerHTML = "<li>Energy: "+player.mice[m].statistics.energy+"</li>";
      mouseStats.innerHTML += "<li>Mischief: "+player.mice[m].statistics.mischief+"</li>";
      mouseStats.innerHTML += "<li>Wits: "+player.mice[m].statistics.wits+"</li>";
      mouseStats.innerHTML += "<li>Power: "+player.mice[m].statistics.power+"</li>";
      mouseStats.innerHTML += "<li>Curiosity: "+player.mice[m].statistics.curiosity+"</li>";
      
      if(player.mice[m].pure_stat != undefined){
        mouse.innerHTML += "<i>Pure Statistic:</i> "+player.mice[m].pure_stat+"<br>";
      }
      
      mouse.innerHTML += "<img src=\""+player.mice[m].image+"\" alt=\"\" width=\"400\">";
      
    }
    
  }
  
  
  //var miceContainer = document.createElement("details");
  //miceContainer.classList.add("player-mice-container");
  //
  //miceContainer.innerHTML = "<summary>Mice: </summary>";
  //miceContainer.innerHTML += "<br>"+player.mice.length+" mice";
  
  return mice;
  
}
