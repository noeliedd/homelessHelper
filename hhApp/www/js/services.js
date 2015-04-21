angular.module('starter.services', [])
.factory('ActiveRoutes', function($http) {
  var ActiveRoutes = {
    getAll: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('http://ichh-202592.euw1-2.nitrousbox.com/api/activeRoutes').then(function (response) {
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

.factory('Friends', function() {

  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
