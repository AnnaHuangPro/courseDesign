		.state('main.list.externalInterface',angularAMD.route({
			url : '/externalInterface',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceService.js']
				})
			}
		}))
		.state('main.list.externalInterface.externalInterfaceList',angularAMD.route({
             url : '/externalInterfaceList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'externalInterfaceList',
 					name:'外部接口管理',
 					route:'main.list.externalInterface.externalInterfaceList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'externalInterfaceList@main.list' : angularAMD.route({
                	 controller:'externalInterfaceListController',
 					 controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceList.js'],
                     templateUrl : 'simple/view/externalInterface/html/externalInterface/ExternalInterfaceList.html'
                 })
             }
		}))
		.state('main.list.externalInterface.externalInterfaceAddForm',angularAMD.route({
             url : '/externalInterfaceAddForm/:operate',
             views : {
                'externalInterfaceAddForm@main.list' : angularAMD.route({
                	controller:'externalInterfaceFormController',
 					controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceForm.js'],
                    templateUrl : 'simple/view/externalInterface/html/externalInterface/ExternalInterfaceForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'externalInterfaceAddForm',
 					name:'新增外部接口',
 					route:'main.list.externalInterface.externalInterfaceAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.externalInterface.externalInterfaceEditForm',angularAMD.route({
            url : '/externalInterfaceEditForm/:operate/:id',
            views : {
                'externalInterfaceEditForm@main.list' : angularAMD.route({
                	controller:'externalInterfaceFormController',
                    controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceForm.js'],
                    templateUrl : 'simple/view/externalInterface/html/externalInterface/ExternalInterfaceForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'externalInterfaceEditForm',
                    name:'编辑外部接口',
                    route:'main.list.externalInterface.externalInterfaceEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.externalInterface.externalInterfaceDisplay',angularAMD.route({
			url : '/externalInterfaceDisplay/:id',
            views : {
                'externalInterfaceDisplay@main.list' : angularAMD.route({
                	controller:'externalInterfaceDisplayController',
					controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceDisplay.js'],
                    templateUrl : 'simple/view/externalInterface/html/externalInterface/ExternalInterfaceDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'externalInterfaceDisplay',
					name:'查看外部接口',
					route:'main.list.externalInterface.externalInterfaceDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))