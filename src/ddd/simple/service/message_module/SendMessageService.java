package ddd.simple.service.message_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.message_module.SendMessage;

public interface SendMessageService extends BaseServiceInterface {
	public SendMessage saveSendMessage(SendMessage sendMessage) ;
	
	public int deleteSendMessage(Long sendMessageId) ;
	
	public SendMessage updateSendMessage(SendMessage sendMessage) ;
	
	public SendMessage findSendMessageById(Long sendMessageId) ;
	
	public EntitySet<SendMessage> findAllSendMessage() ;
 
}