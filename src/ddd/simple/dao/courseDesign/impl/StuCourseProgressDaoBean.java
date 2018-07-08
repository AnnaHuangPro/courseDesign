package ddd.simple.dao.courseDesign.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.courseDesign.StuCourseProgress;
import ddd.simple.dao.courseDesign.StuCourseProgressDao;

@Service
public class StuCourseProgressDaoBean extends BaseDao implements StuCourseProgressDao {
	@Override
	public StuCourseProgress saveStuCourseProgress(StuCourseProgress stuCourseProgress)  throws Exception {
		return this.save(stuCourseProgress);
	}

	@Override
	public int deleteStuCourseProgress(Long stuCourseProgressId)  throws Exception {
		return this.deleteById(stuCourseProgressId,StuCourseProgress.class);
	}

	@Override
	public StuCourseProgress updateStuCourseProgress(StuCourseProgress stuCourseProgress)  throws Exception {
		return this.update(stuCourseProgress);
	}

	@Override
	public StuCourseProgress findStuCourseProgressById(Long stuCourseProgressId)  throws Exception {
		return this.query(stuCourseProgressId, StuCourseProgress.class);
	}
	
	@Override
	public EntitySet<StuCourseProgress> findAllStuCourseProgress() throws Exception {
		return this.query("1=1",StuCourseProgress.class);
	}
}
