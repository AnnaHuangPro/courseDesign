package ddd.simple.dao.courseDesign.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.courseDesign.CourseDesign;
import ddd.simple.dao.courseDesign.CourseDesignDao;

@Service
public class CourseDesignDaoBean extends BaseDao implements CourseDesignDao {
	@Override
	public CourseDesign saveCourseDesign(CourseDesign courseDesign)  throws Exception {
		return this.save(courseDesign);
	}

	@Override
	public int deleteCourseDesign(Long courseDesignId)  throws Exception {
		return this.deleteById(courseDesignId,CourseDesign.class);
	}

	@Override
	public CourseDesign updateCourseDesign(CourseDesign courseDesign)  throws Exception {
		return this.update(courseDesign);
	}

	@Override
	public CourseDesign findCourseDesignById(Long courseDesignId)  throws Exception {
		return this.query(courseDesignId, CourseDesign.class);
	}
	
	@Override
	public EntitySet<CourseDesign> findCourseDesignByMajorAndSestem(Long majorId,String currentSemester)  throws Exception{
		return this.query("majorId = "+majorId+" and currentSemester = '"+currentSemester+"'",CourseDesign.class);
	}
	
	@Override
	public EntitySet<CourseDesign> findAllCourseDesign() throws Exception {
		return this.query("1=1",CourseDesign.class);
	}
}
