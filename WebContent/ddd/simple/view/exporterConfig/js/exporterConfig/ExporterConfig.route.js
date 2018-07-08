		.state('main.list.exporterConfig',angularAMD.route({
			url : '/exporterConfig',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigService.js']
				})
			}
		}))
		.state('main.list.exporterConfig.exporterConfigList',angularAMD.route({
             url : '/exporterConfigList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'exporterConfigList',
 					name:'数据导入导出配置管理',
 					route:'main.list.exporterConfig.exporterConfigList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'exporterConfigList@main.list' : angularAMD.route({
                	 controller:'exporterConfigListController',
 					 controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigList.js'],
                     templateUrl : 'simple/view/exporterConfig/html/exporterConfig/ExporterConfigList.html'
                 })
             }
		}))
		.state('main.list.exporterConfig.exporterConfigAddForm',angularAMD.route({
             url : '/exporterConfigAddForm/:operate',
             views : {
                'exporterConfigAddForm@main.list' : angularAMD.route({
                	controller:'exporterConfigFormController',
 					controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigForm.js'],
                    templateUrl : 'simple/view/exporterConfig/html/exporterConfig/ExporterConfigForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'exporterConfigAddForm',
 					name:'新增数据导入导出配置',
 					route:'main.list.exporterConfig.exporterConfigAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.exporterConfig.exporterConfigEditForm',angularAMD.route({
            url : '/exporterConfigEditForm/:operate/:id',
            views : {
                'exporterConfigEditForm@main.list' : angularAMD.route({
                	controller:'exporterConfigFormController',
                    controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigForm.js'],
                    templateUrl : 'simple/view/exporterConfig/html/exporterConfig/ExporterConfigForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'exporterConfigEditForm',
                    name:'编辑数据导入导出配置',
                    route:'main.list.exporterConfig.exporterConfigEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.exporterConfig.exporterConfigDisplay',angularAMD.route({
			url : '/exporterConfigDisplay/:id',
            views : {
                'exporterConfigDisplay@main.list' : angularAMD.route({
                	controller:'exporterConfigDisplayController',
					controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigDisplay.js'],
                    templateUrl : 'simple/view/exporterConfig/html/exporterConfig/ExporterConfigDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'exporterConfigDisplay',
					name:'查看数据导入导出配置',
					route:'main.list.exporterConfig.exporterConfigDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))