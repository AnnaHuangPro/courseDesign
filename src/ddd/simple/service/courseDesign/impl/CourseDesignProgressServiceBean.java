package ddd.simple.service.courseDesign.impl;


import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.courseDesign.CourseDesignProgress;
import ddd.simple.dao.courseDesign.CourseDesignProgressDao;
import ddd.simple.service.courseDesign.CourseDesignProgressService;

@Service
public class CourseDesignProgressServiceBean extends BaseService implements CourseDesignProgressService {
	@Resource(name="courseDesignProgressDaoBean")
	private CourseDesignProgressDao courseDesignProgressDao;
	
	@Override
	public CourseDesignProgress saveCourseDesignProgress(CourseDesignProgress courseDesignProgress) {
		try {
			int stage = courseDesignProgress.getProgressStage();
			 EntitySet<CourseDesignProgress> progresses = findCourseProgressByCourseIdAndTeaEId(courseDesignProgress.getCourseId(),courseDesignProgress.getTeaId());
			 for(CourseDesignProgress cd:progresses){
				 int prostatge = cd.getProgressStage();
				 if(stage == prostatge){
					 return null;
				 }
			 }
			 return this.courseDesignProgressDao.saveCourseDesignProgress(courseDesignProgress);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveCourseDesignProgress", e.getMessage(), e);
		}
	}

	@Override
	public int deleteCourseDesignProgress(Long courseDesignProgressId) {
		try {
			return this.courseDesignProgressDao.deleteCourseDesignProgress(courseDesignProgressId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteCourseDesignProgress", e.getMessage(), e);
		}
		
	}

	@Override
	public CourseDesignProgress updateCourseDesignProgress(CourseDesignProgress courseDesignProgress) {
		try {
			return this.courseDesignProgressDao.updateCourseDesignProgress(courseDesignProgress);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateCourseDesignProgress", e.getMessage(), e);
		}
	}

	@Override
	public CourseDesignProgress findCourseDesignProgressById(Long courseDesignProgressId) {
		try {
			return this.courseDesignProgressDao.findCourseDesignProgressById(courseDesignProgressId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findCourseDesignProgressById", e.getMessage(), e);
		}
	}
	
	@Override
	public CourseDesignProgress findStage(int progressStage,Long courseId,Long teaId) {
		try {
			return this.courseDesignProgressDao.findStage(progressStage,courseId,teaId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findCourseDesignProgressById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<CourseDesignProgress> findCourseProgressByCourseIdAndTeaEId(Long courseId,Long teaId){
		try {
			return this.courseDesignProgressDao.findCourseProgressByCourseIdAndTeaEId(courseId,teaId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findCDProgressByCourseId", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<CourseDesignProgress> findAllCourseDesignProgress() {
		try {
			return this.courseDesignProgressDao.findAllCourseDesignProgress();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllCourseDesignProgress", e.getMessage(), e);
		}
	}

}
