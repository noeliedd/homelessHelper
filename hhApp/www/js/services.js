angular.module('starter.services', [])
.factory('ActiveRoutes', ['$http',function($http) {
    return {
        getActiveRoutes: function() {
          $http.post('http://homelessbackend-187844.euw1.nitrousbox.com/api/activeRoutes').
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          console.log("Number of route objects returned :" +data.body);
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });          
        }
    }
}])
.factory('DropOptions',function(){
   var dropDownValue =[
     {value:0},{value:1},{value:2},{value:3},{value:4},{value:5}];
    return {
    dropDownValue: function() {
      return dropDownValue;
    }};   
})
.factory('Coords',function(){
   var coords =[{
     lat: 53.354602,
     lng: -6.248249
   },{
     lat: 53.354115,
     lng: -6.250931
   },{
     lat: 53.353526,
     lng: -6.253914    
   },{
     lat: 53.352834,
     lng: -6.257175  
   },{
     lat:53.352078,
     lng: -6.260437
   },{
     lat:53.351989,
     lng: -6.261166    
   },{
     lat:53.352847,
     lng: -6.26181 
   },{
     lat:53.353782,
     lng: -6.262583 
   },{
     lat:53.354486,
     lng: -6.263655 
   },{
     lat:53.353615,
     lng: -6.265351  
   },{
     lat:53.35277,
     lng: -6.264364  
   },{
     lat:53.352066,
     lng: -6.263334  
   },{
     lat:53.351835,
     lng: -6.262861 
   },{
     lat:53.351195,
     lng: -6.262196 
   },{
     lat:53.350401,
     lng: -6.261832  
   },{
     lat:53.350183,
     lng: -6.261767   
   },{
     lat:53.350293,
     lng: -6.261266 
   },{
     lat:53.349755,
     lng: -6.260997   
   },{
     lat:53.349809,
     lng: -6.260332        
   }]; 
    return {
    all: function() {
      return coords;
    }}
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
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
