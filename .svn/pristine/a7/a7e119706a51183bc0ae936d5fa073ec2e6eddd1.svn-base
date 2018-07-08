
package ddd.simple.service.permission.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.permission.ModuleDao;
import ddd.simple.dao.permission.PermissionDao;
import ddd.simple.dao.permission.RoleDao;
import ddd.simple.entity.permission.LoginUser;
import ddd.simple.entity.permission.Module;
import ddd.simple.entity.permission.ModuleTreeNode;
import ddd.simple.entity.permission.Permission;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.permission.ModuleService;

@Service
public class ModuleServiceBean extends BaseService implements ModuleService
{
	
	@Resource(name = "moduleDaoBean")
	private ModuleDao moduleDao;
	
	@Resource(name = "permissionDaoBean")
	private PermissionDao permissionDao;
	
	@Resource(name = "roleDaoBean")
	private RoleDao roleDao;
	
	public Module saveModule(Module module) throws Exception
	{
		try
		{
			if ("否".equals(module.getModuleType()))
			{
				if(module.getParent() != null){
					if(module.getCode() == null || "".equals(module.getCode())){
						String moduleCode = this.getModuleCode(module.getParent().getEId());
						module.setCode(moduleCode);
					}else{
						//
					}
				}else{
					//
				}
			} else if ("是".equals(module.getModuleType()))
			{
				if(module.getCode() == null || "".equals(module.getCode())){
					EntitySet<Module> systemModules = this.getSystemModules();
					String systemModuleCode = this.getLastFourCode(systemModules);
					module.setCode(systemModuleCode);
				}else{
					//
				}
			}
			
			Module newModule = this.moduleDao.saveModule(module);
			
			return newModule;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("saveModule", e.getMessage(), e);
		}
	}
	
	@Override
	public void updateModule_DataInit(Module module){
		try
		{
			this.moduleDao.updateModule(module);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("updateModule_DataInit", e.getMessage(), e);
		}
	}
	// 递归删除模板和所有子模板
	private int deleteModule(Module module) throws Exception
	{
		int number = 1;
		EntitySet<Module> childMoudules = module.getChildren();
		if (!childMoudules.isEmpty())
		{
			for (Module childModule : childMoudules)
			{
				number += this.deleteModule(childModule);
			}
		}
		EntitySet<Permission> permissions = permissionDao.findPermissionByModule(module.getEId());
		if (!permissions.isEmpty())
		{
			permissionDao.delete(permissions);
		}
		moduleDao.delete(module);
		return number;
	}
	
	public int deleteModule(Long moduleId) throws Exception
	{
		try
		{
			Module module = moduleDao.findModuleById(moduleId);
			int number = this.deleteModule(module);
			// 级联删除
			// 删除权限点
			// 删除被引用的权限点
			try
			{
			
			} catch (Exception e)
			{
				return -1;
			}
			return number;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("deleteModule", e.getMessage(), e);
		}
		
	}
	
	public Module updateModule(Module module) throws Exception
	{
		try
		{
			Module newModule = new Module();
			
			if ("否".equals(module.getModuleType()))
			{
				Module parentModule = module.getParent();
				Module findThisModule = this.findModuleById(module.getEId());
				// 如果前台传过来的模块的父模块没有变化，那么直接保存
				if (findThisModule.getParent() != null && parentModule.getEId().equals(findThisModule.getParent().getEId()))
				{
					newModule = this.moduleDao.updateModule(module);
				} else
				{
					Module findParentModule = this.findModuleById(parentModule.getEId());
					Module changCodeModule = this.setUpdateCode(findParentModule, module);
					changCodeModule.setParent(findParentModule);
					newModule = this.moduleDao.updateModule(changCodeModule);
				}
			} else if ("是".equals(module.getModuleType()))
			{
				Module findThisSystemModule = this.findModuleById(module.getEId());
				if (findThisSystemModule.getParent() == null || findThisSystemModule.getParent().getEId() == null)
				{
					newModule = this.moduleDao.updateModule(module);
				} else
				{
					EntitySet<Module> systemModules = this.getSystemModules();
					String newParentCode = this.getLastFourCode(systemModules);
					module.setCode(newParentCode);
					EntitySet<Module> childModules = this.setUpdateChildCode(findThisSystemModule, newParentCode);
					module.setChildren(childModules);
					
					newModule = this.moduleDao.updateModule(module);
				}
			}
			
			return newModule;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("updateModule", e.getMessage(), e);
		}
	}
	
