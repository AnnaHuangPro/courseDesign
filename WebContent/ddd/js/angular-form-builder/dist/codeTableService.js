angular.module('codeTableApp',[])
	.factory('CodeTableService', ['$resource',function($resource) 
	{
		var codeTableService = $resource('../CodeTable/:action', {});
		codeTableService.saveCodeTable=function(codeTable,sucesscb,errorcb)
		{
			codeTableService.save({action:"saveCodeTable"},codeTable,sucesscb,errorcb);
		};
		
		codeTableService.deleteCodeTable=function(codeTableId,sucesscb,errorcb)
		{
			codeTableService.save({action:"deleteCodeTable"},codeTableId,sucesscb,errorcb);
		};
		
		codeTableService.updateCodeTable=function(codeTable,sucesscb,errorcb)
		{
			codeTableService.save({action:"updateCodeTable"},codeTable,sucesscb,errorcb);
		};
		 
		codeTableService.findCodeTableById=function(codeTableId,sucesscb,errorcb)
		{
			codeTableService.get({action:"findCodeTableById",codeTableId:codeTableId},sucesscb,errorcb);
		};
		
		codeTableService.findAllCodeTable=function(sucesscb,errorcb)
		{
			codeTableService.query({action:"findAllCodeTable"},sucesscb,errorcb);
		};
		codeTableService.findCodeTablesByKey=function(codeTypeKey,sucesscb,errorcb)
		{
			codeTableService.query({action:"findCodeTablesByKey",codeTypeKey:codeTypeKey},sucesscb,errorcb);
		}
		return codeTableService;
}]);
