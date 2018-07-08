var viewTreeModule=angular.module('viewTreeModule',[]);
viewTreeModule.controller('viewTreeListController',['$rootScope','$stateParams','$scope','ViewTreeService','$state','angularPermission','dialogs',
                                                  function($rootScope,$stateParams,$scope,ViewTreeService,$state,angularPermission,dialogs){
	$scope.viewTreeKey = 'orgnationTree';
	$scope.addViewTree = function()
	{
		$state.go('main.list.viewTree.viewTreeAddForm',{operate:'add'});
	};
	
	$scope.editViewTree = function(viewTree)
	{
		$state.go('main.list.viewTree.viewTreeEditForm',{operate:'edit',id:viewTree.EId});
	};
	
	$scope.displayViewTree = function(viewTree)
	{
		$state.go('main.list.viewTree.viewTreeDisplay',{id:viewTree.EId});
	};
	$scope.hasAddPermission = function(){
		return angularPermission.hasPermission('viewTree_add');
	}
	$scope.deleteViewTree=function(viewTree){
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
			ViewTreeService.deleteViewTree(viewTree.EId,successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
		
	};
	
	function refreshGrid(){
		$scope.refreshGrid("viewTreeListGrid");
	}
	
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
		
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.editViewTree;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'viewTree_edit';
	$scope.operationColumns.push(editColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteViewTree;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'viewTree_delete';
	$scope.operationColumns.push(deleteColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayViewTree;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'viewTree_view';
	$scope.operationColumns.push(displayColumn);
	
	addPermission('viewTree_edit');
	addPermission('viewTree_display');
	addPermission('viewTree_delete');
	addPermission('viewTree_add');
	
	$scope.viewViewTree=function(){
		function sucessCB(data)
		{			
			$scope.viewTree  = data;
		}
		function errorCB(error)
		{
			alert('加载数据失败!');
		}
		ViewTreeService.findViewTreeById($stateParams.id,sucessCB,errorCB);
	};
}]);