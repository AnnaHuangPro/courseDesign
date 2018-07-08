angular.module('sendMessageModule', [])
.controller('sendMessageFormController',['$rootScope','$scope','SendMessageService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,SendMessageService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.sendMessage = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findSendMessage();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findSendMessage = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		SendMessageService.findSendMessageById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.sendMessage = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveSendMessage = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addSendMessage($scope.sendMessage,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateSendMessage($scope.sendMessage,isNeedNew);
		}
	}
	
	
	$scope.addSendMessage = function(sendMessage,isNeedNew) {   
		
		if(angularPermission.hasPermission('sendMessage_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			SendMessageService.saveSendMessage(sendMessage,sucessCB,errorCB);
		}
		else {
			dialogs.error("错误","操作: 新增  未被授权，请联系管理人员");
		}
		function sucessCB()	{
			$rootScope.app.asynchroMask.unmask();
			if(isNeedNew){
				$scope.operate='add';
				$scope.create();
			}
			else {
				$scope.refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.sendMessage.sendMessageList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateSendMessage = function(sendMessage,isNeedNew) {
		
		if(angularPermission.hasPermission('sendMessage_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			SendMessageService.updateSendMessage(sendMessage,sucessCB,errorCB);
		}
		else {
			dialogs.error("错误","操作: 编辑  未被授权，请联系管理人员");
		}
		function sucessCB()	{
			$rootScope.app.asynchroMask.unmask();			
			if(isNeedNew) {
				$scope.operate='add';
				$scope.create();
			}
			//处理一些默认值
			else {
				$scope.refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.sendMessage.sendMessageList');
			}			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.cancel = function() {
		$scope.refreshGrid();
		$rootScope.closeOperateTab();
		$state.go('main.list.sendMessage.sendMessageList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('sendMessageListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);