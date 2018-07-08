/**
 * @author 龚翔
 */
define(['app'], function (app) 
{
	app.factory('TaskService',['$resource', function($resource) 
	{
		var taskService = $resource('../Workflow/:action', {});
		
		taskService.findNonHandleTaskList=function(startPage,pageSize,sucesscb,errorcb)
		{
			taskService.get({action:"findNonHandleTaskList",startPage:startPage,pageSize:pageSize},sucesscb,errorcb);
		}
		
		taskService.findTaskDetailById = function(taskId,sucesscb,errorcb)
		{
			taskService.get({action:"findTaskDetailById",taskId:taskId},sucesscb,errorcb);
		}
		
		taskService.findCompletedTaskDetailById = function(taskId,sucesscb,errorcb)
		{
			taskService.get({action:"findCompletedTaskDetailById",taskId:taskId},sucesscb,errorcb);
		}
		taskService.findCandidateTaskList=function(sucesscb,errorcb)
		{
			taskService.query({action:"findCandidateTaskList"},sucesscb,errorcb);
		}
		taskService.findOwnerTaskList=function(startPage,pageSize,sucesscb,errorcb)
		{
			taskService.query({action:"findOwnerTaskList",startPage:startPage,pageSize:pageSize},sucesscb,errorcb);
		}
		taskService.findCompletedTaskList=function(startPage,pageSize,sucesscb,errorcb)
		{
			taskService.get({action:"findCompletedTaskList",startPage:startPage,pageSize:pageSize},sucesscb,errorcb);
		}
		taskService.findTaskForm=function(taskId,sucesscb,errorcb)
		{
			taskService.get({action:"findTaskForm",taskId:taskId},sucesscb,errorcb);
		}
		taskService.submitTask = function(taskId,entityVar,dynamicFormResult,taskDetailInfo,sucesscb,errorcb)
		{
			taskService.save({action:"submitTask",taskId:taskId},{entityVar:entityVar,parameterMap:dynamicFormResult,taskDetailInfo:taskDetailInfo},sucesscb,errorcb);
		}
		taskService.testStartProcess=function(sucesscb,errorcb)
		{
			taskService.get({action:"testStartProcess"},sucesscb,errorcb);
		}
		taskService.traceProcess=function(processInstanceId,sucesscb,errorcb)
		{
			taskService.query({action:"traceProcess",processInstanceId:processInstanceId},sucesscb,errorcb);
		}
		taskService.findCheckOptionsByForm=function(formId,formType,sucesscb,errorcb)
		{
			taskService.query({action:"findCheckOptionsByForm",formId:formId,formType:formType},sucesscb,errorcb);
		}
		
		taskService.findOperatedTaskList=function(startPage,pageSize,sucesscb,errorcb)
		{
			taskService.get({action:"findOperatedTaskList",startPage:startPage,pageSize:pageSize},sucesscb,errorcb);
		}
		
		taskService.findOperatedTaskDetailById = function(taskId,sucesscb,errorcb)
		{
			taskService.get({action:"findOperatedTaskDetailById",taskId:taskId},sucesscb,errorcb);
		}
		
		taskService.getWorkflowProcess = function(successcb,errorcb)
		{
			taskService.query({action:"getWorkflowProcess"},successcb,errorcb);
		}
		
		taskService.stopTask = function(taskId,successcb,errorcb)
		{
			taskService.save({action:"stopTask",taskId:taskId},{},successcb,errorcb);
		}
		
		return taskService;
}]
)});
