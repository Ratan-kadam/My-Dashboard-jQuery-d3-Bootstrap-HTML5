var dataAnalysis;

function initliaze() {
	dataAnalysis = {
		"2014": {
			"San Francisco": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			},
			"San Jose": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			},
			"Palo Alto": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			},
			"Redwood City": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			},
			"Mountain View": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			}
		},
		"2015": {
			"San Francisco": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			},
			"San Jose": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			},
			"Palo Alto": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			},
			"Redwood City": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			},
			"Mountain View": {
				"trips": 0,
				"revenue": 0,
				"stations": 0
			}
		},
	}
}


function loadTrips(){
  //  alert("load Trips");
clearCssStack();
  //   alert("stack cleared "); 
    document.getElementById("trips-yearwise").classList.remove("hideMe");
    document.getElementById("trips-yearwise").classList.add("displayMe");
}

function loadStations(){
   //alert("load stations"); 
    clearCssStack();
   //     alert("load station");
    document.getElementById("stations-yearwise").classList.remove("hideMe");
    document.getElementById("stations-yearwise").classList.add("displayMe");
    //  alert("added display property");
   
    
}

function loadRevenue(){
   // alert("load revenue");
    clearCssStack();
   //  alert("stack cleared");
     document.getElementById("revenue-yearwise").classList.remove("hideMe");
     document.getElementById("revenue-yearwise").classList.add("displayMe");
     //alert("added display property");
                                                                  
}

function clearCssStack(){
     //
    document.getElementById("trips-yearwise").classList.remove("hideMe");
    document.getElementById("stations-yearwise").classList.remove("hideMe"); //dp
    document.getElementById("revenue-yearwise").classList.remove("hideMe"); //ad

    //
    document.getElementById("trips-yearwise").classList.remove("displayMe");
    document.getElementById("stations-yearwise").classList.remove("displayMe");
    document.getElementById("revenue-yearwise").classList.remove("displayMe");
    
    //
    document.getElementById("trips-yearwise").classList.add("hideMe");
    document.getElementById("stations-yearwise").classList.add("hideMe");
    document.getElementById("revenue-yearwise").classList.add("hideMe");
      
}

function loadDataYearWise() {

	//$.getJSON("http://52.39.148.231:3000/getData?filename=2015Monthwise", function(data) {
	$.getJSON("/WebsiteData/HTML/data/2015Monthwise.json", function(data) {
       // console.log("*********", JSON.stringify(data, null ,2));
		_.forEach(data, function(eachTrip) {
			dataAnalysis["2015"][eachTrip.city]["trips"] = dataAnalysis["2015"][eachTrip.city]["trips"] + eachTrip.trips;
		})
		//$.getJSON("http://52.39.148.231:3000/getData?filename=2014Monthwise", function(data) {
		$.getJSON("/WebsiteData/HTML/data/2014Monthwise.json", function(data) {
			_.forEach(data, function(eachTrip) {
				dataAnalysis["2014"][eachTrip.city]["trips"] = dataAnalysis["2014"][eachTrip.city]["trips"] + eachTrip.trips;
			})
			//$.getJSON("http://52.39.148.231:3000/getData?filename=2015Durationwise", function(data) {
			$.getJSON("/WebsiteData/HTML/data/2015Durationwise.json", function(data) {
				_.forEach(data, function(eachTrip) {
					dataAnalysis["2015"][eachTrip.city]["revenue"] = dataAnalysis["2015"][eachTrip.city]["revenue"] + getRevenue(eachTrip.duration*1.3);
				})
				//$.getJSON("http://52.39.148.231:3000/getData?filename=2014Durationwise", function(data) {
				$.getJSON("/WebsiteData/HTML/data/2014Durationwise.json", function(data) {
					_.forEach(data, function(eachTrip) {
						dataAnalysis["2014"][eachTrip.city]["revenue"] = dataAnalysis["2014"][eachTrip.city]["revenue"] + getRevenue(eachTrip.duration);
					})
					//$.getJSON("http://52.39.148.231:3000/getData?filename=2015stations", function(data) {
					$.getJSON("/WebsiteData/HTML/data/2015stations.json", function(data) {
						_.forEach(data, function(eachStation) {
							dataAnalysis["2015"][eachStation.landmark]["stations"] = dataAnalysis["2015"][eachStation.landmark]["stations"] + 1;
						})
					})
					//$.getJSON("http://52.39.148.231:3000/getData?filename=2014stations", function(data) {
					$.getJSON("/WebsiteData/HTML/data/2014stations.json", function(data) {
						_.forEach(data, function(eachStation) {
							dataAnalysis["2014"][eachStation.landmark]["stations"] = dataAnalysis["2014"][eachStation.landmark]["stations"] + 1;
						})
						drawChart();
					})
				})

			})

		})
	});
}

