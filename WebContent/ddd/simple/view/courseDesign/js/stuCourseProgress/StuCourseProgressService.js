
define(["app"], function (app) {
	app.factory("StuCourseProgressService", function($resource) {
		
		var stuCourseProgressService = $resource("../DD/StuCourseProgress/:action", {});
		stuCourseProgressService.saveStuCourseProgress=function(stuCourseProgress,sucesscb,errorcb)	{
			stuCourseProgressService.save({action:"saveStuCourseProgress"},{stuCourseProgress:stuCourseProgress},sucesscb,errorcb);
		};
		
		stuCourseProgressService.deleteStuCourseProgress=function(stuCourseProgressId,sucesscb,errorcb)	{
			stuCourseProgressService.save({action:"deleteStuCourseProgress"},{stuCourseProgressId:stuCourseProgressId},sucesscb,errorcb);
		};
		
		stuCourseProgressService.updateStuCourseProgress=function(stuCourseProgress,sucesscb,errorcb) {
			stuCourseProgressService.save({action:"updateStuCourseProgress"},{stuCourseProgress:stuCourseProgress},sucesscb,errorcb);
		};
		 
		stuCourseProgressService.findStuCourseProgressById=function(stuCourseProgressId,sucesscb,errorcb) {
			stuCourseProgressService.get({action:"findStuCourseProgressById",stuCourseProgressId:stuCourseProgressId},sucesscb,errorcb);
		};
		
		stuCourseProgressService.findAllStuCourseProgress=function(sucesscb,errorcb) {
			stuCourseProgressService.query({action:"findAllStuCourseProgress"},sucesscb,errorcb);
		}
		return stuCourseProgressService;
})});
