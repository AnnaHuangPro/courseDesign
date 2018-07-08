		.state('main.list.viewTree',angularAMD.route({
			url : '/viewTree',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/tree/js/viewTree/ViewTreeService.js']
				})
			}
		}))
		.state('main.list.viewTree.viewTreeList',angularAMD.route({
             url : '/viewTreeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'viewTreeList',
 					name:'树管理',
 					route:'main.list.viewTree.viewTreeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'viewTreeList@main.list' : angularAMD.route({
                	 controller:'viewTreeListController',
 					 controllerUrl : ['simple/view/tree/js/viewTree/ViewTreeList.js'],
                     templateUrl : 'simple/view/tree/html/viewTree/ViewTreeList.html'
                 })
             }
		}))
		.state('main.list.viewTree.viewTreeAddForm',angularAMD.route({
             url : '/viewTreeAddForm/:operate',
             views : {
                'viewTreeAddForm@main.list' : angularAMD.route({
                	controller:'viewTreeFormController',
 					controllerUrl : ['simple/view/tree/js/viewTree/ViewTreeForm.js'],
                    templateUrl : 'simple/view/tree/html/viewTree/ViewTreeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'viewTreeAddForm',
 					name:'新增树',
 					route:'main.list.viewTree.viewTreeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.viewTree.viewTreeEditForm',angularAMD.route({
            url : '/viewTreeEditForm/:operate/:id',
            views : {
                'viewTreeEditForm@main.list' : angularAMD.route({
                	controller:'viewTreeFormController',
                    controllerUrl : ['simple/view/tree/js/viewTree/ViewTreeForm.js'],
                    templateUrl : 'simple/view/tree/html/viewTree/ViewTreeForm2.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'viewTreeEditForm',
                    name:'编辑树',
                    route:'main.list.viewTree.viewTreeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.viewTree.viewTreeDisplay',angularAMD.route({
			url : '/viewTreeDisplay/:id',
            views : {
                'viewTreeDisplay@main.list' : angularAMD.route({
                	controller:'viewTreeDisplayController',
					controllerUrl : ['simple/view/tree/js/viewTree/ViewTreeDisplay.js'],
                    templateUrl : 'simple/view/tree/html/viewTree/ViewTreeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'viewTreeDisplay',
					name:'查看树',
					route:'main.list.viewTree.viewTreeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))