package ddd.simple.service.model.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;
import com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException;

import ddd.base.annotation.ColumnInfo;
import ddd.base.dbmanager.TableGenerator;
import ddd.base.dbmanager.tableHandler.TableHandler;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.SessionFactory;
import ddd.base.persistence.baseEntity.Entity;
import ddd.base.persistence.baseEntity.EntityClass;
import ddd.base.persistence.pkManager.PrimaryKey;
import ddd.base.persistence.pkManager.PrimaryKeyService;
import ddd.simple.dao.listview.DataSourceDao;
import ddd.simple.dao.listview.ReportViewDao;
import ddd.simple.dao.model.ModelDao;
import ddd.simple.entity.listview.DataSource;
import ddd.simple.entity.listview.DisplayAttribute;
import ddd.simple.entity.listview.ReportView;
import ddd.simple.entity.model.Model;
import ddd.simple.entity.model.ModelItem;
import ddd.simple.entity.model.ModelJointUnique;
import ddd.simple.service.billCode.BillCodeService;
import ddd.simple.service.dynamicForm.DynamicFormService;
import ddd.simple.service.listview.DataSourceService;
import ddd.simple.service.listview.ReportViewService;
import ddd.simple.service.model.ModelAndDyFormService;
import ddd.simple.service.model.ModelJointUniqueService;
import ddd.simple.service.model.ModelService;
import ddd.simple.service.model.extend.ModelExtInterface;
import ddd.simple.util.model.CreateModelEntityClass;

@Service
public class ModelServiceBean implements ModelService
{
	
	@Resource(name = "modelDaoBean")
	private ModelDao modelDao;
	
	@Resource(name = "reportViewDaoBean")
	private ReportViewDao reportViewDao;
	
	@Resource(name = "dataSourceDaoBean")
	private DataSourceDao dataSourceDao;
	
	@Resource(name = "dynamicFormServiceBean")
	private DynamicFormService dynamicFormService;
	
	@Resource(name = "reportViewServiceBean")
	private ReportViewService reportViewService;
	
	@Resource(name = "dataSourceServiceBean")
	private DataSourceService dataSourceService;
	
	@Resource(name = "modelAndDyFormServiceBean")
	private ModelAndDyFormService modelAndDyFormService;
	
	@Resource(name = "primaryKeyServiceBean")
	private PrimaryKeyService primaryKeyService;
	
	@Resource(name = "modelJointUniqueServiceBean")
	private ModelJointUniqueService modelJointUniqueService;
	
	@Resource(name = "billCodeServiceBean")
	private BillCodeService billCodeService;
	
	
	private ModelExtInterface modelExtend;
	
	public ModelExtInterface getModelExtend()
	{
		return modelExtend;
	}
	
	public void setModelExtend(ModelExtInterface modelExtend)
	{
		this.modelExtend = modelExtend;
	}
	
	/**
	 * 保存模型
	 * 
	 * @param model
	 * @return
	 */
	public Model saveModel(Model model)
	{
		try
		{
			this.validateModel(model);
			modelAndDyFormService.dealModelItem(model);
			if (model.getEId() == null)
			{
				model.setState(Model.STATE_SAVE);
			}
			if (model.getEId() != null && !model.getEId().equals("0"))
			{
				model = this.modelDao.update(model);
			} else
			{
				model = this.modelDao.save(model);
				
			}
			
			EntitySet<ModelJointUnique> modelJointUniques = model.getJointUnique();
			if (modelJointUniques != null && !modelJointUniques.isEmpty())
			{
				for (ModelJointUnique modelJointUnique : modelJointUniques)
				{
					modelJointUnique.setModel(model);
					this.modelJointUniqueService.updateModelJointUnique(modelJointUnique);
				}
			}
			
			return model;
		} catch (java.sql.BatchUpdateException e)
		{
			Pattern a = Pattern.compile("^Duplicate entry '(.*)' for key '(.*)'$");
			Matcher m = a.matcher(e.getMessage());
			String input, keyName;
			if (m.find())
			{
				input = m.group(1);
				keyName = m.group(2);
				throw new DDDException("键【" + keyName + "】,值【" + input + "】已存在!");
			} else
			{
				throw new DDDException("saveModel", e.getMessage(), e);
			}
		} catch (DDDException e)
		{
			throw e;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("saveModel", e.getMessage(), e);
		}
	}
	
