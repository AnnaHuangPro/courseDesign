package ddd.simple.service.courseDesign;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.courseDesign.StuCourseProgress;

public interface StuCourseProgressService extends BaseServiceInterface {
	public StuCourseProgress saveStuCourseProgress(StuCourseProgress stuCourseProgress) ;
	
	public int deleteStuCourseProgress(Long stuCourseProgressId) ;
	
	public StuCourseProgress updateStuCourseProgress(StuCourseProgress stuCourseProgress) ;
	
	public StuCourseProgress findStuCourseProgressById(Long stuCourseProgressId) ;
	
	public EntitySet<StuCourseProgress> findAllStuCourseProgress() ;
 
}