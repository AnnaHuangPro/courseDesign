angular.module('ddd3utilModule', [])
.controller('ddd3utilController',['$rootScope','$scope','ddd3utilService',
function($rootScope,$scope,ddd3utilService){
	$scope.tabs=[];
	$scope.addTab = function(){
		var tab = {};
		$scope.tabs.push(tab);
	}
	$scope.deleteTab = function(tab){
		if($scope.tabs.indexOf(tab)>-1){
			$scope.tabs.splice($scope.tabs.indexOf(tab),1);
		}
	}
	$scope.generate = function(){
		if($scope.tabs.length ==0){
			alert("请添加表");
		}else{
			function successCB(data){
				$scope.result = data;
			}
			function errorCB(error){
				$rootScope.openErrorDialog(error);
			}
			ddd3utilService.generator($scope.tabs,successCB,errorCB);
		}
		
	}
   
}]);	