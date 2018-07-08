angular.module('importConfigsModule', [])
.controller('importConfigsFormController',['$rootScope','$scope','ImportConfigsService','$state','angularPermission','$stateParams','BillCodeService',
function($rootScope,$scope,ImportConfigsService,$state,angularPermission,$stateParams,BillCodeService){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	//一个实体的所有字段
	$scope.importConfigs = {};
	$scope.configItems = [];
	
	//获取一个实体的所有的属性的中文名和数据库字段名
	$scope.getAllField = function(){
		ImportConfigsService.getAllField($scope.entityName,sucesscb,errorcb);
		function sucesscb(data)
		{
			for(var i =0;i<data.length;i++){
				var configItem = data[i];
				if($scope.needAdd(configItem.columnTitle,configItem.fieldName)){
			    	$scope.configItems.push(configItem);
				}
			}
		};

		function errorcb(data)
		{
			alert('加载失败');
		};
	}
	
	$scope.checkColumnTitleUnique = function(){
		var uniqueCheck = {};
		var duplicateItems = [];
		for(var i=0,j=$scope.configItems.length;i<j;i++){
			var configItem = $scope.configItems[i];
			if(uniqueCheck[configItem.columnTitle])
			{
				duplicateItems[i]=configItem.columnTitle;
			}
			else
			{
				uniqueCheck[configItem.columnTitle]="@";
			}
		}
		if(duplicateItems.length >0)
		{
			var tip = duplicateItems.toString();
			var e=new RegExp(",","g");
			tip = tip.replace(e, " "); 
			alert("有重复的中文名称，请检查："+ tip);
			return false;
		}
		return true;
	}
	
	
	
	$scope.addConfigItem = function(){
		if($scope.configItems == null){
			$scope.configItems= [];
		}
		  $scope.configItems.push({});
	}
	
	//判断是否需要添加
	$scope.needAdd = function(columnTitle,fieldName){
		for(var i = 0,j=$scope.configItems.length;i<j;i++){
			if($scope.configItems[i].columnTitle == columnTitle  || $scope.configItems[i].fieldName == fieldName){
				return false;
			}
		}
		return true;
	}
	
	//删除一个ConfigItem
	$scope.deleteconfigItem = function(configItem){
			$scope.configItems.splice($scope.configItems.indexOf(configItem),1);
	}
	
	//把js对象转换成json字符串用于保存
	$scope.generateJson = function(){
		var result = {};
		result.entityName = $scope.entityName;
		result.outInterface = $scope.outInterface;
		
		result.automaticEncoding = $scope.automaticEncoding;
		result.encodingFieldName = $scope.encodingFieldName;
		result.encodingKey = $scope.encodingKey;
		
		result.configItems =  $scope.configItems;
		$scope.importConfigs.configContext = JSON.stringify(result);
	}
	
	//把json字符串转换成js对象用于显示
	$scope.generateObject = function(jsonStr){
		if($scope.configItems == null){
			$scope.configItems= [];
		}
		var json = angular.fromJson(jsonStr);
		
		$scope.entityName = json.entityName;
		$scope.outInterface = json.outInterface;
		$scope.automaticEncoding=json.automaticEncoding;
		$scope.encodingFieldName=json.encodingFieldName;
		$scope.encodingKey=json.encodingKey;
		
		var tempconfigItems = json.configItems;
		
		//
		for(var i=0,j=tempconfigItems.length;i<j;i++){
				tempconfigItems[i].displayIndex=i;
		       $scope.configItems.push(tempconfigItems[i]);
		}  
		
	}
	
	$scope.getInitImportConfigsData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getImportConfigsDetail();
		}else{
			$scope.automaticEncoding=false;
		}
		
		BillCodeService.findAllBillCode(sucesscb,errorcb);//
		
		function sucesscb(data){
			$scope.encodingRules=data;
		}
		
		function errorcb(){
			alert('加载失败');
		}
	}
	
	$scope.getImportConfigsDetail = function()
	{
		ImportConfigsService.findImportConfigsById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.importConfigs = data;
			
			$scope.generateObject(data.configContext);
			
		};

		function errorcb(data)
		{
			alert('加载失败');
		};
	};
	
	$scope.saveImportConfigs = function(importConfigs)
	{
		if(! $scope.checkColumnTitleUnique())
		{
			return;
		}
		$scope.generateJson();
		
		if($scope.operate=='add')
		{
			$scope.addImportConfigs(importConfigs,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateImportConfigs(importConfigs);
		}
	}
	
	$scope.saveAndAddImportConfigs = function(importConfigs)
	{
		$scope.addImportConfigs(importConfigs,false);
	}	
	$scope.addImportConfigs = function(importConfigs,needColseTab)
	{   
		ImportConfigsService.saveImportConfigs({importConfigs:importConfigs},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();
			}
			else
				$scope.importConfigs=null;
			$scope.refreshGrid();
		}
		function errorcb()
		{
			alert('添加失败!');
		}
	}
	$scope.updateImportConfigs = function(importConfigs)
	{
		ImportConfigsService.updateImportConfigs({importConfigs:importConfigs},sucesscb,errorcb);
	
		function sucesscb()
		{
			refreshGrid();
			$scope.back();
		}
		function errorcb()
		{
			alert('修改失败!');
		}
	};
	
	$scope.createImportExcel=function(importConfigs){
		$scope.generateJson();
		
		ImportConfigsService.createExcelTemplate(importConfigs,sucesscb,errorcb);
		
		function sucesscb(data)
		{
			$rootScope.closeOperateTab();
			$state.go('main.list.importConfigs.importConfigsList');
			$scope.refreshGrid();
		}
		
		function errorcb(error)
		{
			alert('保存失败!'+error.data.cause.message);
		}
	}
	
	$scope.raiseIndex=function(configItem){
		for(var i=0;i<$scope.configItems.length;i++) 
		{
			if($scope.configItems[i]==configItem&&i!=0)
			{
				var temp = $scope.configItems[i-1];
				$scope.configItems[i-1]=$scope.configItems[i];
				$scope.configItems[i]=temp;
				break;
			}
		}
	}
	
	$scope.subtractIndex = function(configItem){
		for(var i=0;i<$scope.configItems.length;i++)
		{
			if($scope.configItems[i]==configItem&&i!=$scope.configItems.length-1)
			{
				var temp = $scope.configItems[i];
				$scope.configItems[i]=$scope.configItems[i+1];
				$scope.configItems[i+1]=temp;
				break;
			}
		}
	}


	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('importConfigsListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("importConfigsListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"importConfigsList","main.list.importConfigs.importConfigsList")
	}
}]);