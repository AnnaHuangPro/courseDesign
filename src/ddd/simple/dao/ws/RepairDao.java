package ddd.simple.dao.ws;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.ws.Repair;

public interface RepairDao extends BaseDaoInterface {
	public Repair saveRepair(Repair repair) throws Exception;
	
	public int deleteRepair(Long repairId) throws Exception;
	
	public Repair updateRepair(Repair repair) throws Exception;
	
	public Repair findRepairById(Long repairId) throws Exception;
	
	public EntitySet<Repair> findAllRepair() throws Exception;
}