	public Model updateModel(Model model)
	{
		try
		{
			Model updateModel = this.findModelById(model.getEId());
			updateModel.setModelForm(model.getModelForm());
			return this.modelDao.updateModel(updateModel);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("updateModel", e.getMessage(), e);
		}
	}
	
	/**
	 * 
	 * @Title: submitModel
	 * @Description: 提交模型 处理：表结构，模型项，表单，数据源，视图,(首次处理模块，权限)
	 * @param model
	 * @param isIndependent
	 * @return void
	 */
	public void submitModel(Model model)
	{
		try
		{
			if (model.getEId() == null && this.modelDao.findModelByEnglishName(model.getModelEnglishName()) == null)
			{
				model.setEId(SessionFactory.getNewPrimarykey("model"));
			} else if (model.getState() != null && !Model.STATE_SAVE.equals(model.getState()))
			{
				this.clearOldIndex(model); // 清除索引
			}
			
			Map<String, Object> publicParams = new HashMap<String, Object>();
			if (this.modelExtend != null)
			{
				this.modelExtend.beforeSubmitModel(model, publicParams);
			}
			this.createDbTable(model); // 创建表
			this.submitModelSelfDo(model); // 提交模型
			this.addUnique(model); // 添加联合唯一索引
			if (this.modelExtend != null)
			{
				this.modelExtend.afterSubmitModel(model, publicParams);
			}
		} catch (java.sql.BatchUpdateException e)
		{
			Pattern a = Pattern.compile("^Duplicate entry '(.*)' for key '(.*)'$");
			Matcher m = a.matcher(e.getMessage());
			String input, keyName;
			if (m.find())
			{
				input = m.group(1);
				keyName = m.group(2);
				throw new DDDException("键【" + keyName + "】,值【" + input + "】已存在!");
			} else
			{
				throw new DDDException("saveModel", e.getMessage(), e);
			}
		} catch (DDDException e)
		{
			throw e;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("submitModel", e.getMessage(), e);
		}
	}
	
	/**
	 * 
	 * @author 胡兴
	 * @since 2015年12月12日 下午9:42:50
	 * @Title: submitModelSelfDo
	 * @Description: 默认行为
	 * @param model
	 * @throws Exception
	 * @return void
	 */
	private void submitModelSelfDo(Model model) throws Exception
	{
		boolean isFirstSave = this.modelDao.findModelByEnglishName(model.getModelEnglishName()) == null;
		model.setState(Model.STATE_SUBMIT);
		
		// 第一次提交
		if (isFirstSave)
		{
			this.validateModel(model);
		}
		
		modelAndDyFormService.dealModelItem(model);
		
		// 创建表单
		modelAndDyFormService.creatForm(model);
		
		if (isFirstSave)
		{
			this.modelDao.save(model);
		}
		
		// 生成模型对应的数据源和模块视图
		this.dealDataSourceAndListView(model);
		
		if (!isFirstSave)
		{
			this.modelDao.update(model);
		}
		
		EntitySet<ModelJointUnique> modelJointUniques = model.getJointUnique();
		if (modelJointUniques != null && !modelJointUniques.isEmpty())
		{
			for (ModelJointUnique modelJointUnique : modelJointUniques)
			{
				modelJointUnique.setModel(model);
				this.modelJointUniqueService.updateModelJointUnique(modelJointUnique);
			}
		}
	}
	
	
	private void addUnique(Model model) throws DDDException
	{
		Set<String> allTables = SessionFactory.getTableHandler().getDbTables();
		EntitySet<ModelJointUnique> modelJointUniques = model.getJointUnique();
		if (modelJointUniques.isEmpty())
			return;
		for (String name : allTables)
		{
			if (name.equalsIgnoreCase(model.getModelEnglishName()))
			{
				ArrayList<String> addSqls = new ArrayList<String>();
				
				for (ModelJointUnique jointUnique : modelJointUniques)
				{
					EntitySet<ModelItem> modelItems = jointUnique.getModelItems();
					if (!modelItems.isEmpty())
					{
						StringBuilder sql = new StringBuilder();
						sql.append("ALTER TABLE ");
						sql.append(model.getModelEnglishName());
						sql.append(" ADD CONSTRAINT ");
						sql.append(jointUnique.getName());
						sql.append(" UNIQUE (");
						for (ModelItem modelItem : modelItems)
						{
							sql.append(modelItem.getModelItemEnglishName());
							sql.append(", ");
						}
						sql.deleteCharAt(sql.lastIndexOf(","));
						sql.append(")");
						addSqls.add(sql.toString());
					}
				}
				try{
					SessionFactory.getThreadSession().executeSqls(addSqls);
				}catch(MySQLIntegrityConstraintViolationException e){
					Pattern pt = Pattern.compile("Duplicate entry '([\\s\\S]+?)' for key '([\\s\\S]+?)'");
					Matcher mt = pt.matcher(e.getMessage());
					String value = "";
					String uniqueName = "";
					if(mt.find()){
						value = mt.group(1);
						uniqueName = mt.group(2);
					}
					if(!"".equals(value) && !"".equals(uniqueName)){
						throw new DDDException("联合唯一索引【"+uniqueName+"】构建失败！\n含重复值【"+value+"】");
					}
				}catch(DDDException e){
					throw e;
				}catch(Exception e){
					throw new DDDException(e);
				}
				return;
			}
		}
	}
	
