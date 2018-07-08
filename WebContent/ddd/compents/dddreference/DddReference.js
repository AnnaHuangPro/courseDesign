/**
 * 
 */
angular.module("dddReferenceApp",['ui.bootstrap','dialogs.main'])
.directive("dreference",function(ListViewService,$rootScope,$compile,dialogs)
{
	return{
		 
		restrict:'E',
		require: 'ngModel',
		scope:{
			listViewKey:'@',
			displayOnly:'@',
			multiSelect:'@',
			bindField:'@',
			showModelFiled:'@',
			useShowFiled:'@',
			name:'@',
			initFilter:'@',
			required:'@',
			placeholder:'@',
			withheaderSelect:'@',
			innerTree:'@',
			innerTreee:'@',//孵化器
			codeUnitLength:'@',
			codeName:'@',
				
		},
		template: function(elem, scope) {
			if (scope.displayOnly=="showName") {
				return '<p class="form-control-static">{{showChooseEntitysFiled}}</p>';
			} else {
				return  "<div class='dropdown input-group custom-select '  " +
				"style='padding:0px'><input   ng-readonly='!useShowFiled'" +
				" placeholder='{{placeholder}}' type='text' style='" +
				"background-color:white;' class='form-control' name='{{$scope.name}}'  " +
				" ng-model='showChooseEntitysFiled' >" +
				"<span ng-disabled='displayOnly' class='input-group-addon' " +
				"style='background-color:white;border-right-style:none;border-left-style:none;padding-left:2px;padding-right:4px;'  ng-click='initGrid()'>" +
				"<i class='glyphicon glyphicon-triangle-bottom' ></i></span><span class='input-group-btn' " +
				"style='border-right-style:none;border-top-style:none;border-bottom-style:none;'>" +
				"<i ng-disabled='readOnly' style='border-top-right-radius:5px;border-bottom-right-radius:5px;margin-right:-2px;padding-left:5px;padding-right:6px;" +
				"'  ng-click='clearn()'" +
				" class='btn btn-default'><span style='font-size:2px;' class='glyphicon glyphicon-trash' " +
				"></span></i></span></div>";
			}
		},
		controller:function($scope,$transclude,$compile,$element)
		{
			$element.css({padding:0});
            this.changeNotMultiSelectDisplay = function(values)
            {
                $scope.showChooseEntitysFiled =values[$scope.showModelFiled];                	
            }
            
            this.changeMultiSelectDisplay = function(values)
            {
                var fileds = '';
                for(var i=0,count=values.length;i<count;i++){
                    if(i!=count-1){
                        fileds+=values[i][$scope.showModelFiled]+",";
                    }
                    else{
                        fileds+=values[i][$scope.showModelFiled];
                    }
                }
                $scope.showChooseEntitysFiled = fileds;
            }
		},
		link: function(scope, element, attrs, ngModelController) {
			scope.allowMultiSelect = scope.multiSelect=='true'?true:false;//是否允许多选
            scope.useShowFiledOnly = scope.useShowFiled=='true'?true:false;//是否只将显示字段绑定给ngmodel
            scope.show = ngModelController.$viewValue;
            
            //scope.showChooseEntitysFiled 为外键控件中的inpu框中显示的字段
            
            scope.changeNotMultiSelectDisplay = function()
            {
                var values = ngModelController.$viewValue;
                if(values){
                	scope.showChooseEntitysFiled =values[scope.showModelFiled];                	
                }
            }
            scope.changeMultiSelectDisplay = function()
            {
                var fileds = '';
                var values = ngModelController.$viewValue;
                if(values){
                	for(var i=0,count=values.length;i<count;i++){
                        fileds+=values[i][scope.showModelFiled]+",";
                    }
                    fileds = fileds.substring(0,fileds.length-1);
                    scope.showChooseEntitysFiled = fileds;
                }
            }
    
            scope.clearn = function(){
            	if(!scope.displayOnly){
            		ngModelController.$setViewValue(null);
            		scope.showChooseEntitysFiled= "";
            	}
            }
            
            scope.$watch("showChooseEntitysFiled",function(newVal,oldVal){
            	if(scope.useShowFiledOnly){
            		ngModelController.$setViewValue(newVal);
            	}
            })
            
            scope.initGrid = function(){
            	if(scope.displayOnly){
            		return;
            	}
				var params = {
						multiSelect:scope.multiSelect,
						initFilter:scope.initFilter,
						listViewKey:scope.listViewKey,
						withheaderSelect:scope.withheaderSelect,
						innerTree:scope.innerTree,
						innerTreee:scope.innerTreee,
						codeUnitLength:scope.codeUnitLength,
						codeName:scope.codeName
				}
				
            	var dlg = dialogs.create('compents/dddreference/asset/displayTemplate.html','dreferenceContoller',params,{size:'lg',keyboard: true,backdrop: false,windowClass: 'my-class'});
				dlg.result.then(function(chooseEntitys){
					scope.chooseEntity(chooseEntitys); 
				},function(){
					//取消
				});
            }
            ngModelController.$parsers.push(function(newVal){
            	if(scope.allowMultiSelect&&!scope.useShowFiledOnly)
                {
                	 scope.changeMultiSelectDisplay();
                }
                else if(!scope.allowMultiSelect&&!scope.useShowFiledOnly)
                {
                	 scope.changeNotMultiSelectDisplay();
                }
                else{
                	 scope.showChooseEntitysFiled = newVal;
                }
            	return newVal;
            })
            
            ngModelController.$formatters.push(function(newVal){
            	if(newVal){
            		//如果传入的是字符串则
                	if(typeof newVal !== "object" && (!scope.useShowFiled)){
                		function successCB(data){
                			if(scope.$$phase){
                				scope.$apply(function(){
                					if(data.length ==1){
                						ngModelController.$setViewValue(data[0]);
                					}else{
                						ngModelController.$setViewValue(data);
                					}
                				})
                			}
                			else{
                				if(data.length ==1){
            						ngModelController.$setViewValue(data[0]);
            					}else{
            						ngModelController.$setViewValue(data);
            					}
                			}
                		}
                		function errorCB(error){
                			
                		}
                		ListViewService.findEntityByKey(scope.listViewKey,newVal,successCB,errorCB);
                	}else{
                		ngModelController.$setViewValue(newVal);
                	}
            	}
            	else{
            		scope.showChooseEntitysFiled = "";
            	}
            	return newVal;
            })
			scope.chooseEntity = function(chooseEntitys)
			{
            	if(!chooseEntitys  && chooseEntitys.length ==0){
            		ngModelController.$setViewValue(null);
            		scope.showChooseEntitysFiled= "";
            		return;
            	}
            	var chooseEntity = chooseEntitys[0];
                if(!scope.allowMultiSelect && !scope.useShowFiledOnly)// 单选 绑定实体
                {
                    ngModelController.$setViewValue(chooseEntity);
                }
                else if(!scope.allowMultiSelect&&scope.useShowFiledOnly) // 单选 绑定字段
                {
                	//共用部分提出去！
                	 var filed =  scope.showModelFiled;
                     if(scope.bindField){
                  	   filed = scope.bindField;
                     }
                    var displayString  = chooseEntity[filed];
                    ngModelController.$setViewValue(displayString);
                }
                else if(scope.allowMultiSelect&&!scope.useShowFiledOnly) // 多选 绑定实体
                {
                    ngModelController.$setViewValue(chooseEntitys);
                }
                else // 多选  绑定字段
                {
                   var fileds = '';
                   var filed =  scope.showModelFiled;
                   if(scope.bindField){
                	   filed = scope.bindField;
                   }
                    for(var i=0,count=chooseEntitys.length;i<count;i++){
                           fileds+=chooseEntitys[i][filed]+",";
                    }
                    fileds = fileds.substring(0,fileds.length-1);
                    ngModelController.$setViewValue(fileds);
                }
               
			}
            scope.$on("dbClickRowEvent",function(event,entitys)
            {
                scope.bindModel=entitys[0];
                scope.showMyGrid=false;
            });

            scope.clickFormInput=function()
            {
                scope.showMyGrid=!$scope.showMyGrid;
            }

            scope.keyup = function(event)
            {
                if(event.keyCode == 32)
                    scope.showMyGrid=true;
            }
		}
	}
})
.controller('dreferenceContoller',function($scope,$uibModalInstance,data,$rootScope){
		
		$scope.data = data;
		
		//-- Methods --//
		//$scope.data.initFilter = angular.fromJson($scope.data.initFilter);
		$scope.done = function(){
        	var chooseEntitys = this.dreferenceDdatagrid.getSelectRow();
			$uibModalInstance.close(chooseEntitys);
		}; // end done
		$scope.cancel = function(){
			$uibModalInstance.dismiss('Canceled');
		};		
	 
	});