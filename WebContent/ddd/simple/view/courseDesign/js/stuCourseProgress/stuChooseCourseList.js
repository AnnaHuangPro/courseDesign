angular.module('stuChooseCourseList', [])
.controller('stuChooseCourseListController',['$rootScope','$scope','$stateParams','CourseDesignService','EmployeeService','TeacherService','$state','angularPermission',
function($rootScope,$scope,$stateParams,CourseDesignService,EmployeeService,TeacherService,$state,angularPermission) {
	
	$scope.init = function() {
		var employeeP = angularPermission.getLoginUser().employee;
		var eId = employeeP.eId; 	
		EmployeeService.findPersonalMessageByEidAndRole(eId,"student",succES,erroES);
	}
	
//	findPersonalMessageByEidAndRole的成功回调
	function succES(data){
		var stuMajor = data.stuMajor;
		var currentSemester = data.currentSemester;
		CourseDesignService.findCourseDesignByMajorAndSestem(stuMajor,currentSemester,successCD,errorCD);
	}
	
//	findPersonalMessageByEidAndRole的失败回调
	function erroES(error){
		$rootScope.openErrorDialog(error);
	}
	
//	findCourseDesignByMajorAndSestem的成功回调
	function successCD(data){
		if(data != ""){
			let course = [];
			for(let i in data){
				TeacherService.findTeacherById(data[i].teaId,successTea,errorTea);
				function successTea(d){
					data[i].teaName = d.teaRealName;
				}
				function errorTea(){
					$rootScope.openErrorDialog(error);
				}
				course.push(data[i]);
			}
			$scope.courseDesign = course;
		}
	}
	
//	findCourseDesignByMajorAndSestem的失败回调
	function errorCD(error){
		$rootScope.openErrorDialog(error);
	}
	
//	findTeacherById的成功回调
	function successTea(data){
		$scope.courseDesign.teaName = data.teaRealName;
	}
	
//	findTeacherById的失败回调
	function errorTea(error){
		$rootScope.openErrorDialog(error);
	}
	
	$scope.choose = function(data){
		var eId = data.course.eId;
		$state.go('main.list.courseDesign.courseDesignDisplay',{id:eId});
	}
	
/*	
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
		console.log(error);
	}
	
//	findAllByTeacherId的回调函数
	function sucback(data){
		$scope.courseDesign.teaName = data.teaRealName;
	}
	
	function errback(error){
		console.log(error);
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
	$scope.editCourseDesign = function(cid){
		$state.go('main.list.courseDesignProgress.courseDesignProgressEditForm',{operate:'edit',id:cid.process.eId});
	}
	*/
}]);