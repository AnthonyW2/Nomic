/*
Anthony Wilson

Nomic Automation System

JavaScript functions used by the Rules page

2022-4-7 - 2022-5-2
*/

//Store a reference to the rules-list element
var rulesListElement;

var rules = [];

//Run when the body finishes loading
var LoadRules = () => {
  
  //Get the reference to the rules-list element
  rulesListElement = document.getElementById("rules-list");
  
  
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = () => {
    
    //Test if the request is finished
    if(xmlhttp.readyState == 4){
      
      //Test if the status resolved to 200
      if(xmlhttp.status == 200){
        
        rules = JSON.parse(xmlhttp.responseText);
        
        console.log(xmlhttp.responseText);
        
        DisplayRules();
        
      }else{
        
        console.error("Failed to retrieve rules from rules.json");
        
      }
      
    }
    
    console.log(xmlhttp.readyState);
    
  }
  
  xmlhttp.open("GET", "rules.json", true);
  xmlhttp.send();
  
}

var DisplayRules = () => {
  
  console.log(rules);
  
  for(var r = 0;r < rules.length;r ++){
    
    rulesListElement.innerHTML += r+": "+rules[r].content+"<br>";
    
  }
  
}
