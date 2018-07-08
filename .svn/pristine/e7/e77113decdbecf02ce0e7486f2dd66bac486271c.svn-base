		.state('main.list.dynamicForm',angularAMD.route({
			url : '/dynamicForm',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormService.js']
				})
			}
		}))
		.state('main.list.dynamicForm.dynamicFormList',angularAMD.route({
             url : '/dynamicFormList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'dynamicFormList',
 					name:'动态表单管理',
 					route:'main.list.dynamicForm.dynamicFormList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'dynamicFormList@main.list' : angularAMD.route({
                	 controller:'dynamicFormListController',
 					 controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormList.js'],
                     templateUrl : 'simple/view/dynamicForm/html/dynamicForm/DynamicFormList.html'
                 })
             }
		}))
		.state('main.list.dynamicForm.dynamicFormAddForm',angularAMD.route({
             url : '/dynamicFormAddForm/:operate',
             views : {
                'dynamicFormAddForm@main.list' : angularAMD.route({
                	controller:'dynamicFormFormController',
 					controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormForm.js'],
                    templateUrl : 'simple/view/dynamicForm/html/dynamicForm/DynamicFormForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'dynamicFormAddForm',
 					name:'新增动态表单',
 					route:'main.list.dynamicForm.dynamicFormAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.dynamicForm.dynamicFormEditForm',angularAMD.route({
            url : '/dynamicFormEditForm/:operate/:id',
            views : {
                'dynamicFormEditForm@main.list' : angularAMD.route({
                	controller:'dynamicFormFormController',
                    controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormForm.js'],
                    templateUrl : 'simple/view/dynamicForm/html/dynamicForm/DynamicFormForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'dynamicFormEditForm',
                    name:'编辑动态表单',
                    route:'main.list.dynamicForm.dynamicFormEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.dynamicForm.dynamicFormDisplay',angularAMD.route({
			url : '/dynamicFormDisplay/:id',
            views : {
                'dynamicFormDisplay@main.list' : angularAMD.route({
                	controller:'dynamicFormDisplayController',
					controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormDisplay.js'],
                    templateUrl : 'simple/view/dynamicForm/html/dynamicForm/DynamicFormDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'dynamicFormDisplay',
					name:'查看动态表单',
					route:'main.list.dynamicForm.dynamicFormDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))