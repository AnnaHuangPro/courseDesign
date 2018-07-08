package ddd.simple.dao.major_module.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.major_module.Major;
import ddd.simple.dao.major_module.MajorDao;

@Service
public class MajorDaoBean extends BaseDao implements MajorDao {
	@Override
	public Major saveMajor(Major major)  throws Exception {
		return this.save(major);
	}

	@Override
	public int deleteMajor(Long majorId)  throws Exception {
		return this.deleteById(majorId,Major.class);
	}

	@Override
	public Major updateMajor(Major major)  throws Exception {
		return this.update(major);
	}

	@Override
	public Major findMajorById(Long majorId)  throws Exception {
		return this.query(majorId, Major.class);
	}
	
	@Override
	public EntitySet<Major> findAllMajor() throws Exception {
		return this.query("1=1",Major.class);
	}
}
