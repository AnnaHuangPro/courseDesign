package ddd.simple.util.file_upload_download;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.context.ContextLoaderListener;

import sun.misc.BASE64Decoder;

import com.alibaba.fastjson.JSONObject;

import ddd.base.Config;
import ddd.base.exception.ClientError;
import ddd.base.exception.DDDException;
import ddd.base.persistence.SessionFactory;
import ddd.base.util.MD5Util;
import ddd.base.util.WebUtil;
import ddd.simple.entity.attachment.Attachment;
import ddd.simple.entity.headPortrait.HeadPortrait;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.organization.Employee;
import ddd.simple.entity.permission.LoginUser;
import ddd.simple.entity.permission.Operator;
import ddd.simple.service.attachment.AttachmentService;
import ddd.simple.service.headPortrait.HeadPortraitService;
import ddd.simple.service.systemConfig.SystemConfigService;

/**
 * Servlet implementation class UploadServlet
 */
public class UploadServlet extends HttpServlet
{
	private static final long serialVersionUID = 7868149110164667104L;
	
	private SystemConfigService systemConfigService = (SystemConfigService) ContextLoaderListener.getCurrentWebApplicationContext()
			.getBean("systemConfigServiceBean");
			
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		this.doPost(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain;charset=utf-8");
		try
		{
			String associateType = request.getParameter("associateType");
			String uploadPeopleId = request.getParameter("uploadPeopleId");
			String isTemporary = request.getParameter("isTemporary");// 是否存为临时文件
			String isVip = request.getParameter("isVip");
			String imgType = request.getParameter("imgType");
			String fromFace = request.getParameter("fromFace");
			String relativePath = "";
			LoginUser user = (LoginUser) request.getSession().getAttribute("loginUser");
			if("true".equals(fromFace)){
				
			}else{
				if (user.getLoginOperator() != null)
				{
					relativePath += "/employeeUp";
				} else if (user.getLoginVip() != null)
				{
					relativePath += "/vipUp";
				} else
				{
					throw new DDDException("请登录");
				}
			}
			
			
			Calendar now = Calendar.getInstance();
			relativePath += "/" + now.get(Calendar.YEAR) + "/" + (now.get(Calendar.MONTH) + 1) + "/" + now.get(Calendar.DAY_OF_MONTH);
			
			DiskFileItemFactory diskFactory = new DiskFileItemFactory();
			diskFactory.setSizeThreshold(4096);
			ServletFileUpload upload = new ServletFileUpload(diskFactory);
			String attachmentTotalSize =   systemConfigService.findSystemConfigValueBykey("attachmentTotalSize");
			if(attachmentTotalSize== null || "".equals(attachmentTotalSize)){
				attachmentTotalSize = "150";
			}
			upload.setSizeMax(Integer.parseInt(attachmentTotalSize) * 1024 * 1024);
			
			PrintWriter out = null;
			try
			{
				out = response.getWriter();
			} catch (Exception e)
			{
				e.printStackTrace();
			}
			
             if ("logoAvatarg".equals(imgType))
					{
						/* 上传头像 */
            	        String logoName = System.currentTimeMillis() + ".png";
						String logoPath = systemConfigService.findSystemConfigValueBykey("galleryPath");
						if (logoPath == null || "".equals(logoPath))
						{
							throw new DDDException("未配置galleryPath");
						}
					
				logoPath = StringUtils.removeEnd(logoPath, "/");
				StringBuilder absolutePath = new StringBuilder();
				absolutePath.append(logoPath).append("/").append(relativePath).append("/").append(logoName);
				String dataurl = getRequestPayload(request);
				int  index=dataurl.indexOf(',');
				String realImg = dataurl.substring(index+1);
				this.getFile(absolutePath.toString());    //创建对应文件夹
				this.generateImage(realImg,absolutePath.toString()); //写入图片
				
				StringBuilder relLogoUrl = new StringBuilder();
				relLogoUrl.append(relativePath).append("/").append(logoName);
				Employee employee = user.findCurrentEmployee();
				this.saveHeadPortraitUrl(employee,relLogoUrl.toString()); //保存图片路径
				
				out.write(relativePath + "/" + logoName);
				out.close();
				SessionFactory.commitTransaction();
				return ;
			}
			
			
			
			/* 文件类型上传 */
			List<FileItem> fileItems = upload.parseRequest(request);
			if (fileItems == null)
			{
				return;
			}
			Iterator iter = fileItems.iterator();
			String attachmentsId  = "1";
			while (iter.hasNext())
			{
				FileItem item = (FileItem) iter.next();
				if(item.isFormField()){
					continue;
				}
				if (item.getSize() == 0)
				{
					continue;
				}
				String randomFileName = System.currentTimeMillis() + ".";
				if (item.getContentType() != null)
				{
					randomFileName += StringUtils.substringAfterLast(item.getContentType(), "/");
				} else
				{
					randomFileName += StringUtils.substringAfterLast(item.getName(), ".");
					
				}
				
				// BufferedImage bi = ImageIO.read(item.getInputStream());
				String rootPath = "";
				
				if (isTemporary != null && isTemporary.equals("true"))
				{
					/* 上传临时文件 */
					rootPath = systemConfigService.findSystemConfigValueBykey("temporaryBasePath");
					if (rootPath == null || "".equals(rootPath))
					{
						throw new DDDException("未配置temporaryBasePath");
					}
					out.write(relativePath + "/" + randomFileName);
				} else if ("img".equals(associateType))
				{
					/* 上传图片 */
					rootPath = systemConfigService.findSystemConfigValueBykey("galleryPath");
					if (rootPath == null || "".equals(rootPath))
					{
						throw new DDDException("未配置galleryPath");
					}
					out.write(relativePath + "/" + randomFileName);
				} 
				else if ("ueditor".equals(associateType))
				{
					/* ueditor编辑器上传图片 */
					rootPath = systemConfigService.findSystemConfigValueBykey("galleryPath");
					if (rootPath == null || "".equals(rootPath))
					{
						throw new DDDException("未配置galleryPath");
					}
					JSONObject imgJson = new JSONObject();
					imgJson.put("state", "SUCCESS");
					imgJson.put("url", relativePath + "/" + randomFileName);
					imgJson.put("title", item.getName());
					imgJson.put("original", item.getName());
					
					out.write(imgJson.toString());
				} else
				{
					/* 上传附件 */
					String fileName = this.getUploadFileName(item);
					rootPath = systemConfigService.findSystemConfigValueBykey("galleryPath");
					if (rootPath == null || "".equals(rootPath))
					{
						throw new DDDException("未配置galleryPath");
					}
					
					String attachmentCode = request.getParameter("attachmentCode");
					String entityName = new String(request.getParameter("entityName").getBytes("iso-8859-1"), "utf-8");
					relativePath = "/" + entityName + "/" + attachmentCode;
					randomFileName = entityName + "_" + attachmentCode + "_" + fileName;
					long fileSize = item.getSize();
					Long attachmentId = this.uploadCommonFile(fileName,randomFileName, fileSize, entityName, attachmentCode, relativePath);
					out.write(attachmentId+";");
				}
				
				rootPath = StringUtils.removeEnd(rootPath, "/");
				StringBuilder absPath = new StringBuilder();
				absPath.append(rootPath).append("/").append(relativePath).append("/").append(randomFileName);
				item.write(this.getFile(absPath.toString()));
			}
			out.close();
			SessionFactory.commitTransaction();
		} catch (Exception e)
		{
			SessionFactory.rollbackTransaction();
			ClientError clientError = ClientError.create(e.getCause(), "/UploadServlet", ClientError.createNewId());
			DDDException.logInFile(e, clientError.getId());
			DDDException.printException(e);
			response.setStatus(500);
			WebUtil.writeJSON(response, clientError);
			if (Config.isDeveloping)
			{
				e.printStackTrace();
			}
		}
		
	}
	
	
	public Long uploadCommonFile(String realFileName,String fileName, long fileSize, String entityName, String attachmentCode, String relativePath) throws Exception
	{
		Object attachmentServiceBean = ContextLoaderListener.getCurrentWebApplicationContext().getBean("attachmentServiceBean");
		if (attachmentServiceBean != null)
		{
			AttachmentService attachmentService = (AttachmentService) attachmentServiceBean;
			Attachment attachment = new Attachment();
			if( systemConfigService.getLoginUser() != null){
				Operator loginOperator = systemConfigService.getLoginUser().getLoginOperator();
				Member loginMember = systemConfigService.getLoginUser().getLoginVip();
				if (loginOperator != null)
				{
					attachment.setUploadEmployee(loginOperator.getEmployee());
				} else if (loginMember != null)
				{
					attachment.setUploadMember(loginMember);
				}
			}
			
			attachment.setAssociateFormId(attachmentCode);
			attachment.setAssociateFormName(entityName);
			attachment.setAttachmentAddr(relativePath + "/" + fileName);
			attachment.setAttachmentRealName(realFileName);
			attachment.setAttachmentLogicalName(fileName);
			attachment.setAssociateSize(fileSize);
			attachment.setUploadTime(new Date());
			
			attachmentService.saveAttachment(attachment);
			
			return attachment.getEId();
		}else{
			return 0L;
		}
	}
	
