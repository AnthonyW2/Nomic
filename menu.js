/**
 * Handle the menu and settings on every page
 * 
 * @author Anthony Wilson
 */



"use strict";


//Open/close the overflow menu
var toggleOverflowMenu = () => {
  
  const overflowMenu = document.getElementById("overflow-menu");
  
  var overflowBtn = document.getElementById("nav-menu-btn");
  var dimmer = document.getElementById("dimmer");
  
  //Check the value of the custom "settingsopen" attribute on the element
  if(overflowBtn.getAttribute("menuopen") == "true"){
    
    overflowBtn.setAttribute("menuopen", "false");
    overflowMenu.hidden = true;
    dimmer.hidden = true;
    
  }else{
    
    overflowBtn.setAttribute("menuopen", "true");
    overflowMenu.hidden = false;
    dimmer.hidden = false;
    
  }
  
}



//Add the options fo the color theme selector in the overflow menu
var populateColorThemeSelector = () => {
  
  var colorThemeSelect = document.getElementById("settings-color-theme-select");
  
  for(var t = 0;t < colorThemes.length;t ++){
    
    var option = document.createElement("option");
    
    option.value = t.toString();
    option.innerHTML = colorThemes[t].name;
    
    colorThemeSelect.appendChild(option);
    
  }
  
}


