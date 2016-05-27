
var cluster1 = [], cluster2 = [], cluster3 = [], stationMap = [];

function getClusters(data) {
    cluster1 = getClusterData(data, 1);
//    console.log(cluster1);
    cluster2 = getClusterData(data, 2);
//    console.log(cluster2);
    cluster3 = getClusterData(data, 3);
//    console.log(cluster3);
}

function getCitywiseData(city) {
    if(city == "San Jose") {
        $.getJSON("data/stationTripCluster3DSanJose.json", function(data) {
            getClusters(data);
            plot3dScatterPlot();
        });
    } else if(city == "San Francisco") {
        $.getJSON("data/stationTripCluster3DSanFrancisco.json", function(data) {
            getClusters(data);
            plot3dScatterPlot();
        });
    } else if(city == "Palo Alto") {
        $.getJSON("data/stationTripCluster3DPaloAlto.json", function(data) {
            getClusters(data);
            plot3dScatterPlot();
        });
    } else if(city == "Redwood City") {
        $.getJSON("data/stationTripCluster3DRedwood.json", function(data) {
            getClusters(data);
            plot3dScatterPlot();
        });
    } else if(city == "Mountain View"){
        $.getJSON("data/stationTripCluster3DMountainView.json", function(data) {
            getClusters(data);
            plot3dScatterPlot();
        });
    }
}

function getClusterData(data, clusterNum) {
    var cluster = [];
    data.forEach(function(item) {
        if(item.cluster == clusterNum) {
            var clusterdata = [];
            clusterdata.push(item.start_terminal);
            clusterdata.push(item.trips);
            clusterdata.push(item.end_terminal);
            cluster.push(clusterdata);
        }
    });
    return cluster;
}

function generateStationMap() {
    $.getJSON("data/station.json", function(data) {
       data.forEach(function(item) {
           var stationCity = [];
           stationCity.push(item.name);
//           stationCity.push(item.landmark);
           stationMap[item.station_id] = stationCity; 
       }); 
    });  
}


function plot3dScatterPlot() {
// Give the points a 3D feel by adding a radial gradient
    Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.4,
                cy: 0.3,
                r: 0.5
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
            ]
        };
    });

    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            margin: 100,
            type: 'scatter',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 30,
                depth: 250,
                viewDistance: 5,
                fitToPlot: false,
                frame: {
                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                }
            }
//            zoomType: 'x'
        },
        title: {
            text: 'Station Trip Activity Analysis'
        },
        subtitle: {
            text: $('#city option:selected').text()
        },
        yAxis: {
            title: 'Total trips'
        },
        xAxis: {
            gridLineWidth: 1,
            title: 'Starting station'
        },
        zAxis: {
            showFirstLabel: true,
            title: 'Ending station'
        },
        legend: {
            enabled: true
        },
        tooltip: {
            pointFormatter: function() {
                return 'Trip statistics:<br>From: <b>' + stationMap[this.x] + '</b><br>To: <b>' + stationMap[this.z] + '</b><br><b>Trips: ' +
                    this.y;
            }
        },
        series: [{
            name: 'Cluster 1',
            color: 'rgba(255,0,0,0.5)',
            data: cluster1
        }, {
            name: 'Cluster 2',
            color: 'rgba(0,127,0,0.5)',
            data: cluster2
        }, {
            name: 'Cluster 3',
            color: 'rgba(0,0,255,0.5)',
            data: cluster3
        }]
    });


    // Add mouse events for rotation
    $(chart.container).bind('mousedown.hc touchstart.hc', function (eStart) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.pageX,
            posY = eStart.pageY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            newAlpha,
            newBeta,
            sensitivity = 5; // lower is more sensitive

        $(document).bind({
            'mousemove.hc touchdrag.hc': function (e) {
                // Run beta
                newBeta = beta + (posX - e.pageX) / sensitivity;
                chart.options.chart.options3d.beta = newBeta;

                // Run alpha
                newAlpha = alpha + (e.pageY - posY) / sensitivity;
                chart.options.chart.options3d.alpha = newAlpha;

                chart.redraw(false);
            },
            'mouseup touchend': function () {
                $(document).unbind('.hc');
            }
        });
    });
}

$(function () {
     $("#nav").load('/WebsiteData/HTML/Templates/nav.html');
    $("#HeatShowOtherGraphs").load('/WebsiteData/HTML/Templates/myModal.html');
    $.getScript('/WebsiteData/JS/myModal.js',function(){
        console.log("modal script loaded..");
    });
    generateStationMap();
    getCitywiseData("San Jose");
    $('#city').change(function() {
        getCitywiseData($('#city option:selected').text());
    })
});