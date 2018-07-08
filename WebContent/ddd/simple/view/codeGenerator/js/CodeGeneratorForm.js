var codeGeneratorModule = angular.module('codeGeneratorModule', []);
codeGeneratorModule.controller("codeGeneratorFromController", function($scope,$rootScope,
		CodeGeneratorService, $state, angularPermission, $stateParams) {

	$scope.generatorBaseCode = function() {
		if ($scope.className == "" || $scope.className == undefined) {
			alert("请输入完整类名");
		} else {
			CodeGeneratorService.generatorBaseCode({
				className : $scope.className
			}, sucesscb, errorcb);
		}

		function sucesscb(data) {
			if (data.errorMsg != "") {
				alert(data.errorMsg);
			} else {
				alert(data.successMsg);
			}
		}
		function errorcb(error) {
			$rootScope.openErrorDialog(error);
		}
	};
	$scope.mergeRoute = function() {
		CodeGeneratorService.mergeRoute(sucesscb, errorcb);

		function sucesscb(data) {
			if (data.errorMsg != "") {
				alert(data.errorMsg);
			} else {
				alert(data.successMsg);
			}
		}
		function errorcb(error) {
			$rootScope.openErrorDialog(error);
		}
	};
	$scope.importEntity = function() {
		CodeGeneratorService.importEntity(sucesscb, errorcb);
		function sucesscb(data) {

		}
		function errorcb(error) {

		}
	}
	$scope.generatorEntity = function() {
		if ($scope.classInfo == "" || $scope.classInfo == undefined) {
			alert("请输入详细实体信息");
		} else {
			CodeGeneratorService.generatorEntity({
				classInfo : $scope.classInfo
			}, sucesscb, errorcb);
		}

		function sucesscb(data) {
			if (data.errorMsg != "") {
				alert(data.errorMsg);
			} else {
				$scope.className = data.successMsg
				alert("生成实体：" + data.successMsg);
			}
		}
		function errorcb(error) {
			$rootScope.openErrorDialog(error);
		}
	};

});