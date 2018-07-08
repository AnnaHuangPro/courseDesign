package ddd.simple.service.ws;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.ws.Swdj;

public interface SwdjService extends BaseServiceInterface {
	public Swdj saveSwdj(Swdj swdj) ;
	
	public int deleteSwdj(Long swdjId) ;
	
	public Swdj updateSwdj(Swdj swdj) ;
	
	public Swdj findSwdjById(Long swdjId) ;
	
	public EntitySet<Swdj> findAllSwdj() ;
 
}