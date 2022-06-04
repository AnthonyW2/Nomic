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

var rules;
var players;
var propositions;
var world;

var largestRuleID;

//Create custom events triggered when the rules/players lists finish loading
const ruleLoadEvent = new Event("ruleload");
const playerLoadEvent = new Event("playerload");
const propositionLoadEvent = new Event("propositionload");
const worldLoadEvent = new Event("worldload");

//Color themes available on the site
const colorThemes = [
  "light",
  "dark",
  "fruity",
  "neon-1",
  "pastel-sunset",
  "layan",
  "test"
];

const fontThemes = [
  "default",
  "serif",
  "sans-serif",
  "comic-sans"
];


//Run when the body finishes loading
var StartJS = () => {
  
  console.log("Running startup scripts...");
  
  LoadRules();
  LoadPlayers();
  LoadPropositions();
  LoadWorldData();
  
  ApplyThemes();
  
}


//Run by StartJS() to load the rules from Rules/rules.json
var LoadRules = async () => {
  
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
  
  xmlhttp.open("GET", root+"/Rules/rules.json?nocache="+(new Date()).getTime(), true);
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
  
  xmlhttp.open("GET", root+"/Players/players.json?nocache="+(new Date()).getTime(), true);
  xmlhttp.send();
  
}

//Run by StartJS() to load the proposition list from Propositions/propositions.json
var LoadPropositions = async () => {
  
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = () => {
    
    //Test if the request is finished
    if(xmlhttp.readyState == 4){
      
      //Test if the status resolved to 200
      if(xmlhttp.status == 200){
        
        propositions = JSON.parse(xmlhttp.responseText);
        
        //Trigger the custom playerload event
        body.dispatchEvent(propositionLoadEvent);
        
      }else{
        
        console.error("Failed to retrieve propositions from propositions.json");
        
      }
      
    }
    
  }
  
  xmlhttp.open("GET", root+"/Propositions/propositions.json?nocache="+(new Date()).getTime(), true);
  xmlhttp.send();
  
}

//Run by StartJS() to load the world data from World/world.json
var LoadWorldData = async () => {
  
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = () => {
    
    //Test if the request is finished
    if(xmlhttp.readyState == 4){
      
      //Test if the status resolved to 200
      if(xmlhttp.status == 200){
        
        world = JSON.parse(xmlhttp.responseText);
        
        //Trigger the custom playerload event
        body.dispatchEvent(worldLoadEvent);
        
      }else{
        
        console.error("Failed to retrieve world data from world.json");
        
      }
      
    }
    
  }
  
  xmlhttp.open("GET", root+"/World/world.json?nocache="+(new Date()).getTime(), true);
  xmlhttp.send();
  
}


//Apply the user's preferred color/font themes
var ApplyThemes = () => {
  
  //Split the cookies into an array
  var cookies = document.cookie.split("; ");
  
  //Loop through cookies
  for(var c = 0;c < cookies.length;c ++){
    
    var cookie = cookies[c].split("=");
    
    //Check if the cookie is the one storing the theme
    if(cookie[0] == "colortheme"){
      
      //Loop through the possible color themes
      for(var t = 0;t < colorThemes.length;t ++){
        
        //Set the color theme is the value of the theme cookie matches the theme
        if(cookie[1] == colorThemes[t]){
          //Update the color theme
          changeColorScheme(t);
          
          //Set the option that is selected in the overflow menu
          document.getElementById("settings-color-scheme-select").value = t;
        }
        
      }
      
    }else if(cookie[0] == "fonttheme"){
      
      //Loop through the possible font themes
      for(var t = 0;t < fontThemes.length;t ++){
        
        //Set the color theme is the value of the theme cookie matches the theme
        if(cookie[1] == fontThemes[t]){
          //Update the font theme
          changeFontTheme(t);
          
          //Set the option that is selected in the overflow menu
          document.getElementById("settings-font-theme-select").value = t;
        }
        
      }
      
    }
    
  }
  
}



//Generate a vote icon
var VoteIcon = (type, amount) => {
  
  var types = ["up","down","left","right"];
  var altStrings = ["UP","DOWN","LEFT","RIGHT"];
  
  return "<div class=\"vote\"><img src=\"../Resources/"+types[type]+"vote.png\" alt=\""+altStrings[type]+"\" class=\"vote-icon\"> "+amount+"</div>";
  
}
