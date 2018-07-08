
define(["app"], function (app) {
	app.factory("MajorService", function($resource) {
		
		var majorService = $resource("../DD/Major/:action", {});
		majorService.saveMajor=function(major,sucesscb,errorcb)	{
			majorService.save({action:"saveMajor"},{major:major},sucesscb,errorcb);
		};
		
		majorService.deleteMajor=function(majorId,sucesscb,errorcb)	{
			majorService.save({action:"deleteMajor"},{majorId:majorId},sucesscb,errorcb);
		};
		
		majorService.updateMajor=function(major,sucesscb,errorcb) {
			majorService.save({action:"updateMajor"},{major:major},sucesscb,errorcb);
		};
		 
		majorService.findMajorById=function(majorId,sucesscb,errorcb) {
			majorService.get({action:"findMajorById",majorId:majorId},sucesscb,errorcb);
		};
		
		majorService.findAllMajor=function(sucesscb,errorcb) {
			majorService.query({action:"findAllMajor"},sucesscb,errorcb);
		}
		return majorService;
})});
