package ddd.simple.dao.courseDesign.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.courseDesign.CourseDesignProgress;
import ddd.simple.dao.courseDesign.CourseDesignProgressDao;

@Service
public class CourseDesignProgressDaoBean extends BaseDao implements CourseDesignProgressDao {
	@Override
	public CourseDesignProgress saveCourseDesignProgress(CourseDesignProgress courseDesignProgress)  throws Exception {
		return this.save(courseDesignProgress);
	}

	@Override
	public int deleteCourseDesignProgress(Long courseDesignProgressId)  throws Exception {
		return this.deleteById(courseDesignProgressId,CourseDesignProgress.class);
	}

	@Override
	public CourseDesignProgress updateCourseDesignProgress(CourseDesignProgress courseDesignProgress)  throws Exception {
		return this.update(courseDesignProgress);
	}

	@Override
	public CourseDesignProgress findCourseDesignProgressById(Long courseDesignProgressId)  throws Exception {
		return this.query(courseDesignProgressId, CourseDesignProgress.class);
	}
	
	public CourseDesignProgress findStage(int progressStage,Long courseId,Long teaId) throws Exception{
		return this.queryOne("progressStage = "+progressStage+" and courseId = "+courseId+" and teaId = "+teaId, CourseDesignProgress.class);
	}
	
	
	@Override
	public EntitySet<CourseDesignProgress> findCourseProgressByCourseIdAndTeaEId(Long courseId,Long teaId) throws Exception{
		return this.query("courseId = "+courseId+" and teaId = "+teaId, CourseDesignProgress.class);
	}
	
	@Override
	public EntitySet<CourseDesignProgress> findAllCourseDesignProgress() throws Exception {
		return this.query("1=1",CourseDesignProgress.class);
	}
}
