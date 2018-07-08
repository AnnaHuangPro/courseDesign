		.state('main.list.codeTable',angularAMD.route({
			url : '/codeTable',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/codeTable/js/codeTable/CodeTableService.js']
				})
			}
		}))
		.state('main.list.codeTable.codeTableList',angularAMD.route({
             url : '/codeTableList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'codeTableList',
 					name:'码表管理',
 					route:'main.list.codeTable.codeTableList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'codeTableList@main.list' : angularAMD.route({
                	 controller:'codeTableListController',
 					 controllerUrl : ['simple/view/codeTable/js/codeTable/CodeTableList.js'],
                     templateUrl : 'simple/view/codeTable/html/codeTable/CodeTableList.html'
                 })
             }
		}))
		.state('main.list.codeTable.codeTableAddForm',angularAMD.route({
             url : '/codeTableAddForm/:operate',
             views : {
                'codeTableAddForm@main.list' : angularAMD.route({
                	controller:'codeTableFormController',
 					controllerUrl : ['simple/view/codeTable/js/codeTable/CodeTableForm.js'],
                    templateUrl : 'simple/view/codeTable/html/codeTable/CodeTableForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'codeTableAddForm',
 					name:'新增码表',
 					route:'main.list.codeTable.codeTableAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.codeTable.codeTableEditForm',angularAMD.route({
            url : '/codeTableEditForm/:operate/:id',
            views : {
                'codeTableEditForm@main.list' : angularAMD.route({
                	controller:'codeTableFormController',
                    controllerUrl : ['simple/view/codeTable/js/codeTable/CodeTableForm.js'],
                    templateUrl : 'simple/view/codeTable/html/codeTable/CodeTableForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'codeTableEditForm',
                    name:'编辑码表',
                    route:'main.list.codeTable.codeTableEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.codeTable.codeTableDisplay',angularAMD.route({
			url : '/codeTableDisplay/:id',
            views : {
                'codeTableDisplay@main.list' : angularAMD.route({
                	controller:'codeTableDisplayController',
					controllerUrl : ['simple/view/codeTable/js/codeTable/CodeTableDisplay.js'],
                    templateUrl : 'simple/view/codeTable/html/codeTable/CodeTableDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'codeTableDisplay',
					name:'查看码表',
					route:'main.list.codeTable.codeTableDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))