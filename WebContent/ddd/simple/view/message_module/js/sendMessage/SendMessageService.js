
define(["app"], function (app) {
	app.factory("SendMessageService", function($resource) {
		
		var sendMessageService = $resource("../DD/SendMessage/:action", {});
		sendMessageService.saveSendMessage=function(sendMessage,sucesscb,errorcb)	{
			sendMessageService.save({action:"saveSendMessage"},{sendMessage:sendMessage},sucesscb,errorcb);
		};
		
		sendMessageService.deleteSendMessage=function(sendMessageId,sucesscb,errorcb)	{
			sendMessageService.save({action:"deleteSendMessage"},{sendMessageId:sendMessageId},sucesscb,errorcb);
		};
		
		sendMessageService.updateSendMessage=function(sendMessage,sucesscb,errorcb) {
			sendMessageService.save({action:"updateSendMessage"},{sendMessage:sendMessage},sucesscb,errorcb);
		};
		 
		sendMessageService.findSendMessageById=function(sendMessageId,sucesscb,errorcb) {
			sendMessageService.get({action:"findSendMessageById",sendMessageId:sendMessageId},sucesscb,errorcb);
		};
		
		sendMessageService.findAllSendMessage=function(sucesscb,errorcb) {
			sendMessageService.query({action:"findAllSendMessage"},sucesscb,errorcb);
		}
		return sendMessageService;
})});
