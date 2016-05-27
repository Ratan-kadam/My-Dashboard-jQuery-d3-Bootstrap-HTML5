var cityName = 'San Francisco';
var typeOfDay = 'weekday';
var centerPointCity = {
	'San Francisco': {
		lat: 37.78896440509159,
		lng: -122.39936918518066
	},
	'San Jose': {
		lat: 37.329732,
		lng: -121.901782
	},
	'Palo Alto': {
		lat: 37.443988,
		lng: -122.164759
	},
	'Redwood City': {
		lat: 37.486078,
		lng: -122.232089
	},
	'Mountain View': {
		lat: 37.394358,
		lng: -122.076713
	}
};
var stationsData = [];
var tripsData = [];
var fileName = 'tripsWeekday.json';
var revenueByCity = {};
var numberOfTripsByCity = {};

! function() {

	var bikeShare, bikeShareTrips = function(bikeShare, bikeShareTrips) {
		return function() {
			return bikeShare.apply(bikeShareTrips, arguments)
		}
	};
	bikeShare = function() {

			function bikeShare() {
				cityName = window.localStorage.getItem('selectedRadioValueCity') || $('form input[type=radio]:checked').val() || 'San Francisco';
				typeOfDay = localStorage.getItem('selectedRadioValueDay') || $('.myradio:checked').val();
				$('form input[value="' + cityName + '"]').prop('checked', true);
				$('.myradio[id="' + typeOfDay + '"]').prop('checked', true);


				graphSelected = $('.mygraph:checked').val();
				fileName = typeOfDay === 'weekend' ? 'tripsWeekend.json' : 'tripsWeekday.json';

				$("#time-holder").html("");
				this.endSim = bikeShareTrips(this.endSim, this),
					this.endTrip = bikeShareTrips(this.endTrip, this),
					this.updateTrip = bikeShareTrips(this.updateTrip, this),
					this.startTrip = bikeShareTrips(this.startTrip, this),
					this.tick = bikeShareTrips(this.tick, this),
					this.startTicks = bikeShareTrips(this.startTicks, this),
					this.drawTripLines = bikeShareTrips(this.drawTripLines, this),
					this.drawStationCircle = bikeShareTrips(this.drawStationCircle, this),
					this.countdown = bikeShareTrips(this.countdown, this),
					this.startSim = bikeShareTrips(this.startSim, this),
					this.loadTripsData = bikeShareTrips(this.loadTripsData, this),
					this.resetSim = bikeShareTrips(this.resetSim, this),
					this.selectDate = bikeShareTrips(this.selectDate, this),
					this.loadStationsData = bikeShareTrips(this.loadStationsData, this);
				var bikeShare;
				bikeShare = {
						center: new google.maps.LatLng(centerPointCity[cityName]),
						zoom: 15
					},
					/*$("#msg-holder").html("Loading Map..."),*/
					this.map = new google.maps.Map(document.getElementById("map-canvas"), bikeShare),
					google.maps.event.addListenerOnce(this.map, "tilesloaded", this.loadStationsData),
					this.TICK_LENGTH = 25,
					this.TICK_DELAY = 40,
					this.simStopped = !0,
					this.trips = [],
					this.newTrips = [],
					this.date = null,
					this.simStopped = !0,
					this.started = !1,
					$('#loadTrips').click(function() {
						localStorage.setItem('selectedRadioValueCity', $('form input[type=radio]:checked').val());
						localStorage.setItem('selectedRadioValueDay', $('.myradio:checked').val());
						location.reload();

					}),
					$("#button").click(function() {
						if ($("#button").html() === " <b>-</b> ") {
							$(this).html("<b>+</b>");
						} else {
							$("#button").html(" <b>-</b> ");
						}
						$("#box-holder").slideToggle();
					}),
					$("#clickMe").click(function(bikeShare) {
						return function() {
							return bikeShare.started || (bikeShare.started = !0,
								bikeShare.selectDate("02/01/2015")), !1
						}
					}(this))
					/*,
											$("#overlay-hidden").click(function() {
												return function() {
													return $("#overlay").slideDown(), !1
												}
											}(this))*/
			}

			return bikeShare.prototype.loadStationsData = function() {
					return $.getJSON("/VirtualRealData/data/stations.json", function(bikeShare) {
						return function(bikeShareTrips) {
							stationsData = bikeShareTrips.stations;
							var numberOfTrips, iterator, r, a;
							for (bikeShare.stations = bikeShareTrips.stations,
								bikeShare.stationsById = {},
								a = bikeShare.stations,
								iterator = 0,
								r = a.length; r > iterator; iterator++)
								numberOfTrips = a[iterator],
								bikeShare.stationsById[numberOfTrips.id] = numberOfTrips,
								bikeShare.drawStationCircle(numberOfTrips);
							bikeShare.selectDate("08/24/2015");
						}
					}(this))
				},
				bikeShare.prototype.selectDate = function(bikeShare) {
					//cityName = $('form input[type=radio]:checked').val() || 'San Francisco';
					return this.date = bikeShare,
						this.simStopped = !0,
						this.loadTripsData(), !1
				},
				bikeShare.prototype.resetSim = function() {
					var bikeShare, bikeShareTrips, numberOfTrips, iterator, r, a, o, s, u;
					for (this.simStopped = !0,
						this.countdownTimeout && window.clearTimeout(this.countdownTimeout),
						this.tickTimeout && window.clearTimeout(this.tickTimeout),
						this.restartTimeout && window.clearTimeout(this.restartTimeout),
						o = this.stations,
						numberOfTrips = 0,
						r = o.length; r > numberOfTrips; numberOfTrips++)
						bikeShare = o[numberOfTrips],
						this.drawStationCircle(bikeShare);
					for (s = this.trips,
						u = [],
						iterator = 0,
						a = s.length; a > iterator; iterator++)
						bikeShareTrips = s[iterator],
						null != bikeShareTrips.line && bikeShareTrips.line.setMap(null),
						u.push(null != bikeShareTrips.marker ? bikeShareTrips.marker.setMap(null) : void 0);
					return u
				},
				bikeShare.prototype.loadTripsData = function() {
					var bikeShare;

					return this.resetSim(),
						$("#date-holder").html("Loading Today's Trips..."),
						$("#time-holder").html(""),
						bikeShare = this.date,
						//console.log("-----mukul", bikeShare);
						$.getJSON("/VirtualRealData/data/" + fileName, function(bikeShareTrips) {

							return function(numberOfTrips) {
								tripsData = numberOfTrips;
								calculateCostMetrics(tripsData, stationsData);
								//console.log("cityName", numberOfTrips)
								return bikeShareTrips.resetSim(),
									bikeShareTrips.start_tick = numberOfTrips.start_tick,
									bikeShareTrips.end_tick = numberOfTrips.end_tick,
									bikeShareTrips.trips = numberOfTrips.trips,
									$("#date-holder").html('<b>' + bikeShare + '</b>'),
									bikeShareTrips.startSim()
							}
						}(this))
				},
				bikeShare.prototype.startSim = function() {
					var bikeShare, bikeShareTrips, numberOfTrips, iterator, r, a, o, s;
					for (this.cur_tick = this.start_tick,
						o = this.stations,
						numberOfTrips = 0,
						r = o.length; r > numberOfTrips; numberOfTrips++)
						bikeShare = o[numberOfTrips],
						this.drawStationCircle(bikeShare);
					for (this.newTrips = [],
						s = this.trips,
						iterator = 0,
						a = s.length; a > iterator; iterator++)
						bikeShareTrips = s[iterator],
						this.newTrips.push(bikeShareTrips),
						null != bikeShareTrips.line && bikeShareTrips.line.setMap(null),
						null != bikeShareTrips.marker && bikeShareTrips.marker.setMap(null),
						this.drawTripLines(bikeShareTrips),
						bikeShareTrips.line.setMap(this.map),
						bikeShare = this.stationsById[bikeShareTrips.start_station_id],
						bikeShare.circle.setRadius(bikeShare.circle.getRadius() + 1),
						bikeShare = this.stationsById[bikeShareTrips.end_station_id],
						bikeShare.circle.setRadius(bikeShare.circle.getRadius() + 1);

					return this.activeTrips = [],
						this.simStopped = !1,
						this.count = 5,
						this.countdown()
				},
				bikeShare.prototype.countdown = function() {
					var bikeShare, bikeShareTrips, numberOfTrips, iterator;
					if (this.count -= 1,
						$("#time-holder").html("Trips will load in " + this.count + ' seconds'),
						this.count <= 0) {
						for (iterator = this.stations,
							bikeShareTrips = 0,
							numberOfTrips = iterator.length; numberOfTrips > bikeShareTrips; bikeShareTrips++)
							bikeShare = iterator[bikeShareTrips],
							this.drawStationCircle(bikeShare);
						return this.startTicks()
					}
					return this.countdownTimeout = window.setTimeout(this.countdown, 1e3)
				},
				bikeShare.prototype.drawStationCircle = function(bikeShare) {
					var indx = _.findIndex(stationsData, {
						id: bikeShare.id
					});

					//create info window
					var circ = new google.maps.Circle({
						center: new google.maps.LatLng(bikeShare.lat, bikeShare.lng),
						radius: 35,
						strokeColor: "#333333",
						strokeOpacity: .5,
						strokeWeight: 1,
						fillColor: "#00BFFF",
						fillOpacity: .5,
						zIndex: 10,
						map: this.map
					});
					var content = "<div class='bgcolorYellow'> Station Name - <b>" + bikeShare.name + "</b><br>City - <b>" + bikeShare.landmark + "</b><br>Dock Count - <b>" + bikeShare.dockcount + '</b><br>Total trip Duration - <b>' + Math.round(stationsData[indx].totalDuration * 30 / 60 / 60) + ' hours</b><br>Total Revenue generated- <b>' + stationsData[indx].revenueGenerated + '$</b><br>Total Number of Trips- <b>' + stationsData[indx].totalNumberOfTrips + '</b></div>';
					var infoWindow = new google.maps.InfoWindow();

					//add a click event to the circle
					/*google.maps.event.addListener(circ, 'mouseover', function(ev) {
						infoWindow.setPosition(ev.latLng)
						infoWindow.open(this.map, circ);
					});*/

					google.maps.event.addListener(circ, 'mouseover', (function(circ, content, infoWindow) {
						return function(ev) {
							infoWindow.setPosition(ev.latLng)
							infoWindow.setContent(content);
							infoWindow.open(this.map, circ);
						};
					})(circ, content, infoWindow));
					google.maps.event.addListener(circ, 'mouseout', (function(circ, content, infoWindow) {
						return function() {
							infoWindow.close();
						};
					})(circ, content, infoWindow));
					return bikeShare.circle && bikeShare.circle.setMap(null),
						bikeShare.circle = circ;
				},
				bikeShare.prototype.drawTripLines = function(bikeShare) {
					var bikeShareTrips, numberOfTrips, iterator;
					return bikeShare.start_pos[0] !== bikeShare.end_pos[0] || bikeShare.start_pos[1] !== bikeShare.end_pos[1] ? (iterator = [new google.maps.LatLng(bikeShare.start_pos[0], bikeShare.start_pos[1]), new google.maps.LatLng(bikeShare.end_pos[0], bikeShare.end_pos[1])],
						numberOfTrips = new google.maps.Polyline({
							path: iterator,
							strokeColor: "black",
							strokeOpacity: .1,
							strokeWeight: 2
						}),
						bikeShare.step_lat = (bikeShare.end_pos[0] - bikeShare.start_pos[0]) / (bikeShare.duration / this.TICK_LENGTH),
						bikeShare.step_lng = (bikeShare.end_pos[1] - bikeShare.start_pos[1]) / (bikeShare.duration / this.TICK_LENGTH),
						bikeShare.line = numberOfTrips) : (bikeShareTrips = new google.maps.Circle({
							center: new google.maps.LatLng(bikeShare.start_pos[0], bikeShare.start_pos[1]),
							radius: 10,
							strokeColor: "#333333",
							strokeOpacity: .1,
							strokeWeight: 2,
							fillOpacity: 0
						}),
						bikeShare.line = bikeShareTrips)
				},
				bikeShare.prototype.startTicks = function() {
					var demandAnalysis = '<svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="red" /> <text x="0" y="40" font-size="10" >Very High</text> </svg> <svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="blue" /> <text x="4" y="40" font-size="10" >High</text> </svg> <svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="yellow" /> <text x="2" y="40" font-size="10" >Moderate</text> </svg>  <svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="green" /> <text x="5" y="40" font-size="10" >Low</text> </svg> <svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="orange" /> <text x="-1" y="40" font-size="10" >Very Low</text></svg>'
					$("#demandAnalysis").html(demandAnalysis);
					drawChart(graphSelected);
					var bikeShare, bikeShareTrips, numberOfTrips, iterator;
					for (iterator = this.trips,
						bikeShareTrips = 0,
						numberOfTrips = iterator.length; numberOfTrips > bikeShareTrips; bikeShareTrips++)
						bikeShare = iterator[bikeShareTrips],
						bikeShare.line.setMap(null);
					return this.tickTimeout = window.setTimeout(this.tick, this.TICK_DELAY)
				},
				bikeShare.prototype.tick = function() {
					var bikeShare, bikeShareTrips, numberOfTrips, iterator;
					if (this.cur_tick >= this.end_tick)
						return void this.endSim();
					if (this.simStopped)
						return void this.endSim();
					for (this.tickTimeout = window.setTimeout(this.tick, this.TICK_DELAY),
						bikeShare = new Date(1e3 * this.cur_tick), this.simStopped != 1,
						$("#time-holder").html('<b>' + cityName + '- ' + typeOfDay.toUpperCase() + '</b><br> <b>' + this.formatTime(bikeShare));;) {
						if (!this.newTrips[0])
							break;
						if (!(this.cur_tick >= this.newTrips[0].start_tick))
							break;
						iterator = this.newTrips.shift(),
							this.startTrip(iterator)
					}
					for (numberOfTrips = 0,
						bikeShareTrips = this.activeTrips.length; bikeShareTrips--;)
						this.updateTrip(this.activeTrips[bikeShareTrips], bikeShareTrips);
					//console.log("this.cur_tick += this.TICK_LENGTH",this.cur_tick += this.TICK_LENGTH)
					return this.cur_tick += this.TICK_LENGTH
				},
				bikeShare.prototype.startTrip = function(bikeShare) {
					var bikeShareTrips;
					var icons = '../realtime/bike.ico';
					return bikeShare.marker = new google.maps.Marker({
							position: new google.maps.LatLng(bikeShare.start_pos[0], bikeShare.start_pos[1]),
							map: this.map,
							icon: icons
						}),
						bikeShareTrips = this.stationsById[bikeShare.start_station_id],
						/*bikeShareTrips.circle.setRadius(bikeShareTrips.circle.getRadius() + 2),
						console.log("sssss", bikeShareTrips.circle.getRadius()),*/
						bikeShareTrips = getCircleColor(bikeShareTrips),
						this.drawTripLines(bikeShare),
						this.activeTrips.push(bikeShare)
				},
				bikeShare.prototype.updateTrip = function(bikeShare, bikeShareTrips) {
					var numberOfTrips, iterator;
					if (null != bikeShare)
						return this.cur_tick >= bikeShare.end_tick ? this.endTrip(bikeShare, bikeShareTrips) : (numberOfTrips = bikeShare.marker.getPosition(),
							iterator = new google.maps.LatLng(numberOfTrips.lat() + bikeShare.step_lat, numberOfTrips.lng() + bikeShare.step_lng),
			bikeShare.marker.setPosition(iterator))
				},
				bikeShare.prototype.endTrip = function(bikeShare, bikeShareTrips) {
					var numberOfTrips;
					return bikeShare.marker.setMap(null),
						null != bikeShare.line && bikeShare.line.setMap(this.map),
						numberOfTrips = this.stationsById[bikeShare.end_station_id],
						numberOfTrips.circle.setRadius(numberOfTrips.circle.getRadius() + 1),
						this.activeTrips.splice(bikeShareTrips, 1)
				},
				bikeShare.prototype.endSim = function() {

					var bikeShare;
					for (bikeShare = this.activeTrips.length; bikeShare--;)
						this.endTrip(this.activeTrips[bikeShare], bikeShare);

					//return this.simStopped ? void 0 : ($("#time-holder").html("And the day is done.")//,
					//this.restartTimeout = window.setTimeout(this.startSim, 5e3))
				},
				bikeShare.prototype.formatTime = function(bikeShare) {
					var bikeShareTrips, numberOfTrips, iterator;
					return bikeShareTrips = bikeShare.getUTCHours(),
						numberOfTrips = bikeShare.getUTCMinutes(),
						iterator = "am",
						bikeShareTrips > 11 && (iterator = "pm"),
						0 === bikeShareTrips && (bikeShareTrips = 12),
						bikeShareTrips > 12 && (bikeShareTrips -= 12),
						10 > numberOfTrips && (numberOfTrips = "0" + numberOfTrips),
						"" + bikeShareTrips + ":" + numberOfTrips + " " + iterator
				},
				bikeShare
		}(),
		window.Map = bikeShare
}
.call(this);

