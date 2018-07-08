package ddd.simple.service.listview.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.Config;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.util.EntityUtil;
import ddd.simple.dao.listview.ReportViewDao;
import ddd.simple.dao.operatorCongfigModel.OperatorCongfigDao;
import ddd.simple.entity.listview.DisplayAttribute;
import ddd.simple.entity.listview.OrderCondition;
import ddd.simple.entity.listview.ReportView;
import ddd.simple.service.cache.JSONCacheEngine;
import ddd.simple.service.listview.ReportViewService;
import ddd.simple.util.Strings;

@Service
public class ReportViewServiceBean implements ReportViewService{
	
	@Resource(name="reportViewDaoBean")
	private ReportViewDao reportViewDao;
	
	@Resource(name="operatorCongfigDaoBean")
	private OperatorCongfigDao operatorCongfigDao;
	
	public ReportView addReportView(ReportView reportView) {
		try {
			
			if(reportView.getDataSource()!=null) {
				if("接口".equals(reportView.getDataSource().getDataSourceType()))
				{
				}
				else
				{
					String filnalSql = generateSql(reportView);
					reportView.setFinalSql(filnalSql);
				}
				reportView = this.reportViewDao.addReportView(reportView);
			}
			else {
				System.err.println(reportView.getReportViewName() + ":的数据源为空");
			}
			//JSONCacheEngine.putCache("reportView", reportView.getReportViewKey(), reportView);
			return reportView;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("addReportView", e.getMessage(), e);
		}
	}

	@Override
	public ReportView updateReportView(ReportView reportView) {
		try {
			
			if("接口".equals(reportView.getDataSource().getDataSourceType()))
			{
			}
			else
			{
				String finalSql  = this.generateSql(reportView);
				reportView.setFinalSql(finalSql); 
			}
			reportView = this.reportViewDao.updateReportView(reportView);
			operatorCongfigDao.deleteOperatorCongfigByKey("ListView_"+reportView.getReportViewKey());
			//JSONCacheEngine.putCache("reportView", reportView.getReportViewKey(), reportView);
			return reportView;  
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateReportView", e.getMessage(), e);
		}
	}

	@Override
	public ReportView findReportViewById(Long reportViewId) {
		try {
			return this.reportViewDao.findReportViewById(reportViewId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findReportViewById", e.getMessage(), e);
		}
	}
	
	public ReportView findReportViewByKey(String reportViewKey) {
		try {
			return this.reportViewDao.findReportViewByKey(reportViewKey);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findReportViewByKey", e.getMessage(), e);
		}
	}

	@Override
	public int deleteReportView(Long reportViewId) {
		try {
			return this.reportViewDao.deleteReportView(reportViewId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteReportView", e.getMessage(), e);
		}
	}

	/*public Set<ColumnMetaData> findColumns(Long dataSourceId) {
		try {
			return this.reportViewDao.findColumns(dataSourceId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findColumns", e.getMessage(), e);
		}
	}*/

	private String generateSql(ReportView reportView)
	{
		String finalSql = Strings.BASESQL;
		
		finalSql = processSqlWithOrder(reportView,finalSql);
		finalSql = processSqlWithDislay(reportView,finalSql);
		
		return finalSql;
	}
	
	private String processSqlWithDislay(ReportView reportView,String finalSql){
		
		if(reportView.getDisplayAttributes().size()>0){
			String field = "" ;
			for(DisplayAttribute display :reportView.getDisplayAttributes())
			{
				if("EId".equalsIgnoreCase(display.getAttributeName())){
					field +=display.getColumnIndex() == 0? "EId EId":", EId EId";
					continue;
				}
				
				if(display.getShowType() == null)
				{
					display.setShowType("");
				}
				
				//处理小数位数
				if(display.getShowType().indexOf("#") >= 0)
				{
					
				}
				//处理日期
				else if(display.getShowType().indexOf("YY") >= 0)
				{
					if(field.length() > 0)
					{
						field += ",";
					}
					field += "$dateFormat.format('"+display.getAttributeName()+"','"+display.getShowType()+"')  "+display.getAttributeName()+"";
				}
				else
				{
					field += display.generateDisplaySql();
				}
			}
			
			//去掉第一个,
			if(field.indexOf(",")==1)
			{
				field = field.substring(2, field.length());
			}
			finalSql = "select "+field+" from (" +finalSql+ ")dt0";
		}
		return finalSql;
	}
	
	private String processSqlWithOrder(ReportView reportView,String finalSql){
		
		if(reportView.getOrderConditions().size() > 0){
			String sql = finalSql + " order by " ;
			
			for(OrderCondition order : reportView.getOrderConditions()){
				sql = sql+order.generateOrderSql(sql)+" , ";
			}
			
			sql = sql.substring(0, sql.length()-2);
		}
		
		return finalSql;
	}

	@Override
	public ReportView copyReportView(Long reportViewId, String reportViewKey) {
		try {
			ReportView orReportView = this.findReportViewById(reportViewId);
			if(orReportView!=null){
				orReportView.getDisplayAttributes();
				orReportView.getOrderConditions();
				orReportView.getDataSource();
				ReportView newPeportView = (ReportView)EntityUtil.clone(orReportView);
				newPeportView.setReportViewKey(reportViewKey);
				newPeportView.setEId(null);
				newPeportView = cleanAttrbuiltsEId(newPeportView);
				
				String filnalSql = generateSql(newPeportView);
				newPeportView.setFinalSql(filnalSql);
				
				return this.reportViewDao.addReportView(newPeportView);
			}
			else
			{
				return new ReportView();
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("copyReportView", "复制视图失败", e);
		}
	}

	private ReportView cleanAttrbuiltsEId(ReportView reportView) {
		EntitySet<DisplayAttribute> displays = reportView.getDisplayAttributes();
		EntitySet<OrderCondition> orders = reportView.getOrderConditions();
		
		for(DisplayAttribute dispaly:displays)
		{
			dispaly.setEId(null);
		}
		for(OrderCondition order:orders)
		{
			order.setEId(null);
		}
		return reportView;
	}

	/* (非 Javadoc) 
	* <p>Title: findAllReportViews</p> 
	* <p>Description: </p> 
	* @return
	* @throws Exception 
	* @see ddd.simple.service.listview.ReportViewService#findAllReportViews() 
	*/
	@Override
	public Set<ReportView> findAllReportViews() throws Exception
	{
		return this.reportViewDao.findAllReportViews();
	}
}
