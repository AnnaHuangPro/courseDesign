var onToManyGridModule = angular.module("onToManyGridModule",[]);
onToManyGridModule.controller('dialogsController',function($scope,$uibModalInstance,data,$rootScope){
	
	$scope[data.entityName] = data.entity;
	
	$scope.myoptions = [
	         {name:"是",value:"true"},
	         {name:"否",value:"false"}
	];
	//弹出层确定操作
	$scope.ensureClick = function(entity)
	{
		$uibModalInstance.close(entity);
	};
	
	//弹出层取消操作
	$scope.cancelClick = function()
	{
		$uibModalInstance.dismiss('Canceled');
	};
})
onToManyGridModule.directive("onToManyGrid",function(ngDialog,dialogs)
{
	return{
		restrict:'E',
		scope:{
			operationColumns:'=',
			operationBarButtons:'=',
			displayDatas:'=',
			listViewKey:'@',
			entityName:'@'
		},
		controller:function($scope,$transclude,$state)
		{		
			//弹出窗
			$scope.openDialog = function(template,index)
			{
				var params = {entity:$scope[$scope.entityName],entityName:$scope.entityName};
				var dlg = dialogs.create(template,"dialogsController",params,{size:'md',keyboard: true,backdrop: true,windowClass: 'my-class'});
				dlg.result.then(function(data){
					var operate = $scope.currentOperation.operate;
					if(operate == "add")
					{
						if($scope.displayDatas == null)
						{
							$scope.displayDatas = new Array();
						}
						$scope.displayDatas.push(data);
					}else{
						if(operate == "edit"){
							$scope.displayDatas[$scope.index] = data;
						}
					}
				},function(){
					//取消
				});
			};
			
			$scope.operationColumnClick=function(data)
			{
				var operationColumn = data.operationColumn;
				$scope.currentOperation = operationColumn;
				var template = operationColumn.template;
				var operate = operationColumn.operate;
				if(operate == "edit")
				{
					$scope[$scope.entityName] = data;
					$scope.index = $scope.displayDatas.indexOf(data);
					$scope.openDialog(template);
				}
				else if(operate == "delete")
				{
					var index = $scope.displayDatas.indexOf(data);
					$scope.displayDatas.splice(index,1);
				}
				else
				{
					operationColumn.click(data);
				}
			};
			//操作列事件处理
			if($scope.operationColumns != null && $scope.operationColumns.length > 0)
			{
				angular.forEach($scope.operationColumns, function(operationColumn)
				{
					operationColumn.click=$scope.operationColumnClick;
			    });
			};
			

			
			$scope.operationBarButtonClick = function(data)
			{
				var operationColumn = data.operationColumn;
				$scope.currentOperation = operationColumn;
				var template = operationColumn.template;
				var operate = operationColumn.operate;
				if(operate == "add")
				{
					$scope[$scope.entityName] = {};
					$scope.openDialog(template);
				}
				else
				{
					operationColumn.click(data);
				}
			};
			//工具列事件处理
			if($scope.operationBarButtons != null && $scope.operationBarButtons.length > 0)
			{
				angular.forEach($scope.operationBarButtons, function(operationBarButton)
				{
					operationBarButton.click=$scope.operationBarButtonClick;
			    });
			};
			
			//得到视图列表的controller
			$scope.getListViewGridController = function()
			{
				return angular.element($("#ddatagrid")[0]).controller("ddatagrid");
			};
			
			//给视图列表设置数据集
			$scope.setListViewDataProviders = function(values)
			{
				var listViewGridController = $scope.getListViewGridController();
				listViewGridController.setDataGridProviders(values);
			};
			
			 $scope.$watch('displayDatas', function(newVal, oldVal) 
			 {
		         if (newVal !== oldVal) 
		         {
		        	 $scope.setListViewDataProviders($scope.displayDatas);
		         }
			 }, true);
			
		},
		template:'<ddatagrid id="ddatagrid" isoperation-column=true ' +
				'operation-columns="operationColumns" ' +
				'operation-bar-buttons="operationBarButtons" ' +
				'list-view-key="{{listViewKey}}"'  +
				'no-load-data-by-server="true">'  +
				'</ddatagrid>'
	};
});