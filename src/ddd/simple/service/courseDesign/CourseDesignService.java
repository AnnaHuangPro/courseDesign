package ddd.simple.service.courseDesign;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.courseDesign.CourseDesign;

public interface CourseDesignService extends BaseServiceInterface {
	public CourseDesign saveCourseDesign(CourseDesign courseDesign) ;
	
	public int deleteCourseDesign(Long courseDesignId) ;
	
	public CourseDesign updateCourseDesign(CourseDesign courseDesign) ;
	
	public CourseDesign findCourseDesignById(Long courseDesignId) ;
	
	public EntitySet<CourseDesign> findCourseDesignByMajorAndSestem(Long majorId,String currentSemester);
	
	public EntitySet<CourseDesign> findAllCourseDesign() ;
 
}