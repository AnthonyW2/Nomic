/**
 * JavaScript functions used by the Rules page
 * 
 * @author Anthony Wilson
 */



"use strict";

//Store a reference to the rules-list element
var ruleContainer;

var ruleDisplayStyle = "list";

var archiveIndex;
var ruleset;

body.addEventListener("ruleload", e => {
  
  ruleDisplayStyle = document.getElementById("rule-display-style-select").value;
  
  //Display the rules when the rules finish loading from rules.json
  DisplayRules();
  
});


/**
 * Display the ruleset, taking into account the display settings that the user has requested
 */
var DisplayRules = () => {
  
  console.log("Rules:",rules);
  
  //Get the reference to the rules-list element
  ruleContainer = document.getElementById("rule-container");
  
  ruleContainer.innerHTML = "";
  
  var ruleList;
  
  //Set up the outer rule list element
  switch(ruleDisplayStyle){
    case "list":
      ruleList = document.createElement("ol");
      ruleList.id = "rule-list";
    break;
    case "tree":
      ruleList = document.createElement("div");
      //Add the branch lines for the tree style
      ruleList.classList.add("rule-style-tree");
      ruleList.innerHTML = "<div class=\"rule-tree-branch-line-horizontal rule-tree-branch-line-horizontal-end\"></div>";
      ruleList.innerHTML += "<div class=\"rule-tree-branch-line-vertical\"></div>";
      ruleList.innerHTML += "Rules";
    break;
    case "table":
      ruleList = document.createElement("table");
      ruleList.id = "rule-table";
      var tableHeader = document.createElement("tr");
      tableHeader.classList.add("rule-table-header-row");
      tableHeader.innerHTML = "<th id=\"rule-table-ID-header\">ID</th>";
      tableHeader.innerHTML += "<th id=\"rule-table-title-header\">Title</th>";
      tableHeader.innerHTML += "<th id=\"rule-table-content-header\">Rule</th>";
      tableHeader.innerHTML += "<th id=\"rule-table-tag-header\">Tags</th>";
      ruleList.appendChild(tableHeader);
    break;
    case "boxes":
      ruleList = document.createElement("div");
    break;
  }
  
  //Add each rule to the list
  for(var r = 0;r < rules.list.length;r ++){
    if(!rules.list[r].deleted){
      ruleList.appendChild(createRuleElement(rules.list[r]));
    }
  }
  
  ruleContainer.appendChild(ruleList);
  
  
  //Update the date of the ruleset
  if(ruleset != undefined){
    DisplayRulesetDate();
  }
  
  //Update the rule count
  document.getElementById("rule-count").innerHTML = "Rule count: " + rules.list.length;
  
}

/**
 * Create a HTML representation of a rule
 * @param {Rule} rule The rule to display
 * @returns {Element} A HTML representation of a rule and its subrules
 */
var createRuleElement = (rule) => {
  
  var ruleElement;
  
  switch(ruleDisplayStyle){
    case "list":
      ruleElement = document.createElement("li");
      ruleElement.value = rule.id;
      
      //Add the content
      ruleElement.innerHTML += "<a href=\"#rule-" + rule.id + "\" class=\"inherit-color\">" + rule.summary + "</a>";
      //ruleElement.innerHTML += " <span class=\"dim-text\">#" + rule.id + "</span>";
      ruleElement.innerHTML += "<br>";
      ruleElement.innerHTML += rule.content.replaceAll("\n","<br>\n").replaceAll("<m>","<i><strike>m</strike></i>");
      
    break;
    case "tree":
      //Add the branch lines for the tree style
      ruleElement = document.createElement("div");
      if(rule == rules.list[rules.list.length-1]){
        ruleElement.innerHTML = "<div class=\"rule-tree-branch-line-horizontal rule-tree-branch-line-horizontal-end\"></div>";
      }else{
        ruleElement.innerHTML = "<div class=\"rule-tree-branch-line-horizontal\"></div>";
      }
      
      //Add the content
      ruleElement.innerHTML += "<span class=\"dim-text\">#" + rule.id + " -</span> <a href=\"#rule-"+rule.id+"\" class=\"inherit-color\">" + rule.summary + "</a><br>";
      ruleElement.innerHTML += rule.content.replaceAll("\n","<br>\n").replaceAll("<m>","<i><strike>m</strike></i>");
      
    break;
    case "table":
      ruleElement = document.createElement("tr");
      
      var IDCell = document.createElement("td");
      IDCell.innerHTML = rule.id;
      ruleElement.appendChild(IDCell);
      
      var titleCell = document.createElement("td");
      titleCell.innerHTML = rule.summary;
      ruleElement.appendChild(titleCell);
      
      var contentCell = document.createElement("td");
      contentCell.innerHTML = rule.content.replaceAll("\n","<br>\n").replaceAll("<m>","<i><strike>m</strike></i>");
      ruleElement.appendChild(contentCell);
      
      var tagsCell = document.createElement("td");
      var taglist = [];
      for(var t = 0;t < rule.tags.length;t ++){
        taglist.push("<div class=\"rule-tag\">"+rule.tags[t]+"</div>");
      }
      tagsCell.innerHTML = "<div class=\"taglist\">"+taglist.join(" ")+"</div>";
      ruleElement.appendChild(tagsCell);
      
    break;
    case "boxes":
      ruleElement = document.createElement("div");
      
      //Add the content
      ruleElement.innerHTML += "<span class=\"dim-text\">#" + rule.id + " -</span> <a href=\"#rule-" + rule.id + "\" class=\"inherit-color\">" + rule.summary + "</a><br>";
      ruleElement.innerHTML += rule.content.replaceAll("\n","<br>\n").replaceAll("<m>","<i><strike>m</strike></i>");
      
    break;
  }
  
  //Add ID and classes
  ruleElement.id = "rule-"+rule.id;
  ruleElement.classList.add("rule");
  ruleElement.classList.add("rule-style-"+ruleDisplayStyle);
  
  //Add the tags
  if(ruleDisplayStyle != "table"){
    var taglist = [];
    for(var t = 0;t < rule.tags.length;t ++){
      taglist.push("<div class=\"rule-tag\">"+rule.tags[t]+"</div>");
    }
    ruleElement.innerHTML += "<div class=\"taglist\">"+taglist.join(" ")+"</div>";
  }
  
  return ruleElement;
  
}

