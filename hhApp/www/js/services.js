angular.module('starter.services', [])
//Posts user details to /Login on the server
.factory('AuthLoginService', function($http,$location){  
  return{
      login: function(user,callback){
          $http.post('http://ichh-202592.euw1-2.nitrousbox.com/login', user)
              .success(function(user){  
                console.log(user[0]._id);
                window.localStorage.setItem("currentUser", JSON.stringify(user[0]._id));                
                callback(user);
              })
      } 
  }; 
})
//Called from the NavCtrl to logout the user
.factory('AuthLogoutService', function($http,$location){ 
  return{ 
    logout: function(callback){
      $http.post('http://ichh-202592.euw1-2.nitrousbox.com/logout')
        .success(function(){  
          window.localStorage.removeItem("currentUser");
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
      var promise = $http.get('http://ichh-202592.euw1-2.nitrousbox.com/api/getActiveRoutes').then(function (response) {
        console.log(response);
        return response.data;
      });
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
      var promise = $http.get('http://ichh-202592.euw1-2.nitrousbox.com/api/getRoute?route_id='+id).then(function (response) {
         console.log(response);
         console.log("Hello baby");
         console.log(response.data._id);
         window.localStorage.setItem("savedRouteId", response.data._id);
         window.localStorage.setItem("savedRoute", JSON.stringify(response.data.path));        
         return response.data;
      });
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

.factory('OrderService', function($resource){ 
  return{     
    submitDrop: function(order){    
      console.log(order);
      $http.post('http://ichh-202592.euw1-2.nitrousbox.com/api/addRouteOrder?routeId='+order.routeId+'&userId='+order.userId+'&name='+order.name+'&details='+order.details+'&location='+order.location)
        .success(function(response){  
            console.log(response);
      })
    } 
  };
})
.factory('OrderService', function($http){ 
  return{     
    submitOrder: function(order){    
      console.log(order);
      $http.post('http://ichh-202592.euw1-2.nitrousbox.com/api/addRouteOrder?routeId='+order.routeId+'&userId='+order.userId+'&name='+order.name+'&details='+order.details+'&location='+order.location)
        .success(function(response){  
            console.log(response);
      })
    } 
  };
})
