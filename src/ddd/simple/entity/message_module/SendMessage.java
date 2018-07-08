package ddd.simple.entity.message_module;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import java.util.Date;

@ddd.base.annotation.Entity(label="消息实体",name="DD_sendMessage")
public class SendMessage extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="发送方",name="sender",length=250,nullable=false,unique=false,comment="发送方")
	private Integer sender;

	@Column(label="接收方",name="receiver",length=250,nullable=false,unique=false,comment="接收方")
	private Integer receiver;

	@Column(label="消息内容",name="content",length=250,nullable=false,unique=false,comment="消息内容")
	private String content;

	@Column(label="消息发送时间",name="sendTime",length=250,nullable=false,unique=false,comment="学生登录密码")
	private Date sendTime;


	public Integer getSender() {
		lazyLoad();
		return this.sender;
	}

	public void setSender(Integer sender) {
		this.sender = sender;
	}

	public Integer getReceiver() {
		lazyLoad();
		return this.receiver;
	}

	public void setReceiver(Integer receiver) {
		this.receiver = receiver;
	}

	public String getContent() {
		lazyLoad();
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getSendTime() {
		lazyLoad();
		return this.sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}


	
}