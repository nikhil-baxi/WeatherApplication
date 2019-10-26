//services

weatherApp.service('cityService', ['$resource', '$routeParams', function($resource, $routeParams){
  this.city = "New York";
  this.count = "2";
  this.lat = 40.7306;
  this.lon = -73.9867;
}])

weatherApp.service('weatherService', ['$resource', 'cityService', function($resource, cityService){
  this.weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";
  this.weatherApi = $resource(this.weatherUrl);
  this.weatherApiResult =  function() {
     return this.weatherApi.get({ 
       APPID: 'd888d4a5efeecec2856781a807473aa4', 
       q: cityService.city, 
       cnt: cityService.count,
       lat: cityService.lat,
       lon: cityService.lat,
       units: "metric"
      }).$promise
  };

  this.weatherResult = this.weatherApiResult().then(function (data) {
    return data;
  });


}])

weatherApp.service('mapsService', function(weatherService){
  this.weatherApi = weatherService.weatherApiResult();

  accessToken = 'pk.eyJ1IjoibmlraGlsLWIiLCJhIjoiY2sxOG94dzliMHVkMTNjbXJheThpa2F0eiJ9.t8ymhObtXFBzDHJCSFg_IQ';
  
  this.map = function(lon, lat){

    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [lon, lat], // starting position [lon, lat] lat: 40.7306, lon: -73.9867
      zoom: 10, // starting zoom
      // pitch: 100,
      interactive: true,
      accessToken: accessToken
    })

    geoLocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    return {
      map: map.addControl(geoLocate)
    }
  }
  this.flyTo = function(newLon, newLat){
    console.log('new dat' + newLon + ',' + newLat)
    map.flyTo({
      center: [newLon, newLat]
    })
  }
  // console.log(this.map( -73.9867, 40.7306 ); 
})

weatherApp.service('locateMeService', function(mapsService){
  return {
    control:  new mapboxgl.GeolocateControl(
      {
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
  }
})
