
angular.module("operatorCongfigModule",[])
	.factory('OperatorCongfigService',['$resource', function($resource) 
	{
		var operatorCongfigService = $resource('../OperatorCongfig/:action', {});
		operatorCongfigService.saveOperatorCongfig=function(operatorCongfig,sucesscb,errorcb)
		{
			operatorCongfigService.save({action:"saveOperatorCongfig"},{operatorCongfig:operatorCongfig},sucesscb,errorcb);
		};
		
		operatorCongfigService.deleteOperatorCongfig=function(operatorCongfigId,sucesscb,errorcb)
		{
			operatorCongfigService.save({action:"deleteOperatorCongfig"},operatorCongfigId,sucesscb,errorcb);
		};
		
		operatorCongfigService.updateOperatorCongfig=function(operatorCongfig,sucesscb,errorcb)
		{
			operatorCongfigService.save({action:"updateOperatorCongfig"},operatorCongfig,sucesscb,errorcb);
		};
		 
		operatorCongfigService.findOperatorCongfigById=function(operatorCongfigId,sucesscb,errorcb)
		{
			operatorCongfigService.get({action:"findOperatorCongfigById",operatorCongfigId:operatorCongfigId},sucesscb,errorcb);
		};
		
		operatorCongfigService.findAllOperatorCongfig=function(sucesscb,errorcb)
		{
			operatorCongfigService.query({action:"findAllOperatorCongfig"},sucesscb,errorcb);
		}
		//传参数
		operatorCongfigService.findOneOperatorCongfig=function(uniqueInfo,sucesscb,errorcb)
		{
			operatorCongfigService.get({action:"findOneOperatorCongfig",uniqueInfo:uniqueInfo},sucesscb,errorcb);
		}
		operatorCongfigService.uniformView=function(operatorCongfig,sucesscb,errorcb){
			operatorCongfigService.save({action:"uniformView"},{operatorCongfig:operatorCongfig},sucesscb,errorcb);
		}
		return operatorCongfigService;
}]);