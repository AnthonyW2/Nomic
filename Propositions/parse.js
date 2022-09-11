/**
 * Definitions of the proposition parsing functions for use both in Nomic Bot and on the website
 * 
 * @author Anthony Wilson
 */



"use strict";



/**
 * Convert a human-readable proposition from a Discord message into a computer-readable list of modifications to the rule tree.
 * @param {string} proposition Human-readable proposition text
 * @returns {[object]} List of modifications to apply to the tree with some extra data
 */
var parse = (proposition) => {
  
  var lines = proposition.split("\n");
  
  console.log(lines);
  
  var modifications = [];
  
  
  var lineType = "";
  
  var modType = "add";
  var persistentType = false;
  
  var confidence = 0;
  
  //Loop through each line of the proposition
  for(var l = 0;l < lines.length;l ++){
    
    var line = lines[l].toLowerCase().replaceAll("–","-");
    
    //console.log(line);
    
    var prevLineType = lineType;
    lineType = "";
    
    confidence = 0;
    
    //Identify the modification type
    if(l == 0 || lines[l-1] == ""){
      
      var prevModType = modType;
      modType = "";
      
      if(l == 0){
        confidence ++;
      }
      
      if(line.includes("**")){
        
        confidence ++;
        
        if(line.substr(0,2) == "**" && line.substr(line.length-2,2) == "**"){
          confidence ++;
        }
        
      }
      
      if(line.includes("addition")){
        
        modType = "add";
        confidence ++;
        
      }else if(line.includes("edit") || line.includes("replace")){
        
        //A single "edit" may change multiple aspects of a rule (content, path, title), and all 3 must be accounted for at once
        
        confidence ++;
        
        modType = "edit";
        
        if(line.includes("content")){
        
          modType += "-c";
          confidence ++;
          
        }
        if(line.includes("path")){
          
          modType += "-p";
          confidence ++;
          
        }
        if(line.includes("title")){
          
          modType += "-t";
          confidence ++;
          
        }
        
      }else if(line.includes("delet")){
        
        modType = "del";
        confidence ++;
        
        if(line.includes("deletion")){
          confidence ++;
        }
        
      }else if(line.includes("append")){
        
        modType = "app";
        confidence ++;
        
        if(line.includes("content")){
          confidence ++;
        }
        if(line.includes("appendication")){
          confidence ++;
        }
        
      }else if(line.includes("transmut")){
        
        modType = "trans";
        confidence ++;
        
        if(line.includes("transmutation")){
          confidence ++;
        }
        
      }else if(line.includes("misc") || (line.includes("one") && line.includes("time"))){
        
        if(line.includes("alter") || line.includes("change") || line.includes("modif")){
          
          modType = "misc";
          confidence ++;
          
          if(line.includes("miscellaneous") || line.includes("one-time")){
            confidence ++;
          }
          
        }
        
      }
      
      //If there is enough evidence that this line specifies the modification type, set it accordingly
      if(modType != "" && confidence >= 2){
        lineType = "type";
      }else{
        modType = prevModType;
      }
      
      //Check for "persistent" types
      if(line.includes("additions") || line.includes("edits") || line.includes("replacements")){
        
        persistentType = true;
        
      }
      
    }
    
    
    //Identify the path
    
    if(lineType == ""){
      
      confidence = 0;
      
      if(prevLineType == "type"){
        confidence ++;
      }else if(prevLineType == "path"){
        //May need to just prevent it from choosing a "path" as the type if the last line was a path, since this measure doesn't appear to be enough.
        confidence -= 2;
      }
      
      if(line.charAt(0) == ">"){
        confidence ++;
      }
      
      if(line.includes("*")){
        var splitPath = (line.includes(">") ? line.split(">") : line.split("."));
        if(splitPath[0].includes("*") && splitPath[splitPath.length-1].includes("*")){
          confidence ++;
        }
      }
      
      if(persistentType && l > 0 && lines[l-1] == ""){
        confidence ++;
      }
      
      var path = "";
      var title = "";
      var pathType = "";
      
      //Identify he type of path used
      if(line.includes(".")){
        //ID path
        
        if(line.replaceAll(". ","").split(".").length > 2){
          confidence ++;
        }
        
        if(line.includes("-")){
          confidence ++;
        }
        
        var split = line.replaceAll("*","").split(" ");
        
        if(split[0].includes(">") || split[0] == ""){
          path = split[1];
        }else{
          path = split[0];
        }
        
        //title = split[split.length-1];
        title = lines[l].replaceAll("–","-").split(" - ")[1];
        
        pathType = "id";
        
      }else if(line.substring(1).includes(">")){
        //Title path
        
        confidence ++;
        
        var str = line.replaceAll("*","").replaceAll(" ","");
        var split = str.split(">");
        
        if(line.substr(0,2) == "> " || split[0] == ""){
          path = str.substring(1);
        }else{
          path = str;
        }
        
        title = split[split.length-1];
        
        pathType = "title";
        
      }else{
        
        if(line.includes("-")){
          
          var split = line.replaceAll("*","").replaceAll(" ","").replaceAll(">","").split("-");
          
          path = split[0];
          title = split[1];
          pathType = "id";
          
        }else{
          
          var str = line.replaceAll("*","").replaceAll(" ","").replaceAll(">","");
          
          path = str;
          title = str;
          pathType = "title";
          
        }
        
      }
      
      if(path != "" && title != "" && confidence >= 2){
        
        lineType = "path";
        
        //If the current line is a path, there should be enough information to add a new modification to the list
        
        modifications.push({
          type: modType,
          path: path,
          pathType: pathType,
          title: title,
          content: ""
        });
        
        if(modType == "misc"){
          modifications[modifications.length-1].path = undefined;
          modifications[modifications.length-1].pathType = undefined;
          modifications[modifications.length-1].title = undefined;
          modifications[modifications.length-1].content = lines[l]+"\n";
        }else if(modType == "del"){
          modifications[modifications.length-1].content = undefined;
          modifications[modifications.length-1].title = undefined;
        }
        
      }
      
    }
    
    
    //Anything else should be content
    if(lineType == ""){
      
      confidence = 0;
      
      lineType = "content";
      
      modifications[modifications.length-1].content += lines[l] + "\n";
      
    }
    
  }
  
  //Clean up the content
  for(var m = 0;m < modifications.length;m ++){
    
    if(modifications[m].content != undefined){
      
      var arr = modifications[m].content.split("\n");
      
      var reachedContent = false;
      
      for(var a = arr.length-1;a >= 0;a --){
        
        if(!reachedContent && (arr[a] == "" || arr[a] == " ")){
          //Remove unnecessary newlines
          arr.pop();
          
        }else{
          reachedContent = true;
          
          //Remove trailing spaces
          arr[a] = arr[a].trim();
          
        }
        
      }
      
      modifications[m].content = arr.join("\n");
      
      //Replace currency symbol
      modifications[m].content = modifications[m].content.replaceAll("*~~m~~*","<m>").replaceAll("~~*m*~~","<m>").replaceAll("~~m~~","<m>").replaceAll(" <m>","<m>");
      
      //Replace different apostrophes and quotes
      modifications[m].content = modifications[m].content.replaceAll("“","\"").replaceAll("”","\"").replaceAll("‘","'").replaceAll("’","'");
      
    }
    
  }
  
  return modifications;
  
}

