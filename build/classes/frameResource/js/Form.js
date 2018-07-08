#set($EntityNameUp="${entityClass.className}")
#set($EntityNameLow="${entityClass.className.substring(0,1).toLowerCase()}${entityClass.className.substring(1)}")
#set($extension=".js")
#set($fileName="${EntityNameUp}Form")
#set($index = ${entityClass.packageName.lastIndexOf(".")} + 1)
#set($simplePackage=${entityClass.packageName.substring($index)})
#set($outputFile="${htmlAndjsCodeGenPath}${simplePackage}/js/${EntityNameLow}/${fileName}${extension}")
#set($daole="$")
angular.module('${EntityNameLow}Module', [])
.controller('${EntityNameLow}FormController',['$rootScope','$scope','${EntityNameUp}Service','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,${EntityNameUp}Service,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.${EntityNameLow} = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			${daole}scope.find${EntityNameUp}();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.find${EntityNameUp} = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		${EntityNameUp}Service.find${EntityNameUp}ById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.${EntityNameLow} = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.save${EntityNameUp} = function(isNeedNew) {
		if($scope.operate=='add') {
			${daole}scope.add${EntityNameUp}(${daole}scope.${EntityNameLow},isNeedNew);
		}
		else if($scope.operate=='edit')	{
			${daole}scope.update${EntityNameUp}(${daole}scope.${EntityNameLow},isNeedNew);
		}
	}
	
	
	$scope.add${EntityNameUp} = function(${EntityNameLow},isNeedNew) {   
		
		if(angularPermission.hasPermission('${EntityNameLow}_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			${EntityNameUp}Service.save${EntityNameUp}(${EntityNameLow},sucessCB,errorCB);
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
				${daole}state.go('main.list.${EntityNameLow}.${EntityNameLow}List');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.update${EntityNameUp} = function(${EntityNameLow},isNeedNew) {
		
		if(angularPermission.hasPermission('${EntityNameLow}_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			${EntityNameUp}Service.update${EntityNameUp}(${EntityNameLow},sucessCB,errorCB);
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
				${daole}state.go('main.list.${EntityNameLow}.${EntityNameLow}List');
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
		${daole}state.go('main.list.${EntityNameLow}.${EntityNameLow}List');
	}
	
	$scope.refreshGrid = function() {
		var controller = ${daole}rootScope.getController('${EntityNameLow}ListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);