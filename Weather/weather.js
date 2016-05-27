'use strict'
var weatherData = [];
var maxHumidity = [];
var maxTemperature = [];
var rainFall = [];
var trips = [];
var dates = [];
var cityName = '';

$(function() {
  requestData(cityName);
});

function requestData(city) {
  cityName = city || 'San Jose';
  weatherData = [];
  
  $.getJSON("tripWeather.json", function(data) {
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
  for (var i = 0; i < weatherData.length; i++) {

      if(weatherData[i].city == cityName){
        maxHumidity.push(weatherData[i]["Max.Humidity"]);
        maxTemperature.push(weatherData[i]["Max.TemperatureF"]);
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


function plot(){
  $(function () {
    $('#container').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Humidity vs Trips'
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
            opposite: true
        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Humidity',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            //opposite: true
        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Temperature',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[2]
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
            yAxis: 1,
            color: Highcharts.getOptions().colors[0],
            data: trips,
            tooltip: {
                pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}</b> '
            }
        },{
            name: 'Humidity',
            type: 'spline',
            yAxis: 2,
            color: Highcharts.getOptions().colors[1],
            data: maxHumidity,
            tooltip: {
                pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}%</b> <br>'
            }
        },  {
            name: 'Temperature',
            type: 'spline',
            //yAxis: 1,
            color: Highcharts.getOptions().colors[2],
            data: maxTemperature,
            tooltip: {
                pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}</b> '
            }
        }]
    });
});
}

// function plotRealmap() {
  // $('#container1').highcharts({
  //   chart: {
  //     type: 'spline',
  //     animation: Highcharts.svg, // don't animate in old IE
  //     marginRight: 10,
  //     events: {
  //       load: function() {

  //         // set up the updating of the chart each second
  //         var series = this.series[0];
  //         setInterval(function() {
  //           var x = (new Date()).getTime(), // current time
  //             y = Math.random();
  //           series.addPoint([x, y], true, true);
  //         }, 1000);
  //       }
  //     }
  //   },
  //   title: {
  //     text: 'Live random data'
  //   },
  //   xAxis: {
  //     type: 'datetime',
  //     tickPixelInterval: 150
  //   },
  //   yAxis: {
  //     title: {
  //       text: 'Value'
  //     },
  //     plotLines: [{
  //       value: 0,
  //       width: 1,
  //       color: '#808080'
  //     }]
  //   },
  //   tooltip: {
  //     formatter: function() {
  //       return '<b>' + this.series.name + '</b><br/>' +
  //         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
  //         Highcharts.numberFormat(this.y, 2);
  //     }
  //   },
  //   legend: {
  //     enabled: false
  //   },
  //   exporting: {
  //     enabled: false
  //   },
  //   series: [{
  //     name: 'Random data',
  //     data: (function() {
  //       // generate an array of random data
  //       var data = [],
  //         time = (new Date()).getTime(),
  //         i;

  //       for (i = -19; i <= 0; i += 1) {
  //         data.push({
  //           x: time + i * 1000,
  //           y: Math.random()
  //         });
  //       }
  //       return data;
  //     }())
  //   }]
  // });

  // $('#container').highcharts({
  //   chart: {
  //     type: 'pie',
  //     options3d: {
  //       enabled: true,
  //       alpha: 45
  //     },
  //   },
  //   title: {
  //     text: 'Real time - Number of available docks per station'
  //   },
  //   subtitle: {
  //     text: 'City ' + cityName
  //   },
  //   plotOptions: {
  //     pie: {
  //       innerSize: 100,
  //       depth: 45
  //     }
  //   },
  //   series: [{
  //     name: 'Available Docks',
  //     data: availableDocks
  //   }]
  // });

  // $('#container3').highcharts({
  //   chart: {
  //     type: 'pie',
  //     options3d: {
  //       enabled: true,
  //       alpha: 45
  //     }
  //   },
  //   title: {
  //     text: 'Real time - Number of bikes available per station'
  //   },
  //   subtitle: {
  //     text: 'City ' + cityName
  //   },
  //   plotOptions: {
  //     pie: {
  //       innerSize: 100,
  //       depth: 45
  //     }
  //   },
  //   series: [{
  //     name: 'Available Bikes',
  //     data: availableBikes
  //   }]
  // });
  // $('#container2').highcharts({

  //   chart: {
  //     type: 'bubble',
  //     plotBorderWidth: 1,
  //     zoomType: 'xy'
  //   },

  //   legend: {
  //     enabled: false
  //   },

  //   title: {
  //     text: 'Available Bikes and Docks  per City'
  //   },

  //   subtitle: {
  //     text: 'City ' + cityName
  //   },

  //   xAxis: {
  //     gridLineWidth: 1,
  //     //tickInterval: 3,
  //     title: {
  //       text: 'Available Bikes'
  //     },
  //     labels: {
  //       format: '{value}'
  //     },
  //     plotLines: [{
  //       color: 'black',
  //       dashStyle: 'dot',
  //       width: 2,
  //       value: 65,
  //       label: {
  //         rotation: 0,
  //         y: 15,
  //         style: {
  //           fontStyle: 'italic'
  //         },
  //         text: 'Safe fat intake 65g/day'
  //       },
  //       zIndex: 3
  //     }]
  //   },

  //   yAxis: {
  //     startOnTick: false,
  //     endOnTick: false,
  //     // tickInterval: 3,
  //     title: {
  //       text: 'Available Docks'
  //     },
  //     labels: {
  //       format: '{value}'
  //     },
  //     maxPadding: 0.1,
  //     plotLines: [{
  //       color: 'black',
  //       dashStyle: 'dot',
  //       width: 2,
  //       value: 50,
  //       label: {
  //         align: 'right',
  //         style: {
  //           fontStyle: 'italic'
  //         },
  //         text: 'Safe sugar intake 50g/day',
  //         x: -10
  //       },
  //       zIndex: 3
  //     }]
  //   },

  //   tooltip: {
  //     useHTML: true,
  //     headerFormat: '<table>',
  //     pointFormat: '<tr><th colspan="2"><h3>{point.stationName}</h3></th></tr>' +
  //       '<tr><th>Available Bikes:- </th><td>{point.x}</td></tr>' +
  //       '<tr><th>Available Docks:- </th><td>{point.y}</td></tr>' +
  //       '<tr><th>Total Bikes:- </th><td>{point.totalBikes}</td></tr>' +
  //       '<tr><th>Demand Prediction:-   </th><td>{point.z}% bikes rented</td></tr>',
  //     footerFormat: '</table>',
  //     followPointer: true
  //   },

  //   plotOptions: {
  //     series: {
  //       dataLabels: {
  //         enabled: true,
  //         format: '{point.stationName}'
  //       }
  //     }
  //   },

  //   series: [{
  //     data: demandPrediction,
  //     marker: {
  //       fillColor: {
  //         radialGradient: {
  //           cx: 0.4,
  //           cy: 0.3,
  //           r: 0.9
  //         },
  //         stops: [
  //           [0, 'rgba(255,255,255,0.5)'],
  //           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
  //         ]
  //       }
  //     }
  //   }]

  // });
// }