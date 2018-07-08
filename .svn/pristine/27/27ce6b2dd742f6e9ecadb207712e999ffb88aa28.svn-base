package ddd.simple.dao.message.impl;

import java.util.HashMap;
import java.util.Map;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;

import org.springframework.stereotype.Service;

import ddd.simple.entity.message.Message;
import ddd.simple.dao.message.MessageDao;

@Service
public class MessageDaoBean extends BaseDao implements MessageDao {
	@Override
	public Message saveMessage(Message message)  throws Exception {
		return this.save(message);
	}

	@Override
	public int deleteMessage(Long messageId)  throws Exception {
		return this.deleteById(messageId,Message.class);
	}

	@Override
	public Message updateMessage(Message message)  throws Exception {
		return this.update(message);
	}

	@Override
	public Message findMessageById(Long messageId)  throws Exception {
		return this.query(messageId, Message.class);
	}
	
	@Override
	public EntitySet<Message> findAllMessage() throws Exception {
		return this.query("1=1",Message.class);
	}
	
	@Override
	public EntitySet<Message> findAllMessageByType(String type) throws Exception {
		return this.query("typeOfMessage = " + type, Message.class);
	}
	
	@Override
	public EntitySet<Message> findAllMessageByEmployee(Long employeeId) throws Exception {
		return this.query("employeeId = " + employeeId, Message.class);
	}
	
	@Override
	public Message updateMessageByWhere(String where) throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("state","已读");
		this.update("in_message", map, where);
		return null;
	}
}
