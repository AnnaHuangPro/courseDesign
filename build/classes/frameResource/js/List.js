#set($EntityNameUp="${entityClass.className}")
#set($EntityNameLow="${entityClass.className.substring(0,1).toLowerCase()}${entityClass.className.substring(1)}")
#set($extension=".js")
#set($fileName="${EntityNameUp}List")
#set($index = ${entityClass.packageName.lastIndexOf(".")} + 1)
#set($simplePackage=${entityClass.packageName.substring($index)})
#set($outputFile="${htmlAndjsCodeGenPath}${simplePackage}/js/${EntityNameLow}/${fileName}${extension}")
#set($daole="$")
angular.module('${EntityNameLow}Module', [])
.controller('${EntityNameLow}ListController',['dialogs','$rootScope','$scope','$state','$stateParams','angularPermission','${EntityNameUp}Service',
function(dialogs,$rootScope,$scope,$state,$stateParams,angularPermission,${EntityNameUp}Service) {
	
	$scope.add${EntityNameUp} = function(${EntityNameLow}) {
		${daole}state.go('main.list.${EntityNameLow}.${EntityNameLow}AddForm',{operate:'add'});
	}
	$scope.delete${EntityNameUp} = function(${EntityNameLow}) {		
		function successCB(data) {
			$rootScope.app.asynchroMask.unmask();
			if(data > 0) {
				${daole}rootScope.getController('${EntityNameLow}ListGrid' , 'ddatagrid').refreshCurrent();
			}
			else {	
				alert('删除的数据已经不存在（可能已经被其他用户删除）');
			}
		}
		
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}	
		
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		if(${daole}scope.hasPermission('${EntityNameLow}_delete')) {
			dialog.result.then(function() {
				$rootScope.app.asynchroMask.mask("加载中。。。。。");
				${EntityNameUp}Service.delete${EntityNameUp}(${EntityNameLow}.EId,successCB,errorCB);
			},function() {
				 
			});
		}
		else {
			dialogs.error("错误","操作: 删除  未被授权，请联系管理人员");
		}
	}	
	
	$scope.update${EntityNameUp} = function(${EntityNameLow}) {
		${daole}state.go('main.list.${EntityNameLow}.${EntityNameLow}EditForm',{operate:'edit',id:${EntityNameLow}.EId});
	}
	$scope.display${EntityNameUp} = function(${EntityNameLow}) {
		${daole}state.go('main.list.${EntityNameLow}.${EntityNameLow}Display',{id:${EntityNameLow}.EId});
	}	
	
	$scope.refreshGrid = function()	{
		if(angular.isUndefined(${daole}scope.${EntityNameLow}ListGrid)) return;
		$scope.${EntityNameLow}ListGrid.refreshAll();
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
		editColumn.click= $scope.update${EntityNameUp};
		editColumn.visiableFunction = function(row){ return ${daole}scope.hasPermission('${EntityNameLow}_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.display${EntityNameUp};
		displayColumn.visiableFunction = function(row){ return ${daole}scope.hasPermission('${EntityNameLow}_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.delete${EntityNameUp};
		deleteColumn.visiableFunction = function(row){ return ${daole}scope.hasPermission('${EntityNameLow}_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('${EntityNameLow}_add');
		addPermission('${EntityNameLow}_edit');
		addPermission('${EntityNameLow}_display');
		addPermission('${EntityNameLow}_delete');	
	}
	
	init();
}]);	