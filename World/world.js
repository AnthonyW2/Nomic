/**
 * JavaScript functions used by the World page
 * 
 * @author Anthony Wilson
 */



"use strict";



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
  
  console.log(worldMap);
  
  console.log(world);
  
}
