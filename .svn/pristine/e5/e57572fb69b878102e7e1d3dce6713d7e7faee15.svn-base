angular.module('statsReportModel2',[])
.controller('statsReportController2',['$scope','$rootScope','$state','ModelFileService',function($scope,$rootScope,$state,ModelFileService) 
{
	
	ModelFileService.getAllReportFormGroupByType2(sucessCB,errorCB);
	function sucessCB(data)
	{
		$scope.reportFormsChart = data;
	};

	function errorCB(error)
	{
		$rootScope.openErrorDialog(error);
	};	
	
	$scope.preview = function(key,withChart,dynamicForm){
		$state.go('main.list.reportFormPreview.previewRoute',{modelFileKey:key,withChart:withChart,dynamicForm:dynamicForm});
	}
	
	
} ]);