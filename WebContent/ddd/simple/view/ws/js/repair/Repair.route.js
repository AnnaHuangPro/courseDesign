		.state('main.list.repair',angularAMD.route({
			url : '/repair',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/ws/js/repair/RepairService.js']
				})
			}
		}))
		.state('main.list.repair.repairList',angularAMD.route({
             url : '/repairList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'repairList',
 					name:'报修管理',
 					route:'main.list.repair.repairList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'repairList@main.list' : angularAMD.route({
                	 controller:'repairListController',
 					 controllerUrl : ['simple/view/ws/js/repair/RepairList.js'],
                     templateUrl : 'simple/view/ws/html/repair/RepairList.html'
                 })
             }
		}))
		.state('main.list.repair.repairAddForm',angularAMD.route({
             url : '/repairAddForm/:operate',
             views : {
                'repairAddForm@main.list' : angularAMD.route({
                	controller:'repairFormController',
 					controllerUrl : ['simple/view/ws/js/repair/RepairForm.js'],
                    templateUrl : 'simple/view/ws/html/repair/RepairForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'repairAddForm',
 					name:'新增报修',
 					route:'main.list.repair.repairAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.repair.repairEditForm',angularAMD.route({
            url : '/repairEditForm/:operate/:id',
            views : {
                'repairEditForm@main.list' : angularAMD.route({
                	controller:'repairFormController',
                    controllerUrl : ['simple/view/ws/js/repair/RepairForm.js'],
                    templateUrl : 'simple/view/ws/html/repair/RepairForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'repairEditForm',
                    name:'编辑报修',
                    route:'main.list.repair.repairEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.repair.repairDisplay',angularAMD.route({
			url : '/repairDisplay/:id',
            views : {
                'repairDisplay@main.list' : angularAMD.route({
                	controller:'repairDisplayController',
					controllerUrl : ['simple/view/ws/js/repair/RepairDisplay.js'],
                    templateUrl : 'simple/view/ws/html/repair/RepairDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'repairDisplay',
					name:'查看报修',
					route:'main.list.repair.repairDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))