angular.module('entityPropertyModule', [])
.controller("entityPropertyFormController",["$rootScope","$scope","EntityPropertyService","$state","angularPermission","$stateParams",
function($rootScope,$scope,EntityPropertyService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == "add" ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitEntityPropertyData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getEntityPropertyDetail();
		}
	}
	
	$scope.getEntityPropertyDetail = function()
	{
		EntityPropertyService.findEntityPropertyById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.entityProperty = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveEntityProperty = function(entityProperty)
	{
		if($scope.operate=='add')
		{
			$scope.addEntityProperty(entityProperty,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateEntityProperty(entityProperty);
		}
	}
	
	$scope.saveAndAddEntityProperty = function(entityProperty)
	{
		$scope.addEntityProperty(entityProperty,false);
	}	
	$scope.addEntityProperty = function(entityProperty,needColseTab)
	{   
		EntityPropertyService.saveEntityProperty({entityProperty:entityProperty},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();	
			}
			else
				$scope.entityProperty=null;
		}
		function errorcb(error)
		{
			dialogs.error("添加失败!");
		}
	}
	$scope.updateEntityProperty = function(entityProperty)
	{
		EntityPropertyService.updateEntityProperty({entityProperty:entityProperty},sucesscb,errorcb);
	
		function sucesscb()
		{
			refreshGrid();
			$scope.back();	
		}
		function errorcb(error)
		{
			dialogs.error("修改失败!");
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController("entityPropertyListGrid" , "ddatagrid");
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("entityPropertyListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"entityPropertyList","main.list.entityProperty.entityPropertyList")
	}
}]);