	public Module findModuleById(Long moduleId) throws Exception
	{
		try
		{
			Module module = this.moduleDao.findModuleById(moduleId);
			if (module.getParent() != null)
			{
				module.getParent().getName();
			}
			EntitySet<Module> modules = (EntitySet<Module>) module.getChildren();
			for (Module childModule : modules)
			{
				childModule.getChildren();
			}
			return module;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModuleById", e.getMessage(), e);
		}
	}
	
	public EntitySet<Module> findModules(String where) throws Exception
	{
		try
		{
			EntitySet<Module> modules = this.moduleDao.query(where, Module.class);
			for (Module module : modules)
			{
				EntitySet<Module> childModules = (EntitySet<Module>) module.getChildren();
				for (Module childModule : childModules)
				{
					childModule.getChildren();
				}
			}
			return modules;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModules", e.getMessage(), e);
		}
	}
	
	public EntitySet<Module> findModules() throws Exception
	{
		try
		{
			EntitySet<Module> modules = this.moduleDao.findModules();
			for (Module module : modules)
			{
				EntitySet<Module> childModules = (EntitySet<Module>) module.getChildren();
				for (Module childModule : childModules)
				{
					childModule.getChildren();
				}
			}
			return modules;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModules", e.getMessage(), e);
		}
	}
	
	public EntitySet<Module> findModulesByParentCode(String moduleCode) throws Exception
	{
		try
		{
			EntitySet<Module> modules = this.moduleDao.findModulesByParentCode(moduleCode);
			for (Module module : modules)
			{
				module.getParent();
			}
			return modules;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModulesByParentCode", e.getMessage(), e);
		}
	}
	
	public EntitySet<Module> findModulesByOperator(Long operatorId) throws Exception
	{
		try
		{
			EntitySet<Module> modules = (EntitySet<Module>) this.moduleDao.findModulesByOperator(operatorId);
			EntitySet<Module> parentModules = new EntitySet<Module>();
			EntitySet<Module> resultModules = new EntitySet<Module>();
			
			for (Module module : modules)
			{
				module.getParent().getName();
				if (module.getParent().getParent() != null)
				{
					module.getParent().getParent().getName();
				}
			}
			
			for (Module module : modules)
			{
				Module parentModule = getParentModule(parentModules, module.getParent());
				if (parentModule == null)
				{
					parentModule = module.getParent();
					EntitySet<Module> childModules = new EntitySet<Module>();
					childModules.add(module);
					parentModule.setChildren(childModules);
					parentModules.add(parentModule);
				} else
				{
					parentModule.getChildren().add(module);
				}
			}
			
			for (Module module : parentModules)
			{
				Module parentModule = getParentModule(resultModules, module.getParent());
				if (parentModule == null)
				{
					parentModule = module.getParent();
					EntitySet<Module> childModules = new EntitySet<Module>();
					childModules.add(module);
					parentModule.setChildren(childModules);
					resultModules.add(parentModule);
				} else
				{
					parentModule.getChildren().add(module);
				}
			}
			
			return resultModules;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModulesByOperator", e.getMessage(), e);
		}
	}
	
	public EntitySet<Module> findSystemModulesByOperator(Long operatorId) throws Exception
	{
		try
		{
			return this.moduleDao.findOperableSystemModules(operatorId);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findSystemModulesByOperator", e.getMessage(), e);
		}
	}
	
	private EntitySet<Module> dealWithChildModules(EntitySet<Module> operableModules, ArrayList<Long> sytemModulesId) throws Exception
	{
		try
		{
			// 保存父模块
			Map<Long, Module> parents = new LinkedHashMap<Long, Module>();
			
			// 遍历所有可操作模块
			for (Module module : operableModules)
			{
				this.getParentModuleByPerssion(module, parents, sytemModulesId);
			}
			Map<Long, Module> sortedParentsMap = new LinkedHashMap<Long, Module>();
			EntitySet<Module> sortedParents = this.moduleDao.sortParentsModules(parents.values());
			
			Iterator<Module> ite = sortedParents.iterator();
			while (ite.hasNext())
			{
				Module tempModule = ite.next();
				tempModule.setChildren(parents.get(tempModule.getEId()).getChildren());
				sortedParentsMap.put(tempModule.getEId(), tempModule);
			}
			
			EntitySet<Module> displayModules = new EntitySet<Module>();
			for (Entry<Long, Module> parent : sortedParentsMap.entrySet())
			{
				if (parent.getValue().getParent() != null && sytemModulesId.contains(parent.getValue().getParent().getEId()))
				{
					parent.getValue().getParent().setChildren(null);
					displayModules.add(parent.getValue());
				}
			}
			return displayModules;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw e;
		}
	}
	
