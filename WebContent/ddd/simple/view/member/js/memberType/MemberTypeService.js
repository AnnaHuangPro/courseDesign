
define(["app"], function (app) 
{
	app.factory("MemberTypeService", function($resource) 
	{
		var memberTypeService = $resource("../MemberType/:action", {});
		memberTypeService.saveMemberType=function(memberType,sucesscb,errorcb)
		{
			memberTypeService.save({action:"saveMemberType"},memberType,sucesscb,errorcb);
		};
		
		memberTypeService.deleteMemberType=function(memberType,sucesscb,errorcb)
		{
			memberTypeService.save({action:"deleteMemberType"},memberType,sucesscb,errorcb);
		};
		
		memberTypeService.updateMemberType=function(memberType,sucesscb,errorcb)
		{
			memberTypeService.save({action:"updateMemberType"},memberType,sucesscb,errorcb);
		};
		 
		memberTypeService.findMemberTypeById=function(memberTypeId,sucesscb,errorcb)
		{
			memberTypeService.get({action:"findMemberTypeById",memberTypeId:memberTypeId},sucesscb,errorcb);
		};
		
		memberTypeService.findAllMemberType=function(sucesscb,errorcb)
		{
			memberTypeService.query({action:"findAllMemberType"},sucesscb,errorcb);
		}
		return memberTypeService;
})});
