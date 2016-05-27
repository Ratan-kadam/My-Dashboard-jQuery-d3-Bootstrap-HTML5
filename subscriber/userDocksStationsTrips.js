var yearSelected = '2015';
var cityWiseTripsData = {};
var cityWiseDocksData = {};
var cityWiseStationsData = {};
var yearSelected = '2015';
var weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var weekends = ['Saturday', 'Sunday'];
var userWiseTripsData = {};

function initlizeArray() {
	userWiseTripsData = {
		'Customer': 0,
		'Subscriber': 0
	}
	cityWiseTripsData = {
		'San Jose': 0,
		'San Francisco': 0,
		'Palo Alto': 0,
		'Mountain View': 0,
		'Redwood City': 0
	};

	cityWiseDocksData = {
		'San Jose': 0,
		'San Francisco': 0,
		'Palo Alto': 0,
		'Mountain View': 0,
		'Redwood City': 0
	};

	cityWiseStationsData = {
		'San Jose': 0,
		'San Francisco': 0,
		'Palo Alto': 0,
		'Mountain View': 0,
		'Redwood City': 0
	};

};

$(function() {
	loadDataUserDock();
	$("#year2015,#year2014").click(function() {
		loadDataUserDock();
	});
})


function loadDataUserDock() {
	initlizeArray();
	yearSelected = $('.myYear:checked').val();
	$.getJSON('/subscriber/data/' + yearSelected + 'Daywise.json', function(data) {
		_.forEach(data, function(eachTrip) {
			userWiseTripsData[eachTrip.subscriber_type] = userWiseTripsData[eachTrip.subscriber_type] + eachTrip.trips;
		})
		_.forEach(data, function(eachTrip) {
			cityWiseTripsData[eachTrip.city] = cityWiseTripsData[eachTrip.city] + eachTrip.trips;
		})
		$.getJSON('/subscriber/data/' + yearSelected + 'stations.json', function(data) {
			_.forEach(data, function(eachstation) {
				cityWiseStationsData[eachstation.landmark] = cityWiseStationsData[eachstation.landmark] + 1;
				cityWiseDocksData[eachstation.landmark] = cityWiseDocksData[eachstation.landmark] + eachstation.dockcount;
			});
			loadCityWiseData();
			loadUserTypeWiseData();
			loadStationsWiseChart();
		})
	});
}

function loadCityWiseData() {
	// Build the chart
	$('#cityWiseTrips').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Citywise Trip Data - ' + yearSelected
		},
		subtitle: {
			text: 'Total Number of Trips - ' + _.values(cityWiseTripsData).reduce(function(a, b) {
				return a + b
			})
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Trips',
			colorByPoint: true,
			data: [{
				name: 'San Jose',
				y: cityWiseTripsData['San Jose']
			}, {
				name: 'San Francisco',
				y: cityWiseTripsData['San Francisco'],
				sliced: true,
				selected: true
			}, {
				name: 'Mountain View',
				y: cityWiseTripsData['Mountain View']
			}, {
				name: 'Redwood City',
				y: cityWiseTripsData['Redwood City']
			}, {
				name: 'Palo Alto',
				y: cityWiseTripsData['Palo Alto']
			}]
		}]
	});
}

function loadUserTypeWiseData() {
	// Build the chart
	$('#userTypeWiseTrips').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'User Type wise (Customer or Subscriber) Trip Data - ' + yearSelected
		},
		subtitle: {
			text: 'Total Number of Trips - ' + (userWiseTripsData.Customer + userWiseTripsData.Subscriber)
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Brands',
			colorByPoint: true,
			data: [{
				name: 'Customer(%)',
				y: Math.round(userWiseTripsData.Customer / (userWiseTripsData.Subscriber + userWiseTripsData.Customer) * 100),
			}, {
				name: 'Subscriber(%)',
				y: Math.round(userWiseTripsData.Subscriber / (userWiseTripsData.Subscriber + userWiseTripsData.Customer) * 100),
			}],
		}]
	});
}

function loadStationsWiseChart() {
	$('#cityWiseDocksData').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'City wise Docks Data - ' + yearSelected
		},
		subtitle: {
			text: 'Total Number of Docks - ' + _.values(cityWiseDocksData).reduce(function(a, b) {
				return a + b
			})
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Docks',
			colorByPoint: true,
			data: [{
				name: 'San Jose',
				y: cityWiseDocksData['San Jose']
			}, {
				name: 'San Francisco',
				y: cityWiseDocksData['San Francisco'],
				sliced: true,
				selected: true
			}, {
				name: 'Mountain View',
				y: cityWiseDocksData['Mountain View']
			}, {
				name: 'Redwood City',
				y: cityWiseDocksData['Redwood City']
			}, {
				name: 'Palo Alto',
				y: cityWiseDocksData['Palo Alto']
			}]
		}]
	});

	$('#cityWiseStationsData').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'City wise Stations Data - ' + yearSelected
		},
		subtitle: {
			text: 'Total Number of Stations - ' + _.values(cityWiseStationsData).reduce(function(a, b) {
				return a + b
			})
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Stations',
			colorByPoint: true,
			data: [{
				name: 'San Jose',
				y: cityWiseStationsData['San Jose']
			}, {
				name: 'San Francisco',
				y: cityWiseStationsData['San Francisco'],
				sliced: true,
				selected: true
			}, {
				name: 'Mountain View',
				y: cityWiseStationsData['Mountain View']
			}, {
				name: 'Redwood City',
				y: cityWiseStationsData['Redwood City']
			}, {
				name: 'Palo Alto',
				y: cityWiseStationsData['Palo Alto']
			}]
		}]
	});
}