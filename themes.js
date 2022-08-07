/**
 * Handle the menu and settings on every page
 * 
 * @author Anthony Wilson
 */



"use strict";

//Get the style properties of the root element
var rootElement = document.querySelector(":root");
var rootCSS = getComputedStyle(rootElement);


//Color themes available on the site
const colorThemes = [
  {
    name: "Light",
    colors: [
      "#FFFFFF", //BG-Main   (BG1)
      "#F0F2F5", //BG-Input   (BG2)
      "#EAEBEE", //BG-Input-Hover   (BG3)
      "#E4E4E7", //BG-Input-Focus   (BG4)
      "#EAEBEE", //BG-Menu   (BG3)
      "#FFFFFF", //BG-Submenu   (BG1)
      "#F0F2F5", //BG-Vote-Tag   (BG2)
      "#1F1F1F", //Text   (Text1)
      "#1A0DAB", //Text-Link   (LinkText)
      "#303030", //Text-Alt   (Text2)
      "#1F1F1F", //Text-Input   (Text1)
      "#1F1F1F", //Text-Input-Hover   (Text1)
      "#1F1F1F", //Text-Input-Focus   (Text1)
      "#545F73", //Symbol   (Symbol)
      "#B8B8B8"  //Border   (Border)
    ]
  },
  {
    name: "Dark",
    colors: [
      "#1E2228", //BG-Main
      "#2D333B", //BG-Input
      "#272D34", //BG-Input-Hover
      "#22272E", //BG-Input-Focus
      "#272D34", //BG-Menu
      "#1E2228", //BG-Submenu
      "#2D333B", //BG-Vote-Tag
      "#CDD9E5", //Text
      "#6997F4", //Text-Link
      "#ADBAC7", //Text-Alt
      "#CDD9E5", //Text-Input
      "#CDD9E5", //Text-Input-Hover
      "#CDD9E5", //Text-Input-Focus
      "#ADBAC7", //Symbol
      "#434B55"  //Border
    ]
  },
  {
    name: "Cornfield",
    colors: [
      "#B4CF66", //BG-Main
      "#FFEC5C", //BG-Input
      "#FFD25C", //BG-Input-Hover
      "#FFBD5C", //BG-Input-Focus
      "#FFD25C", //BG-Menu
      "#B4CF66", //BG-Submenu
      "#FFEC5C", //BG-Vote-Tag
      "#146152", //Text
      "#44803F", //Text-Link
      "#44803F", //Text-Alt
      "#146152", //Text-Input
      "#146152", //Text-Input-Hover
      "#146152", //Text-Input-Focus
      "#44803F", //Symbol
      "#FF5A33"  //Border
    ]
  },
  {
    name: "Eye-Searing Neon",
    colors: [
      "#77F000", //BG-Main
      "#77F000", //BG-Input
      "#69D100", //BG-Input-Hover
      "#58B000", //BG-Input-Focus
      "#69D100", //BG-Menu
      "#77F000", //BG-Submenu
      "#77F000", //BG-Vote-Tag
      "#FF00FF", //Text
      "#D300DC", //Text-Link
      "#D300DC", //Text-Alt
      "#FF00FF", //Text-Input
      "#FF00FF", //Text-Input-Hover
      "#FF00FF", //Text-Input-Focus
      "#D300DC", //Symbol
      "#69D100"  //Border
    ]
  },
  {
    name: "Layan",
    colors: [
      "#252433", //BG-Main
      "#252433", //BG-Input
      "#5B48CC", //BG-Input-Hover
      "#5B48CC", //BG-Input-Focus
      "#252433", //BG-Menu
      "#252433", //BG-Submenu
      "#323046", //BG-Vote-Tag
      "#FFFFFF", //Text
      "#5657F5", //Text-Link
      "#C7C5D8", //Text-Alt
      "#FFFFFF", //Text-Input
      "#FFFFFF", //Text-Input-Hover
      "#FFFFFF", //Text-Input-Focus
      "#C7C5D8", //Symbol
      "#5B48CC"  //Border
    ]
  },
  {
    name: "Mint",
    colors: [
      "#1e2228", //BG-Main
      "#1e2228", //BG-Input
      "#1fbc9d", //BG-Input-Hover
      "#1fbc9d", //BG-Input-Focus
      "#1e2228", //BG-Menu
      "#1e2228", //BG-Submenu
      "#2e353f", //BG-Vote-Tag
      "#2dcca7", //Text
      "#03c0c1", //Text-Link
      "#1fbc9d", //Text-Alt
      "#2dcca7", //Text-Input
      "#1e2228", //Text-Input-Hover
      "#1e2228", //Text-Input-Focus
      "#1fbc9d", //Symbol
      "#1fbc9d"  //Border
    ]
  },
  {
    name: "Seagulls",
    colors: [
      "#f6f6f6", //BG-Main
      "#a7cdcc", //BG-Input
      "#f87d09", //BG-Input-Hover
      "#f87d09", //BG-Input-Focus
      "#f87d09", //BG-Menu
      "#f6f6f6", //BG-Submenu
      "#a7cdcc", //BG-Vote-Tag
      "#004a55", //Text
      "#f87d09", //Text-Link
      "#004a55", //Text-Alt
      "#004a55", //Text-Input
      "#004a55", //Text-Input-Hover
      "#004a55", //Text-Input-Focus
      "#004a55", //Symbol
      "#004a55"  //Border
    ]
  },
  {
    name: "Electric",
    colors: [
      "#151241", //BG-Main
      "#151241", //BG-Input
      "#2c75ff", //BG-Input-Hover
      "#c6fcff", //BG-Input-Focus
      "#151241", //BG-Menu
      "#151241", //BG-Submenu
      "#1b1752", //BG-Vote-Tag
      "#7df9ff", //Text
      "#2c75ff", //Text-Link
      "#7df9ff", //Text-Alt
      "#7df9ff", //Text-Input
      "#7df9ff", //Text-Input-Hover
      "#151241", //Text-Input-Focus
      "#7df9ff", //Symbol
      "#7df9ff"  //Border
    ]
  },
  {
    name: "Fish Scales",
    colors: [
      "#6FDFDF", //BG-Main
      "#6FDFDF", //BG-Input
      "#4B7BE5", //BG-Input-Hover
      "#A85CF9", //BG-Input-Focus
      "#6FDFDF", //BG-Menu
      "#6FDFDF", //BG-Submenu
      "#A85CF9", //BG-Vote-Tag
      "#4B7BE5", //Text
      "#A85CF9", //Text-Link
      "#4B7BE5", //Text-Alt
      "#4B7BE5", //Text-Input
      "#6FDFDF", //Text-Input-Hover
      "#6FDFDF", //Text-Input-Focus
      "#4B7BE5", //Symbol
      "#5534A5"  //Border
    ]
  },
  {
    name: "Watermelon",
    colors: [
      "#F7F5DD", //BG-Main
      "#E2979C", //BG-Input
      "#A10035", //BG-Input-Hover
      "#A10035", //BG-Input-Focus
      "#A10035", //BG-Menu
      "#F7F5DD", //BG-Submenu
      "#E2979C", //BG-Vote-Tag
      "#9BDEAC", //Text
      "#E7305B", //Text-Link
      "#9BDEAC", //Text-Alt
      "#9BDEAC", //Text-Input
      "#9BDEAC", //Text-Input-Hover
      "#9BDEAC", //Text-Input-Focus
      "#9BDEAC", //Symbol
      "#E7305B"  //Border
    ]
  }
];

