angular.module('billCodeModule', [])
.controller('billCodeFormController',['$rootScope','$scope','BillCodeService','$state','angularPermission','$stateParams',
function($rootScope,$scope,BillCodeService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitBillCodeData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getBillCodeDetail();
		}
	}
	
	$scope.getBillCodeDetail = function()
	{
		BillCodeService.findBillCodeById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.billCode = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveBillCode = function(billCode)
	{
		if($scope.operate=='add')
		{
			$scope.addBillCode(billCode,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateBillCode(billCode);
		}
	}
	
	$scope.saveAndAddBillCode = function(billCode)
	{
		$scope.addBillCode(billCode,false);
	}	
	$scope.addBillCode = function(billCode,needColseTab)
	{   
		BillCodeService.saveBillCode({billCode:billCode},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();
			}
			else
				$scope.billCode=null;
			$scope.refreshGrid();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateBillCode = function(billCode)
	{
		BillCodeService.updateBillCode({billCode:billCode},sucesscb,errorcb);
	
		function sucesscb()
		{
			refreshGrid();
			$scope.back();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('billCodeListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("billCodeListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"billCodeList","main.list.billCode.billCodeList")
	}
}]);