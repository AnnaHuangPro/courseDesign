package ddd.simple.service.reportForm;

import java.util.Map;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.reportForm.ReportForm;

public interface ReportFormService extends BaseServiceInterface
{
	public ReportForm saveReportForm(ReportForm reportForm) ;
	
	public int deleteReportForm(Long reportFormId) ;
	
	public ReportForm updateReportForm(ReportForm reportForm) ;
	
	public ReportForm findReportFormById(Long reportFormId) ;
	
	public EntitySet<ReportForm> findAllReportForm() ;

	public String excel2Html(String templatePath,Map<String,Object> params);

	public Map<String, String> excel2Html(Map<String, String> modelInfos, Map<String, Object> params);

	public Map<String, Object> getReportFormQueryData(String templatePath, Map<String, Object> params);

	public Map<String, Object> generateDataFromInterface(String modelFileKey,Map<String, Object> params,String templateFileName);

 
}