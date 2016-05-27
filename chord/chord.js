var tripsData = [], stationList = [];

   $("#nav").load('/WebsiteData/HTML/Templates/nav.html',function(){
         console.log("nav loaded");
     });

    $("#HeatShowOtherGraphs").load('/WebsiteData/HTML/Templates/myModal.html');

    $.getScript('/WebsiteData/JS/myModal.js',function(){
        console.log("modal script loaded..");
    });

function generateStationMap(city) {
    city = city || "San Jose";
    stationList = [];
    $.getJSON("data/station.json", function (data) {
        data.forEach(function (item) {
           if (item.landmark.toLowerCase() == city.toLowerCase()) {
                stationList.push(item.name);
            } 
        });
        getTrips(city);
    });
}

function getTrips(city) {
    tripsData = []
    if(city == "San Jose") {
        $.getJSON("data/stationTripCluster3DSanJose.json", function(data) {
            getTripData(data);
            console.log(tripsData);
            plotChordGraph();
        });
    } else if(city == "San Francisco") {
        $.getJSON("data/stationTripCluster3DSanFrancisco.json", function(data) {
            getTripData(data);
            console.log(tripsData);
            plotChordGraph();
        });
    } else if(city == "Palo Alto") {
        $.getJSON("data/stationTripCluster3DPaloAlto.json", function(data) {
            getTripData(data);
            console.log(tripsData);
            plotChordGraph();
        });
    } else if(city == "Redwood City") {
        $.getJSON("data/stationTripCluster3DRedwood.json", function(data) {
            getTripData(data);
            console.log(tripsData);
            plotChordGraph();
        });
    } else if(city == "Mountain View"){
        $.getJSON("data/stationTripCluster3DMountainView.json", function(data) {
            getTripData(data);
            console.log(tripsData);
            plotChordGraph();
        });
    } 
}

function getTripData(data) {
    //create matrix and initiaze it
    var i = 0;
    for(i=0; i<stationList.length; i++) {
        var row = [];
        row[stationList.length-1] = 0;
        row.fill(0);
        tripsData.push(row);
    }
    
    //update trips data
    data.forEach(function (item) {
        if (stationList.indexOf(item.start_station) != -1 
           && stationList.indexOf(item.end_station) != -1) {
            var trip = [];
            tripsData[stationList.indexOf(item.start_station)][stationList.indexOf(item.end_station)] = item.trips;
        }
    });
}

function plotChordGraph() {
    var w = 1280,
        h = 800,
        r1 = h / 2,
        r0 = r1 - 80;

    var fill = d3.scale.category20c();

    var chord = d3.layout.chord()
        .padding(.04)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);

    var arc = d3.svg.arc()
        .innerRadius(r0)
        .outerRadius(r0 + 20);
    
    var format = d3.format(",.3r");
    
    //remove existing diagram if any
    $('#chordDiagram').remove();
    
    var svg = d3.select("#container").append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "chordDiagram")
        .append("svg:g")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    chord.matrix(tripsData);

    var g = svg.selectAll("g.group")
      .data(chord.groups)
      .enter().append("svg:g")
      .attr("class", "group")
      .on("mouseover", fade(.02))
      .on("mouseout", fade(.80));

    g.append("svg:path")
      .style("stroke", function(d) { return fill(d.index); })
      .style("fill", function(d) { return fill(d.index); })
      .attr("d", arc)
    .append("title")
      .text(function(d) {return stationList[d.index] + " served " + format(d.value) + " trips";});

    g.append("svg:text")
      .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + (r0 + 26) + ")"
            + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .text(function(d) { return stationList[d.index]; });

    svg.selectAll("path.chord")
      .data(chord.chords)
      .enter().append("svg:path")
      .attr("class", "chord")
      .style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
      .style("fill", function(d) { return fill(d.source.index); })
      .attr("d", d3.svg.chord().radius(r0))
    .append("title")
      .text(function(d) { return "From: " + stationList[d.source.index] + "\nTo: " + stationList[d.target.index] + "\nTrips: " + format(tripsData[d.source.index][d.target.index]);})

    //Returns an event handler for fading a given chord group.
    function fade(opacity) {
      return function(d, i) {
        svg.selectAll("path.chord")
            .filter(function(d) { return d.source.index != i && d.target.index != i; })
          .transition()
            .style("stroke-opacity", opacity)
            .style("fill-opacity", opacity);
      };
    }
}

$(function() {    
    generateStationMap($('#city option:selected').text());
    $('#city').change(function() {
        generateStationMap($('#city option:selected').text());
    })

});
