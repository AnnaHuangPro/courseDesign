		.state('main.list.dataSourceType',angularAMD.route({
			url : '/dataSourceType',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/listView/js/dataSourceType/DataSourceTypeService.js']
				})
			}
		}))
		.state('main.list.dataSourceType.dataSourceTypeList',angularAMD.route({
             url : '/dataSourceTypeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'dataSourceTypeList',
 					name:'数据源类型管理',
 					route:'main.list.dataSourceType.dataSourceTypeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'dataSourceTypeList@main.list' : angularAMD.route({
                	 controller:'dataSourceTypeListController',
 					 controllerUrl : ['simple/view/listView/js/dataSourceType/DataSourceTypeList.js'],
                     templateUrl : 'simple/view/listView/html/dataSourceType/DataSourceTypeList.html'
                 })
             }
		}))
		.state('main.list.dataSourceType.dataSourceTypeAddForm',angularAMD.route({
             url : '/dataSourceTypeAddForm/:operate',
             views : {
                'dataSourceTypeAddForm@main.list' : angularAMD.route({
                	controller:'dataSourceTypeFormController',
 					controllerUrl : ['simple/view/listView/js/dataSourceType/DataSourceTypeForm.js'],
                    templateUrl : 'simple/view/listView/html/dataSourceType/DataSourceTypeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'dataSourceTypeAddForm',
 					name:'新增数据源类型',
 					route:'main.list.dataSourceType.dataSourceTypeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.dataSourceType.dataSourceTypeEditForm',angularAMD.route({
            url : '/dataSourceTypeEditForm/:operate/:id',
            views : {
                'dataSourceTypeEditForm@main.list' : angularAMD.route({
                	controller:'dataSourceTypeFormController',
                    controllerUrl : ['simple/view/listView/js/dataSourceType/DataSourceTypeForm.js'],
                    templateUrl : 'simple/view/listView/html/dataSourceType/DataSourceTypeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'dataSourceTypeEditForm',
                    name:'编辑数据源类型',
                    route:'main.list.dataSourceType.dataSourceTypeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.dataSourceType.dataSourceTypeDisplay',angularAMD.route({
			url : '/dataSourceTypeDisplay/:id',
            views : {
                'dataSourceTypeDisplay@main.list' : angularAMD.route({
                	controller:'dataSourceTypeDisplayController',
					controllerUrl : ['simple/view/listView/js/dataSourceType/DataSourceTypeDisplay.js'],
                    templateUrl : 'simple/view/listView/html/dataSourceType/DataSourceTypeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'dataSourceTypeDisplay',
					name:'查看数据源类型',
					route:'main.list.dataSourceType.dataSourceTypeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))