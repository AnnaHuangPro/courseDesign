angular.module('logModule', [])
.controller('logFormController',['$rootScope','$scope','LogService','$state','angularPermission','$stateParams',
function($rootScope,$scope,LogService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitLogData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getLogDetail();
		}
	}
	
	$scope.getLogDetail = function()
	{
		LogService.findLogById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.log = data;
		};

		function errorcb(data)
		{
			dialogs.error('加载失败');
		};
	};
	
	$scope.saveLog = function(log)
	{
		if($scope.operate=='add')
		{
			$scope.addLog(log,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateLog(log);
		}
	}
	
	$scope.saveAndAddLog = function(log)
	{
		$scope.addLog(log,false);
	}	
	$scope.addLog = function(log,needColseTab)
	{   
		LogService.saveLog({log:log},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();	
			}
			else
				$scope.log=null;
		}
		function errorcb()
		{
			dialogs.error('添加失败!');
		}
	}
	$scope.updateLog = function(log)
	{
		LogService.updateLog({log:log},sucesscb,errorcb);
	
		function sucesscb()
		{
			refreshGrid();
			$scope.back();	
		}
		function errorcb()
		{
			dialogs.error('修改失败!');
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('logListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("logListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"logList","main.list.log.logList")
	}
}]);