$(function() {
	initliaze();
	loadDataYearWise();
})

function getRevenue(duration) {
	return Math.round(duration / 60 / 30) * 4;
}

function drawChart() {
    //ratan
	//console.log("dataAnalysis", JSON.stringify(dataAnalysis, null, 2))
	$('#yearWiseTrips').highcharts({
		chart: {
			type: 'area',
            height:400,
            width:800
		},
		title: {
			text: 'Trips Analysis Year Wise'
		},
		subtitle: {
			text: 'Total Trips in 2014 and 2015 - ' + _.pluck(dataAnalysis["2014"], 'trips')
				.concat(_.pluck(dataAnalysis["2015"], 'trips'))
				.reduce(function(a, b) {
					return a + b;
				})
		},
		xAxis: {
			categories: ['San Francisco', 'San Jose', 'Palo Alto', 'Redwood City', 'Mountain View'],
			tickmarkPlacement: 'on',
			title: {
				enabled: false
			}
		},
		yAxis: {
			title: {
				text: 'Percent'
			}
		},
		tooltip: {
			pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} Trips)<br/>',
			shared: true
		},
		plotOptions: {
			area: {
				stacking: 'percent',
				lineColor: '#ffffff',
				lineWidth: 1,
				marker: {
					lineWidth: 1,
					lineColor: '#ffffff'
				}
			}
		},
		series: [ {
			name: '2015',
			data: _.pluck(dataAnalysis["2015"], 'trips')
		},{
			name: '2014',
			data: _.pluck(dataAnalysis["2014"], 'trips')
		}]
	});

	$('#yearWiseStations').highcharts({
		chart: {
            height:400,
            width:800,
			type: 'area'
		},
		title: {
			text: 'Stations Analysis Year Wise'
		},
		subtitle: {
			text: 'Total Stations in 2014 and 2015'
		},
		xAxis: {
			categories: ['San Francisco', 'San Jose', 'Palo Alto', 'Redwood City', 'Mountain View'],
			tickmarkPlacement: 'on',
			title: {
				enabled: false
			}
		},
		yAxis: {
			title: {
				text: 'Percent'
			}
		},
		tooltip: {
			pointFormat: '<br><span style="color:{series.color}">Total:{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} Stations)<br/>',
			shared: true
		},
		plotOptions: {
			area: {
				stacking: 'percent',
				lineColor: '#ffffff',
				lineWidth: 1,
				marker: {
					lineWidth: 1,
					lineColor: '#ffffff'
				}
			}
		},
		series: [ {
			name: '2015',
			data: _.pluck(dataAnalysis["2015"], 'stations')
		},{
			name: '2014',
			data: _.pluck(dataAnalysis["2014"], 'stations')
		}]
	});

	$('#yearWiseRevenue').highcharts({
		chart: {
            height:400,
            width:800,
			type: 'area'
		},
		title: {
			text: 'Revenue Analysis Year Wise'
		},
		subtitle: {
			text: 'Revenue in Dollars'
		},
		xAxis: {
			categories: ['Mountain View', 'Redwood City', 'Palo Alto', 'San Jose', 'San Francisco'],
			tickmarkPlacement: 'on',
			title: {
				enabled: false
			}
		},
		yAxis: {
			title: {
				text: 'Dollars'
			},
			labels: {
				formatter: function() {
					return this.value / 1000 + 'K';
				}
			}
		},
		tooltip: {
			shared: true,
			valueSuffix: ' Dollars'
		},
		plotOptions: {
			area: {
				stacking: 'normal',
				lineColor: '#666666',
				lineWidth: 1,
				marker: {
					lineWidth: 1,
					lineColor: '#666666'
				}
			}
		},
		series: [{
			name: '2015',
			data: _.pluck(dataAnalysis["2015"], 'revenue').reverse()
		},{
			name: '2014',
			data: _.pluck(dataAnalysis["2014"], 'revenue').reverse()
		}]
	});
};