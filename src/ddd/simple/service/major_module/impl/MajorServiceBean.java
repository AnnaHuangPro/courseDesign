package ddd.simple.service.major_module.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.major_module.Major;
import ddd.simple.dao.major_module.MajorDao;
import ddd.simple.service.major_module.MajorService;

@Service
public class MajorServiceBean extends BaseService implements MajorService {
	@Resource(name="majorDaoBean")
	private MajorDao majorDao;
	
	@Override
	public Major saveMajor(Major major) {
		try {
			return this.majorDao.saveMajor(major);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveMajor", e.getMessage(), e);
		}
	}

	@Override
	public int deleteMajor(Long majorId) {
		try {
			return this.majorDao.deleteMajor(majorId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteMajor", e.getMessage(), e);
		}
		
	}

	@Override
	public Major updateMajor(Major major) {
		try {
			return this.majorDao.updateMajor(major);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateMajor", e.getMessage(), e);
		}
	}

	@Override
	public Major findMajorById(Long majorId) {
		try {
			return this.majorDao.findMajorById(majorId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMajorById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Major> findAllMajor() {
		try {
			return this.majorDao.findAllMajor();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllMajor", e.getMessage(), e);
		}
	}

}
