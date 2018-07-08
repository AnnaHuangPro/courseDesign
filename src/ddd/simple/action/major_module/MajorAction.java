package ddd.simple.action.major_module;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.major_module.Major;
import ddd.simple.service.major_module.MajorService;

@Action
@RequestMapping("/DD/Major")
@Controller
public class MajorAction {
	@Resource(name="majorServiceBean")
	private MajorService majorService;
	
	public Major saveMajor(Major major) {
		try {
			Major saveMajor = this.majorService.saveMajor(major);
			return saveMajor;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteMajor(Long majorId) {
		
		try {
			return this.majorService.deleteMajor(majorId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public Major updateMajor(Major major) {
		try {
			Major updateMajor = this.majorService.updateMajor(major);
			return updateMajor;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Major findMajorById(Long majorId) {
		try {
			Major findMajor = this.majorService.findMajorById(majorId);
			return  findMajor;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<Major > findAllMajor() {
		try {
			EntitySet<Major > allMajor = this.majorService.findAllMajor();
			return allMajor;
		} catch (DDDException e) {
			throw e;
		}
	}

}