angular.module("operatorModule",[])
.controller("assignRoleController",['$state','$scope','$stateParams','$rootScope','OrganizationService','RoleService','OperatorService','$state','angularPermission',function($state,$scope,$stateParams,$rootScope,OrganizationService,RoleService,OperatorService,$state,angularPermission){
	$scope.OrganizationTree = [];
	$scope.selectViewTreeKey = "organizationTree";
	$scope.currentNode = {};
	$scope.lastNode = {};
	$scope.showRoles = [];
	$scope.operatorId = $stateParams.id;
	$scope.operator = $stateParams.name;
	
	$scope.$on("treeSelect",function(event,data){
		$scope.nodeChange(data);
	});
	$scope.selectAll = function(){
		var showRoles = $scope.showRoles;
		for(var i = 0;i<showRoles.length;i++){
			showRoles[i].isAssigned = true;
		}
	}
	$scope.clearAll = function(){
		var showRoles = $scope.showRoles;
		for(var i = 0;i<showRoles.length;i++){
			showRoles[i].isAssigned = false;
		}
	}
	
	$scope.saveCurrentChange = function(isShowAlert){
		var assignedRoles = [];
		var roles = $scope.showRoles;
		
		for(var i = 0 ; i < roles.length; i ++)
		{
			if(roles[i].isAssigned == true)
			{
				assignedRoles.push(roles[i]);
			}
		}
		
		function successFn(){
			if(isShowAlert){
				alert("分配成功!");
				$rootScope.closeOperateTab();
				$state.go('main.list.operator.operatorList');
			}
		}
		
		function errorFn(error){
			alert(error.cause.message);
		}
		
		return OperatorService.distributionRole($stateParams.id,assignedRoles,$scope.currentNode.EId).then(successFn,errorFn);
	}
	
	$scope.nodeChange = function(node)
	{
		if(!angular.isDefined($scope.lastNode.EId)){
			$scope.saveCurrentChange(false).then($scope.refresh(node));
		}
		else
			$scope.refresh(node);
	}
	
	$scope.refresh = function(node){
		
		function successFn(data){
			$scope.showRoles = data;
		}
		
		function errorFn(error){
			alert(error.cause.message);
		}
		
		$scope.currentNode = node;
		$scope.lastNode = node;
		if($scope.currentNode.nodeIndex > 0){
			RoleService.findShowRoles($scope.operatorId,$scope.currentNode.orgEId,successFn, errorFn);
		}
	}
}]);