const fontThemes = [
  "default",
  "serif",
  "sans-serif",
  "comic-sans"
];



//Change the color-theme of the page depending on what the user has selected in the menu
var updateColorTheme = () => {
  
  //Check if the overflow menu is open, abort if it's not
  if(document.getElementById("nav-menu-btn").getAttribute("menuopen") != "true"){
    return;
  }
  
  var colorThemeSelect = document.getElementById("settings-color-theme-select");
  
  var theme = parseInt(colorThemeSelect.value, 10);
  
  changeColorTheme(theme);
  
}


//Change the color-theme of the page
var changeColorTheme = (theme) => {
  
  var varNames = [
    "BG-Main",          //Main BG
    "BG-Input",         //Button, textbox, select
    "BG-Input-Hover",   //Button, textbox, select
    "BG-Input-Focus",   //Button, textbox, select
    "BG-Menu",          //Box with text, overflow menu
    "BG-Submenu",       //Settings in overflow menu or elsewhere
    "BG-Vote-Tag",      //Vote icons and rule tags
    "Text",             //Main text
    "Text-Link",        //Link text
    "Text-Alt",         //Textbox placeholder
    "Text-Input",       //Button, textbox, select
    "Text-Input-Hover", //Button, textbox, select
    "Text-Input-Focus", //Button, textbox, select
    "Symbol",           //Unused
    "Border"            //Border
  ];
  
  //Loop through all the main colors and change them
  for(var v = 0;v < varNames.length;v ++){
    //var newColor = rootCSS.getPropertyValue("--" + varNames[v] + "-"+colorThemes[theme].name);
    rootElement.style.setProperty("--" + varNames[v], colorThemes[theme].colors[v]);
  }
  
  //Store the theme as a cookie for use after the page reloads or on other pages
  //document.cookie = "colortheme="+colorThemes[theme].name+"; SameSite=Lax;";
  document.cookie = "colortheme="+theme+"; SameSite=Lax;";
  
  if(theme < 2){
    
    //Test the selected theme against the browser's preferred color-scheme, and use the "default" if it matches
    if(window.matchMedia("(prefers-color-scheme: "+colorThemes[theme].name.toLowerCase()+")").matches){
      document.cookie = "colortheme=default; SameSite=Lax;";
    }
    
  }
  
  console.log("Changed to "+colorThemes[theme].name+" color theme");
  
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



//Apply the user's preferred color/font themes
var ApplyThemes = () => {
  
  //Split the cookies into an array
  var cookies = document.cookie.split("; ");
  
  //Loop through cookies
  for(var c = 0;c < cookies.length;c ++){
    
    var cookie = cookies[c].split("=");
    
    //Check if the cookie is the one storing the theme
    if(cookie[0] == "colortheme"){
      
      //Loop through the possible color themes
      for(var t = 0;t < colorThemes.length;t ++){
        
        //Set the color theme is the value of the theme cookie matches the theme
        if(cookie[1] == t){
          
          //Update the color theme
          changeColorTheme(t);
          
          //Set the option that is selected in the overflow menu
          document.getElementById("settings-color-theme-select").value = t;
          
        }else if(cookie[1] == "default"){
          
          var defaultTheme = 0;
          if(window.matchMedia("(prefers-color-scheme: light)").matches){
            defaultTheme = 0;
          }else{
            defaultTheme = 1;
          }
          
          //Update the color theme
          changeColorTheme(defaultTheme);
          
          //Set the option that is selected in the overflow menu
          document.getElementById("settings-color-theme-select").value = defaultTheme;
          
        }
        
      }
      
    }else if(cookie[0] == "fonttheme"){
      
      //Loop through the possible font themes
      for(var t = 0;t < fontThemes.length;t ++){
        
        //Set the color theme is the value of the theme cookie matches the theme
        if(cookie[1] == fontThemes[t]){
          //Update the font theme
          changeFontTheme(t);
          
          //Set the option that is selected in the overflow menu
          document.getElementById("settings-font-theme-select").value = t;
        }
        
      }
      
    }
    
  }
  
}



//Warn a user that theme switching doesn't work properly if the theme is changed on a page other than the main page
var themeSwitchWarning = () => {
  
  alert("Warning: Your colour or font theme will not save properly if you change it on any page other than the main page.");
  
}
