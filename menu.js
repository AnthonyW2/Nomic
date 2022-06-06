/**
 * Handle the menu and settings on every page
 * 
 * @author Anthony Wilson
 */



"use strict";

//Get the style properties of the root element
var rootElement = document.querySelector(":root");
var rootCSS = getComputedStyle(rootElement);


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



//Change the color-scheme of the page depending on what the user has selected in the menu
var updateColorScheme = () => {
  
  //Check if the overflow menu is open, abort if it's not
  if(document.getElementById("nav-menu-btn").getAttribute("menuopen") != "true"){
    return;
  }
  
  var colorSchemeSelect = document.getElementById("settings-color-scheme-select");
  
  var theme = parseInt(colorSchemeSelect.value, 10);
  
  changeColorScheme(theme);
  
}


//Change the color-scheme of the page
var changeColorScheme = (theme) => {
  
  //A list of all the CSS variables that need changing
  var colorNames = ["BG1","BG2","BG3","BG4","Text1","Text2","Symbol","Border","LinkText"];
  
  //Loop through all the main colors and change them
  for(var a = 0;a < colorNames.length;a ++){
    var newColor = rootCSS.getPropertyValue("--" + colorNames[a] + "-"+colorThemes[theme]);
    rootElement.style.setProperty("--" + colorNames[a], newColor);
  }
  
  //Store the theme as a cookie for use after the page reloads or on other pages
  document.cookie = "colortheme="+colorThemes[theme]+"; SameSite=Lax;";
  
  if(theme < 2){
    
    //Test the selected theme against the browser's preferred color-scheme, and use the "default" if it matches
    if(window.matchMedia("(prefers-color-scheme: "+colorThemes[theme]+")").matches){
      document.cookie = "colortheme=default; SameSite=Lax;";
    }
    
  }
  
  console.log("Changed to "+colorThemes[theme]+" color theme");
  
}



//Change the font theme of the page depending on what the user has selected in the menu
var updateFontTheme = () => {
  
  //Check if the overflow menu is open, abort if it's not
  if(document.getElementById("nav-menu-btn").getAttribute("menuopen") != "true"){
    return;
  }
  
  var fontThemeSelect = document.getElementById("settings-font-theme-select");
  
  var theme = parseInt(fontThemeSelect.value, 10);
  
  changeFontTheme(theme);
  
}


//Change the font theme of the page
var changeFontTheme = (theme) => {
  
  //Change the font
  var newFont = rootCSS.getPropertyValue("--Font-"+fontThemes[theme]);
  rootElement.style.setProperty("--Font", newFont);
  
  
  //Store the theme as a cookie for use after the page reloads or on other pages
  document.cookie = "fonttheme="+fontThemes[theme]+"; SameSite=Lax;";
  
  console.log("Changed to "+fontThemes[theme]+" font theme");
  
}


//Warn a user that theme switching doesn't work properly if the theme is changed on a page other than the main page
var themeSwitchWarning = () => {
  
  alert("Warning: Your colour or font theme will not save properly if you change it on any page other than the main page.");
  
}


