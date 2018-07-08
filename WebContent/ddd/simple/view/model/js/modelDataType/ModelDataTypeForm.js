angular.module('modelDataTypeModule', [])
.controller('modelDataTypeFormController',['$rootScope','$scope','ModelDataTypeService','$state', '$stateParams',
function($rootScope,$scope,ModelDataTypeService,$state, $stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitModelDataTypeData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getModelDataTypeDetail();
		}
	}
	
	$scope.getModelDataTypeDetail = function()
	{
		ModelDataTypeService.findModelDataTypeById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.modelDataType = data;
		};

		function errorcb(data)
		{
			alert('加载失败');
		};
	};
	
	$scope.saveModelDataType = function(modelDataType)
	{
		if ($scope.modelDataTypeForm.$valid) {
			if($scope.operate=='add')
			{
				$scope.addModelDataType(modelDataType,true);
			}
			else if($scope.operate=='edit')
			{
				$scope.updateModelDataType(modelDataType);
			}
		}
		else {
			$scope.modelDataTypeForm.submitted = true;
		}
	}
	
	$scope.saveAndAddModelDataType = function(modelDataType)
	{
		$scope.addModelDataType(modelDataType,false);
	}	
	$scope.addModelDataType = function(modelDataType,needColseTab)
	{   
		ModelDataTypeService.saveModelDataType({modelDataType:modelDataType},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				$rootScope.closeOperateTab();
				$state.go('main.list.modelDataType.modelDataTypeList');
			}
			else
				$scope.modelDataType=null;
			$scope.refreshGrid();
		}
		function errorcb()
		{
			alert('添加失败!');
		}
	}
	$scope.updateModelDataType = function(modelDataType)
	{
		ModelDataTypeService.updateModelDataType({modelDataType:modelDataType},sucesscb,errorcb);
	
		function sucesscb()
		{
			$rootScope.closeOperateTab();
			$state.go('main.list.modelDataType.modelDataTypeList');
			$scope.refreshGrid();
		}
		function errorcb()
		{
			alert('修改失败!');
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('modelDataTypeListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("modelDataTypeListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"modelDataTypeList","main.list.modelDataType.modelDataTypeList")
	}
}]);