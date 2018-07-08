.state('main.list.model',angularAMD.route({
			url : '/model',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/model/js/model/ModelService.js',
									 'simple/view/listView/js/reportView/ReportViewService.js',
									 'simple/view/codeTable/js/codeTable/CodeTableService.js',
									 'simple/view/model/js/modelData/ModelDataService.js']
				})
			}
		}))
		.state('main.list.model.modelList',angularAMD.route({
             url : '/modelList',
			 views : {
                 'modelList@main.list' : angularAMD.route({
                     templateUrl : 'simple/view/model/html/model/ModelList.html',
                     controllerUrl : [ 
                                      'simple/view/workflow/js/task/TaskService.js',
                     					
                                      'simple/view/model/js/modelData/ModelDataService.js','simple/view/model/js/model/ModelList.js']
                 })
             },
 			onEnter: function($rootScope){
				var model  ={
					eId:'modelList',
					name:'模型管理',
					route:'main.list.model.modelList'
				}
				$rootScope.selectModule(model);
			}
		}))
		.state('main.list.model.modelAddForm',angularAMD.route({
             url : '/modelAddForm/:operate',
             views : {
                'modelAddForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/model/ModelForm.html',
                    controllerUrl : ['simple/view/model/js/model/ModelForm.js',
                                     'simple/view/model/js/modelItem/ModelItemService.js']
                })
             },
 			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'modelAddForm',
					name:'新增模型',
					route:'main.list.model.modelAddForm'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
        .state('main.list.model.modelEditForm',angularAMD.route({
            url : '/modelEditForm/:operate/:id',
            views : {
                'modelEditForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/model/ModelForm.html',
                    controllerUrl : ['simple/view/model/js/model/ModelForm.js',
                                     'simple/view/model/js/modelItem/ModelItemService.js']
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'modelEditForm',
                    name:'编辑模型',
                    route:'main.list.model.modelEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.model.modelDisplay',angularAMD.route({
			url : '/modelDisplay/:id',
            views : {
                'modelDisplay@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/model/ModelDisplay.html',
                    controllerUrl : ['simple/view/model/js/model/ModelDisplay.js']
                })
            },
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'modelDisplay',
					name:'查看模型',
					route:'main.list.model.modelDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		
	 .state('main.list.modelData',angularAMD.route({
			url : '/modelData',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/model/js/modelData/ModelDataService.js',
					                 'simple/view/model/js/model/ModelService.js']
				})
			}
		}))
		.state('main.list.modelData.modelOptionList',angularAMD.route({
             url : '/modelOptionList/:id/:name',
			  views : {
                 'modelOptionList@main.list' : angularAMD.route({
                     templateUrl : 'simple/view/model/html/modelData/ModelOptionList.html',
                     controllerUrl : ['simple/view/model/js/modelData/ModelOptionList.js']
                 })
             },
 			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'modelOptionList',
					name:$stateParams.name + '资源',
					route:'main.list.modelData.modelOptionList'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		.state('main.list.modelData.modelDataAddForm',angularAMD.route({
             url : '/modelDataAddForm/:operate/:formKey/:tableName',
             views : {
                'modelDataAddForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelData/ModelDataForm.html',
                    controllerUrl : ['simple/view/model/js/modelData/ModelDataForm.js']
                })
             },
 			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'modelDataAddForm',
					name:'新增模型数据',
					route:'main.list.modelData.modelDataAddForm'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
        .state('main.list.modelData.modelDataEditForm',angularAMD.route({
            url : '/modelDataEditForm/:operate/:formKey/:modelDataId/:modelId/:tableName',
            views : {
                'modelDataEditForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelData/ModelDataForm.html',
                    controllerUrl : ['simple/view/model/js/modelData/ModelDataForm.js']
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'modelDataEditForm',
                    name:'编辑',
                    route:'main.list.modelData.modelDataEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.modelData.modelDataDisplay',angularAMD.route({
			url : '/modelDataDisplay/:modelId/:modelDataId/:formKey/:tableName',
            views : {
                'modelDataDisplay@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelData/ModelDataDisplay.html',
                    controllerUrl : ['simple/view/model/js/modelData/ModelDataDisplay.js']
                })
            },
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'modelDataDisplay',
					name:'查看',
					url:'simple/view/model/html/modelData/ModelDataDisplay.html',
					route:'main.list.modelData.modelDataDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		.state('main.list.modelDataType',angularAMD.route({
			url : '/modelDataType',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/model/js/modelDataType/ModelDataTypeService.js']
				})
			}
		}))
		.state('main.list.modelDataType.modelDataTypeList',angularAMD.route({
             url : '/modelDataTypeList',
			 views : {
                 'modelDataTypeList@main.list' : angularAMD.route({
                     templateUrl : 'simple/view/model/html/modelDataType/ModelDataTypeList.html',
                     controllerUrl : ['simple/view/model/js/modelDataType/ModelDataTypeList.js']
                 })
             },
 			onEnter: function($rootScope){
				var model  ={
					eId:'modelDataTypeList',
					name:'模型项数据类型管理',
					route:'main.list.modelDataType.modelDataTypeList'
				}
				$rootScope.selectModule(model);
			}
		}))
		.state('main.list.modelDataType.modelDataTypeAddForm',angularAMD.route({
             url : '/modelDataTypeAddForm/:operate',
             views : {
                'modelDataTypeAddForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelDataType/ModelDataTypeForm.html',
                    controllerUrl : ['simple/view/model/js/modelDataType/ModelDataTypeForm.js']
                })
             },
 			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'modelDataTypeAddForm',
					name:'新增模型项数据类型',
					route:'main.list.modelDataType.modelDataTypeAddForm'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
        .state('main.list.modelDataType.modelDataTypeEditForm',angularAMD.route({
            url : '/modelDataTypeEditForm/:operate/:id',
            views : {
                'modelDataTypeEditForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelDataType/ModelDataTypeForm.html',
                    controllerUrl : ['simple/view/model/js/modelDataType/ModelDataTypeForm.js']
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'modelDataTypeEditForm',
                    name:'编辑模型项数据类型',
                    route:'main.list.modelDataType.modelDataTypeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.modelDataType.modelDataTypeDisplay',angularAMD.route({
			url : '/modelDataTypeDisplay/:id',
            views : {
                'modelDataTypeDisplay@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelDataType/ModelDataTypeDisplay.html',
                    controllerUrl : ['simple/view/model/js/modelDataType/ModelDataTypeDisplay.js']
                })
            },
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'modelDataTypeDisplay',
					name:'查看模型项数据类型',
					route:'main.list.modelDataType.modelDataTypeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
.state('main.list.modelType',angularAMD.route({
			url : '/modelType',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/model/js/modelType/ModelTypeService.js']
				})
			}
		}))
		.state('main.list.modelType.modelTypeList',angularAMD.route({
             url : '/modelTypeList',
			 views : {
                 'modelTypeList@main.list' : angularAMD.route({
                     templateUrl : 'simple/view/model/html/modelType/ModelTypeList.html',
                     controllerUrl : ['simple/view/model/js/modelType/ModelTypeList.js']
                 })
             },
 			onEnter: function($rootScope){
				var model  ={
					eId:'modelTypeList',
					name:'模型类型管理',
					route:'main.list.modelType.modelTypeList'
				}
				$rootScope.selectModule(model);
			}
		}))
		.state('main.list.modelType.modelTypeAddForm',angularAMD.route({
             url : '/modelTypeAddForm/:operate',
             views : {
                'modelTypeAddForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelType/ModelTypeForm.html',
                    controllerUrl : ['simple/view/model/js/modelType/ModelTypeForm.js']
                })
             },
 			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'modelTypeAddForm',
					name:'新增模型类型',
					route:'main.list.modelType.modelTypeAddForm'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
        .state('main.list.modelType.modelTypeEditForm',angularAMD.route({
            url : '/modelTypeEditForm/:operate/:id',
            views : {
                'modelTypeEditForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelType/ModelTypeForm.html',
                    controllerUrl : ['simple/view/model/js/modelType/ModelTypeForm.js']
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'modelTypeEditForm',
                    name:'编辑模型类型',
                    route:'main.list.modelType.modelTypeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.modelType.modelTypeDisplay',angularAMD.route({
			url : '/modelTypeDisplay/:id',
            views : {
                'modelTypeDisplay@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelType/ModelTypeDisplay.html',
                    controllerUrl : ['simple/view/model/js/modelType/ModelTypeDisplay.js']
                })
            },
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'modelTypeDisplay',
					name:'查看模型类型',
					route:'main.list.modelType.modelTypeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		
		.state('main.list.modelData.historyVersion',angularAMD.route({
			url : '/historyVersion/:modelId/:dataId/:modelEnglishName',
            views : {
                'historyVersion@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelData/ModelDataHistoryList.html',
                    controllerUrl : ['simple/view/model/js/modelData/ModelDataHistoryList.js']
                })
            },
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'historyVersion',
					name:'查看历史版本',
					route:'main.list.modelData.historyVersion'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		
		.state('main.list.modelData.historyVersionDisplay',angularAMD.route({
			url : '/historyVersionDisplay/:historyVersionId',
            views : {
                'historyVersionDisplay@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/model/html/modelData/ModelDataHistoryDisplay.html',
                    controllerUrl : ['simple/view/model/js/modelData/ModelDataHistoryDisplay.js',
                                     'simple/view/model/js/modelData/HistoryService.js']
                })
            },
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'historyVersionDisplay',
					name:'历史版本详情',
					route:'main.list.modelData.historyVersionDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		
		