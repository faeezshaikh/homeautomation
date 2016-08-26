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
	$scope.livingClass = false ; $scope.kitchenClass = false ; $scope.myVar = false;
	
	$scope.rooms = {livingRoom:false,kitchen:false,bedroom:false};
	
	$scope.timerElapsed = function() {
		$scope.turningMsg = 'Lights are off';
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
	
	function toggleMainSwitch(val) {
		if(val) {
			$scope.mainSwitchClass = 'balanced';
			$scope.powerbuttonClass = 'button button-full button-balanced';	
		} else {
			determineStateOfMainSwitch();
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
		substationService.sendSignal('bedroom','toggle').then(function(data) {
			console.log('call succeeded',data);
		}, function(err) {
			console.log('call failed', err)
		});
		$scope.myVar= val ? 'balanced' : '';
		toggleMainSwitch(val);
		
	}
	
	$scope.toggleKitchen = function(val) {
		console.log('Kitchen is: ' ,val);
		substationService.sendSignal('kitchen','toggle').then(function(data) {
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
	
	function determineStateOfMainSwitch() {
		if( $scope.livingClass == false && $scope.kitchenClass == false && $scope.myVar == false) {
			$scope.powerbuttonClass = 'button button-full button-dark';
			$scope.mainSwitchClass = '';
		}
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
  	

    $scope.record = function() {
      var recognition = new SpeechRecognition();
      recognition.onresult = function(event) {
          if (event.results.length > 0) {
              $scope.recognizedText = event.results[0][0].transcript;
              $scope.$apply();
              determineCommand($scope.recognizedText);
          }
      };
      recognition.start();
    };
    
    function roomCommand(room, cmd) {

		console.log('Rooom Cmd is: ' ,room+ ',' + cmd);
		substationService.sendSignal(room,cmd).then(function(data) {
			console.log('call succeeded',data);
		}, function(err) {
			console.log('call failed', err)
		});
		
		if(room === 'kitchen') {
			$scope.kitchenClass= (cmd == 'on') ? 'balanced' : '';
		}
		if(room === 'bedroom') {
			$scope.myVar= (cmd == 'on') ? 'balanced' : '';
		}
		toggleMainSwitch((cmd == 'on')?true:false);	
	
		
	}
    
    function determineCommand(str){

        if(str.includes("turn bedroom on") || str.includes("bedroom on") || str.includes("bedroom lights on") || str.includes("on bedroom lights") || str.includes("turn on bedroom lights") || str.includes("turn bedroom lights on")) {
        	roomCommand('bedroom','on');
      	  confrimComman('bedroom lights on');
        }
        
        if(str.includes("turn bedroom off") || str.includes("bedroom off") || str.includes("bedroom lights off") || str.includes("off bedroom lights") || str.includes("turn off bedroom lights") || str.includes("turn bedroom lights off")) {
        	roomCommand('bedroom','off');
      	  confrimComman('bedroom lights off');
        }
        
        ///
        
        if(str.toLowerCase().includes("turn kitchen on") || str.toLowerCase().includes("kitchen on") || str.toLowerCase().includes("kitchen lights on") || str.toLowerCase().includes("on kitchen lights") || str.toLowerCase().includes("turn on kitchen lights") || str.toLowerCase().includes("turn kitchen lights on")) {
        	roomCommand('kitchen','on');
      	  confrimComman('kitchen lights on');
        }
        
        if(str.includes("turn kitchen off") || str.includes("kitchen off") || str.includes("kitchen lights off") || str.includes("off kitchen lights") || str.includes("turn off kitchen lights") || str.includes("turn kitchen lights off")) {
        	roomCommand('kitchen','off');
      	  confrimComman('kitchen lights off');
        }
        
        ///
      
        if(str.includes("turn living room on") || str.includes("living room on") || str.includes("living room lights on") || str.includes("on living room lights") || str.includes("turn on living room lights") || str.includes("turn living room lights on")) {
        	roomCommand('bedroom','on');
      	  confrimComman('living room lights on');
        }
        
        if(str.includes("turn living room off") || str.includes("living room off") || str.includes("living room lights off") || str.includes("off living room lights") || str.includes("turn off living room lights") || str.includes("turn living room lights off")) {
        	roomCommand('bedroom','off');
      	  confrimComman('living room lights off');
        }
        
        ///
        if(str.includes("open garage door") || str.includes("garage door open") || str.includes("open the garage door") ) {
      	  confrimComman('garage door opened');
        }
        
        if(str.includes("close garage door") || str.includes("garage door close") || str.includes("close the garage door") ) {
      	  confrimComman('garage door closed');
        }
        
        ///
        

        if(str.includes("turn everything off") || str.includes("shut down everything") || str.includes("shutdown everything") ||  str.includes("shut everything down")) {
        	sendShutdownSignal();
      	  confrimComman('everything is now turned off');
        }
        
    }
    
    function confrimComman(cmd) {
    	TTS.speak({
            text: cmd,
            locale: 'en-GB',
            rate: 1.5
        }, function () {
            // Do Something after success
        }, function (reason) {
            // Handle the error case
        });
    }


});
