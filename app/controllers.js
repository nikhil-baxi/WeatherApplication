//controlers
weatherApp.controller('homeController', ['$scope', '$resource', 'cityService', 'mapsService',
  function ($scope, $resource, cityService, mapsService) {
    $scope.city = cityService.city;
    $scope.map = mapsService.map(cityService.lat, cityService.lon);

    $scope.$watch('city', function () {
      cityService.city = $scope.city;

      $scope.newCitySuggestion;
      $scope.url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ $scope.city +'.json';

      $scope.urlResource = $resource($scope.url);
      $scope.urlResponsePromise =  function() {
        return $scope.urlResource.get({ 
          access_token: 'pk.eyJ1IjoibmlraGlsLWIiLCJhIjoiY2sxOG94dzliMHVkMTNjbXJheThpa2F0eiJ9.t8ymhObtXFBzDHJCSFg_IQ',
          autocomplete: true
        }).$promise
      };
      
      $scope.urlResponse = $scope.urlResponsePromise().then(function (data) {
        console.log(data.features)
        $scope.newCitySuggestion = data.features;
      });
    })
    
    $scope.itemClicked = function (data){
      console.log('clicked: ' + data);
      
      // $scope.map = mapsService.map.flyTo({
      //   center: data,
      //   zoom: '13'
      // })

      $scope.city = cityService.city = data.place_name;
      $scope.lon = cityService.lon = data.center[0]; 
      $scope.lat = cityService.lat = data.center[1]
      $scope.map = mapsService.map(data.center[0], data.center[1]);

    }
  }
]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$sce', '$routeParams', 'cityService', 'weatherService',
  function ($scope, $resource, $sce, $routeParams, cityService, weatherService) {
    $scope.city = cityService.city;

    $scope.count = $routeParams.days || '2';
    cityService.count = $scope.count;

    $scope.weatherResult = weatherService.weatherApiResult().then(function (data) {
      $scope.weatherResult = data;
      console.log('weather data');
      console.log(data)
    });

    $scope.convertToCelcius = function (degk) {
      return parseFloat(degk - 273.15).toFixed(2);
    };

    $scope.convertToDate = function (date) {
      return new Date(date * 1000);
    }
  }
]);

weatherApp.controller('forecastGraphController', ['$scope', '$routeParams', '$filter', 'cityService', 'weatherService',
  function ($scope, $routeParams, $filter, cityService, weatherService) {
    $scope.city = cityService.city;
    $scope.count = cityService.count ='7';
    $scope.weatherResult = weatherService.weatherApiResult();

    var data = {};
    var label = [];
    var max_temp = [];
    var min_temp = [];
    var humidity = [];

    $scope.weatherResult.then(function onSuccess(response) {
      angular.forEach(response.list, function (value, key) {
        data[key] = (value);
      });
      for (var el in data) {
        for (var elel in data[el]) {
          if (elel == 'dt') {
            var date = new Date();
            date.setDate(data[el][elel])
            label.push($filter('date')($filter('convertToDate')(data[el][elel]), 'yyyy-MM-dd hh:mm:ss a'));
          }
          if (elel == 'main') {
            max_temp.push(data[el][elel]['temp_max']);
            min_temp.push(data[el][elel]['temp_min']);
            humidity.push(data[el][elel]['humidity']);
          }
        }
      }
    })

    $scope.data = {
      labels: label,
      datasets: [
        {
          label: "humudity",
          backgroundColor: 'rgba(255, 206, 86, 1)',
          borderColor: 'rgba(255, 206, 86, 1)',
          data: humidity
        },
        {
          label: "min temp",
          backgroundColor: 'rgba(75, 192, 192, 1)',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: min_temp
        },
        {
          label: "max temp",
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255,99,132,1)',
          data: max_temp
        }
      ]
    };

    $scope.options = {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          // stacked: true
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          // stacked: true
        }]
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'red'
        }
      },
      title: {
        display: true,
        text: 'Weather report for the next ' + $scope.count + 'hours'
      }

      // Chart.js options can go here.

    };
  }
]);

weatherApp.controller('locateMe',  ['$scope', 'cityService', 'mapsService', 'weatherService', 'locateMeService',
  function ($scope, cityService, mapsService, weatherService, locateMeService) {
    $scope.city = cityService.city;
    

  }
])

weatherApp.controller('mapsController', ['$scope', '$routeParams', '$timeout', '$resource', 'cityService', 'mapsService', 'weatherService',
  function ($scope, $routeParams, $timeout, $resource, cityService, mapsService, weatherService) {
    $scope.mapBoxApi = 'https://api.mapbox.com';
    $scope.updatedCity = cityService.city;
    $scope.count = "2";

    console.log(" from maps:" + $scope.updatedCity);

    $scope.map;
    
    $scope.weatherResult = weatherService.weatherApiResult();
    var data = {};

    $scope.weatherResult.then(function onSuccess(response) {
      angular.forEach(response.city, function (value, key) {
        data[key] = (value);
      });
      for (var element in data) {
        if (element == "coord") {
          $scope.lat = data[element].lat;
          $scope.lon = data[element].lon;
          $scope.map = mapsService.map($scope.lon, $scope.lat);
        }
      }
    })

    $scope.location = function () { 
      $scope.map.map._controls[2]._geolocateButton.click(); 
      $timeout($scope.coordinates, 2000);
    };

    $scope.coordinates = function() {
      console.log($scope.map.map._controls[2]._lastKnownPosition.coords)
    }
  }
]);

//can be deleated
weatherApp.controller('newMapController', ['$scope', '$resource', function($scope, $resource){
  $scope.newCity = 'itpl'

  $scope.token = mapboxgl.accessToken = 'pk.eyJ1IjoibmlraGlsLWIiLCJhIjoiY2sxOG94dzliMHVkMTNjbXJheThpa2F0eiJ9.t8ymhObtXFBzDHJCSFg_IQ';
  
  $scope.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.9867, 40.7306], // starting position [lon, lat] lat: 40.7306, lon: -73.9867
    zoom: 8, // starting zoom
    interactive: true,
    accessToken: $scope.token,
  })

  // $scope.geocoder = new MapboxGeocoder({
  //   accessToken: mapboxgl.accessToken,
  //   mapboxgl: mapboxgl
  // });
  // console.log($scope.geocoder.onAdd($scope.map))
  // document.getElementById('geocoder').appendChild($scope.geocoder.onAdd($scope.map));

  // $scope.$watch('newCity', function(){
    
  //   console.log($scope);
  // })
     
  // $scope.newCitySuggestion.appendChild($scope.geocoder.onAdd(map));



  $scope.$watch('newCity', function () {
    $scope.newCitySuggestion;
    $scope.url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ $scope.newCity +'.json';

    $scope.urlResource = $resource($scope.url);
    $scope.urlResponsePromise =  function() {
      return $scope.urlResource.get({ 
        access_token: $scope.token,
        autocomplete: true
      }).$promise
    };
  
    $scope.urlResponse = $scope.urlResponsePromise().then(function (data) {
      console.log(data)
      $scope.newCitySuggestion = data.features;
      console.log($scope.map)
      // $scope.map.flyTo = data.features[0].center;
    });
  })
  
  $scope.itemClicked = function (data){
    console.log('clicked: ' + data);
    // $scope.data = data.split(',');
    $scope.map.flyTo({
      center: data,
      zoom: '13'
    })
  }
  
}])