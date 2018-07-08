angular.module('entityTipsModule', [])
.controller('entityTipsFormController',['$rootScope','$scope','EntityTipsService','$state','angularPermission','$stateParams',
function($rootScope,$scope,EntityTipsService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.entityTips = {};

	$scope.generateObject = function(str,name){

		$scope.entityTips.EntityName = name;
		
		$scope.entityTips.introduce = str;
			
	}
	
	$scope.generateJson = function(){
		var result = {};
		var context = {};
		
//		context["key"] =  $scope.entityTips.EntityAttr;
//		
//		//result.name = $scope.importEntity;
//
//		result.context =  context;
//		
		result = $scope.entityTips.introduce;

		$scope.entityTips.EntityAttr = result.toString();
	}
	
	
	$scope.getInitEntityTipsData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getEntityTipsDetail();
		}
	}
	
	$scope.getEntityTipsDetail = function()
	{
		EntityTipsService.findEntityTipsById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.entityTips = data;
			$scope.generateObject(data.entityAttr,data.entityName);
		};

		function errorcb(data)
		{
			alert('加载失败');
		};
	};
	
	$scope.saveEntityTips = function(entityTips)
	{
		$scope.generateJson();
		
		if($scope.operate=='add')
		{
			$scope.addEntityTips(entityTips,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateEntityTips(entityTips);
		}
	}
	
	$scope.saveAndAddEntityTips = function(entityTips)
	{
		$scope.addEntityTips(entityTips,false);
	}	
	$scope.addEntityTips = function(entityTips,needColseTab)
	{   
		EntityTipsService.saveEntityTips({entityTips:entityTips},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();
			}
			else
				$scope.entityTips=null;
			$scope.refreshGrid();
		}
		function errorcb()
		{
			alert('添加失败!');
		}
	}
	$scope.updateEntityTips = function(entityTips)
	{
		EntityTipsService.updateEntityTips({entityTips:entityTips},sucesscb,errorcb);
	
		function sucesscb()
		{
			refreshGrid();
			$scope.back();
		}
		function errorcb()
		{
			alert('修改失败!');
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('entityTipsListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("entityTipsListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"entityTipsList","main.list.entityTips.entityTipsList")
	}
}]);