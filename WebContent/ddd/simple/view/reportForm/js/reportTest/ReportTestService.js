
define(["app"], function (app) 
{
	app.factory("ReportTestService", function($resource) 
	{
		var reportTestService = $resource("../ReportTest/:action", {});
		reportTestService.saveReportTest=function(reportTest,sucesscb,errorcb)
		{
			reportTestService.save({action:"saveReportTest"},reportTest,sucesscb,errorcb);
		};
		
		reportTestService.deleteReportTest=function(reportTestId,sucesscb,errorcb)
		{
			reportTestService.save({action:"deleteReportTest"},reportTestId,sucesscb,errorcb);
		};
		
		reportTestService.updateReportTest=function(reportTest,sucesscb,errorcb)
		{
			reportTestService.save({action:"updateReportTest"},reportTest,sucesscb,errorcb);
		};
		 
		reportTestService.findReportTestById=function(reportTestId,sucesscb,errorcb)
		{
			reportTestService.get({action:"findReportTestById",reportTestId:reportTestId},sucesscb,errorcb);
		};
		
		reportTestService.findAllReportTest=function(sucesscb,errorcb)
		{
			reportTestService.query({action:"findAllReportTest"},sucesscb,errorcb);
		}
		return reportTestService;
})});
