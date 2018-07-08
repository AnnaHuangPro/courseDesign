package ddd.simple.service.workflow;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;

import org.activiti.engine.FormService;
import org.activiti.engine.HistoryService;
import org.activiti.engine.ManagementService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.form.FormProperty;
import org.activiti.engine.form.FormType;
import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.history.HistoricDetail;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricTaskInstanceQuery;
import org.activiti.engine.history.HistoricVariableUpdate;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.model.Model;
import ddd.simple.entity.permission.Operator;
import ddd.simple.entity.workflow.CheckOption;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.model.ModelDataService;
import ddd.simple.service.model.ModelItemService;
import ddd.simple.service.model.impl.ModelServiceBean;
import ddd.simple.service.permission.OperatorService;
import ddd.simple.service.systemConfig.SystemConfigService;
import ddd.simple.service.workflow.extend.DynamicFormServiceExtInterface;

/**
 * 动态FormController
 *
 * @author gx
 */
@Service
public class DynamicFormService extends BaseService
{
	
	@Resource(name = "baseDao")
	private BaseDao baseDao;
	
	@Resource(name = "formService")
	private FormService formService;
	
	@Resource(name = "taskService")
	private TaskService taskService;
	
	@Resource(name = "historyService")
	private HistoryService historyService;
	
	@Resource(name = "runtimeService")
	private RuntimeService runtimeService;
	
	@Resource(name = "managementService")
	private ManagementService managementService;
	
	@Resource(name = "checkOptionServiceBean")
	private CheckOptionService checkOptionService;
	
	@Resource(name = "repositoryService")
	private RepositoryService repositoryService;
	
	@Resource(name = "modelServiceBean")
	private ModelServiceBean modelService;
	
	@Resource(name = "modelDataServiceBean")
	private ModelDataService modelDataService;
	
	@Resource(name = "modelItemServiceBean")
	private ModelItemService modelItemService;
	
	@Resource(name="operatorServiceBean")
	private OperatorService operatorService;
	
	@Resource(name="systemConfigServiceBean")
	private SystemConfigService systemConfigService;
	
	private DynamicFormServiceExtInterface extendBean;
	
	public DynamicFormServiceExtInterface getExtendBean() {
		return extendBean;
	}

	public void setExtendBean(DynamicFormServiceExtInterface extendBean) {
		this.extendBean = extendBean;
	}

