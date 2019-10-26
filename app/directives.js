
//derictive

weatherApp.directive('weatherReport', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/weatherReport.html',
    replace: true,
    scope: {
      weatherDay: "=",
      convertToCelcius: "&",
      convertToDate: "&",
      dateFormat: "@",
      timeFormat: "@"
    }
  }
})

weatherApp.directive('weatherReportTable', function(){
  return {
    restrict: 'E',
    templateUrl: "directives/weatherReportTable.html",
    replace: true,
    scope: {
      weatherResult: "=",
      weatherDay: "=",
      convertToCelcius: "&",
      convertToDate: "&",
      dateFormat: "@",
      timeFormat: "@"
    }
  }
})

weatherApp.directive('menuItems', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/menuItems.html',
    replace: true,
    scope : {
      city: "=",
      count: "="
    }
  }
})

weatherApp.directive('maps', function(){
  return {
    restrict: 'E',
    template: "<div id='map' style='position: absolute; width: 130%; height: 130%; z-index: 0'> </div>",
    replace: true,
    controller: 'mapsController'
  }
})

weatherApp.directive('locateMeIcon', function(){
  return {
    restrict: 'E',
    template:"<i class='fa fa-location-arrow icon'></i>",
    replace: true,
    controller: 'mapsController'
  }
})

weatherApp.directive('geoCoder', function(){
  return {
    restrict: 'E',
    template:"<div id='geocoder' class='geocoder'></div>",
    replace: true,
    controller: 'mapsController'
  }
})

// weatherApp.directive('clickItem', function(){
//   return{
//     link: function(scope, ele, arguments){
//         console.log(arguments);
//     }
//   }
// })