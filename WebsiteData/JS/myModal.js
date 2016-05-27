$('#myProject1').click(function(){
     window.location="/subscriber/startingEndingTrips.html";
});
    
    $('#myProject2').click(function(){
    window.location="/heatmap/heatmap.html";
});
    
      $('#myProject3').click(function(){
    window.location="/bikeTrips/bikeTrips.html";
           
});
    
      $('#myProject4').click(function(){
    window.location="/stationTripsMap/index.html";
});
    
     $('#myProject6').click(function(){
      window.location="/cluster/3d/cluster3d.html";
});

//
  $('#myProject7').click(function(){
      window.location="/VirtualRealData/virtualRealData.html";
          //alert("loading virtual rela");
  });
//
    
     $("#nav").on("click","#ShowG",function(){
       $("#HeatShowOtherGraphs").removeClass("hideMe").fadeIn(700);
        
    });

    
    $("#HeatShowOtherGraphs").on("click","#modalCross",function(){
        $("#HeatShowOtherGraphs").addClass("hideMe").fadeOut(700);
        
    });

 $('#myProject5').click(function(){
      window.location="/chord/chord.html";
});


                         