angular.module('starter.controllers', [])

//===========================LOGIN CONTROLLER==================================================
//Handles the login and password reminder input from view 
.controller('LoginCtrl',function($scope,$rootScope,$http,$state,AuthLoginService,$ionicPopup,PasswordReminderService) {
    $rootScope.currentUser = '0';
  
    $scope.login = function(user) {  
      AuthLoginService.login(user,function(returnedUser){
        console.log(returnedUser.status);
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

//====================================NAVBAR CTRL FOR LOGOUT==========================================
//Handle logout button in Nav Bar
.controller('NavCtrl',function($scope,$state,AuthLogoutService) {
    $scope.logout = function(){
        AuthLogoutService.logout(function(response){
            $state.go("login");
        })
    }
})

//==================================SELECTING FROM ACTIVE ROUTES CONTROLLER=============================
//Uses ActiveRoutes service to return all active routes
.controller('RouteSelectionCtrl', function($scope,$rootScope,$state,ActiveRoutes,Coords) {
   ActiveRoutes.getAll().then(function(d){
       $scope.routes =d;
   }); 
//When route selected pass the route object to Coords service to return the coordinates for chosen route  
    $scope.selectRoute = function(route){
      Coords.getAll(route).then(function(d){
        $state.go("tab.route");
      });      
  }; 
})

//======================================CONTROLLER FOR GOOGLE MAP=====================================
//Handle the map initialisation with the selected route drawn on
.controller('MapCtrl', function($scope) {
  
    var selectedRoute = JSON.parse(window.localStorage.getItem("savedRoute"));
    displayMap();
//re-initialise  map on refresh 
    $scope.refreshMap = function(){    
        displayMap();
    };
//getCurrent location, if successful initialise map else return error
    function displayMap(){
      var me;      
      pos = navigator.geolocation;
      pos.getCurrentPosition(success, error,{ enableHighAccuracy: true,}); 
      function success(position)
      {  
        var mylat = position.coords.latitude;
        var mylong = position.coords.longitude;     
        me = new google.maps.LatLng(mylat, mylong);
        initialize();
      }
      function error()
      {   
        alert("Please ensure your browser supports location tracking and that you have it enabled.");
      } 
// initialize google map centered on user location      
      function initialize() {
        var mapOptions = {
          center: me,
          zoom: 15, 
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          draggable: true
        }; 
        map = new google.maps.Map(document.getElementById("map"), mapOptions);       
        
        
        var currentPosMarker = new google.maps.Marker(
          {map: map,
           position:me,
           animation: google.maps.Animation.BOUNCE
          }); 
        
        var image = 'img/homePin.png';
        var hQ = new google.maps.LatLng(53.3550092,-6.248268); 
        var marker = new google.maps.Marker({map: map,position:hQ, icon: image});  

    //arrowed line symbol
        var arrowSymbol = {
          path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0};
        
        var polyOptions = {strokeColor: '#FF0000',
                           strokeOpacity: 1.0,
                           strokeWeight: 2,
                           icons:
                             [{
                              icon: arrowSymbol,
                              offset: '100%',
                              repeat:'55px',
                              }]
                          };
      //Create polyline and set map to it
        var poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);    

//Loop through coords for selected route and add each path coordinate to the map
       $scope.coords = selectedRoute;     
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

//==============================NAVIGATES TO DROP DETAILS 0R DROP ORDER PAGE FOR PARTICULAR ROUTE==========================
.controller('RouteCtrl', function($scope, $state) {
  $scope.addDropDetails = function(){
    $state.go("tab.route-drop");
  }
  $scope.addOrderItem = function(){
    $state.go("tab.route-order");
  }
})

//===============================ADD DROP DETAILS FOR PARTICULAR ROUTE=================================
//Handles input for drop details
.controller('DropCtrl', function($scope, $state, DropOptions,$ionicPopup, $resource) {
  
    $scope.dropDownValue = DropOptions.dropDownValue();
//passed all the values from the dropdown values in view
    $scope.submitDropDetails = function(totalMale,totalMaleFed,totalMaleClothed,totalFemale,totalFemaleFed,totalFemaleClothed){
       if(totalMale.value === 0 && totalFemale.value === 0){
            var alertPopup = $ionicPopup.alert({
              cssClass: 'myPopup',
              template: 'You have not entered a total for Male or Female!'
            });        
       }else{       
           var confirmPopup = $ionicPopup.confirm({
               cssClass: 'myPopup',
               title: 'Submit Drop Details',
               template: 'Are you sure you want to submit these details?'
           });
         //if user clicks confirm for submission, attempt to get location
           confirmPopup.then(function(res) {
             if(res) {
                   pos = navigator.geolocation;
                   pos.getCurrentPosition(success, error,{ enableHighAccuracy: true,}); 
                   function error() {
                       alert("error");
                   };
                   // if location attained post new drop object to server
                    function success(position){
                       var coords =[];
                       var mylat = position.coords.latitude;
                       var mylong = position.coords.longitude;     
                       var currentPosition = new google.maps.LatLng(mylat, mylong);
                       coords.push(currentPosition);
                      
                       var AddRouteDrop = $resource('https://ichh-homelesshelper.herokuapp.com/api/addRouteDrop'); 
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

//=========================ADDING ORDER FOR PARTICULAR ROUTE=============================================
//Handles input for order details
.controller('OrderCtrl', function($scope, $state, $ionicPopup,OrderService) {
    
    $scope.submitOrderDetails = function(order){
           var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm',
              cssClass: 'myPopup',
              template: 'Are you sure you would like to submit order?'
           });
           confirmPopup.then(function(res) {
             if(res) {
                   pos = navigator.geolocation;
                   pos.getCurrentPosition(success, error,{ enableHighAccuracy: true,}); 
                   function error() {
                       var alertPopup = $ionicPopup.alert({
                         title: 'Notice',
                         cssClass: 'myPopup',
                         template: 'Cannot find your location!'
                       }); 
                   }
                    function success(position){
                       var coords =[];
                       var mylat = position.coords.latitude;
                       var mylong = position.coords.longitude;     
                       var currentPosition = new google.maps.LatLng(mylat, mylong);
                       coords.push(currentPosition);
                      
                      order.location =coords;
                      order.routeId = window.localStorage.getItem("savedRouteId");
                      order.userId = window.localStorage.getItem("currentUser");
                      
                      OrderService.submitOrder(order,function(response){
                          console.log(response);
                      });                       
                    }
                        $state.go("tab.route");           
             } else {
             console.log('You are not sure');
           }
         });   
    };    
})

// //====================================================================================================
// .controller('ContactsCtrl', function($scope) {
    
// })



