angular.module('starter.controllers', ['socialShareModule','ngCordova.plugins.datePicker'])


.controller('AppCtrl', function($scope, $stateParams,$cordovaToast,$ionicPlatform,NgMap,filterFilter,$cordovaCamera, InvoiceService,$state, $http, substationService,
			$ionicModal, $cordovaToast,localStorageService, $rootScope,shareService,$ionicLoading,$cordovaDatePicker) {
	var districtId = $stateParams.districtId;
	$scope.dId = districtId;
	$scope.datetimeValue = 'Tap here to pick a time';
	$scope.mainswitch = true;
	$scope.powerbuttonClass = 'button button-full button-dark';
	$scope.turningMsg = 'Turning ligths off in..';
	$scope.timerClass = 'button button-block button-clear center';
	
	$scope.rooms = {livingRoom:false,kitchen:false,bedroom:false};
	
	$scope.timerElapsed = function() {
		$scope.turningMsg = 'Lights are off';
//		$scope.myMains = '';
		$scope.timerClass = 'button button-block button-dark center' ;
		console.log('Lights off', $scope.myMains);
		shutdownMain();
		 
		$scope.$apply();
	}
	

	
	$scope.calendarTapped = function(datetimeValue){
		$scope.turningMsg = 'Turning ligths off in..';
		$scope.showTimer = true;
		$scope.timerClass = 'button button-block button-outline button-balanced center';
		$scope.$broadcast('timer-start');
		console.log('countdown' , $rootScope.countdown);
		
    };
//	$scope.toggleScheduler = function(scheduler) {
//		if(scheduler) {
//			console.log('Timer Enabled');
//			$rootScope.$broadcast('timer-start');
//		} else {
//			console.log('Timer Disabled');
//			$rootScope.$broadcast('timer-stop');
//		}
//		
//		console.log('Enabled Scheduler' , $scope.countdown);
//		$rootScope.$broadcast('timer-stop');
//		$rootScope.$broadcast('timer-start');
//	}
	
	
	function toggleMainSwitch(val) {
		if(val) {
			$scope.mainSwitchClass = 'balanced';
			$scope.powerbuttonClass = 'button button-full button-balanced';	
		}
		
	}
	
	$scope.mainSwtichClicked = function() {
		shutdownMain();
		$scope.showTimer = false;
	}
	function shutdownMain() {
		$scope.mainSwitchClass = '';
		$scope.powerbuttonClass = 'button button-full button-dark';
		$scope.myVar =  '';
		$scope.kitchenClass =  '';
		$scope.livingClass =  '';
		$scope.rooms.livingRoom = $scope.rooms.kitchen = $scope.rooms.bedroom = false;
		sendShutdownSignal();
	}
	
	function sendShutdownSignal() {
		substationService.shutdownHome().then(function(data) {
			console.log('call succeeded',data);
		}, function(err) {
			console.log('call failed', err)
		});
	}
	$scope.toggleBedroom = function(val) {
		console.log('Bedroom is: ' ,val);
		substationService.sendSignal('bedroom').then(function(data) {
			console.log('call succeeded',data);
		}, function(err) {
			console.log('call failed', err)
		});
		$scope.myVar= val ? 'balanced' : '';
		toggleMainSwitch(val);
		
	}
	
	$scope.toggleKitchen = function(val) {
		console.log('Kitchen is: ' ,val);
		substationService.sendSignal('kitchen').then(function(data) {
			console.log('call succeeded',data);
		}, function(err) {
			console.log('call failed', err)
		});
		
		$scope.kitchenClass= val ? 'balanced' : '';
		toggleMainSwitch(val);	
	}
	
	$scope.toggleLiving = function(val) {
		console.log('Living is: ' ,val);
		 $scope.livingClass= val ? 'balanced' : '';
		toggleMainSwitch(val);
		
	}
	
	$scope.openCloseGarageDoor = function() {

		console.log('closing garage is: ');
		substationService.openCloseGarage().then(function(data) {
			console.log('call succeeded',data);
		}, function(err) {
			console.log('call failed', err)
		});
	}
	
	////////// Map //////////
  

	NgMap.getMap().then(function(map) {
		$scope.map = map;
	});
	$scope.addresses = [
	                    "1901 Chouteau Ave, St. Louis, MO 63103",
	                    "1010 Pine Street, St. Louis MO 63101",
	                    "3310 Brunswick Drive, Florissant MO 63033"
	                    ];

  $scope.model = {
		  'deleteFlag' : false,
		  'reorderFlag' : false
  }
  $scope.lat = 38.6225025;
  $scope.lon = -90.2117141;
  

	$scope.getDirections = function (cafe) {
		console.log("Getting directions for cafe");
		var destination = [
			38.8034709,
			-90.341183
		];

		var source = [
			38.6225025,
			-90.2117141
		];
		

		launchnavigator.navigate(destination, source);
	};
	
	$scope.markerClicked = function(event,location) {
		console.log(event,location);
		$scope.map.showInfoWindow.apply(this,[event,'marker-info']);
//		$scope.map.showInfoWindow('marker-info', shop.id);
	};
	
	
	////////// Map //////////
	
	
   
  ////////// SOCIAL SHARING /////
      
      $scope.shareFb = function() {
  		shareService.shareOnFb();
  	}
  	$scope.shareTwitter = function() {
  		shareService.shareOnTwitter();
  	}
  	$scope.shareWhatsapp = function() {
  		shareService.shareOnWhatsapp();
  	}
  	$scope.shareSms = function() {
  		shareService.shareViaSms();
  	}
  	$scope.shareEmail = function() {
  		shareService.shareViaEmail();
  	}
  	
    ////////// SOCIAL SHARING /////
  	
  	


});
