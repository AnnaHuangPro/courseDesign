angular.module("ListViewApp",[])
.factory('ListViewService',['$resource', function($resource) 
		{
//			var listViewService = $resource('../FacadeServlet?serviceName=ReportViewServiceBean&operatorCode=querySql', {});
			var listViewService = $resource('../ListView/:action', {});
			
			listViewService.findListViewById=function(listViewId,sucesscb,errorcb)
			{
				listViewService.get({action:'findListViewById',listViewId:listViewId},sucesscb,errorcb);
			};
			
			listViewService.findListViewByKey=function(listViewKey,sucesscb,errorcb)
			{
				listViewService.get({action:'findListViewByKey',listViewKey:listViewKey},sucesscb,errorcb);
			};
			 
			listViewService.getResult=function(currentPage,pageSize,listViewKey,filterCondition,params,initFilter,sorting,sucesscb,errorcb)
			{
				listViewService.query({action:'getResult',listViewKey:listViewKey,currentPage:currentPage,pageSize:pageSize,filterCondition:filterCondition,params:params,initFilter:initFilter,sorting:sorting},sucesscb,errorcb);
			};
			
			listViewService.findEntityByKey=function(listViewKey,eIds,sucesscb,errorcb)
			{
				listViewService.save({action:'findEntityByKey'},{listViewKey:listViewKey,eIds:eIds},sucesscb,errorcb);
			};
			
			listViewService.getDataSourceResult=function(dataSourceCode,params,sucesscb,errorcb)
			{
				listViewService.query({action:'getDataSourceResult',dataSourceCode:dataSourceCode,params:params},sucesscb,errorcb);
			};
			
			return listViewService;
		}]);