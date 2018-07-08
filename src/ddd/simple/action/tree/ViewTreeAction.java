package ddd.simple.action.tree;


import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.util.EntityUtil;
import ddd.simple.entity.tree.ViewTree;
import ddd.simple.entity.tree.ViewTreeNode;
import ddd.simple.service.tree.ViewTreeNodeService;
import ddd.simple.service.tree.ViewTreeService;

@Action
@RequestMapping("/ViewTree")
@Controller
public class ViewTreeAction {

	@Resource(name = "viewTreeServiceBean")
	private ViewTreeService viewTreeService;
	
	@Resource(name="viewTreeNodeServiceBean")
	private ViewTreeNodeService viewTreeNodeService;

	public EntitySet<ViewTree> test(){
		try
		{
			EntitySet<ViewTree> t = this.viewTreeService.findAllViewTree();
			Iterator<ViewTree> ite = t.iterator();
			while(ite.hasNext()){
				ViewTree vt = ite.next();
				EntityUtil.clearProperty(vt, "viewTreeNodes.viewTree");
				EntitySet<ViewTreeNode> t1 = vt.getViewTreeNodes();
				Iterator<ViewTreeNode> ite1 = t1.iterator();
				while(ite1.hasNext()){
					ViewTreeNode tt1 = ite1.next();
					tt1.setEId(null);
					tt1.setLazyFieidsLoaded(null);
				}
				vt.setEId(null);
				vt.setLazyFieidsLoaded(null);
			}
			return t;
		} catch (Exception e)
		{
			// TODO: handle exception
			return null;
		}
	}
	
	public ViewTree saveViewTree(ViewTree viewTree) {
		try 
		{
			return this.viewTreeService.saveViewTree(viewTree);
		} 
		catch (DDDException e)
		{
			throw e;
		}
	}


	public int deleteViewTree(Long viewTreeId) {

		try 
		{
			return this.viewTreeService.deleteViewTree(viewTreeId);
		} 
		catch (DDDException e) 
		{
			throw e;
		}

	}

	public ViewTree updateViewTree(ViewTree viewTree) {
		try 
		{
			return this.viewTreeService.updateViewTree(viewTree);
		} 
		catch (DDDException e)
		{
			throw e;
		}
	}

	public ViewTree findViewTreeById(Long viewTreeId) {
		try 
		{
			ViewTree viewTree = this.viewTreeService.findViewTreeById(viewTreeId);
			EntityUtil.clearProperty(viewTree, "viewTreeNodes.viewTree");
			return viewTree;
		} 
		catch (DDDException e) 
		{
			throw e;
		}
	}
	
	public ViewTree findViewTreeByKey(String viewTreeKey)
	{
		try 
		{
			return this.viewTreeService.findViewTreeByKey(viewTreeKey);
		} 
		catch (DDDException e) 
		{
			throw e;
		}
	}
	
	
	public Map<String ,Object> findDataByViewTreeNodeIndexNew(Long viewTreeId,Long TreeNodeId){
		Map<String,Object> nodes = null;
		if(TreeNodeId == -1l){
			HashMap temp = new HashMap();
			temp.put("nodeIndex", 0);
			temp.put("isLoad", false);
			nodes = this.findDataByViewTreeNodeIndex(viewTreeId, temp,null);
		}else{
			ViewTreeNode node = this.viewTreeNodeService.findViewTreeNodeById(TreeNodeId);
			JSONObject jobj = JSONObject.fromObject(node);
			HashMap data = new HashMap();
			Iterator it = jobj.keys();  
		       // 遍历jsonObject数据，添加到Map对象  
		       while (it.hasNext())  
		       {  
		           String key = String.valueOf(it.next());  
		           Object value =  jobj.get(key);  
		           data.put(key, value);  
		       }  
		       nodes = this.findDataByViewTreeNodeIndex(viewTreeId, data,null);
		}
		return nodes;
	}
	
	public Map<String ,Object> findDataByViewTreeNodeIndex(Long viewTreeId,HashMap node,Map initFilter)
	{
		try 
		{
			if(node == null)
			{
				return null;
			}
			if(initFilter == null){
				initFilter=new HashMap<>();
			}

			Set<Map<String ,Object>> nodes = this.viewTreeService.findDataByViewTreeNodeIndex(viewTreeId,node,initFilter);
			Map<String ,Object> nodesMap = new HashMap<String, Object>();
			if(nodes != null && !nodes.isEmpty()){
				for(Map<String,Object> nodes1 : nodes){
					if(!"1".equals(nodes1.get("nodeIndex"))){
						nodes1.put("parent", node);
					}
				}
			}
			nodesMap.put("nodes", nodes);
			return nodesMap;
		} 
		catch (DDDException e) 
		{
			throw e;
		}
	}
}
