angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  $scope.login = function(){
    $state.go('routeSelection');
  }
})
.controller('RouteSelectionCtrl', function($scope, $state) {
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
    pos.getCurrentPosition(success, error); 
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
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('FriendsCtrl', function($scope, Coords) {
  $scope.coords = Coords.all();
})
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})