	private void clearOldIndex(Model model) throws Exception
	{
		EntitySet<ModelJointUnique> modelJointUniques = this.modelJointUniqueService.findModelJointUniqueByModelId(model.getEId());
		for (ModelJointUnique modelJointUnique : modelJointUniques)
		{
			StringBuilder sql = new StringBuilder();
			sql.append("DROP INDEX ");
			sql.append(modelJointUnique.getName());
			sql.append(" ON ");
			sql.append(model.getModelEnglishName());
			try
			{
				SessionFactory.getThreadSession().excuteSql(sql.toString(), new Object[0]);
			} catch (MySQLSyntaxErrorException e)
			{
				/* 说明该索引不存在，不作处理，继续循环 */
				e.printStackTrace();
			}
		}
	}
	
	
	public Model publishModel(Model model)
	{
		try
		{
			// this.validateModel(model);
			// modelAndDyFormService.dealModelItem(model);
			Model updateModel = this.findModelById(model.getEId());
			updateModel.setState(Model.STATE_PUBLISH);
			return this.modelDao.update(updateModel);
			
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("publishModel", e.getMessage(), e);
		}
	}
	
	public Model cancelPublishModel(Model model)
	{
		try
		{
			// this.validateModel(model);
			// modelAndDyFormService.dealModelItem(model);
			Model updateModel = this.findModelById(model.getEId());
			updateModel.setState(Model.STATE_SUBMIT);
			return this.modelDao.update(updateModel);
			
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("cancelPublishModel", e.getMessage(), e);
		}
	}
	
	/**
	 * 
	 * @Title: dealDataSourceAndListView
	 * @Description: 更新模型的数据源和模块视图
	 * @param newModel
	 * @return
	 * @return String
	 */
	private void dealDataSourceAndListView(Model newModel)
	{

		try
		{
			// 判断视图、数据源是否存在 存在则删除
			String key = newModel.getModelEnglishName();
				
			// 删除视图
			ReportView orReportView = this.reportViewService.findReportViewByKey(key);
			if (orReportView != null && orReportView.getEId() != null)
			{
				this.reportViewService.deleteReportView(orReportView.getEId());
			}
			
			// 删除数据源
			DataSource orDataSource = this.dataSourceService.findDataSourceByCode(key);
			if (orDataSource != null && orDataSource.getEId() != null)
			{
				this.dataSourceService.deleteDataSource(orDataSource.getEId());
			}
			
			//创建数据源sql
			StringBuilder sql = this.createDataSourceSql(newModel);
			
			DataSource dataSource = new DataSource();
			dataSource.setDataSourceCode(key);
			
			dataSource.setDataSourceName(newModel.getModelName() + "数据源");
			dataSource.setReportSql(sql.toString());
			dataSource = this.dataSourceService.saveDataSource(dataSource);
			
			// 新建视图
			ReportView reportView = new ReportView();
			reportView.setDataSource(dataSource);
			reportView.setReportViewName(newModel.getModelName() + "视图");
			reportView.setReportViewKey(key);
			reportView.setDisplayAttributes(this.createDisplayAttributesByModelIterms(newModel.getModelItems()));
			reportView = this.reportViewService.addReportView(reportView);
			
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("生成数据源和视图失败!");
		}
	}
	
