angular.module('scheduleTaskModule', [])
.controller('scheduleTaskFormController',['$rootScope','$scope','ScheduleTaskService','$state','angularPermission',
                                          '$stateParams','$interpolate',
function($rootScope,$scope,ScheduleTaskService,$state,angularPermission,$stateParams,$interpolate){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	$scope.executeType = 'file';
	$scope.executeTimes = 'times';
	$scope.scheduleTask = {
			state:'启用'
	};
	$scope.getInitScheduleTaskData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getScheduleTaskDetail();
		}
	}
	
	$scope.getScheduleTaskDetail = function()
	{
		ScheduleTaskService.findScheduleTaskById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.scheduleTask = data;
			if($scope.scheduleTask.fileType =='method' ){
				$scope.executeType = 'class'
			}else if($scope.scheduleTask.fileType =='bat' || $scope.scheduleTask.fileType =='exe'){
				$scope.executeType = 'file'
			}
			
			if($scope.scheduleTask.period != "" && $scope.scheduleTask.periodUnit != ""){
				$scope.executeTimes = 'times';
			}
			else{
				$scope.executeTimes = 'else';
			}
			
//			$scope.scheduleTask.startTime = new Date($scope.scheduleTask.startTime);
//			$scope.scheduleTask.endTime = new Date($scope.scheduleTask.endTime);
			$scope.scheduleTask.nextStartTime = new Date($scope.scheduleTask.nextStartTime);
			$scope.scheduleTask.lastStartTime = new Date($scope.scheduleTask.lastStartTime);
		};

		function errorcb(data)
		{
			dialogs.error('加载失败');
		};
	};
	
	$scope.saveScheduleTask = function(scheduleTask)
	{
		
		if($scope.executeType == 'class'){
			scheduleTask.fileType = 'method';
		}
		
		if($scope.operate=='add')
		{
			$scope.addScheduleTask(scheduleTask,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateScheduleTask(scheduleTask);
		}
	}
	
	$scope.saveAndAddScheduleTask = function(scheduleTask)
	{
		$scope.addScheduleTask(scheduleTask,false);
	}	
	$scope.addScheduleTask = function(scheduleTask,needColseTab)
	{   
		ScheduleTaskService.saveScheduleTask({scheduleTask:scheduleTask},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();	
			}
			else
				$scope.scheduleTask=null;
		}
		function errorcb()
		{
			dialogs.error('添加失败!');
		}
	}
	$scope.updateScheduleTask = function(scheduleTask)
	{
		ScheduleTaskService.updateScheduleTask({scheduleTask:scheduleTask},sucesscb,errorcb);
	
		function sucesscb()
		{
			refreshGrid();
			$scope.back();	
		}
		function errorcb()
		{
			dialogs.error('修改失败!');
		}
	};
	
	$scope.fileChange = function(event){
		
	}
//	$scope.cancelOperate = function(){
//		$rootScope.closeOperateTab();
//	}
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('scheduleTaskListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("scheduleTaskListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"scheduleTaskList","main.list.scheduleTask.scheduleTaskList")
	}
}]);