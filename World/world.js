/**
 * JavaScript functions used by the World page
 * 
 * @author Anthony Wilson
 */



"use strict";

const hexRadius = 20;
const hexHeight = hexRadius*Math.sin(Math.PI/3);
const originX = 650;
const originY = 750;

var worldMap;

body.addEventListener("worldload", e => {
  
  //Display the world map when the world data finishes loading from world.json
  DisplayWorldMap();
  
});

body.addEventListener("playerload", e => {
  
  //Display the world map when the world data finishes loading from world.json
  DisplayWorldMap();
  
});


var DisplayWorldMap = () => {
  
  if(!world || !players){
    return;
  }
  
  worldMap = document.getElementById("world-map");
  
  console.log("Display world map");
  
  //Loop through tiles and add them all to the map
  for(var t = 0;t < world.tiles.length;t ++){
    
    AddHex(world.tiles[t], t);
    
  }
  
  //Loop through the players and add them to the map
  for(var p = 0;p < players.length;p ++){
    
    AddPlayer(players[p]);
    
  }
  
  console.log(worldMap);
  
  console.log(world);
  
}

//Add a haxagonal tile to the world map
var AddHex = (tile, id) => {
  
  var x = originX + (hexRadius*1.5)*tile.position[0];
  var y = originY - hexHeight*tile.position[0] - hexHeight*tile.position[1]*2;
  
  //Define the 6 points of the hexagon
  var points = [
    (x + hexRadius) + "," + y,
    (x + hexRadius/2) + "," + (y + hexHeight),
    (x - hexRadius/2) + "," + (y + hexHeight),
    (x - hexRadius) + "," + y,
    (x - hexRadius/2) + "," + (y - hexHeight),
    (x + hexRadius/2) + "," + (y - hexHeight)
  ];
  
  //Create the polygon element and define its vertices from the above points
  var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("points", points.join(" "));
  polygon.classList.add("map-hex");
  polygon.classList.add("map-hex-"+world.biomes[tile.biome].shortname);
  polygon.id = "tile-"+id;
  
  //Add a hover title to the tile
  var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
  title.innerHTML = world.biomes[tile.biome].name + " (" + tile.position[0] + "," + tile.position[1] + ")";
  polygon.appendChild(title);
  
  //Add the polygon to the SVG
  worldMap.appendChild(polygon);
  
  //Add an overlay to indicate corruption
  if(tile.corrupt){
    
    var innerRadius = hexRadius-3.4;
    var innerHexHeight = innerRadius*Math.sin(Math.PI/3);
    
    var innerPoints = [
      (x + innerRadius) + "," + y,
      (x + innerRadius/2) + "," + (y + innerHexHeight),
      (x - innerRadius/2) + "," + (y + innerHexHeight),
      (x - innerRadius) + "," + y,
      (x - innerRadius/2) + "," + (y - innerHexHeight),
      (x + innerRadius/2) + "," + (y - innerHexHeight)
    ];
    
    var innerPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    innerPolygon.setAttribute("points", innerPoints.join(" "));
    innerPolygon.classList.add("map-hex");
    innerPolygon.classList.add("map-hex-corrupt-overlay");
    innerPolygon.id = "corrupt-indicator-"+id;
    
    worldMap.appendChild(innerPolygon);
    
  }
  
  //Add the landmark
  AddLandmark(tile, id);
  
  //Make the origin clear by increasing the outline thickness
  if(id == 0){
    polygon.style.strokeWidth = "4";
  }
  
}

