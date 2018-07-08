		.state('main.list.module',angularAMD.route({
			url : '/module',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/permission/js/module/ModuleService.js']
				})
			}
		}))
		.state('main.list.module.moduleList',angularAMD.route({
             url : '/moduleList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'moduleList',
 					name:'模块管理',
 					route:'main.list.module.moduleList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'moduleList@main.list' : angularAMD.route({
                	 controller:'moduleListController',
 					 controllerUrl : ['simple/view/permission/js/module/ModuleList.js'],
                     templateUrl : 'simple/view/permission/html/module/ModuleList.html'
                 })
             }
		}))
		.state('main.list.module.moduleAddForm',angularAMD.route({
             url : '/moduleAddForm/:operate',
             views : {
                'moduleAddForm@main.list' : angularAMD.route({
                	controller:'moduleFormController',
 					controllerUrl : ['simple/view/permission/js/module/ModuleForm.js'],
                    templateUrl : 'simple/view/permission/html/module/ModuleForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'moduleAddForm',
 					name:'新增模块',
 					route:'main.list.module.moduleAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.module.moduleEditForm',angularAMD.route({
            url : '/moduleEditForm/:operate/:id',
            views : {
                'moduleEditForm@main.list' : angularAMD.route({
                	controller:'moduleFormController',
                    controllerUrl : ['simple/view/permission/js/module/ModuleForm.js'],
                    templateUrl : 'simple/view/permission/html/module/ModuleForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'moduleEditForm',
                    name:'编辑模块',
                    route:'main.list.module.moduleEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.module.moduleDisplay',angularAMD.route({
			url : '/moduleDisplay/:id',
            views : {
                'moduleDisplay@main.list' : angularAMD.route({
                	controller:'moduleDisplayController',
					controllerUrl : ['simple/view/permission/js/module/ModuleDisplay.js'],
                    templateUrl : 'simple/view/permission/html/module/ModuleDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'moduleDisplay',
					name:'查看模块',
					route:'main.list.module.moduleDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))