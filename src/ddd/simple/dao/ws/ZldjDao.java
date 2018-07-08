package ddd.simple.dao.ws;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.ws.Zldj;

public interface ZldjDao extends BaseDaoInterface {
	public Zldj saveZldj(Zldj zldj) throws Exception;
	
	public int deleteZldj(Long zldjId) throws Exception;
	
	public Zldj updateZldj(Zldj zldj) throws Exception;
	
	public Zldj findZldjById(Long zldjId) throws Exception;
	
	public EntitySet<Zldj> findAllZldj() throws Exception;
}
