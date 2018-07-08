package ddd.simple.dao.headPortrait.impl;

import org.springframework.stereotype.Service;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import ddd.simple.dao.headPortrait.HeadPortraitDao;
import ddd.simple.entity.headPortrait.HeadPortrait;

@Service
public class HeadPortraitDaoBean extends BaseDao implements HeadPortraitDao {
	@Override
	public HeadPortrait saveHeadPortrait(HeadPortrait headPortrait)  throws Exception {
		return this.save(headPortrait);
	}

	@Override
	public int deleteHeadPortrait(Long headPortraitId)  throws Exception {
		return this.deleteById(headPortraitId,HeadPortrait.class);
	}

	@Override
	public HeadPortrait updateHeadPortrait(HeadPortrait headPortrait)  throws Exception {
		return this.update(headPortrait);
	}

	@Override
	public HeadPortrait findHeadPortraitById(Long headPortraitId)  throws Exception {
		return this.query(headPortraitId, HeadPortrait.class);
	}
	
	@Override
	public EntitySet<HeadPortrait> findAllHeadPortrait() throws Exception {
		return this.query("1=1",HeadPortrait.class);
	}
	@Override
    public  EntitySet<HeadPortrait> findLogoUrl(Long employeeId)throws Exception {
    	String sql = "select * from headPortrait where operateDate in ( select max(operateDate) from headPortrait where employeeId = "+employeeId+")";
		return this.queryBySql(sql, HeadPortrait.class);
	}
}
