angular.module("taskServiceModule",['DynamicFormApp','baseApp','formModule','ui.bootstrap'])
.controller('taskFormController',['$rootScope','$scope','TaskService','$state','angularPermission',
                                         '$stateParams','ngDialog','dialogs','$timeout',function($rootScope,$scope,TaskService,$state,angularPermission,
                                        		 $stateParams,ngDialog,dialogs,$timeout){
    $scope.taskId = $stateParams.taskId;
	$scope.name = $stateParams.name;
	$scope.taskType = $stateParams.taskType;
	$scope.preCheckResult = $stateParams.preCheckResult;
	$scope.reApply = $stateParams.reApply;
	$scope.formId = $stateParams.formId;
	var entityScope = {};
	var entityVar = {};
	
	$scope.initTaskInfo = function()
	{
		$scope.isShow = $scope.taskType == "nonHandleTask";
		if($scope.taskType == "nonHandleTask")
		{
			TaskService.findTaskDetailById($scope.taskId,$scope.findTaskDetailInfo,$scope.errorOperate);
		}
		else if($scope.taskType == "completedTask")
		{
			TaskService.findCompletedTaskDetailById($scope.taskId,$scope.findTaskDetailInfo,$scope.errorOperate);
		}
		else if($scope.taskType =="operatedTask")
		{
			TaskService.findOperatedTaskDetailById($scope.taskId,$scope.findTaskDetailInfo,$scope.errorOperate);
		}
		
	}
	//任务详细信息
	$scope.findTaskDetailInfo = function(data){
		$scope.taskDetailInfo = data;
		$scope.taskDetailInfo.newDate = new Date();
		if($scope.taskDetailInfo.formRoute != null &&
				$scope.taskDetailInfo.formRoute != "")
		{
			data.taskType = $scope.taskType;
			$rootScope.dddProcessVar = data;
			$state.go($scope.taskDetailInfo.formRoute,{id:$scope.taskDetailInfo.formId});
		}
		
		/*//初始化嵌入表单所需流程变量
		$timeout(function(){
			entityScope = angular.element("#workFlowFormId").scope();
		
			if(entityScope)
			{
				entityScope = entityScope.$$childTail;
				
				if( typeof entityScope.getProcessVarible === 'function' )
				{
					entityScope.getProcessVarible(data);
				}
			}
		},500)*/
	}
	
	$scope.reApply = function(){
		function successcb(data){
			$rootScope.closeOperateTab();
			$state.go($scope.reApply,{operate:"edit",id:$scope.formId});
		}
    	function errorcb(error){
    		$rootScope.openErrorDialog(error);
    	}
    	TaskService.stopTask($scope.taskId,successcb,errorcb);
	}
	
	$scope.completeTask = function()
	{
		entityScope = angular.element("#workFlowFormId").scope().$$childTail;
		
		if(entityScope)
		{
			//提交前得到需要保存的流程变量
			if( typeof entityScope.setProcessVariable === 'function' )
			{
				entityVar = entityScope.setProcessVariable();
			}
			
			//提交前调用保存实体方法
			if( typeof entityScope.saveEntityData === 'function' )
			{
				entityScope.saveEntityData().$promise
				.then(function(data){
					$scope.submitTask();
				});
			}
			else
			{
				$scope.submitTask();
			}
		}
		else{
			$scope.submitTask();
		}
	}
	
	//完成任务并保存form
	$scope.submitTask = function()
	{
		var taskId = $scope.taskDetailInfo.taskId
		var dynamicFormResult = {};
		var formData = $scope.taskDetailInfo.formKeyData;
		var selectResult = "";
		angular.forEach($scope.taskDetailInfo.dddDynamicFormObjects,function(dddDynamicFormObject)
		{
			if(dddDynamicFormObject.type=="enum")
			{
				selectResult = dddDynamicFormObject.defauleVaule;
			}
			dynamicFormResult["fp_"+dddDynamicFormObject.name]=dddDynamicFormObject.defauleVaule;
		});
		
		/*for(var key in formData)
		{
			if(formData[key].hasOwnProperty("EId"))
			{
				formData[key] = formData[key]["EId"];
			}
		}*/
		$scope.taskDetailInfo.formKeyData = formData;
		
		if(selectResult=="不同意"||selectResult=="驳回"){
			var dlg = dialogs.confirm('提交','确认'+ selectResult +''+ $scope.taskDetailInfo.processName,{size:'md'});
			dlg.result.then(function(btn){
				$rootScope.app.asynchroMask.mask("提交中。。。。。");
				TaskService.submitTask(taskId,entityVar,dynamicFormResult,$scope.taskDetailInfo,$scope.successJump,$scope.errorOperate);
			},function(btn){
				
			});
		}else{
			$rootScope.app.asynchroMask.mask("提交中。。。。。");
			TaskService.submitTask(taskId,entityVar,dynamicFormResult,$scope.taskDetailInfo,$scope.successJump,$scope.errorOperate);
		}
	}
	//完成任务后跳转
	$scope.successJump = function(){
		$rootScope.app.asynchroMask.unmask();
		$rootScope.closeOperateTab();
		$state.go("main.list.workflow.taskList",{taskType:'nonHandleTask',name:$scope.name});
		
	}
	
	$scope.errorOperate = function(error)
	{
		$rootScope.app.asynchroMask.unmask();
		$rootScope.openErrorDialog(error);
	};
	
}]);