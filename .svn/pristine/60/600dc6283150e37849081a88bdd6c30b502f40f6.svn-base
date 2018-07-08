angular.module('dataSourceModule', ['ngDialog'])

.controller('dataSourceListController',['$rootScope','$scope','$state','$stateParams','DataSourceService','angularPermission','ngDialog','dialogs',function($rootScope,$scope,$state,$stateParams,DataSourceService,angularPermission,ngDialog,dialogs){
	
	$scope.addDataSource=function(){
		$state.go("main.list.dataSource.dataSourceAddForm",{operate:'add'});
	}
	
	$scope.updateDataSource = function(dataSource)
	{
		$state.go("main.list.dataSource.dataSourceEditForm",{id:dataSource.EId,operate:'edit'});
	}
	
	$scope.displayDataSource = function(dataSource)
	{
		$state.go("main.list.dataSource.dataSourceDisplay",{id:dataSource.EId});
	}
	
	$scope.addListViewForDataSource = function(dataSource)
	{
		$state.go("main.list.reportView.reportViewAddForm",{id:dataSource.EId,operate:'addReportView'});
	}
	$scope.hasPermission = function(permission){
		return angularPermission.hasPermission(permission);
	}
	$scope.deleteDataSource = function(dataSource)
	{
//		if (confirm('确认删除'+dataSource.dataSourceName+'数据源?\n提示：不能删除有视图的数据源！')) {
//			DataSourceService.deleteDataSource({dataSourceId:dataSource.EId},$scope.deleteSuccessFn,function(){alert("删除失败");});
//        }
		
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？\n提示：不能删除有视图的数据源！",{size:'sm'});
		dialog.result.then(function(){
			function successCB(data)
			{
				if(data>0){
					refreshGrid();
				}
				else{
					dialogs.error("错误","删除的数据已经不存在（可能已经被其他用户删除）");
				}
			};
			function errorCB(error)
			{
				$rootScope.openErrorDialog(error);
			};
			DataSourceService.deleteDataSource(dataSource.EId,successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});

	}

	
	$scope.openCopyDataSource = function(dataSource)
	{
		$scope.copyDataSourceCode=dataSource.dataSourceCode+"Copy";
		$scope.copyDataSourceId = dataSource.EId;
		ngDialog.open({
			template: "simple/view/listView/html/dataSource/CopyDataSource.html",
			className: 'ngdialog-theme-default ngdialog-theme-custom',
			closeByDocument : true,
			scope: $scope,
			plain : false
		});
	}
	
	$scope.copyDataSource = function()
	{
		ngDialog.closeAll();
		DataSourceService.copyDataSource($scope.copyDataSourceId,$scope.copyDataSourceCode,sucesscb,errorcb);
		function errorcb(error){
			alert("复制数据源失败");
		}
		function sucesscb(data){
            $rootScope.getController("dataSourceListGrid" , "ddatagrid").refreshCurrent();
			alert("复制数据源成功");
		}
	}
	
	$scope.batchDeleteDataSource = function(dataSources)
	{
		console.log(dataSources);
		alert("ddd");
	}
	
	function refreshGrid(){
		$scope.refreshGrid("dataSourceListGrid");
	}	
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateDataSource;
	editColumn.label='编辑';
	editColumn.icon = "glyphicon glyphicon-edit";
	editColumn.permission = 'dataSource_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayDataSource;
	displayColumn.label='查看';
	displayColumn.icon = "glyphicon glyphicon-eye-open";
	displayColumn.permission = 'dataSource_display';
	$scope.operationColumns.push(displayColumn);
	
	var addListViewColumn={};
	addListViewColumn.click= $scope.addListViewForDataSource;
	addListViewColumn.label='新增视图';
	addListViewColumn.icon = "glyphicon glyphicon-th-list";
	addListViewColumn.permission = 'dataSource_addListView';
	$scope.operationColumns.push(addListViewColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteDataSource;
	deleteColumn.label='删除';
	deleteColumn.icon = "glyphicon glyphicon-remove";
	deleteColumn.permission = 'dataSource_delete';
	$scope.operationColumns.push(deleteColumn);
	
	var copyColumn={};
	copyColumn.click= $scope.openCopyDataSource;
	copyColumn.label='复制数据源';
	copyColumn.icon = "glyphicon glyphicon-copy";
	copyColumn.permission = 'dataSource_copy';
	$scope.operationColumns.push(copyColumn);
	
	
}]);