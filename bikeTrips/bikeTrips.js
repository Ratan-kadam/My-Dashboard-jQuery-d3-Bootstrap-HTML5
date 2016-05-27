var bikeList, sanJoseTrips, paloAltoTrips, redwoodCityTrips, mountainViewTrips, sanFranciscoTrips;

function getBikeTrips() {
    $.getJSON("data/bikeTripsPerCity.json", function(data) {    
        bikeList = data.bike_id;
        sanJoseTrips = data.sanjose_trips;
        paloAltoTrips = data.paloalto_trips;
        redwoodCityTrips = data.redwood_trips;
        mountainViewTrips = data.mountainview_trips;
        sanFranciscoTrips = data.sanfrancisco_trips;
        plotStackColumns();
    });
}

function plotStackColumns() {
    $('#container').highcharts('StockChart', {
        chart: {
            type: 'column',
            zoomType: 'x'
        },
        title: {
            text: 'Bike Trips Analysis'
        },
        xAxis: {
            categories: bikeList,
            allowDecimals: false,
            labels: {
                formatter: function() {
                    return this.value;
                }
            },
            title: {
                text: 'Bike#'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total trips'
            }, 
            labels: {
                align: 'left'
            }
        },
        legend: {
            enabled: true,
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: true
        },
        tooltip: {
            headerFormat: '<b>Bike#: {point.x}</b><br/>',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} trips</b><br/>'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                turboThreshold: 0,
                getExtremesFromAll: false,
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            },
            series: {
                gapSize: 20
            }
        },
        rangeSelector: {
            enabled: false,
            inputEnabled: false
        },
        navigator: {
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            }
        },
        series: [
            {
            name: 'San Francisco',
            data: sanFranciscoTrips
        }, 
            {
            name: 'San Jose',
            data: sanJoseTrips
        }, {
            name: 'Mountain View',
            data: mountainViewTrips
        }, {
            name: 'Redwood City',
            data: redwoodCityTrips
        }, {
            name: 'Palo Alto',
            data: paloAltoTrips
        }]
    });
}


$(function () {
    $("#nav").load('/WebsiteData/HTML/Templates/nav.html');
    $("#HeatShowOtherGraphs").load('/WebsiteData/HTML/Templates/myModal.html');
    $.getScript('/WebsiteData/JS/myModal.js',function(){
        console.log("modal script loaded..");
    });
    getBikeTrips();
});