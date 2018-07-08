angular.module('studentModule', [])
.controller('studentFormController',['$rootScope','$scope','StudentService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,StudentService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.student = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findStudent();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findStudent = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		StudentService.findStudentById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.student = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveStudent = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addStudent($scope.student,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateStudent($scope.student,isNeedNew);
		}
	}
	
	
	$scope.addStudent = function(student,isNeedNew) {   
		
		if(angularPermission.hasPermission('student_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			StudentService.saveStudent(student,sucessCB,errorCB);
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
				$state.go('main.list.student.studentList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateStudent = function(student,isNeedNew) {
		
		if(angularPermission.hasPermission('student_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			StudentService.updateStudent(student,sucessCB,errorCB);
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
				$state.go('main.list.student.studentList');
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
		$state.go('main.list.student.studentList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('studentListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);