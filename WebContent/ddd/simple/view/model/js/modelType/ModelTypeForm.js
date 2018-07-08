angular.module('modelTypeModule', [])
.controller("modelTypeFormController",["$q","$rootScope","$scope","ModelTypeService","$state","$stateParams",
function($q,$rootScope,$scope,ModelTypeService,$state, $stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == "add" ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitModelTypeData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getModelTypeDetail();
		}
	}
	
	$scope.getModelTypeDetail = function()
	{
		ModelTypeService.findModelTypeById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.modelType = data;
		};

		function errorcb(data)
		{
			alert("加载失败");
		};
	};
	
	$scope.saveModelType = function(modelType)
	{
		if($scope.operate=='add')
		{
			$scope.addModelType();
		}
		else if($scope.operate=='edit')
		{
			$scope.updateModelType();
		}
	}
	
	function clear(){
		$scope.modelType = {};
	}
	
	$scope.saveAndAdd = function()
	{
		var saveAndAddPromise = $q.defer();
		saveAndAddPromise.promise
							.then($scope.save)
							.then(clear)
							.catch(function error(error){
								$rootScope.openErrorDialog(error);
							});
		saveAndAddPromise.resolve();
	}	
	
	$scope.addModelType = function()
	{   
		return ModelTypeService.saveModelType($scope.modelType,sucesscb,errorcb);

		function sucesscb(modelType)
		{	
			$rootScope.app.notify("新增成功");
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	
	$scope.updateModelType = function()
	{   
		return ModelTypeService.updateModelType($scope.modelType,sucesscb,errorcb);

		function sucesscb(modelType)
		{	
			$rootScope.app.notify("修改成功");
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	
//	 $scope.cancel = function()
//    {
//    	$rootScope.closeOperateTab();
//	}
//	function refreshGrid(){
//		$scope.refreshGrid("codeTableListGrid");
//	}
	$scope.back = function() {
		$scope.turnToTab(true,"codeTableList","main.list.codeTable.codeTableList")
	}
}]);