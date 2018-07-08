package ddd.simple.action.ws;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.ws.Repair;
import ddd.simple.service.ws.RepairService;

@Action
@RequestMapping("/DD/Repair")
@Controller
public class RepairAction {
	@Resource(name="repairServiceBean")
	private RepairService repairService;
	
	public Repair saveRepair(Repair repair) {
		try {
			Repair saveRepair = this.repairService.saveRepair(repair);
			return saveRepair;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteRepair(Long repairId) {
		
		try {
			return this.repairService.deleteRepair(repairId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public Repair updateRepair(Repair repair) {
		try {
			Repair updateRepair = this.repairService.updateRepair(repair);
			return updateRepair;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Repair findRepairById(Long repairId) {
		try {
			Repair findRepair = this.repairService.findRepairById(repairId);
			return  findRepair;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<Repair > findAllRepair() {
		try {
			EntitySet<Repair > allRepair = this.repairService.findAllRepair();
			return allRepair;
		} catch (DDDException e) {
			throw e;
		}
	}

}