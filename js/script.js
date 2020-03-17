// Set counter

let map = L.map('mapid').setView([44, -72.5], 7);
//let map = L.map('mapid');

// Basemaps
let layer = L.esri.basemapLayer('Topographic').addTo(map);

var layerLabels;

function setBasemap (basemap) {
  if (layer) {
    map.removeLayer(layer);
  }

  layer = L.esri.basemapLayer(basemap, {detectRetina: true});

  map.addLayer(layer);

  if (layerLabels) {
    map.removeLayer(layerLabels);
  }

  if (
    basemap === 'ShadedRelief' ||
    basemap === 'Oceans' ||
    basemap === 'Gray' ||
    basemap === 'DarkGray' ||
    basemap === 'Terrain'
  ) {
    layerLabels = L.esri.basemapLayer(basemap + 'Labels', {detectRetina: true});
    map.addLayer(layerLabels);
  } else if (basemap.includes('Imagery')) {
    layerLabels = L.esri.basemapLayer('ImageryLabels', {detectRetina: true});
    map.addLayer(layerLabels);
  }
}

document
  .querySelector('#basemaps')
  .addEventListener('change', function (e) {
    var basemap = e.target.value;
    setBasemap(basemap);
  });

let downtowns = L.esri.featureLayer({
  url: 'http://anrmaps.vermont.gov/arcgis/rest/services/map_services/ACCD_smartgrowth/MapServer/9'
}).addTo(map);

var downtownDistrict = document.getElementById('district');

downtownDistrict.addEventListener('change', function () {
  downtowns.setWhere(downtownDistrict.value);
});

// query the layer above to get all CommunityNames and populate the dropdown?
require(["esri/request"], function(esriRequest) {
  // Define the 'options' for the request
  var options = {
    query: {
      where: '1=1',
      outFields: 'CommunityName',
      returnGeometry: 'false',
      returnTrueCurves: 'false',
      returnIdsOnly: 'false',
      returnCountOnly: 'false',
      returnZ: 'false',
      returnM: 'false',
      returnDistinctValues: 'false',
      returnExtentsOnly: 'false',
      f: 'pjson'
    },
    responseType: "json"
  };





  function request() {
    var url = 'http://anrmaps.vermont.gov/arcgis/rest/services/map_services/ACCD_smartgrowth/MapServer/9';
    esriRequest(url, options).then(function(response) {
      console.log("response", response);
      var responseJSON = JSON.stringify(response, null, 2);
      console.log(responseJSON)
    });
  };
})
