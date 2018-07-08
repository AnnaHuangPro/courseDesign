		.state('main.list.entityProperty',angularAMD.route({
			url : '/entityProperty',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyService.js']
				})
			}
		}))
		.state('main.list.entityProperty.entityPropertyList',angularAMD.route({
             url : '/entityPropertyList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'entityPropertyList',
 					name:'实体属性管理',
 					route:'main.list.entityProperty.entityPropertyList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'entityPropertyList@main.list' : angularAMD.route({
                	 controller:'entityPropertyListController',
 					 controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyList.js'],
                     templateUrl : 'simple/view/organization/html/entityProperty/EntityPropertyList.html'
                 })
             }
		}))
		.state('main.list.entityProperty.entityPropertyAddForm',angularAMD.route({
             url : '/entityPropertyAddForm/:operate',
             views : {
                'entityPropertyAddForm@main.list' : angularAMD.route({
                	controller:'entityPropertyFormController',
 					controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyForm.js'],
                    templateUrl : 'simple/view/organization/html/entityProperty/EntityPropertyForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'entityPropertyAddForm',
 					name:'新增实体属性',
 					route:'main.list.entityProperty.entityPropertyAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.entityProperty.entityPropertyEditForm',angularAMD.route({
            url : '/entityPropertyEditForm/:operate/:id',
            views : {
                'entityPropertyEditForm@main.list' : angularAMD.route({
                	controller:'entityPropertyFormController',
                    controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyForm.js'],
                    templateUrl : 'simple/view/organization/html/entityProperty/EntityPropertyForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'entityPropertyEditForm',
                    name:'编辑实体属性',
                    route:'main.list.entityProperty.entityPropertyEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.entityProperty.entityPropertyDisplay',angularAMD.route({
			url : '/entityPropertyDisplay/:id',
            views : {
                'entityPropertyDisplay@main.list' : angularAMD.route({
                	controller:'entityPropertyDisplayController',
					controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyDisplay.js'],
                    templateUrl : 'simple/view/organization/html/entityProperty/EntityPropertyDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'entityPropertyDisplay',
					name:'查看实体属性',
					route:'main.list.entityProperty.entityPropertyDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))