angular.module('codeTableModule', [])
.controller('codeTableListController',['$rootScope','$scope','$state','$stateParams','angularPermission','CodeTableService','dialogs','ImportService',
function($rootScope,$scope,$state,$stateParams,angularPermission,CodeTableService,dialogs,ImportService){
	
	$scope.import=function(){
		ImportService.import("CodeTable","codeTableListGrid");
	}
	
	$scope.addCodeTable = function(codeTable)
	{
		$state.go('main.list.codeTable.codeTableAddForm',{operate:'add'});
	}	
	$scope.deleteCodeTable = function(codeTable)
	{
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
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
			CodeTableService.deleteCodeTable({codeTableId:codeTable.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	}	
	$scope.hasAddPermission = function(){
		return angularPermission.hagPermission('codeTable_add');
	}
	$scope.updateCodeTable = function(codeTable)
	{
		$state.go('main.list.codeTable.codeTableEditForm',{operate:'edit',id:codeTable.EId});
	}
	$scope.displayCodeTable = function(codeTable)
	{
		$state.go('main.list.codeTable.codeTableDisplay',{id:codeTable.EId});
	}
	$scope.refreshGrid = function(){
		$scope.refreshGrid("codeTableListGrid");
	}	
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateCodeTable;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'codeTable_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayCodeTable;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'codeTable_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteCodeTable;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'codeTable_delete';
	$scope.operationColumns.push(deleteColumn);
	
	$scope.codeTableList = {"dataSourceId":21,"displayAttributes":[{"attributeName":"EId","attributeValue":"EId","columnIndex":0,"cssArrtribute":"width:100,text-align:'left'","eId":278,"initialized":true,"lazyFieidsLoaded":{},"newEntity":false,"reportView":{"$ref":"$"},"showType":"\u6587\u672C"},{"attributeName":"code","attributeValue":"\u7F16\u7801","columnIndex":1,"cssArrtribute":"width:100,text-align:'left'","eId":279,"initialized":true,"lazyFieidsLoaded":{},"newEntity":false,"reportView":{"$ref":"$"},"showType":"\u6587\u672C"},{"attributeName":"name","attributeValue":"\u540D\u79F0","columnIndex":2,"cssArrtribute":"width:100,text-align:'left'","eId":280,"initialized":true,"lazyFieidsLoaded":{},"newEntity":false,"reportView":{"$ref":"$"},"showType":"\u6587\u672C"}],"eId":17,"finalSql":"select EId EId , code code , name name from (CquqBaseSQL)dt0","initialized":true,"lazyFieidsLoaded":{"displayAttributes":true,"orderConditions":true,"searchConditions":true,"viewTreeConditions":true},"newEntity":false,"orderConditions":[],"reportViewKey":"codeTableList","reportViewName":"\u7801\u8868\u7BA1\u7406","searchConditions":[],"viewTreeConditions":[]};
}]);	