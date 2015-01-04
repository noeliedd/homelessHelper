angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  $scope.login = function(){
    $state.go('tab.encounter');
  }
})
.controller('EncounterCtrl', function($scope) {
  $scope.submitEncounter = function(){
    alert("Button Clicked");
  }
})

.controller('MapCtrl', function($scope) {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833); 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }; 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions); 
        $scope.map = map;    
})
.controller('AddDropCtrl', function($scope, $state) {
  $scope.addDrop = function(){
    $state.go('tab.route-drop');
  }
})
.controller('RouteCtrl', function($scope) {
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