//Add a landmark to the world map
var AddLandmark = (tile, id) => {
  
  var x = originX + (hexRadius*1.5)*tile.position[0];
  var y = originY - hexHeight*tile.position[0] - hexHeight*tile.position[1]*2;
  
  for(var l = 0;l < tile.landmarks.length; l ++){
    
    switch(tile.landmarks[l].type){
      case 0:
        //Town
        
        var townImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        townImage.setAttribute("href", "town-icon.svg");
        townImage.setAttribute("width", "24");
        townImage.setAttribute("x", x-12);
        townImage.setAttribute("y", y-12);
        townImage.classList.add("map-landmark");
        townImage.id = "map-landmark-hut-"+id;
        
        worldMap.appendChild(townImage);
        
      break;
      case 1:
        //Mouse hut
        
        var hutImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        hutImage.setAttribute("href", "mouse-hut-icon.svg");
        hutImage.setAttribute("width", "24");
        hutImage.setAttribute("x", x-12);
        hutImage.setAttribute("y", y-12);
        hutImage.classList.add("map-landmark");
        hutImage.id = "map-landmark-hut-"+id;
        
        worldMap.appendChild(hutImage);
        
      break;
      case 2:
        //Dungeon
        
        var dungeonImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        dungeonImage.setAttribute("href", "dungeon-icon.svg");
        dungeonImage.setAttribute("width", "20");
        dungeonImage.setAttribute("x", x-10);
        dungeonImage.setAttribute("y", y-10);
        dungeonImage.classList.add("map-landmark");
        dungeonImage.id = "map-landmark-dungeon-"+id;
        
        worldMap.appendChild(dungeonImage);
        
      break;
      case 3:
        //Quarry
        
        var quarryImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        quarryImage.setAttribute("href", "quarry-icon.svg");
        quarryImage.setAttribute("width", "20");
        quarryImage.setAttribute("x", x-10);
        quarryImage.setAttribute("y", y-10);
        quarryImage.classList.add("map-landmark");
        quarryImage.id = "map-landmark-quarry-"+id;
        
        worldMap.appendChild(quarryImage);
        
      break;
      case 4:
        //Market
        
        var marketImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        marketImage.setAttribute("href", "market-icon.svg");
        marketImage.setAttribute("width", "10");
        marketImage.setAttribute("x", x-5);
        marketImage.setAttribute("y", y-10);
        marketImage.classList.add("map-landmark");
        marketImage.id = "map-landmark-market-"+id;
        
        worldMap.appendChild(marketImage);
        
      break;
      case 5:
        //Pylon of Purity
      break;
      case 6:
        //Stag station
      break;
      case 7:
        //Boardwalk
        
        var innerRadius = hexRadius-5;
        var innerHexHeight = innerRadius*Math.sin(Math.PI/3);
        
        var innerPoints = [
          (x + innerRadius) + "," + y,
          (x + innerRadius/2) + "," + (y + innerHexHeight),
          (x - innerRadius/2) + "," + (y + innerHexHeight),
          (x - innerRadius) + "," + y,
          (x - innerRadius/2) + "," + (y - innerHexHeight),
          (x + innerRadius/2) + "," + (y - innerHexHeight)
        ];
        
        var innerPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        innerPolygon.setAttribute("points", innerPoints.join(" "));
        innerPolygon.classList.add("map-landmark");
        innerPolygon.classList.add("map-landmark-boardwalk");
        innerPolygon.id = "map-landmark-boardwalk-"+id;
        
        worldMap.appendChild(innerPolygon);
        
      break;
      case 8:
        //Campfire
        
        var campfireImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        campfireImage.setAttribute("href", "campfire-icon.svg");
        campfireImage.setAttribute("width", "20");
        campfireImage.setAttribute("x", x-10);
        campfireImage.setAttribute("y", y-10);
        campfireImage.classList.add("map-landmark");
        campfireImage.id = "map-landmark-campfire-"+id;
        
        worldMap.appendChild(campfireImage);
        
      break;
    }
    
  }
  
}

//Add a player to the world map
var AddPlayer = (player) => {
  
  var x = originX + (hexRadius*1.5)*player.position[0];
  var y = originY - hexHeight*player.position[0] - hexHeight*player.position[1]*2;
  
  if(player.position[0] == 0 && player.position[1] == 0){
    
    x = originX + hexRadius*0.5*Math.cos( (Math.PI/5)*player.PID );
    y = originY - hexRadius*0.5*Math.sin( (Math.PI/5)*player.PID );
    
  }
  
  var playerIcon = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  playerIcon.setAttribute("cx", x);
  playerIcon.setAttribute("cy", y);
  playerIcon.setAttribute("r", hexRadius*0.3);
  playerIcon.setAttribute("fill", player.iconcolor);
  playerIcon.classList.add("map-player-icon");
  playerIcon.id = "map-player-icon-"+player.name;
  
  //Add a hover title to the player icon
  var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
  title.innerHTML = player.name + " (" + player.position[0] + "," + player.position[1] + ")";
  playerIcon.appendChild(title);
  
  worldMap.appendChild(playerIcon);
  
}

