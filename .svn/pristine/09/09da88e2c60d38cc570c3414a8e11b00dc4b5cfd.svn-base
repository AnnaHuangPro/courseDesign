angular.module("formModule", [])
.directive("formPriview",function($stateParams,$timeout,DynamicFormService,ExpressionService, $sce)
{
	return{
		restrict:'E',
		transclude: true,
		scope:{
			dynamicFormKey:'=',
			modelData: '=',
			dynamicFormType:'@',
			previewFormData:'=',
			removeLoadIcon:'@'
		},
		template: function(elem, scope) {
			if (scope.removeLoadIcon=="true"||scope.removeLoadIcon==true) {
				return '';
			} else {
				return "<div style='text-align:center;height:350px'><img src='../ddd/compents/formDesigner/asset/loading.jpg'></div>";
			}
		},
		controller:function($rootScope,$scope,$transclude,$compile,$element){
			
			//富文本显示对象
			$scope.modelDataDisplay = {};
			if(typeof $scope.modelData == 'undefined'){
				$scope.modelData = {};
			}

			//接收父及作用域传来的值
			$scope.$on('options', function(event,data) {  
    			$scope.options = data;
 			});  

			if($scope.previewFormData&&$scope.dynamicFormType=="preview"){
				$element.empty();
	            $element.append($scope.previewFormData);	
	            $compile($element.contents())($scope);
			}
			
			$scope.loadData = function(){
				if($scope.dynamicFormKey != null && $scope.dynamicFormKey != ""&&$scope.dynamicFormKey !=undefined){
					if($scope.dynamicFormType=="display"&&$scope.dynamicFormKey.indexOf("_display") ==-1){
						DynamicFormService.findDynamicFormByKey($scope.dynamicFormKey+"_display",successcb,errorcb);
					}
					else
						DynamicFormService.findDynamicFormByKey($scope.dynamicFormKey,successcb,errorcb);
					
				}

				function successcb(data){
	            	var template = data.dynamicFormNewHtml;
	            		            	
	            	if(template != null && template != "")
	            	{
	            		$element.empty();
	            		$element.append(template);	
	                	$compile($element.contents())($scope);
	                }
	            };

	            function errorcb(){
	            	alert("加载动态表单内容失败！");
	            };
			};
            $scope.loadData();
			
			$scope.$watch('dynamicFormKey', function(newVal, oldVal) {
		        if (newVal !== oldVal) 
		        {
		        	$scope.loadData();
		        }
			}, true);

			//验证权限 
			$scope.reloadData = true;
			$scope.hasAuthority = function(bundle,authority){
				$scope[bundle] = {};
				if(!authority){
					$scope[bundle].show = true;
					$scope[bundle+"Style"] = "form-group";
				}
				if(authority.indexOf("({{"+bundle+"}})") > 0&&$scope.dynamicFormKey.indexOf("_display")>0){
					if($scope.modelData[bundle]==undefined&&$scope.reloadData){
						$scope.loadData();
						$scope.reloadData=false;
						return;
					}
					authority = authority.replace("({{"+bundle+"}})", "("+$scope.modelData[bundle]+")"); 
				}
				ExpressionService.analyticExpression(authority,successcb,errorcb);
				function successcb(data){
					if(data==true||data=="true"){
						$scope[bundle].show = true;
						$scope[bundle+"Style"] = "form-group";
					}
		         }
				 function errorcb(){
		            alert("表达式解析失败！");
		
		         };

				$scope[bundle].show = false;
			}
			
			//解析表达式，给默认值赋值
			$scope.showExpression = function(bundle,defultValue){
				if($scope.modelData[bundle]==null||$scope.modelData[bundle]== ""||$scope.modelData[bundle] ==undefined){
					if(defultValue!=null&&defultValue!=""){
						if(defultValue.charAt(0)=="$"){
							ExpressionService.analyticExpression(defultValue,successcb,errorcb);
							function successcb(data){
								$scope.modelData[bundle] = data;
					         }
							 function errorcb(){
					            alert("表达式解析失败！");
					         };
						}else{
							$scope.modelData[bundle] = defultValue;
						}
					}
				}
			}

			$scope.trustData = {};
			$scope.trustAsHtml = function(data){
				$scope.trustData[data] = data;
			}
			
			$scope.$watch('trustData', function(newVal, oldVal) {
			 	if (newVal !== oldVal&&$scope.modelData) {
					var trustData = $scope.trustData;
					for(data in trustData){
						//将字符串转换为Html时将html添加为信任
						$scope.modelDataDisplay[trustData[data]] = $sce.trustAsHtml($scope.modelData[trustData[data]]);
					}
			 	}
			},true);
		}
	}
})

.factory('ExpressionService', ['$resource', function($resource) 
	{
		var expressionService = $resource('../ModelExpression/:action', {});
		expressionService.analyticExpression=function(expression,successcb,errorcb)
		{
			expressionService.save({action:"analyticExpression"},{expression:expression},successcb,errorcb);
		};
		return expressionService;;
}]);