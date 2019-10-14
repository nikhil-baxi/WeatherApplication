//routes
weatherApp.config(function($routeProvider, $sceProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'ui/home/home.html',
      controller: 'homeController'
    })
  
    .when('/forecast', {
      templateUrl: 'ui/forecast/forecast.html',
      controller: 'forecastController'
    })
  
    .when('/forecast/:days', {
      templateUrl: 'ui/forecast/forecast.html',
      controller: 'forecastController'
    })

    .when('/forecastGraphView', {
      templateUrl: "ui/forecastGraph/forecastGraph.html",
      controller: 'forecastGraphController'
    })

    .when('/mapsView', {
      templateUrl: "ui/googleMaps/maps.html",
      controller: "mapsController"
    })

    .when('/newMap', {
      templateUrl: "ui/googleMaps/newMaps.html",
      controller: "newMapController"
    })

    $sceProvider
    .enabled(false);
  });