	@Override
	public ModuleTreeNode constructNewTree(Long operatorId) throws Exception{
		EntitySet<Module> systemModule = this.findSystemModulesByOperator(operatorId);
		if(systemModule == null){
			//没有任何权限
			return null;
		}else{
			//
		}
		
		ModuleTreeNode node = new ModuleTreeNode();
		node.setNodes(new ArrayList<ModuleTreeNode>());
		node.setName("mynode");
		Iterator<Module> ite = systemModule.iterator();
		while(ite.hasNext()){
			Module system = ite.next();
			ModuleTreeNode systemNode = new ModuleTreeNode();
			systemNode.setNodes(new ArrayList<ModuleTreeNode>());
			systemNode.setText(system.getName());
			systemNode.setId("系统模块"+system.getEId());
			systemNode.setName("系统"+system.getCode());
			systemNode.setGroup("true");
			systemNode.setRouteParamsObj(system.getRouteParamsObj());
			node.addNode(systemNode);
			EntitySet<Module> childModules =this.findSystemChildModules(operatorId,system.getEId());
			this.constructTree(systemNode, childModules);
		}
		return node;
	}
	
	@Override
	public ModuleTreeNode findSystemChildModulesNew(Long operatorId, Long systemModuleId) throws Exception
	{
		EntitySet<Module> modules = this.findSystemChildModules(operatorId, systemModuleId);
		ModuleTreeNode node = new ModuleTreeNode();
		node.setNodes(new ArrayList<ModuleTreeNode>());
		node.setName("mynode");
		this.constructTree(node, modules);
		return node;
	}
	
	public void constructTree(ModuleTreeNode node, EntitySet<Module> modules)
	{
		if (modules == null || modules.size() == 0)
		{
			return;
		}
		
		Iterator<Module> ite = modules.iterator();
		// 循环
		while (ite.hasNext())
		{
			Module module = ite.next();
			ModuleTreeNode childNode = new ModuleTreeNode();
			childNode.setText(module.getName());
			childNode.setId(module.getEId() + "");
			childNode.setRouteData(module.getRoute());
			childNode.setLocation(module.getUrl());
			childNode.setRouteParamsObj(module.getRouteParamsObj());
			EntitySet<Module> childModule = module.getChildren();
			
			String iconClass = module.getIconClass();
			if (iconClass != null && (!("".equals(iconClass))))
			{
				childNode.setIcon(iconClass);
			} else
			{
				//
			}
			
			childNode.setNodes(new ArrayList<ModuleTreeNode>());
			node.addNode(childNode);
			this.constructTree(childNode, childModule);
		}
		
	}
	
	@Override
	public boolean isParentModule(Long eId){
		try
		{
			return this.moduleDao.isParentModule(eId);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findsystemChildModules", e.getMessage(), e);
		}
	}
	
	/**
	 * 查询当前用户的权限下&指定父模块下的模块
	 */
	public EntitySet<Module> findSystemChildModules(Long operatorId, Long systemModuleId) throws Exception
	{
		try
		{
			EntitySet<Module> moduleWithLevel = new EntitySet<Module>();
			// 可操作的最底层模块
			EntitySet<Module> operableModules = this.moduleDao.findOperableSystemChildenModule(operatorId, systemModuleId);
			
			//
			List<String> ModuleCodeHasReSetChilden = new ArrayList<String>();
			for (Module module : operableModules)
			{
				// 对每一个模块进行遍历
				// 如果该模块的code长度为8，即系统模块下一级则直接加入moduleWithLevel中
				// 如果该模块的code长度大于8，递归到长度为8为止，并把自己加入父级模块的子模块集合中
				if (module.getCode().length() == 8)
				{
					if (!moduleWithLevel.contains(module))
					{
						moduleWithLevel.add(module);
					}
				} else
				{
					Module temp = this.findParent(module,ModuleCodeHasReSetChilden);
					if (!moduleWithLevel.contains(temp))
					{
						moduleWithLevel.add(temp);
					}
				}
			}
			EntitySet<Module> result = this.entitySetToListSort(moduleWithLevel);
			return result;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findsystemChildModules", e.getMessage(), e);
		}
	}
	
