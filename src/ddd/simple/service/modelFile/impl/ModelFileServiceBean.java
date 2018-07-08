package ddd.simple.service.modelFile.impl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;

import ddd.base.Config;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.util.SpringContextUtil;
import ddd.simple.dao.modelFile.ModelFileDao;
import ddd.simple.dao.permission.ModuleDao;
import ddd.simple.entity.modelFile.ModelFile;
import ddd.simple.entity.modelFile.StatsReport;
import ddd.simple.entity.permission.LoginUser;
import ddd.simple.entity.permission.Module;
import ddd.simple.entity.permission.Operator;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.codeTable.CodeTableService;
import ddd.simple.service.codeTable.CodeTypeService;
import ddd.simple.service.modelFile.ModelFileService;
import ddd.simple.service.systemConfig.SystemConfigService;

@Service
public class ModelFileServiceBean extends BaseService implements ModelFileService
{

	@Resource(name="modelFileDaoBean")
	private ModelFileDao modelFileDao;
	
	@Resource(name="codeTypeServiceBean")
	private CodeTypeService codeTypeService;
	
	@Resource(name="codeTableServiceBean")
	private CodeTableService codeTableService;
	
	@Resource(name="moduleDaoBean")
	private ModuleDao moduleDao ;
	
	@Resource(name = "systemConfigServiceBean")
	private SystemConfigService	systemConfigService;
	
	@Override
	public ModelFile saveModelFile(ModelFile modelFile) 
	{
		try {
			ModelFile result = this.modelFileDao.saveModelFile(modelFile);
			//如果这个modelFile的类型是报表的话，默认创建一个属于当前modelFile所对应的模板存放文件夹
			if(("报表".equals(modelFile.getType())) && (modelFile.getModelKey() != null)) {
				generateModelFilePath(modelFile, false, false);
			}
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveModelFile", e.getMessage(), e);
		}
	}
	
	/**
	 * 创建模板文件为报表时对应高级检索的模板文件的存在文件夹，或者读取模板文件
	 * @param modelFile, needUpdateOldFile 是否需要更新模板文件, isFromGet 是否来自查找方法，用于获取文件模板,为以后编辑做扩展准备，用于前台编辑提供接口
	 * @author 成大大
	 */
	private void generateModelFilePath(ModelFile modelFile, boolean needUpdateOldFile, boolean isFromGet) {
		try {
			String 
			modelFileFilterTpl 		= Config.get("modelFileFilterTpl"),
			resourcePath			= modelFileFilterTpl + "resource/",
			modelFileFilterTplPath 	= modelFileFilterTpl + modelFile.getModelKey(),
			htmlFileComment 		= FileUtils.readFileToString(new File(resourcePath + "html.html"), "utf-8"), 
			jsFileComment 			= FileUtils.readFileToString(new File(resourcePath + "js.js"), "utf-8"), 
			cssFileComment			= FileUtils.readFileToString(new File(resourcePath + "css.css"), "utf-8");
			
			File file = new File(modelFileFilterTplPath);
			File htmlFile = new File(modelFileFilterTplPath + "/html.html");
			File jsFile = new File(modelFileFilterTplPath + "/js.js");
			File cssFile = new File(modelFileFilterTplPath + "/css.css");
			
			//创建图表相关得模板文件路径和文件，此处没有考虑前台和更新相关的情况
			if(modelFile.getWithChart() > 1) {
				String 
				chartTplPath = modelFileFilterTplPath + "/chartpl",
				htmlComment  = FileUtils.readFileToString(new File(resourcePath + "chartpl/html.html"), "utf-8"), 
				jsComment 	 = FileUtils.readFileToString(new File(resourcePath + "chartpl/js.js"), "utf-8"), 
				cssComment	 = FileUtils.readFileToString(new File(resourcePath + "chartpl/css.css"), "utf-8");
				File chart = new File(chartTplPath);
				File html = new File(chartTplPath + "/html.html");
				File js = new File(chartTplPath + "/js.js");
				File css = new File(chartTplPath + "/css.css");
				
				if(!chart.exists() || !(html.exists() && js.exists() && css.exists())) {
					FileUtils.forceMkdir(chart);
					FileUtils.writeStringToFile(html, htmlComment, "utf-8", false);
					FileUtils.writeStringToFile(js, jsComment, "utf-8", false);
					FileUtils.writeStringToFile(css, cssComment, "utf-8", false);
				}
			}
			if(file.exists() && (htmlFile.exists() && jsFile.exists() && cssFile.exists()) && isFromGet) {
				JSONObject json = new JSONObject();
				json.put("html", FileUtils.readFileToString(htmlFile, "utf-8"));
				json.put("js", FileUtils.readFileToString(jsFile, "utf-8"));
				json.put("css", FileUtils.readFileToString(cssFile, "utf-8"));
				modelFile.setRemark(json.toJSONString());
				return;
			}
			if(file.exists() && (htmlFile.exists() && jsFile.exists() && cssFile.exists())) {
				if(needUpdateOldFile) {
					JSONObject json = JSONObject.parseObject(modelFile.getRemark());
					htmlFileComment 	+= json.getString("html");
					jsFileComment 		+= json.getString("js");
					cssFileComment 		+= json.getString("css");
				}else{
					modelFile.setRemark(null);
					return;
				}
			}
			
			FileUtils.writeStringToFile(htmlFile, htmlFileComment, "utf-8", false);
			FileUtils.writeStringToFile(jsFile, jsFileComment, "utf-8", false);
			FileUtils.writeStringToFile(cssFile, cssFileComment, "utf-8", false);
			modelFile.setRemark(null);
		} catch (IOException e) {
			System.err.println("创建模板文件为报表时对应高级检索的模板文件的存在文件夹失败，请检测配置文件，config.properties中的配置项modelFileFilterTpl\n"
					+ e.getMessage());
			e.printStackTrace();
			return;
		} 
	}

