
define(['app'], function (app) 
{
	app.factory('ReportFormService', function($resource) 
	{
		var reportFormService = $resource('../ReportForm/:action', {});
		reportFormService.saveReportForm=function(reportForm,sucesscb,errorcb)
		{
			reportFormService.save({action:"saveReportForm"},reportForm,sucesscb,errorcb);
		};
		
		reportFormService.deleteReportForm=function(reportFormId,sucesscb,errorcb)
		{
			reportFormService.save({action:"deleteReportForm"},reportFormId,sucesscb,errorcb);
		};
		
		reportFormService.updateReportForm=function(reportForm,sucesscb,errorcb)
		{
			reportFormService.save({action:"updateReportForm"},reportForm,sucesscb,errorcb);
		};
		 
		reportFormService.findReportFormById=function(reportFormId,sucesscb,errorcb)
		{
			reportFormService.get({action:"findReportFormById",reportFormId:reportFormId},sucesscb,errorcb);
		};
		
		reportFormService.findAllReportForm=function(sucesscb,errorcb)
		{
			reportFormService.query({action:"findAllReportForm"},sucesscb,errorcb);
		}
		
		
		reportFormService.getReportFormQueryData=function(modelFileKey,params,sucesscb,errorcb)
		{
			reportFormService.save({action:"getReportFormQueryData"},{modelFileKey:modelFileKey,params:params},sucesscb,errorcb);
		}
		return reportFormService;
})});
