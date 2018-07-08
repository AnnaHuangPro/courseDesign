package ddd.simple.service.ftp;

import java.io.InputStream;

import ddd.simple.entity.attachment.Attachment;

public interface FTPService {
	
	/**
	 * 登录
	 * @return
	 * @throws Exception
	 */
	public boolean connect();
	
	/**
	 * 注销
	 */
	public void ftpDispose();
	
	/**
	 * 上传文件
	 * @param attachment
	 * @param inputStream
	 */
	public void ftpUpload(Attachment attachment, InputStream inputStream);
}
