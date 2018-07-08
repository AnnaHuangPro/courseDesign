		.state('main.list.entityPropertyDefine',angularAMD.route({
			url : '/entityPropertyDefine',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineService.js']
				})
			}
		}))
		.state('main.list.entityPropertyDefine.entityPropertyDefineList',angularAMD.route({
             url : '/entityPropertyDefineList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'entityPropertyDefineList',
 					name:'实体属性定义管理',
 					route:'main.list.entityPropertyDefine.entityPropertyDefineList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'entityPropertyDefineList@main.list' : angularAMD.route({
                	 controller:'entityPropertyDefineListController',
 					 controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineList.js'],
                     templateUrl : 'simple/view/organization/html/entityPropertyDefine/EntityPropertyDefineList.html'
                 })
             }
		}))
		.state('main.list.entityPropertyDefine.entityPropertyDefineAddForm',angularAMD.route({
             url : '/entityPropertyDefineAddForm/:operate',
             views : {
                'entityPropertyDefineAddForm@main.list' : angularAMD.route({
                	controller:'entityPropertyDefineFormController',
 					controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineForm.js'],
                    templateUrl : 'simple/view/organization/html/entityPropertyDefine/EntityPropertyDefineForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'entityPropertyDefineAddForm',
 					name:'新增实体属性定义',
 					route:'main.list.entityPropertyDefine.entityPropertyDefineAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.entityPropertyDefine.entityPropertyDefineEditForm',angularAMD.route({
            url : '/entityPropertyDefineEditForm/:operate/:id',
            views : {
                'entityPropertyDefineEditForm@main.list' : angularAMD.route({
                	controller:'entityPropertyDefineFormController',
                    controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineForm.js'],
                    templateUrl : 'simple/view/organization/html/entityPropertyDefine/EntityPropertyDefineForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'entityPropertyDefineEditForm',
                    name:'编辑实体属性定义',
                    route:'main.list.entityPropertyDefine.entityPropertyDefineEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.entityPropertyDefine.entityPropertyDefineDisplay',angularAMD.route({
			url : '/entityPropertyDefineDisplay/:id',
            views : {
                'entityPropertyDefineDisplay@main.list' : angularAMD.route({
                	controller:'entityPropertyDefineDisplayController',
					controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineDisplay.js'],
                    templateUrl : 'simple/view/organization/html/entityPropertyDefine/EntityPropertyDefineDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'entityPropertyDefineDisplay',
					name:'查看实体属性定义',
					route:'main.list.entityPropertyDefine.entityPropertyDefineDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))