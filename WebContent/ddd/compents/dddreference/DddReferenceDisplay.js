/**
 * 只读的展示外键的指令
 */
angular.module("dddReferenceDisplayApp",[])
.directive("dreferencedisplay",function(ListViewService,$rootScope,$compile,ngDialog)
{
	return{
		restrict:'E',

		scope:{
			displayModel:'=',
			displayField:'@',
			
		},
		controller:function($scope,$transclude,$compile,$element)
		{			
			$scope.$watch("displayModel",function(newVal,oldVal){

				if(newVal != oldVal){
					$scope.displayText = "";
					if(null==newVal||undefined==newVal||null==$scope.displayField||undefined==$scope.displayField){
						$scope.displayText = "";
						return;
					}
					if(newVal instanceof Array){
						var loopCount = newVal.length;
						if(loopCount>0){
							$scope.displayText+=(newVal[0])[$scope.displayField];
						}
						for(var i=1;i<loopCount;i++){
							$scope.displayText+=","+(newVal[i])[$scope.displayField];
						}
					}else{
						$scope.displayText+=newVal[$scope.displayField];
					}
				}
			})
		},
		templateUrl:'compents/dddreference/asset/refrenceDisplayTemplate.html',
	}
});