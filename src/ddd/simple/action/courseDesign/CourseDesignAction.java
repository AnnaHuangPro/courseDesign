package ddd.simple.action.courseDesign;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.courseDesign.CourseDesign;
import ddd.simple.service.courseDesign.CourseDesignService;

@Action
@RequestMapping("/DD/CourseDesign")
@Controller
public class CourseDesignAction {
	@Resource(name="courseDesignServiceBean")
	private CourseDesignService courseDesignService;
	
	public CourseDesign saveCourseDesign(CourseDesign courseDesign) {
		try {
			CourseDesign saveCourseDesign = this.courseDesignService.saveCourseDesign(courseDesign);
			return saveCourseDesign;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteCourseDesign(Long courseDesignId) {
		
		try {
			return this.courseDesignService.deleteCourseDesign(courseDesignId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public CourseDesign updateCourseDesign(CourseDesign courseDesign) {
		try {
			CourseDesign updateCourseDesign = this.courseDesignService.updateCourseDesign(courseDesign);
			return updateCourseDesign;
		} catch (DDDException e) {
			throw e;
		}
	}

	public CourseDesign findCourseDesignById(Long courseDesignId) {
		try {
			CourseDesign findCourseDesign = this.courseDesignService.findCourseDesignById(courseDesignId);
			return  findCourseDesign;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<CourseDesign > findCourseDesignByMajorAndSestem(Long stuMajor,String currentSemester) {
		try {
			EntitySet<CourseDesign > courseDesigns = this.courseDesignService.findCourseDesignByMajorAndSestem(stuMajor,currentSemester);
			return courseDesigns;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<CourseDesign > findAllCourseDesign() {
		try {
			EntitySet<CourseDesign > allCourseDesign = this.courseDesignService.findAllCourseDesign();
			return allCourseDesign;
		} catch (DDDException e) {
			throw e;
		}
	}

}