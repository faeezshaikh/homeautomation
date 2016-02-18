
angular.module('starter', ['ionic', 'starter.controllers','timer','LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  
  .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html'
        }
      }
    })
     .state('app.share', {
      url: '/share',
      views: {
        'menuContent': {
          templateUrl: 'templates/share.html'
        }
      }
    })
    .state('app.topics', {
      url: '/topics',
      views: {
        'menuContent': {
          templateUrl: 'templates/topics.html'
        }
      }
    })

  .state('app.single', {
    url: '/topics/:topicId',
    views: {
      'menuContent': {
        templateUrl: 'templates/topic.html',
        controller: 'AppCtrl'
       }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/topics');
});
