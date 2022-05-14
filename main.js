/**
 * Nomic website global JS functionality
 * Required by all pages on the Nomic website
 * 
 * @author Anthony Wilson
 * 
 * @since 2022-4-7
 */



"use strict";

const body = document.body;

console.log(body);

var rules;
var players = [];

//Create custom events triggered when the rules/players lists finish loading
const ruleLoadEvent = new Event("ruleload");
const playerLoadEvent = new Event("playerload");


//Run when the body finishes loading
var StartJS = () => {
  
  console.log("Running startup scripts...");
  
  LoadRules();
  LoadPlayers();
  
}


//Run by StartJS() to load the rules from Rules/rules.json
let LoadRules = async () => {
  
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = () => {
    
    //Test if the request is finished
    if(xmlhttp.readyState == 4){
      
      //Test if the status resolved to 200
      if(xmlhttp.status == 200){
        
        rules = new Rule(JSON.parse(xmlhttp.responseText));
        
        //Trigger the custom ruleload event
        body.dispatchEvent(ruleLoadEvent);
        
      }else{
        
        console.error("Failed to retrieve rules from rules.json");
        
      }
      
    }
    
  }
  
  xmlhttp.open("GET", root+"/Rules/rules.json", true);
  xmlhttp.send();
  
}

//Run by StartJS() to load the player list from Players/players.json
var LoadPlayers = async () => {
  
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = () => {
    
    //Test if the request is finished
    if(xmlhttp.readyState == 4){
      
      //Test if the status resolved to 200
      if(xmlhttp.status == 200){
        
        players = JSON.parse(xmlhttp.responseText);
        
        //Trigger the custom playerload event
        body.dispatchEvent(playerLoadEvent);
        
      }else{
        
        console.error("Failed to retrieve players from players.json");
        
      }
      
    }
    
  }
  
  xmlhttp.open("GET", root+"/Players/players.json", true);
  xmlhttp.send();
  
}
