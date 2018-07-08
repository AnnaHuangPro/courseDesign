		.state('main.list.entityTips',angularAMD.route({
			url : '/entityTips',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/entityTips/js/entityTips/EntityTipsService.js']
				})
			}
		}))
		.state('main.list.entityTips.entityTipsList',angularAMD.route({
             url : '/entityTipsList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'entityTipsList',
 					name:'说明管理',
 					route:'main.list.entityTips.entityTipsList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'entityTipsList@main.list' : angularAMD.route({
                	 controller:'entityTipsListController',
 					 controllerUrl : ['simple/view/entityTips/js/entityTips/EntityTipsList.js'],
                     templateUrl : 'simple/view/entityTips/html/entityTips/EntityTipsList.html'
                 })
             }
		}))
		.state('main.list.entityTips.entityTipsAddForm',angularAMD.route({
             url : '/entityTipsAddForm/:operate',
             views : {
                'entityTipsAddForm@main.list' : angularAMD.route({
                	controller:'entityTipsFormController',
 					controllerUrl : ['simple/view/entityTips/js/entityTips/EntityTipsForm.js'],
                    templateUrl : 'simple/view/entityTips/html/entityTips/EntityTipsForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'entityTipsAddForm',
 					name:'新增说明',
 					route:'main.list.entityTips.entityTipsAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.entityTips.entityTipsEditForm',angularAMD.route({
            url : '/entityTipsEditForm/:operate/:id',
            views : {
                'entityTipsEditForm@main.list' : angularAMD.route({
                	controller:'entityTipsFormController',
                    controllerUrl : ['simple/view/entityTips/js/entityTips/EntityTipsForm.js'],
                    templateUrl : 'simple/view/entityTips/html/entityTips/EntityTipsForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'entityTipsEditForm',
                    name:'编辑说明',
                    route:'main.list.entityTips.entityTipsEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.entityTips.entityTipsDisplay',angularAMD.route({
			url : '/entityTipsDisplay/:id',
            views : {
                'entityTipsDisplay@main.list' : angularAMD.route({
                	controller:'entityTipsDisplayController',
					controllerUrl : ['simple/view/entityTips/js/entityTips/EntityTipsDisplay.js'],
                    templateUrl : 'simple/view/entityTips/html/entityTips/EntityTipsDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'entityTipsDisplay',
					name:'查看说明',
					route:'main.list.entityTips.entityTipsDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))