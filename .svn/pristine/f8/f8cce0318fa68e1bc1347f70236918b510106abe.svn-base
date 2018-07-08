/**
 * 
 */
angular.module('reportViewModule', ['ngDialog'])

.controller('reportViewListController',['$rootScope','$scope','$state','$stateParams','ReportviewService','angularPermission','ngDialog','dialogs',function($rootScope,$scope,$state,$stateParams,ReportviewService,angularPermission,ngDialog,dialogs){
	
	$scope.editReportView = function(ReportView)
	{
		$state.go('main.list.reportView.reportViewEditForm',{id:ReportView.EId,operate:'editReportView'});
	};	
	$scope.deleteReportView = function(reportView)
	{
//		if (confirm('确认删除视图?')) {
//			ReportviewService.deleteReportView({reportViewId:reportView.EId},$scope.deleteSuccessFn,function(data){alert('删除失败');});
//        }
		
		var dialog = dialogs.confirm("确认框","确认删除视图?",{size:'sm'});
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
			ReportviewService.deleteReportView(reportView.EId,successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});

	}
    $scope.openCopyReportView = function(reportView)
    {
        $scope.copyReportViewKey=reportView.reportViewKey+'Copy';
        $scope.copyreportViewId = reportView.EId;
        ngDialog.open({
            template: 'simple/view/listView/html/reportView/CopyReportView.html',
            className: 'ngdialog-theme-default ngdialog-theme-custom',
            closeByDocument : true,
            scope: $scope,
            plain : false
        });
    };

    $scope.copyReportView = function()
    {
        ngDialog.closeAll();
        
        function errorCB(error){
        	dialogs.error('复制视图失败');
        }
        function sucessCB(data){
        	refreshGrid();
            dialogs.notify('提示','复制视图成功!',{size:'sm'});
        }
        ReportviewService.copyReportView($scope.copyreportViewId,$scope.copyReportViewKey,sucessCB,errorCB);
    };
    
	function refreshGrid(){
		$scope.refreshGrid("reportViewListGrid");
	}
	
	$scope.displayReportView = function(ReportView) {
        $state.go('main.list.reportView.reportViewDisplay', {id: ReportView.EId});
    };
    
    /**********************/
	var permissions ={};
	$scope.hasPermission = function (permission) {
		if(angular.isDefined(permissions[permission])) {
			return true;
		}
		else {
			return false;
		}	
	}
	
	function addPermission(permission) {
		if(angularPermission.hasPermission(permission))	{
			permissions[permission] = true;
		}
	}
	/**********************/

	$scope.operationColumns=[];
	
	var editColumn = {};
	editColumn.click= $scope.editReportView;
	editColumn.label='编辑视图';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'listView_edit';
	$scope.operationColumns.push(editColumn);

    var copyColumn={};
    copyColumn.click= $scope.openCopyReportView;
    copyColumn.label='复制视图';
    copyColumn.icon = 'glyphicon glyphicon-copy';
    copyColumn.permission = 'listView_copy';
    $scope.operationColumns.push(copyColumn);

	var displayColumn={};
	displayColumn.click= $scope.displayReportView;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'listView_view';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn = {};
	deleteColumn.click= $scope.deleteReportView;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove';
	deleteColumn.permission = 'listView_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('listView_edit');
	addPermission('listView_copy');
	addPermission('listView_view');
	addPermission('listView_delete');
}]);