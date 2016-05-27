var weatherData = [];
var maxHumidity = [];
var maxTemperature = [];
var windSpeed = [];
var rainFall = [];
var trips = [];
var dates = [];
var cityName = '';

$(function() {
    $('#chartTitle').text("Weather Effect Analysis");
    requestData(cityName);
});

function requestData(city) {
    cityName = city || 'San Jose';
    weatherData = [];

    $.getJSON("http://52.39.148.231:3000/getData?filename=tripWeather", function(data) {
        weatherData = data;
        filterData(cityName);
        //plotRealmap();
    }, function(error) {
        console.log("Error in getting live data")
    });
}

function filterData(city) {
    cityName = city || 'San Jose';
    maxHumidity = [];
    trips = [];
    dates = [];
    maxTemperature = [];
    windSpeed = [];
    for (var i = 0; i < weatherData.length; i++) {

        if (weatherData[i].city == cityName) {
            maxHumidity.push(weatherData[i]["Max.Humidity"]);
            maxTemperature.push(weatherData[i]["Max.TemperatureF"]);
            windSpeed.push(weatherData[i]["Max.Wind.SpeedMPH"]);
            trips.push(weatherData[i].trips);
            dates.push(weatherData[i].Date);
        }

        //console.log(maxTemperature[i]);
    }
    /*  console.log('--',JSON.stringify(maxHumidity));
      console.log(JSON.stringify(trips));
      console.log(JSON.stringify(dates));
      console.log(JSON.stringify(maxTemperature));*/
    plot();
}


function plot() {
    $(function() {
        $('#container').highcharts({
            chart: {
                height:400,
                zoomType: 'x'
            },
            title: {
                text: 'Effects of Weather on Bike Trips'
            },
    subtitle: {
      text: '2014 And 2015'
    },
            xAxis: [{
                categories: dates,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                title: {
                    text: 'Trips',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: false
            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Humidity',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Temperature',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                labels: {
                    format: '{value} F',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true
            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Wind Speed',
                    style: {
                        color: Highcharts.getOptions().colors[3]
                    }
                },
                labels: {
                    format: '{value} MPH',
                    style: {
                        color: Highcharts.getOptions().colors[3]
                    }
                },
                opposite: true
            }],

            tooltip: {
                shared: true
            },

            series: [{
                name: 'Trips',
                type: 'column',
                color: Highcharts.getOptions().colors[0],
                data: trips,
                tooltip: {
                    pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} </b><br>'
                },
                turboThreshold: Number.MAX_VALUE
            }, {
                name: 'Humidity',
                type: 'spline',
                yAxis: 1,
                color: Highcharts.getOptions().colors[1],
                data: maxHumidity,
                tooltip: {
                    pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}% </b> '
                },
                turboThreshold: Number.MAX_VALUE
            }, {
                name: 'Temperature',
                type: 'spline',
                yAxis: 2,
                color: Highcharts.getOptions().colors[2],
                data: maxTemperature,
                tooltip: {
                    pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} F </b> '
                },
                turboThreshold: Number.MAX_VALUE
            }, {
                name: 'Wind Speed',
                type: 'spline',
                yAxis: 3,
                color: Highcharts.getOptions().colors[3],
                data: windSpeed,
                tooltip: {
                    pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} MPH </b> '
                },
                turboThreshold: Number.MAX_VALUE
            }]
        });
    });
}