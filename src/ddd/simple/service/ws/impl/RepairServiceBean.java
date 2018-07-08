package ddd.simple.service.ws.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.ws.Repair;
import ddd.simple.dao.ws.RepairDao;
import ddd.simple.service.ws.RepairService;

@Service
public class RepairServiceBean extends BaseService implements RepairService {
	@Resource(name="repairDaoBean")
	private RepairDao repairDao;
	
	@Override
	public Repair saveRepair(Repair repair) {
		try {
			return this.repairDao.saveRepair(repair);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveRepair", e.getMessage(), e);
		}
	}

	@Override
	public int deleteRepair(Long repairId) {
		try {
			return this.repairDao.deleteRepair(repairId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteRepair", e.getMessage(), e);
		}
		
	}

	@Override
	public Repair updateRepair(Repair repair) {
		try {
			return this.repairDao.updateRepair(repair);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateRepair", e.getMessage(), e);
		}
	}

	@Override
	public Repair findRepairById(Long repairId) {
		try {
			return this.repairDao.findRepairById(repairId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findRepairById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Repair> findAllRepair() {
		try {
			return this.repairDao.findAllRepair();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllRepair", e.getMessage(), e);
		}
	}

}
