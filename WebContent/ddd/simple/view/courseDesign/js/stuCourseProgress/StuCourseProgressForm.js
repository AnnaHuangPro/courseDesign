angular.module('stuCourseProgressModule', [])
.controller('stuCourseProgressFormController',['$rootScope','$scope','StuCourseProgressService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,StuCourseProgressService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.stuCourseProgress = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findStuCourseProgress();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findStuCourseProgress = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		StuCourseProgressService.findStuCourseProgressById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.stuCourseProgress = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveStuCourseProgress = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addStuCourseProgress($scope.stuCourseProgress,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateStuCourseProgress($scope.stuCourseProgress,isNeedNew);
		}
	}
	
	
	$scope.addStuCourseProgress = function(stuCourseProgress,isNeedNew) {   
		
		if(angularPermission.hasPermission('stuCourseProgress_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			StuCourseProgressService.saveStuCourseProgress(stuCourseProgress,sucessCB,errorCB);
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
				$state.go('main.list.stuCourseProgress.stuCourseProgressList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateStuCourseProgress = function(stuCourseProgress,isNeedNew) {
		
		if(angularPermission.hasPermission('stuCourseProgress_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			StuCourseProgressService.updateStuCourseProgress(stuCourseProgress,sucessCB,errorCB);
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
				$state.go('main.list.stuCourseProgress.stuCourseProgressList');
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
		$state.go('main.list.stuCourseProgress.stuCourseProgressList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('stuCourseProgressListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);