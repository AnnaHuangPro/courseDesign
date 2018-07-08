angular.module('reportTestModule', [])
.controller('reportTestFormController',['$rootScope','$scope','ReportTestService','$state','angularPermission','$stateParams',
function($rootScope,$scope,ReportTestService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitReportTestData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getReportTestDetail();
		}
	}
	
	$scope.getReportTestDetail = function()
	{
		ReportTestService.findReportTestById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.reportTest = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveReportTest = function(reportTest)
	{
		if ($scope.reportTestForm.$valid) {
			if($scope.operate=='add')
			{
				$scope.addReportTest(reportTest,true);
			}
			else if($scope.operate=='edit')
			{
				$scope.updateReportTest(reportTest);
			}
		}
		else {
			$scope.reportTestForm.submitted = true;
		}
	}
	
	$scope.saveAndAddReportTest = function(reportTest)
	{
		$scope.addReportTest(reportTest,false);
	}	
	$scope.addReportTest = function(reportTest,needColseTab)
	{   
		ReportTestService.saveReportTest({reportTest:reportTest},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				$rootScope.closeOperateTab();
				$state.go('main.list.reportTest.reportTestListRoute');
			}
			else
				$scope.reportTest=null;
			$scope.refreshGrid();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateReportTest = function(reportTest)
	{
		ReportTestService.updateReportTest({reportTest:reportTest},sucesscb,errorcb);
	
		function sucesscb()
		{
			$rootScope.closeOperateTab();
			$state.go('main.list.reportTest.reportTestListRoute');
			$scope.refreshGrid();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.refreshGrid = function(){
		var controller = $rootScope.getController('reportTestListGrid' , 'ddatagrid');
		if(controller){
			controller.refreshCurrent();
		}
	}
}]);