package ddd.simple.action.model;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.exception.DDDException;
import ddd.base.expression.ExpressionService;

@Action
@RequestMapping("/ModelExpression")
@Controller
public class ModelExpressionAction {
	@Resource(name = "expressionService")
	private ExpressionService expressionService;
	
	public Object analyticExpressionWithParam(String expression,Map<String,Object> params){
		try{
			return this.expressionService.execute(expression, params);
		}catch(DDDException e){
			throw e;
		}
	}
	
	public Object analyticExpression(String expression){
		try{
			return this.expressionService.execute(expression);
		}catch(DDDException e){
			throw e;
		}
	}
}
