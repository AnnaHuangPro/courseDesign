package ddd.simple.service.reportForm.impl;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.net.ConnectException;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;

import ddd.base.dynamicSql.HierachySqlProcessor;
import ddd.base.exception.DDDException;
import ddd.base.jxls.JxlsGenerator;
import ddd.base.jxls.TemplateGenerator;
import ddd.base.persistence.EntitySet;
import ddd.base.util.SpringContextUtil;
import ddd.simple.dao.reportForm.ReportFormDao;
import ddd.simple.entity.reportForm.ReportForm;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.reportForm.DealDataService;
import ddd.simple.service.reportForm.ReportFormService;
import ddd.simple.service.systemConfig.SystemConfigService;

@Service
public class ReportFormServiceBean extends BaseService implements ReportFormService
{
	
	@Resource(name = "reportFormDaoBean")
	private ReportFormDao reportFormDao;
	
	@Resource(name = "systemConfigServiceBean")
	private SystemConfigService	systemConfigService;
	
	@Override
	public ReportForm saveReportForm(ReportForm reportForm)
	{
		try
		{
			return this.reportFormDao.saveReportForm(reportForm);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("saveReportForm", e.getMessage(), e);
		}
	}
	
	@Override
	public Map<String, Object> getReportFormQueryData(String templatePath, Map<String, Object> params)
	{
		String hierachySqlFileName = FilenameUtils.removeExtension(templatePath) + ".sql";
		try
		{
			HierachySqlProcessor test1 = new HierachySqlProcessor();
			Map<String, Object> datas = test1.loadData(hierachySqlFileName, params);
			try
			{
				DealDataService propertyDataDealImp = (DealDataService) SpringContextUtil.getBean("propertyDataDealImp");
				if(propertyDataDealImp != null){
					propertyDataDealImp.dealData(datas);
				}
			} catch (Exception e)
			{
				// TODO: handle exception
			}
			
			params.putAll(datas);
			return params;
		} catch (Exception e)
		{
			throw new DDDException("通过文件" + hierachySqlFileName + "找寻数据出错");
		}
	}
	
	@Override
	public int deleteReportForm(Long reportFormId)
	{
		try
		{
			return this.reportFormDao.deleteReportForm(reportFormId);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("deleteReportForm", e.getMessage(), e);
		}
		
	}
	
	@Override
	public ReportForm updateReportForm(ReportForm reportForm)
	{
		try
		{
			return this.reportFormDao.updateReportForm(reportForm);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("updateReportForm", e.getMessage(), e);
		}
	}
	
