angular.module("DynamicFormApp",[])
.directive("dynamicform",function(TaskService){
	return{
        restrict:'E',
        scope:{
        	datasources:'='
        },
        controller:function($scope,$transclude,$compile,$element){

        	$scope.loadTemple = function()
        	{
        		if($scope.datasources != null && $scope.datasources.length >0)
        		{
        			 var template = "<form class=\"form-horizontal col-md-12\">";
        			 angular.forEach($scope.datasources, function(datasource,index)
					 {
        				 template += "<div d"+datasource.type+" fieldvalue='datasources["+index+"].defauleVaule' dlabel='"+datasource.name+"' doptions='"+datasource.value+"' class='form-group'></div>";
					 });
        			 template += "</form>";
        			
        			if(template){
        				$element.empty();
        				$element.append(template);
        				$compile($element.contents())($scope);
        			}
        		}
        	}
            
			 $scope.$watchCollection('datasources', function(newVal, oldVal) {
			        if (newVal !== oldVal) {
			            $scope.loadTemple();
			        }
			 }, true);
       }
   };
})
.directive("checkOption",function(TaskService){
	return{
        restrict:'E',
        scope:{
        	formId:'=',
        	formType:'@'
        },
        controller:function($scope,$transclude,$compile,$element)
        {
        	$scope.findCheckOptionsByFormResult = function(datas)
        	{
        		$scope.checkOptions = datas;
        	}
        	$scope.findCheckOptionsByFormFault = function(data)
        	{
        		alert("查询审批历史失败！");
        	};
        	$scope.loadData = function()
        	{
        		TaskService.findCheckOptionsByForm($scope.formId,$scope.formType,
        				$scope.findCheckOptionsByFormResult,$scope.findCheckOptionsByFormFault)
        	}
        	
			 $scope.$watchCollection('formId', function(newVal, oldVal) {
				 if(newVal!==oldVal){
					 $scope.loadData();
				 }else if(oldVal!==undefined){
					 $scope.loadData();
				 }
			 }, true);
        },
        templateUrl:'simple/view/workflow/asset/CheckOptionTemplate.html'
	}
});
