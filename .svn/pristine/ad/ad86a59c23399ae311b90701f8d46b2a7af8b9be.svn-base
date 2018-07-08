angular.module('taskManageModule', [])
.controller('taskManageFormController',['$rootScope','$scope','TaskManageService','$state','angularPermission','$stateParams',
function($rootScope,$scope,TaskManageService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitTaskManageData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getTaskManageDetail();
		}
	}
	
	$scope.getTaskManageDetail = function()
	{
		TaskManageService.findTaskManageById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.taskManage = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveTaskManage = function(taskManage)
	{
		if($scope.operate=='add')
		{
			$scope.addTaskManage(taskManage,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateTaskManage(taskManage);
		}
	}
	
	$scope.saveAndAddTaskManage = function(taskManage)
	{
		$scope.addTaskManage(taskManage,false);
	}	
	$scope.addTaskManage = function(taskManage,needColseTab)
	{   
		TaskManageService.saveTaskManage({taskManage:taskManage},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();	
			}
			else
				$scope.taskManage=null;
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateTaskManage = function(taskManage)
	{
		TaskManageService.updateTaskManage({taskManage:taskManage},sucesscb,errorcb);
	
		function sucesscb()
		{
			refreshGrid();
			$scope.back();	;
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('taskManageListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("taskManageListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"taskManageList","main.list.taskManageModel.taskManageList")
	}
}]);