function getCircleColor(bikeShareTrips) {
	bikeShareTrips.circle.setRadius(bikeShareTrips.circle.getRadius() + 2);
	if (bikeShareTrips.circle.getRadius() > 260) {
		bikeShareTrips.demand = 'Very High'
		bikeShareTrips.circle.setOptions({
			strokeColor: 'red',
			fillColor: 'red'
		})
	} else if (bikeShareTrips.circle.getRadius() > 160 && bikeShareTrips.circle.getRadius() <= 250) {
		bikeShareTrips.circle.setOptions({
			strokeColor: 'blue',
			fillColor: 'blue'
		})
	} else if (bikeShareTrips.circle.getRadius() > 100 && bikeShareTrips.circle.getRadius() <= 160) {
		bikeShareTrips.circle.setOptions({
			strokeColor: 'yellow',
			fillColor: 'yellow'
		})
	} else if (bikeShareTrips.circle.getRadius() > 60 && bikeShareTrips.circle.getRadius() <= 100) {
		bikeShareTrips.circle.setOptions({
			strokeColor: 'green',
			fillColor: 'green'
		})
	} else if (bikeShareTrips.circle.getRadius() <= 60) {
		bikeShareTrips.circle.setOptions({
			strokeColor: 'orange',
			fillColor: 'orange'
		})
	} else {

	}
	return bikeShareTrips;
}


