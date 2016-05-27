var yearSelected = '2015';
var dayWiseTripsData = {};
var monthWiseTripsData = {};
var hoursWiseTripsData = {};
var weekdayWiseTripsData = {};
var weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var weekends = ['Saturday', 'Sunday'];
var days = weekDays.concat(weekends);
var hours = [];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function initlizeArray() {
    for (var i = 0; i < days.length; i++) {
        dayWiseTripsData[days[i]] = {
            'Subscriber': 0,
            'Customer': 0,
            'total': 0
        }
    }

    for (var i = 0; i < months.length; i++) {
        monthWiseTripsData[months[i]] = {
            'Subscriber': 0,
            'Customer': 0,
            'total': 0
        }
    }

    for (var i = 0; i < 24; i++) {
        var key = i < 10 ? ('0' + i) : i;
        hours.push(key);
        hoursWiseTripsData[key] = {
            'Subscriber': 0,
            'Customer': 0,
            'total': 0
        }
    };


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

    weekdayWiseTripsData = {
        'Weekday': {
            'Subscriber': 0,
            'Customer': 0,
            'total': 0
        },
        'Weekend': {
            'Subscriber': 0,
            'Customer': 0,
            'total': 0
        }
    }

}


$(function() {
  
    loadDataHourDay();
    $("#year2015,#year2014").click(function() {
        loadDataHourDay();
    });
})


function loadDataHourDay() {
      initlizeArray();
    yearSelected = $('.myYear:checked').val();
    $.getJSON('/subscriber/data/' + yearSelected + 'Monthwise.json', function(data) {
        _.forEach(data, function(eachTrip) {
            monthWiseTripsData[eachTrip.month_of_trip][eachTrip.subscriber_type] = monthWiseTripsData[eachTrip.month_of_trip][eachTrip.subscriber_type] + eachTrip.trips;
            monthWiseTripsData[eachTrip.month_of_trip]['total'] = monthWiseTripsData[eachTrip.month_of_trip]['total'] + eachTrip.trips;
        });
        loadMonthWiseChart();
        $.getJSON('/subscriber/data/' + yearSelected + 'Daywise.json', function(data) {
            _.forEach(data, function(eachTrip) {
                dayWiseTripsData[eachTrip.day_of_week][eachTrip.subscriber_type] = dayWiseTripsData[eachTrip.day_of_week][eachTrip.subscriber_type] + eachTrip.trips;
                dayWiseTripsData[eachTrip.day_of_week]['total'] = dayWiseTripsData[eachTrip.day_of_week]['total'] + eachTrip.trips;

            });
            _.forEach(dayWiseTripsData, function(value, key) {

                if (weekDays.indexOf(key) > -1) {
                    weekdayWiseTripsData.Weekday.Subscriber = weekdayWiseTripsData.Weekday.Subscriber + value.Subscriber;
                    weekdayWiseTripsData.Weekday.Customer = weekdayWiseTripsData.Weekday.Customer + value.Customer;
                } else {
                    weekdayWiseTripsData.Weekend.Subscriber = weekdayWiseTripsData.Weekend.Subscriber + value.Subscriber;
                    weekdayWiseTripsData.Weekend.Customer = weekdayWiseTripsData.Weekend.Customer + value.Customer;
                }
            })
            loadDayWiseChart();
            $.getJSON('/subscriber/data/' + yearSelected + 'Hourwise.json', function(data) {
                _.forEach(data, function(eachTrip) {
                    hoursWiseTripsData[eachTrip.hour_of_trip][eachTrip.subscriber_type] = hoursWiseTripsData[eachTrip.hour_of_trip][eachTrip.subscriber_type] + eachTrip.trips;
                    hoursWiseTripsData[eachTrip.hour_of_trip]['total'] = hoursWiseTripsData[eachTrip.hour_of_trip]['total'] + eachTrip.trips;
                });
                loadHourWiseChart();
            });
        });
    });
}

function loadDayWiseChart() {
    $('#dayWiseUserType').highcharts({
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        },

        title: {
            text: 'Total trips during year-' + yearSelected + ', grouped by days and bike user type'
        },

        xAxis: {
            title: {
                text: 'Day'
            },
            categories: weekDays.concat(weekends)
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of Rides'
            }
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },

        series: [{
            name: 'Total',
            data: _.pluck(dayWiseTripsData, 'total'),
            stack: 'stack2'
        },{
            name: 'Customer',
            data: _.pluck(dayWiseTripsData, 'Customer'),
            stack: 'stack1'
        }, {
            name: 'Subscriber',
            data: _.pluck(dayWiseTripsData, 'Subscriber'),
            stack: 'stack1'
        }]
    });

    $('#weekWiseUserType').highcharts({
        chart: {
            type: 'column'
        },

        title: {
            text: 'Total trips during year-' + yearSelected + ', grouped by weekdays/weekends and bike user type'
        },

        xAxis: {
            categories: ['Weekday', 'Weekend', 'Total']
        },
        labels: {
            items: [{
                html: '<b>Total trips</b>',
                style: {
                    left: '420px',
                    top: '30px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of Rides'
            }
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },

        series: [{
            name: 'Total',
            data: [weekdayWiseTripsData.Weekday.Customer + weekdayWiseTripsData.Weekday.Subscriber, weekdayWiseTripsData.Weekend.Customer + weekdayWiseTripsData.Weekend.Subscriber],
            stack: 'stack2'
        },{
            name: 'Subscriber',
            data: [weekdayWiseTripsData.Weekday.Subscriber, weekdayWiseTripsData.Weekend.Subscriber],
            stack: 'stack1'
        }, {
            name: 'Customer',
            data: [weekdayWiseTripsData.Weekday.Customer, weekdayWiseTripsData.Weekend.Customer],
            stack: 'stack1'
        }]
    });

}

function loadMonthWiseChart() {

    $('#monthWiseUserType').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Total trips during year-' + yearSelected + ', grouped by Month and bike user type'
        },

        xAxis: {
            title: {
                text: 'Month'
            },
            categories: months,
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of Rides'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Total',
            data: _.pluck(monthWiseTripsData, 'total'),
            stack: 'stack1'
        },{
            name: 'Customer',
            data: _.pluck(monthWiseTripsData, 'Customer'),
            stack: 'stack1'
        }, {
            name: 'Subscriber',
            data: _.pluck(monthWiseTripsData, 'Subscriber'),
            stack: 'stack1'
        }]
    });

}

function loadHourWiseChart() {

    $('#hourWiseUserType').highcharts({
        chart: {
            type: 'column'
        },

        title: {
            text: 'Total trips during year-' + yearSelected + ', grouped by hours and bike user type'
        },

        xAxis: {
            title: {
                text: 'Hours'
            },
            categories: hours
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of Rides'
            }
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },

        series: [{
            name: 'Total',
            data: _.pluck(hoursWiseTripsData, 'total'),
            stack: 'stack2'
        },{
            name: 'Customer',
            data: _.pluck(hoursWiseTripsData, 'Customer'),
            stack: 'stack1'
        }, {
            name: 'Subscriber',
            data: _.pluck(hoursWiseTripsData, 'Subscriber'),
            stack: 'stack1'
        }]
    });



}