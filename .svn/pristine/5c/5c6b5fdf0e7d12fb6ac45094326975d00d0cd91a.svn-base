angular.module('organizationModule', [])
.controller('organizationListController',['$rootScope','$scope','$state','$stateParams','angularPermission','OrganizationService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,OrganizationService,dialogs){
	$scope.importConfigs = {limit:1,
			importConfigKey : "organization",
			eId:null
	}
	
	
	
	$scope.addOrganization = function(organization)
	{
		$state.go('main.list.organization.organizationAddForm',{operate:'add'});
	}
	$scope.deleteOrganization = function(organization)
	{
		
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		dialog.result.then(function(){
			OrganizationService.deleteOrganization({organizationId:organization.EId},sucesscb,function(data){	$rootScope.openErrorDialog(data); });
			function sucesscb(data)
			{
				if(data>0)
					$rootScope.getController('organizationListGrid' , 'ddatagrid').refreshCurrent(); 
				else
					$rootScope.openErrorDialog(data); 
			}
		},function(){
			 
		});
	}
	
	
	
	
	
	$scope.$on("dddedit",function(event,organization){
		OrganizationService.updateOrganization({organization:organization},function(){},function(){});
	});
	
	$scope.updateOrganization = function(organization)
	{
		$state.go('main.list.organization.organizationEditForm',{operate:'edit',id:organization.EId});
	}
	$scope.displayOrganization = function(organization)
	{
		$state.go('main.list.organization.organizationDisplay',{id:organization.EId});
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
	
	function init()	{ 
		//以下代码中 visiableFunction 是行操作按钮的显示回调函数，row是显示的行，row.entity 可以取到显示的数据,
		$scope.operationColumns=[];
		
		var editColumn={};
		editColumn.click= $scope.updateOrganization;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('organization_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayOrganization;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('organization_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteOrganization;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('organization_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('organization_add');
		addPermission('organization_edit');
		addPermission('organization_display');
		addPermission('organization_delete');	
	}
	
	init();
}]);	