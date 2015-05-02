angular.module('starter.controllers', [])

//---------------------------------------LOGIN CONTROLLER---------------------------------------------------------
.controller('LoginCtrl',function($scope,$rootScope,$http,$state,AuthLoginService,$ionicPopup,PasswordReminderService) {
    $rootScope.currentUser = '0';
    $scope.login = function(user) {  
      console.log(user);
      AuthLoginService.login(user,function(returnedUser){
        console.log(returnedUser);
        $state.go("routeSelection")
        $scope.user.username ="";
        $scope.user.password ="";
      });   
    }; 
    $scope.passwordReminder = function() {  
        $scope.data = {}
        var myPopup = $ionicPopup.show({
          cssClass: 'myPopup',
          template: '<input type="email" ng-model="data.email">',
          title: 'Enter Your e-mail Address',
          subTitle: 'Check you mail for password',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Submit</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.email) {
                       var alertPopup = $ionicPopup.alert({
                         cssClass: 'myPopup',
                         title: 'Warning',
                         template: 'Incorrect Address Entered!'
                       });      
                      e.preventDefault();
                } else {
                  PasswordReminderService.getPassword($scope.data.email);
                }
              }
            }
          ]
        });         
    };   
})
.controller('NavCtrl',function($scope,$state,AuthLogoutService) {
    $scope.logout = function(){
        AuthLogoutService.logout(function(response){
            console.log(response);
            $state.go("login");
        })
    }
})
//---------------------------------------SELECTING FROM ACTIVE ROUTES CONTROLLER------------------------------------------
.controller('RouteSelectionCtrl', function($scope,$rootScope, $state,ActiveRoutes,Coords) {
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
        var mapOptions = {center: home,zoom: 12, mapTypeId: google.maps.MapTypeId.ROADMAP,draggable: true}; 
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
          var lat = $scope.coords[i].A;
          var lng = $scope.coords[i].F;
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
  $scope.addOrderItem = function(){
    $state.go("tab.route-order");
  }
})

//---------------------------------------ADD DROP DETAILS FOR PARTICULAR ROUTE--------------------------------------------------
.controller('DropCtrl', function($scope, $state, DropOptions,$ionicPopup, $resource) {
    console.log(window.localStorage.getItem("savedRouteId"));  
    $scope.dropDownValue = DropOptions.dropDownValue();
    $scope.submitDropDetails = function(totalMale,totalMaleFed,totalMaleClothed,totalFemale,totalFemaleFed,totalFemaleClothed){
       if(totalMale.value === 0 && totalFemale.value === 0){
            var alertPopup = $ionicPopup.alert({
              template: 'You have not entered a total for Male or Female!'
            });        
       }else if(totalMale.value < (totalMaleFed.value + totalMaleClothed.value)||totalFemale.value <(totalFemaleFed.value + totalFemaleClothed.value))
       {
          var alertPopupA = $ionicPopup.alert({
            template: 'Cannot have more Fed/Clothed than total encountered'
          });         
       }else{       
           var confirmPopup = $ionicPopup.confirm({
               title: 'Submit Drop Details',
               template: 'Are you sure you want to submit these details?'
           });
           confirmPopup.then(function(res) {
             if(res) {
                   pos = navigator.geolocation;
                   pos.getCurrentPosition(success, error,{ enableHighAccuracy: true,}); 
                   function error() {
                       alert("error");
                   };
                    function success(position){
                       var coords =[];
                       var mylat = position.coords.latitude;
                       var mylong = position.coords.longitude;     
                       var currentPosition = new google.maps.LatLng(mylat, mylong);
                       coords.push(currentPosition);
                       var AddRouteDrop = $resource('http://ichh-202592.euw1-2.nitrousbox.com/api/addRouteDrop');             
                       console.log('You are sure');               
                       var addRouteDrop = new AddRouteDrop();
                       addRouteDrop.routeId = window.localStorage.getItem("savedRouteId");
                       addRouteDrop.totalMale = totalMale.value;
                       addRouteDrop.totalMaleFed = totalMaleFed.value;
                       addRouteDrop.totalMaleClothed = totalMaleClothed.value;
                       addRouteDrop.totalFemale = totalFemale.value;
                       addRouteDrop.totalFemaleFed = totalFemaleFed.value;
                       addRouteDrop.totalFemaleClothed = totalFemaleClothed.value;   
                       addRouteDrop.coordinates = coords;
                       addRouteDrop.$save(function(response) {
                           if(response.date){
                               alert("Drop Added");
                           }else{
                               alert("Error occurred, details not inserted");
                           }
                       },function(error) {
                           alert(502 +"Internal Server Error ");
                         });                       
                    }
                        $state.go("tab.route");           
             } else {
             console.log('You are not sure');
           }
         });
       }          
    }
})
.controller('OrderCtrl', function($scope, $state, $ionicPopup, $resource) {

})

.controller('ContactsCtrl', function($scope) {

})



