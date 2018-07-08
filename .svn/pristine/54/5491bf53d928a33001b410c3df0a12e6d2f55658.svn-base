<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter,
	ddd.base.helper.ActionHelper,ddd.base.helper.bean.ActionBean,
	org.springframework.web.context.ContextLoaderListener"
	pageEncoding="UTF-8"%>

<%@ page trimDirectiveWhitespaces="true"%>

<%
	request.setCharacterEncoding("utf-8");
	String requestPath = request.getParameter("action");
	
	if (requestPath != null && requestPath.equals("config"))
	{
		response.setHeader("Content-Type", "text/html");
		String rootPath = application.getRealPath("/");
		out.write(new ActionEnter(request, rootPath).exec());
	} else if(requestPath != null && !requestPath.equals(""))
	{
		ActionBean actionBean = ActionHelper.getActionMap().get(requestPath);
		if (actionBean == null)
		{
			/* 不为action 重定向*/
			request.getRequestDispatcher(requestPath).forward(request, response); 
		}
		else{
			Object actionInstance = ContextLoaderListener.getCurrentWebApplicationContext().getBean(actionBean.getBean());
			actionBean.getActionMethod().invoke(actionInstance, new Object[]{request,response});
		}
	} 
%>