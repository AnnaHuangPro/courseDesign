angular.module('externalInterfaceModule', [])
.controller('externalInterfaceDisplayController',['$rootScope','$scope','$stateParams','ExternalInterfaceService','$state',
function($rootScope,$scope,$stateParams,ExternalInterfaceService,$state)
{
	$scope.init = function()
	{
		function successCB(data)
		{
			$scope.externalInterface = data;
		}
		
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
		ExternalInterfaceService.findExternalInterfaceById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
		$state.go('main.list.externalInterface.externalInterfaceList');
	}
}]);