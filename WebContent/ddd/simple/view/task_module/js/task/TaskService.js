
define(["app"], function (app) {
	app.factory("TaskService", function($resource) {
		
		var taskService = $resource("../DD/Task/:action", {});
		taskService.saveTask=function(task,sucesscb,errorcb)	{
			taskService.save({action:"saveTask"},{task:task},sucesscb,errorcb);
		};
		
		taskService.deleteTask=function(taskId,sucesscb,errorcb)	{
			taskService.save({action:"deleteTask"},{taskId:taskId},sucesscb,errorcb);
		};
		
		taskService.updateTask=function(task,sucesscb,errorcb) {
			taskService.save({action:"updateTask"},{task:task},sucesscb,errorcb);
		};
		 
		taskService.findAllByTeacherId = function(teacherId,courseId,sucesscb,errorcb){
			taskService.get({action:"findAllByTeacherId",teacherId:teacherId,courseId:courseId},sucesscb,errorcb);
		};
		
		taskService.findTaskById=function(taskId,sucesscb,errorcb) {
			taskService.get({action:"findTaskById",taskId:taskId},sucesscb,errorcb);
		};
		
		taskService.findAllTask=function(sucesscb,errorcb) {
			taskService.query({action:"findAllTask"},sucesscb,errorcb);
		}
		return taskService;
})});
