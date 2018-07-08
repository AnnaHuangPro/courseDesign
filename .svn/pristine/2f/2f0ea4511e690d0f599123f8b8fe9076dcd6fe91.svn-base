
define(['app'], function (app) 
{
	app.factory('CodeTypeService', function($resource) 
	{
		var codeTypeService = $resource('../CodeType/:action', {});
		codeTypeService.saveCodeType=function(codeType,sucesscb,errorcb)
		{
			codeTypeService.save({action:"saveCodeType"},codeType,sucesscb,errorcb);
		};
		
		codeTypeService.deleteCodeType=function(codeTypeId,sucesscb,errorcb)
		{
			codeTypeService.save({action:"deleteCodeType"},{codeTypeId:codeTypeId},sucesscb,errorcb);
		};
		
		codeTypeService.updateCodeType=function(codeType,sucesscb,errorcb)
		{
			codeTypeService.save({action:"updateCodeType"},codeType,sucesscb,errorcb);
		};
		 
		codeTypeService.findCodeTypeById=function(codeTypeId,sucesscb,errorcb)
		{
			codeTypeService.get({action:"findCodeTypeById",codeTypeId:codeTypeId},sucesscb,errorcb);
		};
		
		codeTypeService.findAllCodeType=function(sucesscb,errorcb)
		{
			codeTypeService.query({action:"findAllCodeType"},sucesscb,errorcb);
		}
		return codeTypeService;
})});
