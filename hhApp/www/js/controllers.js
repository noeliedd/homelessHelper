angular.module('starter.controllers', [])
.controller('TestCtrl',['$scope','$resource',function($scope, $resource){
  var Meetup = $resource("http://homelessbackend-187844.euw1.nitrousbox.com/api/hello");
  
    $scope.createTest= function(){
    var meetup = new Meetup();
    meetup.name = $scope.testText
    console.log($scope.testText);
    meetup.$save();
    $scope.testText ="";
    }
}])
.controller('LoginCtrl',function($scope,$http,$ionicPopup,$state){
  $scope.login = function(){
  var email = $scope.email;
  var password = $scope.password;
  console.log(email,password);//test
    
    $http.post('http://homelessbackend-187844.euw1.nitrousbox.com/api/loginUser', {email: email, password: password}).
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
.controller('RouteSelectionCtrl', function($scope, $state,ActiveRoutes) {
  ActiveRoutes.getActiveRoutes();
  $scope.routeA = function(){  
    $state.go("tab.route");
  };
  $scope.routeB = function(){
    $state.go("tab.route");
  }; 
  $scope.routeC = function(){
    $state.go("tab.route");
  }; 
  $scope.routeD = function(){
    $state.go("tab.route");
  };    
})
.controller('MapCtrl', function($scope, Coords) {
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

       $scope.coords = Coords.all();     
       $scope.map = map; 

       for(var i=0;i<$scope.coords.length;i++)
       {
          var lat = $scope.coords[i].lat;
          var lng = $scope.coords[i].lng;
          var coord = new google.maps.LatLng(lat,lng);       
          var path = poly.getPath();
          path.push(coord);     
        }
     }   
   }
})
.controller('RouteCtrl', function($scope, $state) {
  $scope.addDropDetails = function(){
    $state.go("tab.route-drop");
  }
})
.controller('DropCtrl', function($scope, $state, DropOptions) {
    $scope.dropDownValue = DropOptions.dropDownValue();
    $scope.submitDropDetails = function(a, b, c, d, e, f){
      console.log(a.value,b.value,c.value,d.value, e.value, f.value);     
      $state.go("tab.route");
  }
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('FriendsCtrl', function($scope, Coords) {
  $scope.coords = Coords.all();
  console.log($scope.coords[0]);
})
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})


