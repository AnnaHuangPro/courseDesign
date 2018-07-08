
define(['app'], function (app) 
{
	app.factory('EntityPropertyDefineService', function($resource) 
	{
		var entityPropertyDefineService = $resource('../EntityPropertyDefine/:action', {});
		entityPropertyDefineService.saveEntityPropertyDefine=function(propertiesDefine,sucesscb,errorcb)
		{
			entityPropertyDefineService.save({action:"saveEntityPropertyDefine"},propertiesDefine,sucesscb,errorcb);
		};
		
		entityPropertyDefineService.deleteEntityPropertyDefine=function(entityPropertyDefine,sucesscb,errorcb)
		{
			entityPropertyDefineService.save({action:"deleteEntityPropertyDefine"},entityPropertyDefine,sucesscb,errorcb);
		};
		
		entityPropertyDefineService.updateEntityPropertyDefine=function(entityPropertyDefine,sucesscb,errorcb)
		{
			entityPropertyDefineService.save({action:"updateEntityPropertyDefine"},entityPropertyDefine,sucesscb,errorcb);
		};
		 
		entityPropertyDefineService.findEntityPropertyDefineById=function(entityPropertyDefineId,sucesscb,errorcb)
		{
			entityPropertyDefineService.get({action:"findEntityPropertyDefineById",entityPropertyDefineId:entityPropertyDefineId},sucesscb,errorcb);
		};
		
		entityPropertyDefineService.findAllEntityPropertyDefine=function(sucesscb,errorcb)
		{
			entityPropertyDefineService.query({action:"findAllEntityPropertyDefine"},sucesscb,errorcb);
		}
		
		//通过实体类型查找附加字段
		entityPropertyDefineService.findEntityPropertyDefineByType=function(type,sucesscb,errorcb)
		{
			entityPropertyDefineService.query({action:"findEntityPropertyDefineByType",type:type},sucesscb,errorcb);
		};
		return entityPropertyDefineService;
})});
