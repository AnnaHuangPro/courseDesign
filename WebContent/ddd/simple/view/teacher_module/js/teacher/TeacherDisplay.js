angular.module('teacherModule', [])
.controller('teacherDisplayController',['$rootScope','$scope','$stateParams','TeacherService','$state',
function($rootScope,$scope,$stateParams,TeacherService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.teacher = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		TeacherService.findTeacherById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);