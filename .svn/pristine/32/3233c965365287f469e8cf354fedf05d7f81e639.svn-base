
define(["app"], function (app) 
{
	app.factory("MemberService", function($resource) 
	{
		var memberService = $resource("../Member/:action", {});
		memberService.saveMember=function(member,sucesscb,errorcb)
		{
			memberService.save({action:"saveMember"},member,sucesscb,errorcb);
		};
		
		memberService.deleteMember=function(member,sucesscb,errorcb)
		{
			memberService.save({action:"deleteMember"},member,sucesscb,errorcb);
		};
		
		memberService.updateMember=function(member,sucesscb,errorcb)
		{
			memberService.save({action:"updateMember"},member,sucesscb,errorcb);
		};
		 
		memberService.findMemberById=function(memberId,sucesscb,errorcb)
		{
			memberService.get({action:"findMemberById",memberId:memberId},sucesscb,errorcb);
		};
		
		memberService.findAllMember=function(sucesscb,errorcb)
		{
			memberService.query({action:"findAllMember"},sucesscb,errorcb);
		}
		
		memberService.validateCode = function(sucesscb,errorcb)
		{
			memberService.get({action:"validateCode"},sucesscb,errorcb);
		}
		memberService.returnValidate = function(inputCode,sucesscb,errorcb)
		{
			memberService.get({action:"returnValidate",inputCode:inputCode},sucesscb,errorcb);
		} 
		
		memberService.findMemberInfo = function(memberId,sucesscb,errorcb)
		{
			memberService.get({action:"findMemberInfo",memberId:memberId},sucesscb,errorcb);
		};
		
		memberService.updateMemberInfo = function(memberId,sucesscb,errorcb)
		{
			memberService.get({action:"updateMemberInfo",memberId:memberId},sucesscb,errorcb);
		};
		
		memberService.checkMemberIsInGroup=function(member,sucesscb,errorcb)
		{
			memberService.save({action:"checkMemberIsInGroup"},member,sucesscb,errorcb);
		};
		return memberService;
})});
