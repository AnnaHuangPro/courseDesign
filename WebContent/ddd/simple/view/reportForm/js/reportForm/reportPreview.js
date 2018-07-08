
angular.module('reportFormModel', []).controller(
		'reportFormModelController',
		[
				'ReportFormService',
				'ReportService',
				'$rootScope',
				'$scope',
				'$state',
				'$stateParams','angularPermission','$timeout','dialogs', '$q',
				function(ReportFormService,ReportService, $rootScope, $scope,
						$state, $stateParams,angularPermission,$timeout,dialogs, $q) {
					$scope.withChart = parseInt($stateParams.withChart + '');
					$scope.dynamicForm = $stateParams.dynamicForm;
					var dynamicKey = $stateParams.dynamicKey;
					$scope.modelFileKey = $stateParams.modelFileKey;
					$scope.html = "";
					$scope.params = {};
					var initFilterVar = true;
					$scope.exportExcel = function(){
						var modelFileKey = $stateParams.modelFileKey;
						$scope.paramsAdd({"yz":"已租","nz":"拟租","yl":"预留","kz":"空置","zd":"整栋","ld":"楼栋","lc":"楼层","ch":"策划","gztc":"跟踪投产","qy":"签约","tcyy":"投产运营","gzcq":"跟踪洽谈","dzsw":"电子商务","hlwjr":"互联网金融","xxss":"信息搜索","ydyx":"移动游戏","kgtc":"开工投产"});
						//传入参数expName_用于报表的命名
						$scope.params.expName_ = modelFileKey+""+$scope.getDate();
						ReportService.generateExcel($scope.params,modelFileKey);
					}
					
					$scope.show = function(){
						return sessionStorage.getItem("operatorCode") =="admin";
					}
					
					$scope.excel2HtmlWithChart = function(){
						var modelFileKey = $stateParams.modelFileKey;
						$scope.paramsAdd({"count":"4","qt":"其他","ch":"策划","gztc":"跟踪投产","qy":"签约","tcyy":"投产运营","gzcq":"跟踪洽谈","dzsw":"电子商务","hlwjr":"互联网金融","xxss":"信息搜索","ydyx":"移动游戏","kgtc":"开工投产"});
						ReportService.excel2HtmlWithChart($scope.params,modelFileKey).promise().then(function(data){
							$scope.res = data;
							$scope.$apply(function(){
								 
							});
						});
					}
					
					$scope.modelFileKeys = ["高新区项目签约情况汇总表", "引进项目产业分类报表", "引进项目个数情况报表", "引进项目金额构成情况报表", 
										"引进大数据产业情况报表", "在谈项目个数报表", "在谈项目产业分类报表", "在谈项目分组统计报表"]
					
					$scope.search = function(){
						if($scope.withChart > 1) {
							$scope.getReportFormQueryData()
						}
						if(initFilterVar) {
							$scope.getFilterTemplate()
						}
						
						if($scope.withChart > 2) 
							return;
						$scope.paramsAdd({"count":"4","qt":"其他","yz":"已租","nz":"拟租","yl":"预留","kz":"空置","zd":"整栋","ld":"楼栋","lc":"楼层","ch":"策划","gztc":"跟踪投产","qy":"签约","tcyy":"投产运营","gzcq":"跟踪洽谈","dzsw":"电子商务","hlwjr":"互联网金融","xxss":"信息搜索","ydyx":"移动游戏","kgtc":"开工投产"});
						var modelFileKey = $stateParams.modelFileKey;
						if(modelFileKey && modelFileKeys.indexOf(modelKey) >= 0)
						{
							if($scope.searchConditionObj)
							{
								if($scope.isInputTimeOk())//判断输入的查询条件是否合格
								{
									$scope.params.searchCondition = $scope.searchConditionObj.value;
									$scope.params.searchCondition2 = parseInt($scope.searchConditionObj.value)+1;
								}
								else
								{
									dialogs.notify("提示","查询条件错误,请输入正确的年份！",{size:'sm'});
								}
							}
						}
						
						$rootScope.app.asynchroMask.mask("加载中.....");
						ReportService.generateHtml($scope.params,modelFileKey).promise().then(function(data){
							$scope.res = data;
							$scope.$apply(function(){
							});
							$rootScope.app.asynchroMask.unmask();
							var cols = document.querySelectorAll("div[compile='res'] col");
							var trs  = document.querySelectorAll("div[compile='res'] tr");
							if(cols.length > 0) {
								var tds  = trs[trs.length - 2].children;
								var length = tds.length;
								for(var i = 0; i < length; i++) {
									/*tds[i].setAttribute('width', parseInt(cols[i].getAttribute('width')));*/
									/*tds[i].setAttribute('style', "width:" + cols[i].getAttribute('width') + "px;");*/
									
									var textNode = tds[i].childNodes[0];
									var div = document.createElement("div");
									div.style.width = parseInt(cols[i].getAttribute('width')) + "px"; 
									
									textNode && div.appendChild(textNode);
									tds[i].appendChild(div);
								}
							}
							
							$scope.$apply(function(){
							});
						});
					}
					
					//获取高级检索模板
					$scope.getFilterTemplate = function() {
						ReportService.getFilterTemplate($scope.modelFileKey).promise().then(function(data){
							if(data) {
								var style = "<style>\n" + data.css +  "</style>\n";
								$scope.filterTemplate = style + data.html;
								eval(data.js);
								$scope.$apply(function(){
									 
								});
							}
						});
					}
					
					//获取图表模板
					$scope.getChartTemplate = function() {
						ReportService.getChartTemplate($scope.modelFileKey).promise().then(function(data){
							if(data) {
								var style = "<style>\n" + data.css +  "</style>\n";
								$scope.chartTemplate = style + data.html;
								$scope.$apply(function(){});
								eval(data.js)
								$scope.$apply(function(){});
							}
						});
					}
					
					//获取报表对应的数据
					$scope.getReportFormQueryData = function() {
						ReportFormService.getReportFormQueryData($scope.modelFileKey, $scope.params, function(data) {
							$scope.queryReportData = data
							if(initFilterVar) {
								$scope.getChartTemplate()
								initFilterVar = false
							}
						},function(error) {
							console.log(error)
						})
					}
					
					$scope.paramsAdd = function(params)
					{
						for(var param in params){
							$scope.params[param]=params[param];
						}
					}
					
					$timeout(function(){ 
						if($stateParams.modelFileKey){
							$scope.search();
						}
					},100);
					
					//报表高度自适应，适应不同分辨率屏幕
					(function() {
						var screenHeight = window.screen.height
						var height = document.body.offsetHeight
						$scope.resHeight = screenHeight >= 1080 ? (0.805 * height) : (0.72 * height)
						
						//添加浏览器窗口高度变化
						window.onresize = function() {
							var screenHeight = window.screen.height
							var height = document.body.offsetHeight
							$scope.resHeight = screenHeight >= 1080 ? (0.805 * height) : (0.72 * height)
							$scope.$apply(function() {
								
							})
						}
					})()
					
					$scope.priviewInit = function() {}
					
					//获取当前时间（格式为 yyyy-mm-dd ）
					$scope.getDate = function() {
						var date = new Date();
						var year = date.getFullYear();
						var month = date.getMonth() + 1;
						var day = date.getDate();

						if (month >= 1 && month <= 9) {
							month = "0" + month;
						}
						if (day >= 0 && day <= 9) {
							day = "0" + day;
						}

						return year + "" + month + "" + day;
					}
					
					//判断查询输入的时间格式是否合格
					$scope.isInputTimeOk = function() {
						var isNumber = false;
						var isTimeLengthOk = false;
						if($scope.searchConditionObj)
						{
							var time = $scope.searchConditionObj.value;
							var r = /^[0-9]+.?[0-9]*$/;　　//正整数 
						    isNumber = r.test(time);
						    
						    isTimeLengthOk = String(time).length == 4?true:false;
						}
						
						if(isNumber&&isTimeLengthOk)
							return true;
						return false;
					}
					
				} ]);