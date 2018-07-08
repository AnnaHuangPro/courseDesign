angular.module('modelModule', [])
    .controller("modelFormController", ["$rootScope", "$scope", "ModelService", "$state", "$stateParams","ModelItemService","dialogs","$templateCache","asynchroMarkService",  "TaskService",  
        function($rootScope, $scope, ModelService, $state,  $stateParams,ModelItemService,dialogs,$templateCache,asynchroMarkService ,TaskService ) {
    	$scope.operate = $stateParams.operate;
    	$scope.stateParams = angular.copy($stateParams);
    	$scope.initFilter = {};
    	$scope.id = $stateParams.id;
        $scope.workflowProcesses = [];
        $scope.modelName = "";
        $scope.parentModelItems =[];
        $scope.isIndependent = false;
        $scope.model = {modelItems:[]};
    	
        $scope.cancel = function(){
        	$rootScope.closeOperateTab();
    	}

        $scope.previewForm = function() {
        	 function successFn(data) {
        		var template = '<div class="modal-header"><a class="close" href="javscript:void(0)" ng-click="cancelClick()">×</a><h4 class="modal-title"><span class="glyphicon glyphicon-edit"></span>预览表单</h4></div><div class="modal-body clearFix form-horizontal">';
             	template += data.result;
             	template += "</div>";	
        		$templateCache.put("dynamicPreviewTemp.html",template);
        		asynchroMarkService.unmask();
             	dialogs.create("dynamicPreviewTemp.html",'PreviewDialogCtr',{},{size:'lg'});
             }

            function errorFn(data) {
            	asynchroMarkService.unmask();
            	$rootScope.openErrorDialog(error);
            }

            var model = angular.copy($scope.model);
            asynchroMarkService.mask("请等待...");
            ModelService.previewForm({
                model: model
            }, successFn, errorFn);
        }

            $scope.getInitModelData = function() {
                $scope.displayDatas = new Array();
                if ($scope.operate == 'edit') {
                    $scope.getModelDetail();
                } 
            }

            $scope.getModelDetail = function() {
                ModelService.findModelById($scope.id, sucesscb, errorcb);

                function sucesscb(data) {
                    for(var i=0,len=data.modelItems.length;i<len;i++){
                        data.modelItems[i].relatedParameters = angular.fromJson(data.modelItems[i].relatedParameters);                   
                    }
                    if ($stateParams.operate == 'edit') {
                        $scope.model = data;
                        $scope.model.childModel = null;
                        $scope.modelName = $scope.model.modelName;
                        $scope.displayDatas = $scope.model.modelItems;
						$scope.initFilter.expectId = $scope.model.eId; // 选择父模型进行筛选
                        
                    } else if ($stateParams.operate == 'copy') {
                        var modelItems = data.modelItems;
                        if (modelItems != null && modelItems != undefined) {
                            for (var i = 0; i < modelItems.length; i++) {
                                delete modelItems[i].eId;
                            }
                            $scope.model.modelItems = modelItems;
                        }
                    }
                };

                function errorcb(data) {
                	dialogs.error("错误","加载失败!",{size:'md'});
                };
            };

            $scope.saveModel = function() {
                asynchroMarkService.mask("请等待...");
                ModelService.saveModel({
                    model: $scope.model
                }, sucesscb, errorcb);

                function sucesscb(data) {
                    asynchroMarkService.unmask();
                    dialogs.notify('提示','保存成功!',{size:'sm'});
                	$stateParams.operate = "edit";
                	$scope.model = data;
                	 $scope.refreshGrid(); 
                }

                function errorcb(error) {
                    asynchroMarkService.unmask();
                	$rootScope.openErrorDialog(error);
                }
            }

            //提交模型
            $scope.submitModel = function() {
                function successcb() {
                	asynchroMarkService.unmask();
                    $state.go('main.list.model.modelList');
                    	
                }

                function errorcb(error) {
                	asynchroMarkService.unmask();
                	$rootScope.openErrorDialog(error);
                }

               
                	asynchroMarkService.mask("请等待...");
                    ModelService.submitModel($scope.model,$scope.ensureUnion, successcb, errorcb); 
            }

            $scope.refreshGrid = function() {
                var controller = $rootScope.getController("modelListGrid", "ddatagrid");
                if (controller) {
                    controller.refreshCurrent();
                }
            }

            $scope.editGridOptions = {
                showColumnMenu: false,
                data: "filterEditData()",
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            $scope.noteditGridOptions = {
        		showColumnMenu: false,
                data: "filterNoteditData()",
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                }
            }
            
            $scope.filterEditData = function(){
                 var editItem = [];
                angular.forEach($scope.model.modelItems,function(item){
                     if(item.isInherited == '否')
                             editItem.push(item);        
                 })
                 return editItem;
            } 
            $scope.onceHadParentModel = false;
            $scope.$watch("model.parentModel",function(newVal,oldVal){
                if(angular.isObject(newVal) && newVal != oldVal){
	               	 $scope.onceHadParentModel = true;
	               	 $scope.findParentModelItem();
                }else if($scope.onceHadParentModel && !newVal){
               	 /* 外键清空父模型的情况 */
               	 clearParentModelItem();
                }
           })  
           function clearParentModelItem(){
            	 $scope.model.modelItems =  $scope.model.modelItems.filter(function(item,index){
            		 if(item.isInherited == '是')
            			 return false;
            		 return true;
            	 })
            } 
            $scope.findParentModelItem = function(){
                 function successcb(data){
                     var isContainItem = false;
                	var existItems = [];
                     angular.forEach(data,function(item){
                    	if(isContain(item)){
                    		isContainItem = true;
                    		existItems.push(item.modelItemEnglishName);
                    	}
                    	delete item.eId;
                    	delete item.EId;
                        item.isInherited = '是';
                        item.relatedParameters = angular.fromJson(item.relatedParameters);
    					item.displayIndex = getSortNumber();
                     })
                     if(isContainItem){
                    	 dialogs.error("错误","模型项【"+existItems.join(",")+"】已存在，请删除或修改模型项英文名!",{size:"md"});
                     }
                     else{
                    	 $scope.model.modelItems = $scope.model.modelItems.concat(data);
                     }
                     //$rootScope.app.asynchroMask.unmask();
                 }
                 function errorcb(error){
                	 //$rootScope.app.asynchroMask.unmask();
                	 $rootScope.openErrorDialog(error);
                 }
                 //$rootScope.app.asynchroMask.mask("请等待......");
                 ModelItemService.findModelItemByModelId($scope.model.parentModel.EId,successcb,errorcb);
            }
            $scope.filterNoteditData = function(){
                 var editItem = [];
                    angular.forEach($scope.model.modelItems,function(item){
                     if(item.isInherited == '是')
                             editItem.push(item);        
                        })         
                 return editItem;
            }         
            var columnDefs = [{
                name: 'displayIndex',
                displayName: '排序',
                headerTooltip: false,
                headerCellClass: 'self-grid-tit',
                cellClass: 'self-grid-cell',
                type: 'number',
                width: '10%'
            }, {
                name: 'modelItemName',
                displayName: '中文名',
                headerCellClass: 'self-grid-tit',
                cellClass: 'self-grid-cell',
                type: 'string',
                width: '15%'
            }, {
                name: 'modelItemEnglishName',
                displayName: '英文名',
                headerCellClass: 'self-grid-tit',
                cellClass: 'self-grid-cell',
                type: 'string',
                width: '15%'
            }, {
                name: 'datatypeDesc',
                displayName: '数据类型',
                headerCellClass: 'self-grid-tit',
                cellClass: 'self-grid-cell',
                type: 'string',
                width: '15%'
            }, /*{
                name: 'isInherited',
                displayName: '继承',
                headerCellClass: 'self-grid-tit',
                cellClass: 'self-grid-cell',
                width: '8%',
                editDropdownValueLabel: 'isAllow',
                editDropdownOptionsArray: [{
                    id: '是',
                    isAllow: '是'
                }, {
                    id: '否',
                    isAllow: '否'
                }],
                editableCellTemplate: 'ui-grid/dropdownEditor'
            }, */ ];
            $scope.editGridOptions.columnDefs = columnDefs.map(function(item){
            	item.enableCellEdit = true;
            	return item;
            });
            $scope.editGridOptions.columnDefs.push({
                name: 'EId',
                displayName: '操作',
                headerCellClass: 'self-grid-tit',
                cellClass: 'self-grid-cell',
                width: '45%',
                enableCellEdit: false,
                sortable: false,
                enableHiding: false,
                pinnedRight:true,
                cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">'
                	+'<ul class="col-md-6 operateCell col-md-offset-3" style="list-style:none">'
                	+'	<li class="col-md-4" style="text-align:center" >'
                	+'		<a ng-click="grid.appScope.editModelItem(row)" class="glyphicon glyphicon-edit"></a>'
                	+'	</li>'
                	+'	<li  class="col-md-4" style="text-align:center">'
                	+'		<a  ng-click="grid.appScope.toggleIsUse(row)" ng-show="grid.appScope.judgeIsUser(row)">禁用</a>'
                	+'		<a  ng-click="grid.appScope.toggleIsUse(row)" ng-show="! grid.appScope.judgeIsUser(row)" style="color:red">启用</a>'
                	+'	</li>'
                	+'	<li  class="col-md-4" style="text-align:center">'
            		+'		<a  ng-click="grid.appScope.deleteModelItem(row)" class="glyphicon glyphicon-trash oprateIcon" style="color:#ea644a;font-size:13px"></a>'
            		+'	</li>'
                	+'</ul></div>'
            })
            $scope.noteditGridOptions.columnDefs = columnDefs.map(function(item){
            	item.enableCellEdit = item.name == "displayIndex";
            	return item;
            });
//            $scope.noteditGridOptions.rowTemplate =  '<div ng-class="{ \'my-css-class\': grid.appScope.rowFormatter( row ) }">' +
//            '  <div ng-if="!row.entity.merge" ng-drag="true" ng-drag-data="obj" data-allow-transform="true"ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
//            '</div>';
            $scope.noteditGridOptions.columnDefs.push({
                name: 'EId',
                displayName: '操作',
                headerCellClass: 'self-grid-tit',
                cellClass: 'self-grid-cell',
                width: '45%',
                enableCellEdit: false,
                sortable: false,
                enableHiding: false,
                pinnedRight:true,
                cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">'
                		+'<ul class="col-md-12 operateCell" style="list-style:none">'
                		+'	<li class="col-md-6" style="text-align:center" >'
                		+'		<a ng-click="grid.appScope.toggleIsUse(row)" ng-show="grid.appScope.judgeIsUser(row)">禁用</a>'
                		+'		<a ng-click="grid.appScope.toggleIsUse(row)" ng-show="!grid.appScope.judgeIsUser(row)" style="color:red">启用</a>'
                		+'	</li>'
                		+'	<li class="col-md-6" style="text-align:center">'
                		+'		<a  ng-click="grid.appScope.deleteModelItem(row)" class="glyphicon glyphicon-trash oprateIcon" style="color:#ea644a;font-size:13px"></a>'
                		+'	</li>'
                		+'</ul></div>'
            })
            
            $scope.judgeIsUser = function(currentRow){
                var modelItem = currentRow.entity;
                if(modelItem && modelItem.isUse === '是')
                            return true
                return false
            }
            $scope.toggleIsUse = function(currentRow) {
                if (currentRow && currentRow.entity && currentRow.entity.isUse === '是')
                    currentRow.entity.isUse = '否';
                else
                    currentRow.entity.isUse = '是'
            }

            $scope.editModelItem = function(currentRow) {
                var modelItem = currentRow.entity;
                $scope.openDialog("simple/view/model/html/model/ModelItemDialog.html", $scope, "edit", modelItem);
            }

            $scope.addModelItem = function() {
                var modelItem = {};
                $scope.openDialog("simple/view/model/html/model/ModelItemDialog.html", $scope, "add", modelItem);
            }

            $scope.deleteModelItem = function(currentRow){
                var modelItem = currentRow.entity;
                var modelItems = $scope.model.modelItems;
                for(var i=0;i<modelItems.length;i++){
                      if(modelItem === modelItems[i]){
                        modelItems.splice(i,1);
                        break;
                      }
                }
            }
            $scope.openDialog = function(template, parentScope, operate, modelItem) {
                if(operate=="edit"&&modelItem.isInherited=="是"){
                     dialogs.error("错误","不能编辑继承的模型项！",{size:'md'});
                     return;
                }
                var modelItem = angular.copy(modelItem);
                var dialog = dialogs.create(template,'ModelItemDialogCtr',{modelItem:modelItem,operate:operate,modelItems:$scope.model.modelItems,modelEnglishName:parentScope.model.modelEnglishName},{size:'lg'});
            	dialog.result.then(function(modelItemResult){
                    if (operate == "add") {
                    	modelItemResult.isUse = "是";
                        $scope.model.modelItems.push(modelItemResult);
                    }
                    if (operate == "edit") {
                    	angular.forEach($scope.model.modelItems,function(item,index,items){
                    		if(modelItemResult.modelItemEnglishName === item.modelItemEnglishName){
                    			items[index] = modelItemResult;
                    		}
                    	})
                    	sortMdelItems();
                    }
            	})
            };
			 function isContain(item){
            	var contain = false;
            	angular.forEach($scope.model.modelItems,function(modelItem){
            		if(modelItem.modelItemEnglishName == item.modelItemEnglishName){
            			contain = true;
            			return;
            		}
            	})
            	return contain;
			 }
           
            /* 获取排序值 */
			var maxDisplayIndex = 0;
    		function getSortNumber(){
    			angular.forEach($scope.model.modelItems,function(item,index){
        			if(item.displayIndex > maxDisplayIndex)
        				maxDisplayIndex = item.displayIndex;
        		})
        		return  maxDisplayIndex + 1;
    		}
            
    		function sortMdelItems(){
    			var modelItems = $scope.model.modelItems;
    			for(var i=0;i<modelItems.length;i++){
    			    for(var j = i + 1;j<modelItems.length;j++){
    			        if(modelItems[i].displayIndex>modelItems[j].displayIndex){
    			            var tmp = modelItems[i];
    			            modelItems[i] = modelItems[j];
    			            modelItems[j] = tmp;
    			        }
    			    }
    			}
    			//modelItems.reverse();
    		}
            
            $scope.$watch("copyModelItems", function(newVal, oldVal) {
                if (newVal != null && newVal.length > 0 && newVal != oldVal) {
                    var existModelItems = [];
                    angular.forEach($scope.copyModelItems,function(item,index,items){
                    	if(!isContain(item)){
                    		 delete item.eId;
                    		 delete item.EId;
	                         item.isInherited = '否';
	                         item.relatedParameters = angular.fromJson(item.relatedParameters);
	                         item.displayIndex = getSortNumber();
	                         this.push(item);
                    	}
                    	else{
                    		existModelItems.push(item.modelItemEnglishName);
                    	}
                    },$scope.model.modelItems);
                    $scope.copyModelItems = [];
                    
                    if (existModelItems.length > 0) {
                        var alertMessage = existModelItems.join(", ");
                        dialogs.error("错误","复制的模型项:\n" + alertMessage + "\n英文名重复，未添加",{size:'md'});
                    }
                    sortMdelItems();
                }
            });

            //模型英文名限长
            $scope.$watch("model.modelEnglishName", function(newVal, oldVal) 
            {
                if(newVal&&newVal.length>25)
                {
                    $scope.model.modelEnglishName = newVal.substring(0, 24);
                }
            });


            
          $scope.getWorkflowProcess = function() {
    	        TaskService.getWorkflowProcess(sucesscb, errorcb);
    	        
    	        function sucesscb(data) {
    	            $scope.workflowProcesses = data;
    	        }
    	
    	        function errorcb(error) {
    	        	$rootScope.openErrorDialog(error);
    	        }
    	    }
          $scope.getWorkflowProcess();
          	
            
            $scope.ensureUnion = [];
            $scope.waitUnion = {
            		name:"",
            		modelItems:[]
            };
            var indexs = {};
            $scope.addToWatiUnion = function(modelItem){
            	/*var contain  = false;
            	angular.forEach( $scope.waitUnion.modelItems,function(item,index,items){
            		if(modelItem == item){
            			contain = true;
            			return;
            		}
            	})
            	if(!contain){
            		$scope.waitUnion.modelItems.push(modelItem);
            		indexs[modelItem.modelItemEnglishName] = true; // 被选择
            	}*/
            	$scope.waitUnion.modelItems.push(modelItem);
        		indexs[modelItem.modelItemEnglishName] = true; // 被选择
            }
            
            $scope.deleteWaitUnion = function(modelItem,index){
            	$scope.waitUnion.modelItems.splice(index,1);
            	indexs[modelItem.modelItemEnglishName] = false; // 未被选择
            }
            $scope.notSelectItemFilter = function(modelItem){
            	return !indexs[modelItem.modelItemEnglishName]; // true:(未被选择 || undefined)
            }
            $scope.completeUnion = function(){
            	if($scope.waitUnion.modelItems.length > 0 && !$scope.waitUnion.name){
            		alert("请输入联合名称");
            		return;
            	}
            	else if($scope.waitUnion.modelItems.length == 0 && $scope.waitUnion.name){
            		alert("请选择合并列")
            		return;
            	}
            	else if($scope.waitUnion.modelItems.length == 0 && !$scope.waitUnion.name){
            		return;
            	}
            	if(!$scope.model.jointUnique)
            		$scope.model.jointUnique = [];
            	$scope.model.jointUnique.push(angular.copy($scope.waitUnion));
            	$scope.clearWatiUnion();
            }
            
            $scope.clearWatiUnion = function(){
            	$scope.waitUnion.modelItems.length = 0;
            	$scope.waitUnion.name = "";
            	indexs = {};// 要改 暂时用
            }
            
            $scope.rebuildJointUnique = function(jointUnique,index){
            	if($scope.waitUnion.name || ($scope.waitUnion.modelItems && $scope.waitUnion.modelItems.length>0)){
            		alert("请先组合或清空设计区域!");
            		return;
            	}
            	
            	$scope.deleteJointUnique(jointUnique,index);
            	$scope.clearWatiUnion();
            	$scope.waitUnion.name = jointUnique.name;
            	$scope.waitUnion.modelItems = jointUnique.modelItems;
            }
            
            $scope.deleteJointUnique = function(jointUnique,index){
            	$scope.model.jointUnique.splice(index,1);
            }
            $scope.deleteJointUnionItems = function(modelItems,index){
            	modelItems.splice(index,1);
            }
        }
    ])
     .controller("ModelItemDialogCtr", ['$scope','data', '$uibModalInstance','dialogs','ModelService','ReportviewService','$templateCache','CodeTypeService',function($scope,data,$uibModalInstance,dialogs,ModelService,ReportviewService,$templateCache,CodeTypeService) {
    	$scope = angular.extend($scope,data);
    	
    	/* 排序 */
    	var maxDisplayIndex = 0;
    	
    	if(!$scope.modelItem.displayIndex){
    		angular.forEach($scope.modelItems,function(item,index,items){
    			if(item.displayIndex > maxDisplayIndex)
    				maxDisplayIndex = item.displayIndex;
    		})
    		$scope.modelItem.displayIndex = maxDisplayIndex + 1;
    	}
    	if($scope.operate==='add'){
    		$scope.modelItem.isProcess = "否";
    	}
    	 $scope.$watch("datatype", function(newVal, oldVal) {
            if(newVal!=oldVal&&$scope.operate==='add'){
            	$scope.modelItem.relatedParameters.isHide = "否";
        		$scope.modelItem.relatedParameters.bindVal = "不可绑值";
        		$scope.modelItem.relatedParameters.nullable = "否";
        		$scope.modelItem.relatedParameters.isEdit = "是";
        		if(newVal.datatype=="radio"||newVal.datatype=="checkbox"){
        			$scope.modelItem.relatedParameters.orientation = "横排";
        		}
        		if(newVal.datatype=="datetime"){
        			$scope.modelItem.relatedParameters.format = "yyyy-mm-dd";
        		}
            }
          });

    	
        $scope.ensureClick = function() {
        	var message = validate();
        	if(message){
        		dialogs.error("错误",message,{size:'md'});
        		return;
        	} 

            if($scope.modelItem.datatypeDesc=="子表"){
                $scope.findModelById($scope.modelItem.relatedParameters.subModel.EId);
            }

            if($scope.modelItem.datatypeDesc=="自动编码"){
                $scope.handelBillCode();
            }


            var mustNeedFields = ['isUse', 'isInherited', 'isSearchCriteria', 'isMustItem', 'isSort', 'isContribute'];
            angular.forEach(mustNeedFields, function(mustNeedField) {
                if (!(mustNeedField in $scope.modelItem)) {
                    $scope.modelItem[mustNeedField] = '否';
                }
            });
            $uibModalInstance.close($scope.modelItem);
        };
        
		
        function validate(){
        	var message = '';
        	if(!$scope.modelItem.modelItemEnglishName|| $scope.modelItem.modelItemEnglishName === "" )
        		message = "请输入英文名!";
        	else if($scope.operate === 'add'){
        		angular.forEach($scope.modelItems,function(item,index,items){
        			if($scope.modelItem.modelItemEnglishName === item.modelItemEnglishName){
        				message = '模型项英文名重复!'; 
        			}
	        	})
        	}
            if($scope.modelItem.relatedParameters.isHide=="是"&&$scope.modelItem.relatedParameters.nullable=="是"){
                    message = '“是否隐藏”与“是否必填”不能同时选“是”!';
            }
            if($scope.modelItem.relatedParameters.isHide=="是"&&$scope.modelItem.relatedParameters.authority){
                    message = '“显示表达式”与“是否隐藏”只能二选一!';
            }
        	return message;
        }

         $scope.handelSubTable = function(){
            var fields = "";
            var subItems = $scope.subModel.modelItems;
            for(var i=0,len=subItems.length;i<len;i++){
                if(i==len-1){
                fields+=subItems[i].modelItemEnglishName;
                }else{
                    fields+=subItems[i].modelItemEnglishName+"\n";
                }
            }
            $scope.modelItem.relatedParameters.displayFields = fields;
         }

         $scope.findModelById = function(modelId){
             ModelService.findModelById(modelId,sucesscb,errorcb)
             function sucesscb(data)
            {
                $scope.subModel = data;
                 $scope.handelSubTable();
            };

            function errorcb(data)
            {
                dialogs.error("错误","加载子表数据出错！",{size:'md'});
            };
         }

          $scope.$watch("modelItem.relatedParameters.subModel", function(newVal, oldVal) 
          {
            if(newVal!=oldVal)
            {
                if($scope.modelItem.modelItemEnglishName)
                {
                      $scope.modelItem.relatedParameters.joinTableName =  $scope.modelItem.modelItemEnglishName+"Join"+newVal.modelEnglishName;
                }else
                {
                     $scope.modelItem.relatedParameters.joinTableName =  "join"+newVal.modelEnglishName;

                }
                if($scope.modelItem.relatedParameters.joinTableName.length>25)
                 {
                    $scope.modelItem.relatedParameters.joinTableName = $scope.modelItem.relatedParameters.joinTableName.substring(0, 24);
                 }
                $scope.modelItem.joinTableName = $scope.modelItem.relatedParameters.joinTableName;
                $scope.modelItem.relatedParameters.eachPageSize = 5;
            }
          });

          $scope.$watch("modelItem.relatedParameters.dataSourceDisplay", function(newVal, oldVal) 
          {
            if(newVal!=oldVal&&newVal.codeTypeKey!=undefined)
            {
                $scope.modelItem.relatedParameters.dataSource = newVal.codeTypeKey;

            }
          });

        $scope.$watch("modelItem.modelItemEnglishName", function(newVal, oldVal) 
        {
            if(newVal&&newVal.length>25)
            {
                $scope.modelItem.modelItemEnglishName = newVal.substring(0, 24);
            }
        });

         $scope.$watch("modelItem.relatedParameters.component", function(newVal, oldVal) {
            if(newVal!=oldVal&&newVal=="fileUpload"){
                if($scope.modelEnglishName){
                    $scope.modelItem.relatedParameters.bindEntity = $scope.modelEnglishName;
                }else{
                    dialogs.error("错误","请先填写模型英文名！",{size:'md'});
                }
            }
        });

         $scope.$watch("modelItem.relatedParameters.selectReportView", function(newVal, oldVal) {
            if(newVal!=oldVal){
                $scope.modelItem.relatedParameters.dataSource = newVal.reportViewKey;
                $scope.findReportViewById(newVal.EId);
            }
        });

         $scope.findReportViewById = function(id)
         {
            ReportviewService.findReportViewById(id,sucesscb,errorcb);

             function sucesscb(data)
            {
                $scope.modelItem.relatedParameters.tableName = data.dataSource.dataSourceCode;
                var options = data.dataSource.htmlColumns;
                for(var i=0,len=options.length;i<len;i++)
                {
                    options[i].optionKey = options[i].columnKey;
                    options[i].optionValue = options[i].columnValue;
                }

                 $scope.$broadcast('options', options);
            };

            function errorcb(data)
            {
                dialogs.error("错误","查询视图字段出错！",{size:'md'});
            };

         }

         if(typeof($scope.modelItem.relatedParameters) != "undefined")
        {
            if(typeof($scope.modelItem.relatedParameters.selectReportView)!= "undefined")
            {
                $scope.findReportViewById($scope.modelItem.relatedParameters.selectReportView.EId);
            }
        }

        $scope.$watch("modelItem.relatedParameters.selectReportView", function(newVal, oldVal) {
            if(newVal!=oldVal){
                $scope.modelItem.relatedParameters.dataSource = newVal.reportViewKey;
                $scope.findReportViewById(newVal.EId);
            }
        });

        $scope.handelBillCode = function()
        {
            var billCodeRule = $scope.modelItem.relatedParameters.billCodeRule;            
            $scope.modelItem.relatedParameters.variables = $scope.analysisPat(/(\${[\u4e00-\u9fa5_a-zA-Z0-9,]+})/g,billCodeRule);
            $scope.modelItem.relatedParameters.seqences = $scope.analysisPat(/(\$[[\u4e00-\u9fa5_a-zA-Z0-9,]+])/g,billCodeRule);
            $scope.modelItem.relatedParameters.billCodeTypeName = $scope.modelEnglishName;
            $scope.modelItem.relatedParameters.entityName = $scope.modelEnglishName;
            $scope.modelItem.relatedParameters.tableName = $scope.modelEnglishName;
            $scope.modelItem.relatedParameters.columnName = $scope.modelItem.modelItemEnglishName;
            $scope.modelItem.relatedParameters.fieldName = $scope.modelItem.modelItemEnglishName;
        }

        $scope.analysisPat = function(pat,rule)
        {
            var variableArray = rule.match(pat);
            if(variableArray==null)
            {
                dialogs.error("错误","“编码规则”格式错误！",{size:'md'});
            }

            var variables = ""; 
            for(var i=0,len=variableArray.length;i<len;i++)
            {
                variables+=variableArray[i];
            }
            return variables;
        }

        $scope.cancelClick = function() {
            $uibModalInstance.dismiss('Canceled');
        };
        
    }])
    .controller("PreviewDialogCtr",['$scope','data', '$uibModalInstance',function($scope,data,$uibModalInstance) {
    	$scope = angular.extend($scope,data);
        // 弹出层取消操作
        $scope.cancelClick = function() {
            $uibModalInstance.dismiss('Canceled');
        };
        
    }])

