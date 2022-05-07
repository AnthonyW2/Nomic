/*
Anthony Wilson

Nomic Automation System

Main JavaScript functions used by all pages on the site

2022-4-7 - 2022-5-7
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


class Rule {
  
  //The Rule constructor takes an un-processed object parsed from rules.json and a reference to its parent
  constructor(obj, parent) {
    
    ///console.log(obj);
    
    this.parent = parent;
    
    this.id = obj.id;
    this.relid = obj.relid;
    this.summary = obj.summary;
    this.content = obj.content;
    this.tags = obj.tags;
    
    this.subrules = [];
    
    for(var r = 0;r < obj.subrules.length;r ++){
      
      if(obj.subrules[r].relid != r+1){
        console.warn("Mismatched relative rule ID");
      }
      
      this.subrules[r] = new Rule(obj.subrules[r], this);
      
    }
    
  }
  
  //Generate the relative ID path of this rule (x.y.z etc)
  getIDPath() {
    
    //Return only a single number if this is the root rule
    if(this.parent == undefined) {
      return this.relid.toString();
    }
    
    var path = this.parent.getIDPath() + "." + this.relid;
    
    return path;
    
  }
  
  //Get a reference to a rule using its relative ID path
  getRuleByPath(pathstr) {
    
    var path = pathstr.split(".").map(relid => parseInt(relid));
    
    //Store a reference to the current rule as the function navigates the tree
    var pointer = this;
    
    for(var r = 0;r < path.length;r ++){
      
      //Navigate down the tree, setting the pointer to the next rule
      pointer = pointer.subrules[ path[r]-1 ];
      
    }
    
    return pointer;
    
  }
  
}



