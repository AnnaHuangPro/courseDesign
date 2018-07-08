package ddd.simple.dao.ws;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.ws.Swdj;

public interface SwdjDao extends BaseDaoInterface {
	public Swdj saveSwdj(Swdj swdj) throws Exception;
	
	public int deleteSwdj(Long swdjId) throws Exception;
	
	public Swdj updateSwdj(Swdj swdj) throws Exception;
	
	public Swdj findSwdjById(Long swdjId) throws Exception;
	
	public EntitySet<Swdj> findAllSwdj() throws Exception;
}
