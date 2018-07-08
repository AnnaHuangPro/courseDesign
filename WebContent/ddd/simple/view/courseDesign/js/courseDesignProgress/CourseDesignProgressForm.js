angular.module('courseDesignProgressModule', [])
.controller('courseDesignProgressFormController',['$rootScope','$scope','CourseDesignProgressService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,CourseDesignProgressService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	$scope.courseId = $rootScope.courseId;
	$scope.teaId = $rootScope.teaId;
	
	$scope.create = function() {
		$scope.courseDesignProgress = {};
		//设置默认值
	};
	
	$scope.init = function() {
		$scope.ifRead = false; 
		if($stateParams.operate=='edit') {
			$scope.findCourseDesignProgress();
			$scope.ifRead = true;
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	};
	
	$scope.findCourseDesignProgress = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		CourseDesignProgressService.findCourseDesignProgressById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.courseDesignProgress = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveCourseDesignProgress = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addCourseDesignProgress($scope.courseDesignProgress,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateCourseDesignProgress($scope.courseDesignProgress,isNeedNew);
		}
	};
	
	$scope.findStage = function(){
		if($scope.operate=='add') {
			CourseDesignProgressService.findStage($scope.courseDesignProgress.progressStage,$scope.courseId, $rootScope.teaId,sucessfindStage,errorfindStage);
		}
	};
	
	function sucessfindStage(data){
		if(data){
			$rootScope.app.error("已存在当前课程进度");
		}
	};
	
	function errorfindStage(error){
		$rootScope.openErrorDialog(error);
	};
	
	$scope.addCourseDesignProgress = function(courseDesignProgress,isNeedNew) {   
		if(angularPermission.hasPermission('courseDesignProgress_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			courseDesignProgress.courseId = $rootScope.courseId;
			courseDesignProgress.teaId = $rootScope.teaId;
			CourseDesignProgressService.saveCourseDesignProgress(courseDesignProgress,sucessCB,errorCB);
		}
		else {
			dialogs.error("错误","操作: 新增  未被授权，请联系管理人员");
		}
		function sucessCB(data)	{
			if(data != null){
				$rootScope.app.asynchroMask.unmask();
				if(isNeedNew){
					$scope.operate='add';
					$scope.create();
				}
				else {
					$scope.refreshGrid();
					$rootScope.closeOperateTab();
					$state.go('main.list.courseDesignProgress.courseDesignProgressList');
				}
			}else{
				$rootScope.app.error("已存在当前课程进度");
			}
		}
		
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.updateCourseDesignProgress = function(courseDesignProgress,isNeedNew) {
		
		if(angularPermission.hasPermission('courseDesignProgress_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			CourseDesignProgressService.updateCourseDesignProgress(courseDesignProgress,sucessCB,errorCB);
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
				$state.go('main.list.courseDesignProgress.courseDesignProgressList');
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
		$state.go('main.list.courseDesignProgress.courseDesignProgressList');
	};
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('courseDesignProgressListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	};
	
}]);