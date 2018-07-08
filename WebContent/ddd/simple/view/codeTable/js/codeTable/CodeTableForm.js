angular.module('codeTableModule', [])
.controller('codeTableFormController',['$rootScope','$scope','CodeTableService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,CodeTableService,$state,angularPermission,$stateParams,dialogs){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitCodeTableData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getCodeTableDetail();
		}
	}	
	
	$scope.getCodeTableDetail = function()
	{
		CodeTableService.findCodeTableById($scope.id,sucessCB,errorCB);

		function sucessCB(data)
		{
			$scope.codeTable = data;
		};

		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveCodeTable = function(codeTable)
	{
		if($scope.operate=='add')
		{
			$scope.addCodeTable(codeTable,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateCodeTable(codeTable);
		}
	}
	
	$scope.saveAndAddCodeTable = function(codeTable)
	{
		$scope.addCodeTable(codeTable,false);
	}	
	$scope.addCodeTable = function(codeTable,needColseTab)
	{   
		CodeTableService.saveCodeTable({codeTable:codeTable},sucessCB,errorCB);

		function sucessCB()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();
			}
			else{
				// 保存并新增
				$scope.codeTable={};
			}							
		}
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateCodeTable = function(codeTable)
	{
		CodeTableService.updateCodeTable({codeTable:codeTable},sucessCB,errorCB);
	
		function sucessCB()
		{
			refreshGrid();
			$scope.back();		
		}
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
	};
	
	function refreshGrid(){
		$scope.refreshGrid("codeTableListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"codeTableList","main.list.codeTable.codeTableList")
	}
}]);