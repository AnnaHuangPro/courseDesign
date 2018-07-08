angular.module('reportTestModule', [])
.controller('reportTestListController',['$rootScope','$scope','$state','$stateParams','angularPermission','ReportTestService',
function($rootScope,$scope,$state,$stateParams,angularPermission,ReportTestService){
	
	$scope.addReportTest = function(reportTest)
	{
		$state.go('main.list.reportTest.reportTestFormAddRoute',{operate:'add'});
	}
	$scope.deleteReportTest = function(reportTest)
	{
		
		if (confirm('确认删除?')) {
			ReportTestService.deleteReportTest({reportTestId:reportTest.EId},$scope.deleteSuccessFn,function(error){ $rootScope.openErrorDialog(error); });
        }
	}
	$scope.deleteSuccessFn = function(data)
	{
		if(data[0]>0)
				$rootScope.getController('reportTestListGrid' , 'ddatagrid').refreshCurrent();
		else
				alert('删除失败');
	}
	
	$scope.updateReportTest = function(reportTest)
	{
		$state.go('main.list.reportTest.reportTestFormEditRoute',{operate:'edit',id:reportTest.EId});
	}
	$scope.displayReportTest = function(reportTest)
	{
		$state.go('main.list.reportTest.reportTestDisplayRoute',{id:reportTest.EId});
	}
	
	$scope.previewColumn=function(reportTest){
	//	window.open("../ReportTest/preview?id="+reportTest.EId);
		window.open("simple/view/reportForm/html/reportTest/preview.html?id="+reportTest.EId);
	}
	
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addReportTest;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'reportTest_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateReportTest;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'reportTest_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayReportTest;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'reportTest_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteReportTest;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'reportTest_delete';
	$scope.operationColumns.push(deleteColumn);
	
	var previewColumn={};
	previewColumn.click= $scope.previewColumn;
	previewColumn.label='预览';
	previewColumn.icon = 'glyphicon glyphicon-eye-open';
	previewColumn.permission = 'reportTest_preview';
	$scope.operationColumns.push(previewColumn);
}]);	