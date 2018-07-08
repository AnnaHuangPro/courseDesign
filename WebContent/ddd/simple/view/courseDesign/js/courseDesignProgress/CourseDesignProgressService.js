
define(["app"], function (app) {
	app.factory("CourseDesignProgressService", function($resource) {
		
		var courseDesignProgressService = $resource("../DD/CourseDesignProgress/:action", {});
		courseDesignProgressService.saveCourseDesignProgress=function(courseDesignProgress,sucesscb,errorcb)	{
			courseDesignProgressService.save({action:"saveCourseDesignProgress"},{courseDesignProgress:courseDesignProgress},sucesscb,errorcb);
		};
		
		courseDesignProgressService.deleteCourseDesignProgress=function(courseDesignProgressId,sucesscb,errorcb)	{
			courseDesignProgressService.save({action:"deleteCourseDesignProgress"},{courseDesignProgressId:courseDesignProgressId},sucesscb,errorcb);
		};
		
		courseDesignProgressService.updateCourseDesignProgress=function(courseDesignProgress,sucesscb,errorcb) {
			courseDesignProgressService.save({action:"updateCourseDesignProgress"},{courseDesignProgress:courseDesignProgress},sucesscb,errorcb);
		};
		 
		courseDesignProgressService.findCourseDesignProgressById=function(courseDesignProgressId,sucesscb,errorcb) {
			courseDesignProgressService.get({action:"findCourseDesignProgressById",courseDesignProgressId:courseDesignProgressId},sucesscb,errorcb);
		};
		
		courseDesignProgressService.findStage=function(progressStage,courseId,teaId,sucesscb,errorcb){
			courseDesignProgressService.get({action:"findStage",progressStage:progressStage,courseId:courseId,teaId:teaId},sucesscb,errorcb);
		};
		
		courseDesignProgressService.findCourseProgressByCourseIdAndTeaEId=function(courseId,teaId,sucesscb,errorcb) {
			courseDesignProgressService.query({action:"findCourseProgressByCourseIdAndTeaEId",courseId:courseId,teaId:teaId},sucesscb,errorcb);
		};
		
		courseDesignProgressService.findAllCourseDesignProgress=function(sucesscb,errorcb) {
			courseDesignProgressService.query({action:"findAllCourseDesignProgress"},sucesscb,errorcb);
		};
		return courseDesignProgressService;
})});
