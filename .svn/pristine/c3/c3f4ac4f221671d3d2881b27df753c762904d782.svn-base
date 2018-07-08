
define(["app"], function (app) 
{
	app.factory("MemberGroupService", function($resource) 
	{
		var memberGroupService = $resource("../MemberGroup/:action", {});
		memberGroupService.saveMemberGroup=function(memberGroup,sucesscb,errorcb)
		{
			memberGroupService.save({action:"saveMemberGroup"},memberGroup,sucesscb,errorcb);
		};
		
		memberGroupService.deleteMemberGroup=function(memberGroupId,sucesscb,errorcb)
		{
			memberGroupService.save({action:"deleteMemberGroup"},memberGroupId,sucesscb,errorcb);
		};
		
		memberGroupService.updateMemberGroup=function(memberGroup,sucesscb,errorcb)
		{
			memberGroupService.save({action:"updateMemberGroup"},memberGroup,sucesscb,errorcb);
		};
		 
		memberGroupService.findMemberGroupById=function(memberGroupId,sucesscb,errorcb)
		{
			memberGroupService.get({action:"findMemberGroupById",memberGroupId:memberGroupId},sucesscb,errorcb);
		};
		
		memberGroupService.findAllMemberGroup=function(sucesscb,errorcb)
		{
			memberGroupService.query({action:"findAllMemberGroup"},sucesscb,errorcb);
		};
		
		memberGroupService.saveMemberProjection=function(member,memberGroup,memberTypes,sucesscb,errorcb)
		{
			memberGroupService.save({action:"saveMemberProjection"},{member:member,memberGroup:memberGroup,memberTypes:memberTypes},sucesscb,errorcb);
		};
		
		memberGroupService.getGroupMembersById=function(memberGroupId,sucesscb,errorcb)
		{
			memberGroupService.query({action:"getGroupMembersById",memberGroupId:memberGroupId},sucesscb,errorcb);
		};
		
		memberGroupService.updateMemberProjection=function(member,memberGroup,memberTypes,sucesscb,errorcb)
		{
			memberGroupService.save({action:"updateMemberProjection"},{member:member,memberGroup:memberGroup,memberTypes:memberTypes},sucesscb,errorcb);
		};
		
		memberGroupService.findMemberProjectionById=function(memberProjectionId,sucesscb,errorcb)
		{
			memberGroupService.get({action:"findMemberProjectionById",memberProjectionId:memberProjectionId},sucesscb,errorcb);
		};
		
		memberGroupService.getMemberProjectByIds=function(memberId,memberGroupId,sucesscb,errorcb)
		{
			memberGroupService.query({action:"getMemberProjectByIds",memberId:memberId,memberGroupId:memberGroupId},sucesscb,errorcb);
		};
		
		memberGroupService.deleteMemberProjection=function(memberId,memberGroupId,sucesscb,errorcb)
		{
			memberGroupService.save({action:"deleteMemberProjection"},{memberId:memberId,memberGroupId:memberGroupId},sucesscb,errorcb);
		};
		
		return memberGroupService;
})});
