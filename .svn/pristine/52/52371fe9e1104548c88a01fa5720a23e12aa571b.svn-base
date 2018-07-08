		.state('main.list.log',angularAMD.route({
			url : '/log',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/log/js/log/LogService.js']
				})
			}
		}))
		.state('main.list.log.logList',angularAMD.route({
             url : '/logList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'logList',
 					name:'log管理',
 					route:'main.list.log.logList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'logList@main.list' : angularAMD.route({
                	 controller:'logListController',
 					 controllerUrl : ['simple/view/log/js/log/LogList.js'],
                     templateUrl : 'simple/view/log/html/log/LogList.html'
                 })
             }
		}))
		.state('main.list.log.logAddForm',angularAMD.route({
             url : '/logAddForm/:operate',
             views : {
                'logAddForm@main.list' : angularAMD.route({
                	controller:'logFormController',
 					controllerUrl : ['simple/view/log/js/log/LogForm.js'],
                    templateUrl : 'simple/view/log/html/log/LogForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'logAddForm',
 					name:'新增log',
 					route:'main.list.log.logAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.log.logEditForm',angularAMD.route({
            url : '/logEditForm/:operate/:id',
            views : {
                'logEditForm@main.list' : angularAMD.route({
                	controller:'logFormController',
                    controllerUrl : ['simple/view/log/js/log/LogForm.js'],
                    templateUrl : 'simple/view/log/html/log/LogForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'logEditForm',
                    name:'编辑log',
                    route:'main.list.log.logEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.log.logDisplay',angularAMD.route({
			url : '/logDisplay/:id',
            views : {
                'logDisplay@main.list' : angularAMD.route({
                	controller:'logDisplayController',
					controllerUrl : ['simple/view/log/js/log/LogDisplay.js'],
                    templateUrl : 'simple/view/log/html/log/LogDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'logDisplay',
					name:'查看log',
					route:'main.list.log.logDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))