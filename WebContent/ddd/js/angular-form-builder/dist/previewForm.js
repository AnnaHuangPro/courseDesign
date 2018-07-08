angular.module("previewForm", [])
.directive("previewForm",function()
{
	return{
		restrict:'E',
		scope:{
			formHtml:'=',
			
		},
		controller:function($rootScope,$scope,$transclude,$compile,$element){
			$scope.$watch("formHtml", function(newVal, oldVal){
				if(newVal!=oldVal){
					var ngModels  = newVal.match(/ng-model=\"([^\s])*\"/g);
					if(ngModels){
						for(var i=0;i<ngModels.length-1;i++){
							   if (ngModels[i]==ngModels[i+1]&&ngModels[i]!='ng-model="modelData.noBundle"'){
								   newVal = newVal.replace(new RegExp(ngModels[i], 'g'), "");
							   }
						}
					}
					$element.empty();
		            $element.append(newVal);	
		            $compile($element.contents())($scope);
				}
			})
			

		}
	}
})
