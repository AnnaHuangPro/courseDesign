var loginApp = angular.module("loginApp",[]);
loginApp.factory('VipLoginService',['$resource', function($resource) 
{
	var loginService = $resource('../VipLogin/:action', {});
	
	loginService.checkLoginUser = function(operatorCode,operatorPassword,successcb,errorcb){
		loginService.save({action:"checkLoginUser"},{operatorCode:operatorCode,operatorPassword:operatorPassword},successcb,errorcb);
	};
	
	loginService.vipLogin = function(onlyCode,password,successcb,errorcb){
		loginService.save({action:"vipLogin"},{onlyCode:onlyCode,password:password},successcb,errorcb);
	};
	
	loginService.checkOrganization = function(onlyCode,password,selectGroup,successcb,errorcb){
		loginService.save({action:"checkOrganization"},{onlyCode:onlyCode,password:password,group:selectGroup},successcb,errorcb);
	};
	
	loginService.vipLoginOut = function(successcb,errorcb) {
		loginService.save({action:"vipLoginOut"},{},successcb,errorcb);
	};
	
	loginService.searchGroup = function(onlyCode,successcb,errorcb){
		loginService.query({action:"searchGroup",onlyCode:onlyCode},successcb,errorcb);
	};
	
	loginService.getAdminPermisson = function(onlyCode,successcb,errorcb){
		loginService.save({action:"getAdminPermisson"},{onlyCode:onlyCode},successcb,errorcb);
	};
	
	return loginService;
}]);

