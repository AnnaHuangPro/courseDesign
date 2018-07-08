angular.module('modelDataModule', [])
.controller("modelDataDisplayController",['ModelService','$rootScope','$scope','$stateParams','$state',
                                          'ModelDataService','ngDialog','$timeout',
function(ModelService,$rootScope,$scope,$stateParams,$state,ModelDataService,ngDialog,$timeout)
{
	$scope.formKey = $stateParams.formKey;
	$scope.modelId = $stateParams.modelId;
	$scope.modelDataId = $stateParams.modelDataId;
	/*$scope.processInstanceId=$stateParams.processInstanceId;*/
	$scope.tableName = $stateParams.tableName;

    $scope.cancel = function()
    {
    	$rootScope.closeOperateTab();
	}
	
	$scope.getDisplayInitData = function()
	{
		ModelDataService.findModelDataByModelDataId($scope.tableName,$scope.modelDataId,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.formId = $stateParams.modelDataId;
		$timeout(function(){$scope.modelData = data;},800);
		ModelService.findModelById($scope.modelId,function(model){
			$scope.model = model;
			$scope.tab.name = "查看"+model.modelName;
		})
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
	
	$scope.cancelOperate = function()
	{
		$state.go("main.list.modelData.modelDatalist",{id:$scope.modelId}); 
	}
	
	
	/*$scope.findTraceProcess = function(){
		
		TaskService.traceProcess($scope.processInstanceId,$scope.findTraceProcessResult,$scope.errorOperate);
	
	}*/
	$scope.findTraceProcessResult = function(datas)
	{
		angular.forEach(datas,function(data)
		{
			if(data.currentActiviti==true)
			{
				$scope.coordinateObj = data;
			}
		});

		ngDialog.open({
			template: "simple/view/workflow/html/task/ProcessImageDisplayForm.html",
			className: 'ngdialog-theme-default ngdialog-theme-custom',
			closeByDocument : true,
			scope: $scope,
			plain : false
		});
	}
	$scope.errorOperate = function(data)
	{
		alert("操作失败！！");
	};
	
	
}]);