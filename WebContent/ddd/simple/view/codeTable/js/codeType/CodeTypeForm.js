angular.module('codeTypeModule', [])
.controller("codeTypeFormController",["$rootScope","$scope","CodeTypeService","$state","angularPermission","$stateParams",
function($rootScope,$scope,CodeTypeService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == "add" ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitCodeTypeData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getCodeTypeDetail();
		}
	}
	$scope.cancelOperate = function() {
		$scope.closeOperateTab();
	}
	$scope.getCodeTypeDetail = function()
	{
		CodeTypeService.findCodeTypeById($scope.id,sucessCB,errorCB);

		function sucessCB(data)
		{
			$scope.codeType = data;
		};

		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveCodeType = function(codeType)
	{
		if($scope.operate=='add')
		{
			$scope.addCodeType(codeType,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateCodeType(codeType);
		}
	}
	
	$scope.saveAndAddCodeType = function(codeType)
	{
		$scope.addCodeType(codeType,false);
	}	
	$scope.addCodeType = function(codeType,needColseTab)
	{   
		CodeTypeService.saveCodeType({codeType:codeType},sucessCB,errorCB);

		function sucessCB()
		{
			if(needColseTab){
				$scope.refreshGrid();
				$rootScope.closeOperateTab();
				$state.go("main.list.codeType.codeTypeList");
			}
			else{
				// 保存并新增
				$scope.codeType={};
			}			
		}
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateCodeType = function(codeType)
	{
		CodeTypeService.updateCodeType({codeType:codeType},sucessCB,errorCB);
	
		function sucessCB()
		{
			$scope.refreshGrid();
			$rootScope.closeOperateTab();
			$state.go("main.list.codeType.codeTypeList");			
		}
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController("codeTypeListGrid" , "ddatagrid");
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("codeTypeListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"codeTypeList","main.list.codeType.codeTypeList")
	}
}]);