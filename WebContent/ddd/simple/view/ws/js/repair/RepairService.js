
define(["app"], function (app) {
	app.factory("RepairService", function($resource) {
		
		var repairService = $resource("../DD/Repair/:action", {});
		repairService.saveRepair=function(repair,sucesscb,errorcb)	{
			repairService.save({action:"saveRepair"},{repair:repair},sucesscb,errorcb);
		};
		
		repairService.deleteRepair=function(repairId,sucesscb,errorcb)	{
			repairService.save({action:"deleteRepair"},{repairId:repairId},sucesscb,errorcb);
		};
		
		repairService.updateRepair=function(repair,sucesscb,errorcb) {
			repairService.save({action:"updateRepair"},{repair:repair},sucesscb,errorcb);
		};
		 
		repairService.findRepairById=function(repairId,sucesscb,errorcb) {
			repairService.get({action:"findRepairById",repairId:repairId},sucesscb,errorcb);
		};
		
		repairService.findAllRepair=function(sucesscb,errorcb) {
			repairService.query({action:"findAllRepair"},sucesscb,errorcb);
		}
		return repairService;
})});
