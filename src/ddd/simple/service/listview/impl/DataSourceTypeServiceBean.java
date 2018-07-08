package ddd.simple.service.listview.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.listview.DataSourceType;
import ddd.simple.dao.listview.DataSourceTypeDao;
import ddd.simple.service.listview.DataSourceTypeService;

@Service
public class DataSourceTypeServiceBean extends BaseService implements DataSourceTypeService {
	@Resource(name="dataSourceTypeDaoBean")
	private DataSourceTypeDao dataSourceTypeDao;
	
	@Override
	public DataSourceType saveDataSourceType(DataSourceType dataSourceType) {
		try {
			return this.dataSourceTypeDao.saveDataSourceType(dataSourceType);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveDataSourceType", e.getMessage(), e);
		}
	}

	@Override
	public int deleteDataSourceType(Long dataSourceTypeId) {
		try {
			return this.dataSourceTypeDao.deleteDataSourceType(dataSourceTypeId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteDataSourceType", e.getMessage(), e);
		}
		
	}

	@Override
	public DataSourceType updateDataSourceType(DataSourceType dataSourceType) {
		try {
			return this.dataSourceTypeDao.updateDataSourceType(dataSourceType);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateDataSourceType", e.getMessage(), e);
		}
	}

	@Override
	public DataSourceType findDataSourceTypeById(Long dataSourceTypeId) {
		try {
			return this.dataSourceTypeDao.findDataSourceTypeById(dataSourceTypeId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findDataSourceTypeById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<DataSourceType> findAllDataSourceType() {
		try {
			return this.dataSourceTypeDao.findAllDataSourceType();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllDataSourceType", e.getMessage(), e);
		}
	}

}