	private StringBuilder createDataSourceSql(Model model){
		StringBuilder sql = new StringBuilder();
		sql.append("select EId,");
		EntitySet<ModelItem> items = model.getModelItems();
		Boolean hasSubmitPerson = false;
		for (ModelItem item : items)
		{
			if("submitPerson".equals(item.getModelItemEnglishName()))
				hasSubmitPerson = true;
			if(!"subTable".equals(item.getDatatype())){
				sql.append(item.getModelItemEnglishName());
				sql.append(",");
			}
		}
		sql.deleteCharAt(sql.lastIndexOf(","));
		sql.append(" from " + model.getModelEnglishName());
		sql.append(" where 1=1 ");
		
		// 前提：必须有模型项submitPerson
		// 目的：使得每个人只能看到自己提交的新闻
		// 方法：通过memberId 因为前后台都会有memberId
		if(hasSubmitPerson){
			sql.append("#if(${param.notEmpty(${loginMemberId})}) and submitPerson = ${loginMemberId} ");
			sql.append("#elseif(${param.notEmpty(${loginOpeId})}) and submitPerson in ( select EId from member where employeeId in ( select employeeId from operator where EId = ${loginOpeId}) ) #end  ");
		}
		return sql;
	}
	
	/**
	 * 
	 * @Title: createDisplayAttributesByModelIterms
	 * @Description: 设置视图的可显示列
	 * @param modelItems
	 * @return
	 * @return EntitySet<DisplayAttribute>
	 */
	private EntitySet<DisplayAttribute> createDisplayAttributesByModelIterms(EntitySet<ModelItem> modelItems)
	{
		EntitySet<DisplayAttribute> displayAttributes = new EntitySet<DisplayAttribute>();
		
		Iterator<ModelItem> iterator = modelItems.iterator();
		
		int columnIndex = 0;
		while (iterator.hasNext())
		{// 遍历
			ModelItem modelItem = (ModelItem) iterator.next();
			if ("subTable".equals(modelItem.getDatatype()))
				continue;
			if ("foreignKey".equals(modelItem.getDatatype()))
				continue;
			DisplayAttribute attribute = new DisplayAttribute();
			if ("typeId".equals(modelItem.getModelItemEnglishName()))
			{
				attribute.setAttributeName("typeName");
				attribute.setAttributeValue("类别");
				attribute.setCssArrtribute("width:100,text-align:'left'");
			} else
			{
				attribute.setAttributeName(modelItem.getModelItemEnglishName());
				attribute.setAttributeValue(modelItem.getModelItemName());
				attribute.setCssArrtribute("width:100,text-align:'left'");
			}
			if (modelItem.getDatatype() == "datetime")
				attribute.setShowType("YYYY/MM/DD");
			else if (modelItem.getDatatype() == "text")
			{
				JSONObject jsonObject = JSONObject.parseObject(modelItem.getRelatedParameters());
				if ("number".equals(jsonObject.getString("dataType")))
				{
					attribute.setShowType("#,###");
				} else
				{
					attribute.setShowType("文本");
				}
			} else
				attribute.setShowType("文本");
			attribute.setColumnIndex(columnIndex++);
			
			displayAttributes.add(attribute);
		}
		
		return displayAttributes;
	}
	
	private String createDbTable(Model model) throws ClassNotFoundException, SQLException, Exception
	{
		Set<String> allTables = SessionFactory.getTableHandler().getDbTables();
		String waitAddTableName = model.getModelEnglishName();
		for (String tableName : allTables)
		{
			if (tableName.equalsIgnoreCase(waitAddTableName))
			{
				System.out.println(model.getModelEnglishName()+ "表已存在！执行更新表的操作！");
				return this.updateDbTable(model);
			}
		}
		EntityClass<? extends Entity> entityClass = CreateModelEntityClass.create(model);
		TableHandler tableHandler = SessionFactory.getTableHandler();
		String createSql = tableHandler.createTable(entityClass);
		List<String> sqls = new ArrayList<String>();
		sqls.add(createSql);
		Map<String, ColumnInfo> one2ManyFieldColumnInfos = entityClass.getOne2ManyFieldColumnInfos();
		for (String key : one2ManyFieldColumnInfos.keySet())
		{
			String sql = tableHandler.createMiddleTable(one2ManyFieldColumnInfos.get(key));
			sqls.add(sql);
		}
		one2ManyFieldColumnInfos.clear();
		SessionFactory.getThreadSession().executeSqls(sqls);
		SessionFactory.addDynamicEntityClass(entityClass);
		
		return model.getModelEnglishName();
	}
	
