package ddd.base.util;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javassist.ClassClassPath;
import javassist.ClassPool;
import javassist.CtClass;
import javassist.CtField;
import javassist.CtMethod;
import javassist.NotFoundException;
import javassist.bytecode.CodeAttribute;
import javassist.bytecode.LocalVariableAttribute;
import javassist.bytecode.MethodInfo;
import org.springframework.core.LocalVariableTableParameterNameDiscoverer;

public class ClassAssist {

	private Class<?> clazz;
	private CtClass ctClass;
	private ClassPool pool = ClassPool.getDefault();
	public ClassAssist(Class<?> clazz) {
		super();
		this.clazz = clazz;
		
		
//			this.ctClass = pool.get(this.clazz.getName());
			
			pool.insertClassPath(new ClassClassPath(this.clazz));
			
		
	};
	public Class<?> getFieldGenericType(String fieldName)
	{
		CtField ctField =null;
		try {
			if(this.ctClass==null){
				this.ctClass = pool.get(this.clazz.getName());
			}
			ctField = this.ctClass.getField(fieldName);
		} catch (NotFoundException e) {
			e.printStackTrace();
			return null;
		}
		String genericSignature = ctField.getGenericSignature();
		
		int startIndex = genericSignature.indexOf('<');
		int endIndex =genericSignature.indexOf('>');
		if(startIndex == -1 || endIndex == -1) return null;
		String genericClassName = genericSignature.substring(startIndex+2,endIndex-1 );
		genericClassName = genericClassName.replace('/', '.');
		try {
			Class<?> genericClass= Class.forName(genericClassName)	;
			return genericClass;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public Class<?> getClassGenericType()
	{
		if(this.ctClass==null){
			try {
				this.ctClass = pool.get(this.clazz.getName());
			} catch (NotFoundException e) {
				e.printStackTrace();
			}
		}
		String genericSignature = ctClass.getGenericSignature();
		
		int startIndex = genericSignature.indexOf('<');
		int endIndex =genericSignature.indexOf('>');
		if(startIndex == -1 || endIndex == -1) return null;
		String genericClassName = genericSignature.substring(startIndex+2,endIndex-1 );
		genericClassName = genericClassName.replace('/', '.');
		try {
			Class<?> genericClass= Class.forName(genericClassName)	;
			return genericClass;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public Class<?> getClassGenericType(Class<?> clazz)
	{
		String genericSignature = null;
		try {
			genericSignature = pool.get(clazz.getName()).getGenericSignature();
		} catch (NotFoundException e1) {
			e1.printStackTrace();
		}
		
		int startIndex = genericSignature.indexOf('<');
		int endIndex =genericSignature.indexOf('>');
		if(startIndex == -1 || endIndex == -1) return null;
		String genericClassName = genericSignature.substring(startIndex+2,endIndex-1 );
		genericClassName = genericClassName.replace('/', '.');
		try {
			Class<?> genericClass= Class.forName(genericClassName)	;
			return genericClass;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 使用javaassist的反射方法获取方法的参数名
	 * @param
	 * @return
	 */
	public Map<String,Class<?>> getMethodParamNames(Method method) {
		try {
			if(this.ctClass==null){
				try {
					this.ctClass = pool.get(this.clazz.getName());
				} catch (NotFoundException e) {
					e.printStackTrace();
				}
			}
			CtMethod ctMethod = this.ctClass.getDeclaredMethod(method.getName());
	
			MethodInfo methodInfo = ctMethod.getMethodInfo(); 
			CodeAttribute codeAttribute = methodInfo.getCodeAttribute();
			LocalVariableAttribute attr = (LocalVariableAttribute) codeAttribute.getAttribute(LocalVariableAttribute.tag);

			Map<String,Class<?>> paramNames = new HashMap<String, Class<?>>();
			int pos = Modifier.isStatic(ctMethod.getModifiers()) ? 0 : 1;
			Class<?>[] types = method.getParameterTypes();
			for (int i = 0; i < types.length; i++)
			{
				paramNames.put(attr.variableName(i + pos),types[i]);
			}
			return paramNames;
		} catch (NotFoundException e) {
			System.err.println(method);
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 使用spring获取方法的参数名
	 * @param actionMethod
	 * @return
	 */
	public static Map<String,Map<String,Type>> getMethodParamsAndType(Method actionMethod) {
		Map<String,Map<String,Type>> paramNames = new LinkedHashMap<String,Map<String,Type>>();

		LocalVariableTableParameterNameDiscoverer variableDiscover = new LocalVariableTableParameterNameDiscoverer();
		String[] params = variableDiscover.getParameterNames(actionMethod);
		Class<?>[] parameterTypes = actionMethod.getParameterTypes();
		Type[] genericParameterTypes = actionMethod.getGenericParameterTypes();
		for (int i = 0; i < parameterTypes.length; i++)
		{
			Class<?> parameterType = parameterTypes[i];

			Map<String,Type> parameterTypeMap = new LinkedHashMap<String,Type>();
			if(Collection.class.isAssignableFrom(parameterType))
			{
				//获取集合的泛型类型 例如 EntitySet<String>的String
				Type genericClass = ((ParameterizedType) genericParameterTypes[i]).getActualTypeArguments()[0];
				parameterTypeMap.put("genericClass", genericClass);
			}
			parameterTypeMap.put("parameterType", parameterType);
			parameterTypeMap.put("paraType", genericParameterTypes[i]);

			paramNames.put(params[i], parameterTypeMap);
		}
		return paramNames;
	}
	/**
	 * 使用javaassist的反射方法获取方法的参数名
	 * @param methodName
	 * @return
	 */
	@Deprecated
	public  Map<String,Map<String,Type>> getMethodParamsAndType(String methodName,Method actionMethod) {
		try {
			if(this.ctClass==null){
				try {
					this.ctClass = pool.get(this.clazz.getName());
				} catch (NotFoundException e) {
					e.printStackTrace();
				}
			}
			CtMethod ctMethod = this.ctClass.getDeclaredMethod(methodName);
	
			Type[] paraTypes = actionMethod.getGenericParameterTypes();

			MethodInfo methodInfo = ctMethod.getMethodInfo();
			CodeAttribute codeAttribute = methodInfo.getCodeAttribute();
			LocalVariableAttribute attr = (LocalVariableAttribute) codeAttribute.getAttribute(LocalVariableAttribute.tag);

			Map<String,Map<String,Type>> paramNames = new LinkedHashMap<String,Map<String,Type>>();
			int pos = Modifier.isStatic(ctMethod.getModifiers()) ? 0 : 1;
			for (int i = 0; i < ctMethod.getParameterTypes().length; i++)
			{
				String paramName = attr.variableName(i + pos);
				Class<?> parameterType = actionMethod.getParameterTypes()[i];
				
				Map<String,Type> parameterTypeMap = new LinkedHashMap<String,Type>();
				if(Collection.class.isAssignableFrom(parameterType))
				{
					String genericType = actionMethod.getGenericParameterTypes()[i].toString();
					int startIndex = genericType.indexOf('<');
					int endIndex =genericType.indexOf('>');
					String genericClassName = genericType.substring(startIndex+1,endIndex);
					Class<?> genericClass= Class.forName(genericClassName);
					parameterTypeMap.put("genericClass", genericClass);
				}
				parameterTypeMap.put("parameterType", parameterType);
				parameterTypeMap.put("paraType", paraTypes[i]);
				
				paramNames.put(paramName, parameterTypeMap);
			}
			return paramNames;
		} catch (Exception e) {
			System.err.println(actionMethod);
			e.printStackTrace();
			return null;
		}
	} 
}
