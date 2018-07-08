package ddd.simple.dao.courseDesign;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.courseDesign.CourseDesign;

public interface CourseDesignDao extends BaseDaoInterface {
	public CourseDesign saveCourseDesign(CourseDesign courseDesign) throws Exception;
	
	public int deleteCourseDesign(Long courseDesignId) throws Exception;
	
	public CourseDesign updateCourseDesign(CourseDesign courseDesign) throws Exception;
	
	public CourseDesign findCourseDesignById(Long courseDesignId) throws Exception;
	
	public EntitySet<CourseDesign> findCourseDesignByMajorAndSestem(Long majorId,String currentSemester) throws Exception;
	
	public EntitySet<CourseDesign> findAllCourseDesign() throws Exception;
}
