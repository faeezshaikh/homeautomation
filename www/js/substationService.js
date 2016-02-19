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

		getDistricts: function() {
			var deferred = $q.defer();
			
			$http.get('data/districts.json')
				.success(function(resp) {
					console.log('Successfully got data from Remote API',resp);
					deferred.resolve(resp);
				})
				.error(function(data,status,headers,config){
					console.log('Error getting data from Remote API',data);
					deferred.reject(data);
				});
			
			return deferred.promise;
			
		}
	}
	
});


