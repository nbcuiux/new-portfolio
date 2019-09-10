(function () {
  'use strict';

  /* Declare app level module which depe&nds on filters, and services */


  angular.module('myApp', [
    'ui.router',
    'ngAnimate',
    'duScroll',
    'angular-inview',
    'myApp.directives',
    'myApp.controllers'
    ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
   $locationProvider.html5Mode({
     enabled: true,
     requireBase: false
   });
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('preloader', {
      url: '/',
      templateUrl: 'views/preloader.html',
      controller  : 'mainController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller  : 'mainController',
      preload: true
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller  : 'mainController'
    })
    .state('american-made', {
      url: '/american-made',
      templateUrl: 'views/american-made.html',
      controller  : 'mainController'
    })
    .state('jurassic-world', {
      url: '/jurassic-world',
      templateUrl: 'views/jurassic-world.html',
      controller  : 'mainController'
    })
    .state('cnbc', {
      url: '/cnbc',
      templateUrl: 'views/cnbc.html',
      controller  : 'mainController'
    })
    .state('lorax', {
      url: '/lorax',
      templateUrl: 'views/lorax.html',
      controller  : 'mainController'
    })
    .state('chiller', {
      url: '/chiller',
      templateUrl: 'views/chiller.html',
      controller  : 'mainController'
    })
    .state('concerto', {
      url: '/concerto',
      templateUrl: 'views/concerto.html',
      controller  : 'mainController'
    })
    .state('rationalized', {
      url: '/rationalized',
      templateUrl: 'views/rationalized.html',
      controller  : 'mainController'
    })
    .state('syfy', {
      url: '/syfy',
      templateUrl: 'views/syfy.html',
      controller  : 'mainController'
    })
    .state('universal-kids', {
      url: '/universal-kids',
      templateUrl: 'views/universal-kids.html',
      controller  : 'mainController'
    })
    .state('mvpd', {
      url: '/mvpd',
      templateUrl: 'views/mvpd.html',
      controller  : 'mainController'
    })

  }])


  .value('duScrollOffset', 500)
  .run(['$state', '$q', function($state, $q) {
    var preloadStates = $state.get().filter(function(state) {
      return state.preload;
    });

 var prev = $q.when();
    angular.forEach(preloadStates, function (state) {
      prev = prev.then(function () {
        return $timeout(function () {
         $state.go(state, undefined, { location: false });
       }, 0);
      });
    });
  }])
})();