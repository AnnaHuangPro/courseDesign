package ddd.simple.service.headPortrait.impl;

import java.util.Iterator;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.headPortrait.HeadPortraitDao;
import ddd.simple.entity.headPortrait.HeadPortrait;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.headPortrait.HeadPortraitService;

@Service
public class HeadPortraitServiceBean extends BaseService implements HeadPortraitService {
	@Resource(name="headPortraitDaoBean")
	private HeadPortraitDao headPortraitDao;
	
	@Override
	public HeadPortrait saveHeadPortrait(HeadPortrait headPortrait) {
		try {
			return this.headPortraitDao.saveHeadPortrait(headPortrait);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveHeadPortrait", e.getMessage(), e);
		}
	}

	@Override
	public int deleteHeadPortrait(Long headPortraitId) {
		try {
			return this.headPortraitDao.deleteHeadPortrait(headPortraitId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteHeadPortrait", e.getMessage(), e);
		}
		
	}

	@Override
	public HeadPortrait updateHeadPortrait(HeadPortrait headPortrait) {
		try {
			return this.headPortraitDao.updateHeadPortrait(headPortrait);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateHeadPortrait", e.getMessage(), e);
		}
	}

	@Override
	public HeadPortrait findHeadPortraitById(Long headPortraitId) {
		try {
			return this.headPortraitDao.findHeadPortraitById(headPortraitId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findHeadPortraitById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<HeadPortrait> findAllHeadPortrait() {
		try {
			return this.headPortraitDao.findAllHeadPortrait();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllHeadPortrait", e.getMessage(), e);
		}
	}
	
	//查到职业头像
	@Override
	public String findLogoUrl(Long employee) {
		try {
			EntitySet<HeadPortrait> entitys = this.headPortraitDao.findLogoUrl(employee);
			Iterator<HeadPortrait>  iterators = entitys.iterator();
			HeadPortrait headportrait = new  HeadPortrait();
			while(iterators.hasNext()){
				headportrait = iterators.next();
			}
			if(headportrait!=null){
				return headportrait.getLogoUrl();
			}
			else
			{
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllHeadPortrait", e.getMessage(), e);
		}
	}

}
