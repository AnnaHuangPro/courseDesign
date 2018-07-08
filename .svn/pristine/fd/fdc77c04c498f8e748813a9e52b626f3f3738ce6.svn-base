angular.module('entityPropertyDefineModule', [])
.controller("entityPropertyDefineFormController",["$rootScope","$scope","EntityPropertyDefineService","$state","angularPermission","$stateParams",
function($rootScope,$scope,EntityPropertyDefineService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == "add" ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	$scope.index = 0;
	$scope.propertiesDefine = new Array();
	
	
	$scope.deleteProperty = function(propertyDefine){
		for(var i =0;i<$scope.propertiesDefine.length;i++){
			if($scope.propertiesDefine[i].index == propertyDefine.index){
				$scope.propertiesDefine.splice(i,1);
			}
		}
	}
	
	$scope.addOneProperty = function(){
		var temp = {};
		if($scope.propertiesDefine == null)
		{
			$scope.propertiesDefine=[];
		}
		temp.index =  $scope.index;
		$scope.propertiesDefine.push(temp);
		$scope.index ++;
	}
	
	$scope.getInitEntityPropertyDefineData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getEntityPropertyDefineDetail();
		}
	}
	
	$scope.getEntityPropertyDefineDetail = function()
	{
		EntityPropertyDefineService.findEntityPropertyDefineById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
				if($scope.propertiesDefine == null)
				{
					$scope.propertiesDefine=[];
				}
				$scope.propertiesDefine.push(data);
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveEntityPropertyDefine = function(propertiesDefine)
	{
		if($scope.operate=='add')
		{
			$scope.addEntityPropertyDefine(propertiesDefine,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateEntityPropertyDefine(propertiesDefine);
		}
	}
	
	$scope.saveAndAddEntityPropertyDefine = function(propertiesDefine)
	{
		$scope.addEntityPropertyDefine(propertiesDefine,false);
	}	
	$scope.addEntityPropertyDefine = function(propertiesDefine,needColseTab)
	{   
		EntityPropertyDefineService.saveEntityPropertyDefine({propertiesDefine:propertiesDefine},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();	
			}
			else
				$scope.entityPropertyDefine=null;
		}
		function errorcb(error)
		{
			dialogs.error("添加失败!");
		}
	}
	$scope.updateEntityPropertyDefine = function(entityPropertyDefine)
	{
		EntityPropertyDefineService.updateEntityPropertyDefine({entityPropertyDefine:entityPropertyDefine[0]},sucesscb,errorcb);
	
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
//		var controller = $rootScope.getController("entityPropertyDefineListGrid" , "ddatagrid");
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("entityPropertyDefineListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"entityPropertyDefineList","main.list.entityPropertyDefine.entityPropertyDefineList")
	}
}]);