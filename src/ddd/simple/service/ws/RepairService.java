package ddd.simple.service.ws;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.ws.Repair;

public interface RepairService extends BaseServiceInterface {
	public Repair saveRepair(Repair repair) ;
	
	public int deleteRepair(Long repairId) ;
	
	public Repair updateRepair(Repair repair) ;
	
	public Repair findRepairById(Long repairId) ;
	
	public EntitySet<Repair> findAllRepair() ;
 
}