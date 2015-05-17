angular.module('starter.services', [])

//Posts user details to /Login on the server 
.factory('AuthLoginService', function($http,$location){  
  return{
      login: function(user,callback){
          $http.post('https://ichh-homelesshelper.herokuapp.com/login', user)
              .success(function(user){  
                console.log(user[0]._id);   
                window.localStorage.setItem("currentUser", user[0]._id);                
                callback(user);
              })
      } 
  }; 
})

//Called from the NavCtrl to logout the user
.factory('AuthLogoutService', function($http,$location){ 
  return{ 
    logout: function(callback){
      $http.post('https://ichh-homelesshelper.herokuapp.com/logout')
        .success(function(){  
          window.localStorage.removeItem("currentUser");
          callback();
        })
    } 
  };
})

//Post email to server. If found then password is sent to the users email
.factory('PasswordReminderService', function($http){ 
  return{     
    getPassword: function(email){      
      $http.get('https://ichh-homelesshelper.herokuapp.com/api/getPassword?email='+email)
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
      var promise = $http.get('https://ichh-homelesshelper.herokuapp.com/api/getActiveRoutes')
        .then(function (response)       
          {         
          return response.data;
        });
        return promise;
    }
  };
  return ActiveRoutes;
})

//getAll function returns coordinates for the route chosen from the route selection menu tab
//The chosen route id is passed as a parameter to this function to get the coordinates for the particular route
.factory('Coords', function($http) {
  var Coords = {
    getAll: function(id) {
      var promise = $http.get('https://ichh-homelesshelper.herokuapp.com/api/getRoute?route_id='+id)
      .then(function (response) {
         window.localStorage.setItem("savedRouteId", response.data._id);
         window.localStorage.setItem("savedRoute", JSON.stringify(response.data.path));        
         return response.data;
      });
      return promise;
    }
  };
  return Coords;
})

//Used for the addDrop Details menu options
.factory('DropOptions',function(){
   var dropDownValue =[
     {value:0},{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:7},{value:8},{value:9}];
    return {
    dropDownValue: function() {
      return dropDownValue;
    }};   
})

//Posts a new order object passed from the controller
.factory('OrderService', function($http){ 
  return{     
    submitOrder: function(order){    
      $http.post('https://ichh-homelesshelper.herokuapp.com/api/addRouteOrder?routeId='+
                 order.routeId+'&userId='+order.userId+'&name='+order.name+'&details='+
                 order.details+'&location='+order.location)
        .success(function(response){  
            return(response);
      })
    } 
  };
})
