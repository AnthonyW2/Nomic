/**
 * Definition of the Rule class for use both in Nomic Bot and on the website
 * 
 * @author Anthony Wilson
 */



"use strict";

class Rule {
  
  //The Rule constructor takes the raw rule tree from rules.json and a reference to its parent
  constructor(obj, parent) {
    
    ///console.log(obj);
    
    this.parent = parent;
    
    this.id = obj.id;
    this.relid = obj.relid;
    this.summary = obj.summary;
    this.content = obj.content;
    this.tags = obj.tags;
    
    this.history = obj.history;
    
    this.subrules = [];
    
    for(var r = 0;r < obj.subrules.length;r ++){
      
      if(obj.subrules[r].relid != r+1){
        console.warn("Mismatched relative rule ID");
      }
      
      this.subrules[r] = new Rule(obj.subrules[r], this);
      
    }
    
  }
  
  //Generate the raw (JSON-compatible) rule tree
  getRaw() {
    
    var output = {
      id: this.id,
      relid: this.relid,
      summary: this.summary,
      content: this.content,
      tags: this.tags,
      history: this.history,
      subrules: []
    };
    
    for(var sr = 0;sr < this.subrules.length;sr ++){
      
      output.subrules.push( this.subrules[sr].getRaw() );
      
    }
    
    return output;
    
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
  
  //Generate the relative ID path of this rule (x.y.z etc)
  getTitlePath() {
    
    //Return only a single title if this is the root rule
    if(this.parent == undefined) {
      return this.summary;
    }
    
    var path = this.parent.getTitlePath() + " > " + this.summary;
    
    return path;
    
  }
  
  //Get a reference to a rule using its relative path
  getRuleByPath(pathstr, type) {
    
    if(type == "id" || pathstr.includes(".")){
      return this.getRuleByIDPath(pathstr);
      
    }else if(type == "title" || pathstr.includes(">")){
      return this.getRuleByTitlePath(pathstr);
      
    }else{
      
      if(isNaN(pathstr)){
        return this.getRuleByTitlePath(pathstr);
      }else{
        return this.getRuleByIDPath(pathstr);
      }
      
    }
    
  }
  
  //Get a reference to a rule using its relative ID path
  getRuleByIDPath(pathstr) {
    
    var path = pathstr.split(".").map(relid => parseInt(relid, 10));
    
    //Store a reference to the current rule as the function navigates the tree
    var pointer = this;
    
    for(var r = 0;r < path.length;r ++){
      
      if(path[r]-1 >= pointer.subrules.length || pointer.subrules[ path[r]-1 ] == undefined){
        return undefined;
      }
      
      //Navigate down the tree, setting the pointer to the next rule
      pointer = pointer.subrules[ path[r]-1 ];
      
    }
    
    return pointer;
    
  }
  
  //Get a reference to a rule using its relative title path
  getRuleByTitlePath(pathstr) {
    
    var path = pathstr.replaceAll(" ","").toLowerCase().split(">");
    
    if(path[0] == "rules"){
      path.shift();
    }
    
    //Store a reference to the current rule as the function navigates the tree
    var pointer = this;
    
    //Navigate down the tree, setting the pointer to the next rule
    for(var r = 0;r < path.length;r ++){
      
      var found = false;
      
      //Loop through the subrules, trying to find a matching title
      for(var sr = 0;sr < pointer.subrules.length && !found;sr ++){
        
        if(pointer.subrules[sr].summary.replaceAll(" ","").toLowerCase() == path[r]){
          
          pointer = pointer.subrules[sr];
          found = true;
          
        }
        
      }
      
      if(!found){
        return undefined;
      }
      
    }
    
    return pointer;
    
  }
  
  getSubruleCount() {
    
    var count = this.subrules.length;
    
    for(var r = 0;r < this.subrules.length;r ++){
      
      count += this.subrules[r].getSubruleCount();
      
    }
    
    return count;
    
  }
  
  getLargestID() {
    
    var largest = this.id;
    
    for(var r = 0;r < this.subrules.length;r ++){
      
      var largestSubruleID = this.subrules[r].getLargestID();
      
      if(largestSubruleID > largest){
        largest = largestSubruleID;
      }
      
    }
    
    return largest;
    
  }
  
}

//This is here so that I use the Rule class as a NodeJS module or use it in a webpage
try {
  exports.Rule = Rule;
} catch(err) {
  //Do nothing
}

