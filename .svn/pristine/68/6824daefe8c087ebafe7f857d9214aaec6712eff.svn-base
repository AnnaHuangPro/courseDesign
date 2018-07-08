		.state('main.list.dataSource',angularAMD.route({
			url : '/dataSource',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/listView/js/dataSource/DataSourceService.js']
				})
			}
		}))
		.state('main.list.dataSource.dataSourceList',angularAMD.route({
             url : '/dataSourceList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'dataSourceList',
 					name:'数据源管理',
 					route:'main.list.dataSource.dataSourceList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'dataSourceList@main.list' : angularAMD.route({
                	 controller:'dataSourceListController',
 					 controllerUrl : ['simple/view/listView/js/dataSource/DataSourceList.js'],
                     templateUrl : 'simple/view/listView/html/dataSource/DataSourceList.html'
                 })
             }
		}))
		.state('main.list.dataSource.dataSourceAddForm',angularAMD.route({
             url : '/dataSourceAddForm/:operate',
             views : {
                'dataSourceAddForm@main.list' : angularAMD.route({
                	controller:'dataSourceFormController',
 					controllerUrl : ['simple/view/listView/js/dataSource/DataSourceForm.js'],
                    templateUrl : 'simple/view/listView/html/dataSource/DataSourceForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'dataSourceAddForm',
 					name:'新增数据源',
 					route:'main.list.dataSource.dataSourceAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.dataSource.dataSourceEditForm',angularAMD.route({
            url : '/dataSourceEditForm/:operate/:id',
            views : {
                'dataSourceEditForm@main.list' : angularAMD.route({
                	controller:'dataSourceFormController',
                    controllerUrl : ['simple/view/listView/js/dataSource/DataSourceForm.js'],
                    templateUrl : 'simple/view/listView/html/dataSource/DataSourceForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'dataSourceEditForm',
                    name:'编辑数据源',
                    route:'main.list.dataSource.dataSourceEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.dataSource.dataSourceDisplay',angularAMD.route({
			url : '/dataSourceDisplay/:id',
            views : {
                'dataSourceDisplay@main.list' : angularAMD.route({
                	controller:'dataSourceDisplayController',
					controllerUrl : ['simple/view/listView/js/dataSource/DataSourceDisplay.js'],
                    templateUrl : 'simple/view/listView/html/dataSource/DataSourceDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'dataSourceDisplay',
					name:'查看数据源',
					route:'main.list.dataSource.dataSourceDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))