function calculateCostMetrics() {

	_.forEach(stationsData, function(station) {
		station.totalDuration = 0;
		station.revenueGenerated = 0;
		station.totalNumberOfTrips = 0;
	})
	_.forEach(tripsData.trips, function(trip) {
		var multiplyFactor;
		multiplyFactor = fileName === 'tripsWeekday.json' ? 30 : 9;
		var index = _.findIndex(stationsData, {
			id: trip.start_station_id
		});
		stationsData[index].totalDuration = stationsData[index].totalDuration + trip.duration;
		stationsData[index].totalNumberOfTrips++;
		stationsData[index].revenueGenerated = Math.round((stationsData[index].totalDuration) * multiplyFactor / 60 / 30 * 4)
	})

	function getRevenue(cityName) {
		return _.pluck(_.where(stationsData, {
			landmark: cityName
		}), 'revenueGenerated').reduce(function(a, b) {
			return a + b
		});
	}

	function getNumberofTrips(cityName) {
		var multiplyFactor;
		multiplyFactor = fileName === 'tripsWeekday.json' ? 30 : 9;
		return _.pluck(_.where(stationsData, {
			landmark: cityName
		}), 'totalNumberOfTrips').reduce(function(a, b) {
			return a + b
		}) * 30;
	}
	revenueByCity['San Jose'] = getRevenue('San Jose');
	revenueByCity['San Francisco'] = getRevenue('San Francisco');
	revenueByCity['Palo Alto'] = getRevenue('Palo Alto');
	revenueByCity['Mountain View'] = getRevenue('Mountain View');
	revenueByCity['Redwood City'] = getRevenue('Redwood City');

	numberOfTripsByCity['San Jose'] = getNumberofTrips('San Jose');
	numberOfTripsByCity['San Francisco'] = getNumberofTrips('San Francisco');
	numberOfTripsByCity['Palo Alto'] = getNumberofTrips('Palo Alto');
	numberOfTripsByCity['Mountain View'] = getNumberofTrips('Mountain View');
	numberOfTripsByCity['Redwood City'] = getNumberofTrips('Redwood City');
}

