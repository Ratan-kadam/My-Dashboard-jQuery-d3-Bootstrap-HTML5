var yearSelected = '2015';
var cityName = 'San Francisco';
var sortBy = 'starting_trips';
var yearData;

$(function() {
	loadDataStartEnd();
	$("#year2015,#year2014").click(function() {
		loadDataStartEnd();
	});
	$(".city,.mytripssort").click(function() {
		filterDataStartEnd();
	})
})


function loadDataStartEnd() {
	yearSelected = $('.myYear:checked').val();
	//$.getJSON("http://52.39.148.231:3000/getData?filename=" + yearSelected + "Monthwise", function(data) {
	$.getJSON("/WebsiteData/HTML/data/" + yearSelected + "Monthwise.json", function(data) {
		yearData = data;
		filterDataStartEnd();
	}, function(error) {
		console.log(error)
	});
}

function filterDataStartEnd() {
	cityName = $(".city:checked").val();
	sortBy = $(".mytripssort:checked").val();
	loadStartingEndingRidesStationsWise(yearData);
}


function loadStartingEndingRidesStationsWise(data) {
	// Age categories
	var stationsWiseData = {};


	var stations = _.uniq(_.pluck(_.where(data, {
		city: cityName
	}), 'start_station').concat(_.pluck(_.where(data, {
		city: cityName
	}), 'end_station')));
	for (var i = 0; i < stations.length; i++) {
		stationsWiseData[stations[i]] = {
			starting_trips: 0,
			ending_trips: 0
		};
	}
	_.forEach(data, function(eachTrip) {
		if (eachTrip.city === cityName) {
			stationsWiseData[eachTrip.start_station]['starting_trips'] = stationsWiseData[eachTrip.start_station]['starting_trips'] + eachTrip.trips;
			stationsWiseData[eachTrip.end_station]['ending_trips'] = stationsWiseData[eachTrip.end_station]['ending_trips'] + eachTrip.trips;
		}
	});

	var stationNames = [];
	var sortedStationsWiseData = [];
	for (var key in stationsWiseData) {
		if (stationsWiseData.hasOwnProperty(key)) {
			stationNames.push(key)
			var value = stationsWiseData[key];
			sortedStationsWiseData.push({
				'station_name': key,
				'starting_trips': stationsWiseData[key].starting_trips,
				'ending_trips': -stationsWiseData[key].ending_trips
			})
		}
	}

	sortedStationsWiseData = sortBy === 'starting_trips' ? _.sortBy(sortedStationsWiseData, sortBy) : _.sortBy(sortedStationsWiseData, sortBy).reverse();
	$('#startEndStation').highcharts({
		chart: {
			type: 'bar'
		},
		title: {
			text: 'Starting and Ending Trips'
		},
		subtitle: {
			text: cityName + ' - ' + yearSelected
		},
		xAxis: [{
			categories: _.pluck(sortedStationsWiseData, 'station_name'),
			reversed: false,
			labels: {
				step: 1
			}
		}, { // mirror axis on right side
			opposite: true,
			reversed: false,
			categories: _.pluck(sortedStationsWiseData, 'station_name'),
			linkedTo: 0,
			labels: {
				step: 1
			}
		}],
		yAxis: {
			title: {
				text: null
			},
			labels: {
				formatter: function() {
					return Math.abs(this.value);
				}
			}
		},
		plotOptions: {
			series: {
				stacking: 'normal'
			}
		},

		tooltip: {
			formatter: function() {
				return '<b>' + this.series.name + ' from ' + this.point.category + '</b><br/>' +
					'Number of rides: ' + Math.abs(this.point.y);
			}
		},
		series: [{
			name: 'Starting Rides',
			data: _.pluck(sortedStationsWiseData, 'starting_trips')
		}, {
			name: 'Ending Rides',
			data: _.pluck(sortedStationsWiseData, 'ending_trips')
		}]
	});
}
