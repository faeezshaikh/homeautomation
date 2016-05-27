angular.module('starter')

.service('substationService', function($http,$q){

//	https://api.particle.io/v1/devices/32002c001847353236343033/toggle?pinStdr='D7'&access_token=3acedfd0751b3a632008f549a2997599a19d1e91
		

	
	return {
		sendSignal: function(room) {
			var str;
			if(room === 'bedroom') {
				str = 'toggleBed';
			}
			if(room === 'kitchen') {
				str = 'toggleKit';
			}
			var deferred = $q.defer();
			
			var str = 'https://api.particle.io/v1/devices/310043001747353236343033/'+str+'?str=D0&access_token=3acedfd0751b3a632008f549a2997599a19d1e91';
			console.log(' My URL = ' , str);
		
			$http({
		        method: 'POST',
		        url : str,
		        }).success(function(result){
		           deferred.resolve(result);
		        }).error(function(data){
		          deferred.reject(data);
		        });
			
			return deferred.promise;
			
		
		},
		shutdownHome: function() {
			var str;
			var deferred = $q.defer();
			
			var str = 'https://api.particle.io/v1/devices/310043001747353236343033/shutdownHome?access_token=3acedfd0751b3a632008f549a2997599a19d1e91';
			console.log(' My URL = ' , str);
		
			$http({
		        method: 'POST',
		        url : str,
		        }).success(function(result){
		           deferred.resolve(result);
		        }).error(function(data){
		          deferred.reject(data);
		        });
			
			return deferred.promise;
			
		
		},
		openCloseGarage: function() {

			var str;
			var deferred = $q.defer();
			var str = 'http://blynk-cloud.com/19c35098f0ee498cbcd4a1885f1ae654/pin/D0';
			console.log(' Garage URL = ' , str);
		
			$http({
		        method: 'PUT',
		        url : str,
		        headers: {
		        	   'Content-Type': 'application/json'
		        	 },
		        data: ["1"]
		               
		        }).success(function(result){
		           deferred.resolve(result);
		        }).error(function(data){
		          deferred.reject(data);
		        });
			
			return deferred.promise;
		}

	}
	
});