function drawChart(graphSelected) {

	$('#container').highcharts({
		chart: {
			type: 'areaspline',
			backgroundColor: graphSelected === 'Revenue' ? 'lightyellow' : 'lightred'
		},
		title: {
			text: graphSelected === 'Revenue' ? '<b>Revenue generated during one month</b>' : ' <b>Number of trips during one month</b>',
			style: {
				color: graphSelected === 'Revenue' ? 'black' : 'white'
			}
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 250,
			y: 40,
			floating: true,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		xAxis: {
			title: {
				text: 'City',
				style: {
					color: graphSelected === 'Revenue' ? 'black' : 'white'
				}
			},
			categories: graphSelected === 'Revenue' ? Object.keys(revenueByCity) : Object.keys(numberOfTripsByCity)
		},
		yAxis: {
			title: {
				text: graphSelected === 'Revenue' ? 'Revenue Generated in Dollars' : 'Number of trips',
				style: {
					color: graphSelected === 'Revenue' ? 'black' : 'white'
				}
			}
		},
		tooltip: {
			shared: true,
			valueSuffix: graphSelected === 'Revenue' ? ' $' : ' Number of trips'
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.6
			}
		},
		series: [{
			name: graphSelected === 'Revenue' ? 'Revenue' : 'Number of trips',
			data: graphSelected === 'Revenue' ? _.values(revenueByCity) : _.values(numberOfTripsByCity)
		}]
	});
};