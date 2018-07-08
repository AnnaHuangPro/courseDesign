angular.module('modelModule', [])
.controller("modelListController",['$rootScope','$scope','$state','$stateParams','ModelService','dialogs','ModelDataService','dialogs',
function($rootScope,$scope,$state,$stateParams, ModelService,dialogs,ModelDataService,dialogs){
	
	$scope.showModels = [];
	$scope.modelTypeId = -1;
	
	$scope.addModel = function(model)
	{	
		$state.go("main.list.model.modelAddForm",{operate:'add'}); 
	}
	
	$scope.hasAddPermission = function()
	{
		return angularPermission.hasPermission('model_add');
	}
	
	$scope.deleteModel = function(model)
	{
		var dlg = dialogs.confirm('删除模型','确认删除'+model.modelName+'模型?\n提示：不能删除有历史数据记录的模型！',{size:'md',animation:false,backdrop:false});
		dlg.result.then(function(btn){
			ModelDataService.findModelDataByTableName(model.modelEnglishName,sucesscb,errorcb);
		},function(btn){
			
		});
		
		function sucesscb(data)
		{
			if(data.length > 0){
				var dlg = dialogs.confirm('删除模型',model.modelName +'存有数据，确认要删除模型和数据?',{size:'md',animation:false,backdrop:false});
				dlg.result.then(function(btn){
					ModelService.deleteModel({model:model},sucesscb,errorcb);
				},function(btn){
					
				});
			} 
			else if(data.length == 0)
			{
				ModelService.deleteModel({model:model},sucesscb,errorcb);
			}
			else{
				dialogs.error('结果','删除失败!',{size:'sm'});

			}
			
			function sucesscb(data)
			{
				 if(data > 0){ 
					dialogs.notify('结果','删除成功!',{size:'sm'});
					refreshGrid();				} 
				else
					dialogs.error('结果','删除失败!',{size:'sm'});
			}
			function errorcb(error){
				dialogs.error('结果','删除失败!'+error,{size:'sm'});
			}
				
		}
		function errorcb(error)
		{
			dialogs.error('结果','删除失败!'+error,{size:'sm'});
		}
	
	}
	
	$scope.updateModel = function(model)
	{
		
		
		$state.go("main.list.model.modelEditForm",{operate:'edit',id:model.EId});
		
	}
	
	$scope.confirmPublication = function(model){
		var state = model.state;
		if(state=="已提交"){
			ModelService.publishModel(model,sucesscb,errorcb);
			
			function sucesscb(data)
			{
				if(data.isSuccess)
				{
					dialogs.notify('结果','发布成功！',{size:'md'});
					$rootScope.getController("modelListGrid" , "ddatagrid").refreshCurrent();
				}
				else
				{
					dialogs.error("错误","发布失败！",{size:'md'});
				}
			}
			function errorcb(error)
			{
				$rootScope.openErrorDialog(error);
			}
		}
		else if(state=="已发布")
		{
			dialogs.error("错误","原因:模型已发布过了！\n或界面没刷新",{size:'md'});
		}
		else
		{
			dialogs.error("错误","请先提交"+model.modelName+"！",{size:'md'});
		}
	}
	
	$scope.cancelPublication = function(model){
		var state = model.state;
		if(state=="已发布"){
			ModelService.cancelPublishModel(model,sucesscb,errorcb);
			
			function sucesscb(data)
			{
				if(data.isSuccess)
				{
					dialogs.notify('结果','取消发布成功！',{size:'sm'});
					$rootScope.getController("modelListGrid" , "ddatagrid").refreshCurrent();
				}
				else
				{
					dialogs.error("错误","取消发布失败！",{size:'sm'});
				}
			}
			function errorcb(error)
			{
				dialogs.error('结果','删除失败!'+error,{size:'sm'});
			}
		}
		else
		{
			dialogs.error("错误",model.modelName+"还没有发布！",{size:'sm'});
		}
	}
	
	$scope.isShowConfirmPublicationColumn = function(model)
	{
		if(model.entity.modelEnglishName=="BaseModel")
		{
			return false;
		}

		return model.entity.state=="已提交"?true:false;
	};

	$scope.isShowCancelPublicationColumn = function(model)
	{
		if(model.entity.modelEnglishName=="BaseModel")
		{
			return false;
		}

		return model.entity.state=="已发布"?true:false;
	};

	$scope.isShowDeleteButton = function(model)
	{
		return model.entity.modelEnglishName=="BaseModel"?false:true;
	}
	function refreshGrid(){
		$scope.refreshGrid("modelListGrid");
	}
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addModel;
	addBarButton.label='新增';
	addBarButton.icon = "glyphicon glyphicon-plus-sign";
	addBarButton.permission = 'model_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateModel;
	editColumn.label='编辑';
	editColumn.icon = "glyphicon glyphicon-edit";
	editColumn.permission = 'model_edit';
	$scope.operationColumns.push(editColumn);
	
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteModel;
	deleteColumn.label='删除';
	deleteColumn.icon = "glyphicon glyphicon-remove-circle";
	deleteColumn.permission = 'model_delete';
	deleteColumn.visiableFunction = $scope.isShowDeleteButton;
	$scope.operationColumns.push(deleteColumn);
	
	var confirmPublicationColumn={};
	confirmPublicationColumn.click= $scope.confirmPublication;
	confirmPublicationColumn.label='确认发布';
	confirmPublicationColumn.icon = "glyphicon glyphicon-remove-circle";
	confirmPublicationColumn.permission = 'model_confirmPublication';
	confirmPublicationColumn.visiableFunction = $scope.isShowConfirmPublicationColumn;
	$scope.operationColumns.push(confirmPublicationColumn);
	
	var cancelPublicationColumn={};
	cancelPublicationColumn.click= $scope.cancelPublication;
	cancelPublicationColumn.label='取消发布';
	cancelPublicationColumn.icon = "glyphicon glyphicon-remove-circle";
	cancelPublicationColumn.permission = 'model_cancelPublication';
	cancelPublicationColumn.visiableFunction = $scope.isShowCancelPublicationColumn;
	$scope.operationColumns.push(cancelPublicationColumn);
	
}]);	