// js file for BattleOfThePlates.html

var goalCount = 2;
// updating goals

//removing goals
function testing(id){

  var r = confirm("Are you sure you want to delete goal?");
  if (r==true){
  $(id).remove();
  goalCount--;
}

}

function addGoal(){

  goalCount++;
  var title = $("#title").val();
  var description = $("#description").val();
  var className = 'g'+goalCount;
  var el = "."+className;

  var add = '<li class="'+className+' ui-li-static ui-body-inherit">'+
  '<div class="ui-checkbox">'+
  '<label for="'+goalCount+'" class="ui-btn ui-corner-all ui-btn-inherit '+
  'ui-btn-icon-left ui-checkbox-off">'+title+'</label>'+
  '<input class="mycheckbox" type="checkbox" id="'+goalCount+'">'+
  '</div>'+
  '<h4>'+description+'</h4></li>';

  var add2 = '<li class = "'+className+' ui-li-static ui-body-inherit '+
  'ui-first-child"><h3>'+
  '<a href ="" onclick="testing('+"'"+el+"'"+');" data-role="button"'+
  ' data-inline="false" data-icon="minus" '+
  'class="ui-link ui-btn ui-icon-minus ui-btn-icon-left ui-shadow '+
  'ui-corner-all" role="button">'+title+'</a></h3><h4>'+description+
  '</h4></li>';

    $("#a2").after(add);
    $("#b2").after(add2);
}

// --------------HOME + MORE INFO -----------
var previous = 0;

function highlight(el){
  if (previous!=0) previous.style.border='none';
  el.style.border='2px solid white';
  previous = el;
}


function setFood(foodgroup){
  currentFood=foodgroup;
  // alert(currentFood);
  updateOptions();
  updateUnit();
}

function updateUnit(){
  if (currentFood=="grains" || currentFood=="protein") unit = "1 ounce";
  else unit = "0.5 cup";
  document.getElementById("add").innerHTML = unit;
  document.getElementById("subtract").innerHTML = unit;
}

function updateOptions(){
  //update the image
  document.getElementById("foodgroup").src="images/"+currentFood+".png";
  //update button increments

  //update more info link
  updateMoreInfo();
}


//when food group is selected, update the link in the more info button
function updateMoreInfo(){
  var link = "moreinfo"+currentFood;
  // alert(link);
  document.getElementById("moreinfobutton").href="#"+link;
}

//increment serving recorded
function plus(){
  document.getElementById("addAlert").innerHTML = "";

  if (currentFood=="fruit" && fruitCount<fruitGoal) fruitCount++;
  else if (currentFood=="vegetable" && vegetableCount<vegetableGoal) vegetableCount++;
  else if (currentFood=="grain" && grainCount<grainGoal) grainCount++;
  else if (currentFood=="protein" && proteinCount<proteinGoal) proteinCount++;
  else if (currentFood=="dairy" && dairyCount<dairyGoal) dairyCount++;
  else document.getElementById("addAlert").innerHTML = "You have obtained your daily recommended intake!";
  //somehow update graphic of plate
  updatePlate();
  updateProgress();
}

//decrease serving recorded
function minus(){
  document.getElementById("addAlert").innerHTML = "";

  if (currentFood=="fruit" && fruitCount>0) fruitCount--;
  else if (currentFood=="vegetable" && vegetableCount>0) vegetableCount--;
  else if (currentFood=="grain" && grainCount>0) grainCount--;
  else if (currentFood=="protein" && proteinCount>0) proteinCount--;
  else if (currentFood=="dairy" && dairyCount>0) dairyCount--;
  else document.getElementById("addAlert").innerHTML = "You have 0 servings recorded!";
  //somehow update graphic of plate
  updatePlate();
  updateProgress();
}

function updateProgress(){
  var el = document.getElementById("progress"+currentFood);

  var progress;
  if (currentFood=="fruit") progress=fruitCount;
  else if (currentFood=="vegetable") progress=vegetableCount;
  else if (currentFood=="grain") progress=grainCount;
  else if (currentFood=="protein") progress=proteinCount;
  else progress=dairyCount;

  var count = currentFood+"Count";

  var goal;
  if (currentFood=="fruit") goal=fruitGoal;
  else if (currentFood=="vegetable") goal=vegetableGoal;
  else if (currentFood=="grain") goal=grainGoal;
  else if (currentFood=="protein") goal=proteinGoal;
  else goal=dairyGoal;

  // alert(progress+" "+goal);
  // alert(progress/goal);
  // var portion = 100*(count/goal);
  // alert(Number(portion));

  var portion = 90*(progress/goal);
  el.style.width = portion+"vw";
}


//update the portion of the plate that has been incremented;
//helper fnc
function updatePlate(){
  var progress;
  if (currentFood=="fruit") progress=fruitCount;
  else if (currentFood=="vegetable") progress=vegetableCount;
  else if (currentFood=="grain") progress=grainCount;
  else if (currentFood=="protein") progress=proteinCount;
  // else if (currentFood=="dairy") progress=dairyCount;
  else progress=dairyCount;

  var link = currentFood+"plate";
  // alert(progress + link);
  document.getElementById(currentFood).src="plate/"+link+progress+".png";
}

// --------------Profile + Personal Goals -----------
