angular.module("taskServiceModule",['DynamicFormApp','baseApp','formModule','ui.bootstrap'])
.controller('processHistroyController',['$rootScope','$scope','TaskService','$state','angularPermission',
                                         '$stateParams',function($rootScope,$scope,TaskService,$state,angularPermission,
                                        		 $stateParams){
    $scope.taskId = $stateParams.taskId;
	$scope.processInstanceId = $stateParams.processInstanceId;
    $scope.name = $stateParams.name;
    $scope.taskType = $stateParams.taskType;
    $scope.taskDetailInfo = {};
	
    $scope.initProcessHistory = function(){
    	if($scope.taskType == 'nonHandleTask')
		{
			TaskService.findTaskDetailById($scope.taskId,$scope.getResult,$scope.errorOperate);
		}else if($scope.taskType == 'operatedTask')
		{
			TaskService.findOperatedTaskDetailById($scope.taskId,$scope.getResult,$scope.errorOperate);
		}else if($scope.taskType == 'completedTask')
		{
			TaskService.findCompletedTaskDetailById($scope.taskId,$scope.getResult,$scope.errorOperate);
		}
    	$scope.findProcessImage();
    }
    $scope.getResult = function(data){
		$scope.taskDetailInfo = data;
		$scope.taskDetailInfo.newDate = new Date();
	}
    
    //查找流程图
	$scope.findProcessImage = function(){
		TaskService.traceProcess($scope.processInstanceId,$scope.imageClickResult,$scope.errorOperate);
	}
	$scope.imageClickResult = function(datas)
	{
		angular.forEach(datas,function(data)
		{
			if(data.currentActiviti==true)
			{
				$scope.coordinateObj = data;
			}
		});
	}
	
	$scope.successOperate = function(data)
	{
		alert("操作成功");
	}
	$scope.errorOperate = function(error)
	{
		$rootScope.openErrorDialog(error);
	};
	
}]);