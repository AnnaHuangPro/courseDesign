package ddd.simple.dao.ws.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.ws.Swdj;
import ddd.simple.dao.ws.SwdjDao;

@Service
public class SwdjDaoBean extends BaseDao implements SwdjDao {
	@Override
	public Swdj saveSwdj(Swdj swdj)  throws Exception {
		return this.save(swdj);
	}

	@Override
	public int deleteSwdj(Long swdjId)  throws Exception {
		return this.deleteById(swdjId,Swdj.class);
	}

	@Override
	public Swdj updateSwdj(Swdj swdj)  throws Exception {
		return this.update(swdj);
	}

	@Override
	public Swdj findSwdjById(Long swdjId)  throws Exception {
		return this.query(swdjId, Swdj.class);
	}
	
	@Override
	public EntitySet<Swdj> findAllSwdj() throws Exception {
		return this.query("1=1",Swdj.class);
	}
}
