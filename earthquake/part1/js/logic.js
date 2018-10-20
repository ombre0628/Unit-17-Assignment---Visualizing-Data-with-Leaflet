
var myMap = L.map("map", {
  center: [39.50, -98.35],
  zoom: 4
});

var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});


lightmap.addTo(myMap)


var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

function getColor(d){
  return d > 5 ? '#bd0026' :
        d > 4  ? '#f03b20' :
        d > 3  ? '#fd8d3c' :
        d > 2  ? '#feb24c' :
        d > 1  ? '#fed976' :
                  '#ffffb2';
};

d3.json(url, function(data){
  var myLayer = L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {

      //Create marker options
      var geojsonCircleOptions = {
        radius: feature.properties.mag*7000,
        fillColor: getColor(feature.properties.mag),
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      };      
      
      return L.circle(latlng, geojsonCircleOptions);
    }
  });
  myLayer.addTo(myMap);
  console.log(data);
});


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 2, 3, 4, 5],
    labels = [];

    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);