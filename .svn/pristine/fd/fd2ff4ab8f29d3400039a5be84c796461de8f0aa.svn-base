		.state('main.list.reportTest',angularAMD.route({
			url : '/reportTest',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/reportForm/js/reportTest/ReportTestService.js']
				})
			}
		}))
		.state('main.list.reportTest.reportTestListRoute',angularAMD.route({
			url : '/reportTestListRoute',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/reportForm/js/reportTest/ReportTestList.js']
				})
			},
			onEnter: function($rootScope){
				var model  ={
					eId:'reportTestList',
					name:'报表（测试）管理',
					route:'main.list.reportTest.reportTestList'
				}
				$rootScope.selectModule(model);
			}
		}))
		.state('main.list.reportTest.reportTestList',angularAMD.route({
             url : '/reportTestList',
			 views : {
                 'reportTestList@main.list' : angularAMD.route({
                     templateUrl : 'simple/view/reportForm/html/reportTest/ReportTestList.html'
                 })
             }
		}))
		.state('main.list.reportTest.reportTestFormAddRoute',angularAMD.route({
			url : '/reportTestFormAddRoute/:operate',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/reportForm/js/reportTest/ReportTestForm.js']
				})
			},
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'reportTestAddForm',
					name:'新增报表（测试）',
					route:'main.list.reportTest.reportTestAddForm'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		.state('main.list.reportTest.reportTestAddForm',angularAMD.route({
             url : '/reportTestAddForm/:operate',
             views : {
                'reportTestAddForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/reportForm/html/reportTest/ReportTestForm.html'
                })
             }
		}))
        .state('main.list.reportTest.reportTestFormEditRoute',angularAMD.route({
            url : '/reportTestFormEditRoute/:operate/:id',
            views : {
                '@main' : angularAMD.route({
                    controllerUrl : ['simple/view/reportForm/js/reportTest/ReportTestForm.js']
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'reportTestEditForm',
                    name:'编辑报表（测试）',
                    route:'main.list.reportTest.reportTestEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
        .state('main.list.reportTest.reportTestEditForm',angularAMD.route({
            url : '/reportTestEditForm/:operate/:id',
            views : {
                'reportTestEditForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/reportForm/html/reportTest/ReportTestForm.html'
                })
            }
        }))
		.state('main.list.reportTest.reportTestDisplayRoute',angularAMD.route({
			url : '/reportTestDisplayRoute/:id',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/reportForm/js/reportTest/ReportTestDisplay.js']
				})
			},
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'reportTestDisplay',
					name:'查看报表（测试）',
					route:'main.list.reportTest.reportTestDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		.state('main.list.reportTest.reportTestDisplay',angularAMD.route({
			url : '/reportTestDisplay/:id',
            views : {
                'reportTestDisplay@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/reportForm/html/reportTest/ReportTestDisplay.html'
                })
            }
		}))