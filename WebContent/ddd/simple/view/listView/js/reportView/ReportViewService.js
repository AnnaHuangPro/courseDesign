angular.module("reportViewModule",[])

.factory('ReportviewService',['$resource',function($resource)
		{
			var reportviewService = $resource('../ReportView/:action',{});
			
			reportviewService.getReportViewInitData=function(dataSourceId,sucesscb,errorcb)
			{
				reportviewService.save({action:'getReportViewInitData'},{dataSourceId:dataSourceId},sucesscb,errorcb);
			}
			
			reportviewService.findReportViewById=function(reportViewId,sucesscb,errorcb)
			{
				reportviewService.save({action:'findReportViewById'},{reportViewId:reportViewId},sucesscb,errorcb);
			}
			
			reportviewService.addReportView = function(reportView,sucesscb,errorcb)
			{
				reportviewService.save({action:'addReportView'},{reportView:reportView},sucesscb,errorcb);
			}
			
			reportviewService.updateReportView = function(reportView,sucesscb,errorcb)
			{
				reportviewService.save({action:'updateReportView'},{reportView:reportView},sucesscb,errorcb);
			}
			
			reportviewService.deleteReportView = function(reportViewId,sucesscb,errorcb)
			{
				reportviewService.save({action:'deleteReportView'},{reportViewId:reportViewId},sucesscb,errorcb);
			}

            reportviewService.copyReportView=function(reportViewId,reportViewKey,sucesscb,errorcb)
            {
                reportviewService.save({action:'copyReportView'},{reportViewId:reportViewId,reportViewKey:reportViewKey},sucesscb,errorcb);
            }
			
			return reportviewService;
		}])
