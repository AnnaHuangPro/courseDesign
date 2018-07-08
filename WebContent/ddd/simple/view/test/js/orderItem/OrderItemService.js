
define(["app"], function (app) {
	app.factory("OrderItemService", function($resource) {
		
		var orderItemService = $resource("../DD/OrderItem/:action", {});
		orderItemService.saveOrderItem=function(orderItem,sucesscb,errorcb)	{
			orderItemService.save({action:"saveOrderItem"},{orderItem:orderItem},sucesscb,errorcb);
		};
		
		orderItemService.deleteOrderItem=function(orderItemId,sucesscb,errorcb)	{
			orderItemService.save({action:"deleteOrderItem"},{orderItemId:orderItemId},sucesscb,errorcb);
		};
		
		orderItemService.updateOrderItem=function(orderItem,sucesscb,errorcb) {
			orderItemService.save({action:"updateOrderItem"},{orderItem:orderItem},sucesscb,errorcb);
		};
		 
		orderItemService.findOrderItemById=function(orderItemId,sucesscb,errorcb) {
			orderItemService.get({action:"findOrderItemById",orderItemId:orderItemId},sucesscb,errorcb);
		};
		
		orderItemService.findAllOrderItem=function(sucesscb,errorcb) {
			orderItemService.query({action:"findAllOrderItem"},sucesscb,errorcb);
		}
		return orderItemService;
})});
