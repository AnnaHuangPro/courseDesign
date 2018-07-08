angular.module("operatorModule",[])

.factory('OperatorService',['$resource', function($resource)
{
	var operatorService = $resource('../Operator/:action', {});

	operatorService.saveOperator = function(operator,sucesscb, errorcb)
	{
		operatorService.save({action : "saveOperator"},{operator:operator}, sucesscb, errorcb);
	};
	
	operatorService.deleteOperator=function(operatorId,sucesscb,errorcb)
	{
		operatorService.save({action:"deleteOperator"},{operatorId:operatorId},sucesscb,errorcb);
	};
	
	operatorService.updateOperator=function(operator,sucesscb,errorcb)
	{
		operatorService.save({action:"updateOperator"},{operator:operator},sucesscb,errorcb);
	};

	operatorService.findOperatorById = function(operatorId,sucesscb, errorcb)
	{
		operatorService.save({action : "findOperatorById"},{operatorId:operatorId}, sucesscb, errorcb);
	};
	
	operatorService.findOperatorByCode  = function(operatorCode,sucesscb, errorcb)
	{
		operatorService.save({action : "findOperatorByCode"},{operatorCode:operatorCode}, sucesscb, errorcb);
	};
	
	operatorService.findAllOperators = function(sucesscb, errorcb)
	{
		operatorService.save({action : "findAllOperators"}, sucesscb, errorcb);
	};
	
	operatorService.distributionRole = function(operatorId,roles,organizationId)
	{
		return operatorService.save({action : "distributionRole"},{operatorId:operatorId,organizationId:organizationId,roles:roles}).$promise;
	};
	
	operatorService.copyOperator = function(sourceEIds,targetEIds,sucesscb, errorcb)
	{
		operatorService.save({action : "copyOperator"},{sourceEIds:sourceEIds,targetEIds:targetEIds}, sucesscb, errorcb);
	};
	
	
	operatorService.changePasswd = function(operatorId,newPasw,oldPasw,sucessCB,errorCB)
	{
		operatorService.save({action : "changePasswd"},{operatorId:operatorId,newPasw:newPasw,oldPasw:oldPasw},sucessCB,errorCB);
	}
	
	return operatorService;
}]);