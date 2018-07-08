angular.module('courseDesignModule', [])
.controller('courseDesignDisplayController',['$rootScope','$scope','$stateParams','CourseDesignService','TaskService','TeacherService','StudentService','CourseDesignProgressService','EmployeeService','$state','angularPermission',
function($rootScope,$scope,$stateParams,CourseDesignService,TaskService,TeacherService,StudentService,CourseDesignProgressService,EmployeeService,$state,angularPermission) {
	var employeeP = angularPermission.getLoginUser().employee;
	var stuId;
	$scope.ifChoose = false;
	if(employeeP.remark == "teacher"){
		$scope.isTeacher = true;
	}else if(employeeP.remark == "student"){
		$scope.isStudent = true;
		EmployeeService.findPersonalMessageByEidAndRole(employeeP.eId,"student",sucStu,erroStu);
	}
	function sucStu(data){
		stuId = data.eId;
		var taskId = data.taskId;
	}
	function erroStu(error){
		$rootScope.openErrorDialog(error);
	}
	$scope.init = function() {
		$rootScope.courseId = $stateParams.id;
		CourseDesignService.findCourseDesignById($stateParams.id,successCB,errorCB);
	}
	
//	findCDProgressByCourseId的回调函数
	function successProgress(data) {
			$scope.processes = data;
	}
	function errorProgress(error)	{
		$rootScope.openErrorDialog(error);
	}
	
//	findCourseDesignById的回调函数
	function successCB(data) {
		$scope.courseDesign = data;
		$rootScope.teaId = $scope.courseDesign.teaId;
		CourseDesignProgressService.findCourseProgressByCourseIdAndTeaEId($stateParams.id,$scope.courseDesign.teaId,successProgress,errorProgress);
		TeacherService.findTeacherById($scope.courseDesign.teaId,sucback,errback);
		TaskService.findAllByTeacherId($scope.courseDesign.teaId,$stateParams.id,sucCB,errCB);
		
	}
	function errorCB(error)	{
		$rootScope.openErrorDialog(error);
	}
//	findAllByTeacherId的回调函数
	
	function sucCB(data){
		$scope.task = data;
	}
	function errCB(error){
		$rootScope.openErrorDialog(error);
	}
	
//	findAllByTeacherId的回调函数
	function sucback(data){
		$scope.courseDesign.teaName = data.teaRealName;
	}
	
	function errback(error){
		$rootScope.openErrorDialog(error);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
	
	$scope.addTask = function(){
		$state.go('main.list.task.taskAddForm',{operate:'add'});
	}
	
	$scope.addProcess = function(){
		$state.go('main.list.courseDesignProgress.courseDesignProgressAddForm',{operate:'add'});
	}
	
	$scope.editCourseDesign = function(process){
		$state.go('main.list.courseDesignProgress.courseDesignProgressEditForm',{operate:'edit',id:process.eId});
	}
	
	$scope.chooseTask = function(data){
		$scope.currentData = data;
		var taskId = data.taskItem.eId;
		StudentService.chooseTask(taskId,stuId,succsCT,errorCT);
	}
	
	
	function succsCT(data){
		if(data != 1){
			$rootScope.app.error("选题不成功，请稍后重试");
		}else{
			$scope.currentData.taskItem.isChoose = true;
		}
	}
	
	function errorCT(error){
		$rootScope.openErrorDialog(error);
	}
	

	$scope.seeTask = function(data){
		var taskId = data.taskItem.eId;
		$state.go('main.list.task.taskDisplay',{id:taskId});
	}
	
}]);