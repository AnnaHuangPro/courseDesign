
define(['app'], function (app) 
{
	app.factory('EntityPropertyService', function($resource) 
	{
		var entityPropertyService = $resource('../EntityProperty/:action', {});
		entityPropertyService.saveEntityProperty=function(entityProperty,sucesscb,errorcb)
		{
			entityPropertyService.save({action:"saveEntityProperty"},entityProperty,sucesscb,errorcb);
		};
		
		entityPropertyService.deleteEntityProperties=function(id,type,sucesscb,errorcb)
		{
			entityPropertyService.save({action:"deleteEntityPropertise"},id,type,sucesscb,errorcb);
		};
		
		entityPropertyService.updateEntityProperty=function(entityProperty,sucesscb,errorcb)
		{
			entityPropertyService.save({action:"updateEntityProperty"},entityProperty,sucesscb,errorcb);
		};
		 
		entityPropertyService.findEntityPropertyById=function(entityPropertyId,sucesscb,errorcb)
		{
			entityPropertyService.get({action:"findEntityPropertyById",entityPropertyId:entityPropertyId},sucesscb,errorcb);
		};
		
		entityPropertyService.findAllEntityProperty=function(sucesscb,errorcb)
		{
			entityPropertyService.query({action:"findAllEntityProperty"},sucesscb,errorcb);
		}
		
		//保存所有的附加字段
		entityPropertyService.saveAllProperty=function(properties,type,id,sucesscb,errorcb)
		{
			entityPropertyService.save({action:"saveAllProperty"},{properties:properties,type:type,id:id},sucesscb,errorcb);
		};
		//查找一个实体的所有附加字段
		//通过实体类型和ID查找一个实体的附加字段
		entityPropertyService.findEntityPropertyByIdandType=function(id,type,sucesscb,errorcb)
		{
			entityPropertyService.query({action:"findEntityPropertyByIdandType",id:id,type:type},sucesscb,errorcb);
		}
		//更新一个实体的所有附加字段
		entityPropertyService.updateEntityPropertyByIdAndType=function(properties,type,id,sucesscb,errorcb)
		{
			entityPropertyService.save({action:"updateEntityPropertyByIdAndType"},{properties:properties,type:type,id:id},sucesscb,errorcb);
		}
		return entityPropertyService;
})});
