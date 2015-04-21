angular.module('starter.controllers', [])

//---------------------------------------LOGIN CONTROLLER---------------------------------------------------------
.controller('LoginCtrl',function($scope,$http,$ionicPopup,$state){
  $scope.login = function(){
  var email = $scope.email;
  var password = $scope.password;
  console.log(email,password);//test
    
    $http.post('http://ichh-202592.euw1-2.nitrousbox.com/api/loginUser', {email: email, password: password}).
    success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    if(data == "valid"){
      $state.go('routeSelection');
    }else{
      var alertPopup = $ionicPopup.alert({
      title: data,
      template: 'Please check your credentials!'
      });      
    }
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    $scope.email ="";
    $scope.password ="";
  }
})

//---------------------------------------SELECTING FROM ACTIVE ROUTES CONTROLLER------------------------------------------
.controller('RouteSelectionCtrl', function($scope, $state,ActiveRoutes,Coords) {
   ActiveRoutes.getAll().then(function(d){
     $scope.routes =d;
     console.log($scope.routes);
   }); 
    $scope.selectRoute = function(route){
     console.log("This is in the controller"+route)
     Coords.getAll(route).then(function(d){
     $state.go("tab.route");
   });      
  }; 
})

//---------------------------------------CONTROLLER FOR GOOGLE MAP--------------------------------------------------------
.controller('MapCtrl', function($scope) {
   console.log("Here is the juice");
    var selectedRoute = JSON.parse(window.localStorage.getItem("savedRoute"));
    console.log(selectedRoute);
    console.log(window.localStorage.getItem("savedRouteId"));
    displayMap();
    $scope.refreshMap = function(){  
    displayMap();
  };
    function displayMap(){
      var home;      
      pos = navigator.geolocation;
      pos.getCurrentPosition(success, error,{ enableHighAccuracy: true,}); 
      function success(position)
      {  
        var mylat = position.coords.latitude;
        var mylong = position.coords.longitude;     
        home = new google.maps.LatLng(mylat, mylong);
        initialize();
      }
      function error()
      {   
        alert("Please ensure your browser supports location tracking and that you have it enabled.");
      } 
      function initialize() {
        var mapOptions = {center: home,zoom: 18, mapTypeId: google.maps.MapTypeId.ROADMAP,draggable: true}; 
        map = new google.maps.Map(document.getElementById("map"), mapOptions);         
        var currentPosMarker = new google.maps.Marker({map: map,position:home, animation: google.maps.Animation.BOUNCE}); 
        var image = 'img/homePin.png';
        var hQ = new google.maps.LatLng(53.3550092,-6.248268); 
        var marker = new google.maps.Marker({map: map,position:hQ, icon: image});  

    //arrowed line symbol
        var arrowSymbol = {path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,strokeColor: '#FF0000',strokeOpacity: 1.0};
        var polyOptions = {strokeColor: '#FF0000',strokeOpacity: 1.0,strokeWeight: 2,icons: [{
                  icon: arrowSymbol,
                  offset: '100%',
                  repeat:'55px',
              }]};
      //Create polyline and set map to it
        var poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);    
   
       $scope.coords = selectedRoute;     
       $scope.map = map; 

       for(var i=0;i<$scope.coords.length;i++)
       {
          var lat = $scope.coords[i].k;
          var lng = $scope.coords[i].D;
          var coord = new google.maps.LatLng(lat,lng);       
          var path = poly.getPath();
          path.push(coord);     
        }
     }   
   }
})

//---------------------------------------NAVIGATES TO DROP DETAILS FOR PARTICULAR ROUTE-----------------------------------
.controller('RouteCtrl', function($scope, $state) {
  $scope.addDropDetails = function(){
    $state.go("tab.route-drop");
  }
})

//---------------------------------------ADD DROP DETAILS FOR PARTICULAR ROUTE--------------------------------------------------
.controller('DropCtrl', function($scope, $state, DropOptions,$ionicPopup) {
    console.log(window.localStorage.getItem("savedRouteId"));  
    $scope.dropDownValue = DropOptions.dropDownValue();
    $scope.submitDropDetails = function(totalMale,totalMaleFed,totalMaleClothed,totalFemale,totalFemaleFed,totalFemaleClothed){
     // console.log(totalMale.value,totalMaleFed.value,totalMaleClothed.value,totalFemale.value, totalFemaleFed.value, totalFemaleClothed.value);     
     if(totalMale.value === 0 && totalFemale.value === 0){
        var alertPopup = $ionicPopup.alert({
        template: 'You have not entered a total for Male or Female!'
        });        
     }
     else if(totalMale.value < (totalMaleFed.value + totalMaleClothed.value)|| totalFemale.value <(totalFemaleFed.value + totalFemaleClothed.value))
     {
        var alertPopupA = $ionicPopup.alert({
        template: 'Cannot have more Fed/Clothed than total encountered'
        });         
     }else
     {       
       var confirmPopup = $ionicPopup.confirm({
         title: 'Submit Drop Details',
         template: 'Are you sure you want to submit these details?'
       });
       confirmPopup.then(function(res) {
         if(res) {
           console.log('You are sure');
           $state.go("tab.route");           
         } else {
           console.log('You are not sure');
         }
       });
     }          
  }
})

//--------------------------------------------------------------------------------------------------------------------------------

.controller('FriendsCtrl', function($scope, Coords) {
  $scope.coords = Coords.all();
  console.log($scope.coords[0]);
})
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})


