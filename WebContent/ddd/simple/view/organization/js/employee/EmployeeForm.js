angular.module('employeeModule', [])
	.controller("employeeFormController",["$rootScope","$scope","EmployeeService",
		                                      "$state","angularPermission","$stateParams",
		                                      "ngDialog","asynchroMarkService",
						function($rootScope, $scope, EmployeeService, $state,
								angularPermission, $stateParams, ngDialog,asynchroMarkService) {
			
							$scope.showSaveAndAddButton = $stateParams.operate == 'add' ? true: false;
							$scope.operate = $stateParams.operate;
							$scope.id = $stateParams.id;
							$scope.testmodel = "";
							$scope.employee = new Object();
							// $scope.employee.creatTime = new Date();
							$scope.getInitEmployeeData = function() {
								if ($stateParams.operate == 'edit') {
									$scope.getEmployeeDetail();
								}
							}
							// $scope.employee.test = new Date();
							$scope.getEmployeeDetail = function() {
								$scope.propertiesValueLoad = true;
								asynchroMarkService.mask("加载中。。。。。");
								EmployeeService.findEmployeeById($scope.id,sucesscb, errorcb);
								function sucesscb(data) {
									asynchroMarkService.unmask();
									// 在成功获取了一个实体之后调用查找该实体的附加字段以及附加字段的值的方法
									$scope.employee = data;
								};
								function errorcb(error) {
									$rootScope.openErrorDialog(error);
								};
							};
							$scope.saveEmployee = function(employee) {
								if ($scope.operate == 'add') {
									$scope.addEmployee(employee, true);
								} else if ($scope.operate == 'edit') {
									$scope.updateEmployee(employee);
								}
							}

							$scope.saveAndAddEmployee = function(employee) {
								$scope.addEmployee(employee, false);
							}
							$scope.addEmployee = function(employee,needColseTab) {
								// 在保存基础信息的时候使用附加字段的值
								EmployeeService.saveEmployee(employee, sucesscb, errorcb);
								function sucesscb(data) {
									if (needColseTab) {
										refreshGrid();
										$scope.back();	
									} else
										$scope.employee = null;
								}
								function errorcb(error) {
									$rootScope.openErrorDialog(error);
								}
							}
							$scope.updateEmployee = function(employee) {

								EmployeeService.updateEmployee(employee, sucesscb, errorcb);
								function sucesscb(data) {
									refreshGrid();
									$scope.back();	
								}
								function errorcb(error) {
									$rootScope.openErrorDialog(error);
								}
							};

//							$scope.refreshGrid = function() {
//								var controller = $rootScope.getController('employeeListGrid', 'ddatagrid');
//								if (controller) {
//									controller.refreshCurrent();
//								}
//							}
//							$scope.cancelOperate = function(){
//								$rootScope.closeOperateTab();
//								$scope.refreshGrid();
//								$state.go('main.list.employee.employeeList'); 
//							}
							function refreshGrid(){
								$scope.refreshGrid("employeeListGrid");
							}
							$scope.back = function() {
								$scope.turnToTab(true,"employeeList","main.list.employee.employeeList")
							}
						} ]);
