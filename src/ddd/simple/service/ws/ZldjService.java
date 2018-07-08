package ddd.simple.service.ws;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.ws.Zldj;

public interface ZldjService extends BaseServiceInterface {
	public Zldj saveZldj(Zldj zldj) ;
	
	public int deleteZldj(Long zldjId) ;
	
	public Zldj updateZldj(Zldj zldj) ;
	
	public Zldj findZldjById(Long zldjId) ;
	
	public EntitySet<Zldj> findAllZldj() ;
 
}