package ddd.simple.action.ws;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.ws.Swdj;
import ddd.simple.service.ws.SwdjService;

@Action
@RequestMapping("/DD/Swdj")
@Controller
public class SwdjAction {
	@Resource(name="swdjServiceBean")
	private SwdjService swdjService;
	
	public Swdj saveSwdj(Swdj swdj) {
		try {
			Swdj saveSwdj = this.swdjService.saveSwdj(swdj);
			return saveSwdj;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteSwdj(Long swdjId) {
		
		try {
			return this.swdjService.deleteSwdj(swdjId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public Swdj updateSwdj(Swdj swdj) {
		try {
			Swdj updateSwdj = this.swdjService.updateSwdj(swdj);
			return updateSwdj;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Swdj findSwdjById(Long swdjId) {
		try {
			Swdj findSwdj = this.swdjService.findSwdjById(swdjId);
			return  findSwdj;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<Swdj > findAllSwdj() {
		try {
			EntitySet<Swdj > allSwdj = this.swdjService.findAllSwdj();
			return allSwdj;
		} catch (DDDException e) {
			throw e;
		}
	}

}