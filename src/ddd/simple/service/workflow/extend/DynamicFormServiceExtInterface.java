package ddd.simple.service.workflow.extend;

import java.util.HashMap;
import java.util.Map;

public interface DynamicFormServiceExtInterface {
	
	public void beforeCompleteTask(String taskId, Map<String,Object> entityVar, HashMap parameterMap, HashMap taskDetailInfo) throws Exception;
	
	public void afterCompleteTask(String taskId, Map<String,Object> entityVar, HashMap parameterMap, HashMap taskDetailInfo);

}
