package ddd.simple.service.ws.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.ws.Zldj;
import ddd.simple.dao.ws.ZldjDao;
import ddd.simple.service.ws.ZldjService;

@Service
public class ZldjServiceBean extends BaseService implements ZldjService {
	@Resource(name="zldjDaoBean")
	private ZldjDao zldjDao;
	
	@Override
	public Zldj saveZldj(Zldj zldj) {
		try {
			return this.zldjDao.saveZldj(zldj);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveZldj", e.getMessage(), e);
		}
	}

	@Override
	public int deleteZldj(Long zldjId) {
		try {
			return this.zldjDao.deleteZldj(zldjId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteZldj", e.getMessage(), e);
		}
		
	}

	@Override
	public Zldj updateZldj(Zldj zldj) {
		try {
			return this.zldjDao.updateZldj(zldj);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateZldj", e.getMessage(), e);
		}
	}

	@Override
	public Zldj findZldjById(Long zldjId) {
		try {
			return this.zldjDao.findZldjById(zldjId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findZldjById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Zldj> findAllZldj() {
		try {
			return this.zldjDao.findAllZldj();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllZldj", e.getMessage(), e);
		}
	}

}
