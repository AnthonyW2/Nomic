/**
 * JavaScript functions used by the Rules page
 * 
 * @author Anthony Wilson
 */



"use strict";

//Store a reference to the rules-list element
var rulesListElement;
///var ruleSummaryTableElement;

var ruleDisplayStyle = "boxes";

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
  
  var ruleTree = createRuleBranch(rules, true);
  
  rulesListElement.appendChild(ruleTree);
  
}

//Recursive function to create a HTML representation of a rule and its subrules
var createRuleBranch = (rule, branchEnd) => {
  
  var ruleElement = document.createElement("div");
  
  var path = rule.getIDPath();
  path = (path.length > 1 ? path.substring(2)+" - " : "");
  
  //Add the branch lines for the tree style
  if(ruleDisplayStyle == "tree"){
    if(branchEnd){
      ruleElement.innerHTML = "<div class=\"rule-tree-branch-line-horizontal rule-tree-branch-line-horizontal-end\"></div>";
    }else{
      ruleElement.innerHTML = "<div class=\"rule-tree-branch-line-horizontal\"></div>";
    }
    if(rule.subrules.length > 0){
      ruleElement.innerHTML += "<div class=\"rule-tree-branch-line-vertical\"></div>";
    }
  }
  
  ruleElement.innerHTML += path+rule.summary+"<br>"+rule.content.replaceAll("\n","<br>\n");
  ruleElement.classList.add("rule");
  ruleElement.classList.add("rule-style-"+ruleDisplayStyle);
  ruleElement.id = "rule-"+rule.id;
  
  //Add the tags
  var taglist = [];
  for(var t = 0;t < rule.tags.length;t ++){
    taglist.push("<div class=\"rule-tag\">"+rule.tags[t]+"</div>");
  }
  ruleElement.innerHTML += "<div class=\"taglist\">"+taglist.join(" ")+"</div>";
  
  //Add the subrules
  for(var sr = 0;sr < rule.subrules.length;sr ++){
    
    var subruleElement = createRuleBranch(rule.subrules[sr], (sr == rule.subrules.length-1));
    
    ruleElement.appendChild(subruleElement);
    
  }
  
  //if(ruleDisplayStyle == "tree" && rule.subrules.length > 0){
  //  
  //  //var ruleElementBoundingRect = ruleElement.getBoundingClientRect();
  //  
  //  var lastSubrule = ruleElement.lastChild;
  //  //var lastSubruleBoundingRect = lastSubrule.getBoundingClientRect();
  //  
  //  console.log("lastSubrule:",lastSubrule);
  //  
  //  //console.log("1",ruleElementBoundingRect);
  //  //console.log("2",lastSubruleBoundingRect);
  //  
  //  var branchVerticalLine = document.createElement("div");
  //  branchVerticalLine.classList.add("rule-tree-branch-line-2");
  //  branchVerticalLine.style.height = "";
  //  
  //  ruleElement.appendChild(branchVerticalLine);
  //  
  //  //ruleElement.innerHTML += "<div class=\"rule-tree-branch-line-2\"></div>";
  //}
  
  return ruleElement;
  
}

//Change the style in which the rules are displayed
var updateRuleDisplayStyle = () => {
  
  ruleDisplayStyle = document.getElementById("rule-display-style-select").value;
  
  DisplayRules();
  
}

