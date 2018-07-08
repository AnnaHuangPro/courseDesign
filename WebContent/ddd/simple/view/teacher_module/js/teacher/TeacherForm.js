angular.module('teacherModule', [])
.controller('teacherFormController',['$rootScope','$scope','TeacherService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,TeacherService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.teacher = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findTeacher();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findTeacher = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		TeacherService.findTeacherById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.teacher = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveTeacher = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addTeacher($scope.teacher,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateTeacher($scope.teacher,isNeedNew);
		}
	}
	
	
	$scope.addTeacher = function(teacher,isNeedNew) {   
		
		if(angularPermission.hasPermission('teacher_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			TeacherService.saveTeacher(teacher,sucessCB,errorCB);
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
				$state.go('main.list.teacher.teacherList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateTeacher = function(teacher,isNeedNew) {
		
		if(angularPermission.hasPermission('teacher_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			TeacherService.updateTeacher(teacher,sucessCB,errorCB);
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
				$state.go('main.list.teacher.teacherList');
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
		$state.go('main.list.teacher.teacherList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('teacherListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);