/**
 * Update the date of the ruleset
 */
var DisplayRulesetDate = () => {
  var rulesetDate = new Date(archiveIndex[parseInt(ruleset,10)].timestamp*1000);
  var timezoneStr = " UTC" + (rulesetDate.getTimezoneOffset() == 0 ? "" : (rulesetDate.getTimezoneOffset() > 0 ? "-" : "+") + Math.abs(Math.floor(rulesetDate.getTimezoneOffset()/60)).toString().padStart(2, "0") + ":" + (Math.abs(rulesetDate.getTimezoneOffset())%60).toString().padStart(2, "0"));
  var rulesetDateStr = rulesetDate.getFullYear() + "-" + rulesetDate.getMonth().toString().padStart(2, "0") + "-" + rulesetDate.getDate().toString().padStart(2, "0") + " " + rulesetDate.getHours().toString().padStart(2, "0") + ":" + rulesetDate.getMinutes().toString().padStart(2, "0") + ":" + rulesetDate.getSeconds().toString().padStart(2, "0") + timezoneStr;
  document.getElementById("ruleset-date").innerHTML = "Ruleset date: " + rulesetDateStr;
}

/**
 * Recursive function to create a HTML representation of a rule and its subrules
 * @param {Rule} rule The rule to display
 * @param {boolean} branchEnd Whether or not this rule is at the end of a branch
 * @returns {Element} A HTML representation of a rule and its subrules
 */
//var createRuleBranch = (rule, branchEnd) => {
//  
//  var ruleElement = document.createElement("div");
//  
//  var path = rule.getIDPath();
//  path = (path.length > 1 ? path.substring(2)+" - " : "");
//  
//  //Add the branch lines for the tree style
//  if(ruleDisplayStyle == "tree"){
//    if(branchEnd){
//      ruleElement.innerHTML = "<div class=\"rule-tree-branch-line-horizontal rule-tree-branch-line-horizontal-end\"></div>";
//    }else{
//      ruleElement.innerHTML = "<div class=\"rule-tree-branch-line-horizontal\"></div>";
//    }
//    if(rule.subrules.length > 0){
//      ruleElement.innerHTML += "<div class=\"rule-tree-branch-line-vertical\"></div>";
//    }
//  }
//  
//  ruleElement.innerHTML += path + "<a href=\"#rule-"+rule.id+"\" class=\"inherit-color\">" + rule.summary+"</a><br>";
//  ruleElement.innerHTML += rule.content.replaceAll("\n","<br>\n").replaceAll("<m>","<i><strike>m</strike></i>");
//  ruleElement.classList.add("rule");
//  ruleElement.classList.add("rule-style-"+ruleDisplayStyle);
//  ruleElement.id = "rule-"+rule.id;
//  
//  //Add the tags
//  var taglist = [];
//  for(var t = 0;t < rule.tags.length;t ++){
//    taglist.push("<div class=\"rule-tag\">"+rule.tags[t]+"</div>");
//  }
//  ruleElement.innerHTML += "<div class=\"taglist\">"+taglist.join(" ")+"</div>";
//  
//  //Add the subrules
//  for(var sr = 0;sr < rule.subrules.length;sr ++){
//    
//    var subruleElement = createRuleBranch(rule.subrules[sr], (sr == rule.subrules.length-1));
//    
//    ruleElement.appendChild(subruleElement);
//    
//  }
//  
//  return ruleElement;
//  
//}

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
        
        DisplayRulesetDate();
        
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
  
  ruleset = archiveIndex.length-1;
  archiveSelect.value = ruleset;
  
}

//Change the ruleset to the corresponding archived version
var updateRuleTree = () => {
  
  ruleset = document.getElementById("rule-display-control-archive-selector").value;
  
  //Get the reference to the rules-list element
  ruleContainer = document.getElementById("rule-container");
  
  ruleContainer.innerHTML = "Loading rules...";
  
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
        
        rules = new RuleSet(xmlhttp.responseText);
        
        //Trigger the custom ruleload event
        body.dispatchEvent(ruleLoadEvent);
        
      }else{
        
        console.error("Failed to retrieve rules from rules.json");
        
      }
      
    }
    
  }
  
  if(ruleset == archiveIndex.length-1){
    xmlhttp.open("GET", root+"/Rules/rules.json?nocache="+(new Date()).getTime(), true);
  }else{
    xmlhttp.open("GET", root+"/Rules/Archive/rules."+ruleset+".json?nocache="+(new Date()).getTime(), true);
  }
  xmlhttp.send();
  
}


//Load the rule archive index
LoadArchiveIndex();
