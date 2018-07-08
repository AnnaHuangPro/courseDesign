
define(["app"], function (app) {
	app.factory("OrderService", function($resource) {
		
		var orderService = $resource("../DD/Order/:action", {});
		orderService.saveOrder=function(order,sucesscb,errorcb)	{
			orderService.save({action:"saveOrder"},{order:order},sucesscb,errorcb);
		};
		
		orderService.deleteOrder=function(orderId,sucesscb,errorcb)	{
			orderService.save({action:"deleteOrder"},{orderId:orderId},sucesscb,errorcb);
		};
		
		orderService.updateOrder=function(order,sucesscb,errorcb) {
			orderService.save({action:"updateOrder"},{order:order},sucesscb,errorcb);
		};
		 
		orderService.findOrderById=function(orderId,sucesscb,errorcb) {
			orderService.get({action:"findOrderById",orderId:orderId},sucesscb,errorcb);
		};
		
		orderService.findAllOrder=function(sucesscb,errorcb) {
			orderService.query({action:"findAllOrder"},sucesscb,errorcb);
		}
		return orderService;
})});
