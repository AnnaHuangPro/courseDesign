angular.module('modelDataModule', ['modelDataApp'])
.controller("modelDataFormController",["ModelService","$state","$rootScope","$scope","ModelDataService","$state","$stateParams","ngDialog",
	"$timeout","ExpressionService","asynchroMarkService","dialogs",
function(ModelService,$state,$rootScope,$scope,ModelDataService,state,$stateParams,ngDialog,$timeout,ExpressionService,asynchroMarkService,dialogs){
	
	$scope.showSaveAndAddButton = $stateParams.operate == "add" ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.modelId = $stateParams.modelId;
	$scope.modelDataId = $stateParams.modelDataId;
	$scope.formKey = $stateParams.formKey;
	$scope.tableName = $stateParams.tableName;
	
    $scope.cancel = function()
    {
    	$rootScope.closeOperateTab();
    	$scope.selectTab("modelOptionList");
	}
	
	$scope.getModelDataDetail = function()
	{
		ModelDataService.findModelDataByModelDataId($scope.tableName,$scope.modelDataId,sucesscb,errorcb);

		function sucesscb(data)
		{
			$timeout(function(){$scope.modelData = data;},800);
			ModelService.findModelById($scope.modelId,function(model){
				$scope.model = model;
				$scope.tab.name = "编辑"+model.modelName;
			})
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);		};
		};
	
	$scope.getSubTableInfo = function()
	{
		
		ModelDataService.findSubtableInfo($scope.tableName,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.modelData = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.getInitModelDataData = function()
	{
		if($scope.operate=='edit')
		{
			$scope.getModelDataDetail();
			//$scope.getModelDataDetail();
		}
		if($scope.operate=='add')
		{
			$scope.getSubTableInfo();
		}
	}
	
	$scope.saveModelData = function(modelData)
	{
		
		if(modelData.EId == undefined || modelData.EId == null)
		{
			$scope.addModelData($scope.$$childHead.modelData);
		}
		else if(modelData.EId > 0)
		{
			$scope.updateModelData($scope.$$childHead.modelData);
		}
	}
	
	$scope.addModelData = function(modelData)
	{  
		asynchroMarkService.mask("请等待..."); 
		ModelDataService.saveModelData($scope.tableName,modelData,sucesscb,errorcb);

		function sucesscb(data)
		{
			asynchroMarkService.unmask();
			dialogs.notify('结果','新增成功!',{size:'sm'});
			$scope.modelData = data;
				$scope.refreshGrid(); 
		}
		function errorcb(error)
		{
			asynchroMarkService.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateModelData = function(modelData)
	{
		asynchroMarkService.mask("请等待...");
		ModelDataService.updateModelData($scope.tableName,modelData,sucesscb,errorcb);
		function sucesscb(data)
		{
			asynchroMarkService.unmask();
			dialogs.notify('结果','修改成功!',{size:'sm'});
			$scope.modelData = data;
		}
		function errorcb(error)
		{
			asynchroMarkService.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.submitClick = function()
	{
		asynchroMarkService.mask("请等待...");
		ModelDataService.submitModelData($scope.tableName,$scope.$$childHead.modelData,$scope.operate,sucesscb,errorcb);
		function sucesscb()
		{
			asynchroMarkService.unmask();
			$scope.closeOperateTab();
			$scope.refreshGrid();
			$scope.selectTab("modelOptionList");
		}
		function errorcb(error)
		{
			asynchroMarkService.unmask();
			$rootScope.openErrorDialog(error);
		}
	}

	$rootScope.openErrorDialog = function(clientError){
        var dialogId = ngDialog.open({
            template: 'js/base/asset/clientErrorDialog.html',
            showClose:true,
            controller: ['$scope', function ($scope, $timeout) {
            	if(clientError.data)
            	{	
            		$scope.clientError = clientError.data;
            	}
            	else
        		{
            		$scope.clientError={};
            		$scope.clientError.message=angular.toJson(clientError);
        		}
            	$scope.showDebug = false;
            		
            }],
            className: 'ngdialog-theme-default'
        })
	}
	  
  	$scope.refreshGrid = function(){
		var controller = $rootScope.getController("modelOptionListGrid", 'ddatagrid');
		if(controller){
			controller.refreshCurrent();
		}
	}
	 
	
}]).controller("subTableController",["$rootScope","$scope","ModelDataService","ngDialog","dialogs",
function($rootScope,$scope,ModelDataService,ngDialog,dialogs){
	$scope.addDataEId = function(modelData){
		ModelDataService.findModelDataByTableName($scope.$parent.tableName,sucesscb,errorcb);
	
		function sucesscb(data)
		{
			modelData.EId = data[0].EId;
			$scope.$parent.parentScope.refresh = true;
			$scope.$parent.parentScope.displayDatas.push(modelData);
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	
	$scope.saveModelData = function(modelData)
	{   
		
		ModelDataService.saveModelData($scope.tableName,modelData,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.addDataEId(modelData);
			ngDialog.closeAll()
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}

	$scope.$watch('selectData', function(newVal, oldVal) {
        if (newVal !== oldVal&&newVal!==null) 
        {
        	var displayDatas = $scope.$parent.parentScope.displayDatas;
        	angular.forEach(displayDatas,function(data1,index1){
        		angular.forEach(newVal,function(data2,index2){
            		if(data1.EId==data2.EId)
            			newVal.splice(index2,1);
            	})
        	})
        	$scope.$parent.parentScope.refresh = true;
        	$scope.$parent.parentScope.displayDatas = displayDatas.concat(newVal);
        }
	}, true);
	
	$rootScope.openErrorDialog = function(clientError){
        var dialogId = ngDialog.open({
            template: 'js/base/asset/clientErrorDialog.html',
            showClose:true,
            controller: ['$scope', function ($scope, $timeout) {
            	if(clientError.data)
            	{	
            		$scope.clientError = clientError.data;
            	}
            	else
        		{
            		$scope.clientError={};
            		$scope.clientError.message=angular.toJson(clientError);
        		}
            	$scope.showDebug = false;
            		
            }],
            className: 'ngdialog-theme-default'
        })
	}
	
}]);