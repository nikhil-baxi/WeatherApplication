// filters

weatherApp.filter('convertToDate', function(){
    return function(date){
        return new Date(date * 1000);
    };
});