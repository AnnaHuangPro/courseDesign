define([
	'codemirror/mode/velocity/velocity',
	'codemirror/mode/sql/sql',
], function () {
	return angular.module('dataSourceModule', ['ngDialog', 'ui', 'ui.codemirror'])
		.controller(
		'dataSourceFormController',
		[
			'$rootScope',
			'ngDialog',
			'$scope',
			'$state',
			'$stateParams',
			'DataSourceService',
			'angularPermission',
			'dialogs',
			function ($rootScope, ngDialog, $scope, $state,
				$stateParams, DataSourceService,
				angularPermission, dialogs) {


				$scope.showSaveAndAddButton = $stateParams.operate == "add" ? true
					: false;
				$scope.editorOptions = {
					Mime: 'text/x-mssql',
					lineWrapping: true,
					lineNumbers: true
				};
				$scope.getInitDataSourceData = function () {
					if ($stateParams.operate == 'edit') {
						$scope.getDataSourceDetail();
					} else {
						//
					}
				}
				$scope.back = function(){
					$scope.turnToTab(true,"dataSourceList","main.list.dataSource.dataSourceList");
				}
				$scope.getDataSourceDetail = function () {
					$rootScope.app.asynchroMask.mask("加载中。。。。。");
					DataSourceService.findDataSourceById(
						$stateParams.id, sucessCB, errorCB);

					function sucessCB(data) {
						$rootScope.app.asynchroMask.unmask();

						$scope.dataSource = data;
						$scope.dataSource.reportSql = data.reportSql
							.replace(/#t%/g, "\t");
					}
					function errorCB(error) {
						$rootScope.app.asynchroMask.unmask();
						$rootScope.openErrorDialog(error);
					}
				};

				$scope.saveDataSourceEdit = function (dataSource) {
					if ('add' == $stateParams.operate) {
						$scope.saveDataSource(dataSource, true);
					} else if ('edit' == $stateParams.operate) {
						$scope.updateDataSource(dataSource)
					}
				};

				$scope.saveAndAddDataSourceEdit = function (
					dataSource) {
					$scope.saveDataSource(dataSource, false);
				}

				$scope.saveDataSource = function (dataSource,
					needColseTab) {

					DataSourceService.saveDataSource(dataSource, sucessCB, errorCB);
					
					function sucessCB(data) {
						$scope.refreshGrid("dataSourceListGrid");
						if (needColseTab) {
							$scope.back()
						} else
							$scope.dataSource = null;
					}
					function errorCB(error) {
						dialogs.error("添加失败!");
					}
				}
				$scope.updateDataSource = function () {
					function sucessCB(data) {
						$scope.back()
						$scope.refreshGrid("dataSourceListGrid");
					}
					function errorCB(error) {
						dialogs.error("修改失败!");
					}
					DataSourceService.updateDataSource($scope.dataSource, sucessCB, errorCB);
				}

				$scope.genSQLs = function () {

					DataSourceService.saveDataSource(dataSource, sucessCB, errorCB);

					function sucessCB(data) {

						if (needColseTab) {
							$scope.back()
						} else
							$scope.dataSource = null;
						$scope.refreshGrid("dataSourceListGrid");
					}
					function errorCB(error) {
						dialogs.error("添加失败!");
					}
				}
				$scope.codemirrorOpt = {
					mode: "text/x-mariadb",
					theme: 'eclipse'
				}
			}]);

})