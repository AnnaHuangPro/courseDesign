
define(["app"], function (app) {
	app.factory("UserService", function($resource) {
		
		var userService = $resource("../DD/User/:action", {});
		userService.saveUser=function(user,sucesscb,errorcb)	{
			userService.save({action:"saveUser"},{user:user},sucesscb,errorcb);
		};
		
		userService.deleteUser=function(userId,sucesscb,errorcb)	{
			userService.save({action:"deleteUser"},{userId:userId},sucesscb,errorcb);
		};
		
		userService.updateUser=function(user,sucesscb,errorcb) {
			userService.save({action:"updateUser"},{user:user},sucesscb,errorcb);
		};
		 
		userService.findUserById=function(userId,sucesscb,errorcb) {
			userService.get({action:"findUserById",userId:userId},sucesscb,errorcb);
		};
		
		userService.findAllUser=function(sucesscb,errorcb) {
			userService.query({action:"findAllUser"},sucesscb,errorcb);
		}
		return userService;
})});
