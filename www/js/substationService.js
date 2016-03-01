angular.module('starter')

.service('substationService', function($http,$q){
	//http://gobntdvworkmdev/EmprvWebApiServices/api/Substation/GetSubstationDistricts
	
	var loaded = false;

	
	return {
		getLoadedFlag : function() {
			return loaded;
		},
	
		setLoadedFlag : function(val) {
			loaded = val;
		},
		
		getSubstations: function(districtId) {

			var deferred = $q.defer();
			
		
			$http({
		        method: 'GET',
//		        url: 'http://gobntdvworkmdev/EmprvWebApiServices/api/Substation/GetSubstationsByDistrict?districtID=3A-EAST%20STL',
		        url: 'data/substations.json',
		        timeout : 10000, 
		        headers: {'Content-Type': 'application/json'}
		        }).success(function(result){
		           deferred.resolve(result);
		        }).error(function(data){
		          deferred.reject(data);
		        });
			
			return deferred.promise;
			
		
		},

		getDistricts: function() {
			var deferred = $q.defer();
			
//			$http.get('data/districts.json')
//				.success(function(resp) {
//					console.log('Successfully got data from Remote API',resp);
//					deferred.resolve(resp);
//				})
//				.error(function(data,status,headers,config){
//					console.log('Error getting data from Remote API',data);
//					deferred.reject(data);
//				});
//			
			$http({
		        method: 'GET',
//		        url: 'http://gobntdvworkmdev:8080/EmprvWebApiServices/api/Substation/GetSubstationDistricts',
		        url: 'data/districts.json',
		        timeout : 10000, 
		        headers: {'Content-Type': 'application/json'}
		        }).success(function(result){
		         //  alert('Success' + result);
		           deferred.resolve(result);
		        }).error(function(data){
		        //  alert('Failed' + data);
		          deferred.reject(data);
		        });
			
			
			
			return deferred.promise;
			
		}
	}
	
});


