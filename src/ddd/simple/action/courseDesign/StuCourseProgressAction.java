package ddd.simple.action.courseDesign;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.courseDesign.StuCourseProgress;
import ddd.simple.service.courseDesign.StuCourseProgressService;

@Action
@RequestMapping("/DD/StuCourseProgress")
@Controller
public class StuCourseProgressAction {
	@Resource(name="stuCourseProgressServiceBean")
	private StuCourseProgressService stuCourseProgressService;
	
	public StuCourseProgress saveStuCourseProgress(StuCourseProgress stuCourseProgress) {
		try {
			StuCourseProgress saveStuCourseProgress = this.stuCourseProgressService.saveStuCourseProgress(stuCourseProgress);
			return saveStuCourseProgress;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteStuCourseProgress(Long stuCourseProgressId) {
		
		try {
			return this.stuCourseProgressService.deleteStuCourseProgress(stuCourseProgressId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public StuCourseProgress updateStuCourseProgress(StuCourseProgress stuCourseProgress) {
		try {
			StuCourseProgress updateStuCourseProgress = this.stuCourseProgressService.updateStuCourseProgress(stuCourseProgress);
			return updateStuCourseProgress;
		} catch (DDDException e) {
			throw e;
		}
	}

	public StuCourseProgress findStuCourseProgressById(Long stuCourseProgressId) {
		try {
			StuCourseProgress findStuCourseProgress = this.stuCourseProgressService.findStuCourseProgressById(stuCourseProgressId);
			return  findStuCourseProgress;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<StuCourseProgress > findAllStuCourseProgress() {
		try {
			EntitySet<StuCourseProgress > allStuCourseProgress = this.stuCourseProgressService.findAllStuCourseProgress();
			return allStuCourseProgress;
		} catch (DDDException e) {
			throw e;
		}
	}

}