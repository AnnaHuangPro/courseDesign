
define(["app"], function (app) 
{
	app.factory("TaskManageService", function($resource) 
	{
		var taskManageService = $resource("../TaskManage/:action", {});
		taskManageService.saveTaskManage=function(taskManage,sucesscb,errorcb)
		{
			taskManageService.save({action:"saveTaskManage"},taskManage,sucesscb,errorcb);
		};
		
		taskManageService.deleteTaskManage=function(taskManageId,sucesscb,errorcb)
		{
			taskManageService.save({action:"deleteTaskManage"},taskManageId,sucesscb,errorcb);
		};
		
		taskManageService.updateTaskManage=function(taskManage,sucesscb,errorcb)
		{
			taskManageService.save({action:"updateTaskManage"},taskManage,sucesscb,errorcb);
		};
		 
		taskManageService.findTaskManageById=function(taskManageId,sucesscb,errorcb)
		{
			taskManageService.get({action:"findTaskManageById",taskManageId:taskManageId},sucesscb,errorcb);
		};
		
		taskManageService.findAllTaskManage=function(sucesscb,errorcb)
		{
			return taskManageService.query({action:"findAllTaskManage"},sucesscb,errorcb);
		}
		
		taskManageService.findAllTaskUnDealed=function(sucesscb,errorcb)
		{
			return taskManageService.query({action:"findAllTaskUnDealed"},sucesscb,errorcb);
		}
		
		return taskManageService;
})});
