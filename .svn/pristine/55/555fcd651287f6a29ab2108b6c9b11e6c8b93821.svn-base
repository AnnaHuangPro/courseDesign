
define(['app'], function (app) 
{
	app.factory('OrganizationService', function($resource) 
	{
		var organizationService = $resource('../Organization/:action', {});
		organizationService.saveOrganization=function(organization,sucesscb,errorcb)
		{
			organizationService.save({action:"saveOrganization"},organization,sucesscb,errorcb);
		};
		
		organizationService.deleteOrganization=function(organizationId,sucesscb,errorcb)
		{
			organizationService.save({action:"deleteOrganization"},organizationId,sucesscb,errorcb);
		};
		
		organizationService.updateOrganization=function(organization,sucesscb,errorcb)
		{
			organizationService.save({action:"updateOrganization"},organization,sucesscb,errorcb);
		};
		 
		organizationService.findOrganizationById=function(organizationId,sucesscb,errorcb)
		{
			organizationService.get({action:"findOrganizationById",organizationId:organizationId},sucesscb,errorcb);
		};
		
		organizationService.findAllOrganization=function(sucesscb,errorcb)
		{
			organizationService.query({action:"findAllOrganization"},sucesscb,errorcb);
		};
		
		organizationService.submitApply=function(organization,operate,sucesscb,errorcb)
		{
			organizationService.save({action:"submitApply",operate:operate},{organization:organization},sucesscb,errorcb);
		};
		
		return organizationService;
})});
