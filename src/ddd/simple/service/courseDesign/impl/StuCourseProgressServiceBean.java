package ddd.simple.service.courseDesign.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.courseDesign.StuCourseProgress;
import ddd.simple.dao.courseDesign.StuCourseProgressDao;
import ddd.simple.service.courseDesign.StuCourseProgressService;

@Service
public class StuCourseProgressServiceBean extends BaseService implements StuCourseProgressService {
	@Resource(name="stuCourseProgressDaoBean")
	private StuCourseProgressDao stuCourseProgressDao;
	
	@Override
	public StuCourseProgress saveStuCourseProgress(StuCourseProgress stuCourseProgress) {
		try {
			return this.stuCourseProgressDao.saveStuCourseProgress(stuCourseProgress);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveStuCourseProgress", e.getMessage(), e);
		}
	}

	@Override
	public int deleteStuCourseProgress(Long stuCourseProgressId) {
		try {
			return this.stuCourseProgressDao.deleteStuCourseProgress(stuCourseProgressId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteStuCourseProgress", e.getMessage(), e);
		}
		
	}

	@Override
	public StuCourseProgress updateStuCourseProgress(StuCourseProgress stuCourseProgress) {
		try {
			return this.stuCourseProgressDao.updateStuCourseProgress(stuCourseProgress);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateStuCourseProgress", e.getMessage(), e);
		}
	}

	@Override
	public StuCourseProgress findStuCourseProgressById(Long stuCourseProgressId) {
		try {
			return this.stuCourseProgressDao.findStuCourseProgressById(stuCourseProgressId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findStuCourseProgressById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<StuCourseProgress> findAllStuCourseProgress() {
		try {
			return this.stuCourseProgressDao.findAllStuCourseProgress();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllStuCourseProgress", e.getMessage(), e);
		}
	}

}
