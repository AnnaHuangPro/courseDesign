package ddd.simple.dao.modelFile.impl;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.util.SpringContextUtil;
import ddd.simple.dao.base.BaseDao;

import org.springframework.stereotype.Service;

import ddd.simple.entity.modelFile.ModelFile;
import ddd.simple.entity.permission.Operator;
import ddd.simple.service.base.BaseService;
import ddd.simple.dao.modelFile.ModelFileDao;

@Service
public class ModelFileDaoBean extends BaseDao implements ModelFileDao
{
	@Override
	public ModelFile saveModelFile(ModelFile modelFile)  throws Exception{
		return this.save(modelFile);
	}

	@Override
	public int deleteModelFile(Long modelFileId)  throws Exception{
		return this.deleteById(modelFileId,ModelFile.class);
	}

	@Override
	public ModelFile updateModelFile(ModelFile modelFile)  throws Exception{
		return this.update(modelFile);
	}

	@Override
	public ModelFile findModelFileById(Long modelFileId)  throws Exception{
		return this.query(modelFileId, ModelFile.class);
	}
	
	@Override
	public EntitySet<ModelFile> findAllModelFile() throws Exception {
		return this.query("1=1",ModelFile.class);
	}

	@Override
	public EntitySet<ModelFile> findModelFileByType(String type) throws Exception {
		BaseService bs =(BaseService)SpringContextUtil.getBean("baseService");
		Operator operator = bs.getLoginUser().getLoginOperator();
		if (operator == null){
			throw new DDDException("获取当前登录人员出错");
		}
		Long loginOperatorId =operator.getEId();
		String where = "type = '"+type+"'"+ " and permission in (  "+
				"  SELECT DISTINCT  " +
				 "  p. CODE  " +
			 " FROM " +
				 " permission p " +
			 " LEFT JOIN role_permissions r ON r.permissionEId = p.EId " +
			 " LEFT JOIN operatorandrole o ON o.roleId = r.roleEId " +
			 " WHERE " +
			 "  o.operatorId =  " +loginOperatorId+
			 ")";
		return this.query(where, ModelFile.class);
	}
	
	
	@Override
	public ModelFile findModelFileByKey(String key) throws Exception
	{
		EntitySet<ModelFile> modelFiles =  this.query(" modelKey = '"+ key +"'", ModelFile.class);
		try
		{
			return modelFiles.iterator().next();
		} catch (Exception e)
		{
			throw new Exception("没有找到key为"+key+" 的模板文件");
		}
	}
}
