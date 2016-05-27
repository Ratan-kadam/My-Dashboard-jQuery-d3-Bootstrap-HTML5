$(function () {
    var cluster1 = [];
    var cluster2 = [];
    var cluster3 = [];
    var cluster4 = [];
    var stationMap = {};
    
    $.getJSON("data/stationEndingTripCluster.json", function(data) {
        cluster1 = getClusterData(data, 1);
        console.log(cluster1);
        cluster2 = getClusterData(data, 2);
        console.log(cluster2);
        cluster3 = getClusterData(data, 3);
        console.log(cluster3);
        cluster4 = getClusterData(data, 4);
        console.log(cluster4);
        generateStationMap();
    });
    
    function generateStationMap() {
        $.getJSON("data/station.json", function(data) {
           data.forEach(function(item) {
               var stationCity = [];
               stationCity.push(item.name);
               stationCity.push(item.landmark);
               stationMap[item.station_id] = stationCity; 
           });
           plotCluster(); 
        });  
    }
    
    function getClusterData(data, clusterNum) {
        var cluster = [];
        data.forEach(function(item) {
            if(item.cluster == clusterNum) {
                var clusterdata = [];
                clusterdata.push(item.end_terminal);
                clusterdata.push(item.trips);
                cluster.push(clusterdata);
            }
        });
        return cluster;
    }
    
    function plotCluster() {
        $('#container').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Station clustering based on trips served'
        },
        subtitle: {
            text: 'K-Means Clustering'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Destination Station Id'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Total trips ending'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '<b>Station Id:</b> {point.x}, <b>Trips:</b> {point.y}',
                    pointFormatter: function() {
                                        return '<b>Station:</b> ' + stationMap[this.x][0] + ' <b>Trips:</b> ' + this.y + 
                                            '<br><b>City:</b> ' + stationMap[this.x][1];
                                    }
                }
            }
        },
        series: [{
            name: 'Super High Usage Stations',
            color: 'rgba(255, 0, 0, .5)',
            data: cluster1

        }, {
            name: 'Low Usage Stations',
            color: 'rgba(0, 255, 0, .5)',
            data: cluster2
        }, {
            name: 'Medium Usage Stations',
            color: 'rgba(0, 0, 255, .5)',
            data: cluster3
        }, {
            name: 'High Usage Stations',
            color: 'rgba(75, 0, 130, .5)',
            data: cluster4
        }]
    });
    }
    
});

