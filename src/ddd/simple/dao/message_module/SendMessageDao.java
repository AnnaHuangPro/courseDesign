package ddd.simple.dao.message_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.message_module.SendMessage;

public interface SendMessageDao extends BaseDaoInterface {
	public SendMessage saveSendMessage(SendMessage sendMessage) throws Exception;
	
	public int deleteSendMessage(Long sendMessageId) throws Exception;
	
	public SendMessage updateSendMessage(SendMessage sendMessage) throws Exception;
	
	public SendMessage findSendMessageById(Long sendMessageId) throws Exception;
	
	public EntitySet<SendMessage> findAllSendMessage() throws Exception;
}
