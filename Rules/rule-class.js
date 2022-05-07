/*
Anthony Wilson

Nomic Automation System

Definition of the Rule class for use both in Nomic Bot and on the website
*/

"use strict";

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

//This is here so that I use the Rule class as a NodeJS module or use it in a webpage
try{
  exports.Rule = Rule;
}catch(err){
  //Do nothing
}

