package ddd.simple.service.message_module.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.message_module.SendMessage;
import ddd.simple.dao.message_module.SendMessageDao;
import ddd.simple.service.message_module.SendMessageService;

@Service
public class SendMessageServiceBean extends BaseService implements SendMessageService {
	@Resource(name="sendMessageDaoBean")
	private SendMessageDao sendMessageDao;
	
	@Override
	public SendMessage saveSendMessage(SendMessage sendMessage) {
		try {
			return this.sendMessageDao.saveSendMessage(sendMessage);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveSendMessage", e.getMessage(), e);
		}
	}

	@Override
	public int deleteSendMessage(Long sendMessageId) {
		try {
			return this.sendMessageDao.deleteSendMessage(sendMessageId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteSendMessage", e.getMessage(), e);
		}
		
	}

	@Override
	public SendMessage updateSendMessage(SendMessage sendMessage) {
		try {
			return this.sendMessageDao.updateSendMessage(sendMessage);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateSendMessage", e.getMessage(), e);
		}
	}

	@Override
	public SendMessage findSendMessageById(Long sendMessageId) {
		try {
			return this.sendMessageDao.findSendMessageById(sendMessageId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findSendMessageById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<SendMessage> findAllSendMessage() {
		try {
			return this.sendMessageDao.findAllSendMessage();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllSendMessage", e.getMessage(), e);
		}
	}

}
