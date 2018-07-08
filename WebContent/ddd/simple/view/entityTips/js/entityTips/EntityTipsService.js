define([ "app" ], function(app) {
	app.factory("EntityTipsService", function($resource) {
		var entityTipsService = $resource("../EntityTips/:action", {});
		entityTipsService.saveEntityTips = function(entityTips, sucesscb,
				errorcb) {
			entityTipsService.save({
				action : "saveEntityTips"
			}, entityTips, sucesscb, errorcb);
		};

		entityTipsService.deleteEntityTips = function(entityTipsId, sucesscb,
				errorcb) {
			entityTipsService.save({
				action : "deleteEntityTips"
			}, entityTipsId, sucesscb, errorcb);
		};

		entityTipsService.updateEntityTips = function(entityTips, sucesscb,
				errorcb) {
			entityTipsService.save({
				action : "updateEntityTips"
			}, entityTips, sucesscb, errorcb);
		};

		entityTipsService.findEntityTipsById = function(entityTipsId, sucesscb,
				errorcb) {
			entityTipsService.get({
				action : "findEntityTipsById",
				entityTipsId : entityTipsId
			}, sucesscb, errorcb);
		};

		entityTipsService.findAllEntityTips = function(sucesscb, errorcb) {
			entityTipsService.query({
				action : "findAllEntityTips"
			}, sucesscb, errorcb);
		};

		entityTipsService.getAllField = function(entityClassStr, sucesscb,
				errorcb) {
			entityTipsService.query({
				action : "getAllField",
				entityClassStr : entityClassStr
			}, sucesscb, errorcb);
		};

		entityTipsService.findEntityTipsByName = function(name, sucesscb,
				errorcb) {
			entityTipsService.query({
				action : "findEntityTipsByName",
				name : name
			}, sucesscb, errorcb);
		};

		return entityTipsService;
	})
});
