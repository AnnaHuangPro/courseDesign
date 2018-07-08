angular.module('viewTreeModule', [])
.controller('viewTreeDisplayController',['$rootScope','$scope','$stateParams','ViewTreeService','$state',
function($rootScope,$scope,$stateParams,ViewTreeService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.viewTree = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		ViewTreeService.findViewTreeById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
		$state.go('main.list.viewTree.viewTreeList');
	}
}]);