	private EntitySet<Module> entitySetToListSort(EntitySet<Module> modules)
	{
		List<Module> list = new ArrayList<Module>(modules);
		ModuleComparator comparator = new ModuleComparator();
		Collections.sort(list, comparator);
		EntitySet<Module> result = new EntitySet<Module>();
		for (int i = 0; i < list.size(); i++)
		{
			result.add(list.get(i));
		}
		return result;
	}
	
	private Module findParent(Module module,List<String> ModuleCodeHasReSetChilden)
	{
		Module parent = module.getParent();
		if(ModuleCodeHasReSetChilden.contains(parent.getCode())){
			//
		}else{
			parent.setChildren(null);
			ModuleCodeHasReSetChilden.add(parent.getCode());
		}
		
		parent.getName();
		EntitySet<Module> childens = parent.getChildren();
		if (childens == null)
		{
			childens = new EntitySet<Module>();
		}
		childens.add(module);
		parent.setChildren((EntitySet<Module>) this.entitySetToListSort(childens));
		
		if (parent.getCode().length() == 8)
		{
			return parent;
		} else
		{
			return this.findParent(parent,ModuleCodeHasReSetChilden);
		}
	}
	
	private void getParentModuleByPerssion(Module module, Map<Long, Module> parents, ArrayList<Long> sytemModulesId)
	{
		if (module.getParent() != null && !(sytemModulesId.contains(module.getParent().getEId())))
		{
			if (parents.get(module.getParent().getEId()) != null)
			{
				
				Module tempParent = parents.get(module.getParent().getEId());
				tempParent.getChildren().add(module);
				
				parents.put(tempParent.getEId(), tempParent);
			} else
			{
				Module tempParent = module.getParent();
				tempParent.setChildren(new EntitySet<Module>());
				tempParent.getChildren().add(module);
				
				parents.put(tempParent.getEId(), tempParent);
			}
			
			module = module.getParent();
		} else
		{
			return;
		}
		getParentModuleByPerssion(module, parents, sytemModulesId);
		
	}
	
	private Module getParentModule(EntitySet<Module> parentModules, Module parentModule)
	{
		for (Module module : parentModules)
		{
			if (module.getEId() == parentModule.getEId())
			{
				return module;
			}
		}
		return null;
	}
	
	public EntitySet<Module> getSystemModules() throws Exception
	{
		try
		{
			
			EntitySet<Module> modules = this.findModules();
			EntitySet<Module> systemModules = new EntitySet<Module>();
			
			for (Module module : modules)
			{
				if ("是".equals(module.getModuleType()))
				{
					systemModules.add(module);
				}
			}
			
			return systemModules;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getSystemModules", e.getMessage(), e);
		}
	}
	
	public String getModuleCode(Long moduleId) throws Exception
	{
		try
		{
			Module parentModule = this.findModuleById(moduleId);
			EntitySet<Module> childrenModules = (EntitySet<Module>) parentModule.getChildren();
			
			String maxLastFourCode = this.getLastFourCode(childrenModules);
			
			String maxCode = parentModule.getCode() + maxLastFourCode;
			
			return maxCode;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getModuleCode", e.getMessage(), e);
		}
	}
	
	public Integer findMaxModuleCode(EntitySet<Module> modules) throws Exception
	{
		try
		{
			EntitySet<Module> getCodeModules = modules;
			ArrayList<String> codeNumberString = new ArrayList<String>();
			for (Module module : getCodeModules)
			{
				String moduleCode = module.getCode();
				String codeNumber = moduleCode.substring(moduleCode.length() - 4, moduleCode.length());
				codeNumberString.add(codeNumber);
			}
			;
			
			Collections.sort(codeNumberString);
			
			int maxCode = 0;
			if (codeNumberString.size() != 0)
			{
				maxCode = Integer.parseInt(codeNumberString.get(codeNumberString.size() - 1));
			}
			return maxCode;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findMaxModuleCode", e.getMessage(), e);
		}
	}
	