	/**
	 * 读取Task的表单
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> findTaskForm(String taskId)
	{
		try
		{
			Map<String, Object> result = new HashMap<String, Object>();
			Task task = this.taskService.createTaskQuery().taskId(taskId).singleResult();
			
			String processInstanceId = task.getProcessInstanceId();
			Object formRoute = this.runtimeService.getVariable(processInstanceId, "表单路由");
			Object entityId = this.runtimeService.getVariable(processInstanceId, "实体Id");
			Object entityName = this.runtimeService.getVariable(processInstanceId, "对应表名");
			result.put("formId", entityId);
			result.put("formType", entityName);
			result.put("formRoute", formRoute);
			
			TaskFormData taskFormData = this.formService.getTaskFormData(taskId);
			if (taskFormData == null)
			{
				return result;
			} else
			{
				result.put("formKey", taskFormData.getFormKey());
			}
			Map<String, Object> formKeyData = this.baseDao.query(Long.parseLong(entityId.toString()), entityName.toString());
			
			// Map<String, Object> formKeyData =
			// this.modelDataService.findModelDataByContentId(entityName.toString(),
			// Long.parseLong(entityId.toString()));
			result.put("formKeyData", formKeyData);
			
			String executionId = task.getExecutionId();
			List<FormProperty> formProperties = taskFormData.getFormProperties();
			for (int i = 0; i < formProperties.size(); i++)
			{
				FormProperty formProperty = formProperties.get(i);
				this.runtimeService.getVariable(executionId, formProperty.getName());
			}
			
			List<DDDDynamicFormObject> dddDynamicFormObjects = new ArrayList<DynamicFormService.DDDDynamicFormObject>();
			for (FormProperty formProperty : formProperties)
			{
				FormType formType = formProperty.getType();
				if (formType != null)
				{
					DDDDynamicFormObject dddDynamicFormObject = new DDDDynamicFormObject();
					dddDynamicFormObject.name = formProperty.getName();
					dddDynamicFormObject.field = formProperty.getId();
					dddDynamicFormObject.writable = formProperty.isWritable();
					dddDynamicFormObject.readable = formProperty.isReadable();
					dddDynamicFormObject.defauleVaule = formProperty.getValue();
					
					if ("enum".equals(formType.getName()))
					{
						if (formProperty.getName() != null && formProperty.getName().contains("审批结果"))
						{
							Map enums = (Map) formProperty.getType().getInformation("values");
							dddDynamicFormObject.defauleVaule = this.getDefauleValue(enums);
							dddDynamicFormObject.value = this.getEnumS(enums);
						}
						
						if (formProperty.getName() != null && formProperty.getName().contains("审批意见"))
						{
							dddDynamicFormObject.defauleVaule = "";
						}
						
						if (formProperty.getName() != null && formProperty.getName().contains("支付处理"))
						{
							dddDynamicFormObject.defauleVaule = "分公司处理";
						}
						if (formProperty.getName() != null && formProperty.getName().contains("密级"))
						{
							dddDynamicFormObject.defauleVaule = "公开";
							dddDynamicFormObject.value = "公开.秘密.机密.绝密";
						}
						/*
						 * Map<String, String> value = (Map<String, String>)
						 * formType.getInformation("values");
						 * dddDynamicFormObject.value = value;
						 * dddDynamicFormObject.value = "同意.不同意.驳回";
						 */
					} else
					{
						String value = formProperty.getValue();
						dddDynamicFormObject.value = value;
					}
					
					dddDynamicFormObject.type = formType.getName();
					
					dddDynamicFormObjects.add(dddDynamicFormObject);
				}
			}
			
			result.put("dddDynamicFormObjects", dddDynamicFormObjects);
			return result;
		} catch (Exception e)
		{
			DDDException dddException = new DDDException("读取任务的表单出错，原因：" + e.getMessage(), e);
			throw dddException;
		}
	}
	
	private String getDefauleValue(Map enums)
	{
		Set<Map.Entry<String, String>> entrySet = enums.entrySet();
		for(Entry<String, String> entry : entrySet){
			return entry.getValue();
		}
		
		return "同意";
	}
	
	//得到工作流任务节点的枚举类型
	private String getEnumS(Map enums)
	{
		String enumValues = "";
		Set<Map.Entry<String, String>> entrySet = enums.entrySet();
		for (Entry<String, String> entry : entrySet) {
			String value = entry.getValue();
			if(value != null && !"".equals(value))
			{
				enumValues += value+".";
			}
		}
		if("".equals(enumValues))
		{
			enumValues = "同意.不同意.驳回";
		}
		else
		{
			enumValues = enumValues.substring(0, enumValues.length()-1);
		}
		
		return enumValues;
	}
	
	/**
	 * 读取HistoryTask的表单
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> findHistoryTaskInfoForm(String processInstanceId)
	{
		try
		{
			Map<String, Object> result = new HashMap<String, Object>();
			List<HistoricDetail> historicDetails = this.historyService.createHistoricDetailQuery().processInstanceId(processInstanceId)
					.list();
					
			Object formRoute = null, entityId = null, entityName = null;
			
			for (HistoricDetail historicDetail : historicDetails)
			{
				
				HistoricVariableUpdate variable = (HistoricVariableUpdate) historicDetail;
				System.out.println("variable: " + variable.getVariableName() + " = " + variable.getValue());
				if (variable.getVariableName().equals("表单路由"))
				{
					formRoute = variable.getValue();
				} else if (variable.getVariableName().equals("实体Id"))
				{
					entityId = variable.getValue();
				} else if (variable.getVariableName().equals("对应表名"))
				{
					entityName = variable.getValue();
				}
			}
			result.put("formId", entityId);
			result.put("formType", entityName);
			result.put("formRoute", formRoute);
			
			Map<String, Object> formKeyData = this.baseDao.query(Long.parseLong(entityId.toString()), entityName.toString());
			result.put("formKeyData", formKeyData);
			
			return result;
		} catch (Exception e)
		{
			DDDException dddException = new DDDException("读取任务的表单出错，原因：" + e.getMessage(), e);
			throw dddException;
		}
	}
	
	/**
	 * 先签收任务
	 * 再完成任务
	 * @throws Exception 
	 */
	public boolean submitTask(String taskId, Map<String,Object> entityVar, HashMap parameterMap, HashMap taskDetailInfo) throws Exception
	{
		try
		{
			Task task = this.taskService.createTaskQuery().taskId(taskId).singleResult();
			if("".equals(task.getAssignee()))
			{
				throw new DDDException("提交任务失败（原因：已经有人签收任务）");
			}
			else
			{
				claimAtQueued(taskId);//签收任务
				boolean result = completeTask(taskId,entityVar,parameterMap,taskDetailInfo);//完成任务
				return result;
			}
		} 
		catch (Exception e)
		{
			DDDException dddException = new DDDException("提交任务失败，原因：" + e.getMessage(), e);
			throw dddException;
		}
	}
	
	public boolean submitTask(String taskId, Map<String,Object> entityVar, HashMap parameterMap, HashMap taskDetailInfo,Long employeeId)
	{
		try
		{
			Task task = this.taskService.createTaskQuery().taskId(taskId).singleResult();
			if("".equals(task.getAssignee()))
			{
				throw new DDDException("提交任务失败（原因：已经有人签收任务）");
			}
			else
			{
				claimAtQueued(taskId,employeeId);//签收任务
				boolean result = completeTask(taskId,entityVar,parameterMap,taskDetailInfo);//完成任务
				return result;
			}
		}
		catch (Exception e)
		{
			DDDException dddException = new DDDException("提交任务失败，原因：" + e.getMessage(), e);
			throw dddException;
		}
	}
	
	/**
	 * @dscription 提交task的并保存form 提交task并保存审核结果和修改的审核内容
	 * @param taskId 任务ID
	 * @param parameterMap 内置表单数据
	 * @param taskDetailInfo 审核表单数据
	 * @return
	 * @throws Exception 
	 */
	public boolean completeTask(String taskId, Map<String,Object> entityVar, HashMap parameterMap, HashMap taskDetailInfo) throws Exception
	{
		if(this.extendBean != null&&"true".equals(String.valueOf(taskDetailInfo.get("isCallExtendBean")))){
			extendBean.beforeCompleteTask(taskId, entityVar, parameterMap, taskDetailInfo);
		}
		
		Map<String, Object> formProperties = new HashMap<String, Object>();
		
		Task task = this.taskService.createTaskQuery().taskId(taskId).singleResult();
		
		// 从request中读取参数然后转换
		Set<Map.Entry<String, Object>> entrySet = parameterMap.entrySet();
		
		for (Entry<String, Object> entry : entrySet)
		{
			String key = entry.getKey();
			
			// fp_的意思是form paremeter
			if (StringUtils.defaultString(key).startsWith("fp_"))
			{
				String name = key.split("_")[1];
				if (name.contains("审批结果"))
				{
					formProperties.put(task.getName() + "结果", entry.getValue());
					formProperties.put("当前审批人审批结果", entry.getValue());
				}
				if (name.contains("审批意见"))
				{
					formProperties.put(task.getName() + "意见", entry.getValue());
				}
				if (name.contains("密级"))
				{
					formProperties.put("密级", entry.getValue());
				}
			}
		}
		// 审核结果默认值
		String checkedResultName = task.getName() + "结果";
		if (formProperties.get(checkedResultName) == null)
		{
			formProperties.put(checkedResultName, "同意");
		}
		
		String processInstanceId = task.getProcessInstanceId();
		
		if(entityVar != null&&entityVar.size() > 0)
		{
			formProperties.putAll(entityVar);
		}
		// 将动态表单数据和实体数据保存到流程变量里
		saveToProcessVariable(processInstanceId, formProperties);
		// 保存审核结果
		saveCheckOption(processInstanceId, task);
		
		this.taskService.complete(taskId);
		return true;
	}
	
	private String isDDDComponentsDefaultString(Object value)
	{
		if (value == null || value.toString().length() == 0)
		{
			return "";
		}
		String valueString = value.toString();
		
		return valueString;
		
	}
	
	/**
	 * 批量提交task并保存form
	 */
	public boolean completeTasks(List<String> taskIds)
	{
		for (String taskId : taskIds)
		{
			HashMap parameterMap = new HashMap();
			Map<String, Object> taskForm = this.findTaskForm(taskId);
			List<DDDDynamicFormObject> dddDynamicFormObjects = (List<DDDDynamicFormObject>) taskForm.get("dddDynamicFormObjects");
			
			if (dddDynamicFormObjects != null)
			{
				for (int i = 0; i < dddDynamicFormObjects.size(); i++)
				{
					DDDDynamicFormObject dddDynamicFormObject = dddDynamicFormObjects.get(i);
					Object defaultVaule = dddDynamicFormObject.defauleVaule;
					// 如果动态表单不可读，则不显示
					if (dddDynamicFormObject.readable == false)
					{
						continue;
					}
					
					if (dddDynamicFormObject.name.contains("审核结果"))
					{
						parameterMap.put("fp_" + dddDynamicFormObject.name, "同意");
					} else if (dddDynamicFormObject.name.contains("审核意见"))
					{
						parameterMap.put("fp_" + dddDynamicFormObject.name, "同意");
					} else if (dddDynamicFormObject.name.contains("补签领导"))
					{
						continue;
					} else
					{
						String defaultVauleString = this.isDDDComponentsDefaultString(defaultVaule);
						parameterMap.put("fp_" + dddDynamicFormObject.name, defaultVauleString);
					}
				}
			}
			// this.completeTask(taskId, parameterMap);
		}
		return true;
	}
	
	/*private void saveModelDataHistory(JSONObject modelData,String tableName) throws Exception{
		if(checkModelDataContent(modelData, tableName)){
			Map<String,Object> params = new HashMap<String,Object>();
			Model model = this.modelService.findModelByEnglishName(tableName);
			
			String sql = "select max(version) from history where modelId='"+model.getEId()+"' and dataId='"+modelData.get("EId")+"'";
			Set<Map<String, Object>> set = this.baseDao.query(sql);
			Object selectObj = set.iterator().next().get("max(version)");
			if(selectObj != null){
				int version = (int) set.iterator().next().get("max(version)"); 
				params.put("version", version+1);
			}else{
				params.put("version",1);
			}
			
			//从modelData中找出longtext字段
			String longtextContent = getLongtextContent(model.getEId(),modelData);
			
			params.put("content", longtextContent);
			params.put("modelId", model.getEId());
			params.put("dataId",modelData.get("EId"));
			params.put("modifiedPerson", this.getRealName());
			params.put("modifiedTime", DateUtil.formatDateTime(new Date()));
			
			this.baseDao.save("history", params);
		}
		else{}
	}*/
	
	/*public String getLongtextContent(long modelId,Map<String,Object>modelData)
	{
		EntitySet<ModelItem>  modelItems = this.modelItemService.findModelItemsByModelId(modelId);
		Iterator<ModelItem> iter = modelItems.iterator();
		
		String content = ""; 
		while(iter.hasNext())
		{
			if(iter.next().getDatatype().equals("textarea"))
			{
				content = content + modelData.get(iter.next().getModelItemEnglishName()).toString(); 
			} 
			else{}
		}
		
		return content;
	}*/
	
	/**
	 * 保存本次审核人意见和审核结果
	 * 
	 * @param processInstanceId
	 *            流程实例Id
	 * @param task
	 *            任务
	 */
	private void saveCheckOption(String processInstanceId, Task task)
	{
		String userCode = this.getUserCode();
		String taskName = task.getName();
		String realName = this.getRealName();
		
		String checkOptionComment = (String)this.runtimeService.getVariable(processInstanceId, taskName + "意见");
		String checkOptionResult = (String)this.runtimeService.getVariable(processInstanceId, taskName + "结果");
		
		if (StringUtils.isEmpty(checkOptionComment) && "同意".equals(checkOptionResult))
		{
			checkOptionComment = "同意";
		}
		else if(StringUtils.isEmpty(checkOptionComment)  && "驳回".equals(checkOptionResult))
		{
			checkOptionComment = "驳回";
		}
		else if(StringUtils.isEmpty(checkOptionComment) && "不同意".equals(checkOptionResult))
		{
			checkOptionComment = "不同意";
		}
		
		CheckOption checkOption = new CheckOption();
		checkOption.setProcessInstanceId(processInstanceId);
		checkOption.setTaskName(realName+"审批 ");
		checkOption.setCheckTime(new Date());
		checkOption.setCheckResult(String.valueOf(checkOptionResult));
		checkOption.setManagerOption(String.valueOf(checkOptionComment));
		checkOption.setCheckPeople(userCode);
		checkOption.setAssigneePeople(task.getAssignee());
		checkOption.setDescription(task.getDescription());
		
		Object orgName = this.runtimeService.getVariable(processInstanceId, "organizationName");
		checkOption.setOrganizationName(orgName != null ? orgName.toString() : null);
		
		Long entityId = (Long) this.runtimeService.getVariable(processInstanceId, "实体Id");
		String classPath = (String) this.runtimeService.getVariable(processInstanceId, "对应表名");
		String formRoute = (String) this.runtimeService.getVariable(processInstanceId, "表单路由");
		
		checkOption.setFormId(entityId);
		checkOption.setFormType(classPath);
		checkOption.setFormRoute(formRoute);
		
		this.checkOptionService.saveCheckOption(checkOption);
	}
	
	/**
	 * 将动态表单的数据保存到流程变量里
	 * 
	 * @param processInstanceId
	 *            流程实例Id
	 * @param formDatas
	 *            表单数据
	 */
	private void saveToProcessVariable(String processInstanceId, Map<String, Object> formDatas)
	{
		Set<String> keySet = formDatas.keySet();
		
		for (Iterator<String> iterator = keySet.iterator(); iterator.hasNext();)
		{
			
			String processVariableName = iterator.next();
			Object processVariableValue = formDatas.get(processVariableName);
			this.runtimeService.setVariable(processInstanceId, processVariableName, processVariableValue);
		}
		this.runtimeService.setVariable(processInstanceId, "审批人信息", this.getLoginUser().findCurrentEmployee());
	}
	
	private String getUserCode(){
		Operator operator = this.getLoginUser().getLoginOperator();
		Member member = this.getLoginUser().getLoginVip();
		String userCode = member == null ? operator.getCode() : member.getInputCode();
		return userCode;
	}
	
	private String getRealName(){
		String realName = "";
		Operator operator = this.getLoginUser().getLoginOperator();
		Member member = this.getLoginUser().getLoginVip();
		if(operator!=null){
			realName = operator.getEmployee().getName();
		}else{
			realName = member.getName();
		}
		return realName;
	}
	/**
	 * 待办任务
	 */
	public Map<String, Object> findNonHandleTaskList(int startPage, int pageSize)
	{
		List<Map<String, Object>> tasks = new ArrayList<Map<String, Object>>();
		
		String userCode = this.getUserCode();
		
		int totalAssignee = (int) taskService.createTaskQuery().taskAssignee(userCode).count();
		int totalCandidateUser = (int) taskService.createTaskQuery().taskCandidateUser(userCode).count();
		int totalCandidateGroup = (int) taskService.createTaskQuery().taskCandidateGroup(userCode).count();
		int total = totalAssignee + totalCandidateUser + totalCandidateGroup;
		
		List<Task> taskList = new ArrayList<Task>();
		List<Task> assigneeTask = taskService.createTaskQuery().taskAssignee(userCode).orderByProcessInstanceId().desc().listPage(startPage, pageSize);
		List<Task> candidateUserTask = taskService.createTaskQuery().taskCandidateUser(userCode).orderByProcessInstanceId().desc().listPage(startPage, pageSize);
		List<Task> candidateGroupTask = taskService.createTaskQuery().taskCandidateGroup(userCode).orderByProcessInstanceId().desc().listPage(startPage, pageSize);
		
		taskList.addAll(assigneeTask);
		taskList.addAll(candidateUserTask);
		taskList.addAll(candidateGroupTask);
		
		
		for (int i = 0; i < taskList.size(); i++)
		{
			Task task = taskList.get(i);
			
			String processInstanceId = task.getProcessInstanceId();
			
			String emergencyStatus = (String) runtimeService.getVariable(processInstanceId, "紧急状态");
			if ("普通".equals(emergencyStatus))
			{
				task.setPriority(0);
			} else if ("紧急".equals(emergencyStatus))
			{
				task.setPriority(1);
			}
			tasks.add(this.formTaskToMap(task));
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("totalItems", total);
		result.put("result", tasks);
		return result;
	}
	
	public List<Task> findAssigneeTasks(String userCode, int startPage, int pageSize)
	{
		// 分配到当前登陆用户的任务
		return taskService.createTaskQuery().taskAssignee(userCode).listPage(startPage, pageSize);	
	}
	
	public List<Task> findCandidateTasks(String userCode, int startPage, int pageSize)
	{
		List<Task> allasks = new ArrayList<Task>();
		// 未签收的任务
		List<Task> candidateTasks = taskService.createTaskQuery().taskCandidateUser(userCode).listPage(startPage, pageSize);
		List<Task> candidateGroupTasks = taskService.createTaskQuery().taskCandidateGroup(userCode).listPage(startPage, pageSize);
		
		allasks.addAll(candidateTasks);
		allasks.addAll(candidateGroupTasks);
		return allasks;
	}
	
	/**
	 * 未办理任务列表
	 * 
	 * @param model
	 * @return
	 */
	// public List<Map<String, String>> findNonHandleTaskList() {
	//
	// Operator operator = this.getLoginUser().getLoginOperator();
	// String userCode = operator.getName();
	//
	// List<Map<String, String>> nonHandleTasks = new ArrayList<Map<String,
	// String>>();
	//
	// // 分配到当前登陆用户的未办理任务列表
	// List<Task> tasks =
	// taskService.createTaskQuery().taskAssignee(userCode).list();
	// for(int i=0;i<tasks.size();i++)
	// {
	// Map<String, String> map = new HashMap<String, String>();
	// map.put("taskId", tasks.get(i).getId());
	// map.put("name", tasks.get(i).getName());
	// map.put("description", tasks.get(i).getDescription());
	// nonHandleTasks.add(map);
	//
	// }
	// return nonHandleTasks;
	// }
	/**
	 * 未签收的任务列表
	 * 
	 * @return 未签收任务列表
	 *//*
	public Map<String,Object> findNonClaimTaskList(int startPage, int pageSize)
	{
		List<Map<String, Object>> tasks = new ArrayList<Map<String, Object>>();
		String userCode = this.getUserCode();
		
		List<Task> allNonClaimTasks = new ArrayList<Task>();
		// 未签收的任务
		List<Task> nonClaimTasks = this.taskService.createTaskQuery().taskCandidateUser(userCode).listPage(startPage, pageSize);
		List<Task> nonClaimGroupTasks = this.taskService.createTaskQuery().taskCandidateGroup(userCode).listPage(startPage, pageSize);
		allNonClaimTasks.addAll(nonClaimTasks);
		allNonClaimTasks.addAll(nonClaimGroupTasks);
		
		int taskCount = allNonClaimTasks.size();
		for (int i = 0; i < taskCount; i++)
		{
			Task task = allNonClaimTasks.get(i);
			if (null != task.getAssignee())
			{
				allNonClaimTasks.remove(i);
				taskCount--;
				i--;
			}
			else
			{
				tasks.add(this.formTaskToMap(task));
			}
		}
		
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("totalItems", taskCount);
		result.put("result", tasks);
		return result;
	}*/
	
	/**
	 * 已完成的任务列表
	 * 
	 * @return 已完成任务列表
	 */
	public Map<String, Object> findCompletedTaskList(int startPage, int pageSize)
	{
		String userCode = this.getUserCode();
		
		List<Map<String, Object>> historicTaskInstances = new ArrayList<Map<String, Object>>();
		
		List<HistoricTaskInstance> completedTasks = this.historyService.createHistoricTaskInstanceQuery().taskAssignee(userCode).processFinished()
				.orderByProcessInstanceId().desc().listPage(startPage, pageSize);
		long totalTasks = this.historyService.createHistoricTaskInstanceQuery().taskAssignee(userCode).processFinished().count();
		
		for (int i = 0; i < completedTasks.size(); i++)
		{
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("taskId", completedTasks.get(i).getId());
			map.put("name", completedTasks.get(i).getName());
			map.put("description", completedTasks.get(i).getDescription());
			map.put("processInstanceId", completedTasks.get(i).getProcessInstanceId());
			map.put("createTime", completedTasks.get(i).getCreateTime());
			map.putAll(getExtraAssistantVarsByHS(completedTasks.get(i).getProcessInstanceId()));
			
			historicTaskInstances.add(map);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("totalItems", totalTasks);
		result.put("result", historicTaskInstances);
		return result;
	}
	
	/**
	 * 已办任务
	 * 
	 * @return
	 */
	public Map<String, Object> findOperatedTaskList(int startPage, int pageSize)
	{
		String userCode = this.getUserCode();
		
		List<Map<String, Object>> historicTaskInstances = new ArrayList<Map<String, Object>>();
		List<HistoricTaskInstance> tasks = this.historyService.createHistoricTaskInstanceQuery().taskAssignee(userCode).orderByProcessInstanceId().desc().finished().listPage(startPage, pageSize);
		long totalTasks = this.historyService.createHistoricTaskInstanceQuery().taskAssignee(userCode).finished().count();
		
		String procInstId = "";
		for (int i = 0; i < tasks.size(); i++)
		{
			procInstId = tasks.get(i).getProcessInstanceId();
			Task task = this.taskService.createTaskQuery().processInstanceId(procInstId).singleResult();
			
			Map<String, Object> map = new HashMap<String, Object>();
			if (task != null)
			{
				map.put("taskId", task.getId());
			} else
			{
				map.put("taskId", tasks.get(i).getId());
			}
			map.put("name", tasks.get(i).getName());
			map.put("description", tasks.get(i).getDescription());
			map.put("processInstanceId", tasks.get(i).getProcessInstanceId());
			map.put("createTime", tasks.get(i).getCreateTime());
			map.putAll(getExtraAssistantVarsByHS(tasks.get(i).getProcessInstanceId()));
			historicTaskInstances.add(map);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("totalItems", totalTasks);
		result.put("result", historicTaskInstances);
		return result;
	}
	
	/**
	 * 我的任务
	 * 
	 * @param model
	 * @return
	 */
	public Map<String, Object> findOwnerTaskList(int startPage, int pageSize)
	{
		String userCode = this.getUserCode();
		List<Map<String, String>> ownerTasks = new ArrayList<Map<String, String>>();
		// 当前登陆用户的任务
		List<Task> tasks = taskService.createTaskQuery().taskOwner(userCode).orderByProcessInstanceId().desc().listPage(startPage, pageSize);
		for (int i = 0; i < tasks.size(); i++)
		{
			Map<String, String> map = new HashMap<String, String>();
			map.put("taskId", tasks.get(i).getId());
			map.put("name", tasks.get(i).getName());
			map.put("description", tasks.get(i).getDescription());
			ownerTasks.add(map);
			
		}
		
		long totalTasks = this.taskService.createTaskQuery().taskOwner(userCode).count();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("totalItems", totalTasks);
		result.put("result", ownerTasks);
		return result;
	}
	
	/**
	 * 未签收任务
	 * 
	 * @param model
	 * @return
	 */
	public List<Map<String, String>> findCandidateTaskList()
	{
		String userCode = this.getUserCode();
		List<Map<String, String>> candidateTasks = new ArrayList<Map<String, String>>();
		// taskService.createTaskQuery().taskOwner(arg0) 我的任务
		// 当前登陆用户未签收的任务
		List<Task> tasks = taskService.createTaskQuery().taskCandidateUser(userCode).list();
		for (int i = 0; i < tasks.size(); i++)
		{
			Map<String, String> map = new HashMap<String, String>();
			map.put("taskId", tasks.get(i).getId());
			map.put("name", tasks.get(i).getName());
			map.put("description", tasks.get(i).getDescription());
			candidateTasks.add(map);
			
		}
		return candidateTasks;
		
	}
	
	// 获取任务的相关信息
	public Map<String, Object> findTaskDetailById(String taskId)
	{
		
		// List<Task> tasks = taskService.createNativeTaskQuery().sql("SELECT *
		// FROM " + managementService.getTableName(Task.class) + " T WHERE T.ID_
		// = #{taskId}").parameter("taskId", taskId).list();
		Task task = this.taskService.createTaskQuery().taskId(taskId).singleResult();
        
		if (task == null)
		{
			return null;
		}
		
		Map<String, Object> map = this.formTaskToMap(task);
		
		Map<String, Object> taskMap = findTaskForm(taskId);
		map.putAll(taskMap);
		map.put("processName",getProcessName(task.getProcessInstanceId()));
		
		map.putAll(task.getProcessVariables());
		// events = this.taskService.getTaskEvents(taskId);
		return map;
		
	}
	
	
	/**
	 * @description 获取流程名
	 * @param processInstanceId
	 * @return
	 */
	public String getProcessName(String processInstanceId)
	{
		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        HistoricProcessInstance historicProcessInstance = historyService.createHistoricProcessInstanceQuery()
        		.processInstanceId(processInstanceId).singleResult();
        
        if (processInstance == null && historicProcessInstance == null) {
        	return null;
        }
		ProcessDefinitionEntity processDefinition = (ProcessDefinitionEntity) repositoryService
				.getProcessDefinition(processInstance == null ? historicProcessInstance
						.getProcessDefinitionId() : processInstance.getProcessDefinitionId());
		
		return processDefinition.getName();
	}
	
	/**
	 * 已完成任务详情
	 * 
	 * @param processInstanceId
	 * @return
	 */
	public Map<String, Object> findCompletedTaskDetailById(String taskId)
	{
		HistoricTaskInstance task = this.historyService.createHistoricTaskInstanceQuery().taskId(taskId).singleResult();
		if (task == null)
		{
			return null;
		}
		
		String processInstanceId = task.getProcessInstanceId();
		String formKey = task.getFormKey();
		
		Map<String, Object> map = this.formTaskInfoToMap(task);
		Map<String, Object> taskMap = this.findHistoryTaskInfoForm(processInstanceId);
		taskMap.put("formKey", formKey);
		taskMap.put("processName", getProcessName(task.getProcessInstanceId()));
		map.putAll(taskMap);
		
		return map;
	}
	
	/**
	 * 已办任务详情
	 * 
	 * @param taskId
	 * @return
	 */
	public Map<String, Object> findOperatedTaskDetailById(String taskId)
	{
		HistoricTaskInstance task = this.historyService.createHistoricTaskInstanceQuery().taskId(taskId).singleResult();
		String processInstanceId = task.getProcessInstanceId();
		ProcessInstance pi = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
		Map<String, Object> taskMap = new HashMap<String, Object>();
		
		if (task == null)
		{
			return null;
		}
		if (pi == null)
		{
			taskMap = this.findHistoryTaskInfoForm(processInstanceId);
		} else
		{
			taskMap = this.findTaskForm(taskId);
		}
		
		String formKey = task.getFormKey();
		Map<String, Object> map = this.formTaskInfoToMap(task);
		taskMap.put("formKey", formKey);
		taskMap.put("processName", getProcessName(task.getProcessInstanceId()));
		map.putAll(taskMap);
		return map;
	}
	
	//CMS待办任务搜索查询方法
	public Map<String,Object> findNonHandleTasksByCondition(int startPage, int pageSize, Map<String,Object> searchCondition)
	{

		List<Map<String, Object>> tasks = new ArrayList<Map<String, Object>>();
		
		String userCode = this.getUserCode();
		
		int total = 0;
		List<Task> taskList = new ArrayList<Task>();
		List<Task> candidateUserTask = new ArrayList<Task>();
		if("".equals(searchCondition.get("搜索查询值")))
		{
			candidateUserTask = taskService.createTaskQuery().taskCandidateUser(userCode)
					.processVariableValueEquals("搜索类型",searchCondition.get("搜索类型"))
					.orderByProcessInstanceId().desc().listPage(startPage, pageSize);
			total = (int)taskService.createTaskQuery().taskCandidateUser(userCode)
					.processVariableValueEquals("搜索类型",searchCondition.get("搜索类型"))
					.count();
		}
		else
		{
			candidateUserTask = taskService.createTaskQuery().taskCandidateUser(userCode)
					.processVariableValueEquals("搜索类型",searchCondition.get("搜索类型"))
					.processVariableValueLike("搜索查询值", "%" + searchCondition.get("搜索查询值").toString() + "%")
					.orderByProcessInstanceId().desc().listPage(startPage, pageSize);
			total = (int)taskService.createTaskQuery().taskCandidateUser(userCode)
					.processVariableValueEquals("搜索类型",searchCondition.get("搜索类型"))
					.processVariableValueLike("搜索查询值", "%" + searchCondition.get("搜索查询值").toString() + "%")
					.count();
		}
		
		taskList.addAll(candidateUserTask);
		
		for (int i = 0; i < taskList.size(); i++)
		{
			Task task = taskList.get(i);
			tasks.add(this.formTaskToMap(task));
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("totalItems", total);
		result.put("result", tasks);
		return result;
	}
	
	//CMS已办任务搜索查询方法
	public Map<String,Object> findOperatedTasksByCondition(int startPage, int pageSize, Map<String,Object> searchCondition)
	{
		String userCode = this.getUserCode();
		
		List<Map<String, Object>> historicTaskInstances = new ArrayList<Map<String, Object>>();
		
		long totalTasks = 0;
		List<HistoricTaskInstance> tasks = new ArrayList<HistoricTaskInstance>();
		
		HistoricTaskInstanceQuery hisTaskIntQuery = this.historyService.createHistoricTaskInstanceQuery().taskAssignee(userCode)
					.processVariableValueEquals("搜索类型",searchCondition.get("搜索类型"));
		
		if("".equals(searchCondition.get("搜索查询值")))
		{
			tasks = hisTaskIntQuery.orderByProcessInstanceId().desc().finished().listPage(startPage, pageSize);
			totalTasks = hisTaskIntQuery.finished().count();
		}
		else
		{
			tasks = hisTaskIntQuery.processVariableValueLike("搜索查询值", "%" + searchCondition.get("搜索查询值").toString() + "%")
					.orderByProcessInstanceId().desc().finished().listPage(startPage, pageSize);
			totalTasks = hisTaskIntQuery.processVariableValueLike("搜索查询值", "%" + searchCondition.get("搜索查询值").toString() + "%")
					.finished().count();
		}
		
		for (int i = 0; i < tasks.size(); i++)
		{
			HistoricTaskInstance historyTask = tasks.get(i);
			Task task = this.taskService.createTaskQuery().processInstanceId(historyTask.getProcessInstanceId()).singleResult();
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("taskId", task == null ? historyTask.getId() : task.getId());
			map.put("name", historyTask.getName());
			map.put("description", historyTask.getDescription());
			map.put("processInstanceId", historyTask.getProcessInstanceId());
			map.put("createTime", historyTask.getCreateTime());
			map.putAll(getExtraAssistantVarsByHS(historyTask.getProcessInstanceId()));
			historicTaskInstances.add(map);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("totalItems", totalTasks);
		result.put("result", historicTaskInstances);
		return result;
	}
	
	
	public Map<String,Object> findCompletedTaskByCondition(int startPage, int pageSize, Map<String,Object> searchCondition)
	{
		String userCode = this.getUserCode();
		
		List<Map<String, Object>> historicTaskInstances = new ArrayList<Map<String, Object>>();
		List<HistoricTaskInstance> completedTasks = new ArrayList<HistoricTaskInstance>();
		
		HistoricTaskInstanceQuery hisTaskInsQuery = this.historyService.createHistoricTaskInstanceQuery().taskAssignee(userCode)
				.processVariableValueEquals("搜索类型",searchCondition.get("搜索类型"));
		long totalTasks = 0;
		
		if("".equals(searchCondition.get("搜索查询值")))
		{
			completedTasks = hisTaskInsQuery.processFinished().orderByProcessInstanceId().desc().listPage(startPage, pageSize);
			totalTasks = hisTaskInsQuery.processFinished().count();
		}
		else{
			completedTasks = hisTaskInsQuery.processVariableValueLike("搜索查询值", "%" + searchCondition.get("搜索查询值").toString() + "%")
					.processFinished().orderByProcessInstanceId().desc().listPage(startPage, pageSize);
			totalTasks = hisTaskInsQuery.processVariableValueLike("搜索查询值", "%" + searchCondition.get("搜索查询值").toString() + "%")
					.processFinished().count();
		}
		
		for (int i = 0; i < completedTasks.size(); i++)
		{
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("taskId", completedTasks.get(i).getId());
			map.put("name", completedTasks.get(i).getName());
			map.put("description", completedTasks.get(i).getDescription());
			map.put("processInstanceId", completedTasks.get(i).getProcessInstanceId());
			map.put("createTime", completedTasks.get(i).getCreateTime());
			map.putAll(getExtraAssistantVarsByHS(completedTasks.get(i).getProcessInstanceId()));
			
			historicTaskInstances.add(map);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("totalItems", totalTasks);
		result.put("result", historicTaskInstances);
		return result;
	}
	/**
	 * 已处理但是未结束的任务列表(未用到)
	 * 
	 * @return
	 */
	public Set<Map<String, Object>> findCompletedAndNoFinishedTaskList(String checkPeople)
	{
		Set<Map<String, Object>> checkOptions = this.checkOptionService.findCheckOptionByCheckPeople(checkPeople);
		return checkOptions;
	}
	
	/**
	 * 签收任务
	 * 
	 * @param taskId
	 *            任务Id
	 */
	public void claim(String taskId)
	{
		String userCode = this.getUserCode();
		
		Task task = this.taskService.createTaskQuery().taskId(taskId).singleResult();
		
		Long formId = (Long) this.runtimeService.getVariable(task.getExecutionId(), "实体Id");
		String formType = (String) this.runtimeService.getVariable(task.getExecutionId(), "对应表名");
		
		Integer count = managementService.getTableCount().get("ACT_RU_IDENTITYLINK").intValue();
		List<Map<String, Object>> identityLinks = managementService.createTablePageQuery().tableName("ACT_RU_IDENTITYLINK")
				.listPage(0, count).getRows();
		String assigneePeople = "";
		for (int i = 0; i < identityLinks.size(); i++)
		{
			Map<String, Object> identityLink = identityLinks.get(i);
			String task_id = (String) identityLink.get("TASK_ID_");
			String type = (String) identityLink.get("TYPE_");
			
			if (task_id != null && type != null && task_id.equals(task.getId()) && type.equals("candidate"))
			{
				assigneePeople = assigneePeople + "," + (String) identityLink.get("USER_ID_");
			}
		}
		
		if (assigneePeople.length() > 0)
		{
			assigneePeople = assigneePeople.substring(1);
		}
		
		String processInstanceId = task.getProcessInstanceId();
		CheckOption checkOption = new CheckOption();
		checkOption.setProcessInstanceId(processInstanceId);
		checkOption.setTaskName(task.getName() + "-签收");
		checkOption.setCheckTime(new Date());
		checkOption.setCheckResult("签收成功");
		checkOption.setManagerOption("签收任务");
		checkOption.setCheckPeople(userCode);
		checkOption.setAssigneePeople(assigneePeople);
		checkOption.setFormId(formId);
		checkOption.setFormType(formType);
		checkOption.setDescription(task.getDescription());
		
		Object orgName = this.runtimeService.getVariable(processInstanceId, "organizationName");
		checkOption.setOrganizationName(orgName != null ? orgName.toString() : null);
		
		this.checkOptionService.saveCheckOption(checkOption);
		
		this.taskService.claim(taskId, userCode);
	}
	
	/**
	 * 签收在队列中的任务
	 * 
	 * @param taskId
	 *            任务Id
	 */
	public void claimAtQueued(String taskId)
	{
		
		String userCode = this.getUserCode();
		
		this.taskService.claim(taskId, userCode);
	}
	
	
	public void claimAtQueued(String taskId,Long employeeId)
	{
		Operator operator = this.operatorService.findOperatorByEmployeeId(employeeId);
		String userCode = "";
		
		if(operator != null){
			userCode = operator.getCode();	
			this.taskService.claim(taskId, userCode);
		}else{
			throw new DDDException("没有找到职员id为"+employeeId+" 对应的操作员");
		}
		
	}
	
	/**
	 * 运行中的流程实例
	 * 
	 * @param model
	 * @return
	 */
	public List<ProcessInstance> findRunningProcess()
	{
		List<ProcessInstance> processInstances = this.runtimeService.createProcessInstanceQuery().list();
		return processInstances;
	}
	
	/**
	 * 根据给定的参数查找运行中的流程实例
	 * 
	 * @param checkPeople
	 * @param startDate
	 * @param endDate
	 * @param organizationName
	 * @param managementItemName
	 * @return
	 */
	public List<ProcessInstance> findRunningProcessByParameters(String checkPeople, Date startDate, Date endDate, String organizationName,
			String managementItemName)
	{
		Set<Map<String, Object>> checkOptions = this.checkOptionService.findCheckOptionByParameters(checkPeople, startDate, endDate,
				organizationName, managementItemName);
		Set<String> sets = new HashSet<String>();
		for (Map<String, Object> checkOption : checkOptions)
		{
			sets.add(checkOption.get("processInstanceId").toString());
		}
		List<ProcessInstance> processInstances;
		if (sets.size() != 0)
		{
			processInstances = this.runtimeService.createProcessInstanceQuery().processInstanceIds(sets).list();
		} else
		{
			processInstances = null;
		}
		
		return processInstances;
	}
	
	/**
	 * 已结束的流程实例
	 * 
	 * @param model
	 * @return
	 */
	public List<HistoricProcessInstance> findFinishedProcess()
	{
		List<HistoricProcessInstance> historicProcessInstances = this.historyService.createHistoricProcessInstanceQuery().finished().list();
		return historicProcessInstances;
	}
	
	/**
	 * 挂起正在运行的流程
	 * 
	 * @param processInstanceId
	 *            流程实例Id
	 */
	public void suspendProcess(String processInstanceId)
	{
		this.runtimeService.suspendProcessInstanceById(processInstanceId);
	}
	
	/**
	 * 唤醒被挂起的流程
	 * 
	 * @param processInstanceId
	 *            流程实例Id
	 */
	public void activateProcess(String processInstanceId)
	{
		this.runtimeService.activateProcessInstanceById(processInstanceId);
	}
	
	/**
	 * 删除流程实例
	 * 
	 * @param processInstanceId
	 *            流程实例Id
	 * @param reason
	 *            删除原因
	 */
	public void deleteProcess(String processInstanceId, String reason)
	{
		this.runtimeService.deleteProcessInstance(processInstanceId, reason);
	}
	
	/**
	 * 根据流程执行Id获取流程变量
	 * 
	 * @param executionId
	 * @return
	 */
	public Map<String, Object> getVariablesByExecutionId(String executionId)
	{
		return this.runtimeService.getVariables(executionId);
	}
	
	/**
	 * 将任务对象转换为map
	 * 
	 * @param task
	 * @return
	 */
	private Map<String, Object> formTaskToMap(Task task)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("taskId", task.getId());
		map.put("assignee", task.getAssignee());
		map.put("description", task.getDescription());
		map.put("name", task.getName());
		map.put("owner", task.getOwner());
		map.put("processDefinitionId", task.getProcessDefinitionId());
		map.put("taskDefinitionKey", task.getTaskDefinitionKey());
		map.put("createTime", task.getCreateTime());
		map.put("dueDate", task.getDueDate());// 到期时间
		map.put("category", task.getCategory());
		map.put("processInstanceId", task.getProcessInstanceId());
		map.putAll(getExtraAssistantVarsByRTS(task.getProcessInstanceId()));
		
		return map;
	}
	
	//RTS:runtimeService
	public Map<String,Object> getExtraAssistantVarsByRTS(String processInstanceId)
	{
		Map<String,Object> varMap = new HashMap<String,Object>();
		
		String reApplyRoute = (String) runtimeService.getVariable(processInstanceId, "重新申请表单路由");
		String preCheckResult = (String) runtimeService.getVariable(processInstanceId, "当前审批人审批结果");
		Long entityId = (Long) runtimeService.getVariable(processInstanceId, "实体Id");
		String formType = (String) this.runtimeService.getVariable(processInstanceId, "对应表名");
		String searchType = (String)this.runtimeService.getVariable(processInstanceId, "搜索类型");
		String applyPerson = (String)this.runtimeService.getVariable(processInstanceId, "申请人");
		String modelDataId = String.valueOf(this.runtimeService.getVariable(processInstanceId, "模型数据ID"));
		String modelEnglishName = (String)this.runtimeService.getVariable(processInstanceId, "模型英文名称");
 		
		varMap.put("reApplyRoute", reApplyRoute);
		varMap.put("preCheckResult", preCheckResult);
		varMap.put("entityId", entityId);
		varMap.put("formType", formType);
		varMap.put("searchType", searchType);
		varMap.put("applyPerson", applyPerson);
		varMap.put("modelDataId", modelDataId);
		varMap.put("modelEnglishName", modelEnglishName);
		return varMap;
	}
	
	//HS:historyService
	public Map<String,Object> getExtraAssistantVarsByHS(String processInstanceId)
	{
		List<HistoricDetail> list = historyService.createHistoricDetailQuery().processInstanceId(processInstanceId).list();
		
		Map<String,Object> varMap = new HashMap<String,Object>();
		
		for(HistoricDetail historicDetail : list) {
			HistoricVariableUpdate variable = (HistoricVariableUpdate) historicDetail;
			switch(variable.getVariableName()){
				case "申请人":
					varMap.put("applyPerson", variable.getValue());
					break;
				case "模型数据ID":
					varMap.put("modelDataId", variable.getValue());
					break;
				case "模型英文名称":
					varMap.put("modelEnglishName", variable.getValue());
					break;
				default : 
					break;
			}
		}
		
		return varMap;
	}
	
	/**
	 * 更新modelData
	 * 
	 * @param taskDetailInfo
	 * @return
	 * @throws Exception 
	 *//*
	public void updateModelData(Map<String,Object> modelData,String tableName) throws Exception
	{
		try
		{
			this.modelDataService.updateModelData(tableName, modelData);
		}
		catch (DDDException e)
		{
			throw new DDDException(e);
		}
	}*/
	
	/**
	 * 检测modelData的内容是否修改
	 * 
	 * @param formKeyData
	 * @param tableName
	 * @return
	 */
	
	
	private Map<String, Object> formTaskInfoToMap(HistoricTaskInstance task)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("taskId", task.getId());
		map.put("assignee", task.getAssignee());
		map.put("description", task.getDescription());
		map.put("name", task.getName());
		map.put("owner", task.getOwner());
		map.put("processDefinitionId", task.getProcessDefinitionId());
		map.put("taskDefinitionKey", task.getTaskDefinitionKey());
		map.put("createTime", task.getCreateTime());
		map.put("dueDate", task.getDueDate());// 到期时间
		map.put("category", task.getCategory());
		map.put("processInstanceId", task.getProcessInstanceId());
		
		return map;
	}
	
	public Set<Map<String, Object>> getWorkflowProcess()
	{
		try
		{
			String where = "select MAX(VERSION_),KEY_,NAME_ from act_re_procdef group by NAME_, KEY_";
			return this.baseDao.query(where);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getWorkflowProcess", e.getMessage(), e);
		}
	}
	
	public boolean stopTask(String taskId){
		try{
			this.taskService.complete(taskId);
			return true;
		}
		catch(DDDException e)
		{
			throw new DDDException("stopTask",e.getMessage(),e);
		}
	}
	
	public class DDDDynamicFormObject
	{
		// 动态表单属性名称
		public String name;
		
		public String	field;
		// 动态表单属性值
		public Object	value;
		
		// 动态表单属性值类型（string,enum,date....）
		public String type;
		
		// 是否可读
		public boolean writable;
		
		// 是否可写
		public boolean readable;
		
		// 默认值
		public Object defauleVaule;
	}
	
	/**
	 * 分页查询未办理任务列表
	 * 
	 * @param model
	 * @return
	 */
	public List<Map<String, Object>> findNonHandleTaskListByPaging(int beginSize, int endSize)
	{
		String userCode = this.getUserCode();
		
		List<Map<String, Object>> tasks = new ArrayList<Map<String, Object>>();
		List<Task> nonHandleTasks = new ArrayList<Task>();
		
		// 分配到当前登陆用户的任务
		List<Task> assigneeTasks = taskService.createTaskQuery().taskAssignee(userCode).list();
		
		// 未签收的任务
		List<Task> candidateTasks = taskService.createTaskQuery().taskCandidateUser(userCode).list();
		
		nonHandleTasks.addAll(assigneeTasks);
		nonHandleTasks.addAll(candidateTasks);
		
		for (int i = beginSize; i < endSize && i < nonHandleTasks.size(); i++)
		{
			Task task = nonHandleTasks.get(i);
			
			String processInstanceId = task.getProcessInstanceId();
			
			String emergencyStatus = (String) runtimeService.getVariable(processInstanceId, "紧急状态");
			
			if ("普通".equals(emergencyStatus))
			{
				task.setPriority(0);
			} else if ("紧急".equals(emergencyStatus))
			{
				task.setPriority(1);
			}
			
			tasks.add(this.formTaskToMap(task));
		}
		
		return tasks;
	}
	
	public List<String> findModelsAndAuditedEntitiesName(){
		List<String> results = new ArrayList<String>();
		
		EntitySet<Model> models = this.modelService.findAllModel();
		for(Model model:models)
		{
			if(!"baseModel".equals(model.getModelEnglishName()) && !"草稿".equals(model.getState()))
			{
				results.add(model.getModelName());
			}
			else{}
		}
		String processConfig = this.systemConfigService.findSystemConfigValueBykey("审批实体名称");
		String[] processConfigs = processConfig.split(",");
		for(String pc:processConfigs)
		{
			results.add(pc);
		}
		return results;
	}
}
