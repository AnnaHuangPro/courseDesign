var oneToManyGridModule = angular.module("oneToManyGridModule",['ngRoute','ui.bootstrap']);
oneToManyGridModule.directive("oneToManyGrid",function(ngDialog,$rootScope,$timeout)
{
	return{
		restrict:'E',
		scope:{
			operationColumns:'=',
			operationBarButtons:'=',
			displayDatas:'=',
			displayColumns:'=',
			displayPermissions:'=',
			eachPageSize:'=',
			modelName:'=',
			copyModelItem:"@",
			entityName:'@',
			explain:'@',
			reference:'='
		},
		controller:function($scope,$transclude,$state)
		{
			$scope.$watch("displayDatas",function(newVal,oldVal){
				if(newVal != oldVal)
				{
					$scope.showDatas = newVal;
					
					if($scope.firstIn==undefined){
						$scope.paging($scope.showDatas,1);
						$scope.firstIn = false;
					}else if($scope.refresh){
						$scope.paging($scope.showDatas,$scope.currentPage);
						$scope.refresh = false;
					}else{
						$scope.pageChanged($scope.currentPage);
						$scope.refresh = false;
					}
				 }
			},true);
			
			//分页
			$scope.paging=function(datas,currentPage)
			{
				 $scope.allmessages =  datas;
				 $scope.pageSize = $scope.eachPageSize;
			     $scope.totalRecords = datas.length;
			     $scope.currentPage = currentPage;
			     $scope.numPages = $scope.totalRecords/ $scope.pageSize;
			     $scope.showDatas = datas.slice(($scope.currentPage-1)*$scope.pageSize, $scope.currentPage*$scope.pageSize);
			}
			
			$scope.pageChanged = function (page) 
		    {
		        $scope.currentPage = page;
		        var startpos = (page - 1) * $scope.pageSize;
		        $scope.showDatas = $scope.allmessages.slice(startpos, startpos + $scope.pageSize);
		    };
		    
		    $scope.permissionClick=function(data,index)
		    {
		    	var displayIndex = $scope.displayDatas.indexOf(data);
		    	var currentIndex = $scope.showDatas.indexOf(data);
		    	var permission = $scope.displayPermissions[index];
		    	var currentPermission = permission.type;
		    	if(currentPermission != 'isInherited')
		    	{
					var currentModelItem = $scope.showDatas[currentIndex];
					
					if(!currentModelItem[currentPermission] || currentModelItem[currentPermission] == '否')
					{
						$scope.showDatas[currentIndex][currentPermission] = '是';
						$scope.displayDatas[displayIndex][currentPermission] = '是';
					}
					else if(currentModelItem[currentPermission] == '是')
					{
						$scope.showDatas[currentIndex][currentPermission] = '否';
						$scope.displayDatas[displayIndex][currentPermission] = '否';
					}
		    	}
		    }
			
			$scope.operationColumnClick=function(data,index)
			{
				var displayIndex = $scope.displayDatas.indexOf(data);
				var currentIndex = $scope.showDatas.indexOf(data);
				var operationColumn = $scope.operationColumns[index];
				$scope.currentOperation = operationColumn;
				var template = operationColumn.template;
				var operate = operationColumn.operate;
				
				if(operate == "edit")
				{
					$scope[$scope.entityName] = data;
					$scope.openDialog(template,$scope);
					$scope.refresh = false;
				}
				else if(operate == "delete")
				{
					$scope.refresh = true;
					$scope.displayDatas.splice(displayIndex,1);
				}
				else if(operate == "isUse")
				{
					var currentModelItem = $scope.showDatas[currentIndex];
					if(!currentModelItem.isUse || currentModelItem.isUse == '否')
					{
						$scope.showDatas[currentIndex].isUse = '是';
						$scope.displayDatas[displayIndex].isUse = '是';
					}
					else if(currentModelItem.isUse == '是')
					{
						$scope.showDatas[currentIndex].isUse = '否';
						$scope.displayDatas[displayIndex].isUse = '否';
					}
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
			
			$scope.$watch("copyModelItems",function(newVal,oldVal){
				if(newVal != oldVal)
				{
					var checkModelItems = angular.copy($scope.displayDatas);
					
					var existModelItems = [];
					var isExist = false;
					
					for(var i = 0 ,countI = newVal.length; i < countI; i ++)
					{
						for(var j = 0,countJ = checkModelItems.length; j < countJ; j ++)
						{
							if(newVal[i].modelItemEnglishName.toUpperCase()
							   ==checkModelItems[j].modelItemEnglishName.toUpperCase())
							{
								isExist = true;
								break;
							}	
						}
						if(!isExist)
						{
							var pushModelItem = angular.copy(newVal[i]);
							delete pushModelItem.EId;
							$scope.displayDatas.push(pushModelItem);
						}
						else
						{
							existModelItems.push(newVal[i].modelItemName);
						}
					}
					
					if(isExist)
					{
						var alertMessage = existModelItems.join(", ");
						alert("复制的模型项:\n"+alertMessage+"\n英文名重复");
					}
					else
					{
						$scope.refresh = true;
					}
				}
			},true);
			
			//弹出窗
			$scope.openDialog = function(template,parentScope)
			{
				ngDialog.open({
					template: template,
					className: 'ngdialog-theme-default',
					closeByDocument : true,
					controller:['$scope', function($scope) {
						if(parentScope.modelName)
							$scope['modelName'] = parentScope.modelName;
						$scope['operate'] = parentScope.currentOperation.operate;
						$scope[parentScope.entityName] = parentScope[parentScope.entityName];
						$scope.parentScope = parentScope;
						if(parentScope.$parent.modelData){
							var modelData = parentScope.$parent.modelData;
							$scope.formKey = modelData[parentScope.entityName].subTableFormKey;
							$scope.tableName = modelData[parentScope.entityName].subTable;
						}
						//弹出层确定操作
						$scope.ensureClick = function(modelItem)
						{
							var mustNeedFields = ['isUse','isInherited','isSearchCriteria','isMustItem','isSort','isContribute'];
							angular.forEach(mustNeedFields,function(mustNeedField){
								if(!(mustNeedField in modelItem)){
									if(parentScope.modelName == '基础模型')
									{
										modelItem['isInherited'] = '是';
									}
									modelItem[mustNeedField] = '否';
								}
							});
							
							var operate = parentScope.currentOperation.operate;
							if(operate == "add")
							{
								modelItem.isUse = "是";
								if(parentScope.displayDatas == null)
								{
									parentScope.displayDatas = new Array();
								}
								parentScope.refresh = true;
								parentScope.displayDatas.push(modelItem);
							}
							if(operate == "edit")
							{
								for(var i=0,count = parentScope.displayDatas.length;i<count;i++){
									if(parentScope.displayDatas[i].eId == modelItem.eId){
										parentScope.displayDatas[i] = modelItem;
									}
								}
								parentScope.refresh = true;
							}
							
							ngDialog.closeAll();
						};
						//弹出层取消操作
						$scope.cancelClick = function()
						{
							ngDialog.closeAll();
						};
					}],
					plain : false
				});
			};
			
			$scope.operationBarButtonClick = function(operationBarButton)
			{
				$scope.currentOperation = angular.copy(operationBarButton);
				if($scope.currentOperation.clickFn && (typeof $scope.currentOperation.clickFn) == 'function')
				{
					$scope.currentOperation.clickFn();
				}
				else if($scope.currentOperation.operate == "add"||$scope.currentOperation.operate == "select")
				{
						if($scope[$scope.entityName]!=null)
						{
							$scope[$scope.entityName]=null;
						}
						$scope.openDialog($scope.currentOperation.template,$scope);
				}
			};
			
			//工具列事件处理
			{
				angular.forEach($scope.operationBarButtons, function(operationBarButton)
				{
					operationBarButton.click=$scope.operationBarButtonClick;
			    });
			};
			
		},
		templateUrl:'compents/oneToManyGrid/asset/template.html'
	};
});

oneToManyGridModule.constant("paginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: !1,
    directionLinks: !0,
    firstText: "首页",
    previousText: "上一页",
    nextText: "下一页",
    lastText: "尾页",
    rotate: !0
});