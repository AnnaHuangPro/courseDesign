package ddd.simple.service.courseDesign.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.courseDesign.CourseDesign;
import ddd.simple.dao.courseDesign.CourseDesignDao;
import ddd.simple.service.courseDesign.CourseDesignService;

@Service
public class CourseDesignServiceBean extends BaseService implements CourseDesignService {
	@Resource(name="courseDesignDaoBean")
	private CourseDesignDao courseDesignDao;
	
	@Override
	public CourseDesign saveCourseDesign(CourseDesign courseDesign) {
		try {
			return this.courseDesignDao.saveCourseDesign(courseDesign);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveCourseDesign", e.getMessage(), e);
		}
	}

	@Override
	public int deleteCourseDesign(Long courseDesignId) {
		try {
			return this.courseDesignDao.deleteCourseDesign(courseDesignId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteCourseDesign", e.getMessage(), e);
		}
		
	}

	@Override
	public CourseDesign updateCourseDesign(CourseDesign courseDesign) {
		try {
			return this.courseDesignDao.updateCourseDesign(courseDesign);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateCourseDesign", e.getMessage(), e);
		}
	}

	@Override
	public CourseDesign findCourseDesignById(Long courseDesignId) {
		try {
			return this.courseDesignDao.findCourseDesignById(courseDesignId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findCourseDesignById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<CourseDesign> findCourseDesignByMajorAndSestem(Long majorId,String currentSemester){
		try {
			return this.courseDesignDao.findCourseDesignByMajorAndSestem(majorId,currentSemester);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllCourseDesign", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<CourseDesign> findAllCourseDesign() {
		try {
			return this.courseDesignDao.findAllCourseDesign();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllCourseDesign", e.getMessage(), e);
		}
	}

}
