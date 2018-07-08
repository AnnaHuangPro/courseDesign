angular.module('statsReportModel',[])
.controller('statsReportController',['$scope','$rootScope','$state','ModelFileService',function($scope,$rootScope,$state,ModelFileService) 
{
	
	ModelFileService.getAllReportFormGroupByType(sucessCB,errorCB);
	function sucessCB(data)
	{
		$scope.reportForms = data;
	};

	function errorCB(error)
	{
		$rootScope.openErrorDialog(error);
	};	
	
	$scope.preview = function(key,withChart,dynamicForm){
		$state.go('main.list.reportFormPreview.previewRoute',{modelFileKey:key,withChart:withChart,dynamicForm:dynamicForm});
	}
	
	
} ]);