	private String updateDbTable(Model model) throws Exception
	{
		EntityClass<? extends Entity> entityClass = CreateModelEntityClass.create(model);
		TableHandler tableHandler = SessionFactory.getTableHandler();
		
		Set<String> tables = tableHandler.getDbTables();
		List<String> sqls = new ArrayList<String>();
		Map<String, ColumnInfo> one2ManyFieldColumnInfos = entityClass.getOne2ManyFieldColumnInfos();
		for (String key : one2ManyFieldColumnInfos.keySet())
		{
			ColumnInfo columnInfo = one2ManyFieldColumnInfos.get(key);
			if (!ignoreCaseContains(tables, columnInfo.getJoinTableName()))
			{
				String sql = tableHandler.createMiddleTable(columnInfo);
				sqls.add(sql);
			}
			
		}
		SessionFactory.getThreadSession().executeSqls(sqls);
		one2ManyFieldColumnInfos.clear();
		
		Set<EntityClass<? extends Entity>> entityClasses = new HashSet<EntityClass<? extends Entity>>();
		entityClasses.add(entityClass);
		TableGenerator.generator(tableHandler, entityClasses);
		SessionFactory.addDynamicEntityClass(entityClass);
		
		return model.getModelEnglishName();
	}
	
	private static boolean ignoreCaseContains(Collection<String> strs, String str)
	{
		for (String string : strs)
		{
			if (string.equalsIgnoreCase(str))
			{
				return true;
			}
		}
		return false;
	}
	
	/**
	 * 
	 * @Title: deleteModel
	 * @Description: 删除模型
	 * 				
	 * @param model
	 * @return
	 * @return Map<String,Object>
	 */
	public int deleteModel(Model model) throws DDDException
	{
		try
		{
			Map<String, Object> publicParams = new HashMap<String, Object>();
			model = this.modelDao.findModelById(model.getEId());
			if (this.modelExtend != null)
			{
				this.modelExtend.beforeDeleteModel(model, publicParams);
			}
			EntitySet<ModelJointUnique> modelJointUniques = model.getJointUnique();
			if (modelJointUniques != null || !modelJointUniques.isEmpty())
			{
				for (ModelJointUnique modelJointUnique : modelJointUniques)
				{
					this.modelJointUniqueService.deleteModelJointUnique(modelJointUnique.getEId());
				}
			}
			int num = this.deleteModelSelfDo(model);
			try
			{
				this.deleteModelTable(model);
			} catch (Exception e)
			{
				/* 删除表 不存在 直接不处理 */
				e.printStackTrace();
			}
			if (this.modelExtend != null)
			{
				this.modelExtend.afterDeleteModel(model, publicParams);
			}
			return num;
		} catch (DDDException e)
		{
			throw e;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("删除失败!");
		}
		
	}
	
	/**
	 * 
	 * @author 胡兴
	 * @since 2015年12月12日 下午9:59:38
	 * @Title: deleteModelSelfDo
	 * @Description: 公共处理 删除视图和数据源
	 * @param model
	 * @return
	 * @throws Exception
	 * @return int
	 */
	private int deleteModelSelfDo(Model model) throws Exception
	{
		try
		{
			//删除模型自动编码
			this.billCodeService.deleteBillCodeBytableName(model.getModelEnglishName());

			model = this.findModelById(model.getEId());
			EntitySet<Model> childs = this.modelDao.findModelByParentId(model.getEId());
			if (childs != null && !childs.isEmpty())
			{
				String message = "该模型含有子模型【";
				for (Model child : childs)
				{
					message += child.getModelEnglishName() + ",";
				}
				message = message.substring(0, message.length() - 1) + "】";
				throw new DDDException(message);
			}
			String state = model.getState();
			if (state.equals(Model.STATE_SUBMIT))
			{
				ReportView modelReportView = this.reportViewDao.findReportViewByKey(model.getModelEnglishName());
				DataSource modelDataSource = this.dataSourceDao.findDataSourceByCode(model.getModelEnglishName());
				
				// 删除视图
				if (modelReportView != null)
				{
					this.reportViewService.deleteReportView(modelReportView.getEId());
				}
				
				// 删除数据源
				if (modelDataSource != null)
				{
					this.dataSourceService.deleteDataSource(modelDataSource.getEId());
				}
			}
			return this.modelDao.delete(model);
			
		} catch (DDDException e)
		{
			throw e;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("删除失败!");
		}
	}
	
