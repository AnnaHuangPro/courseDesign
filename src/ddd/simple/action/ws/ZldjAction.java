package ddd.simple.action.ws;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.ws.Zldj;
import ddd.simple.service.ws.ZldjService;

@Action
@RequestMapping("/DD/Zldj")
@Controller
public class ZldjAction {
	@Resource(name="zldjServiceBean")
	private ZldjService zldjService;
	
	public Zldj saveZldj(Zldj zldj) {
		try {
			Zldj saveZldj = this.zldjService.saveZldj(zldj);
			return saveZldj;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteZldj(Long zldjId) {
		
		try {
			return this.zldjService.deleteZldj(zldjId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public Zldj updateZldj(Zldj zldj) {
		try {
			Zldj updateZldj = this.zldjService.updateZldj(zldj);
			return updateZldj;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Zldj findZldjById(Long zldjId) {
		try {
			Zldj findZldj = this.zldjService.findZldjById(zldjId);
			return  findZldj;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<Zldj > findAllZldj() {
		try {
			EntitySet<Zldj > allZldj = this.zldjService.findAllZldj();
			return allZldj;
		} catch (DDDException e) {
			throw e;
		}
	}

}