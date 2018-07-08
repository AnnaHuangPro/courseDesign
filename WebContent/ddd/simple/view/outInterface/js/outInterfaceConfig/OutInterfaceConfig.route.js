		.state('main.list.outInterfaceConfig',angularAMD.route({
			url : '/outInterfaceConfig',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigService.js']
				})
			}
		}))
		.state('main.list.outInterfaceConfig.outInterfaceConfigList',angularAMD.route({
             url : '/outInterfaceConfigList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'outInterfaceConfigList',
 					name:'外部接口配置管理',
 					route:'main.list.outInterfaceConfig.outInterfaceConfigList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'outInterfaceConfigList@main.list' : angularAMD.route({
                	 controller:'outInterfaceConfigListController',
 					 controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigList.js'],
                     templateUrl : 'simple/view/outInterface/html/outInterfaceConfig/OutInterfaceConfigList.html'
                 })
             }
		}))
		.state('main.list.outInterfaceConfig.outInterfaceConfigAddForm',angularAMD.route({
             url : '/outInterfaceConfigAddForm/:operate',
             views : {
                'outInterfaceConfigAddForm@main.list' : angularAMD.route({
                	controller:'outInterfaceConfigFormController',
 					controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigForm.js'],
                    templateUrl : 'simple/view/outInterface/html/outInterfaceConfig/OutInterfaceConfigForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'outInterfaceConfigAddForm',
 					name:'新增外部接口配置',
 					route:'main.list.outInterfaceConfig.outInterfaceConfigAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.outInterfaceConfig.outInterfaceConfigEditForm',angularAMD.route({
            url : '/outInterfaceConfigEditForm/:operate/:id',
            views : {
                'outInterfaceConfigEditForm@main.list' : angularAMD.route({
                	controller:'outInterfaceConfigFormController',
                    controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigForm.js'],
                    templateUrl : 'simple/view/outInterface/html/outInterfaceConfig/OutInterfaceConfigForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'outInterfaceConfigEditForm',
                    name:'编辑外部接口配置',
                    route:'main.list.outInterfaceConfig.outInterfaceConfigEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.outInterfaceConfig.outInterfaceConfigDisplay',angularAMD.route({
			url : '/outInterfaceConfigDisplay/:id',
            views : {
                'outInterfaceConfigDisplay@main.list' : angularAMD.route({
                	controller:'outInterfaceConfigDisplayController',
					controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigDisplay.js'],
                    templateUrl : 'simple/view/outInterface/html/outInterfaceConfig/OutInterfaceConfigDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'outInterfaceConfigDisplay',
					name:'查看外部接口配置',
					route:'main.list.outInterfaceConfig.outInterfaceConfigDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))