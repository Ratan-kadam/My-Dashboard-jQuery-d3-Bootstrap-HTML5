$(document).ready(function() {
$('#myNav').load('/WebsiteData/HTML/Templates/nav.html');  
$('#x1').load('/WebsiteData/HTML/Templates/sample.html');
    //$('#x1').load('/realtime/realtime.html');
$("#HeatShowOtherGraphs").load('/WebsiteData/HTML/Templates/myModal.html');
    $.getScript('/WebsiteData/JS/myModal.js',function(){
    console.log("modal script loaded..");
    });
    
//$('#x2').load('/WebsiteData/HTML/Templates/maps.html');
    
$('#myProject1').click(function(){
     window.location="/subscriber/startingEndingTrips.html";
});
    
    $('#myProject2').click(function(){
    window.location="/heatmap/heatmap.html";
});
    
      $('#myProject3').click(function(){
  //  window.location="/cluster/cluster.html";
           window.location="/bikeTrips/bikeTrips.html";
});
    
      $('#myProject4').click(function(){
    window.location="/stationTripsMap/index.html";
         
});
    
     $('#myProject6').click(function(){
      window.location="/cluster/3d/cluster3d.html";
});
    
     $('#myProject5').click(function(){
      window.location="/chord/chord.html";
});
    
 $('#myProject7').click(function(){
      window.location="/VirtualRealData/virtualRealData.html";
          //alert("loading virtual rela");
  });
    
      $("#nav").on("click","#ShowG",function(){
       $("#HeatShowOtherGraphs").removeClass("hideMe").fadeIn(700);
          alert("clicked");
        
    });

    
    $("#HeatShowOtherGraphs").on("click","#modalCross",function(){
        $("#HeatShowOtherGraphs").addClass("hideMe").fadeOut(700);
        
    });
   
// Tabbed HTML logic 
    $('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})
// completed Tabbed HTML completed
});