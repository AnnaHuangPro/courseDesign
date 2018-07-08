angular.module('courseDesignModule', [])
.controller('courseDesignFormController',['$rootScope','$scope','CourseDesignService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,CourseDesignService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.courseDesign = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findCourseDesign();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findCourseDesign = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		CourseDesignService.findCourseDesignById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.courseDesign = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveCourseDesign = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addCourseDesign($scope.courseDesign,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateCourseDesign($scope.courseDesign,isNeedNew);
		}
	}
	
	
	$scope.addCourseDesign = function(courseDesign,isNeedNew) {   
		
		if(angularPermission.hasPermission('courseDesign_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			CourseDesignService.saveCourseDesign(courseDesign,sucessCB,errorCB);
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
				$state.go('main.list.courseDesign.courseDesignList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateCourseDesign = function(courseDesign,isNeedNew) {
		
		if(angularPermission.hasPermission('courseDesign_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			CourseDesignService.updateCourseDesign(courseDesign,sucessCB,errorCB);
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
				$state.go('main.list.courseDesign.courseDesignList');
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
		$state.go('main.list.courseDesign.courseDesignList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('courseDesignListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);