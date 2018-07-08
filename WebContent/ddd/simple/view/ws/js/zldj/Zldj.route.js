		.state('main.list.zldj',angularAMD.route({
			url : '/zldj',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/ws/js/zldj/ZldjService.js']
				})
			}
		}))
		.state('main.list.zldj.zldjList',angularAMD.route({
             url : '/zldjList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'zldjList',
 					name:'招领登记管理',
 					route:'main.list.zldj.zldjList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'zldjList@main.list' : angularAMD.route({
                	 controller:'zldjListController',
 					 controllerUrl : ['simple/view/ws/js/zldj/ZldjList.js'],
                     templateUrl : 'simple/view/ws/html/zldj/ZldjList.html'
                 })
             }
		}))
		.state('main.list.zldj.zldjAddForm',angularAMD.route({
             url : '/zldjAddForm/:operate',
             views : {
                'zldjAddForm@main.list' : angularAMD.route({
                	controller:'zldjFormController',
 					controllerUrl : ['simple/view/ws/js/zldj/ZldjForm.js'],
                    templateUrl : 'simple/view/ws/html/zldj/ZldjForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'zldjAddForm',
 					name:'新增招领登记',
 					route:'main.list.zldj.zldjAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.zldj.zldjEditForm',angularAMD.route({
            url : '/zldjEditForm/:operate/:id',
            views : {
                'zldjEditForm@main.list' : angularAMD.route({
                	controller:'zldjFormController',
                    controllerUrl : ['simple/view/ws/js/zldj/ZldjForm.js'],
                    templateUrl : 'simple/view/ws/html/zldj/ZldjForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'zldjEditForm',
                    name:'编辑招领登记',
                    route:'main.list.zldj.zldjEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.zldj.zldjDisplay',angularAMD.route({
			url : '/zldjDisplay/:id',
            views : {
                'zldjDisplay@main.list' : angularAMD.route({
                	controller:'zldjDisplayController',
					controllerUrl : ['simple/view/ws/js/zldj/ZldjDisplay.js'],
                    templateUrl : 'simple/view/ws/html/zldj/ZldjDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'zldjDisplay',
					name:'查看招领登记',
					route:'main.list.zldj.zldjDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))