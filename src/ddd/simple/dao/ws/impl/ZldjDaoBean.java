package ddd.simple.dao.ws.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.ws.Zldj;
import ddd.simple.dao.ws.ZldjDao;

@Service
public class ZldjDaoBean extends BaseDao implements ZldjDao {
	@Override
	public Zldj saveZldj(Zldj zldj)  throws Exception {
		return this.save(zldj);
	}

	@Override
	public int deleteZldj(Long zldjId)  throws Exception {
		return this.deleteById(zldjId,Zldj.class);
	}

	@Override
	public Zldj updateZldj(Zldj zldj)  throws Exception {
		return this.update(zldj);
	}

	@Override
	public Zldj findZldjById(Long zldjId)  throws Exception {
		return this.query(zldjId, Zldj.class);
	}
	
	@Override
	public EntitySet<Zldj> findAllZldj() throws Exception {
		return this.query("1=1",Zldj.class);
	}
}
