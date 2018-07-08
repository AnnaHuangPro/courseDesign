angular.module("checkboxModule",[])
.controller("checkboxController",["$scope",function($scope){
	
	$scope.removeOption = function(index){
		$scope.dataSource = $scope.dataSource || [];
		$scope.dataSource.splice(index,1);
	}
	
	$scope.selectDefaultValue = function(obj){
		if(obj)
		{
			angular.forEach($scope.dataSource,function(ds,index)
			{
				if(obj.name == ds.name&&obj.value == obj.value)
				{
					$scope.$parent.dataSource[index].isDefaultValue = true;
				}
				else
				{
					$scope.$parent.dataSource[index].isDefaultValue = false;
				}
			})
		}
	}
	
}])