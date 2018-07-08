package ddd.simple.dao.ws.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.ws.Repair;
import ddd.simple.dao.ws.RepairDao;

@Service
public class RepairDaoBean extends BaseDao implements RepairDao {
	@Override
	public Repair saveRepair(Repair repair)  throws Exception {
		return this.save(repair);
	}

	@Override
	public int deleteRepair(Long repairId)  throws Exception {
		return this.deleteById(repairId,Repair.class);
	}

	@Override
	public Repair updateRepair(Repair repair)  throws Exception {
		return this.update(repair);
	}

	@Override
	public Repair findRepairById(Long repairId)  throws Exception {
		return this.query(repairId, Repair.class);
	}
	
	@Override
	public EntitySet<Repair> findAllRepair() throws Exception {
		return this.query("1=1",Repair.class);
	}
}
