	var loginSuccessApp = angular.module("loginSuccessApp",[]);
	
	loginSuccessApp.factory('loginSuccessService',['$resource', function($resource) 
	{
		var loadPermissionsService =  $resource('../Admin/:action');
		return $resource('../Admin/:action', {}, {
			loadPermissions : {params: {action: "loadPermissions"}}
		});
	}]);
	
