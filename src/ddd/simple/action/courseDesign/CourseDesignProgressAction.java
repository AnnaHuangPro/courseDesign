package ddd.simple.action.courseDesign;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.courseDesign.CourseDesignProgress;
import ddd.simple.service.courseDesign.CourseDesignProgressService;

@Action
@RequestMapping("/DD/CourseDesignProgress")
@Controller
public class CourseDesignProgressAction {
	@Resource(name="courseDesignProgressServiceBean")
	private CourseDesignProgressService courseDesignProgressService;
	
	public CourseDesignProgress saveCourseDesignProgress(CourseDesignProgress courseDesignProgress) {
		try {
			CourseDesignProgress saveCourseDesignProgress = this.courseDesignProgressService.saveCourseDesignProgress(courseDesignProgress);
			return saveCourseDesignProgress;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteCourseDesignProgress(Long courseDesignProgressId) {
		
		try {
			return this.courseDesignProgressService.deleteCourseDesignProgress(courseDesignProgressId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public CourseDesignProgress updateCourseDesignProgress(CourseDesignProgress courseDesignProgress) {
		try {
			CourseDesignProgress updateCourseDesignProgress = this.courseDesignProgressService.updateCourseDesignProgress(courseDesignProgress);
			return updateCourseDesignProgress;
		} catch (DDDException e) {
			throw e;
		}
	}

	public CourseDesignProgress findCourseDesignProgressById(Long courseDesignProgressId) {
		try {
			CourseDesignProgress findCourseDesignProgress = this.courseDesignProgressService.findCourseDesignProgressById(courseDesignProgressId);
			return  findCourseDesignProgress;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public CourseDesignProgress findStage(int progressStage,Long courseId,Long teaId) {
		try {
			CourseDesignProgress findCourseDesignProgress = this.courseDesignProgressService.findStage(progressStage,courseId,teaId);
			return  findCourseDesignProgress;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<CourseDesignProgress> findCourseProgressByCourseIdAndTeaEId(Long courseId,Long teaId) {
		try {
			EntitySet<CourseDesignProgress> findCourseDesignProgress = this.courseDesignProgressService.findCourseProgressByCourseIdAndTeaEId(courseId,teaId);
			return  findCourseDesignProgress;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<CourseDesignProgress > findAllCourseDesignProgress() {
		try {
			EntitySet<CourseDesignProgress > allCourseDesignProgress = this.courseDesignProgressService.findAllCourseDesignProgress();
			return allCourseDesignProgress;
		} catch (DDDException e) {
			throw e;
		}
	}

}