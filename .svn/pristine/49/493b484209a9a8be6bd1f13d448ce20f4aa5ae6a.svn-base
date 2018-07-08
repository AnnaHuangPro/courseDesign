package ddd.simple.action.listview;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.listview.DataSourceType;
import ddd.simple.service.listview.DataSourceTypeService;

@Action
@RequestMapping("/DD/DataSourceType")
@Controller
public class DataSourceTypeAction {
	@Resource(name="dataSourceTypeServiceBean")
	private DataSourceTypeService dataSourceTypeService;
	
	public DataSourceType saveDataSourceType(DataSourceType dataSourceType) {
		try {
			DataSourceType saveDataSourceType = this.dataSourceTypeService.saveDataSourceType(dataSourceType);
			return saveDataSourceType;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteDataSourceType(Long dataSourceTypeId) {
		
		try {
			return this.dataSourceTypeService.deleteDataSourceType(dataSourceTypeId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public DataSourceType updateDataSourceType(DataSourceType dataSourceType) {
		try {
			DataSourceType updateDataSourceType = this.dataSourceTypeService.updateDataSourceType(dataSourceType);
			return updateDataSourceType;
		} catch (DDDException e) {
			throw e;
		}
	}

	public DataSourceType findDataSourceTypeById(Long dataSourceTypeId) {
		try {
			DataSourceType findDataSourceType = this.dataSourceTypeService.findDataSourceTypeById(dataSourceTypeId);
			return  findDataSourceType;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<DataSourceType > findAllDataSourceType() {
		try {
			EntitySet<DataSourceType > allDataSourceType = this.dataSourceTypeService.findAllDataSourceType();
			return allDataSourceType;
		} catch (DDDException e) {
			throw e;
		}
	}

}