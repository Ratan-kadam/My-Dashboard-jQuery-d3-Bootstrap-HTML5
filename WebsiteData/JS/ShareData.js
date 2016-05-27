var sharedObj={};
sharedObj.sample=1;
$.support.cors = true;
function showsnap() {
   // alert("clicked show snap");
    document.getElementById("myPopUp").classList.remove("hidePopUp");
    document.getElementById("myPopUp").classList.add("showPopUp");
}

function closePopUp(){
      document.getElementById("myPopUp").classList.remove("showPopUp");
       document.getElementById("myPopUp").classList.add("hidePopUp"); 
}




function loadHeatfromPopUp() {
    closePopUp();
    loadHeat();
  //  alert("load !");
}

function loadBikeAnalysis1() {
    closePopUp();
  loadBikeAnalysis();
  //  alert("load !");
}


function loadChord123() {
      closePopUp();
    loadChord();
}

function load3DCluster1() {
      closePopUp();
   load3DCluster();
}

function loadRealTimeMap1() {
      closePopUp();
    loadRealTimeMap();
}

function loadRealTimeAnalysis1() {
      closePopUp();
  loadRealTimeAnalysis();
}

function loadStartingEndingTrips1() {
      closePopUp();
   loadStartingEndingTrips();
}

function loadTripsStationsRevenue1() {
      closePopUp();
  loadTripsStationsRevenue();
}

function loadMonthlyDailyHourly1() {
      closePopUp();
    loadMonthlyDailyHourly();
}

function loadTopFiveAnalysis1() {
      closePopUp();
  loadTopFiveAnalysis();
}

function loadUserDocksStationsTrips1() {
      closePopUp();
  loadUserDocksStationsTrips();
}

function loadWeather1() {
      closePopUp();
  loadWeather();
}

//alert("executed");