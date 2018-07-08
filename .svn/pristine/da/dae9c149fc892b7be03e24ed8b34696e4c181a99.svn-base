define(["app"], function (app) 
{
	app.factory("modifyAccountService", function($resource) 
	{
		var modifyAccountService = $resource("/CMS/Member/:action", {});
		
		modifyAccountService.updateMember=function(member,sucesscb,errorcb)
		{
			modifyAccountService.save({action:"updateMember"},member,sucesscb,errorcb);
		};
		modifyAccountService.findMemberInfo=function(memberId,sucesscb,errorcb)
		{
			modifyAccountService.get({action:"findMemberInfo",memberId:memberId},sucesscb,errorcb);
		};
		modifyAccountService.updateMemberInfo=function(member,sucesscb,errorcb)
		{
			modifyAccountService.save({action:"updateMemberInfo"},member,sucesscb,errorcb);
		};
		modifyAccountService.editPassword=function(oldPassword,newPassword,sucesscb,errorcb)
		{
			modifyAccountService.save({action:"editPassword"},{oldPassword:oldPassword,newPassword:newPassword},sucesscb,errorcb);
		};
		modifyAccountService.getCurrentMember=function(sucesscb,errorcb)
		{
			modifyAccountService.query({action:"getCurrentMember"},sucesscb,errorcb);
		};
		return modifyAccountService;
})});
