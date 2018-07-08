angular.module('majorModule', [])
.controller('majorFormController',['$rootScope','$scope','MajorService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,MajorService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.major = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findMajor();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findMajor = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		MajorService.findMajorById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.major = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveMajor = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addMajor($scope.major,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateMajor($scope.major,isNeedNew);
		}
	}
	
	
	$scope.addMajor = function(major,isNeedNew) {   
		
		if(angularPermission.hasPermission('major_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			MajorService.saveMajor(major,sucessCB,errorCB);
		}
		else {
			dialogs.error("错误","操作: 新增  未被授权，请联系管理人员");
		}
		function sucessCB()	{
			$rootScope.app.asynchroMask.unmask();
			if(isNeedNew){
				$scope.operate='add';
				$scope.create();
			}
			else {
				$scope.refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.major.majorList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateMajor = function(major,isNeedNew) {
		
		if(angularPermission.hasPermission('major_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			MajorService.updateMajor(major,sucessCB,errorCB);
		}
		else {
			dialogs.error("错误","操作: 编辑  未被授权，请联系管理人员");
		}
		function sucessCB()	{
			$rootScope.app.asynchroMask.unmask();			
			if(isNeedNew) {
				$scope.operate='add';
				$scope.create();
			}
			//处理一些默认值
			else {
				$scope.refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.major.majorList');
			}			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.cancel = function() {
		$scope.refreshGrid();
		$rootScope.closeOperateTab();
		$state.go('main.list.major.majorList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('majorListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);