angular.module('logModule', [])
.controller('logListController',['$rootScope','$scope','$state','$stateParams','angularPermission','LogService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,LogService,dialogs){
	
	$scope.displayLog = function(log)
	{
		$state.go('main.list.log.logDisplay',{id:log.EId});
	}
	
	$scope.operationBarButtons=[];
	
	$scope.operationColumns=[];
	
	
	var displayColumn={};
	displayColumn.click= $scope.displayLog;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'log_display';
	$scope.operationColumns.push(displayColumn);
	
}]);	