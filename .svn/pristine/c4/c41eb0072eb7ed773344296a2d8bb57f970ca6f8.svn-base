angular.module('reportViewModule', [])
.controller('reportViewFormController',['$rootScope','$scope','$state','$stateParams','ReportviewService','angularPermission','dialogs',function($rootScope,$scope,$state,$stateParams,ReportviewService,angularPermission,dialogs){
	$scope.operate = $stateParams.operate;
	$scope.cancelTab = function(){
		$scope.closeOperateTab();
		if (!$scope.selectTab("reportViewList")) {
			$state.go("main.list.reportView.reportViewList");
		}
	}
	/**
	 * 工具类函数
	 */
	$scope.removeFromArray = function(obj,array)
	{
		for(var i=0;i<array.length;i++)
		{
			if(array[i].columnKey==obj.columnKey)
			{
				array.splice(i,1);
				break;
			}
		}
	}
	
	$scope.exchangeObject = function(obj,originArray,goalsArray,needAdd)
	{
		if(needAdd)
		{
			for(var i=0;i<$scope.originalColumns.length;i++)
			{
				if($scope.originalColumns[i].columnKey===obj.columnName)
				{
					goalsArray.push($scope.originalColumns[i]);
					break;
				}
			}
		}
			for(var i=0;i<originArray.length;i++)
			{
				if(originArray[i]==obj)
				{
					originArray.splice(i,1);
					break;
				}
			}
	}
	
	$scope.fillingCssArrtribute = function(array)
	{
		for(var i=0;i<array.length;i++)
		{
			array[i].cssArrtribute="width:"+array[i].width+",text-align:'"+array[i].align+"'";
		}
		return array;
	}
	
	$scope.setColumnIndex = function(array)
	{
		for(var i=0;i<array.length;i++)
		{
			array[i].columnIndex=i;
		}
		return array;
	}
	
	// 克隆对象
	$scope.clone = function(myArray){ 
		if(typeof(myArray) != 'object') return myArray; 
		if(myArray == null) return myArray; 
		var myNewArray = new Array(); 
		for(var i in myArray) 
			myNewArray[i] = $scope.clone(myArray[i]); 
		return myNewArray; 
	} 
	$scope.subtractIndex = function(arrays,array){
		for(var i=0;i<arrays.length;i++)
		{
			if(arrays[i]==array&&i!=arrays.lengt-1)
			{
				var temp = arrays[i];
				arrays[i]=arrays[i+1];
				arrays[i+1]=temp;
				break;
			}
		}
	}
	
	$scope.raiseIndex = function(arrays,array)
	{
		for(var i=0;i<arrays.length;i++) 
		{
			if(arrays[i]==array&&i!=0)
			{
				var temp = arrays[i-1];
				arrays[i-1]=arrays[i];
				arrays[i]=temp;
				break;
			}
		}
	}
	
	$scope.initListViewData = function()
	{
		if('addReportView'==$scope.operate)
		{
			$scope.initReportViewData();
		}
		else if('editReportView'==$scope.operate)
		{
			$scope.initEditReportViewData();
		}
	}
	
	/**
	 * 初始化增加视图参数
	 */
	$scope.initReportViewData=function()
	{
		ReportviewService.getReportViewInitData($stateParams.id,function(data)
		{
			$scope.dataSource=data.dataSource;
			if(angular.isUndefined( data.dataSource.htmlColumns) ||  data.dataSource.htmlColumns.length ==0)
			{
				dialogs.error("没有找到数据源对应的列，请检查数据的配置："+data.dataSource.dataSourceName);
				return;
			}			
			var columns = data.dataSource.htmlColumns;
			$scope.originalColumns=$scope.clone(columns);
			$scope.columnsInDisplayAttributes=$scope.clone(columns);
			$scope.columnsInOrderCondition = $scope.clone(columns);
			$scope.dataSourceSqlParams  = data.sqlParams;
			
			$scope.initSearchConditions();
			
		}
		,$scope.findSourceError);
	};
	
	/**
	 * 初始化编辑视图参数
	 */
	
	$scope.initEditReportViewData = function()
	{
		ReportviewService.findReportViewById($stateParams.id,
				function(data)
				{
					$scope.dataSource=data.dataSource;
					var columns = data.dataSource.htmlColumns;
					$scope.originalColumns=$scope.clone(columns);
					$scope.columnsInDisplayAttributes=$scope.clone(columns);
					$scope.columnsInOrderCondition = $scope.clone(columns);
					
					$scope.reportView = data.reportView;
					$scope.currentListViewKey = data.reportView.reportViewKey;
					
					$scope.addArrayToSearchCondition(data.reportView.searchConditions);
					
					$scope.resumeReportViewData(data.reportView,$scope.originalColumns);
				},$scope.findSourceError);
	}
	
	$scope.resumeData = function(arrays,addFunction,parameter)
	{
		var originalArray = $scope.clone($scope.originalColumns);
		for(var i=0;i<arrays.length;i++)
		{
			for(var j=0;j<originalArray.length;j++)
			{
				if(originalArray[j].columnKey == arrays[i][parameter]){
					var tempColumn = originalArray[j];
					tempColumn.hasInitialData=true;
					addFunction(tempColumn,arrays[i]);
					break;
				}
			}
		}
	}
	
	
	var myIsDefined = function(object){
		if(object == undefined){
			return false;
		}else
			return true;
	}
	
	
	
	$scope.resumeReportViewData= function(reportView,originalColumns)
	{

		$scope.resumeData(reportView.displayAttributes,$scope.addToDisplayAttributes,'attributeName');
		$scope.resumeData(reportView.orderConditions,$scope.addToOrderCondition,'columnName');
		
		for(var i = 0;i < reportView.searchConditions.length;i++){
			if(myIsDefined(reportView.searchConditions[i].paramsJson)){
				reportView.searchConditions[i].params = angular.fromJson(reportView.searchConditions[i].paramsJson);
			}else{
				continue;
			}	
		}
		var newSearchConditions = reportView.searchConditions;
	
		$scope.advancedSearchConditions = newSearchConditions;
		
		$scope.viewTreeConditions = reportView.viewTreeConditions;
	}
	
	/**
	 * 
	 * 显示字段
	 * 
	 */
	$scope.displayAttributes=[];
	$scope.intialDisplayAttributes = function(column,dislay)
	{
		var displayAttribute={};
		if(column.hasInitialData)
		{
			displayAttribute.attributeName=dislay.attributeName;
			displayAttribute.attributeValue=dislay.attributeValue;
			var tempCssString = dislay.cssArrtribute.replace("width:","").replace("text-align:","").split(",");
			displayAttribute.width=tempCssString[0];
			displayAttribute.align=tempCssString[1].replace(/'/g,"");
			displayAttribute.showType=dislay.showType;
			displayAttribute.columnName = dislay.attributeName;
		}
		else
		{
			displayAttribute.attributeName=column.columnKey;
			displayAttribute.columnName = column.columnKey;
			displayAttribute.attributeValue=column.columnValue;
			displayAttribute.width=100;
			displayAttribute.align='left';
		}
		displayAttribute.types = $scope.getShowType(column.type);
		if(!column.hasInitialData)
			displayAttribute.showType=displayAttribute.types[0].value;
		return displayAttribute;
	}
	
	$scope.getShowType = function(type)
	{
		if(type=="date")
		{
			return [{'value':'YYYY-MM-DD','text':'YYYY-MM-DD'}, 
			        {'value':'YYYY-MM-DD HH:MI','text':'YYYY-MM-DD HH:MM'},
			        {'value':'YYYY-MM-DD HH:MI:SS','text':'YYYY-MM-DD HH:MM:SS'},
			        {'value':'YYYY/MM/DD','text':'YYYY/MM/DD'}];
		}
		else if(type=="bigit")
		{
			return [{'value':'#,###','text':'#,###'},{'value':'#','text':'#'}];
		}
		else 
		{
			return [{'value':"文本",'text':'文本'},{'value':"￥",'text':'人民币'}];
		}
	}
	
	$scope.addToDisplayAttributes=function(column,dislay){
		$scope.displayAttributes.push($scope.intialDisplayAttributes(column,dislay));
		
		$scope.removeFromArray(column,$scope.columnsInDisplayAttributes);
	}
	
	$scope.addAllToDisplayAttributes=function()
	{
		for(var i=0;i<$scope.columnsInDisplayAttributes.length;i++)
		{
			$scope.displayAttributes.push($scope.intialDisplayAttributes($scope.columnsInDisplayAttributes[i]));
		}
		$scope.columnsInDisplayAttributes=[];
	}
	
	$scope.removeAllFromDisplayAttributes=function()
	{
		$scope.columnsInDisplayAttributes = $scope.originalColumns;
		$scope.displayAttributes=[];
	}
	
	/**
	 * 
	 * 排序设置
	 * 
	 */
	$scope.orderConditions=[];
	$scope.intialOrderCondition  = function(column,order)
	{
		var orderCondition={};
		if(column.hasInitialData)
		{
			with(order){
				orderCondition.columnName = columnName;
				orderCondition.orderType = orderType;
			}
		}
		else{
			orderCondition.columnName = column.columnKey;
			orderCondition.orderType='asc';
		}
		return orderCondition;
	}
	$scope.addToOrderCondition = function(column,order)
	{
		$scope.orderConditions.push($scope.intialOrderCondition(column,order));
		
		$scope.removeFromArray(column,$scope.columnsInOrderCondition);
	}
	
	/**
	 * 高级检索
	 */
	$scope.advancedSearchConditions=[];
	
	$scope.addSearchCondition=function()
	{
		var condition = {};
		condition.displayName='';
		condition.paramName='';
		condition.displayType="INPUT";
		
		$scope.advancedSearchConditions.push(condition);
	}
	
	$scope.initSearchConditions = function()
	{
		var sqlParams = $scope.dataSourceSqlParams;
		if(sqlParams)
		for(var i=0;i<sqlParams.length&&sqlParams[i]!="";i++)
		{
			var condition = {};
			condition.displayName=sqlParams[i];
			condition.paramName=sqlParams[i];
			condition.displayType="INPUT";
			condition.params = angular.fromJson(condition.paramsJson);
			$scope.advancedSearchConditions.push(condition);
		}
	}
	
	$scope.addArrayToSearchCondition = function(array)
	{
		for(var i=0;i<array.length;i++)
		{
			var condition = {};
			condition.displayName=array[i].displayName;
			condition.paramName=array[i].paramName;
			condition.displayType=array[i].displayType;
			condition.params = angular.fromJson(array[i].paramsJson);
			$scope.advancedSearchConditions.push(condition);
		}
	}
	
	/**
	 * 树形结构
	 * 
	 */
	$scope.viewTreeConditions=[];
	$scope.addViewTreeCondition=function()
	{
		var condition = {};
		condition.viewTreeKey='';
		condition.viewTreeName='';
		
		if($scope.viewTreeConditions == null)
		{
			$scope.viewTreeConditions=[];
		}
		$scope.viewTreeConditions.push(condition);
	}
	

	/**
	 * 保存 ReportView
	 * 
	 */
	$scope.saveEdit = function(reportView)
	{
		reportView.dataSource=$scope.dataSource;
		reportView.displayAttributes = $scope.fillingCssArrtribute($scope.setColumnIndex($scope.displayAttributes));
		reportView.orderConditions=$scope.setColumnIndex($scope.orderConditions);
		reportView.searchConditions =$scope.getAdvancedSearchConditions();
		reportView.viewTreeConditions = $scope.viewTreeConditions;
		
		if('addReportView'==$scope.operate)
		{
			$scope.addReportView(reportView);
			$scope.closeOperateTab();
			if (!$scope.selectTab("reportViewList")) {
				$state.go("main.list.reportView.reportViewList");
			}
		}
		else if('editReportView'==$scope.operate)
		{
			$scope.updateReportView(reportView);
		}
	}
	
	$scope.getAdvancedSearchConditions = function()
	{
		if(angular.isUndefined($scope.advancedSearchConditions)) return null;
		angular.forEach($scope.advancedSearchConditions,function(advancedSearchCondition)
		{
			advancedSearchCondition.paramsJson = angular.toJson(advancedSearchCondition.params);
		});
		return $scope.advancedSearchConditions;
	}
	/**
	 * 增加 ReportView
	 */
	$scope.addReportView = function(reportView)
	{
		reportView.dataSourceId = $scope.dataSource.EId;
		
		function successCB(){
			refreshGrid();
			$scope.back();
		}
		function errorCB(error)
		{
			dialogs.error("更新失败");
		}
		
		ReportviewService.addReportView(reportView,successCB,errorCB);
	}
	
	/**
	 * 更新 ReportView
	 */
	$scope.updateReportView = function(reportView)
	{
		function successCB(){
			refreshGrid();
			$scope.back();
		}
		function errorCB(error)
		{
			dialogs.error("更新失败");
		}
		ReportviewService.updateReportView(reportView,successCB,errorCB);
	}
	
	
	$scope.findSourceError = function(data)
	{
		dialogs.error("加载数据失败");
	};
	

	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController("reportViewListGrid" , "ddatagrid");
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("reportViewListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"reportViewList","main.list.reportView.reportViewList")
	}
}]);