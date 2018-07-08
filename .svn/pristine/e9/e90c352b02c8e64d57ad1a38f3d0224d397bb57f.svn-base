angular.module('reportFormModule', [])
.controller('reportFormFromController',['$rootScope','$scope','ReportFormService','$state','angularPermission','$stateParams',
function($rootScope,$scope,ReportFormService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitReportFormData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getReportFormDetail();
		}
	}
	
	$scope.getReportFormDetail = function()
	{
		ReportFormService.findReportFormById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.reportForm = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveReportForm = function(reportForm)
	{
		if($scope.operate=='add')
		{
			$scope.addReportForm(reportForm,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateReportForm(reportForm);
		}
	}
	
	$scope.saveAndAddReportForm = function(reportForm)
	{
		$scope.addReportForm(reportForm,false);
	}	
	$scope.addReportForm = function(reportForm,needColseTab)
	{   
		ReportFormService.saveReportForm({reportForm:reportForm},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				$rootScope.closeOperateTab();
				$state.go('main.list.reportForm.reportFormListRoute'); 
			}
			else
				$scope.reportForm=null;
			$scope.refreshGrid();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateReportForm = function(reportForm)
	{
		ReportFormService.updateReportForm({reportForm:reportForm},sucesscb,errorcb);
	
		function sucesscb()
		{
			$rootScope.closeOperateTab();
			$state.go('main.list.reportForm.reportFormListRoute'); 
			$scope.refreshGrid();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.refreshGrid = function(){
		var controller = $rootScope.getController('reportFormListGrid' , 'ddatagrid');
		if(controller){
			controller.refreshCurrent();
		}
	}
}]);