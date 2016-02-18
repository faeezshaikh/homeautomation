angular.module('starter.controllers', ['socialShareModule'])

.controller('AppCtrl', function($scope, $stateParams, $state, $http, $ionicModal, localStorageService, $rootScope,shareService) {



  $scope.model = {
		  'deleteFlag' : false,
		  'reorderFlag' : false
  }

  $scope.districts =  [
                                { title: 'EC2', desc:'', id: 1 ,url:'data/img/green-grid.png'},
                                { title: 'S3',desc:'',  id: 2 ,url:'data/img/green-grid.png'},
                                { title: 'DynamoDB', desc:'', id: 3 ,url:'data/img/green-grid.png'},
                                { title: 'SQS',desc:'',  id: 4 ,url:'data/img/green-grid.png'},
                                { title: 'SNS',desc:'',  id: 5 ,url:'data/img/green-grid.png'},
                                { title: 'SWF', desc:'', id: 6 ,url:'data/img/green-grid.png'},
                                { title: 'IAM', desc:'', id: 7 ,url:'data/img/green-grid.png'},
                                { title: 'CloudFormation', desc:'', id: 8 ,url:'data/img/green-grid.png'},
                                { title: 'Elastic Beanstalk', desc:'Easy to begin, Impossible to outgrow', id: 9 ,url:'data/img/green-grid.png'},
                                { title: 'VPC', desc:'Subnets, NACLs, Gateways, IPs', id: 10 ,url:'data/img/green-grid.png'}
                              ];


  $scope.deleteStation = function(district) {
	  var indx = $scope.districts.indexOf(district);
	  $scope.districts.splice(indx,1);
  }
  
  $scope.moveStation = function(district,fromIndex,toIndex) {
	  $scope.districts.splice(fromIndex,1);
	  $scope.districts.splice(toIndex,0,district);
  }
  

  
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
});
