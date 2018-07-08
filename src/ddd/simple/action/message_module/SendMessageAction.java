package ddd.simple.action.message_module;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.message_module.SendMessage;
import ddd.simple.service.message_module.SendMessageService;

@Action
@RequestMapping("/DD/SendMessage")
@Controller
public class SendMessageAction {
	@Resource(name="sendMessageServiceBean")
	private SendMessageService sendMessageService;
	
	public SendMessage saveSendMessage(SendMessage sendMessage) {
		try {
			SendMessage saveSendMessage = this.sendMessageService.saveSendMessage(sendMessage);
			return saveSendMessage;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteSendMessage(Long sendMessageId) {
		
		try {
			return this.sendMessageService.deleteSendMessage(sendMessageId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public SendMessage updateSendMessage(SendMessage sendMessage) {
		try {
			SendMessage updateSendMessage = this.sendMessageService.updateSendMessage(sendMessage);
			return updateSendMessage;
		} catch (DDDException e) {
			throw e;
		}
	}

	public SendMessage findSendMessageById(Long sendMessageId) {
		try {
			SendMessage findSendMessage = this.sendMessageService.findSendMessageById(sendMessageId);
			return  findSendMessage;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<SendMessage > findAllSendMessage() {
		try {
			EntitySet<SendMessage > allSendMessage = this.sendMessageService.findAllSendMessage();
			return allSendMessage;
		} catch (DDDException e) {
			throw e;
		}
	}

}