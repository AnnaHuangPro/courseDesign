angular.module('dddControllerApp', []).factory('dddControllerCom', function() {
	var dddControllerCom = {};
	dddControllerCom.inject = function(controller) {
		dddControllerCom.controller = controller;
	}
	dddControllerCom.get = function() {
		return dddControllerCom.controller ;
	}
	return dddControllerCom;
})
