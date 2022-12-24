/**
 * JavaScript functions used by the Rules page
 * 
 * @author Anthony Wilson
 */



"use strict";

//Store a reference to the rules-list element
var rulesListElement;

var ruleDisplayStyle = "tree";

var archiveIndex;
var ruleset;

body.addEventListener("ruleload", e => {
  
  //Display the rules when the rules finish loading from rules.json
  DisplayRules();
  
});


/**
 * Display the ruleset
 */
var DisplayRules = () => {
  
  //Get the reference to the rules-list element
  rulesListElement = document.getElementById("rule-tree");
  ///ruleSummaryTableElement = document.getElementById("rule-summary-table");
  
  rulesListElement.innerHTML = "";
  
  console.log("Root rule:",rules);
  
  var ruleTree = createRuleBranch(rules, true);
  
  rulesListElement.appendChild(ruleTree);
  
  
  //Update the date of the ruleset
  if(ruleset != undefined){
    document.getElementById("ruleset-date").innerHTML = "Ruleset date: " + new Date(archiveIndex[parseInt(ruleset,10)].timestamp*1000).toUTCString();
  }
  
  //Update the rule count
  document.getElementById("rule-count").innerHTML = "Rule count: " + (rules.getSubruleCount()+1);
  
}

/**
 * Recursive function to create a HTML representation of a rule and its subrules
 * @param {Rule} rule The rule to display
 * @param {boolean} branchEnd Whether or not this rule is at the end of a branch
 * @returns {Element} A HTML representation of a rule and its subrules
 */
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
  
  ruleElement.innerHTML += path + "<a href=\"#rule-"+rule.id+"\" class=\"inherit-color\">" + rule.summary+"</a><br>";
  ruleElement.innerHTML += rule.content.replaceAll("\n","<br>\n").replaceAll("<m>","<i><strike>m</strike></i>");
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
  
  return ruleElement;
  
}

//Change the style in which the rules are displayed
var updateRuleDisplayStyle = () => {
  
  ruleDisplayStyle = document.getElementById("rule-display-style-select").value;
  
  DisplayRules();
  
}


//Load the rule (archive) index from Rules/Archive/index.json
var LoadArchiveIndex = async () => {
  
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = () => {
    
    //Test if the request is finished
    if(xmlhttp.readyState == 4){
      
      //Test if the status resolved to 200
      if(xmlhttp.status == 200){
        
        archiveIndex = JSON.parse(xmlhttp.responseText);
        populateArchiveSelector();
        
      }else{
        
        console.error("Failed to retrieve rule index from index.json");
        
      }
      
    }
    
  }
  
  xmlhttp.open("GET", root+"/Rules/Archive/index.json?nocache="+(new Date()).getTime(), true);
  xmlhttp.send();
  
}

//Add all the archived rulesets to the selector element
var populateArchiveSelector = () => {
  
  var archiveSelect = document.getElementById("rule-display-control-archive-selector");
  
  for(var a = 0;a < archiveIndex.length;a ++){
    
    var option = document.createElement("option");
    
    option.value = a.toString();
    option.innerHTML = archiveIndex[a].summary;
    
    archiveSelect.appendChild(option);
    
  }
  
  archiveSelect.value = archiveIndex.length-1;
  
}

//Change the rule tree to the corresponding archived version
var updateRuleTree = () => {
  
  ruleset = document.getElementById("rule-display-control-archive-selector").value;
  
  //Get the reference to the rules-list element
  rulesListElement = document.getElementById("rule-tree");
  
  rulesListElement.innerHTML = "";
  
  LoadArchivedRuleset();
  
}

//Load the ruleset corresponding to the selected archive from Rules/Archive/rules.X.json
var LoadArchivedRuleset = async () => {
  
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = () => {
    
    //Test if the request is finished
    if(xmlhttp.readyState == 4){
      
      //Test if the status resolved to 200
      if(xmlhttp.status == 200){
        
        rawRules = JSON.parse(xmlhttp.responseText);
        rules = new Rule(rawRules);
        
        //Trigger the custom ruleload event
        body.dispatchEvent(ruleLoadEvent);
        
      }else{
        
        console.error("Failed to retrieve rules from rules.json");
        
      }
      
    }
    
  }
  
  xmlhttp.open("GET", root+"/Rules/Archive/rules."+ruleset+".json?nocache="+(new Date()).getTime(), true);
  xmlhttp.send();
  
}


//Load the rule archive index
LoadArchiveIndex();
