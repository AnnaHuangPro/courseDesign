		.state('main.list.swdj',angularAMD.route({
			url : '/swdj',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/ws/js/swdj/SwdjService.js']
				})
			}
		}))
		.state('main.list.swdj.swdjList',angularAMD.route({
             url : '/swdjList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'swdjList',
 					name:'失物登记管理',
 					route:'main.list.swdj.swdjList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'swdjList@main.list' : angularAMD.route({
                	 controller:'swdjListController',
 					 controllerUrl : ['simple/view/ws/js/swdj/SwdjList.js'],
                     templateUrl : 'simple/view/ws/html/swdj/SwdjList.html'
                 })
             }
		}))
		.state('main.list.swdj.swdjAddForm',angularAMD.route({
             url : '/swdjAddForm/:operate',
             views : {
                'swdjAddForm@main.list' : angularAMD.route({
                	controller:'swdjFormController',
 					controllerUrl : ['simple/view/ws/js/swdj/SwdjForm.js'],
                    templateUrl : 'simple/view/ws/html/swdj/SwdjForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'swdjAddForm',
 					name:'新增失物登记',
 					route:'main.list.swdj.swdjAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.swdj.swdjEditForm',angularAMD.route({
            url : '/swdjEditForm/:operate/:id',
            views : {
                'swdjEditForm@main.list' : angularAMD.route({
                	controller:'swdjFormController',
                    controllerUrl : ['simple/view/ws/js/swdj/SwdjForm.js'],
                    templateUrl : 'simple/view/ws/html/swdj/SwdjForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'swdjEditForm',
                    name:'编辑失物登记',
                    route:'main.list.swdj.swdjEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.swdj.swdjDisplay',angularAMD.route({
			url : '/swdjDisplay/:id',
            views : {
                'swdjDisplay@main.list' : angularAMD.route({
                	controller:'swdjDisplayController',
					controllerUrl : ['simple/view/ws/js/swdj/SwdjDisplay.js'],
                    templateUrl : 'simple/view/ws/html/swdj/SwdjDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'swdjDisplay',
					name:'查看失物登记',
					route:'main.list.swdj.swdjDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))