	public String getLastFourCode(EntitySet<Module> modules) throws Exception
	{
		try
		{
			Integer maxCode = this.findMaxModuleCode(modules);
			Integer useCode = maxCode + 1;
			Integer useCodeLength = useCode.toString().length();
			String finalLastFourCode = "";
			
			for (int i = 0; i < 4 - useCodeLength; i++)
			{
				finalLastFourCode += "0";
			}
			finalLastFourCode += useCode;
			
			return finalLastFourCode;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getLastFourCode", e.getMessage(), e);
		}
	}
	
	public Module setUpdateCode(Module parentModule, Module module) throws Exception
	{
		try
		{
			Module newModule = module;
			String oldParentCode = parentModule.getCode();
			String newCode = this.getChangeCode(parentModule, oldParentCode);
			
			newModule.setCode(newCode);
			EntitySet<Module> childrenModules = this.setUpdateChildCode(newModule, newCode);
			newModule.setChildren(childrenModules);
			return newModule;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("setUpdateCode", e.getMessage(), e);
		}
	}
	
	public EntitySet<Module> setUpdateChildCode(Module module, String newParentCode) throws Exception
	{
		try
		{
			EntitySet<Module> childrenModules = new EntitySet<Module>();
			if (module.getChildren().size() != 0)
			{
				childrenModules = (EntitySet<Module>) (this.findModuleById(module.getEId()).getChildren());
				
				for (Module childModule : childrenModules)
				{
					String newCode = this.getChangeChildCode(newParentCode, childModule);
					childModule.setCode(newCode);
				}
			}
			
			EntitySet<Module> newChildrenModules = this.moduleDao.updateChildrenModuleCode(childrenModules);
			
			return newChildrenModules;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("setUpdateChildCode", e.getMessage(), e);
		}
	}
	
	public String getChangeCode(Module parentModule, String parentCode) throws Exception
	{
		try
		{
			
			String lastFourCode = this.getLastFourCode((EntitySet<Module>) parentModule.getChildren());
			String newCode = parentCode + lastFourCode;
			
			return newCode;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getChangeCode", e.getMessage(), e);
		}
	}
	
	public String getChangeChildCode(String newParentCode, Module childModule) throws Exception
	{
		try
		{
			String oldChildCode = childModule.getCode();
			String lastFourCode = oldChildCode.substring(oldChildCode.length() - 4, oldChildCode.length());
			String newChildCode = newParentCode + lastFourCode;
			return newChildCode;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getChangeChildCode", e.getMessage(), e);
		}
	}
	
	/*
	 * 查找会员权限下的模块
	 **/
	public EntitySet<Module> findMemberModules() throws Exception
	{
		try
		{
			LoginUser loginUser = this.getLoginUser();
			Long memberId = loginUser.getLoginVip().getEId();
			Long memberGroupId = loginUser.getCurrentGroup().getEId();
			EntitySet<Module> systemModules = this.getSystemModules();
			ArrayList<Long> systemModulesId = new ArrayList<Long>();
			for (Module module : systemModules)
			{
				systemModulesId.add(module.getEId());
			}
			EntitySet<Module> operableModules = this.moduleDao.findMemberOperableModules(memberId, memberGroupId);
			EntitySet<Module> module = this.dealWithChildModules(operableModules, systemModulesId);
			return module;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findsystemChildModules", e.getMessage(), e);
		}
	}
	
	@Override
	public int deleteModuleByName(String name) throws Exception
	{
		if (name == null || name.equals(""))
			return 0;
		EntitySet<Module> modules = this.moduleDao.query("name = '" + name + "'", Module.class);
		if (modules.isEmpty())
			return 0;
		permissionDao.deleteByModule(modules);
		return this.moduleDao.deleteByWhere("name = '" + name + "'", Module.class);
	}
	
	public EntitySet<Module> findModulesByName(String name) throws Exception
	{
		return this.moduleDao.findModulesByName(name);
	}
	
	@Override
	public EntitySet<Module> findModuleByModelName(String modelName) throws Exception
	{
		return this.moduleDao.findModuleByModelName(modelName);
	}

	@Override
	public Module findModulesByCode(String code) throws Exception
	{
		try
		{
			return this.moduleDao.findModuleByCode(code);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModulesByCode", e.getMessage(), e);
		}
	}
	
}
