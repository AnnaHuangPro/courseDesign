		.state('main.list.systemConfig',angularAMD.route({
			url : '/systemConfig',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigService.js']
				})
			}
		}))
		.state('main.list.systemConfig.systemConfigList',angularAMD.route({
             url : '/systemConfigList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'systemConfigList',
 					name:'系统参数管理',
 					route:'main.list.systemConfig.systemConfigList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'systemConfigList@main.list' : angularAMD.route({
                	 controller:'systemConfigListController',
 					 controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigList.js'],
                     templateUrl : 'simple/view/systemConfig/html/systemConfig/SystemConfigList.html'
                 })
             }
		}))
		.state('main.list.systemConfig.systemConfigAddForm',angularAMD.route({
             url : '/systemConfigAddForm/:operate',
             views : {
                'systemConfigAddForm@main.list' : angularAMD.route({
                	controller:'systemConfigFormController',
 					controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigForm.js'],
                    templateUrl : 'simple/view/systemConfig/html/systemConfig/SystemConfigForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'systemConfigAddForm',
 					name:'新增系统参数',
 					route:'main.list.systemConfig.systemConfigAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.systemConfig.systemConfigEditForm',angularAMD.route({
            url : '/systemConfigEditForm/:operate/:id',
            views : {
                'systemConfigEditForm@main.list' : angularAMD.route({
                	controller:'systemConfigFormController',
                    controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigForm.js'],
                    templateUrl : 'simple/view/systemConfig/html/systemConfig/SystemConfigForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'systemConfigEditForm',
                    name:'编辑系统参数',
                    route:'main.list.systemConfig.systemConfigEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.systemConfig.systemConfigDisplay',angularAMD.route({
			url : '/systemConfigDisplay/:id',
            views : {
                'systemConfigDisplay@main.list' : angularAMD.route({
                	controller:'systemConfigDisplayController',
					controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigDisplay.js'],
                    templateUrl : 'simple/view/systemConfig/html/systemConfig/SystemConfigDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'systemConfigDisplay',
					name:'查看系统参数',
					route:'main.list.systemConfig.systemConfigDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))