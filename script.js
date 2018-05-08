var DEFAULT_ZOOM_LEVEL = 4
var HE_IS_EVERYWHERE_ZOOM_LEVEL = 2
var INTERVAL_TIME_IN_MS = 100
var NUM_PLACES = 50

var map
var marker
var markers = []

function createRandomCoordinates() {
  // 80 because it might get cut off map
  var lat = (Math.random() * 2 - 1) * 80
  var lon = (Math.random() * 2 - 1) * 180
  return new google.maps.LatLng(lat, lon)
}

function initMap() {
  var location = createRandomCoordinates()
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: DEFAULT_ZOOM_LEVEL,
    center: location
  })
  marker = new google.maps.Marker({
    position: location,
    animation: google.maps.Animation.DROP,
    map: map
  })
}

function setMarker() {
  resetAllMarkers()
  var location = createRandomCoordinates()
  marker = new google.maps.Marker({
    position: location,
    animation: google.maps.Animation.DROP,
  })
  map.panTo(location)
  marker.setMap(map)
}

function whereIsHeTho(n) {
  if (n === NUM_PLACES) {
    resetAllMarkers()
    document.getElementById('banner').classList.remove('hide')
    document.getElementById('banner').classList.add('show')
    map.setZoom(HE_IS_EVERYWHERE_ZOOM_LEVEL)
  }
  if (n > 0) {
    setTimeout(() => {
      var location = createRandomCoordinates()
      var m = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
      })
      markers.push(m)
      map.panTo(location)
      m.setMap(map)
      whereIsHeTho(n - 1)
    }, INTERVAL_TIME_IN_MS)
  }
}

function resetAllMarkers() {
  marker.setMap(null)
  markers.forEach(function(marker) {
    marker.setMap(null)
  })
}

var btn = document.getElementById('btn')
btn.addEventListener('click', setMarker)

setTimeout(() => {
  var konami = new Konami(function() {
    whereIsHeTho(NUM_PLACES)
  })
}, 100)
