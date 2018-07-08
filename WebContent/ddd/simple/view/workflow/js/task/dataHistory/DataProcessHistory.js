angular.module("taskServiceModule", [ 'DynamicFormApp', 'baseApp' ])
		.controller('dataProcessHistroyController',[		
		                '$rootScope',
						'$scope',
						'$stateParams',
						function($rootScope, $scope, $stateParams) 
						{
							$scope.processInstanceId = $stateParams.processInstanceId;
							$scope.formKey = $stateParams.formKey;
							$scope.formId = $stateParams.formId;
							$scope.newDate = null;

							$scope.initProcessHistory = function() 
							{
								$scope.newDate = new Date();
							}

							/*
							 * $scope.initProcessHistory = function(){
							 * $scope.findProcessImage(); }
							 * 
							 * //查找流程图 $scope.findProcessImage = function(){
							 * if($scope.processInstanceId) {
							 * TaskService.traceProcess($scope.processInstanceId,$scope.imageClickResult,$scope.errorOperate); } }
							 * $scope.imageClickResult = function(datas) {
							 * angular.forEach(datas,function(data) {
							 * if(data.currentActiviti==true) {
							 * $scope.coordinateObj = data; } }); }
							 * 
							 * $scope.successOperate = function(data) {
							 * $rootScope.app.notify("操作成功"); }
							 * $scope.errorOperate = function(data) {
							 * $rootScope.app.notify("操作失败"); };
							 */

						} ]);