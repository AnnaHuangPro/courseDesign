angular.module('modelModule', [])
.controller("modelPushListController",['$rootScope','$scope','$state','$stateParams','ModelService',
function($rootScope,$scope,$state,$stateParams, ModelService){
	
	$scope.showModels = [];
	$scope.modelTypeId = -1;
	
	var permissions ={};
	$scope.hasPermission = function (permission) {
		if(angular.isDefined(permissions[permission])) {
			return true;
		}
		else {
			return false;
		}	
	}
	
	function addPermission(permission) {
		if(angularPermission.hasPermission(permission))	{
			permissions[permission] = true;
		}
	}	
	
	$scope.displayModel = function(model)
	{
		if(model.state=="已发布"){
			window.open('index.html#/main/list/modelData/modelOptionListRoute/'+model.EId+'/'+model.modelName, '_blank');
		}else{
			alert("请先发布模型后再进行操作！");
		}
	}
	
	$scope.operationColumns=[];
	
	var displayColumn={};
	displayColumn.click= $scope.displayModel;
	displayColumn.label='发布管理';
	displayColumn.icon = "glyphicon glyphicon-eye-open";
	displayColumn.permission = 'model_display';
	$scope.operationColumns.push(displayColumn);
	
	addPermission('model_display');
	
}]);	