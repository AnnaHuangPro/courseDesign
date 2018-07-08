		.state('main.list.modelFile',angularAMD.route({
			url : '/modelFile',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/modelFile/js/modelFile/ModelFileService.js']
				})
			}
		}))
		.state('main.list.modelFile.modelFileList',angularAMD.route({
             url : '/modelFileList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'modelFileList',
 					name:'模板文件管理',
 					route:'main.list.modelFile.modelFileList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'modelFileList@main.list' : angularAMD.route({
                	 controller:'modelFileListController',
 					 controllerUrl : ['simple/view/modelFile/js/modelFile/ModelFileList.js'],
                     templateUrl : 'simple/view/modelFile/html/modelFile/ModelFileList.html'
                 })
             }
		}))
		.state('main.list.modelFile.modelFileAddForm',angularAMD.route({
             url : '/modelFileAddForm/:operate',
             views : {
                'modelFileAddForm@main.list' : angularAMD.route({
                	controller:'modelFileFormController',
 					controllerUrl : ['simple/view/modelFile/js/modelFile/ModelFileForm.js'],
                    templateUrl : 'simple/view/modelFile/html/modelFile/ModelFileForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'modelFileAddForm',
 					name:'新增模板文件',
 					route:'main.list.modelFile.modelFileAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.modelFile.modelFileEditForm',angularAMD.route({
            url : '/modelFileEditForm/:operate/:id',
            views : {
                'modelFileEditForm@main.list' : angularAMD.route({
                	controller:'modelFileFormController',
                    controllerUrl : ['simple/view/modelFile/js/modelFile/ModelFileForm.js'],
                    templateUrl : 'simple/view/modelFile/html/modelFile/ModelFileForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'modelFileEditForm',
                    name:'编辑模板文件',
                    route:'main.list.modelFile.modelFileEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.modelFile.modelFileDisplay',angularAMD.route({
			url : '/modelFileDisplay/:id',
            views : {
                'modelFileDisplay@main.list' : angularAMD.route({
                	controller:'modelFileDisplayController',
					controllerUrl : ['simple/view/modelFile/js/modelFile/ModelFileDisplay.js'],
                    templateUrl : 'simple/view/modelFile/html/modelFile/ModelFileDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'modelFileDisplay',
					name:'查看模板文件',
					route:'main.list.modelFile.modelFileDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
	.state('main.list.statsReport',angularAMD.route({
			url : '/statsReport',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : []
				})
			}
		}))
    .state('main.list.statsReport.statsReportView',angularAMD.route({
        url : '/statsReportView',
        views : {
            'statsReportView@main.list' : angularAMD.route({
            	templateUrl : 'simple/view/modelFile/html/modelFile/statsReport.html',
				controller:'statsReportController',
				controllerUrl:[
				             'simple/view/modelFile/js/modelFile/statsReport.js',
				             'simple/view/modelFile/js/modelFile/ModelFileService.js'
				]
            })
        },
        onEnter: function($rootScope,$stateParams) {
        var model  ={
                eId:'statsReportView',
                name:'统计报表',
                route:'main.list.statsReport.statsReportView'
            }
            $rootScope.selectModule(model);
        }
    }))
    .state('main.list.statsReport.statsReportChart',angularAMD.route({
        url : '/statsReportChart',
        views : {
            'statsReportChart@main.list' : angularAMD.route({
            	templateUrl : 'simple/view/modelFile/html/modelFile/statsReport2.html',
				controller:'statsReportController',
				controllerUrl:[
				             'simple/view/modelFile/js/modelFile/statsReport2.js',
				             'simple/view/modelFile/js/modelFile/ModelFileService.js'
				]
            })
        },
        onEnter: function($rootScope,$stateParams) {
        var model  ={
                eId:'statsReportChart',
                name:'统计分析',
                route:'main.list.statsReport.statsReportChart'
            }
            $rootScope.selectModule(model);
        }
    }))