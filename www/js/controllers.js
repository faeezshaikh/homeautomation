angular.module('starter.controllers', ['socialShareModule'])


.controller('AppCtrl', function($scope, $stateParams,$cordovaToast,$ionicPlatform,NgMap,filterFilter,$cordovaCamera, InvoiceService,$state, $http, substationService,$ionicModal, $cordovaToast,localStorageService, $rootScope,shareService,$ionicLoading) {
	$scope.favs = [];
	$scope.count = 9;
	var districtId = $stateParams.districtId;
	$scope.dId = districtId;
	
	console.log('district id' , districtId);
	
	if(districtId) {
		getSubstations(districtId);
	}
	
	if(!substationService.getLoadedFlag()) {
		console.log('Cache empty,calling remote service.');
		callServiceToGetDistricts();
		substationService.setLoadedFlag(true);
	}
	
	function callServiceToGetDistricts() {
		
		$ionicLoading.show({
		      template: 'Loading Districts...'
		    });
		
		substationService.getDistricts().then(function(data) {
			$scope.districts = data;
			$ionicLoading.hide();
			 $cordovaToast
			    .show('Remote call succeeded.', 'long', 'bottom')
			    .then(function(success) {
			      // success
			    }, function (error) {
			      // error
			    });
			  
			
		}, function(){
			
			console.log('Call to remote service failed. Fetching from local DB..');
			  $cordovaToast
			    .show('Call to remote service failed. Fetching from local DB..', 'long', 'bottom')
			    .then(function(success) {
			      // success
			    }, function (error) {
			      // error
			    });
			  
			$http.get('data/districts.json')
			.success(function(resp) {
				console.log('Successfully got data from Local DB',resp);
				$scope.districts = resp;
				$ionicLoading.hide();
			})
			.error(function(data,status,headers,config){
				console.log('Error getting data from Local DB',data);
				$ionicLoading.hide();
			});
			
		});
	}
	
	function getSubstations(districtId) {

		
		$ionicLoading.show({
		      template: 'Loading Substations for ' + districtId + ' ..'
		    });
		
		substationService.getSubstations(districtId).then(function(data) {
			$scope.substations = data;
			$ionicLoading.hide();
			 $cordovaToast
			    .show('Remote call succeeded.', 'long', 'bottom')
			    .then(function(success) {
			      // success
			    }, function (error) {
			      // error
			    });
			  
			
		}, function(){
			
			console.log('Call to remote service failed. Fetching from local DB..');
			  $cordovaToast
			    .show('Call to remote service failed. Fetching from local DB..', 'long', 'bottom')
			    .then(function(success) {
			      // success
			    }, function (error) {
			      // error
			    });
			  
			$http.get('data/substations.json')
			.success(function(resp) {
				console.log('Successfully got data from Local DB',resp);
				$scope.districts = resp;
				$ionicLoading.hide();
			})
			.error(function(data,status,headers,config){
				console.log('Error getting data from Local DB',data);
				$ionicLoading.hide();
			});
			
		});
	
	}

	$scope.filteredDistricts = function() {
		var filtered = filterFilter($scope.districts, $scope.searchText);
		return filtered.length;
	}
  
  /////// Move, Delete, Favorites /////
  $scope.deleteStation = function(district) {
	  var indx = $scope.favs.indexOf(district);
	  $scope.favs.splice(indx,1);
  }
  
  $scope.moveStation = function(district,fromIndex,toIndex,isFav) {
	  if(isFav) {
		  $scope.favs.splice(fromIndex,1);
		  $scope.favs.splice(toIndex,0,district);
	  }
	  $scope.districts.splice(fromIndex,1);
	  $scope.districts.splice(toIndex,0,district);
  }
  $scope.addToFavorites = function(district) {
	  var indx = $scope.favs.indexOf(district);
	  if(indx==-1) {
		  $scope.favs.push(district);
	  } else {
		  $scope.favs.splice(indx,1);
	  }
	  console.log($scope.favs);
	  
  }
   /////// Move, Delete, Favorites /////

  $scope.reloadDistricts = function() {
	  callServiceToGetDistricts();
	  $scope.$broadcast('scroll.refreshComplete');
  }
 

	////////// Map //////////
  

	NgMap.getMap().then(function(map) {
		$scope.map = map;
	});
	$scope.addresses = [
	                    "1901 Chouteau Ave, St. Louis, MO 63103",
	                    "1010 Pine Street, St. Louis MO 63101"
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
	
	///////// PICTURE /////////
	
	 
	  $scope.addPicture = function() {
		  
		  document.addEventListener("deviceready", function () {
			  var options = {
				      quality: 50,
				      destinationType: Camera.DestinationType.DATA_URL,
				      sourceType: Camera.PictureSourceType.CAMERA,
				      allowEdit: true,
				      encodingType: Camera.EncodingType.JPEG,
				      targetWidth: 100,
				      targetHeight: 100,
				      popoverOptions: CameraPopoverOptions,
				      saveToPhotoAlbum: false,
				      correctOrientation:true
				    };


				    $cordovaCamera.getPicture(options).then(function(imageData) {
				    	$scope.imageData = imageData;
				      var image = document.getElementById('myImage');
				      image.src = "data:image/jpeg;base64," + imageData;
				    }, function(err) {
				      // error
				    });
				
		  },false);
		 
	};
	
	///////// PICTURE /////////
	///////// PDF /////////
	
	setDefaultsForPdfViewer($scope);
	function setDefaultsForPdfViewer($scope) {
        $scope.scroll = 0;
        $scope.loading = 'loading';

        $scope.onError = function (error) {
            console.error(error);
        };

        $scope.onLoad = function () {
            $scope.loading = '';
        };

        $scope.onProgress = function (progress) {
            console.log(progress);
        };
    }
	  $scope.createDocument = function () {
//          var invoice = getDummyData();
         

//          InvoiceService.createPdf()
//              .then(function (pdf) {
//                  var blob = new Blob([pdf], { type: 'application/pdf' });
//                  $scope.pdfUrl = URL.createObjectURL(blob);
//                  console.log($scope.pdfUrl);
//
//               
//              });
      };
      
  	///////// PDF /////////

   
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
