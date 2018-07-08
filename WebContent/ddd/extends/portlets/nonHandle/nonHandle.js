.controller('taskListController',['$rootScope','$scope','TaskService','$state','angularPermission',
                                         '$stateParams','ngDialog',function($rootScope,$scope,TaskService,$state,angularPermission,
                                        		 $stateParams,ngDialog){

    $scope.taskList=[];
    $scope.pageSize = 4;
    $scope.currentPage = 1;
    $scope.startPage = 0;
   	$scope.name = $stateParams.name;
   	
    //初始化表单
	$scope.initTaskList = function()
	{   
		$scope.isDisplay = $scope.name=='待办任务'?true:false;
		if($scope.name == '待办任务')
		{
			TaskService.findNonHandleTaskList($scope.startPage,$scope.pageSize,$scope.getTasks,$scope.errorOperate);
		}
		else if($scope.name == '已办任务')
		{
			TaskService.findOperatedTaskList($scope.startPage,$scope.pageSize,$scope.getTasks,$scope.errorOperate);
		}
		else if($scope.name == '已完成任务')
		{
			TaskService.findCompletedTaskList($scope.startPage,$scope.pageSize,$scope.getTasks,$scope.errorOperate);
		}
	}
	/*--------------分页--------------*/
	$scope.getTasks = function(data)
	{
		$scope.taskList = data.result;
		$scope.totalItems = data.totalItems;
		angular.forEach($scope.taskList, function(item,index,items){
			item.isShow = item.assignee == undefined?true:false;
		});
		console.log($scope.taskList);
	}
	
	$scope.pageChanged = function () 
	{
        $scope.startPage = ($scope.currentPage-1) * $scope.pageSize;
		$scope.initTaskList();
    };
    /*--------------分页--------------*/

    $scope.claimAtQueued = function(taskId)
    {
    	$scope.successOperate = function(){
    		$scope.initTaskList();
    	}
    	
    	TaskService.claimAtQueued(taskId,$scope.successOperate,$scope.errorOperate);
    }
    
    //获取任务详细信息
	$scope.findTaskDetail = function(taskId)
	{ 
		$state.go('main.list.workflow.taskFormRoute',{taskId:taskId,name:$scope.name});
	}
	
	//查看流程历史
	$scope.displayProcessHistory = function(taskId,processInstanceId){
		$state.go("main.list.workflow.processHistoryRoute",{taskId:taskId,processInstanceId:processInstanceId,name:$scope.name});
	}
	
	$scope.errorOperate = function(error){
   		$rootScope.openErrorDialog(error);
   	}
	
}])