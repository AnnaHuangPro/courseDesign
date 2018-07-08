angular.module("ListViewApp",[])
.factory('DataSourceService',['$resource', function($resource) 
		{
			var dataSourceService = $resource('../DataSource/:action', {});
	
			dataSourceService.deleteDataSource = function(dataSourceId,sucesscb,errorcb)
			{
				dataSourceService.save({action:'deleteDataSource'},{dataSourceId:dataSourceId},sucesscb,errorcb);
			}
	
			dataSourceService.saveDataSource = function(dataSource,sucesscb,errorcb)
			{
				dataSourceService.save({action:'saveDataSource'},{dataSource:dataSource},sucesscb,errorcb);
			}
			
			dataSourceService.updateDataSource=function(dataSource,sucesscb,errorcb)
			{
				dataSourceService.save({action:'updateDataSource'},{dataSource:dataSource},sucesscb,errorcb);
			}
			
			dataSourceService.findDataSourceById = function(dataSourceId,sucesscb,errorcb)
			{
				dataSourceService.save({action:'findDataSourceById'},{dataSourceId:dataSourceId},sucesscb,errorcb);
			}
			
			dataSourceService.checkReportSql = function(checkSql,params,sucesscb,errorcb)
			{
				dataSourceService.save({action:'checkReportSql'},{checkSql:checkSql,params:params},sucesscb,errorcb);
			}
			dataSourceService.copyDataSource = function(dataSourceId,dataSourceCode,sucesscb,errorcb)
			{
				dataSourceService.save({action:'copyDataSource'},{dataSourceId:dataSourceId,dataSourceCode:dataSourceCode},sucesscb,errorcb);
			}
			dataSourceService.analysisParams = function(dataSourceKey,sucesscb,errorcb)
			{
				dataSourceService.save({action:'analysisParams'},{dataSourceKey:dataSourceKey},sucesscb,errorcb);
			}
			return dataSourceService;
		}]);