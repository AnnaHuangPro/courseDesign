angular.module('sendMessageModule', [])
.controller('sendMessageDisplayController',['$rootScope','$scope','$stateParams','SendMessageService','$state',
function($rootScope,$scope,$stateParams,SendMessageService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.sendMessage = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		SendMessageService.findSendMessageById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);