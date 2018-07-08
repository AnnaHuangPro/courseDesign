angular.module('reportFormModule', [])
.controller('reportFormListController',['$rootScope','$scope','$state','$stateParams','angularPermission','ReportFormService',
function($rootScope,$scope,$state,$stateParams,angularPermission,ReportFormService){
	
	$scope.addReportForm = function(reportForm)
	{
		$state.go('main.list.reportForm.reportFormFormAddRoute',{operate:'add'});
	}
	$scope.deleteReportForm = function(reportForm)
	{
		ReportFormService.deleteReportForm({reportFormId:reportForm.EId},sucesscb,function(error){ $rootScope.openErrorDialog(error); });
		function sucesscb(data)
		{
			if(data[0]>0)
				$rootScope.getController('reportFormListGrid' , 'ddatagrid').refreshCurrent(); 
			else
				alert('删除失败');
		}
	
	}
	
	$scope.updateReportForm = function(reportForm)
	{
		$state.go('main.list.reportForm.reportFormFormEditRoute',{operate:'edit',id:reportForm.EId});
	}
	$scope.displayReportForm = function(reportForm)
	{
		$state.go('main.list.reportForm.reportFormDisplayRoute',{id:reportForm.EId});
	}
	$scope.produceReportForm = function()
	{
		$state.go('main.list.reportForm.produceReportForm',{});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addReportForm;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'reportForm_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateReportForm;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'reportForm_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayReportForm;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'reportForm_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteReportForm;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'reportForm_delete';
	$scope.operationColumns.push(deleteColumn);
	
	var produceReportFormColumn={};
	produceReportFormColumn.click=$scope.produceReportForm;
	
	
}]);	