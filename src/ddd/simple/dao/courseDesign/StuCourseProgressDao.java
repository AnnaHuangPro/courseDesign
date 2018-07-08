package ddd.simple.dao.courseDesign;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.courseDesign.StuCourseProgress;

public interface StuCourseProgressDao extends BaseDaoInterface {
	public StuCourseProgress saveStuCourseProgress(StuCourseProgress stuCourseProgress) throws Exception;
	
	public int deleteStuCourseProgress(Long stuCourseProgressId) throws Exception;
	
	public StuCourseProgress updateStuCourseProgress(StuCourseProgress stuCourseProgress) throws Exception;
	
	public StuCourseProgress findStuCourseProgressById(Long stuCourseProgressId) throws Exception;
	
	public EntitySet<StuCourseProgress> findAllStuCourseProgress() throws Exception;
}