	/**
	 * @Title: deleteModelTable
	 * @Description:删除模型对应的表
	 * @param model
	 * @throws DDDException
	 * @return int
	 */
	public int deleteModelTable(Model model) throws DDDException
	{
		try
		{
			// 该方法未确定，删除一个表成功后返回值为0，但不确定其他情况返回值。
			int delResult = this.modelDao.deleteModelTable(model);
			
			int num = -1;
			if (delResult >= 0)
			{
				num = 1;
				PrimaryKey primaryKey = this.primaryKeyService.findPrimaryKeyByTableName(model.getModelEnglishName());
				if (primaryKey != null)
				{
					num = this.primaryKeyService.deletePrimaryKey(primaryKey.getEId());
				}
			}
			return num;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("删除表失败!");
		}
	}
	
	private void validateModel(Model model)
	{
		EntitySet<ModelItem> modelItems = model.getModelItems();
		ArrayList<Long> indexList = new ArrayList<Long>();
		ArrayList<String> EnglishNames = new ArrayList<String>();
		for (ModelItem modelItem : modelItems)
		{
			
			// 验证英文名+中文名
			String EnglishName;
			if (modelItem.getModelItemEnglishName() == null)
			{
				modelItems.remove(modelItem);
			} else if (EnglishNames.contains(modelItem.getModelItemEnglishName()))
			{
				EnglishName = modelItem.getModelItemEnglishName() + "Repeat";
				modelItem.setModelItemEnglishName(EnglishName);
				EnglishNames.add(EnglishName);
			} else if (modelItem.getModelItemName() == null)
			{
				modelItem.setModelItemName(modelItem.getModelItemEnglishName());
			}
			
			// 验证displayIndex
			long index;
			if (modelItem.getDisplayIndex() == null)
			{
				if (!indexList.isEmpty())
				{
					Collections.sort(indexList);
					index = indexList.get(indexList.size() - 1) + 1;
					modelItem.setDisplayIndex(index);
					indexList.add(index);
				} else
				{
					index = 1;
					modelItem.setDisplayIndex(index);
					indexList.add(index);
				}
			} else if (indexList.contains(modelItem.getDisplayIndex()))
			{
				Collections.sort(indexList);
				index = indexList.get(indexList.size() - 1) + 1;
				modelItem.setDisplayIndex(index);
				indexList.add(index);
			} else
			{
				index = modelItem.getDisplayIndex();
				indexList.add(index);
			}
			
			if (modelItem.getIsContribute() == null)
			{
				modelItem.setIsContribute("否");
			}
			if (modelItem.getIsInherited() == null)
			{
				modelItem.setIsInherited("否");
			}
			if (modelItem.getIsMustItem() == null)
			{
				modelItem.setIsMustItem("否");
			}
			if (modelItem.getIsSearchCriteria() == null)
			{
				modelItem.setIsSearchCriteria("否");
			}
			if (modelItem.getIsSort() == null)
			{
				modelItem.setIsSort("否");
			}
			if (modelItem.getIsUse() == null)
			{
				modelItem.setIsUse("否");
			}
		}
		model.setModelItems(modelItems);
	}
	
	public Model findModelById(Long modelId)
	{
		try
		{
			Model model = this.modelDao.findModelById(modelId);
			return model;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModelById", e.getMessage(), e);
		}
	}
	
	public EntitySet<Model> findAllModel()
	{
		try
		{
			return this.modelDao.findAllModel();
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findAllModel", e.getMessage(), e);
		}
	}
	
