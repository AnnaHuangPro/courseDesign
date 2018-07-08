angular.module('stuCourseProgressModule', [])
.controller('stuCourseProgressDisplayController',['$rootScope','$scope','$stateParams','StuCourseProgressService','$state',
function($rootScope,$scope,$stateParams,StuCourseProgressService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.stuCourseProgress = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		StuCourseProgressService.findStuCourseProgressById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);