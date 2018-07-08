
define(["app"], function (app) {
	app.factory("TeacherService", function($resource) {
		
		var teacherService = $resource("../DD/Teacher/:action", {});
		teacherService.saveTeacher=function(teacher,sucesscb,errorcb)	{
			teacherService.save({action:"saveTeacher"},{teacher:teacher},sucesscb,errorcb);
		};
		
		teacherService.deleteTeacher=function(teacherId,sucesscb,errorcb)	{
			teacherService.save({action:"deleteTeacher"},{teacherId:teacherId},sucesscb,errorcb);
		};
		
		teacherService.updateTeacher=function(teacher,sucesscb,errorcb) {
			teacherService.save({action:"updateTeacher"},{teacher:teacher},sucesscb,errorcb);
		};
		 
		teacherService.findTeacherById=function(teacherId,sucesscb,errorcb) {
			teacherService.get({action:"findTeacherById",teacherId:teacherId},sucesscb,errorcb);
		};
		
		teacherService.findAllTeacher=function(sucesscb,errorcb) {
			teacherService.query({action:"findAllTeacher"},sucesscb,errorcb);
		}
		return teacherService;
})});
