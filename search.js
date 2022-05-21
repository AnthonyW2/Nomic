//The following functions handle search functionality on most pages



//Store element references
const searchBox = document.getElementById("nav-search");
const searchMenu = document.getElementById("search-menu");
//const searchDimmer = document.getElementById("search-dimmer");

//The XMLHttpRequest object needs a global reference
//var xmlhttp = undefined;

//var searchPathPrepend = "";



//Set up the search menu when the search by gets focus
function openSearchMenu(){
  
  searchMenu.hidden = false;
  
}

//Close the search menu when the search bar loses focus
function closeSearchMenu(){
  
  searchMenu.hidden = true;
  
}

//Called whenever a key is pressed while the search bar has focus
function updateSearch(){
  
  //Reset the search results
  searchMenu.innerHTML = "";
  
  if(searchBox.value == ""){
    
    searchMenu.style.height = "50px";
    
  }else{
    
    var search = searchBox.value;
    
  }
  
}

//Called when a search request ends. Displays search results to the user
function updateSearchResults(results){
  
  //Remove any blank entries
  for(var a = 0;a < results.length;a ++){
    if(results[a] == ""){
      results.splice(a,1);
      a --;
    }
  }
  
  //Reset the previous search results
  searchMenu.innerHTML = "";
  
  //Change the size of the search results window
  if(results.length > 10){
    searchMenu.style.height = 10+"em";
  }else if(results.length < 1){
    searchMenu.style.height = "auto";
    searchMenu.innerHTML = "No matches found";
  }else{
    searchMenu.style.height = "auto";
  }
  
  //Add the links to the search results box
  for(var a = 0;a < results.length;a ++){
    
    if(results[a].charAt(0) == "$"){
      //Classroom match
      searchMenu.innerHTML += "<a href=\"" + searchPathPrepend + "index.php?room=" + results[a].substr(1) + "\" class=\"inherit-color\">" + results[a].substr(1) + '</a><br>';
    }else if(results[a].charAt(0) == "#"){
      //Staff match
      var splitResult = results[a].split("$");
      searchMenu.innerHTML += "<a href=\"" + searchPathPrepend + "index.php?room=" + splitResult[1] + "\" class=\"inherit-color\"><span class=\"dim-text\">Staff: </span>" + splitResult[0].substr(1) + '</a><br>';
    }
  }
  
}
