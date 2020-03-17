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

const downtown_url = 'https://anrmaps.vermont.gov/arcgis/rest/services/map_services/ACCD_smartgrowth/MapServer/9'

let downtowns = L.esri.featureLayer({
  url: downtown_url
}).addTo(map);

var downtownDistrict = document.getElementById('district');

downtowns.bindPopup( layer =>
  layer.feature.properties.CommunityName + " Downtown Area"
)
var query = L.esri.query({
  url: downtown_url
});

downtownDistrict.addEventListener('change', function () {
//  downtowns.setWhere(downtownDistrict.value);
  console.log(downtownDistrict.value)
  const query_response = query.where(downtownDistrict.value).bounds(function (error, latLngBounds, response) {
  if (error) {
    console.log(error);
    return;
  }
  map.fitBounds(latLngBounds);
});
  console.log(query_response)
});


// query downtowns at lat long of click
map.on('click', function(e) {error, int, response
  const int = query.intersects(
    if (error) {
    console.log(error);
    return;
  }
  console.log();)
  console.log(int)

  query.run(function(error, featureCollection, response) {
    if (error) {
      console.log(error);
      return;
    }
    console.log('Found ' + featureCollection.features.length + ' features');
  });
});
