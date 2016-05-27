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

	var e, t = function(e, t) {
		return function() {
			return e.apply(t, arguments)
		}
	};
	e = function() {

			function e() {
				cityName = window.localStorage.getItem('selectedRadioValueCity') || $('form input[type=radio]:checked').val() || 'San Francisco';
                typeOfDay = localStorage.getItem('selectedRadioValueDay') || $('.myradio:checked').val();
                $('form input[value="' + cityName + '"]').prop('checked', true);
                $('.myradio[id="'+typeOfDay+'"]').prop('checked', true);
				
                
				graphSelected = $('.mygraph:checked').val();
				fileName = typeOfDay === 'weekend' ? 'tripsWeekend.json' : 'tripsWeekday.json';
               
				$("#time-holder").html("");
				this.endSim = t(this.endSim, this),
					this.endTrip = t(this.endTrip, this),
					this.updateTrip = t(this.updateTrip, this),
					this.startTrip = t(this.startTrip, this),
					this.tick = t(this.tick, this),
					this.startTicks = t(this.startTicks, this),
					this.drawTripLine = t(this.drawTripLine, this),
					this.drawStationCircle = t(this.drawStationCircle, this),
					this.countdown = t(this.countdown, this),
					this.startSim = t(this.startSim, this),
					this.loadTrips = t(this.loadTrips, this),
					this.resetSim = t(this.resetSim, this),
					this.selectDate = t(this.selectDate, this),
					this.loadStations = t(this.loadStations, this);
				var e;
				e = {
						center: new google.maps.LatLng(centerPointCity[cityName]),
						zoom: 15
					},
					/*$("#msg-holder").html("Loading Map..."),*/
					this.map = new google.maps.Map(document.getElementById("map-canvas"), e),
					google.maps.event.addListenerOnce(this.map, "tilesloaded", this.loadStations),
					this.TICK_LENGTH = 25,
					this.TICK_DELAY = 20,
					this.simStopped = !0,
					this.trips = [],
					this.newTrips = [],
					this.date = null,
					this.simStopped = !0,
					this.started = !1,
					$('#loadTrips').click(function() {
                    localStorage.setItem('selectedRadioValueCity',$('form input[type=radio]:checked').val());              
                    localStorage.setItem('selectedRadioValueDay',$('.myradio:checked').val() );
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
					$("#clickMe").click(function(e) {
						return function() {
							return e.started || (e.started = !0,
								e.selectDate("02/01/2015")), !1
						}
					}(this))
					/*,
											$("#overlay-hidden").click(function() {
												return function() {
													return $("#overlay").slideDown(), !1
												}
											}(this))*/
			}

			return e.prototype.loadStations = function() {
					return $.getJSON("stations.json", function(e) {
						return function(t) {
							stationsData = t.stations;
							var n, i, r, a;
							for (e.stations = t.stations,
								e.stationsById = {},
								a = e.stations,
								i = 0,
								r = a.length; r > i; i++)
								n = a[i],
								e.stationsById[n.id] = n,
								e.drawStationCircle(n);
							e.selectDate("08/24/2015");
							return $("#msg-holder").html("Pick a Day - It's a Bike Ballet"),
								$("#subinfo-holder").html("FYI, the City and the Peninsula both work"),
								$("#datepicker").datepicker({
									minDate: "01/01/2014",
									maxDate: "12/31/2015",
									onSelect: e.selectDate
								}),
								$("#datepicker").datepicker("setDate", "08/24/2015")
						}
					}(this))
				},
				e.prototype.selectDate = function(e) {
					//cityName = $('form input[type=radio]:checked').val() || 'San Francisco';
					return this.date = e,
						this.simStopped = !0,
						this.loadTrips(), !1
				},
				e.prototype.resetSim = function() {
					var e, t, n, i, r, a, o, s, u;
					for (this.simStopped = !0,
						this.countdownTimeout && window.clearTimeout(this.countdownTimeout),
						this.tickTimeout && window.clearTimeout(this.tickTimeout),
						this.restartTimeout && window.clearTimeout(this.restartTimeout),
						o = this.stations,
						n = 0,
						r = o.length; r > n; n++)
						e = o[n],
						this.drawStationCircle(e);
					for (s = this.trips,
						u = [],
						i = 0,
						a = s.length; a > i; i++)
						t = s[i],
						null != t.line && t.line.setMap(null),
						u.push(null != t.marker ? t.marker.setMap(null) : void 0);
					return u
				},
				e.prototype.loadTrips = function() {
					var e;

					return this.resetSim(),
						$("#date-holder").html("Loading Today's Trips..."),
						$("#time-holder").html(""),
						e = this.date,
						//console.log("-----mukul", e);
						$.getJSON(fileName, function(t) {

							return function(n) {
								tripsData = n;
								calculateCostMetrics(tripsData, stationsData);
								//console.log("cityName", n)
								return t.resetSim(),
									t.start_tick = n.start_tick,
									t.end_tick = n.end_tick,
									t.trips = n.trips,
									$("#date-holder").html('<b>' + e + '</b>'),
									t.startSim()
							}
						}(this))
				},
				e.prototype.startSim = function() {
					var e, t, n, i, r, a, o, s;
					for (this.cur_tick = this.start_tick,
						o = this.stations,
						n = 0,
						r = o.length; r > n; n++)
						e = o[n],
						this.drawStationCircle(e);
					for (this.newTrips = [],
						s = this.trips,
						i = 0,
						a = s.length; a > i; i++)
						t = s[i],
						this.newTrips.push(t),
						null != t.line && t.line.setMap(null),
						null != t.marker && t.marker.setMap(null),
						this.drawTripLine(t),
						t.line.setMap(this.map),
						e = this.stationsById[t.start_station_id],
						e.circle.setRadius(e.circle.getRadius() + 1),
						e = this.stationsById[t.end_station_id],
						e.circle.setRadius(e.circle.getRadius() + 1);

					return this.activeTrips = [],
						this.simStopped = !1,
						this.count = 6,
						this.countdown()
				},
				e.prototype.countdown = function() {
					var e, t, n, i;
					if (this.count -= 1,
						$("#time-holder").html("Trips will load in " + this.count + ' seconds'),
						this.count <= 0) {
						for (i = this.stations,
							t = 0,
							n = i.length; n > t; t++)
							e = i[t],
							this.drawStationCircle(e);
						return this.startTicks()
					}
					return this.countdownTimeout = window.setTimeout(this.countdown, 1e3)
				},
				e.prototype.drawStationCircle = function(e) {
					var indx = _.findIndex(stationsData, {
						id: e.id
					});

					//create info window
					var circ = new google.maps.Circle({
						center: new google.maps.LatLng(e.lat, e.lng),
						radius: 35,
						strokeColor: "#333333",
						strokeOpacity: .5,
						strokeWeight: 1,
						fillColor: "#00BFFF",
						fillOpacity: .5,
						zIndex: 10,
						map: this.map
					});
					var content = "<div class='bgcolorYellow'> Station Name - <b>" + e.name + "</b><br>City - <b>" + e.landmark + "</b><br>Dock Count - <b>" + e.dockcount + '</b><br>Total trip Duration - <b>' + Math.round(stationsData[indx].totalDuration * 30 / 60 / 60) + ' hours</b><br>Total Revenue generated- <b>' + stationsData[indx].revenueGenerated + '$</b><br>Total Number of Trips- <b>' + stationsData[indx].totalNumberOfTrips + '</b></div>';
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
					return e.circle && e.circle.setMap(null),
						e.circle = circ;
				},
				e.prototype.drawTripLine = function(e) {
					var t, n, i;
					return e.start_pos[0] !== e.end_pos[0] || e.start_pos[1] !== e.end_pos[1] ? (i = [new google.maps.LatLng(e.start_pos[0], e.start_pos[1]), new google.maps.LatLng(e.end_pos[0], e.end_pos[1])],
						n = new google.maps.Polyline({
							path: i,
							strokeColor: "black",
							strokeOpacity: .1,
							strokeWeight: 2
						}),
						e.step_lat = (e.end_pos[0] - e.start_pos[0]) / (e.duration / this.TICK_LENGTH),
						e.step_lng = (e.end_pos[1] - e.start_pos[1]) / (e.duration / this.TICK_LENGTH),
						e.line = n) : (t = new google.maps.Circle({
							center: new google.maps.LatLng(e.start_pos[0], e.start_pos[1]),
							radius: 10,
							strokeColor: "#333333",
							strokeOpacity: .1,
							strokeWeight: 2,
							fillOpacity: 0
						}),
						e.line = t)
				},
				e.prototype.startTicks = function() {
					var demandAnalysis = '<svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="red" /> <text x="0" y="40" font-size="10" >Very High</text> </svg> <svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="blue" /> <text x="4" y="40" font-size="10" >High</text> </svg> <svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="yellow" /> <text x="2" y="40" font-size="10" >Moderate</text> </svg>  <svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="green" /> <text x="5" y="40" font-size="10" >Low</text> </svg> <svg height="50" width="50"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="1" fill-opacity="0.5" fill="orange" /> <text x="-1" y="40" font-size="10" >Very Low</text></svg>'
					$("#demandAnalysis").html(demandAnalysis);
					drawChart(graphSelected);
					var e, t, n, i;
					for (i = this.trips,
						t = 0,
						n = i.length; n > t; t++)
						e = i[t],
						e.line.setMap(null);
					return this.tickTimeout = window.setTimeout(this.tick, this.TICK_DELAY)
				},
				e.prototype.tick = function() {
					var e, t, n, i;
					if (this.cur_tick >= this.end_tick)
						return void this.endSim();
					if (this.simStopped)
						return void this.endSim();
					for (this.tickTimeout = window.setTimeout(this.tick, this.TICK_DELAY),
						e = new Date(1e3 * this.cur_tick), this.simStopped != 1,
						$("#time-holder").html('<b>' + cityName + '- ' + typeOfDay.toUpperCase() + '</b><br> <b>' + this.formatTime(e));;) {
						if (!this.newTrips[0])
							break;
						if (!(this.cur_tick >= this.newTrips[0].start_tick))
							break;
						i = this.newTrips.shift(),
							this.startTrip(i)
					}
					for (n = 0,
						t = this.activeTrips.length; t--;)
						this.updateTrip(this.activeTrips[t], t);
					//console.log("this.cur_tick += this.TICK_LENGTH",this.cur_tick += this.TICK_LENGTH)
					return this.cur_tick += this.TICK_LENGTH
				},
				e.prototype.startTrip = function(e) {
					var t;
					var icons = '../realtime/bike.ico';
					return e.marker = new google.maps.Marker({
							position: new google.maps.LatLng(e.start_pos[0], e.start_pos[1]),
							map: this.map,
							icon: icons
						}),
						t = this.stationsById[e.start_station_id],
						/*t.circle.setRadius(t.circle.getRadius() + 2),
						console.log("sssss", t.circle.getRadius()),*/
						t = getCircleColor(t),
						this.drawTripLine(e),
						this.activeTrips.push(e)
				},
				e.prototype.updateTrip = function(e, t) {
					var n, i;
					if (null != e)
						return this.cur_tick >= e.end_tick ? this.endTrip(e, t) : (n = e.marker.getPosition(),
							i = new google.maps.LatLng(n.lat() + e.step_lat, n.lng() + e.step_lng),
							e.marker.setPosition(i))
				},
				e.prototype.endTrip = function(e, t) {
					var n;
					return e.marker.setMap(null),
						null != e.line && e.line.setMap(this.map),
						n = this.stationsById[e.end_station_id],
						n.circle.setRadius(n.circle.getRadius() + 1),
						this.activeTrips.splice(t, 1)
				},
				e.prototype.endSim = function() {

					var e;
					for (e = this.activeTrips.length; e--;)
						this.endTrip(this.activeTrips[e], e);

					//return this.simStopped ? void 0 : ($("#time-holder").html("And the day is done.")//,
					//this.restartTimeout = window.setTimeout(this.startSim, 5e3))
				},
				e.prototype.formatTime = function(e) {
					var t, n, i;
					return t = e.getUTCHours(),
						n = e.getUTCMinutes(),
						i = "am",
						t > 11 && (i = "pm"),
						0 === t && (t = 12),
						t > 12 && (t -= 12),
						10 > n && (n = "0" + n),
						"" + t + ":" + n + " " + i
				},
				e
		}(),
		window.Map = e
}
.call(this);

function getCircleColor(t) {
	t.circle.setRadius(t.circle.getRadius() + 2);
	if (t.circle.getRadius() > 260) {
		t.demand = 'Very High'
		t.circle.setOptions({
			strokeColor: 'red',
			fillColor: 'red'
		})
	} else if (t.circle.getRadius() > 160 && t.circle.getRadius() <= 250) {
		t.circle.setOptions({
			strokeColor: 'blue',
			fillColor: 'blue'
		})
	} else if (t.circle.getRadius() > 100 && t.circle.getRadius() <= 160) {
		t.circle.setOptions({
			strokeColor: 'yellow',
			fillColor: 'yellow'
		})
	} else if (t.circle.getRadius() > 60 && t.circle.getRadius() <= 100) {
		t.circle.setOptions({
			strokeColor: 'green',
			fillColor: 'green'
		})
	} else if (t.circle.getRadius() <= 60) {
		t.circle.setOptions({
			strokeColor: 'orange',
			fillColor: 'orange'
		})
	} else {

	}
	return t;
}


function calculateCostMetrics() {

	_.forEach(stationsData, function(station) {
		station.totalDuration = 0;
		station.revenueGenerated = 0;
		station.totalNumberOfTrips = 0;
	})
	_.forEach(tripsData.trips, function(trip) {
        var multiplyFactor;
        multiplyFactor = fileName ==='tripsWeekday.json' ? 30 : 9;
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
        multiplyFactor = fileName ==='tripsWeekday.json' ? 30 : 9;
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