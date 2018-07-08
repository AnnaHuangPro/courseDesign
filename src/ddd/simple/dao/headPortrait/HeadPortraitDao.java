package ddd.simple.dao.headPortrait;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.headPortrait.HeadPortrait;

public interface HeadPortraitDao extends BaseDaoInterface {
	public HeadPortrait saveHeadPortrait(HeadPortrait headPortrait) throws Exception;
	
	public int deleteHeadPortrait(Long headPortraitId) throws Exception;
	
	public HeadPortrait updateHeadPortrait(HeadPortrait headPortrait) throws Exception;
	
	public HeadPortrait findHeadPortraitById(Long headPortraitId) throws Exception;
	
	public EntitySet<HeadPortrait> findAllHeadPortrait() throws Exception;
	
	 public  EntitySet<HeadPortrait> findLogoUrl(Long employeeId)throws Exception;
}
