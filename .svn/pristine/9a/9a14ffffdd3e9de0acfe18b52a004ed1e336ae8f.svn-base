package ddd.simple.dao.dynamicForm.impl;

import ddd.base.persistence.EntitySet;
import ddd.base.persistence.SessionFactory;
import ddd.simple.dao.base.BaseDao;

import org.springframework.stereotype.Service;

import ddd.simple.entity.dynamicForm.DynamicForm;
import ddd.simple.dao.dynamicForm.DynamicFormDao;

@Service
public class DynamicFormDaoBean extends BaseDao implements DynamicFormDao
{
	@Override
	public DynamicForm saveDynamicForm(DynamicForm dynamicForm)  throws Exception{
		return this.save(dynamicForm);
	}

	@Override
	public int deleteDynamicForm(Long dynamicFormId)  throws Exception{
		return this.deleteById(dynamicFormId,DynamicForm.class);
	}
	
	@Override
	public int deleteDynamicFormModel(Long modelId) throws Exception{
		String sql = "update dynamicForm set modelId=null where modelId='"+modelId+"'";
		return SessionFactory.getThreadSession().excuteSql(sql, new Object[]{});
	}

	@Override 
	public DynamicForm updateDynamicForm(DynamicForm dynamicForm)  throws Exception{
		return this.update(dynamicForm);
	}

	@Override
	public DynamicForm findDynamicFormById(Long dynamicFormId)  throws Exception{
		return this.query(dynamicFormId, DynamicForm.class);
	}
	
	@Override
	public EntitySet<DynamicForm> findAllDynamicForm() throws Exception {
		return this.query("",DynamicForm.class);
	}
	
	public DynamicForm findDynamicFormByKey(String dynamicFormKey) throws Exception
	{
		String where = "dynamicFormKey = '"+dynamicFormKey+"'";
		return this.queryOne(where, DynamicForm.class);
	}
}
