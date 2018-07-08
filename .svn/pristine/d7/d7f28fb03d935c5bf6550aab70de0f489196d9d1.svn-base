define(['app'], function (app) 
{
	app.controller('MainController',['$scope','$rootScope','$state',function($scope,$rootScope,$state){
		
		$scope.refreshGrid = function(gridId){
			var controller = $rootScope.getController(
					gridId, "ddatagrid");
			if (controller) {
				controller.refreshCurrent();
			} else {
				
			}
		}
		
		$scope.turnToTab = function(isClose,tabName,tabRoute,stateParams){
			if(isClose){
				$scope.closeOperateTab();
			}
			if (!$scope.selectTab(tabName) && tabRoute) {
				if(stateParams){
					$state.go(tabRoute,stateParams);
				}else{
					$state.go(tabRoute);
				}
			}
		}
		
		
	}])
})