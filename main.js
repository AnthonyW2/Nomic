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

var rawRules;
var rules;
var players;
var propositions;

var largestRuleID;

//Create custom events triggered when the rules/players lists finish loading
const ruleLoadEvent = new Event("ruleload");
const playerLoadEvent = new Event("playerload");
const propositionLoadEvent = new Event("propositionload");


/**
 * Run when the body finishes loading
 */
var StartJS = () => {
  
  console.log("Running startup scripts...");
  
  LoadRules();
  LoadPlayers();
  LoadPropositions();
  
  populateColorThemeSelector();
  ApplyThemes();
  
}


/**
 * @async
 * Called by StartJS() to load the rules from Rules/rules.json
 * @emits ruleLoadEvent
 */
var LoadRules = async () => {
  
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = () => {
    
    //Test if the request is finished
    if(xmlhttp.readyState == 4){
      
      //Test if the status resolved to 200
      if(xmlhttp.status == 200){
        
        //rawRules = JSON.parse(xmlhttp.responseText);
        //rules = new Rule(rawRules);
        rules = new RuleSet(xmlhttp.responseText);
        
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

/**
 * @async
 * Called by StartJS() to load the player list from Players/players.json
 * @emits playerLoadEvent
 */
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

/**
 * @async
 * Called by StartJS() to load the proposition list from Propositions/propositions.json
 * @emits propositionLoadEvent
 */
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



/**
 * Generate a vote icon
 * @param {String} type A string specifying the type of vote
 * @param {int} number The number of votes of the specified type
 * @returns {Element} A HTML element for the vote icon
 */
var VoteIcon = (type, number) => {
  
  var types = ["up","down","left","right"];
  var altStrings = ["UP","DOWN","LEFT","RIGHT"];
  
  return "<div class=\"vote\"><img src=\"../Resources/"+types[type]+"vote.png\" alt=\""+altStrings[type]+"\" class=\"vote-icon\"> "+number+"</div>";
  
}



//On older JS engines the replaceAll function does not exist, so we need to define it
if(!String.prototype.replaceAll){
  
  console.warn("Browser does not support String.prototype.replaceAll(), defining function...");
  
  String.prototype.replaceAll = function(pattern, newSubstr){
    return this.replace(new RegExp(pattern, "g"), newSubstr);
  }
  
}
