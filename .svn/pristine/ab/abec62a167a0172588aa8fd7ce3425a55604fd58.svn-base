
define(["app"], function (app) 
{
	app.factory("ScheduleTaskService", function($resource) 
	{
		var scheduleTaskService = $resource("../ScheduleTask/:action", {});
		scheduleTaskService.saveScheduleTask=function(scheduleTask,sucesscb,errorcb)
		{
			scheduleTaskService.save({action:"saveScheduleTask"},scheduleTask,sucesscb,errorcb);
		};
		
		scheduleTaskService.deleteScheduleTask=function(scheduleTaskId,sucesscb,errorcb)
		{
			scheduleTaskService.save({action:"deleteScheduleTask"},scheduleTaskId,sucesscb,errorcb);
		};
		
		scheduleTaskService.updateScheduleTask=function(scheduleTask,sucesscb,errorcb)
		{
			scheduleTaskService.save({action:"updateScheduleTask"},scheduleTask,sucesscb,errorcb);
		};
		 
		scheduleTaskService.findScheduleTaskById=function(scheduleTaskId,sucesscb,errorcb)
		{
			scheduleTaskService.get({action:"findScheduleTaskById",scheduleTaskId:scheduleTaskId},sucesscb,errorcb);
		};
		
		scheduleTaskService.findAllScheduleTask=function(sucesscb,errorcb)
		{
			scheduleTaskService.query({action:"findAllScheduleTask"},sucesscb,errorcb);
		}
		return scheduleTaskService;
})});
