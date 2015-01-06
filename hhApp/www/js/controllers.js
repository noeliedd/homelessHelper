angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  $scope.login = function(){
    $state.go('routeSelection');
  }
})
.controller('RouteSelectionCtrl', function($scope, $state) {
  $scope.routeA = function(){
    $state.go("tab.route");
  }
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
.controller('MapCtrl', function($scope) {
  
       /* var myLatlng = new google.maps.LatLng(53.3550092,-6.248268); 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }; 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions); 
        $scope.map = map; */
    var map;
    pos = navigator.geolocation;
    pos.getCurrentPosition(success, error);
 //if position attained   
    function success(position)
    {  
      var mylat = position.coords.latitude;
      var mylong = position.coords.longitude;     
      coords = new google.maps.LatLng(mylat, mylong);
      initialize();
    }
//if get position unsuccessful
    function error()
    {   
      alert("Please ensure your browser supports location tracking and that you have it enabled.");
    } 
//initialize map using current position coordinates
    function initialize() {
      var mapOptions = {zoom: 16,center: coords,mapTypeId: google.maps.MapTypeId.ROADMAP};
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
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
.controller('FriendsCtrl', function($scope) {
  $scope.friends = Friends.all();
})
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})


