angular.module("radioModule",[])
.controller("radioController",["$scope",function($scope){
	
	$scope.removeOption = function(index){
		$scope.dataSource = $scope.dataSource || [];
		$scope.dataSource.splice(index,1);
	}
	
	
	$scope.selectDefaultValue = function(obj){
		angular.forEach($scope.dataSource,function(data){
			if((data.isDefaultValue=="true"||data.isDefaultValue==true)&&data.value!=obj.value)
				data.isDefaultValue=false;
		});
	}
}])