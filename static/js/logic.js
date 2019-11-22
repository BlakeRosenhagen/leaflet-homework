
console.log("working");

var apiKey = "pk.eyJ1IjoiYmxha2Vyb3NlbmhhZ2VuIiwiYSI6ImNrMzk4eHpubjAwZWEzbHE3OTR2MGF3MXcifQ.yLp8Bhit_I6jc2e6SHsbPQ";

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 10,
  id: "mapbox.streets",
  accessToken: apiKey
});

var map = L.map("mapid", {
  center: [
    40.7, -94.5
  ],
  zoom: 3
});

//this serves as the back ground of the webpage
graymap.addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  function styleInfo(feature) {
    return {
      opacity: .8,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#0335fc",
      radius: getRadius(feature.properties.mag),
      stroke: true,
    };
  }

  function getRadius(magnitude) {

    return magnitude;
  }
  function getColor(magnitude) {
    switch (true) {


    case magnitude > 5:
      return "#de0202";
    case magnitude > 5:
      return "#de8602";
    case magnitude > 4:
      return "#d7de16";
    case magnitude > 3:
      return "#2b9e11";
    case magnitude > 2:
      return "#116a9e";
    case magnitude > 1:
      return "#111d9e";
    default:
      return "#98ee00";
    }
  }

  
 

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);

  
  var legend = L.control({
    position: "bottomright"
  });


  
  legend.addTo(map);
});
