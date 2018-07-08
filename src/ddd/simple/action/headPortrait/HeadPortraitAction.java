package ddd.simple.action.headPortrait;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.headPortrait.HeadPortrait;
import ddd.simple.service.headPortrait.HeadPortraitService;

@Action
@RequestMapping("/HeadPortrait")
@Controller
public class HeadPortraitAction {
	@Resource(name="headPortraitServiceBean")
	private HeadPortraitService headPortraitService;
	
	public HeadPortrait saveHeadPortrait(HeadPortrait headPortrait) {
		try {
			HeadPortrait saveHeadPortrait = this.headPortraitService.saveHeadPortrait(headPortrait);
			return saveHeadPortrait;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteHeadPortrait(Long headPortraitId) {
		
		try {
			return this.headPortraitService.deleteHeadPortrait(headPortraitId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public HeadPortrait updateHeadPortrait(HeadPortrait headPortrait) {
		try {
			HeadPortrait updateHeadPortrait = this.headPortraitService.updateHeadPortrait(headPortrait);
			return updateHeadPortrait;
		} catch (DDDException e) {
			throw e;
		}
	}

	public HeadPortrait findHeadPortraitById(Long headPortraitId) {
		try {
			HeadPortrait findHeadPortrait = this.headPortraitService.findHeadPortraitById(headPortraitId);
			return  findHeadPortrait;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<HeadPortrait > findAllHeadPortrait() {
		try {
			EntitySet<HeadPortrait > allHeadPortrait = this.headPortraitService.findAllHeadPortrait();
			return allHeadPortrait;
		} catch (DDDException e) {
			throw e;
		}
	}
    public String findLogoUrl(Long employeeId){
    	try {
			return  this.headPortraitService.findLogoUrl(employeeId);
		} catch (DDDException e) {
			throw e;
		}
    }

}