	@Override
	public int deleteModelFile(Long modelFileId) {
		try {
			return this.modelFileDao.deleteModelFile(modelFileId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteModelFile", e.getMessage(), e);
		}
		
	}

	@Override
	public ModelFile updateModelFile(ModelFile modelFile) {
		try {
			//如果这个modelFile的类型是报表的话，默认创建一个属于当前modelFile所对应的模板存放文件夹
			if(("报表".equals(modelFile.getType())) && (modelFile.getModelKey() != null)) {
				generateModelFilePath(modelFile, false, false);
			}
			return this.modelFileDao.updateModelFile(modelFile);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateModelFile", e.getMessage(), e);
		}
	}

	@Override
	public ModelFile findModelFileById(Long modelFileId) {
		try {
			return this.modelFileDao.findModelFileById(modelFileId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findModelFileById", e.getMessage(), e);
		}
	}
	
	@Override
	public ModelFile findModelFileByKey(String key) {
		try {
			return this.modelFileDao.findModelFileByKey(key);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findModelFileById", e.getMessage(), e);
		}
	}
	
	public EntitySet<ModelFile> findModelFileByType(String type){
		try {
			return this.modelFileDao.findModelFileByType(type);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findModelFileByType", e.getMessage(), e);
		}
		
	}
	
	
	@Override
	public EntitySet<ModelFile> findAllModelFile() {
		try{
			return this.modelFileDao.findAllModelFile();
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllModelFile", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<ModelFile>  findAllReportForm(Integer count){
		
		try{
			if(count == null || count < 0){
				count = 5;
			}
			
			String moduleCode = this.systemConfigService.findSystemConfigValueBykey("reportPermissionModule");
			if (moduleCode == null || moduleCode.equals(""))
			{
				moduleCode = "000200110001";
			}
			Module module = moduleDao.findModulesByCode(moduleCode);
			
			if(module == null){
				throw new DDDException("在查找报表时出错，没有找到级次编码为"+moduleCode+"的模块，请重新配置reportPermissionModule系统参数，或添加模块");
			}
			
			BaseService bs =(BaseService)SpringContextUtil.getBean("baseService");
			LoginUser loginUser = bs.getLoginUser();
			if( loginUser == null){
				throw new DDDException("获取loginuser出错，当前没有用户登录");
			}
			Operator operator = bs.getLoginUser().getLoginOperator();
			if (operator == null){
				throw new DDDException("获取当前登录人员出错");
			}
			Long loginOperatorId =operator.getEId();
			
			String where =  "  permission IN (  " +
					 "  SELECT DISTINCT  " +
						 "  p. CODE  " +
					 " FROM " +
						 " permission p " +
					 " LEFT JOIN role_permissions r ON r.permissionEId = p.EId " +
					 " LEFT JOIN operatorandrole o ON o.roleId = r.roleEId " +
					 " WHERE " +
						 " p.moduleId =  " +module.getEId()+
					 " AND o.operatorId =  " +loginOperatorId+
				 " ) and rownum <= " +count;
			return this.modelFileDao.query(where, ModelFile.class);
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllModelFile", e.getMessage(), e);
		}
		
	}
	
	
	/**
	 * 要求模板文件的类型是报表
	 * 码表中报表的value必须是报表
	 */
	@Override
	public List<StatsReport> getAllReportFormGroupByType(){
		
		//Map<String,EntitySet<ModelFile>> result = new HashMap<String,EntitySet<ModelFile>>();
		List<StatsReport> result = new ArrayList<StatsReport>();
		
		//找到所有类型为报表的modelfile
		EntitySet<ModelFile> allReportModelFile = this.findModelFileByType("报表");
		if(allReportModelFile == null){
			return null;
		}
		//再根据category对报表进行分类
		Iterator<ModelFile> ite = allReportModelFile.iterator();
		while(ite.hasNext()){
			ModelFile modelFile = ite.next();
			String category = modelFile.getCategory();
			StatsReport stats = this.findStatsReportByName(category, result);
			if(stats == null){
				stats = new StatsReport();
				stats.setName(category);
				stats.addModelFile(modelFile);
				result.add(stats);
			}else{
				stats.addModelFile(modelFile);
			}
			
		}
		return result;
	}
	
	private StatsReport findStatsReportByName(String name,List<StatsReport> statsReports){
		for(int i=0;i<statsReports.size();i++){
			StatsReport statsReport = statsReports.get(i);
			if(name.equals(statsReport.getName())){
				return statsReport;
			}
		}
		return null;
	}

}
