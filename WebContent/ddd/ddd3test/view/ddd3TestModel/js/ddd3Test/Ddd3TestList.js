angular.module('ddd3TestModule', [])
.controller('ddd3TestListController',['asynchroMarkService','$rootScope','$scope','$state','$stateParams','angularPermission','Ddd3TestService','dialogs','ImportService','ReportService',
function(asynchroMarkService,$rootScope,$scope,$state,$stateParams,angularPermission,Ddd3TestService,dialogs,ImportService,ReportService){
	
	//参数名
	$scope.addDdd3Test = function()
	{
		$state.go('main.list.ddd3Test.ddd3TestFormAddRoute',{operate:'add'});
	}
	$scope.deleteDdd3Test = function(ddd3Test)
	{
		function successCB(data)
		{
			asynchroMarkService.unmask();
			if(data > 0)
			{
					$rootScope.getController('ddd3TestListGrid' , 'ddatagrid').refreshCurrent();
			}
			else
			{	
				dialogs.error("错误","删除的数据已经不存在（可能已经被其他用户删除）");
			}
		}
		function errorCB(error)
		{
			asynchroMarkService.unmask();
			$rootScope.openErrorDialog(error);
		}	
		var dialog = dialogs.confirm("删除之后不能恢复，确定要删除吗？");
		dialog.result.then(function(){
			Ddd3TestService.deleteDdd3Test(ddd3Test.EId,successCB,errorCB);
		},function(){
			 
		});
	}
	
	$scope.updateDdd3Test = function(ddd3Test)
	{
		$state.go('main.list.ddd3Test.ddd3TestFormEditRoute',{operate:'edit',id:ddd3Test.EId});
	}
	$scope.displayDdd3Test = function(ddd3Test)
	{
		$state.go('main.list.ddd3Test.ddd3TestDisplayRoute',{id:ddd3Test.EId});
	}
	
	//弹出层确定操作
	$scope.addImportConfigs = function(importConfigs)
	{   
		ImportService.importDataFile(importConfigs,'accidentReportListGrid');
	}
	//导入
	$scope.importMR = function(){
		var template="simple/view/importConfigs/html/importConfigs/DialogImportConfigsForm.html";
		ImportService.openDialog(template,$scope);
	}
	
	$scope.print = function(){
		$scope.params = {};
		$scope.params.orgId = 1;
		$scope.params.dddimage = "organizationKey_2_IMG_0978.JPG";
		ReportService.reportDocx($scope.params,"organizationKey");
	}
	$scope.reportForm = function(){
		$state.go('main.list.reportFormPreview.previewRoute',{modelFileKey:"organizationKey1"});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addDdd3Test;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'ddd3Test_add';
	$scope.operationBarButtons.push(addBarButton);
	
	var printBarButton={};
	printBarButton.click= $scope.print;
	printBarButton.label='打印';
	printBarButton.icon = 'glyphicon glyphicon-print';
	printBarButton.permission = 'ddd3Test_add';
	$scope.operationBarButtons.push(printBarButton);
	
	var reportFormBarButton={};
	reportFormBarButton.click= $scope.reportForm;
	reportFormBarButton.label='报表';
	reportFormBarButton.icon = 'glyphicon glyphicon-file';
	reportFormBarButton.permission = 'ddd3Test_add';
	$scope.operationBarButtons.push(reportFormBarButton);
	
	var importButton={};
	importButton.click= $scope.importMR;
	importButton.label='导入';
	importButton.icon = 'glyphicon glyphicon-plus-sign';
	importButton.permission = 'ddd3Test_add';
	$scope.operationBarButtons.push(importButton);
	
	
	
	$scope.operationColumns=[];
	
	//权限判断
	var editColumn={};
	editColumn.click= $scope.updateDdd3Test;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'ddd3Test_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayDdd3Test;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'ddd3Test_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteDdd3Test;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'ddd3Test_delete';
	$scope.operationColumns.push(deleteColumn);
}]);	