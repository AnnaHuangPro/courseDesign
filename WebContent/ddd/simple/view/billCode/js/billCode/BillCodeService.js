
define(["app"], function (app) 
{
	app.factory("BillCodeService",["$resource", function($resource) 
	{
		var billCodeService = $resource("../BillCode/:action", {});
		billCodeService.saveBillCode=function(billCode,sucesscb,errorcb)
		{
			billCodeService.save({action:"saveBillCode"},billCode,sucesscb,errorcb);
		};
		
		billCodeService.deleteBillCode=function(billCodeId,sucesscb,errorcb)
		{
			billCodeService.save({action:"deleteBillCode"},billCodeId,sucesscb,errorcb);
		};
		
		billCodeService.updateBillCode=function(billCode,sucesscb,errorcb)
		{
			billCodeService.save({action:"updateBillCode"},billCode,sucesscb,errorcb);
		};
		 
		billCodeService.findBillCodeById=function(billCodeId,sucesscb,errorcb)
		{
			billCodeService.get({action:"findBillCodeById",billCodeId:billCodeId},sucesscb,errorcb);
		};
		
		billCodeService.findAllBillCode=function(sucesscb,errorcb)
		{
			billCodeService.query({action:"findAllBillCode"},sucesscb,errorcb);
		};
		
		billCodeService.genNewBillCode=function(billCodeTypeName,variables,sucesscb,errorcb)
		{
			billCodeService.save({action:"genNewBillCode"},{billCodeTypeName:billCodeTypeName,variables:variables},sucesscb,errorcb);
		};
		
		billCodeService.genNewBillCodeByTypeName=function(billCodeTypeName,sucesscb,errorcb)
		{
			billCodeService.save({action:"genNewBillCodeByTypeName"},{billCodeTypeName:billCodeTypeName},sucesscb,errorcb);
		};
		return billCodeService;
}])});
