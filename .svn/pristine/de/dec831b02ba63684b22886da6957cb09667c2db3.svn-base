var loginApp = angular.module("loginApp",[]);
loginApp.factory('LoginService',['$resource', function($resource) 
{
	var loginService = $resource('../Login/:action', {});
	loginService.checkLoginUser=function(operatorCode,operatorPassword,organization,sucesscb,errorcb)
	{
		loginService.save({action:"checkLoginUser"},{operatorCode:operatorCode,operatorPassword:operatorPassword,organization:organization},sucesscb,errorcb);
	};
	loginService.loginOut=function(sucesscb,errorcb)
	{
		loginService.save({action:"loginOut"},{},sucesscb,errorcb);
	};
	loginService.searchOrganization=function(operatorCode,sucesscb,errorcb)
	{
		loginService.save({action:"searchOrganization"},{operatorCode:operatorCode},sucesscb,errorcb);
	};
	loginService.SSO=function(userKey,sucesscb,errorcb)
	{
		loginService.save({action:"SSO"},{userKey:userKey},sucesscb,errorcb);
	};
	
	loginService.checkSSO=function(operatorId,sucesscb,errorcb)
	{
		loginService.save({action:"checkSSO"},{operatorId:operatorId},sucesscb,errorcb);
	};
	return loginService;
}]);

