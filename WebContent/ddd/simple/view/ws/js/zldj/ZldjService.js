
define(["app"], function (app) {
	app.factory("ZldjService", function($resource) {
		
		var zldjService = $resource("../DD/Zldj/:action", {});
		zldjService.saveZldj=function(zldj,sucesscb,errorcb)	{
			zldjService.save({action:"saveZldj"},{zldj:zldj},sucesscb,errorcb);
		};
		
		zldjService.deleteZldj=function(zldjId,sucesscb,errorcb)	{
			zldjService.save({action:"deleteZldj"},{zldjId:zldjId},sucesscb,errorcb);
		};
		
		zldjService.updateZldj=function(zldj,sucesscb,errorcb) {
			zldjService.save({action:"updateZldj"},{zldj:zldj},sucesscb,errorcb);
		};
		 
		zldjService.findZldjById=function(zldjId,sucesscb,errorcb) {
			zldjService.get({action:"findZldjById",zldjId:zldjId},sucesscb,errorcb);
		};
		
		zldjService.findAllZldj=function(sucesscb,errorcb) {
			zldjService.query({action:"findAllZldj"},sucesscb,errorcb);
		}
		return zldjService;
})});
