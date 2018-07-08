package ddd.simple.dao.message_module.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.message_module.SendMessage;
import ddd.simple.dao.message_module.SendMessageDao;

@Service
public class SendMessageDaoBean extends BaseDao implements SendMessageDao {
	@Override
	public SendMessage saveSendMessage(SendMessage sendMessage)  throws Exception {
		return this.save(sendMessage);
	}

	@Override
	public int deleteSendMessage(Long sendMessageId)  throws Exception {
		return this.deleteById(sendMessageId,SendMessage.class);
	}

	@Override
	public SendMessage updateSendMessage(SendMessage sendMessage)  throws Exception {
		return this.update(sendMessage);
	}

	@Override
	public SendMessage findSendMessageById(Long sendMessageId)  throws Exception {
		return this.query(sendMessageId, SendMessage.class);
	}
	
	@Override
	public EntitySet<SendMessage> findAllSendMessage() throws Exception {
		return this.query("1=1",SendMessage.class);
	}
}
