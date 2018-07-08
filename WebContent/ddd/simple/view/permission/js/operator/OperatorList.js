angular.module('operatorModule',[])
.controller('copyController',function($scope,$uibModalInstance,data,$rootScope){
	//-- Methods --//
	
	$scope.done = function(){
		$uibModalInstance.close($scope.sourceOperator);
	}; // end done
	$scope.cancel = function(){
		$uibModalInstance.dismiss('Canceled');
	};		
 
})
.controller('operatorListController',['$stateParams','$scope','OperatorService','$state','angularPermission','$rootScope','ngDialog','dialogs',function($stateParams,$scope,OperatorService,$state,angularPermission,$rootScope,ngDialog,dialogs){
	$scope.addOperator = function(operator)
	{
		$state.go('main.list.operator.operatorAddForm',{operate:'add'});
	}
	
	$scope.updateOperator = function(operator)
	{
		$state.go('main.list.operator.operatorEditForm',{operate:'edit',id:operator.EId});
	}
	
	$scope.displayOperator = function(operator)
	{
		$state.go('main.list.operator.operatorDisplay',{id:operator.EId});
	}
	
	$scope.deleteOperator=function(operator){
//		if(confirm("确定删除【"+operator.name+"】?")){
//			OperatorService.deleteOperator(operator.EId,
//					function(data){ alert("删除成功");$rootScope.getController('operatorListGrid' , 'ddatagrid').refreshCurrent(); },
//					function(data){alert("删除失败"); $rootScope.getController('operatorListGrid' , 'ddatagrid').refreshCurrent(); });
//		}
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除"+operator.name+"吗？",{size:'sm'});
		dialog.result.then(function(){
			function successCB(data)
			{
				if(data>0){
					$scope.refreshGrid();
				}
				else{
					dialogs.error("错误","删除的数据已经不存在（可能已经被其他用户删除）");
				}
			};
			function errorCB(error)
			{
				$rootScope.openErrorDialog(error);
			};
			OperatorService.deleteOperator(operator.EId,successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	}
	
	$scope.refreshGrid = function(){
		var controller = $rootScope.getController("operatorListGrid" , "ddatagrid");
		if(controller){
			controller.refreshCurrent();
		}
	}
	
	$scope.copy = function(data){
		$uibModalInstance.dismiss('Canceled');
	}
	
	$scope.BatchOpe = function(){
		var gridapi = $rootScope.getController("operatorListGrid","ddatagrid");
		var selectedRows = gridapi.getSelectRow();
		var targetOperator = "";
		if(selectedRows.length == 0){
			alert("请选择目标操作员");
			return;
		}
		
		$scope.targetOperator = [];
		angular.forEach(selectedRows,function(value,key){
			$scope.targetOperator[key] = value.EId;
		});
		
		
		//还差一个在选择源操作员的时候过滤掉选择的目标操作员
		var options = {size:'md',keyboard: true,backdrop: true,windowClass: 'my-class'};
		var dlg = dialogs.create('simple/view/permission/html/operator/operatorCopyTemplate.html','copyController',{data: 'topass',anotherVar: 'value'},options);
		dlg.result.then(function(sourceOperator){
			$scope.sourceOperator = [];
			angular.forEach(sourceOperator,function(value,key){
				$scope.sourceOperator[key] = value.EId;
			});
			
			
			function sucessCB(data)
			{			
				alert('添加成功');
				$scope.cancelOperate();
			}
			function errorCB(error)
			{
				$rootScope.openErrorDialog(error);
			}
			OperatorService.copyOperator($scope.sourceOperator,$scope.targetOperator,sucessCB, errorCB);
			console.log($scope.sourceOperator);
			console.log($scope.targetOperator);
		},function(){
			
		});
		
	}
	
	$scope.assignRoles=function(operator){
		$state.go('main.list.operator.assignRoles',{id:operator.EId,name:operator.name});
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
		editColumn.click= $scope.updateOperator;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('operator_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayOperator;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('operator_view'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteOperator;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('operator_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		var assginRoleColumn={};
		assginRoleColumn.click= $scope.assignRoles;
		assginRoleColumn.visiableFunction = function(row){ return $scope.hasPermission('operator_assginRole'); };
		assginRoleColumn.label='分配角色';
		assginRoleColumn.icon = '/image/edit.png';
		$scope.operationColumns.push(assginRoleColumn);
		
		addPermission('operator_edit');
		addPermission('operator_view');
		addPermission('operator_delete');	
		addPermission('operator_assginRole');
		addPermission('operator_add');
	}
	
	init();
}]);	