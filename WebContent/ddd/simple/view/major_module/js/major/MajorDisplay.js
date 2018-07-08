angular.module('majorModule', [])
.controller('majorDisplayController',['$rootScope','$scope','$stateParams','MajorService','$state',
function($rootScope,$scope,$stateParams,MajorService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.major = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		MajorService.findMajorById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);