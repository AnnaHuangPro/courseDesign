package ddd.simple.dao.listview.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.listview.DataSourceType;
import ddd.simple.dao.listview.DataSourceTypeDao;

@Service
public class DataSourceTypeDaoBean extends BaseDao implements DataSourceTypeDao {
	@Override
	public DataSourceType saveDataSourceType(DataSourceType dataSourceType)  throws Exception {
		return this.save(dataSourceType);
	}

	@Override
	public int deleteDataSourceType(Long dataSourceTypeId)  throws Exception {
		return this.deleteById(dataSourceTypeId,DataSourceType.class);
	}

	@Override
	public DataSourceType updateDataSourceType(DataSourceType dataSourceType)  throws Exception {
		return this.update(dataSourceType);
	}

	@Override
	public DataSourceType findDataSourceTypeById(Long dataSourceTypeId)  throws Exception {
		return this.query(dataSourceTypeId, DataSourceType.class);
	}
	
	@Override
	public EntitySet<DataSourceType> findAllDataSourceType() throws Exception {
		return this.query("1=1",DataSourceType.class);
	}
}
