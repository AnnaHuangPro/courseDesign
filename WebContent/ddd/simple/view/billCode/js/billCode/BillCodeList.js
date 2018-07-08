angular.module('billCodeModule', [])
.controller('billCodeListController',['$rootScope','$scope','$state','$stateParams','angularPermission','BillCodeService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,BillCodeService,dialogs){
	
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
	
	$scope.addBillCode = function(billCode)
	{
		$state.go('main.list.billCode.billCodeAddForm',{operate:'add'});
	}
	$scope.deleteBillCode = function(billCode)
	{

		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
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
			BillCodeService.deleteBillCode({billCodeId:billCode.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	}
	
	$scope.updateBillCode = function(billCode)
	{
		$state.go('main.list.billCode.billCodeEditForm',{operate:'edit',id:billCode.EId});
	}
	$scope.displayBillCode = function(billCode)
	{
		$state.go('main.list.billCode.billCodeDisplay',{id:billCode.EId});
	}
	function refreshGrid(){
		$scope.refreshGrid("billCodeListGrid");
	}
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addBillCode;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'billCode_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateBillCode;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'billCode_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayBillCode;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'billCode_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteBillCode;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'billCode_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('billCode_add');
	addPermission('billCode_edit');
	addPermission('billCode_display');
	addPermission('billCode_delete');
}]);	