	public String getUploadFileName(FileItem item)
	{
		String fileName = item.getName();
		long fileSize = item.getSize();
		if ("".equals(fileName) && fileSize == 0)
		{
			System.out.println("文件名为空 ...");
			return null;
		}
		
		System.out.println("完整的文件名：" + fileName);
		int index = fileName.lastIndexOf("\\");
		
		fileName = fileName.substring(index + 1, fileName.length());
		
		return fileName;
	}
	
	private File getFile(String absPath) throws IOException
	{
		File file = new File(absPath);
		if (file.exists())
			return file;
		if (!file.getParentFile().exists())
		{
			file.getParentFile().mkdirs();
		}
		file.createNewFile();
		return file;
	}
	// base64编码转化成图片
	private  boolean generateImage(String imgStr ,String relativePath ) {
			if (imgStr == null) // 图像数据为空
				return false;
			BASE64Decoder decoder = new BASE64Decoder();
			try {
				// Base64解码
				byte[] b = decoder.decodeBuffer(imgStr);
				for (int i = 0; i < b.length; ++i) {
					if (b[i] < 0) {// 调整异常数据
						b[i] += 256;
					}
				}
				// 生成png图片
				OutputStream out = new FileOutputStream(relativePath);
				out.write(b);
				out.flush();
				out.close();
				return true;
			} catch (Exception e) {
				return false;
			}
		}
//保存头像
	private String getRequestPayload(HttpServletRequest req) {  
        StringBuilder dataurl = new StringBuilder();  
        try(BufferedReader reader = req.getReader();) {  
                 char[] buff = new char[1024];  
                 int len;  
                 while((len = reader.read(buff)) != -1) {  
                          dataurl.append(buff,0, len);  
                 }  
        }catch (IOException e) {  
                 e.printStackTrace();  
        }  
        return dataurl.toString();  
}
	//保存头像路径
	private void saveHeadPortraitUrl(Employee employee,String relativeUrl) {  
		try{
			HeadPortraitService  headPortraitservice = (HeadPortraitService) ContextLoaderListener.getCurrentWebApplicationContext().getBean("headPortraitServiceBean"); ;
			if(headPortraitservice!=null){
				HeadPortrait headPortrait = new HeadPortrait();
				headPortrait.setEmployee(employee);
				headPortrait.setLogoUrl(relativeUrl);
				headPortraitservice.saveHeadPortrait(headPortrait);
			}
		
		}
	  catch(Exception e){
		  e.printStackTrace();
	  }
		
	}
	
}
