angular	.module('departmentModule', [])
		.controller("departmentFormController",
			[
				"$rootScope",
				"$scope",
				"DepartmentService",
				"$state",
				"angularPermission",
				"$stateParams",
				"ngDialog",
				"asynchroMarkService",
				function($rootScope, $scope, DepartmentService,
						$state,
						angularPermission, $stateParams, ngDialog,
						asynchroMarkService) {
					$scope.showSaveAndAddButton = $stateParams.operate == 'add' ? true : false;
					$scope.operate = $stateParams.operate;
					$scope.id = $stateParams.id;
					$scope.testmodel = "";
					$scope.department = new Object();
					// $scope.department.creatTime = new Date();
					$scope.test = function() {
						$rootScope.getController('departmentFormorganization','dreference').changeNotMultiSelectDisplay({"name" : "重庆大学"});
					}

					$scope.getInitDepartmentData = function() {
						if ($stateParams.operate == 'edit') {
							$scope.getDepartmentDetail();
							$scope.selectedOrg = angularPermission.getSelectedOrg();
						}
					}
					// $scope.department.test = new Date();
					$scope.getDepartmentDetail = function() {
					/*	$scope.propertiesValueLoad = true;*/
						$rootScope.app.asynchroMask.mask("加载中。。。。。");
						DepartmentService.findDepartmentById($scope.id,sucessCB, errorCB);
						function sucessCB(data) {
							$rootScope.app.asynchroMask.unmask();
							// 在成功获取了一个实体之后调用查找该实体的附加字段以及附加字段的值的方法
							$scope.department = data;
						};

						function errorCB(error) {
							$rootScope.app.asynchroMask.unmask();
							$rootScope.openErrorDialog(error);
						};
					};

					$scope.saveDepartment = function(department) {
						if ($scope.operate == 'add') {
							$scope.addDepartment(department, true);
						} else if ($scope.operate == 'edit') {
							$scope.updateDepartment(department);
						}
					}
					$scope.saveAndAddDepartment = function(department) {
						$scope.addDepartment(department,false);
					}
					$scope.addDepartment = function(department,needColseTab) {
						// 在保存基础信息的时候使用附加字段的值
						DepartmentService.saveDepartment({department : department}, sucessCB, errorCB);
						function sucessCB(data) {
							if (needColseTab) {
								refreshGrid();
								$scope.back();	
							}
							else{
								// 保存并新增
								$scope.department={};
							}			
						}
						function errorCB(error) {
							$rootScope.openErrorDialog(error);
						}
					}
					$scope.cancelOperate = function() {
						$scope.closeOperateTab();
					}
					$scope.updateDepartment = function(department) {
						DepartmentService.updateDepartment({department : department}, sucessCB, errorCB);
						function sucessCB(data) {
							refreshGrid();
							$scope.back();							
						}
						function errorCB(error) {
							$rootScope.openErrorDialog(error);
						}
					};

//					$scope.refreshGrid = function() {
//						var controller = $rootScope.getController('departmentListGrid', 'ddatagrid');
//						if (controller) {
//							controller.refreshCurrent();
//						}
//					}
					function refreshGrid(){
						$scope.refreshGrid("departmentListGrid");
					}
					$scope.back = function() {
						$scope.turnToTab(true,"departmentList","main.list.department.departmentList")
					}
					}]);