/*
Anthony Wilson

Nomic Automation System

JavaScript functions used by the Rules page

2022-4-7 - 2022-5-7
*/

"use strict";

//Store a reference to the rules-list element
var rulesListElement;
///var ruleSummaryTableElement;

body.addEventListener("ruleload", e => {
  
  //Display the rules when the rules finish loading from rules.json
  DisplayRules();
  
});


var DisplayRules = () => {
  
  //Get the reference to the rules-list element
  rulesListElement = document.getElementById("rule-tree");
  ///ruleSummaryTableElement = document.getElementById("rule-summary-table");
  
  rulesListElement.innerHTML = "";
  
  console.log("Root rule:",rules);
  
  var ruleTree = createRuleBranch(rules);
  
  rulesListElement.appendChild(ruleTree);
  
}

//Recursive function to create a HTML representation of a rule and its subrules
var createRuleBranch = (rule) => {
  
  var ruleElement = document.createElement("div");
  
  ruleElement.innerHTML = rule.getIDPath().substring(2)+" - "+rule.summary+"<br>"+rule.content.replaceAll("\n","<br>\n");
  ruleElement.classList.add("rule");
  ruleElement.id = "rule-"+rule.id;
  
  var taglist = [];
  for(var t = 0;t < rule.tags.length;t ++){
    taglist.push("<div class=\"rule-tag\">"+rule.tags[t]+"</div>");
  }
  ruleElement.innerHTML += "<div class=\"taglist\">"+taglist.join(" ")+"</div>";
  
  for(var sr = 0;sr < rule.subrules.length;sr ++){
    
    var subruleElement = createRuleBranch(rule.subrules[sr]);
    
    ruleElement.appendChild(subruleElement);
    
  }
  
  return ruleElement;
  
}

