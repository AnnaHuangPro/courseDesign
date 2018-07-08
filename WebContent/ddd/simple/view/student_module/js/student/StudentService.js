
define(["app"], function (app) {
	app.factory("StudentService", function($resource) {
		
		var studentService = $resource("../DD/Student/:action", {});
		studentService.saveStudent=function(student,sucesscb,errorcb)	{
			studentService.save({action:"saveStudent"},{student:student},sucesscb,errorcb);
		};
		
		studentService.deleteStudent=function(studentId,sucesscb,errorcb)	{
			studentService.save({action:"deleteStudent"},{studentId:studentId},sucesscb,errorcb);
		};
		
		studentService.updateStudent=function(student,sucesscb,errorcb) {
			studentService.save({action:"updateStudent"},{student:student},sucesscb,errorcb);
		};
		 
		studentService.findStudentById=function(studentId,sucesscb,errorcb) {
			studentService.get({action:"findStudentById",studentId:studentId},sucesscb,errorcb);
		};
		
		studentService.chooseTask=function(taskId,stuId,sucesscb,errorcb) {
			studentService.save({action:"chooseTask"},{taskId:taskId,stuId:stuId},sucesscb,errorcb);
		};
		
		studentService.findAllStudent=function(sucesscb,errorcb) {
			studentService.query({action:"findAllStudent"},sucesscb,errorcb);
		}
		return studentService;
})});
