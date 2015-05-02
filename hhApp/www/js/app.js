angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource'])

.run(function($ionicPlatform) {
    
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/tab-login.html',
    controller: 'LoginCtrl'
  })
  .state('routeSelection', {
    url: '/routeSelection',
    templateUrl: 'templates/tab-routeSelection.html',   
    controller: 'RouteSelectionCtrl',
        resolve: {
          loggedin: checkLoggedin
        }     
  })  
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'NavCtrl'
  })
  // Each tab has its own nav history stack:
  .state('tab.route', {
      url: '/route',
      views: {
        'tab-route': {
          templateUrl: 'templates/tab-route.html',
          controller: 'RouteCtrl',
              resolve: {
                loggedin: checkLoggedin
              }            
        }
      }
    })
  .state('tab.route-drop', {
      url: '/drops',
      views: {
        'tab-route': {
          templateUrl: 'templates/route-drop.html',
          controller: 'DropCtrl',
              resolve: {
                loggedin: checkLoggedin
              }            
        }
      }
    })
  .state('tab.route-order', {
      url: '/orders',
      views: {
        'tab-route': {
          templateUrl: 'templates/route-order.html',
          controller: 'OrderCtrl',
              resolve: {
                loggedin: checkLoggedin
              }            
        }
      }
    })  
.state('tab.contacts', {
      url: '/contacts',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/tab-contacts.html',
          controller: 'ContactsCtrl',
              resolve: {
                loggedin: checkLoggedin
              }            
        }
      }
    })
  $urlRouterProvider.otherwise('/login');
  
   $httpProvider.interceptors
   .push(function($q, $location)
    {
        return {
            response: function(response)
            { 
                return response;
            },
            responseError: function(response)
            {
                if (response.status === 401)                  
                     $location.url('/login');
                    return $q.reject(response);                 
            }
        };
    }); 
});

var checkLoggedin = function($q, $timeout, $ionicPopup, $location, $rootScope)
{
    var deferred = $q.defer();
    console.log("checked login A");
    var user = window.localStorage.getItem("currentUser");
    console.log(user);

        console.log("checked login B");
        console.log(user);
        console.log(window.localStorage.getItem("currentUser"));
        //$rootScope.currentUser = user;
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user)
            deferred.resolve();
        // User is Not Authenticated
        else
        {  
            var alertPopup = $ionicPopup.alert({
                cssClass: 'myPopup',
                title: '<h4>Notice</h4>',
                template: '<h5>Login Required</h5>'
            });  
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }    
    return deferred.promise;
};