	@Override
	public ReportForm findReportFormById(Long reportFormId)
	{
		try
		{
			return this.reportFormDao.findReportFormById(reportFormId);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findReportFormById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<ReportForm> findAllReportForm()
	{
		try
		{
			return this.reportFormDao.findAllReportForm();
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findAllReportForm", e.getMessage(), e);
		}
	}
	
	@Override
	public String excel2Html(String templatePath, Map<String, Object> params)
	{
		try
		{
			String toHtmlPath = this.systemConfigService.findSystemConfigValueBykey("toHtmlPath");
			if (toHtmlPath == null || toHtmlPath.equals(""))
			{
				toHtmlPath = "D:\\angular\\tomcat7\\webapps\\DDD3\\ddd\\imgTemp";
			}
			
			File dir = new File(toHtmlPath);
			if (!dir.exists())
			{
				dir.mkdir();
			}
			
			TemplateGenerator generator = new JxlsGenerator();
			File file;
			String tempToHtmlPath = "";
			while (true)
			{
				if (templatePath.indexOf(".xlsx") > 0)
				{
					tempToHtmlPath = toHtmlPath + "\\\\jxl_openoffice" + System.currentTimeMillis() + ".xlsx";
				} else
				{
					tempToHtmlPath = toHtmlPath + "\\\\jxl_openoffice" + System.currentTimeMillis() + ".xls";
				}
				tempToHtmlPath = StringUtils.replace(tempToHtmlPath, "\\\\", "/");
				file = new File(tempToHtmlPath);
				if (!file.exists())
				{
					file.createNewFile();
					break;
				}
			}
			OutputStream out = new FileOutputStream(file);
			generator.generateExcelWithStream(templatePath, params, out);
			return toHtmlString(file, toHtmlPath);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findAllReportForm", e.getMessage(), e);
		}
	}
	
	private File generateUniqueFile(String templatePath, String toHtmlPath)
	{
		try
		{
			int count = 0;
			String tempToHtmlPath = "";
			File file;
			while (true)
			{
				if (count > 10)
				{
					throw new Exception("生成excel临时文件出错：尝试10次以时间戳命名文件都与现有文件重名");
				}
				if (templatePath.indexOf(".xlsx") > 0)
				{
					tempToHtmlPath = toHtmlPath + "\\\\jxl_openoffice" + System.currentTimeMillis() + ".xlsx";
				} else
				{
					tempToHtmlPath = toHtmlPath + "\\\\jxl_openoffice" + System.currentTimeMillis() + ".xls";
				}
				tempToHtmlPath = StringUtils.replace(tempToHtmlPath, "\\\\", "/");
				file = new File(tempToHtmlPath);
				if (!file.exists())
				{
					file.createNewFile();
					return file;
				}
				count++;
			}
		} catch (Exception e)
		{
			throw new DDDException(e.getMessage());
		}
		
	}
	
	@Override
	public Map<String, String> excel2Html(Map<String, String> modelFileKeyAndTemplatePath, Map<String, Object> params)
	{
		try
		{
			// toHtmlPath是openoffice生成临时文件的地方
			String toHtmlPath = this.systemConfigService.findSystemConfigValueBykey("toHtmlPath");
			if (toHtmlPath == null || toHtmlPath.equals(""))
			{
				toHtmlPath = "D:\\angular\\tomcat7\\webapps\\DDD3\\ddd\\imgTemp";
			}
			File dir = new File(toHtmlPath);
			if (!dir.exists())
			{
				dir.mkdir();
			}
			
			Map<String, File> modelFileKeyAndExcelFile = new HashMap<String, File>();
			TemplateGenerator generator = new JxlsGenerator();
			
			Set<String> keySet = modelFileKeyAndTemplatePath.keySet();
			Iterator<String> ite = keySet.iterator();
			while (ite.hasNext())
			{
				String modelFileKey = ite.next();
				String templatePath = modelFileKeyAndTemplatePath.get(modelFileKey);
				File file = this.generateUniqueFile(templatePath, toHtmlPath);
				OutputStream out = new FileOutputStream(file);
				generator.generateExcelWithStream(templatePath, params, out);
				modelFileKeyAndExcelFile.put(modelFileKey, file);
			}
			return toHtmlString(modelFileKeyAndExcelFile, toHtmlPath);
			
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findAllReportForm", e.getMessage(), e);
		}
	}
	
	private static File convert(File docFile, String filepath)
	{
		// 创建保存html的文件
		File htmlFile = new File(filepath + "/" + new Date().getTime() + ".html");
		// 创建Openoffice连接
		OpenOfficeConnection con = new SocketOpenOfficeConnection(8100);
		try
		{
			// 连接
			con.connect();
		} catch (ConnectException e)
		{
			System.out.println("获取OpenOffice连接失败...");
			e.printStackTrace();
		}
		// 创建转换器
		DocumentConverter converter = new OpenOfficeDocumentConverter(con);
		// 转换文档问html
		converter.convert(docFile, htmlFile);
		// 关闭openoffice连接
		con.disconnect();
		return htmlFile;
	}
	
	private static String toHtmlString(File docFile, String filepath)
	{
		// 转换word文档
		File htmlFile = convert(docFile, filepath);
		// 获取html文件流
		StringBuffer htmlSb = new StringBuffer();
		try
		{
			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(htmlFile), "GBK"));
			while (br.ready())
			{
				htmlSb.append(br.readLine());
			}
			br.close();
			// 删除临时文件
			htmlFile.delete();
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		// HTML文件字符串
		String htmlStr = htmlSb.toString();
		// return htmlStr;
		// 返回经过清洁的html文本
		return clearFormat(htmlStr, filepath);
	}
	
	private static Map<String, File> convert(Map<String, File> modelFileKeyAndExcelFile, String filepath)
	{
		//
		Map<String, File> modelFileKeyAndHtmlFile = new HashMap<String, File>();
		
		// 创建Openoffice连接
		OpenOfficeConnection con = new SocketOpenOfficeConnection(8100);
		try
		{
			// 连接
			con.connect();
		} catch (ConnectException e)
		{
			System.out.println("获取OpenOffice连接失败...");
			e.printStackTrace();
		}
		// 创建转换器
		DocumentConverter converter = new OpenOfficeDocumentConverter(con);
		// 转换文档问html
		Set<String> keySet = modelFileKeyAndExcelFile.keySet();
		Iterator<String> ite = keySet.iterator();
		while (ite.hasNext())
		{
			String modelFileKey = ite.next();
			File htmlFile = new File(filepath + "/" + new Date().getTime() + ".html");
			converter.convert(modelFileKeyAndExcelFile.get(modelFileKey), htmlFile);
			modelFileKeyAndHtmlFile.put(modelFileKey, htmlFile);
		}
		// 关闭openoffice连接
		con.disconnect();
		return modelFileKeyAndHtmlFile;
	}
	
	private static Map<String, String> toHtmlString(Map<String, File> modelFileKeyAndExcelFile, String filepath)
	{
		
		Map<String, String> modelFileKeyAndHtmlStr = new HashMap<String, String>();
		
		// 将excel文件转换成html文件
		Map<String, File> ModelFileKeyAndHtmlFiles = convert(modelFileKeyAndExcelFile, filepath);
		
		Set<String> set = ModelFileKeyAndHtmlFiles.keySet();
		Iterator<String> ite = set.iterator();
		while (ite.hasNext())
		{
			String modelFileKey = ite.next();
			File htmlFile = ModelFileKeyAndHtmlFiles.get(modelFileKey);
			// 获取html文件流
			StringBuffer htmlSb = new StringBuffer();
			try
			{
				BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(htmlFile), "GBK"));
				while (br.ready())
				{
					htmlSb.append(br.readLine());
				}
				br.close();
				// 删除临时文件
				htmlFile.delete();
				
				// HTML文件字符串
				String htmlStr = htmlSb.toString();
				
				// 返回经过清洁的html文本
				htmlStr = clearFormat(htmlStr, filepath);
				modelFileKeyAndHtmlStr.put(modelFileKey, htmlStr);
			} catch (Exception e)
			{
				throw new DDDException(e.getMessage());
			}
		}
		return modelFileKeyAndHtmlStr;
	}
	
	
	/**
	 * 清除一些不需要的html标记
	 * 
	 * @param htmlStr
	 *            带有复杂html标记的html语句
	 * @return 去除了不需要html标记的语句
	 */
	private static String clearFormat(String htmlStr, String docImgPath)
	{
		// 获取body内容的正则
		/*
		 * if (bodyMatcher.find()) { // 获取BODY内容，并转化BODY标签为DIV htmlStr =
		 * bodyMatcher.group().replaceFirst("<BODY", "<DIV")
		 * .replaceAll("</BODY>", "</DIV>"); }
		 */
		// 调整图片地址
		htmlStr = htmlStr.replaceAll("<IMG SRC=\"", "<IMG SRC=\"" + "imgTemp\\" + "/");
		// 把<P></P>转换成</div></div>保留样式
		// content = content.replaceAll("(<P)([^>]*>.*?)(<\\/P>)",
		// "<div$2</div>");
		// 把<P></P>转换成</div></div>并删除样式
		/*
		 * htmlStr = htmlStr.replaceAll("(<P)([^>]*)(>.*?)(<\\/P>)",
		 * "<p$3</p>");
		 */
		// 删除不需要的标签
		/*
		 * htmlStr = htmlStr .replaceAll(
		 * "<[/]?(font|FONT|span|SPAN|xml|XML|del|DEL|ins|INS|meta|META|[ovwxpOVWXP]:\\w+)[^>]*?>"
		 * , "");
		 */
		// 删除不需要的属性
		/*
		 * htmlStr = htmlStr .replaceAll(
		 * "<([^>]*)(?:lang|LANG|class|CLASS|style|STYLE|size|SIZE|face|FACE|[ovwxpOVWXP]:\\w+)=(?:'[^']*'|\"\"[^\"\"]*\"\"|[^>]+)([^>]*)>"
		 * , "<$1$2>");
		 */
		return htmlStr;
	}
	
	
	/**
	 * 根据properties文件的绝对路径读取文件并以Map<String,Object>格式返回
	 * @param filePath 文件的绝对路径
	 * @returnMap<String,Object>
	 */
	public Map<String,Object> getMapFromProperties(String filePath)
	{
		Map<String,Object> map = new HashMap<String,Object>();
		InputStream in;
		try
		{
			in = new BufferedInputStream(new FileInputStream(new File(filePath)));
			Properties properties = new Properties();
			properties.load(in);
			Set<Object> set=properties.keySet();
			Iterator<Object> iterator=set.iterator();
			while (iterator.hasNext())
			{
				String key=(String)iterator.next();
				map.put(key, properties.get(key));
			}
			
			return map;
		}
		catch (Exception e)
		{
			e.printStackTrace();
		} 
		
		return null;
	}
	
	
	/**
	 * 从接口获取数据并处理参数
	 * 于ReportFormAction的reportFormPreviewByInterface方法中使用
	 * @return
	 */
	public Map<String, Object> generateDataFromInterface(String modelFileKey,Map<String,Object> params,String templateFileName)
	{
		//处理文件的得到绝对路径名称
		String propertiesFileName = templateFileName.replaceFirst(".xls", ".properties");
		
		//通过判断是否有properties文件来判断是否是要加载参数
		if(!new File(propertiesFileName).exists())//如果文件不存在
		{
			return params;
		}
		else//文件存在,则需要通过接口读取数据
		{
			//properties文件中的信息转为Map格式
			Map<String,Object> interfaceConfigMap = getMapFromProperties(propertiesFileName);
			
			//把interfaceConfigMap放入params中,在参数处理时【generalMethodArgs方法】使用
			params.put("interfaceConfigMap", interfaceConfigMap);
			
			//需要调用的接口名称
			String interfaceName = (String)interfaceConfigMap.get("interfaceName");
			String interfaceMethodName = (String)interfaceConfigMap.get("interfaceMethodName");
			
			try
			{
				//利用反射进行处理
				Class<?> interfaceClass = Class.forName(interfaceName);
				Object interfaceInstance = interfaceClass.newInstance();
				
				//预调用方法参数的类型信息
				Class<?>[] paramsClass = getMethodParamTypes(interfaceClass,interfaceMethodName);
				
				Method interfaceMethod = interfaceClass.getDeclaredMethod(interfaceMethodName,paramsClass);
				
				//方法调用是要使用的参数
				Object[] interfaceArgs = generalMethodArgs(params,interfaceMethod,paramsClass);
				
				//从接口中获取的数据
				Map<String,Object> interfaceDataMap = (Map<String, Object>) interfaceMethod.invoke(interfaceInstance,interfaceArgs);
				
				//参数需要的是collection格式,将interfaceDataMap准换为可用的格式,并放入params中
				Set interfaceData = new HashSet();
				interfaceData.add(interfaceDataMap);
				params.put("interfaceData", interfaceData);
				
				return params;
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
		}
		
		return params;
	}
	
	/**
	 * 根据相应配置文件,处理参数,把参数按照相应的类型转换为Obect[]
	 * 供invoke时使用
	 * @param params
	 * @return Object[]
	 */
	public Object[] generalMethodArgs(Map<String,Object> params,Method interfaceMethod,Class<?>[] paramsClass)
	{
		//得到配置文件的信息
		Map<String,Object> interfaceConfigMap = (Map<String, Object>) params.get("interfaceConfigMap");
		
		//方法要使用的参数的个数
		Integer iterfaceMethodArgsNumber = Integer.parseInt((String) interfaceConfigMap.get("iterfaceMethodArgsNumber"));
		Object[] paramsObject = new Object[iterfaceMethodArgsNumber];
		Type[] types = interfaceMethod.getGenericParameterTypes();
		
		for(int i=0;i<iterfaceMethodArgsNumber;i++)
		{
			String arg = (String)interfaceConfigMap.get("arg"+i);
			
			//参数优先级  如果前台传来相同的参数，则使用前台的参数。
			if(params.get("arg"+i)!=null&&!params.get("arg"+i).equals("")){
				arg=(String)params.get("arg"+i);
			}
			
			Type type = types[i];
			
			paramsObject[i] = valueJudgeTypeAndTransform(type, arg);
		}
		return paramsObject;
	}
	
	
	/**
	 * 根据方法名称取得反射方法的参数类型(没有考虑同名重载方法)
	 * @param obj         类实例  
	 * @param methodName  方法名
	 * @return
	 * @throws ClassNotFoundException
	 */
	public static Class<?>[] getMethodParamTypes(Class<?> classInstance,String methodName) throws ClassNotFoundException
	{
	    Class<?>[] paramTypes = null;
	    Method[]  methods = classInstance.getDeclaredMethods();//得到全部方法
	    for (int i = 0; i<methods.length; i++) 
	    {
	        if(methodName.equals(methods[i].getName()))//和传入方法名匹配 
	        {
	            Class<?>[] params = methods[i].getParameterTypes();
	            paramTypes = new Class[params.length];
	            for (int j = 0; j<params.length; j++) 
	            {
	            	if(params[j].getName().equals("long"))
	            		paramTypes[j] = long.class;
	            	else if(params[j].getName().equals("int"))
	            		paramTypes[j] = int.class;
	            	else if(params[j].getName().equals("float"))
	            		paramTypes[j] = float.class;
	            	else if(params[j].getName().equals("double"))
	            		paramTypes[j] = double.class;
	            	else if(params[j].getName().equals("boolean"))
	            		paramTypes[j] = boolean.class;
	            	else if(params[j].getName().equals("char"))
	            		paramTypes[j] = char.class;
	            	else
	            		paramTypes[j] = Class.forName(params[j].getName());
	            }
	            break; 
	        }
	    }
		return paramTypes;
	}
	
	/**
	 * 根据field的声明类型,把value转换为相应类型
	 * @param field
	 * @param value
	 */
	public static Object valueJudgeTypeAndTransform(Type type, String value)
	{
		if(type.toString().equals("int"))
			return Integer.parseInt(value);
		else if(type.toString().equals("long"))
			return Long.parseLong(value);
		else if(type.toString().equals("float"))
			return Float.parseFloat(value);
		else if(type.toString().equals("double"))
			return Double.parseDouble(value);
		else if(type.toString().equals("boolean"))
			return Boolean.parseBoolean(value);
		else
		{
			Class<?> typeClazz = (Class<?>) type;
			
			try{
				Constructor<?> constructor = typeClazz.getDeclaredConstructor(String.class);
				Object transformedValue = constructor.newInstance(value);
				
				return transformedValue;
			}
			catch (Exception e){
				e.printStackTrace();
			}
		}
		return null;
	}
	
}
