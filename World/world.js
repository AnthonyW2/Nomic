/**
 * JavaScript functions used by the World page
 * 
 * @author Anthony Wilson
 */



"use strict";

const hexRadius = 20;
const hexHeight = hexRadius*Math.sin(Math.PI/3);

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
  
  const worldMap = document.getElementById("world-map");
  
  console.log("Display world map");
  
  //Loop through tiles and add them all to the map
  for(var t = 0;t < world.tiles.length;t ++){
    
    worldMap.appendChild(AddHex(world.tiles[t], t));
    
  }
  
  console.log(worldMap);
  
  console.log(world);
  
}

var AddHex = (tile, id) => {
  
  var x = 100 + (hexRadius*1.5)*tile.position[0];
  var y = 100 - hexHeight*tile.position[0] - hexHeight*tile.position[1]*2;
  
  var points = [
    (x + hexRadius) + "," + y,
    (x + hexRadius/2) + "," + (y + hexHeight),
    (x - hexRadius/2) + "," + (y + hexHeight),
    (x - hexRadius) + "," + y,
    (x - hexRadius/2) + "," + (y - hexHeight),
    (x + hexRadius/2) + "," + (y - hexHeight)
  ];
  
  var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  
  polygon.setAttribute("points", points.join(" "));
  polygon.classList.add("map-hex");
  polygon.classList.add("map-hex-"+world.biomes[tile.biome].shortname);
  polygon.id = "tile-"+id;
  
  //Make the origin clear by increasing the outline thickness
  if(id == 0){
    polygon.style.strokeWidth = "3";
  }
  
  return polygon;
  
}

