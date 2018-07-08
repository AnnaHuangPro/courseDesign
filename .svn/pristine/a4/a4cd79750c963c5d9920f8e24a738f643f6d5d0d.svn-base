angular.module("headPortraitModule",[])
	.factory("HeadPortraitService", ['$resource',function($resource) {
		
		var headPortraitService = $resource("../HeadPortrait/:action", {});
		headPortraitService.saveHeadPortrait=function(headPortrait,sucesscb,errorcb)	{
			headPortraitService.save({action:"saveHeadPortrait"},{headPortrait:headPortrait},sucesscb,errorcb);
		};
		
		headPortraitService.deleteHeadPortrait=function(headPortraitId,sucesscb,errorcb)	{
			headPortraitService.save({action:"deleteHeadPortrait"},{headPortraitId:headPortraitId},sucesscb,errorcb);
		};
		
		headPortraitService.updateHeadPortrait=function(headPortrait,sucesscb,errorcb) {
			headPortraitService.save({action:"updateHeadPortrait"},{headPortrait:headPortrait},sucesscb,errorcb);
		};
		 
		headPortraitService.findHeadPortraitById=function(headPortraitId,sucesscb,errorcb) {
			headPortraitService.get({action:"findHeadPortraitById",headPortraitId:headPortraitId},sucesscb,errorcb);
		};
		
		headPortraitService.findAllHeadPortrait=function(sucesscb,errorcb) {
			headPortraitService.query({action:"findAllHeadPortrait"},sucesscb,errorcb);
		}
		headPortraitService.findLogoUrl=function(employeeId,sucesscb,errorcb) {
			headPortraitService.get({action:"findLogoUrl",employeeId:employeeId},sucesscb,errorcb);
		}
		return headPortraitService;
	}]);