	public Model findModelByEnglishName(String englishName)
	{
		try
		{
			return this.modelDao.findModelByEnglishName(englishName);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModelByEnglishName", e.getMessage(), e);
		}
	}
	
	public String[] findPropertiesName(String tableName)
	{
		
		String selectColumes = "SELECT m.modelItemEnglishName propertiesName FROM modelitem m,model m2 WHERE m.modelId= m2.EId AND m2.modelEnglishName='"
				+ tableName + "'";
				
		Set<Map<String, Object>> Columes = null;
		try
		{
			Columes = this.modelDao.query(selectColumes);
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		
		String[] properties = new String[Columes.size()];
		int index = 0;
		if (Columes != null && Columes.size() > 0)
		{
			for (Map<String, Object> colume : Columes)
			{
				properties[index++] = colume.get("propertiesName").toString();
			}
		}
		return properties;
	}
	
	/**
	 * 预览表单
	 */
	public String previewForm(Model model)
	{
		return this.modelAndDyFormService.previewForm(model);
	}
	
	/**
	 * 根据编辑后的表单同步模型项数据
	 */
	public void synchronousModelItem(List<Map<String, Object>> configs, String dynamicFormKey)
	{
		Model model = findModelByModelForm(dynamicFormKey);
		if (model == null)
		{
			return;
		}
		Model newModel = updateModelItems(model, configs);// 根据表单数据更改模型项数据
		try
		{
			this.modelDao.update(newModel);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("updateModel", e.getMessage(), e);
		}
	}
	
	public Model findModelByModelForm(String dynamicFormKey)
	{
		try
		{
			Model model = this.modelDao.findModelByModelForm(dynamicFormKey);
			if (model != null)
			{
				model.getModelItems();
			}
			return model;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModelByModelForm", e.getMessage(), e);
		}
	}
	
	public Set<Map<String, Object>> getWorkflowProcess()
	{
		try
		{
			return this.modelDao.getWorkflowProcess();
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getWorkflowProcess", e.getMessage(), e);
		}
	}
	
	/**
	 * 通过编辑动态表单同步模型项数据
	 * 
	 * @param model
	 * @param dynamicForm
	 * @return
	 */
	public Model updateModelItems(Model model, List<Map<String,Object>> configs)
	{
		// 获取模型的所有模型项
		EntitySet<ModelItem> modelItems = model.getModelItems();
		
		// 遍历configs与所有模型项，更新模型项参数
		for (Map<String, Object> config : configs)
		{
			String bundle = config.get("bundle").toString();
			String component = config.get("component").toString();
			if("radio".equals(component)||"checkbox".equals(component)||"select".equals(component))
			{
				this.convertDataSource(config);
			}
			for (ModelItem modelItem : modelItems)
			{
				if (bundle.equals(modelItem.getModelItemEnglishName()))
				{
					config.remove("itemHtml");
					Map<String, Object> relatedParameters = JSONObject.parseObject(modelItem.getRelatedParameters());
					relatedParameters.putAll(config);
					modelItem.setRelatedParameters(relatedParameters.toString());
					modelItem.setModelItemName(config.get("label").toString());
				}
			}
			
		}
		return model;
	}
	
	public void convertDataSource(Map<String,Object> config)
	{
		List<Map<String,Object>> dataSourceList = (List<Map<String,Object>>)config.get("dataSource");
		
		String dataSouceString = "";
		for (int i = 0; i < dataSourceList.size(); i++) 
		{
			
			Map<String,Object> dataMap = dataSourceList.get(i);
			
			dataSouceString += "选项名："+dataMap.get("name")+"，";
			dataSouceString += "选项值："+dataMap.get("value")+"，";
			dataSouceString += "默认选项："+dataMap.get("isDefaultValue")+"\n";
		}
		dataSouceString = dataSouceString.replace("true", "是");
		dataSouceString = dataSouceString.replace("false", "否");
		config.put("dataSource", dataSouceString);
	}

	@Override
	public EntitySet<Model> getSubmitedModel() {
		try
		{
			EntitySet<Model> models = this.modelDao.getSubmitedModel();
			for (Model model : models) {
				model = modelDao.findModelById(model.getEId());
			}
			return models;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getSubmitedModel", e.getMessage(), e);
		}
	}
}
