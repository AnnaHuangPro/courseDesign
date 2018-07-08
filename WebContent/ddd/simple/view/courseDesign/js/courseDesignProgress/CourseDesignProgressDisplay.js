angular.module('courseDesignProgressModule', [])
.controller('courseDesignProgressDisplayController',['$rootScope','$scope','$stateParams','CourseDesignProgressService','CourseDesignService','$state',
function($rootScope,$scope,$stateParams,CourseDesignProgressService,CourseDesignService,$state) {
	$scope.init = function() {
		function successCB(data) {
			var courseId = data.courseId;
			CourseDesignService.findCourseDesignById(courseId,successfcd,errorfcd);
			$scope.courseDesignProgress = data;
		}
		
		function successfcd(data){
			$scope.courseDesignProgress.courseDesignName = data.name;
		}
		function errorfcd(error){
			$rootScope.openErrorDialog(error);
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		CourseDesignProgressService.findCourseDesignProgressById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);