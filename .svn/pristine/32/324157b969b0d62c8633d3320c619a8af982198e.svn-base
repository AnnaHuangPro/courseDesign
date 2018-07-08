		.state('main.list.importConfigs',angularAMD.route({
			url : '/importConfigs',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsService.js']
				})
			}
		}))
		.state('main.list.importConfigs.importConfigsList',angularAMD.route({
             url : '/importConfigsList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'importConfigsList',
 					name:'导入配置管理',
 					route:'main.list.importConfigs.importConfigsList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'importConfigsList@main.list' : angularAMD.route({
                	 controller:'importConfigsListController',
 					 controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsList.js'],
                     templateUrl : 'simple/view/importConfigs/html/importConfigs/ImportConfigsList.html'
                 })
             }
		}))
		.state('main.list.importConfigs.importConfigsAddForm',angularAMD.route({
             url : '/importConfigsAddForm/:operate',
             views : {
                'importConfigsAddForm@main.list' : angularAMD.route({
                	controller:'importConfigsFormController',
 					controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsForm.js'],
                    templateUrl : 'simple/view/importConfigs/html/importConfigs/ImportConfigsForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'importConfigsAddForm',
 					name:'新增导入配置',
 					route:'main.list.importConfigs.importConfigsAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.importConfigs.importConfigsEditForm',angularAMD.route({
            url : '/importConfigsEditForm/:operate/:id',
            views : {
                'importConfigsEditForm@main.list' : angularAMD.route({
                	controller:'importConfigsFormController',
                    controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsForm.js'],
                    templateUrl : 'simple/view/importConfigs/html/importConfigs/ImportConfigsForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'importConfigsEditForm',
                    name:'编辑导入配置',
                    route:'main.list.importConfigs.importConfigsEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.importConfigs.importConfigsDisplay',angularAMD.route({
			url : '/importConfigsDisplay/:id',
            views : {
                'importConfigsDisplay@main.list' : angularAMD.route({
                	controller:'importConfigsDisplayController',
					controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsDisplay.js'],
                    templateUrl : 'simple/view/importConfigs/html/importConfigs/ImportConfigsDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'importConfigsDisplay',
					name:'查看导入配置',
					route:'main.list.importConfigs.importConfigsDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))