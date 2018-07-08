angular.module('entityTipsModule', [])
.controller('entityTipsListController',['$rootScope','$scope','$state','$stateParams','angularPermission','EntityTipsService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,EntityTipsService,dialogs){
	
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
	
	$scope.addEntityTips = function(entityTips)
	{
		$state.go('main.list.entityTips.entityTipsAddForm',{operate:'add'});
	}
	$scope.deleteEntityTips = function(entityTips)
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
			EntityTipsService.deleteEntityTips({entityTipsId:entityTips.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	}
	function refreshGrid(){
		$scope.refreshGrid("entityTipsListGrid");
	}
	
	$scope.updateEntityTips = function(entityTips)
	{
		$state.go('main.list.entityTips.entityTipsEditForm',{operate:'edit',id:entityTips.EId});
	}
	$scope.displayEntityTips = function(entityTips)
	{
		$state.go('main.list.entityTips.entityTipsDisplay',{id:entityTips.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addEntityTips;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'entityTips_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateEntityTips;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'entityTips_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayEntityTips;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'entityTips_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteEntityTips;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'entityTips_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('entityTips_add');
	addPermission('entityTips_edit');
	addPermission('entityTips_display');
	addPermission('entityTips_delete');
}]);	