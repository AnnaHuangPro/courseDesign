angular.module("taskServiceModule",['DynamicFormApp','baseApp','formModule','ui.bootstrap'])
.controller('taskListController',['$rootScope','$scope','TaskService','$state','angularPermission',
                                         '$stateParams','ngDialog','dialogs',function($rootScope,$scope,TaskService,$state,angularPermission,
                                        		 $stateParams,ngDialog,dialogs){

    $scope.taskList=[];
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.startPage = 0;
    $scope.maxSize = 7;
   	$scope.name = $stateParams.name;
   	$scope.taskType = $stateParams.taskType;
   	$scope.hasTask = true;
    //初始化表单
	$scope.initTaskList = function()
	{   
		$scope.isDisplay = $scope.taskType=='nonHandleTask'?true:false;
		if($scope.taskType == 'nonHandleTask')
		{
			TaskService.findNonHandleTaskList($scope.startPage,$scope.pageSize,$scope.getTasks,$scope.errorOperate);
		}
		else if($scope.taskType == 'operatedTask')
		{
			TaskService.findOperatedTaskList($scope.startPage,$scope.pageSize,$scope.getTasks,$scope.errorOperate);
		}
		else if($scope.taskType == 'completedTask')
		{
			TaskService.findCompletedTaskList($scope.startPage,$scope.pageSize,$scope.getTasks,$scope.errorOperate);
		}
		else if($scope.taskType == 'submitedTask')
		{
			TaskService.findOwnerTaskList($scope.startPage,$scope.pageSize,$scope.getTasks,$scope.errorOperate);
		}
	}
	/*--------------分页--------------*/
	$scope.getTasks = function(data)
	{
		$scope.taskList = data.result;
		if(data.result.length ==0 ){
			//$scope.taskList = [];
			//$scope.taskList.push({description:"暂无待办任务",taskId:-1});
			$scope.hasTask = false;
		}
		$scope.totalItems = data.totalItems;
	}
	
	$scope.formatTitle = function(description){
		var title = description.replace(/\d{4}\-\d{1,2}\-\d{1,2}\s\d{1,2}\:\d{1,2}\:\d{1,2}/,"");
		return title.replace(" ","");
	}
	$scope.formatCreateTime = function(description){
		var time = description.match(/\d{4}\-\d{1,2}\-\d{1,2}\s\d{1,2}\:\d{1,2}\:\d{1,2}/);
		if(!time)
			return;
		return time[0].substr(0,10);
	}
	
	$scope.pageChanged = function () 
	{
        $scope.startPage = ($scope.currentPage-1) * $scope.pageSize;
		$scope.initTaskList();
    };
    /*--------------分页--------------*/

    //获取任务详细信息
	$scope.findTaskDetail = function(task)
	{ 
		$state.go('main.list.workflow.taskForm',{taskId:task.taskId,taskType:$scope.taskType,name:$scope.name});
	}
	
	//查看流程历史
	$scope.displayProcessHistory = function(taskId,processInstanceId){
		$state.go("main.list.workflow.processHistory",{taskId:taskId,processInstanceId:processInstanceId,taskType:$scope.taskType});
	}
	
	$scope.errorOperate = function(error){
   		$rootScope.openErrorDialog(error);
   	}
	
}]);

