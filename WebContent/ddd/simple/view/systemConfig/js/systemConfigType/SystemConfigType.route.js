		.state('main.list.systemConfigType',angularAMD.route({
			url : '/systemConfigType',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/systemConfig/js/systemConfigType/SystemConfigTypeService.js']
				})
			}
		}))
		.state('main.list.systemConfigType.systemConfigTypeList',angularAMD.route({
             url : '/systemConfigTypeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'systemConfigTypeList',
 					name:'系统参数类型管理',
 					route:'main.list.systemConfigType.systemConfigTypeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'systemConfigTypeList@main.list' : angularAMD.route({
                	 controller:'systemConfigTypeListController',
 					 controllerUrl : ['simple/view/systemConfig/js/systemConfigType/SystemConfigTypeList.js'],
                     templateUrl : 'simple/view/systemConfig/html/systemConfigType/SystemConfigTypeList.html'
                 })
             }
		}))
		.state('main.list.systemConfigType.systemConfigTypeAddForm',angularAMD.route({
             url : '/systemConfigTypeAddForm/:operate',
             views : {
                'systemConfigTypeAddForm@main.list' : angularAMD.route({
                	controller:'systemConfigTypeFormController',
 					controllerUrl : ['simple/view/systemConfig/js/systemConfigType/SystemConfigTypeForm.js'],
                    templateUrl : 'simple/view/systemConfig/html/systemConfigType/SystemConfigTypeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'systemConfigTypeAddForm',
 					name:'新增系统参数类型',
 					route:'main.list.systemConfigType.systemConfigTypeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.systemConfigType.systemConfigTypeEditForm',angularAMD.route({
            url : '/systemConfigTypeEditForm/:operate/:id',
            views : {
                'systemConfigTypeEditForm@main.list' : angularAMD.route({
                	controller:'systemConfigTypeFormController',
                    controllerUrl : ['simple/view/systemConfig/js/systemConfigType/SystemConfigTypeForm.js'],
                    templateUrl : 'simple/view/systemConfig/html/systemConfigType/SystemConfigTypeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'systemConfigTypeEditForm',
                    name:'编辑系统参数类型',
                    route:'main.list.systemConfigType.systemConfigTypeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.systemConfigType.systemConfigTypeDisplay',angularAMD.route({
			url : '/systemConfigTypeDisplay/:id',
            views : {
                'systemConfigTypeDisplay@main.list' : angularAMD.route({
                	controller:'systemConfigTypeDisplayController',
					controllerUrl : ['simple/view/systemConfig/js/systemConfigType/SystemConfigTypeDisplay.js'],
                    templateUrl : 'simple/view/systemConfig/html/systemConfigType/SystemConfigTypeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'systemConfigTypeDisplay',
					name:'查看系统参数类型',
					route:'main.list.systemConfigType.systemConfigTypeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))