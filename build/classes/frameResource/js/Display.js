#set($EntityNameUp="${entityClass.className}")
#set($EntityNameLow="${entityClass.className.substring(0,1).toLowerCase()}${entityClass.className.substring(1)}")
#set($extension=".js")
#set($fileName="${EntityNameUp}Display")
#set($index = ${entityClass.packageName.lastIndexOf(".")} + 1)
#set($simplePackage=${entityClass.packageName.substring($index)})
#set($outputFile="${htmlAndjsCodeGenPath}${simplePackage}/js/${EntityNameLow}/${fileName}${extension}")
#set($daole="$")
angular.module('${EntityNameLow}Module', [])
.controller('${EntityNameLow}DisplayController',['$rootScope','$scope','$stateParams','${EntityNameUp}Service','$state',
function($rootScope,$scope,$stateParams,${EntityNameUp}Service,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.${EntityNameLow} = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		${EntityNameUp}Service.find${EntityNameUp}ById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);