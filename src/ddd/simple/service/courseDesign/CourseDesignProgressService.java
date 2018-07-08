package ddd.simple.service.courseDesign;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.courseDesign.CourseDesignProgress;

public interface CourseDesignProgressService extends BaseServiceInterface {
	public CourseDesignProgress saveCourseDesignProgress(CourseDesignProgress courseDesignProgress) ;
	
	public int deleteCourseDesignProgress(Long courseDesignProgressId) ;
	
	public CourseDesignProgress updateCourseDesignProgress(CourseDesignProgress courseDesignProgress) ;
	
	public CourseDesignProgress findCourseDesignProgressById(Long courseDesignProgressId) ;
	
	public EntitySet<CourseDesignProgress> findCourseProgressByCourseIdAndTeaEId(Long courseId,Long teaId);
	
	public CourseDesignProgress findStage(int progressStage,Long courseId,Long teaId);
	
	public EntitySet<CourseDesignProgress> findAllCourseDesignProgress() ;
 
}