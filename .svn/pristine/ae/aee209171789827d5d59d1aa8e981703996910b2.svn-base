angular.module('dynamicFormModule', [])
.controller("dynamicFormListController",['$rootScope','$scope','$state','$stateParams', 'DynamicFormService','dialogs','angularPermission','dialogs',
function($rootScope,$scope,$state,$stateParams, DynamicFormService,dialogs,angularPermission,dialogs){
	
	$scope.addDynamicForm = function(dynamicForm)
	{
		/*var template = "simple/view/dynamicForm/html/dynamicForm/DynamicFormForm.html";
		$scope.openWindow(dynamicForm,'add',template);*/
		/*window.open('index.html#main/list/dynamicForm/dynamicFormFormAddRoute/add', '_blank');*/
		$state.go("main.list.dynamicForm.dynamicFormAddForm",{operate:'add'}); 
	}
	$scope.deleteDynamicForm = function(dynamicForm)
	{
		if(dynamicForm.remark=="系统表单")
		{
            dialogs.error("错误","不能删除系统表单!",{size:'md'});
			return;
		}

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
			DynamicFormService.deleteDynamicForm({dynamicFormId:dynamicForm.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
	}
	function refreshGrid(){
		$scope.refreshGrid("dynamicFormListGrid");
	}
	$scope.updateDynamicForm = function(dynamicForm)
	{	
		/*var template = "simple/view/dynamicForm/html/dynamicForm/DynamicFormForm.html";
		$scope.openWindow(dynamicForm,'edit',template);*/
		/*window.open('index.html#main/list/dynamicForm/dynamicFormFormEditRoute/edit/'+dynamicForm.EId, '_blank');*/
		$state.go("main.list.dynamicForm.dynamicFormEditForm",{operate:'edit',id:dynamicForm.EId}); 
	}
	$scope.displayDynamicForm = function(dynamicForm)
	{
		/*var template = "simple/view/dynamicForm/html/dynamicForm/DynamicFormDisplay.html";
		$scope.openWindow(dynamicForm,'edit',template);*/
		/*window.open('index.html#main/list/dynamicForm/dynamicFormDisplayRoute/'+dynamicForm.EId, '_blank');*/
		$state.go("main.list.dynamicForm.dynamicFormDisplay",{id:dynamicForm.EId}); 
	}
	
	$scope.deginDynamicForm = function(dynamicForm)
	{
		//window.open("../ddd/js/layout/index.html?dynamicFormId="+dynamicForm.EId);
		window.open("dynamicForm.html?dynamicFormId="+dynamicForm.EId);
	}

	$rootScope.openErrorDialog = function(clientError){
        var dialogId = ngDialog.open({
            template: 'js/base/asset/clientErrorDialog.html',
            showClose:true,
            controller: ['$scope', function ($scope, $timeout) {
            	if(clientError.data)
            	{	
            		$scope.clientError = clientError.data;
            	}
            	else
        		{
            		$scope.clientError={};
            		$scope.clientError.message=angular.toJson(clientError);
        		}
            	$scope.showDebug = false;
            		
            }],
            className: 'ngdialog-theme-default'
        });
	}
	
	
	$scope.isShowColumn = function(dynamicForm){
		if(dynamicForm.entity.remark=="系统表单"){
			return false;
		}else{
			return true;
		}
	}
	
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
	
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addDynamicForm;
	addBarButton.label='新增';
	addBarButton.icon = "glyphicon glyphicon-plus-sign";
	addBarButton.permission = 'dynamicForm_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateDynamicForm;
	editColumn.label='编辑';
	editColumn.icon = "glyphicon glyphicon-edit";
	editColumn.permission = 'dynamicForm_edit';
	$scope.operationColumns.push(editColumn);
	
//	var displayColumn={};
//	displayColumn.click= $scope.displayDynamicForm;
//	displayColumn.label='查看';
//	displayColumn.icon = "glyphicon glyphicon-eye-open";
//	displayColumn.permission = 'dynamicForm_display';
//	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteDynamicForm;
	deleteColumn.label='删除';
	deleteColumn.icon = "glyphicon glyphicon-remove-circle";
	deleteColumn.permission = 'dynamicForm_delete';
	deleteColumn.visiableFunction = $scope.isShowColumn;
	$scope.operationColumns.push(deleteColumn);
	
	var deginColumn={};
	deginColumn.click= $scope.deginDynamicForm;
	deginColumn.label='设计表单';
	deginColumn.icon = "glyphicon glyphicon-edit";
	deginColumn.permission = 'dynamicForm_degin';
	$scope.operationColumns.push(deginColumn);
	
	addPermission('dynamicForm_add');
	addPermission('dynamicForm_edit');
	addPermission('dynamicForm_delete');
	addPermission('dynamicForm_degin');
}]);	