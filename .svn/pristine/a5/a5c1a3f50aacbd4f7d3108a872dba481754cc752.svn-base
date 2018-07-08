angular.module('ddd3TestModule', [])
.controller('ddd3TestDisplayController',['$rootScope','$scope','$stateParams','Ddd3TestService','$state',
function($rootScope,$scope,$stateParams,Ddd3TestService,$state)
{
	$scope.init = function()
	{
		function successCB(data)
		{
			$scope.ddd3Test = data;
		}
		
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
		Ddd3TestService.findDdd3TestById($stateParams.id,successCB,errorCB);
	}
	

	
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
		$state.go('main.list.ddd3Test.ddd3TestListRoute');
	}
}]);