/**
 * Definition of the Rule class for use both in Nomic Bot and on the website
 * 
 * @author Anthony Wilson
 */



"use strict";

/**
 * The object which stores all rules and methods for working with rules
 * @param {string} json Raw rule data from rules.json
 * @property {array} rules List of Rule objects
 */
class RuleSet {
  
  //The RuleSet constructor takes the raw rule data from rules.json and generates a list of Rule objects
  constructor(json) {
    
    var parsed = JSON.parse(json);
    
    this.rules = [];
    
    for(var r = 0;r < parsed.length;r ++){
      
      this.rules.push(new Rule(parsed[r]));
      
    }
    
  }
  
  /**
   * Generate the raw (JSON-compatible) ruleset
   * @returns {object} JSON-compatible ruleset data
   */
  getRaw() {
    
    var output = [];
    
    for(var r = 0;r < this.rules.length;r ++){
      
      output.push(this.rules[r].getRaw());
      
    }
    
    return output;
    
  }
  
  /**
   * Get a list of rules with a matching tag
   * @param {string} tag Tag string to match
   * @returns {array} Array of rules
   */
  getRulesByTag(tag){
    
    var output = [];
    
    for(var r = 0;r < this.rules.length;r ++){
      
      if(this.rules[r].tags.includes(tag)){
        output.push(this.rules[r]);
      }
      
    }
    
    return output;
    
  }
  
  /**
   * Get a list of rules that match a condition related to how a player has modified them
   * @param {int} authorID Player ID of the author
   * @param {boolean} modified If true, match all rules modified by the given author
   * @param {boolean} created If true, match all rules originally created by the given author
   * @param {boolean} lastChanged If true, match all rules that were last modified by the given author
   * @returns {array} Array of rules matching the conditions
   */
  getRulesByAuthor(authorID, modified, created, lastChanged){
    
    var output = [];
    
    for(var r = 0;r < this.rules.length;r ++){
      
      if(modified){
        
        for(var m = 0;m < this.rules[r].history.length;m ++){
          
          if(this.rules[r].history[m].player == authorID){
            output.push(this.rules[r]);
            m = this.rules[r].history.length;
          }
          
        }
        
      }else{
        
        if(created && this.rules[r].history[0].player == authorID){
          output.push(this.rules[r]);
        }else if(lastChanged && this.rules[r].history[this.rules[r].history.length-1].player == authorID){
          output.push(this.rules[r]);
        }
        
      }
      
    }
    
    return output;
    
  }
  
  /**
   * Get a list of rules that have been modified/created/last-changed within a specified time range
   * @param {int} tmin Earliest timestamp in range
   * @param {int} tmax Latest timestamp in range
   * @param {boolean} modified If true, match all rules modified in the given time range
   * @param {boolean} created If true, match all rules originally created in the given time range
   * @param {boolean} lastChanged If true, match all rules that were last modified in the given time range
   * @returns {array} Array of rules matching the conditions
   */
  getRulesByTime(tmin, tmax, modified, created, lastChanged){
    
    var output = [];
    
    for(var r = 0;r < this.rules.length;r ++){
      
      
      
    }
    
    return output;
    
  }
  
}

/**
 * A singular rule
 * @param {object} obj Rule data parsed from rules.json
 * @property {int} id This rule's unique ID
 * @property {string} summary The title of this rule
 * @property {string} content The content of the rule
 * @property {array} tags Array of strings describing the "tags" that this rule has
 * @property {array} history Array of objects describing the modification history of the rule
 */
class Rule {
  
  //The Rule constructor takes data from the raw JSON
  constructor(obj) {
    
    ///console.log(obj);
    
    this.id = obj.id;
    this.summary = obj.summary;
    this.content = obj.content;
    this.tags = obj.tags;
    
    this.history = obj.history;
    
  }
  
  //Generate the raw (JSON-compatible) rule tree
  getRaw() {
    
    var output = {
      id: this.id,
      summary: this.summary,
      content: this.content,
      tags: this.tags,
      history: this.history
    };
    
    return output;
    
  }
  
}

//This is here so that I can use the Rule class as a NodeJS module or use it in a webpage
try {
  exports.Rule = Rule;
} catch(err) {
  //Do nothing
}

