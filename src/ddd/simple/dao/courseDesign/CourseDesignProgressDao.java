package ddd.simple.dao.courseDesign;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.courseDesign.CourseDesignProgress;

public interface CourseDesignProgressDao extends BaseDaoInterface {
	public CourseDesignProgress saveCourseDesignProgress(CourseDesignProgress courseDesignProgress) throws Exception;
	
	public int deleteCourseDesignProgress(Long courseDesignProgressId) throws Exception;
	
	public CourseDesignProgress updateCourseDesignProgress(CourseDesignProgress courseDesignProgress) throws Exception;
	
	public CourseDesignProgress findCourseDesignProgressById(Long courseDesignProgressId) throws Exception;
	
	public EntitySet<CourseDesignProgress> findCourseProgressByCourseIdAndTeaEId(Long courseId,Long teaId) throws Exception;
	
	public CourseDesignProgress findStage(int progressStage,Long courseId,Long teaId) throws Exception;
	
	public EntitySet<CourseDesignProgress> findAllCourseDesignProgress() throws Exception;
}
