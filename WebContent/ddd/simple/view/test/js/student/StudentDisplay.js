angular.module('studentModule', [])
.controller('studentDisplayController',['$rootScope','$scope','$stateParams','StudentService','$state',
function($rootScope,$scope,$stateParams,StudentService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.student = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		StudentService.findStudentById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);