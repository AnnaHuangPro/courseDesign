package ddd.simple.action.message;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.message.Message;
import ddd.simple.service.message.MessageService;

@Action
@RequestMapping("/IN/Message")
@Controller
public class MessageAction {
	@Resource(name="messageServiceBean")
	private MessageService messageService;
	
	public Message saveMessage(Message message) {
		try {
			Message saveMessage = this.messageService.saveMessage(message);
			return saveMessage;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteMessage(Long messageId) {
		
		try {
			return this.messageService.deleteMessage(messageId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public Message updateMessage(Message message) {
		try {
			Message updateMessage = this.messageService.updateMessage(message);
			return updateMessage;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Message findMessageById(Long messageId) {
		try {
			Message findMessage = this.messageService.findMessageById(messageId);
			return  findMessage;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<Message > findAllMessage() {
		try {
			EntitySet<Message > allMessage = this.messageService.findAllMessage();
			return allMessage;
		} catch (DDDException e) {
			throw e;
		}
	}

}