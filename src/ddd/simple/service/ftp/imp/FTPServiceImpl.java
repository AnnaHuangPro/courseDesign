package ddd.simple.service.ftp.imp;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

import ddd.base.exception.DDDException;
import ddd.base.util.Loader;
import ddd.simple.entity.attachment.Attachment;
import ddd.simple.service.ftp.FTPService;

public class FTPServiceImpl implements FTPService{
	private FTPClient ftpClient;

	/**
	 * 判断Ftp目录是否存在,如果不存在则创建目录
	 * 
	 * @throws IOException
	 */
	private void isDirExist(FTPClient ftpClient, String path) throws Exception {
		String[] directoryNames = path.split("/");

		for (String directoryName : directoryNames) {
			if (!"".equals(directoryName.trim()) && !ftpClient.changeWorkingDirectory(directoryName)) {
				directoryName = new String(directoryName.getBytes("GBK"), "iso-8859-1");
				ftpClient.makeDirectory(directoryName);
				ftpClient.changeWorkingDirectory(directoryName);
			}
		}

		ftpClient.changeWorkingDirectory("/");
	}

	public boolean connect() {
		try {
			if (this.ftpClient != null && checkConnected()) {
				return true;
			} else {
				ftpClient = new FTPClient();
			}
			Loader loader = Loader.instance();
			Map<String, String> properties = new HashMap<String, String>();
			properties = loader.load("config.properties");

			String username = properties.get("ftpUserName");
			String password = properties.get("ftpPassword");
			String ftpHost = properties.get("ftpHost");

			if (username.length() == 0) {
				throw new DDDException("请先在config.properties中配置参数（ftpUserName）-ftp服务器登录用户名!");
			}
			if (password.length() == 0) {
				throw new DDDException("请先在config.properties中配置参数（ftpPassword）-ftp服务器登录密码!");
			}
			if (ftpHost.length() == 0) {
				throw new DDDException("请先在config.properties中配置参数（ftpAddr）-ftp服务器地址！");
			}

			ftpClient.connect(ftpHost);
			ftpClient.login(username, password);
			ftpClient.enterLocalPassiveMode();
			ftpClient.enterLocalPassiveMode();
			ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
			ftpClient.setControlEncoding("UTF-8");
			
			int reply = this.ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				ftpClient.logout();
				ftpClient.disconnect();
				System.out.println("服务器拒绝连接");
				return false;
			}
		} catch (Exception e) {
			//dddd
		}
		
		return checkConnected();

	}

	private boolean checkConnected() {
		try {
			if (ftpClient == null) {
				return false;
			}
			int reply = this.ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				ftpClient.logout();
				ftpClient.disconnect();

				return false;
			}
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}

	public void ftpDispose() {
		try {
			// 注销FTP客户端
			ftpClient.logout();
		} catch (Exception e) {
			// 如果FTP注销失败什么也不做，忽略掉异常。
		}
		// 如果FTP客户端的连接还存在则断开连接。
		if (ftpClient.isConnected()) {
			try {
				ftpClient.disconnect();
			} catch (Exception ex) {
				// 如果断开FTP连接失败什么也不做，忽略掉异常。
			}
		}
	}

	public void ftpUpload(Attachment attachment, InputStream inputStream) {
		try {
			String attachmentAddr = attachment.getAttachmentAddr();
			int pathIndex = 0;
			if (attachmentAddr.contains("/")) {
				pathIndex = attachmentAddr.lastIndexOf("/");
			} else if (attachmentAddr.contains("\\")) {
				pathIndex = attachmentAddr.lastIndexOf("\\");
			}

			String checkPath = attachment.getAttachmentAddr().substring(0, pathIndex);

			this.isDirExist(ftpClient, checkPath);

			String fileName = new String(attachment.getAttachmentAddr().getBytes("GBK"), "iso-8859-1");// 中文文件名会乱码

			boolean isSuccess = ftpClient.storeFile(fileName, inputStream);

			if (isSuccess) {
				System.out.println("ftp传输完成！");
			} else {
				System.out.println("ftp传输失败(" + attachment.getAttachmentRealName() + ") 重新上传中...");
				this.ftpUpload(attachment, inputStream);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public boolean removeFile(Attachment attachment) {
		String srcFname;
		boolean flag = false;
		try {
			srcFname = new String(attachment.getAttachmentAddr().getBytes("GBK"), "iso-8859-1");
			try {
				if(ftpClient.deleteFile(srcFname)){
					System.out.println("删除ftp文件 " + srcFname + "成功！");
				}else{
					System.out.println("删除ftp文件 " + srcFname + "失败或文件不存在！");
				}
			} catch (IOException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		return flag;
	}
}
