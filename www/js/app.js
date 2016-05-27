
angular.module('starter', ['ionic', 'starter.controllers','timer','LocalStorageModule','ngCordova','ngMap','ion-datetime-picker'])

  .run(function($ionicPickerI18n) {
        $ionicPickerI18n.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $ionicPickerI18n.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $ionicPickerI18n.ok = "OK";
        $ionicPickerI18n.cancel = "Cancel";
    })
.run(function($cordovaSplashscreen) {
  setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 3000)
})
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

  
     .state('app.share', {
      url: '/share',
      views: {
        'menuContent': {
          templateUrl: 'templates/share.html'
        }
      }
    })
    .state('app.districts', {
      url: '/districts',
      views: {
        'menuContent': {
          templateUrl: 'templates/districts.html'
        }
      }
    })
     .state('app.schedule', {
      url: '/schedule',
      views: {
        'menuContent': {
          templateUrl: 'templates/schedule.html'
        }
      }
    })
    .state('app.garage', {
      url: '/garage',
      views: {
        'menuContent': {
          templateUrl: 'templates/garage.html'
        }
      }
    })
    .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html'
        }
      }
    })
    .state('app.single', {
      url: '/substations/:substationId',
      views: {
        'menuContent': {
          templateUrl: 'templates/district.html',
          controller: 'AppCtrl'
        }
      }
    })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/districts');
});
