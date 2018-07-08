	var viewTreeModule = angular.module("viewTreeService",[]);
	viewTreeModule.factory('ViewTreeService', function($resource) 
	{
		var viewTreeService = $resource('../ViewTree/:action', {});

		viewTreeService.saveViewTree = function(viewTree,sucesscb, errorcb) {
			viewTreeService.save({action : "saveViewTree"},{viewTree:viewTree}, sucesscb, errorcb);
		};
		
		viewTreeService.deleteViewTree=function(viewTreeId,sucesscb,errorcb)
		{
			viewTreeService.save({action:"deleteViewTree"},{viewTreeId:viewTreeId},sucesscb,errorcb);
		};
		
		viewTreeService.updateViewTree=function(viewTree,sucesscb,errorcb)
		{
			viewTreeService.save({action:"updateViewTree"},{viewTree:viewTree},sucesscb,errorcb);
		};

		viewTreeService.findViewTreeById = function(viewTreeId,sucesscb, errorcb) {
			viewTreeService.get({action : "findViewTreeById",viewTreeId:viewTreeId}, sucesscb, errorcb);
		};
		
		viewTreeService.findViewTreeByKey = function(viewTreeKey,sucesscb, errorcb) {
			viewTreeService.get({action : "findViewTreeByKey",viewTreeKey:viewTreeKey}, sucesscb, errorcb);
		};
		
		viewTreeService.findDataByViewTreeNodeIndex = function(viewTreeId,node,sucesscb, errorcb) {
			viewTreeService.save({action : "findDataByViewTreeNodeIndex",viewTreeId:viewTreeId},{node:node}, sucesscb, errorcb);
		};
		
		viewTreeService.findDataByViewTreeNodeIndexNew = function(viewTreeId,TreeNodeId,sucesscb, errorcb) {
			viewTreeService.save({action : "findDataByViewTreeNodeIndexNew"},{viewTreeId:viewTreeId,TreeNodeId:TreeNodeId}, sucesscb, errorcb);
		};
		
		
		return viewTreeService;
});