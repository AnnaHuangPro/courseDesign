package ddd.simple.entity.model;

import ddd.base.annotation.Column;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.entity.model.Model;
import ddd.simple.entity.model.ModelItem;


@ddd.base.annotation.Entity(label="模型联合索引",name="modelJointUnique")
public class ModelJointUnique extends Entity
{
	private static final long serialVersionUID = 1L;
	
	@Column(label="索引名",name="name",length=250,nullable=false,unique=false,comment="联合索引名")
	private String name;

	@Column(label="索引项",joinTableName="modelItem_jointUnique",joinColumn="modelJointUniqueId",composition=false,nullable=true,unique=false,comment="联合索引的字段")
	private EntitySet<ModelItem> modelItems;
	
	@Column(name = "modelId", label = "所属模型",FKName="dd_ibfk_1")
	private Model model;
	
	public Model getModel()
	{
		lazyLoad();
		return this.model;
	}

	public void setModel(Model model)
	{
		super.LazyFieidsLoaded.put("model", true);
		this.model = model;
	}

	public String getName() {
		lazyLoad();
		return this.name;
	}

	public void setName(String Name) {
		this.name = Name;
	}

	public EntitySet<ModelItem> getModelItems() {
		lazyLoad("modelItems");
		return this.modelItems;
	}

	public void setModelItems(EntitySet<ModelItem> modelItems) {
		super.LazyFieidsLoaded.put("modelItems", true);
		this.modelItems = modelItems;
	}


	
}