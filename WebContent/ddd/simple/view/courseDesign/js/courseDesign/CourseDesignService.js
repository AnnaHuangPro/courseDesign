
define(["app"], function (app) {
	app.factory("CourseDesignService", function($resource) {
		
		var courseDesignService = $resource("../DD/CourseDesign/:action", {});
		courseDesignService.saveCourseDesign=function(courseDesign,sucesscb,errorcb)	{
			courseDesignService.save({action:"saveCourseDesign"},{courseDesign:courseDesign},sucesscb,errorcb);
		};
		
		courseDesignService.deleteCourseDesign=function(courseDesignId,sucesscb,errorcb)	{
			courseDesignService.save({action:"deleteCourseDesign"},{courseDesignId:courseDesignId},sucesscb,errorcb);
		};
		
		courseDesignService.updateCourseDesign=function(courseDesign,sucesscb,errorcb) {
			courseDesignService.save({action:"updateCourseDesign"},{courseDesign:courseDesign},sucesscb,errorcb);
		};
		 
		courseDesignService.findCourseDesignById=function(courseDesignId,sucesscb,errorcb) {
			courseDesignService.get({action:"findCourseDesignById",courseDesignId:courseDesignId},sucesscb,errorcb);
		};
		
		courseDesignService.findCourseDesignByMajorAndSestem=function(stuMajor,currentSemester,sucesscb,errorcb) {
			courseDesignService.query({action:"findCourseDesignByMajorAndSestem",stuMajor:stuMajor,currentSemester:currentSemester},sucesscb,errorcb);
		};
		
		courseDesignService.findAllCourseDesign=function(sucesscb,errorcb) {
			courseDesignService.query({action:"findAllCourseDesign"},sucesscb,errorcb);
		}
		return courseDesignService;
})});
