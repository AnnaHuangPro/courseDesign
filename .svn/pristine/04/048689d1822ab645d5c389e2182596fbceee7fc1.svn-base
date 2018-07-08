		.state('main.list.reportView',angularAMD.route({
			url : '/reportView',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/listView/js/reportView/ReportViewService.js']
				})
			}
		}))
		.state('main.list.reportView.reportViewList',angularAMD.route({
             url : '/reportViewList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'reportViewList',
 					name:'视图管理',
 					route:'main.list.reportView.reportViewList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'reportViewList@main.list' : angularAMD.route({
                	 controller:'reportViewListController',
 					 controllerUrl : ['simple/view/listView/js/reportView/ReportViewList.js'],
                     templateUrl : 'simple/view/listView/html/reportView/ReportViewList.html'
                 })
             }
		}))
		.state('main.list.reportView.reportViewAddForm',angularAMD.route({
             url : '/reportViewAddForm/:operate/:id',
             views : {
                'reportViewAddForm@main.list' : angularAMD.route({
                	controller:'reportViewFormController',
 					controllerUrl : ['simple/view/listView/js/reportView/ReportViewForm.js'],
                    templateUrl : 'simple/view/listView/html/reportView/ReportViewForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'reportViewAddForm',
 					name:'新增视图',
 					route:'main.list.reportView.reportViewAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.reportView.reportViewEditForm',angularAMD.route({
            url : '/reportViewEditForm/:operate/:id',
            views : {
                'reportViewEditForm@main.list' : angularAMD.route({
                	controller:'reportViewFormController',
                    controllerUrl : ['simple/view/listView/js/reportView/ReportViewForm.js'],
                    templateUrl : 'simple/view/listView/html/reportView/ReportViewForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'reportViewEditForm',
                    name:'编辑视图',
                    route:'main.list.reportView.reportViewEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.reportView.reportViewDisplay',angularAMD.route({
			url : '/reportViewDisplay/:id',
            views : {
                'reportViewDisplay@main.list' : angularAMD.route({
                	controller:'reportViewDisplayController',
					controllerUrl : ['simple/view/listView/js/reportView/ReportViewDisplay.js'],
                    templateUrl : 'simple/view/listView/html/reportView/ReportViewDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'reportViewDisplay',
					name:'查看视图',
					route:'main.list.reportView.reportViewDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))