/**
 * Apply a list of modifications to the rule tree.
 * @param {object} modifications List of modifications to apply to the tree
 * @param {object} data Extra data such as the author and pass timestamp
 * @param {object} rawRules The rule tree as it is stored in rules.json
 * @param {boolean} tag Whether or not to add a tag to modified rules in the tree
 * @returns {object} New rule tree
 */
var modifyRuleTree = (modifications, data, rawRules, tag) => {
  
  var newRules = new Rule( JSON.parse(JSON.stringify(rawRules)) );
  
  var author = data.author;
  var timestamp = data.timestamp;
  
  var largestID = newRules.getLargestID();
  
  for(var m = 0;m < modifications.length;m ++){
    
    var type = modifications[m].type;
    var path = modifications[m].path;
    var pathType = modifications[m].pathType;
    var title = modifications[m].title;
    var content = modifications[m].content;
    
    if(type == "add"){
      
      var relID = undefined;
      var parent;
      
      //console.log(path);
      
      if(pathType == "id"){
        
        var splitPath = path.split(".");
        
        if(splitPath.length == 1){
          relID = parseInt(splitPath[0]);
          parent = newRules;
        }else{
          relID = parseInt(splitPath.pop(), 10);
          parent = newRules.getRuleByIDPath( splitPath.join(".") );
        }
        
      }else if(pathType == "title"){
        
        var splitPath = path.split(">");
        
        if(splitPath.length == 1){
          parent = newRules;
        }else{
          splitPath.pop();
          parent = newRules.getRuleByTitlePath( splitPath.join(">") );
        }
        
      }
      
      //console.log("parent:",parent);
      
      if(parent == undefined){
        console.error("Parent is undefined");
        return;
      }
      
      if(relID != undefined){
        if(relID != parent.subrules.length + 1){
          console.warn("New rule relative ID does not match parent",modifications[m]);
        }
      }
      
      var newRule = {
        id: largestID + 1,
        relid: parent.subrules.length + 1,
        summary: title,
        content: content,
        tags: parent.tags,
        history: [{
          player: author,
          time: timestamp
        }],
        subrules: []
      };
      
      //Add the new rule to the parent's subrule list
      parent.subrules.push(new Rule(newRule, parent));
      
      largestID ++;
      
      //console.log("new rule:",parent.subrules[parent.subrules.length-1]);
      
      
    }else if(type.split("-")[0] == "edit"){
      
      var edits = type.split("-");
      edits.shift();
      
      var cedit = edits.includes("c"); //Content
      var pedit = edits.includes("p"); //Path
      var tedit = edits.includes("t"); //Title
      
      var rule = newRules.getRuleByPath(path, pathType);
      
      if(edits.length == 1){
        if(cedit){
          
          rule.content = content;
          
        }else if(pedit){
          
          var newPath = content.toLowerCase().replaceAll(" ","").replaceAll("*","");
          var newParent;
          var newRelID;
          
          console.log(newPath);
          
          if(newPath.includes(".")){
            
            var splitPath = newPath.split(".");
            newRelID = parseInt(splitPath.pop(), 10);
            newParent = newRules.getRuleByIDPath( splitPath.join(".") );
            
          }else if(newPath.includes(">")){
            
            var splitPath = newPath.split(">");
            splitPath.pop();
            newParent = newRules.getRuleByTitlePath( splitPath.join(">") );
            
          }else{
            
            newParent = newRules;
            
          }
          
          console.log("rule",rule);
          console.log("newParent",newParent);
          
          //Remove the rule from its old parent's subrule list
          var rulePos = rule.relid-1;
          rule.parent.subrules.splice(rulePos,1);
          for(var sr = rulePos;sr < rule.parent.subrules.length;sr ++){
            rule.parent.subrules[sr].relid --;
          }
          
          //Update the rule's relative ID
          rule.relid = newParent.subrules.length + 1;
          rule.parent = newParent;
          
          //Add the rule to the new parent's subrule list
          newParent.subrules.push(rule);
          
        }else if(tedit){
          
          rule.title = title;
          
        }
      }else if(edits.length == 3){
        console.warn("Unimplemented - All edit types");
      }else{
        console.warn("Unimplemented - Two edit types");
      }
      
      //Update history
      rule.history.push({
        player: author,
        time: timestamp
      });
      
    }else if(type == "del"){
      
      var rule = newRules.getRuleByPath(path, pathType);
      var parent = rule.parent;
      
      var rulePos = rule.relid-1;
      
      parent.subrules.splice(rulePos,1);
      for(var sr = rulePos;sr < parent.subrules.length;sr ++){
        parent.subrules[sr].relid --;
      }
      
    }else if(type == "app"){
      
      var rule = newRules.getRuleByPath(path, pathType);
          
      rule.content += content;
      
    }else if(type == "trans"){
      
      console.warn("Unimplemented - Transpose");
      
    }else if(type == "misc"){
      
      console.log("Cannot apply miscellaneous edit");
      
    }else{
      
      console.warn("Unknown modification type - Unable to apply to tree");
      
    }
    
  }
  
  ///Parse individual rule modifications
  /// Account for [table] and [image]
  /// Remove trailing spaces on lines (replace all " \n" with "\n")
  /// Remove trailing (or otherwise unecessary) newlines
  
  return newRules;
  
}



//This is here so that I use these functions as a NodeJS module or in a webpage
try {
  exports.parse = parse;
  exports.modifyRuleTree = modifyRuleTree;
} catch(err) {
  //Do nothing
}

