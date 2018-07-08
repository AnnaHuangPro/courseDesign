package ddd.simple.service.ws.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.ws.Swdj;
import ddd.simple.dao.ws.SwdjDao;
import ddd.simple.service.ws.SwdjService;

@Service
public class SwdjServiceBean extends BaseService implements SwdjService {
	@Resource(name="swdjDaoBean")
	private SwdjDao swdjDao;
	
	@Override
	public Swdj saveSwdj(Swdj swdj) {
		try {
			return this.swdjDao.saveSwdj(swdj);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveSwdj", e.getMessage(), e);
		}
	}

	@Override
	public int deleteSwdj(Long swdjId) {
		try {
			return this.swdjDao.deleteSwdj(swdjId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteSwdj", e.getMessage(), e);
		}
		
	}

	@Override
	public Swdj updateSwdj(Swdj swdj) {
		try {
			return this.swdjDao.updateSwdj(swdj);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateSwdj", e.getMessage(), e);
		}
	}

	@Override
	public Swdj findSwdjById(Long swdjId) {
		try {
			return this.swdjDao.findSwdjById(swdjId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findSwdjById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Swdj> findAllSwdj() {
		try {
			return this.swdjDao.findAllSwdj();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllSwdj", e.getMessage(), e);
		}
	}

}
