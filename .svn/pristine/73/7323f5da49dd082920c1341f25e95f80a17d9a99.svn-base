var roleModule = angular.module('roleModule',[]);
roleModule.controller('roleFormController',['$rootScope','$stateParams','$scope','RoleService','dialogs',function($rootScope,$stateParams,$scope,RoleService,dialogs){

	$scope.initRoleData = function()
	{
		if($stateParams.operate != 'add')
		{
			function sucessCB(data)
			{	
				console.log(data);
				$scope.role = data;
			}
			function errorCB(error)
			{
				alert('加载数据失败!');
			}
			RoleService.findRoleById($stateParams.id,sucessCB,errorCB);
		}
	}
	
	$scope.saveRole = function(role)
	{
		function sucessCB()
		{
			$rootScope.closeOperateTab();
			$scope.refreshGrid();
			$state.go("main.list.role.roleList");
			
		}
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
		RoleService.saveRole(role,sucessCB,errorCB);
	}
	$scope.updateRole = function(role){
		function sucessCB()
		{
			$rootScope.closeOperateTab();
			$scope.refreshGrid();
			$state.go("main.list.role.roleList");
			
		}
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
		
		RoleService.updateRole(role,sucessCB,errorCB);
	}
	
	$scope.saveRoleOperate = function(role)
	{
		if($scope.roleOperateForm.$invalid){
			return;
		}
		if($stateParams.operate == 'add')
		{
			$scope.saveRole(role);
		}
		else if($stateParams.operate == 'edit')
		{
			$scope.updateRole(role);
		}
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController(
				"roleListGrid", "ddatagrid");
		if (controller) {
			controller.refreshCurrent();
		} else {
			//
		}
	}
}]);
