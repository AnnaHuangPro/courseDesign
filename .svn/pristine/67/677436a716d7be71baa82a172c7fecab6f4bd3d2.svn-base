angular
		.module('organizationModule', [])
		.controller(
				"organizationFormController",
				[
						"$rootScope",
						"$scope",
						"OrganizationService",
						"$state",
						"angularPermission",
						"$stateParams",
						"ngDialog",
						"asynchroMarkService",
						function($rootScope, $scope, OrganizationService,
								$state,
								angularPermission, $stateParams,ngDialog,asynchroMarkService) {
							$scope.showSaveAndAddButton = $stateParams.operate == 'add' ? true
									: false;
							$scope.operate = $stateParams.operate;
							$scope.id = $stateParams.id;
							$scope.testmodel = "";
							$scope.organization = new Object();
//							$scope.organization.creatTime = new Date();
							$scope.init = function() {
								if ($stateParams.operate == 'edit') {
									$scope.getOrganizationDetail();
									$scope.selectedOrg = JSON
											.parse(angularPermission.getSelectedOrg("selectedOrg"));
								}
								
								if($stateParams.operate == 'add') {
									
									//获取当前时间作为单位创建时间
									var date=new Date();
									var year=date.getFullYear();
									var mon=date.getMonth()+1; 
									var da=date.getDate(); 
									var day=date.getDay(); 
									var h=date.getHours(); 
									var m=date.getMinutes(); 
									var s=date.getSeconds(); 
									$scope.organization.creatTime = 
										year + "-" + mon + "-" + da + " " + h + ":" + m + ":" + s;
								}
							}
							$scope.getOrganizationDetail = function() {
								$scope.propertiesValueLoad = true;

								asynchroMarkService.mask("加载中。。。。。");
								
								OrganizationService.findOrganizationById($scope.id, sucessCB, errorCB);
										
								function sucessCB(data) {
									asynchroMarkService.unmask();
									// 在成功获取了一个实体之后调用查找该实体的附加字段以及附加字段的值的方法
									$scope.organization = data;
								}
								;

								function errorCB(error) {
									$rootScope.openErrorDialog(error);
								}
								;
							};

							$scope.saveOrganization = function() {
								if ($scope.operate == 'add') {
									$scope.addOrganization($scope.organization, true);
								} else if ($scope.operate == 'edit') {
									$scope.updateOrganization($scope.organization);
								}
							}

							$scope.saveAndAddOrganization = function() {
								$scope.addOrganization($scope.organization, false);
							}
							$scope.addOrganization = function(organization,
									needColseTab) {
								// 在保存基础信息的时候使用附加字段的值
								OrganizationService.saveOrganization({
									organization : organization
								}, sucessCB, errorCB);
								function sucessCB(data) {
									if (needColseTab) {
										refreshGrid();
										$scope.back();	
									} else
										$scope.organization = null;
								}
								function errorCB(error) {
									$rootScope.openErrorDialog(error);
								}
							}
							$scope.updateOrganization = function(organization) {

								OrganizationService.updateOrganization({
									organization : organization
								}, sucessCB, errorCB);
								function sucessCB(data) {
									refreshGrid();
									$scope.back();	
								}
								function errorCB(error) {
									$rootScope.openErrorDialog(error);
								}
							};
							
							$scope.submitApply=function(organization,needColseTab)
							{
								OrganizationService.submitApply(organization,$scope.operate,sucessCB,errorCB);
								function sucessCB(data)
								{
									dialogs.notify("提交成功!");
									if(needColseTab){
										refreshGrid();
										$scope.back();	
									}
									
									$scope.refreshGrid();
								}
								function errorCB(error)
								{
									dialogs.error("提交失败!");
								}
							}
							
//							$scope.cancelOperate = function(){
//									$rootScope.closeOperateTab();
//								}
//							
//							$scope.refreshGrid = function() {
//								var controller = $rootScope.getController(
//										'organizationListGrid', 'ddatagrid');
//								if (controller) {
//									controller.refreshCurrent();
//								}
//							}
							function refreshGrid(){
								$scope.refreshGrid("organizationListGrid");
							}
							$scope.back = function() {
								$scope.turnToTab(true,"organizationList","main.list.organization.organizationList")
							}
						} ]);