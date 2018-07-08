angular.module('modelOptionModule', [])
.controller("modelOptionListController",['$rootScope','$scope','$state',
                                          '$stateParams','ModelDataService','ModelService','ngDialog','dialogs', 'angularPermission', 'dialogs',
                                          function($rootScope,$scope,$state,$stateParams, ModelDataService,ModelService,ngDialog,dialogs ,angularPermission,dialogs){
	$scope.formKey = "";//当前模型编辑表单的唯一标示
	$scope.listViewKey = "";//当前模型的视图唯一标示
	$scope.modelEnglishName = "";
	var modelId = $stateParams.id;
	
	$scope.hasPermission = angularPermission.hasPermission;
	
	$scope.initModelDataSomeMessage = function()
	{
		ModelService.findModelById(modelId,sucesscb,errorcb);
		function sucesscb(model)
		{
			$scope.formKey = model.modelForm;
			$scope.modelEnglishName =  model.modelEnglishName;
			$scope.modelName =  model.modelEnglishName.substring(0,1).toLowerCase()+model.modelEnglishName.substring(1);
			initPermission();
		};
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	}
	
	$scope.initModelDataSomeMessage();//初始化formKey,listViewKey,modelEnglishName,modelName
	
	$scope.addModelData = function()
	{
		$state.go("main.list.modelData.modelDataAddForm",{operate:'add',formKey:$scope.formKey,modelId:modelId,tableName:$scope.modelEnglishName}); 
	}
	
	$scope.hasAddPermission = function()
	{
		return angularPermission.hasPermission($scope.model.modelName+'_add');
	}
	
	$scope.deleteModelData = function(modelData)
	{
		if(modelData.status=="已提交")
		{
			$rootScope.app.error("已经提交过了，不能进行删除！");
			return;
		}
		var dlg = dialogs.confirm('删除','确认删除?',{size:'md',animation:false,backdrop:false});
		dlg.result.then(function(btn){
			ModelDataService.deleteModelData($scope.modelEnglishName,{modelDataId:modelData.EId},sucesscb,errorcb);
		});
		function sucesscb(data)
		{
			$rootScope.getController("modelOptionListGrid" , "ddatagrid").refreshCurrent(); 
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	
	}
	
	//查看历史版本
	$scope.viewHistoryVersion = function(modelData)
	{
		$state.go('main.list.modelData.historyVersion',{modelId:modelId,dataId:modelData.EId,modelEnglishName:$scope.modelEnglishName});
	}
	 
	 //流程跟踪
	$scope.processTrack = function(modelData)
	{
		$state.go('main.list.workflow.dataProcessHistory',
				{processInstanceId:modelData.processInstanceId,formKey:$scope.modelEnglishName,formId:modelData.EId});
	}
	
	//后台人员撤销新闻网模型数据
	$scope.revokeModelData = function(modelData)
	{
		var dlg = dialogs.confirm('撤销','确认撤销?',{size:'md',animation:false,backdrop:false});
		dlg.result.then(function(btn){
			modelData['checkResult'] = '撤销';
			ModelDataService.updateModelData($scope.modelEnglishName,modelData,sucesscb,errorcb);
		});
		function sucesscb(data)
		{
			$rootScope.getController("modelOptionListGrid" , "ddatagrid").refreshCurrent();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
		
	}
	
	$scope.updateModelData = function(modelData)
	{
		if(modelData.status=="已提交")
		{
			$rootScope.app.error("警告","已经提交过了，不能进行更改！");
		}else
		{
			$state.go("main.list.modelData.modelDataEditForm",{operate:'edit',formKey:$scope.formKey,modelId:modelId,modelDataId:modelData.EId,tableName:$scope.modelEnglishName});
		}
	}
	$scope.displayModelData = function(modelData)
	{
		$state.go("main.list.modelData.modelDataDisplay",{modelId:modelId,modelDataId:modelData.EId,processInstanceId:modelData.processInstanceId,formKey:$scope.formKey,tableName:$scope.modelEnglishName});
	}
	$scope.displayHistory = function(modelData){
		$state.go("main.list.modelData.historyDisplayRoute",{modelDataId:modelData.EId,modelId:modelId,modelEnglishName:$scope.modelEnglishName,formKey:$scope.formKey});
	}

	/*$scope.openWindow = function(data,operate,contentTemplate)
	{
		var popupWindow = window.open('template.html', '_blank');
		popupWindow.stateParams = {};
		popupWindow.stateParams.contentTemplate = contentTemplate;
		popupWindow.stateParams.id = data.EId;
		popupWindow.stateParams.operate = operate;
		popupWindow.stateParams.formKey = $scope.formKey;
		popupWindow.stateParams.modelId = $scope.modelId;
		popupWindow.stateParams.modelDataId = data.EId;
		popupWindow.stateParams.tableName = $scope.modelEnglishName;
	}*/
	
	$scope.isDisplayFlowsheet = function(modelData){
		if(modelData.entity.status=="已提交"){
			return true;
		}else{
			return false;
		}
	}

	$scope.isShowColumn = function(modelData){
		if(modelData.entity.status=="已提交"){
			return false;
		}else{
			return true;
		}
	}
	
	
	$scope.operationColumns=[];
	
	function initPermission(){
		
	var editColumn={};
	editColumn.click= $scope.updateModelData;
	editColumn.label='编辑';
	editColumn.icon = "glyphicon glyphicon-edit";
	editColumn.permission = $scope.modelEnglishName+'_edit';
	editColumn.visiableFunction = function(row)
	{
		if($scope.hasPermission($scope.modelEnglishName+'_edit'))
		{
			if(row.entity.status=='已提交')
			{
				return false;
			}
		}
		return true;
	};
	$scope.operationColumns.push(editColumn);
	 
	
	var displayColumn={};
	displayColumn.click= $scope.displayModelData;
	displayColumn.label='查看';
	displayColumn.icon = "glyphicon glyphicon-eye-open";
	displayColumn.permission = $scope.modelEnglishName+'_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteModelData;
	deleteColumn.label='删除';
	deleteColumn.icon = "glyphicon glyphicon-remove-circle";
	deleteColumn.permission = $scope.modelEnglishName+'_delete';
	deleteColumn.visiableFunction = $scope.isShowColumn;
	$scope.operationColumns.push(deleteColumn);
	
	var processTrackColumn={};
	processTrackColumn.click = $scope.processTrack;
	processTrackColumn.label="流程跟踪";
	processTrackColumn.icon="glyphicon glyphicon-eye-open";
	processTrackColumn.permission = $scope.modelEnglishName+"_flowsheet_display";
	processTrackColumn.visiableFunction = function(row)
	{
		if($scope.hasPermission($scope.modelEnglishName+"_flowsheet_display"))
		{
			if(row.entity.status=='已提交')
			{
				return true;
			}
		}
		return false;
	};
	$scope.operationColumns.push(processTrackColumn);
	 
	var revokeColumn = {};
	revokeColumn.click = $scope.revokeModelData;
	revokeColumn.label = "撤销";
	revokeColumn.icon = "glyphicon glyphicon-eye-open";
	revokeColumn.permission = $scope.modelEnglishName+"_revoke";
	revokeColumn.visiableFunction = function(row)
	{
		if($scope.hasPermission($scope.modelEnglishName+"_revoke"))
		{
			if(row.entity.checkResult=='通过')
			{
				return true;
			}
		}
		return false;
	};
	$scope.operationColumns.push(revokeColumn);
	
	var historyVersionColumn = {};
	historyVersionColumn.click = $scope.viewHistoryVersion;
	historyVersionColumn.label = "历史版本";
	historyVersionColumn.icon = "glyphicon glyphicon-eye-open";
	historyVersionColumn.permission = $scope.modelEnglishName + "_history_display";
	historyVersionColumn.visiableFunction = function(row)
	{
		if($scope.hasPermission($scope.modelEnglishName+"_history_display"))
		{
			if(!row.entity.status=='草稿')
			{
				return true;
			}
		}
		return false;
	}
	$scope.operationColumns.push(historyVersionColumn);
}}]);
