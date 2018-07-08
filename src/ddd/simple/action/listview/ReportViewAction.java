package ddd.simple.action.listview;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.util.EntityUtil;
import ddd.simple.entity.listview.DataSource;
import ddd.simple.entity.listview.DisplayAttribute;
import ddd.simple.entity.listview.ReportView;
import ddd.simple.entity.listview.ViewTreeCondition;
import ddd.simple.service.listview.DataSourceService;
import ddd.simple.service.listview.ReportViewService;

@Action
@RequestMapping("/ReportView")
@Controller
public class ReportViewAction
{
	
	@Resource(name="reportViewServiceBean")
	private ReportViewService reportViewService;
	
	@Resource(name = "dataSourceServiceBean")
	private DataSourceService dataSourceService;
	
	public Set<ReportView> test(){
		try
		{
			Set<ReportView> test = this.reportViewService.findAllReportViews();
			Iterator<ReportView> ite = test.iterator();
			while(ite.hasNext()){
				ReportView t = ite.next();
				EntityUtil.loadLazyProperty(t, "displayAttributes");
				EntityUtil.loadLazyProperty(t, "displayAttributes.notShow");
				EntityUtil.clearProperty(t, "displayAttributes.reportView");
				EntityUtil.loadLazyProperty(t, "orderConditions");
				EntityUtil.clearProperty(t, "orderConditions.reportView");
				EntityUtil.loadLazyProperty(t, "searchConditions");
				EntityUtil.clearProperty(t, "searchConditions.reportView");
				EntityUtil.loadLazyProperty(t, "viewTreeConditions");
				EntityUtil.clearProperty(t, "viewTreeConditions.reportView");
				
				
				EntitySet<DisplayAttribute> t1 = t.getDisplayAttributes();
				Iterator<DisplayAttribute> ite1 = t1.iterator();
				while(ite1.hasNext()){
					DisplayAttribute dt = ite1.next();
					dt.setEId(null);
					dt.setLazyFieidsLoaded(null);
				}
				
				EntitySet<ViewTreeCondition> t2 = t.getViewTreeConditions();
				Iterator<ViewTreeCondition> ite2 = t2.iterator();
				while(ite2.hasNext()){
					ViewTreeCondition vt = ite2.next();
					vt.setEId(null);
					vt.setLazyFieidsLoaded(null);
				}
				
				t.setEId(null);
				t.setDataSource(null);
				t.setLazyFieidsLoaded(null);
			}
			return test;
			
		} catch (Exception e)
		{
			// TODO: handle exception
			return null;
		}
	}
	
	public Map<String,Object> getReportViewInitData(Long dataSourceId)
	{
		try {
			DataSource dataSource =this.dataSourceService.findDataSourceById(dataSourceId);
			
			EntityUtil.clearProperty(dataSource, "htmlColumns.dataSource");
			
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("dataSource", dataSource);
			map.put("sqlParams", this.dataSourceService.getParams(dataSource.getDataSourceCode()));
			
			return map;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public ReportView addReportView(ReportView reportView)
	{
		try {
			ReportView reportViewSaved = this.reportViewService.addReportView(reportView);
			return reportViewSaved;
		} catch (DDDException e) {
			throw e;
		}
		
	}
	
	public Map<String,Object> findReportViewById(Long reportViewId)
	{
		try {
			ReportView reportView = this.reportViewService.findReportViewById(reportViewId);
			
			EntityUtil.loadLazyProperty(reportView, "displayAttributes");
			EntityUtil.loadLazyProperty(reportView, "displayAttributes.notShow");
			EntityUtil.clearProperty(reportView, "displayAttributes.reportView");
			EntityUtil.loadLazyProperty(reportView, "orderConditions");
			EntityUtil.clearProperty(reportView, "orderConditions.reportView");
			EntityUtil.loadLazyProperty(reportView, "searchConditions");
			EntityUtil.clearProperty(reportView, "searchConditions.reportView");
			EntityUtil.loadLazyProperty(reportView, "viewTreeConditions");
			EntityUtil.clearProperty(reportView, "viewTreeConditions.reportView");
			
			Map<String,Object> map = getReportViewInitData(reportView.getDataSource().getEId());
			map.put("reportView", reportView);
			
			
			
			return map;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public ReportView updateReportView(ReportView reportView)
	{
		try {
			ReportView reportViewSaved = this.reportViewService.updateReportView(reportView);
			return reportViewSaved;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public int deleteReportView(Long reportViewId)
	{
		try {
			return this.reportViewService.deleteReportView(reportViewId);
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public ReportView copyReportView(Long reportViewId,String reportViewKey)
	{
		try {
			return this.reportViewService.copyReportView(reportViewId,reportViewKey);
		} catch (DDDException e) {
			throw e;
		}
	}
}
