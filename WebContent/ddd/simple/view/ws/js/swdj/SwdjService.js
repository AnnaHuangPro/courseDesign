
define(["app"], function (app) {
	app.factory("SwdjService", function($resource) {
		
		var swdjService = $resource("../DD/Swdj/:action", {});
		swdjService.saveSwdj=function(swdj,sucesscb,errorcb)	{
			swdjService.save({action:"saveSwdj"},{swdj:swdj},sucesscb,errorcb);
		};
		
		swdjService.deleteSwdj=function(swdjId,sucesscb,errorcb)	{
			swdjService.save({action:"deleteSwdj"},{swdjId:swdjId},sucesscb,errorcb);
		};
		
		swdjService.updateSwdj=function(swdj,sucesscb,errorcb) {
			swdjService.save({action:"updateSwdj"},{swdj:swdj},sucesscb,errorcb);
		};
		 
		swdjService.findSwdjById=function(swdjId,sucesscb,errorcb) {
			swdjService.get({action:"findSwdjById",swdjId:swdjId},sucesscb,errorcb);
		};
		
		swdjService.findAllSwdj=function(sucesscb,errorcb) {
			swdjService.query({action:"findAllSwdj"},sucesscb,errorcb);
		}
		return swdjService;
})});
