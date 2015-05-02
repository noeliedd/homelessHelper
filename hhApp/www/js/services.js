angular.module('starter.services', [])
//Posts user details to /Login on the server
.factory('AuthLoginService', function($http,$location,$rootScope){  
  return{
      login: function(user,callback){
          $http.post('http://ichh-202592.euw1-2.nitrousbox.com/login', user)
              .success(function(user){  
                console.log(user);
                $rootScope.currentUser = user;
                callback(user);
              })
      } 
  }; 
})
//Called from the NavCtrl to logout the user
.factory('AuthLogoutService', function($http,$location,$rootScope){ 
  return{ 
    logout: function(callback){
      $http.post('http://ichh-202592.euw1-2.nitrousbox.com/logout')
        .success(function(){  
          $rootScope.currentUser = '0';
          callback();
        })
    } 
  };
})
.factory('PasswordReminderService', function($http){ 
  return{     
    getPassword: function(email){      
      $http.get('http://ichh-202592.euw1-2.nitrousbox.com/api/getPassword?email='+email)
        .success(function(response){  
            console.log(response);
      })
    } 
  };
})
//Returns all actvie routes from backend server
//The route id'd are used to display options in the route selection menu 
.factory('ActiveRoutes', function($http) {
  var ActiveRoutes = {
    getAll: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('http://ichh-202592.euw1-2.nitrousbox.com/api/getActiveRoutes').then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return ActiveRoutes;
})
//GetAll function returns coordinates for the route chosen from the route selection menu tab
//The chosen route id is passed as a parameter to this function to get the coordinates for the particular route
.factory('Coords', function($http,$state) {
  var Coords = {
    getAll: function(id) {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('http://ichh-202592.euw1-2.nitrousbox.com/api/getRoute?route_id='+id).then(function (response) {
        // The then function here is an opportunity to modify the response
         console.log(response);
         console.log("Hello baby");
         console.log(response.data._id);
         window.localStorage.setItem("savedRouteId", response.data._id);
         window.localStorage.setItem("savedRoute", JSON.stringify(response.data.path));        
         return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return Coords;
})

.factory('DropOptions',function(){
   var dropDownValue =[
     {value:0},{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:7},{value:8},{value:9}];
    return {
    dropDownValue: function() {
      return dropDownValue;
    }};   
})

