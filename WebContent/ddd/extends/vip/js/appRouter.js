//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\codeGenerator\js\CodeGenerator.route.js
.state("main.list.codeGenerator",angularAMD.route({
			url : '/codeGenerator',
			views : {
				"@main" : angularAMD.route({
					controllerUrl : ['simple/view/codeGenerator/js/CodeGeneratorService.js']
				})
			}
		}))
.state("main.list.codeGenerator.codeGeneratorForm",angularAMD.route({
	url : '/codeGeneratorForm',
	onEnter: function($rootScope){
		var model  ={
			eId:"codeGeneratorForm",
			name:"代码生成",
			route:"main.list.codeGenerator.codeGeneratorForm"
		}
		$rootScope.selectModule(model);
	},
    views : {
        "codeGeneratorForm@main.list" : angularAMD.route({
        	controller:'codeGeneratorFromController',
            templateUrl : 'simple/view/codeGenerator/html/CodeGenerator.html',
            controllerUrl:['simple/view/codeGenerator/js/CodeGeneratorForm.js']
        })
    }
}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\codeGenerator\js\CodeGenerator.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\ddd3util\js\ddd3util.route.js
    .state('main.list.ddd3utilRoute',angularAMD.route({
        url : '/ddd3utilRoute',
        onEnter: function($rootScope){
            var model  ={
                eId:'ddd3util',
                name:'系统工具',
                route:'main.list.ddd3util'
            }
            $rootScope.selectModule(model);
        }
    }))
    .state('main.list.ddd3util',angularAMD.route({
        url : '/generateFields',
        views : {
            'ddd3util@main.list' : angularAMD.route({
            	templateUrl : 'simple/view/ddd3util/html/ddd3util.html',
				controller:'ddd3utilController',
				controllerUrl:[
				     'simple/view/ddd3util/js/ddd3utilController.js',
				     'simple/view/ddd3util/js/ddd3utilService.js'
				]
            })
        }
    }))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\ddd3util\js\ddd3util.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\error\js\Error.route.js
	.state("nopermission", {
		url : "/nopermission",
		templateUrl : 'simple/view/error/html/NoPermission.html'
	})
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\error\js\Error.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\model\route\model.route.js
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
                    name:'编辑模型数据',
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
					name:'查看模型数据',
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
			url : '/historyVersion/:modelId/:dataId',
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
		
		
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\model\route\model.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\vip\view\account\js\account.route.js
.state("main.list.account",angularAMD.route({
	url : "/account",
	controllerUrl : ["vip/view/account/js/modifyAccountService.js"]
}))

// 校内人员基本信息
.state("main.list.account.schoolBaseInfo",angularAMD.route({
    url : "/baseInfo1",
	 views : {
        "content@main" : angularAMD.route({
            templateUrl : "VipExtends/view/account/baseInfo/html/baseInfo.html",
            controllerUrl : ["vip/view/account/js/memberInfoCtr.js",
                             "js/angular/angular-messages.js"
                             ],
			controller:"memberInfoCtr"
        })
    }
}))	
// 校内人员详细信息
.state("main.list.account.schoolDetailInfo",angularAMD.route({
	url : "/detailInfo1",
	views : {
		"content@main" : angularAMD.route({
            templateUrl : "VipExtends/view/account/detailInfo/html/detailInfo.html",
            controllerUrl : ["vip/view/account/js/memberInfoCtr.js"],
			controller:"memberInfoCtr"
        })
	}
}))

// 校外人员基本信息
.state("main.list.account.baseInfo",angularAMD.route({
    url : "/baseInfo",
	 views : {
        "content@main" : angularAMD.route({
            templateUrl : "vip/view/account/baseInfo/html/baseInfo.html",
            controllerUrl : ["vip/view/account/js/memberInfoCtr.js",
                             "js/angular/angular-messages.js"
                             ],
			controller:"memberInfoCtr"
        })
    }
}))	

// 校外人员详细信息
.state("main.list.account.detailInfo",angularAMD.route({
	url : "/detailInfo",
	views : {
		"content@main" : angularAMD.route({
            templateUrl : "vip/view/account/detailInfo/html/detailInfo.html",
            controllerUrl : ["vip/view/account/js/memberInfoCtr.js"],
			controller:"memberInfoCtr"
        })
	}
}))

// 修改密码

.state("main.list.account.editPassword",angularAMD.route({
	url : "/editPassword",
	views : {
		"content@main" : angularAMD.route({
            templateUrl : "vip/view/account/editPassword/html/editPassword.html",
            controllerUrl : ["vip/view/account/editPassword/js/editPasswordCtr.js",
                             "simple/view/member/manMgt/js/ManMgtService.js"],
		    controller:"editPasswordCtr"
		})
	}
}))	
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\vip\view\account\js\account.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\vip\view\main\js\Main.route.js
.state("main",angularAMD.route({
	url : "/main",
	templateUrl : "vip/view/main/html/VipMain.html",
	controller:"VipMainCtr",
	controllerUrl:[
	    "vip/view/main/js/VipMainCtr.js",
	    "simple/view/member/manMgt/js/ManMgtService.js",
	    "simple/view/member/groupMgt/js/GroupMgtService.js",
		"simple/view/listView/js/ListViewService.js",
		"simple/view/tree/js/viewTree/ViewTreeService.js",
		"simple/view/attachment/AttachmentService.js",
		"simple/view/dynamicForm/js/dynamicForm/DynamicFormService.js",
		"js/ngDialog/js/ngDialog.min.js",
		"js/angular/1.4.4/angular-route.js",
		"simple/view/login/js/LoginService.js",
		"simple/view/codeTable/js/codeTable/CodeTableService.js",
		"simple/view/codeTable/js/codeType/CodeTypeService.js",
		"compents/oneToManyGrid/OneToManyGrid.js",
		"simple/view/main/js/HeadController.js",
		"simple/view/main/js/MenuController.js",
		"simple/view/permission/js/module/ModuleService.js",
		"simple/view/operatorCongfigModel/js/operatorCongfig/OperatorCongfigService.js",
		"simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineService.js",
		"simple/view/organization/js/entityProperty/EntityPropertyService.js",
		"simple/view/workflow/asset/DynamicForm.js",
		"simple/view/importConfigs/js/importConfigs/ImportConfigsService.js",
		"simple/view/exportAndImport/js/exportAndImport/ExportAndImportService.js",
		"simple/view/importConfigs/js/importConfigs/ImportService.js",
		"compents/asynchroMask/asynchroMask.js",
		"compents/reportForm/reportForm.js",
		"compents/stickup/stickup.js",
		"simple/view/entityTips/js/entityTips/EntityTipsService.js",
		'compents/formDesigner/FormDesigner.js',
		'vip/view/login/js/VipLoginService.js',
		'simple/view/workflow/js/task/TaskService.js',
		'vip/compents/scrollUp/scrollUp.js',
       /* dddinclude start WebContent\ddd\extends\vip\js\mainRouter_sub1.js */
'vip/view/login/js/VipLoginService.js',

	/* dddinclude end WebContent\ddd\extends\vip\js\mainRouter_sub1.js */   
     ]
}))
.state("login", angularAMD.route({
	url : "/login",
	templateUrl : "vip/view/login/html/VipLogin.html",
	controller:"VipLoginCtr",
	controllerUrl:["js/ngDialog/js/ngDialog.min.js",
	               "compents/asynchroMask/asynchroMask.js",,
	               "vip/view/login/js/VipLoginCtr.js",
	               "vip/view/login/js/VipLoginService.js",
	               "vip/view/login/js/VipLoginSuccess.js",
	               "simple/view/permission/js/module/ModuleService.js"
	               ],
	css:["vip/view/login/css/login.css"]
}))
.state("main.list.welcome",angularAMD.route({
	url : "/welcome",
	views : {
		"content@main":angularAMD.route({
			templateUrl : "vip/view/main/html/VipWelcome.html"
			})
	}
}))

.state("main.list.mainTableRoute",angularAMD.route({
    url : "/mainTableRoute",
    onEnter: function($rootScope){
        var model  ={
            eId:"mainTable",
            name:"主页",
            route:"main.list.mainTable"
        }
        $rootScope.selectModule(model);
    }
}))
.state("main.list.mainTable",angularAMD.route({
    url : "/mainTable",
    views : {
        "mainTable@main.list" : angularAMD.route({
        	templateUrl : "simple/view/main/html/main/Welcome.html",
			controller:"welcomeController",
			controllerUrl:[
			                "simple/view/taskManageModel/js/taskManage/TaskManageService.js",
			               	"simple/view/main/js/WelcomeController.js"
			]
        })
    }
}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\vip\view\main\js\Main.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\vip\view\main\js\MainList.route.js
.state("main.list",angularAMD.route({
	url : "/list",
	views : {
		"top@main" : angularAMD.route({
			templateUrl : "vip/view/main/html/VipTop.html",
			controllerUrl:["vip/view/main/js/VipTopCtr.js",
			               'simple/view/member/groupMgt/js/GroupMgtService.js'],//必需是数组
			controller:"VipTopCtr",
		}),
		"menu@main" : angularAMD.route({
			templateUrl : "vip/view/main/html/VipMenuContainer.html",
			controller:"VipMenuCtr",
			controllerUrl:["vip/view/main/js/VipMenuCtr.js",
			               "vip/view/account/js/modifyAccountService.js"]//必需是数组
		}),
		"content@main":angularAMD.route({
			templateUrl : "vip/view/main/html/VipContent.html",
			controllerUrl:[]//必需是数组
			})
	}
}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\vip\view\main\js\MainList.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\vip\view\register\js\register.route.js
.state("register", angularAMD.route({
	url : "/register",
	templateUrl : "vip/view/register/html/Register.html",
	controller:"VipRegistCtr",
	controllerUrl:["vip/view/register/js/RegisterCtr.js",
	               "simple/view/member/manMgt/js/ManMgtService.js",
	               ],
}))
		

//end  ====H:\workspacetmp\DDD3\WebContent\ddd\vip\view\register\js\register.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\ddd3test\view\ddd3TestModel\js\ddd3Test\Ddd3Test.route.js
		.state('main.list.ddd3Test',angularAMD.route({
			url : '/ddd3Test',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['ddd3test/view/ddd3TestModel/js/ddd3Test/Ddd3TestService.js']
				})
			}
		}))
		.state('main.list.ddd3Test.ddd3TestListRoute',angularAMD.route({
			url : '/ddd3TestListRoute',
			onEnter: function($rootScope){
				var model  ={
					eId:'ddd3TestList',
					name:'框架测试管理',
					route:'main.list.ddd3Test.ddd3TestList'
				}
				$rootScope.selectModule(model);
			}
		}))
		.state('main.list.ddd3Test.ddd3TestList',angularAMD.route({
             url : '/ddd3TestList',
			 views : {
                 'ddd3TestList@main.list' : angularAMD.route({
                	 controller:'ddd3TestListController',
 					controllerUrl : ['ddd3test/view/ddd3TestModel/js/ddd3Test/Ddd3TestList.js'],
                     templateUrl : 'ddd3test/view/ddd3TestModel/html/ddd3Test/Ddd3TestList.html'
                 })
             },
			onEnter:function($state,$rootScope){
				if(!$rootScope.findTabByEId('ddd3TestList')){
					$state.go('main.list.ddd3Test.ddd3TestListRoute');
				}
			}
		}))
		.state('main.list.ddd3Test.ddd3TestFormAddRoute',angularAMD.route({
			url : '/ddd3TestFormAddRoute/:operate',
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'ddd3TestAddForm',
					name:'新增框架测试',
					route:'main.list.ddd3Test.ddd3TestAddForm'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		.state('main.list.ddd3Test.ddd3TestAddForm',angularAMD.route({
             url : '/ddd3TestAddForm/:operate',
             views : {
                'ddd3TestAddForm@main.list' : angularAMD.route({
                	controller:'ddd3TestFormController',
					controllerUrl : ['ddd3test/view/ddd3TestModel/js/ddd3Test/Ddd3TestForm.js'],
                    templateUrl : 'ddd3test/view/ddd3TestModel/html/ddd3Test/Ddd3TestForm.html'
                })
             },
			onEnter:function($state,$rootScope){
				if(!$rootScope.findTabByEId('ddd3TestAddForm')){
					$state.go('main.list.ddd3Test.ddd3TestFormAddRoute');
				}
			}
		}))
        .state('main.list.ddd3Test.ddd3TestFormEditRoute',angularAMD.route({
            url : '/ddd3TestFormEditRoute/:operate/:id',
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'ddd3TestEditForm',
                    name:'编辑框架测试',
                    route:'main.list.ddd3Test.ddd3TestEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
        .state('main.list.ddd3Test.ddd3TestEditForm',angularAMD.route({
            url : '/ddd3TestEditForm/:operate/:id',
            views : {
                'ddd3TestEditForm@main.list' : angularAMD.route({
                	controller:'ddd3TestFormController',
                    controllerUrl : ['ddd3test/view/ddd3TestModel/js/ddd3Test/Ddd3TestForm.js'],
                    templateUrl : 'ddd3test/view/ddd3TestModel/html/ddd3Test/Ddd3TestForm.html'
                })
            },
        	onEnter:function($state,$rootScope){
        		if(!$rootScope.findTabByEId('ddd3TestEditForm')){
        			$state.go('main.list.ddd3Test.ddd3TestFormEditRoute');
        		}
        	}
        }))
		.state('main.list.ddd3Test.ddd3TestDisplayRoute',angularAMD.route({
			url : '/ddd3TestDisplayRoute/:id',
			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'ddd3TestDisplay',
					name:'查看框架测试',
					route:'main.list.ddd3Test.ddd3TestDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
		.state('main.list.ddd3Test.ddd3TestDisplay',angularAMD.route({
			url : '/ddd3TestDisplay/:id',
            views : {
                'ddd3TestDisplay@main.list' : angularAMD.route({
                	controller:'ddd3TestDisplayController',
					controllerUrl : ['ddd3test/view/ddd3TestModel/js/ddd3Test/Ddd3TestDisplay.js'],
                    templateUrl : 'ddd3test/view/ddd3TestModel/html/ddd3Test/Ddd3TestDisplay.html'
                })
            }, 
			onEnter:function($state,$rootScope){
				if(!$rootScope.findTabByEId('ddd3TestDisplay')){
					$state.go('main.list.ddd3Test.ddd3TestDisplayRoute');
				}
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\ddd3test\view\ddd3TestModel\js\ddd3Test\Ddd3Test.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\attachmentGroup\js\attachmentGroup\AttachmentGroup.route.js
		.state('main.list.attachmentGroup',angularAMD.route({
			url : '/attachmentGroup',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupService.js']
				})
			}
		}))
		.state('main.list.attachmentGroup.attachmentGroupList',angularAMD.route({
             url : '/attachmentGroupList',
			 views : {
                 'attachmentGroupList@main.list' : angularAMD.route({
                     templateUrl : 'simple/view/attachmentGroup/html/attachmentGroup/AttachmentGroupList.html',
                     controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupList.js']
                 })
             },
 			onEnter: function($rootScope){
				var model  ={
					eId:'attachmentGroupList',
					name:'文档(中间表)管理',
					route:'main.list.attachmentGroup.attachmentGroupList'
				}
				$rootScope.selectModule(model);
			}
		}))
		
		.state('main.list.attachmentGroup.attachmentGroupAddForm',angularAMD.route({
             url : '/attachmentGroupAddForm/:operate',
             views : {
                'attachmentGroupAddForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroup/AttachmentGroupForm.html',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupForm.js']
                })
             },
 			onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'attachmentGroupAddForm',
					name:'新增文档(中间表)',
					route:'main.list.attachmentGroup.attachmentGroupAddForm'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))

        .state('main.list.attachmentGroup.attachmentGroupEditForm',angularAMD.route({
            url : '/attachmentGroupEditForm/:operate/:id',
            views : {
                'attachmentGroupEditForm@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroup/AttachmentGroupForm.html',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupForm.js']
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'attachmentGroupEditForm',
                    name:'编辑文档(中间表)',
                    route:'main.list.attachmentGroup.attachmentGroupEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.attachmentGroup.attachmentGroupDisplay',angularAMD.route({
			url : '/attachmentGroupDisplay/:id',
            views : {
                'attachmentGroupDisplay@main.list' : angularAMD.route({
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroup/AttachmentGroupDisplay.html',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroup/AttachmentGroupDisplay.js']
                })
            }, 
    		onEnter: function($rootScope,$stateParams){
				var model  ={
					eId:'attachmentGroupDisplay',
					name:'查看文档(中间表)',
					route:'main.list.attachmentGroup.attachmentGroupDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\attachmentGroup\js\attachmentGroup\AttachmentGroup.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\attachmentGroup\js\attachmentGroupCategory\AttachmentGroupCategory.route.js
		.state('main.list.attachmentGroupCategory',angularAMD.route({
			url : '/attachmentGroupCategory',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryService.js']
				})
			}
		}))
		.state('main.list.attachmentGroupCategory.attachmentGroupCategoryList',angularAMD.route({
             url : '/attachmentGroupCategoryList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'attachmentGroupCategoryList',
 					name:'文档组类型管理',
 					route:'main.list.attachmentGroupCategory.attachmentGroupCategoryList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'attachmentGroupCategoryList@main.list' : angularAMD.route({
                	 controller:'attachmentGroupCategoryListController',
 					 controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryList.js'],
                     templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupCategory/AttachmentGroupCategoryList.html'
                 })
             }
		}))
		.state('main.list.attachmentGroupCategory.attachmentGroupCategoryAddForm',angularAMD.route({
             url : '/attachmentGroupCategoryAddForm/:operate',
             views : {
                'attachmentGroupCategoryAddForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupCategoryFormController',
 					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupCategory/AttachmentGroupCategoryForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'attachmentGroupCategoryAddForm',
 					name:'新增文档组类型',
 					route:'main.list.attachmentGroupCategory.attachmentGroupCategoryAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.attachmentGroupCategory.attachmentGroupCategoryEditForm',angularAMD.route({
            url : '/attachmentGroupCategoryEditForm/:operate/:id',
            views : {
                'attachmentGroupCategoryEditForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupCategoryFormController',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupCategory/AttachmentGroupCategoryForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'attachmentGroupCategoryEditForm',
                    name:'编辑文档组类型',
                    route:'main.list.attachmentGroupCategory.attachmentGroupCategoryEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.attachmentGroupCategory.attachmentGroupCategoryDisplay',angularAMD.route({
			url : '/attachmentGroupCategoryDisplay/:id',
            views : {
                'attachmentGroupCategoryDisplay@main.list' : angularAMD.route({
                	controller:'attachmentGroupCategoryDisplayController',
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupCategory/AttachmentGroupCategoryDisplay.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupCategory/AttachmentGroupCategoryDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'attachmentGroupCategoryDisplay',
					name:'查看文档组类型',
					route:'main.list.attachmentGroupCategory.attachmentGroupCategoryDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\attachmentGroup\js\attachmentGroupCategory\AttachmentGroupCategory.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\attachmentGroup\js\attachmentGroupItem\AttachmentGroupItem.route.js
		.state('main.list.attachmentGroupItem',angularAMD.route({
			url : '/attachmentGroupItem',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemService.js']
				})
			}
		}))
		.state('main.list.attachmentGroupItem.attachmentGroupItemList',angularAMD.route({
             url : '/attachmentGroupItemList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'attachmentGroupItemList',
 					name:'文档项管理',
 					route:'main.list.attachmentGroupItem.attachmentGroupItemList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'attachmentGroupItemList@main.list' : angularAMD.route({
                	 controller:'attachmentGroupItemListController',
 					 controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemList.js'],
                     templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupItem/AttachmentGroupItemList.html'
                 })
             }
		}))
		.state('main.list.attachmentGroupItem.attachmentGroupItemAddForm',angularAMD.route({
             url : '/attachmentGroupItemAddForm/:operate',
             views : {
                'attachmentGroupItemAddForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupItemFormController',
 					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupItem/AttachmentGroupItemForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'attachmentGroupItemAddForm',
 					name:'新增文档项',
 					route:'main.list.attachmentGroupItem.attachmentGroupItemAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.attachmentGroupItem.attachmentGroupItemEditForm',angularAMD.route({
            url : '/attachmentGroupItemEditForm/:operate/:id',
            views : {
                'attachmentGroupItemEditForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupItemFormController',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupItem/AttachmentGroupItemForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'attachmentGroupItemEditForm',
                    name:'编辑文档项',
                    route:'main.list.attachmentGroupItem.attachmentGroupItemEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.attachmentGroupItem.attachmentGroupItemDisplay',angularAMD.route({
			url : '/attachmentGroupItemDisplay/:id',
            views : {
                'attachmentGroupItemDisplay@main.list' : angularAMD.route({
                	controller:'attachmentGroupItemDisplayController',
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupItem/AttachmentGroupItemDisplay.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupItem/AttachmentGroupItemDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'attachmentGroupItemDisplay',
					name:'查看文档项',
					route:'main.list.attachmentGroupItem.attachmentGroupItemDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\attachmentGroup\js\attachmentGroupItem\AttachmentGroupItem.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\attachmentGroup\js\attachmentGroupTemplate\AttachmentGroupTemplate.route.js
		.state('main.list.attachmentGroupTemplate',angularAMD.route({
			url : '/attachmentGroupTemplate',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateService.js']
				})
			}
		}))
		.state('main.list.attachmentGroupTemplate.attachmentGroupTemplateList',angularAMD.route({
             url : '/attachmentGroupTemplateList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'attachmentGroupTemplateList',
 					name:'文档组(模板)管理',
 					route:'main.list.attachmentGroupTemplate.attachmentGroupTemplateList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'attachmentGroupTemplateList@main.list' : angularAMD.route({
                	 controller:'attachmentGroupTemplateListController',
 					 controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateList.js'],
                     templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupTemplate/AttachmentGroupTemplateList.html'
                 })
             }
		}))
		.state('main.list.attachmentGroupTemplate.attachmentGroupTemplateAddForm',angularAMD.route({
             url : '/attachmentGroupTemplateAddForm/:operate',
             views : {
                'attachmentGroupTemplateAddForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupTemplateFormController',
 					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupTemplate/AttachmentGroupTemplateForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'attachmentGroupTemplateAddForm',
 					name:'新增文档组(模板)',
 					route:'main.list.attachmentGroupTemplate.attachmentGroupTemplateAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.attachmentGroupTemplate.attachmentGroupTemplateEditForm',angularAMD.route({
            url : '/attachmentGroupTemplateEditForm/:operate/:id',
            views : {
                'attachmentGroupTemplateEditForm@main.list' : angularAMD.route({
                	controller:'attachmentGroupTemplateFormController',
                    controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateForm.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupTemplate/AttachmentGroupTemplateForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'attachmentGroupTemplateEditForm',
                    name:'编辑文档组(模板)',
                    route:'main.list.attachmentGroupTemplate.attachmentGroupTemplateEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.attachmentGroupTemplate.attachmentGroupTemplateDisplay',angularAMD.route({
			url : '/attachmentGroupTemplateDisplay/:id',
            views : {
                'attachmentGroupTemplateDisplay@main.list' : angularAMD.route({
                	controller:'attachmentGroupTemplateDisplayController',
					controllerUrl : ['simple/view/attachmentGroup/js/attachmentGroupTemplate/AttachmentGroupTemplateDisplay.js'],
                    templateUrl : 'simple/view/attachmentGroup/html/attachmentGroupTemplate/AttachmentGroupTemplateDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'attachmentGroupTemplateDisplay',
					name:'查看文档组(模板)',
					route:'main.list.attachmentGroupTemplate.attachmentGroupTemplateDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\attachmentGroup\js\attachmentGroupTemplate\AttachmentGroupTemplate.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\billCode\js\billCode\BillCode.route.js
		.state('main.list.billCode',angularAMD.route({
			url : '/billCode',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/billCode/js/billCode/BillCodeService.js']
				})
			}
		}))
		.state('main.list.billCode.billCodeList',angularAMD.route({
             url : '/billCodeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'billCodeList',
 					name:'编码定义管理',
 					route:'main.list.billCode.billCodeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'billCodeList@main.list' : angularAMD.route({
                	 controller:'billCodeListController',
 					 controllerUrl : ['simple/view/billCode/js/billCode/BillCodeList.js'],
                     templateUrl : 'simple/view/billCode/html/billCode/BillCodeList.html'
                 })
             }
		}))
		.state('main.list.billCode.billCodeAddForm',angularAMD.route({
             url : '/billCodeAddForm/:operate',
             views : {
                'billCodeAddForm@main.list' : angularAMD.route({
                	controller:'billCodeFormController',
 					controllerUrl : ['simple/view/billCode/js/billCode/BillCodeForm.js'],
                    templateUrl : 'simple/view/billCode/html/billCode/BillCodeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'billCodeAddForm',
 					name:'新增编码定义',
 					route:'main.list.billCode.billCodeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.billCode.billCodeEditForm',angularAMD.route({
            url : '/billCodeEditForm/:operate/:id',
            views : {
                'billCodeEditForm@main.list' : angularAMD.route({
                	controller:'billCodeFormController',
                    controllerUrl : ['simple/view/billCode/js/billCode/BillCodeForm.js'],
                    templateUrl : 'simple/view/billCode/html/billCode/BillCodeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'billCodeEditForm',
                    name:'编辑编码定义',
                    route:'main.list.billCode.billCodeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.billCode.billCodeDisplay',angularAMD.route({
			url : '/billCodeDisplay/:id',
            views : {
                'billCodeDisplay@main.list' : angularAMD.route({
                	controller:'billCodeDisplayController',
					controllerUrl : ['simple/view/billCode/js/billCode/BillCodeDisplay.js'],
                    templateUrl : 'simple/view/billCode/html/billCode/BillCodeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'billCodeDisplay',
					name:'查看编码定义',
					route:'main.list.billCode.billCodeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\billCode\js\billCode\BillCode.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\codeTable\js\codeTable\CodeTable.route.js
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
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\codeTable\js\codeTable\CodeTable.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\codeTable\js\codeType\CodeType.route.js
		.state('main.list.codeType',angularAMD.route({
			url : '/codeType',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeService.js']
				})
			}
		}))
		.state('main.list.codeType.codeTypeList',angularAMD.route({
             url : '/codeTypeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'codeTypeList',
 					name:'码表类型管理',
 					route:'main.list.codeType.codeTypeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'codeTypeList@main.list' : angularAMD.route({
                	 controller:'codeTypeListController',
 					 controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeList.js'],
                     templateUrl : 'simple/view/codeTable/html/codeType/CodeTypeList.html'
                 })
             }
		}))
		.state('main.list.codeType.codeTypeAddForm',angularAMD.route({
             url : '/codeTypeAddForm/:operate',
             views : {
                'codeTypeAddForm@main.list' : angularAMD.route({
                	controller:'codeTypeFormController',
 					controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeForm.js'],
                    templateUrl : 'simple/view/codeTable/html/codeType/CodeTypeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'codeTypeAddForm',
 					name:'新增码表类型',
 					route:'main.list.codeType.codeTypeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.codeType.codeTypeEditForm',angularAMD.route({
            url : '/codeTypeEditForm/:operate/:id',
            views : {
                'codeTypeEditForm@main.list' : angularAMD.route({
                	controller:'codeTypeFormController',
                    controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeForm.js'],
                    templateUrl : 'simple/view/codeTable/html/codeType/CodeTypeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'codeTypeEditForm',
                    name:'编辑码表类型',
                    route:'main.list.codeType.codeTypeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.codeType.codeTypeDisplay',angularAMD.route({
			url : '/codeTypeDisplay/:id',
            views : {
                'codeTypeDisplay@main.list' : angularAMD.route({
                	controller:'codeTypeDisplayController',
					controllerUrl : ['simple/view/codeTable/js/codeType/CodeTypeDisplay.js'],
                    templateUrl : 'simple/view/codeTable/html/codeType/CodeTypeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'codeTypeDisplay',
					name:'查看码表类型',
					route:'main.list.codeType.codeTypeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\codeTable\js\codeType\CodeType.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\dynamicForm\js\dynamicForm\DynamicForm.route.js
		.state('main.list.dynamicForm',angularAMD.route({
			url : '/dynamicForm',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormService.js']
				})
			}
		}))
		.state('main.list.dynamicForm.dynamicFormList',angularAMD.route({
             url : '/dynamicFormList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'dynamicFormList',
 					name:'动态表单管理',
 					route:'main.list.dynamicForm.dynamicFormList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'dynamicFormList@main.list' : angularAMD.route({
                	 controller:'dynamicFormListController',
 					 controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormList.js'],
                     templateUrl : 'simple/view/dynamicForm/html/dynamicForm/DynamicFormList.html'
                 })
             }
		}))
		.state('main.list.dynamicForm.dynamicFormAddForm',angularAMD.route({
             url : '/dynamicFormAddForm/:operate',
             views : {
                'dynamicFormAddForm@main.list' : angularAMD.route({
                	controller:'dynamicFormFormController',
 					controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormForm.js'],
                    templateUrl : 'simple/view/dynamicForm/html/dynamicForm/DynamicFormForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'dynamicFormAddForm',
 					name:'新增动态表单',
 					route:'main.list.dynamicForm.dynamicFormAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.dynamicForm.dynamicFormEditForm',angularAMD.route({
            url : '/dynamicFormEditForm/:operate/:id',
            views : {
                'dynamicFormEditForm@main.list' : angularAMD.route({
                	controller:'dynamicFormFormController',
                    controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormForm.js'],
                    templateUrl : 'simple/view/dynamicForm/html/dynamicForm/DynamicFormForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'dynamicFormEditForm',
                    name:'编辑动态表单',
                    route:'main.list.dynamicForm.dynamicFormEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.dynamicForm.dynamicFormDisplay',angularAMD.route({
			url : '/dynamicFormDisplay/:id',
            views : {
                'dynamicFormDisplay@main.list' : angularAMD.route({
                	controller:'dynamicFormDisplayController',
					controllerUrl : ['simple/view/dynamicForm/js/dynamicForm/DynamicFormDisplay.js'],
                    templateUrl : 'simple/view/dynamicForm/html/dynamicForm/DynamicFormDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'dynamicFormDisplay',
					name:'查看动态表单',
					route:'main.list.dynamicForm.dynamicFormDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\dynamicForm\js\dynamicForm\DynamicForm.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\entityTips\js\entityTips\EntityTips.route.js
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
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\entityTips\js\entityTips\EntityTips.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\exporterConfig\js\exporterConfig\ExporterConfig.route.js
		.state('main.list.exporterConfig',angularAMD.route({
			url : '/exporterConfig',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigService.js']
				})
			}
		}))
		.state('main.list.exporterConfig.exporterConfigList',angularAMD.route({
             url : '/exporterConfigList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'exporterConfigList',
 					name:'数据导入导出配置管理',
 					route:'main.list.exporterConfig.exporterConfigList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'exporterConfigList@main.list' : angularAMD.route({
                	 controller:'exporterConfigListController',
 					 controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigList.js'],
                     templateUrl : 'simple/view/exporterConfig/html/exporterConfig/ExporterConfigList.html'
                 })
             }
		}))
		.state('main.list.exporterConfig.exporterConfigAddForm',angularAMD.route({
             url : '/exporterConfigAddForm/:operate',
             views : {
                'exporterConfigAddForm@main.list' : angularAMD.route({
                	controller:'exporterConfigFormController',
 					controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigForm.js'],
                    templateUrl : 'simple/view/exporterConfig/html/exporterConfig/ExporterConfigForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'exporterConfigAddForm',
 					name:'新增数据导入导出配置',
 					route:'main.list.exporterConfig.exporterConfigAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.exporterConfig.exporterConfigEditForm',angularAMD.route({
            url : '/exporterConfigEditForm/:operate/:id',
            views : {
                'exporterConfigEditForm@main.list' : angularAMD.route({
                	controller:'exporterConfigFormController',
                    controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigForm.js'],
                    templateUrl : 'simple/view/exporterConfig/html/exporterConfig/ExporterConfigForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'exporterConfigEditForm',
                    name:'编辑数据导入导出配置',
                    route:'main.list.exporterConfig.exporterConfigEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.exporterConfig.exporterConfigDisplay',angularAMD.route({
			url : '/exporterConfigDisplay/:id',
            views : {
                'exporterConfigDisplay@main.list' : angularAMD.route({
                	controller:'exporterConfigDisplayController',
					controllerUrl : ['simple/view/exporterConfig/js/exporterConfig/ExporterConfigDisplay.js'],
                    templateUrl : 'simple/view/exporterConfig/html/exporterConfig/ExporterConfigDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'exporterConfigDisplay',
					name:'查看数据导入导出配置',
					route:'main.list.exporterConfig.exporterConfigDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\exporterConfig\js\exporterConfig\ExporterConfig.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\externalInterface\js\externalInterface\ExternalInterface.route.js
		.state('main.list.externalInterface',angularAMD.route({
			url : '/externalInterface',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceService.js']
				})
			}
		}))
		.state('main.list.externalInterface.externalInterfaceList',angularAMD.route({
             url : '/externalInterfaceList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'externalInterfaceList',
 					name:'外部接口管理',
 					route:'main.list.externalInterface.externalInterfaceList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'externalInterfaceList@main.list' : angularAMD.route({
                	 controller:'externalInterfaceListController',
 					 controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceList.js'],
                     templateUrl : 'simple/view/externalInterface/html/externalInterface/ExternalInterfaceList.html'
                 })
             }
		}))
		.state('main.list.externalInterface.externalInterfaceAddForm',angularAMD.route({
             url : '/externalInterfaceAddForm/:operate',
             views : {
                'externalInterfaceAddForm@main.list' : angularAMD.route({
                	controller:'externalInterfaceFormController',
 					controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceForm.js'],
                    templateUrl : 'simple/view/externalInterface/html/externalInterface/ExternalInterfaceForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'externalInterfaceAddForm',
 					name:'新增外部接口',
 					route:'main.list.externalInterface.externalInterfaceAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.externalInterface.externalInterfaceEditForm',angularAMD.route({
            url : '/externalInterfaceEditForm/:operate/:id',
            views : {
                'externalInterfaceEditForm@main.list' : angularAMD.route({
                	controller:'externalInterfaceFormController',
                    controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceForm.js'],
                    templateUrl : 'simple/view/externalInterface/html/externalInterface/ExternalInterfaceForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'externalInterfaceEditForm',
                    name:'编辑外部接口',
                    route:'main.list.externalInterface.externalInterfaceEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.externalInterface.externalInterfaceDisplay',angularAMD.route({
			url : '/externalInterfaceDisplay/:id',
            views : {
                'externalInterfaceDisplay@main.list' : angularAMD.route({
                	controller:'externalInterfaceDisplayController',
					controllerUrl : ['simple/view/externalInterface/js/externalInterface/ExternalInterfaceDisplay.js'],
                    templateUrl : 'simple/view/externalInterface/html/externalInterface/ExternalInterfaceDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'externalInterfaceDisplay',
					name:'查看外部接口',
					route:'main.list.externalInterface.externalInterfaceDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\externalInterface\js\externalInterface\ExternalInterface.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\importConfigs\js\importConfigs\ImportConfigs.route.js
		.state('main.list.importConfigs',angularAMD.route({
			url : '/importConfigs',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsService.js']
				})
			}
		}))
		.state('main.list.importConfigs.importConfigsList',angularAMD.route({
             url : '/importConfigsList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'importConfigsList',
 					name:'导入配置管理',
 					route:'main.list.importConfigs.importConfigsList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'importConfigsList@main.list' : angularAMD.route({
                	 controller:'importConfigsListController',
 					 controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsList.js'],
                     templateUrl : 'simple/view/importConfigs/html/importConfigs/ImportConfigsList.html'
                 })
             }
		}))
		.state('main.list.importConfigs.importConfigsAddForm',angularAMD.route({
             url : '/importConfigsAddForm/:operate',
             views : {
                'importConfigsAddForm@main.list' : angularAMD.route({
                	controller:'importConfigsFormController',
 					controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsForm.js'],
                    templateUrl : 'simple/view/importConfigs/html/importConfigs/ImportConfigsForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'importConfigsAddForm',
 					name:'新增导入配置',
 					route:'main.list.importConfigs.importConfigsAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.importConfigs.importConfigsEditForm',angularAMD.route({
            url : '/importConfigsEditForm/:operate/:id',
            views : {
                'importConfigsEditForm@main.list' : angularAMD.route({
                	controller:'importConfigsFormController',
                    controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsForm.js'],
                    templateUrl : 'simple/view/importConfigs/html/importConfigs/ImportConfigsForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'importConfigsEditForm',
                    name:'编辑导入配置',
                    route:'main.list.importConfigs.importConfigsEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.importConfigs.importConfigsDisplay',angularAMD.route({
			url : '/importConfigsDisplay/:id',
            views : {
                'importConfigsDisplay@main.list' : angularAMD.route({
                	controller:'importConfigsDisplayController',
					controllerUrl : ['simple/view/importConfigs/js/importConfigs/ImportConfigsDisplay.js'],
                    templateUrl : 'simple/view/importConfigs/html/importConfigs/ImportConfigsDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'importConfigsDisplay',
					name:'查看导入配置',
					route:'main.list.importConfigs.importConfigsDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\importConfigs\js\importConfigs\ImportConfigs.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\listView\js\dataSource\DataSource.route.js
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
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\listView\js\dataSource\DataSource.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\listView\js\reportView\ReportView.route.js
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
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\listView\js\reportView\ReportView.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\log\js\log\Log.route.js
		.state('main.list.log',angularAMD.route({
			url : '/log',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/log/js/log/LogService.js']
				})
			}
		}))
		.state('main.list.log.logList',angularAMD.route({
             url : '/logList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'logList',
 					name:'log管理',
 					route:'main.list.log.logList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'logList@main.list' : angularAMD.route({
                	 controller:'logListController',
 					 controllerUrl : ['simple/view/log/js/log/LogList.js'],
                     templateUrl : 'simple/view/log/html/log/LogList.html'
                 })
             }
		}))
		.state('main.list.log.logAddForm',angularAMD.route({
             url : '/logAddForm/:operate',
             views : {
                'logAddForm@main.list' : angularAMD.route({
                	controller:'logFormController',
 					controllerUrl : ['simple/view/log/js/log/LogForm.js'],
                    templateUrl : 'simple/view/log/html/log/LogForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'logAddForm',
 					name:'新增log',
 					route:'main.list.log.logAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.log.logEditForm',angularAMD.route({
            url : '/logEditForm/:operate/:id',
            views : {
                'logEditForm@main.list' : angularAMD.route({
                	controller:'logFormController',
                    controllerUrl : ['simple/view/log/js/log/LogForm.js'],
                    templateUrl : 'simple/view/log/html/log/LogForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'logEditForm',
                    name:'编辑log',
                    route:'main.list.log.logEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.log.logDisplay',angularAMD.route({
			url : '/logDisplay/:id',
            views : {
                'logDisplay@main.list' : angularAMD.route({
                	controller:'logDisplayController',
					controllerUrl : ['simple/view/log/js/log/LogDisplay.js'],
                    templateUrl : 'simple/view/log/html/log/LogDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'logDisplay',
					name:'查看log',
					route:'main.list.log.logDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\log\js\log\Log.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\member\js\member\Member.route.js
		.state('main.list.member',angularAMD.route({
			url : '/member',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/member/js/member/MemberService.js']
				})
			}
		}))
		.state('main.list.member.memberList',angularAMD.route({
             url : '/memberList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'memberList',
 					name:'会员管理',
 					route:'main.list.member.memberList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'memberList@main.list' : angularAMD.route({
                	 controller:'memberListController',
 					 controllerUrl : ['simple/view/member/js/member/MemberList.js'],
                     templateUrl : 'simple/view/member/html/member/MemberList.html'
                 })
             }
		}))
		.state('main.list.member.memberAddForm',angularAMD.route({
             url : '/memberAddForm/:operate',
             views : {
                'memberAddForm@main.list' : angularAMD.route({
                	controller:'memberFormController',
 					controllerUrl : ['simple/view/member/js/member/MemberForm.js'],
                    templateUrl : 'simple/view/member/html/member/MemberForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'memberAddForm',
 					name:'新增会员',
 					route:'main.list.member.memberAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.member.memberEditForm',angularAMD.route({
            url : '/memberEditForm/:operate/:id',
            views : {
                'memberEditForm@main.list' : angularAMD.route({
                	controller:'memberFormController',
                    controllerUrl : ['simple/view/member/js/member/MemberForm.js'],
                    templateUrl : 'simple/view/member/html/member/MemberForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'memberEditForm',
                    name:'编辑会员',
                    route:'main.list.member.memberEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.member.memberDisplay',angularAMD.route({
			url : '/memberDisplay/:id',
            views : {
                'memberDisplay@main.list' : angularAMD.route({
                	controller:'memberDisplayController',
					controllerUrl : ['simple/view/member/js/member/MemberDisplay.js'],
                    templateUrl : 'simple/view/member/html/member/MemberDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'memberDisplay',
					name:'查看会员',
					route:'main.list.member.memberDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\member\js\member\Member.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\member\js\memberType\MemberType.route.js
		.state('main.list.memberType',angularAMD.route({
			url : '/memberType',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/member/js/memberType/MemberTypeService.js']
				})
			}
		}))
		.state('main.list.memberType.memberTypeList',angularAMD.route({
             url : '/memberTypeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'memberTypeList',
 					name:'会员类别管理',
 					route:'main.list.memberType.memberTypeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'memberTypeList@main.list' : angularAMD.route({
                	 controller:'memberTypeListController',
 					 controllerUrl : ['simple/view/member/js/memberType/MemberTypeList.js'],
                     templateUrl : 'simple/view/member/html/memberType/MemberTypeList.html'
                 })
             }
		}))
		.state('main.list.memberType.memberTypeAddForm',angularAMD.route({
             url : '/memberTypeAddForm/:operate',
             views : {
                'memberTypeAddForm@main.list' : angularAMD.route({
                	controller:'memberTypeFormController',
 					controllerUrl : ['simple/view/member/js/memberType/MemberTypeForm.js'],
                    templateUrl : 'simple/view/member/html/memberType/MemberTypeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'memberTypeAddForm',
 					name:'新增会员类别',
 					route:'main.list.memberType.memberTypeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.memberType.memberTypeEditForm',angularAMD.route({
            url : '/memberTypeEditForm/:operate/:id',
            views : {
                'memberTypeEditForm@main.list' : angularAMD.route({
                	controller:'memberTypeFormController',
                    controllerUrl : ['simple/view/member/js/memberType/MemberTypeForm.js'],
                    templateUrl : 'simple/view/member/html/memberType/MemberTypeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'memberTypeEditForm',
                    name:'编辑会员类别',
                    route:'main.list.memberType.memberTypeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.memberType.memberTypeDisplay',angularAMD.route({
			url : '/memberTypeDisplay/:id',
            views : {
                'memberTypeDisplay@main.list' : angularAMD.route({
                	controller:'memberTypeDisplayController',
					controllerUrl : ['simple/view/member/js/memberType/MemberTypeDisplay.js'],
                    templateUrl : 'simple/view/member/html/memberType/MemberTypeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'memberTypeDisplay',
					name:'查看会员类别',
					route:'main.list.memberType.memberTypeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\member\js\memberType\MemberType.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\memberGroup\js\memberGroup\MemberGroup.route.js
		.state('main.list.memberGroup',angularAMD.route({
			url : '/memberGroup',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupService.js']
				})
			}
		}))
		.state('main.list.memberGroup.memberGroupList',angularAMD.route({
             url : '/memberGroupList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'memberGroupList',
 					name:'会员组管理',
 					route:'main.list.memberGroup.memberGroupList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'memberGroupList@main.list' : angularAMD.route({
                	 controller:'memberGroupListController',
 					 controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupList.js'],
                     templateUrl : 'simple/view/memberGroup/html/memberGroup/MemberGroupList.html'
                 })
             }
		}))
		.state('main.list.memberGroup.memberGroupAddForm',angularAMD.route({
             url : '/memberGroupAddForm/:operate',
             views : {
                'memberGroupAddForm@main.list' : angularAMD.route({
                	controller:'memberGroupFormController',
 					controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupForm.js'],
                    templateUrl : 'simple/view/memberGroup/html/memberGroup/MemberGroupForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'memberGroupAddForm',
 					name:'新增会员组',
 					route:'main.list.memberGroup.memberGroupAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.memberGroup.memberGroupEditForm',angularAMD.route({
            url : '/memberGroupEditForm/:operate/:id',
            views : {
                'memberGroupEditForm@main.list' : angularAMD.route({
                	controller:'memberGroupFormController',
                    controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupForm.js'],
                    templateUrl : 'simple/view/memberGroup/html/memberGroup/MemberGroupForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'memberGroupEditForm',
                    name:'编辑会员组',
                    route:'main.list.memberGroup.memberGroupEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.memberGroup.memberGroupDisplay',angularAMD.route({
			url : '/memberGroupDisplay/:id',
            views : {
                'memberGroupDisplay@main.list' : angularAMD.route({
                	controller:'memberGroupDisplayController',
					controllerUrl : ['simple/view/memberGroup/js/memberGroup/MemberGroupDisplay.js'],
                    templateUrl : 'simple/view/memberGroup/html/memberGroup/MemberGroupDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'memberGroupDisplay',
					name:'查看会员组',
					route:'main.list.memberGroup.memberGroupDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\memberGroup\js\memberGroup\MemberGroup.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\modelFile\js\modelFile\ModelFile.route.js
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
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\modelFile\js\modelFile\ModelFile.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\department\Department.route.js
		.state('main.list.department',angularAMD.route({
			url : '/department',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/department/DepartmentService.js']
				})
			}
		}))
		.state('main.list.department.departmentList',angularAMD.route({
             url : '/departmentList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'departmentList',
 					name:'部门管理',
 					route:'main.list.department.departmentList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'departmentList@main.list' : angularAMD.route({
                	 controller:'departmentListController',
 					 controllerUrl : ['simple/view/organization/js/department/DepartmentList.js'],
                     templateUrl : 'simple/view/organization/html/department/DepartmentList.html'
                 })
             }
		}))
		.state('main.list.department.departmentAddForm',angularAMD.route({
             url : '/departmentAddForm/:operate',
             views : {
                'departmentAddForm@main.list' : angularAMD.route({
                	controller:'departmentFormController',
 					controllerUrl : ['simple/view/organization/js/department/DepartmentForm.js'],
                    templateUrl : 'simple/view/organization/html/department/DepartmentForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'departmentAddForm',
 					name:'新增部门',
 					route:'main.list.department.departmentAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.department.departmentEditForm',angularAMD.route({
            url : '/departmentEditForm/:operate/:id',
            views : {
                'departmentEditForm@main.list' : angularAMD.route({
                	controller:'departmentFormController',
                    controllerUrl : ['simple/view/organization/js/department/DepartmentForm.js'],
                    templateUrl : 'simple/view/organization/html/department/DepartmentForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'departmentEditForm',
                    name:'编辑部门',
                    route:'main.list.department.departmentEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.department.departmentDisplay',angularAMD.route({
			url : '/departmentDisplay/:id',
            views : {
                'departmentDisplay@main.list' : angularAMD.route({
                	controller:'departmentDisplayController',
					controllerUrl : ['simple/view/organization/js/department/DepartmentDisplay.js'],
                    templateUrl : 'simple/view/organization/html/department/DepartmentDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'departmentDisplay',
					name:'查看部门',
					route:'main.list.department.departmentDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\department\Department.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\employee\Employee.route.js
		.state('main.list.employee',angularAMD.route({
			url : '/employee',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/employee/EmployeeService.js']
				})
			}
		}))
		.state('main.list.employee.employeeList',angularAMD.route({
             url : '/employeeList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'employeeList',
 					name:'职员管理',
 					route:'main.list.employee.employeeList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'employeeList@main.list' : angularAMD.route({
                	 controller:'employeeListController',
 					 controllerUrl : ['simple/view/organization/js/employee/EmployeeList.js'],
                     templateUrl : 'simple/view/organization/html/employee/EmployeeList.html'
                 })
             }
		}))
		.state('main.list.employee.employeeAddForm',angularAMD.route({
             url : '/employeeAddForm/:operate',
             views : {
                'employeeAddForm@main.list' : angularAMD.route({
                	controller:'employeeFormController',
 					controllerUrl : ['simple/view/organization/js/employee/EmployeeForm.js'],
                    templateUrl : 'simple/view/organization/html/employee/EmployeeForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'employeeAddForm',
 					name:'新增职员',
 					route:'main.list.employee.employeeAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.employee.employeeEditForm',angularAMD.route({
            url : '/employeeEditForm/:operate/:id',
            views : {
                'employeeEditForm@main.list' : angularAMD.route({
                	controller:'employeeFormController',
                    controllerUrl : ['simple/view/organization/js/employee/EmployeeForm.js'],
                    templateUrl : 'simple/view/organization/html/employee/EmployeeForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'employeeEditForm',
                    name:'编辑职员',
                    route:'main.list.employee.employeeEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.employee.employeeDisplay',angularAMD.route({
			url : '/employeeDisplay/:id',
            views : {
                'employeeDisplay@main.list' : angularAMD.route({
                	controller:'employeeDisplayController',
					controllerUrl : ['simple/view/organization/js/employee/EmployeeDisplay.js'],
                    templateUrl : 'simple/view/organization/html/employee/EmployeeDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'employeeDisplay',
					name:'查看职员',
					route:'main.list.employee.employeeDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\employee\Employee.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\entityProperty\EntityProperty.route.js
		.state('main.list.entityProperty',angularAMD.route({
			url : '/entityProperty',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyService.js']
				})
			}
		}))
		.state('main.list.entityProperty.entityPropertyList',angularAMD.route({
             url : '/entityPropertyList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'entityPropertyList',
 					name:'实体属性管理',
 					route:'main.list.entityProperty.entityPropertyList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'entityPropertyList@main.list' : angularAMD.route({
                	 controller:'entityPropertyListController',
 					 controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyList.js'],
                     templateUrl : 'simple/view/organization/html/entityProperty/EntityPropertyList.html'
                 })
             }
		}))
		.state('main.list.entityProperty.entityPropertyAddForm',angularAMD.route({
             url : '/entityPropertyAddForm/:operate',
             views : {
                'entityPropertyAddForm@main.list' : angularAMD.route({
                	controller:'entityPropertyFormController',
 					controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyForm.js'],
                    templateUrl : 'simple/view/organization/html/entityProperty/EntityPropertyForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'entityPropertyAddForm',
 					name:'新增实体属性',
 					route:'main.list.entityProperty.entityPropertyAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.entityProperty.entityPropertyEditForm',angularAMD.route({
            url : '/entityPropertyEditForm/:operate/:id',
            views : {
                'entityPropertyEditForm@main.list' : angularAMD.route({
                	controller:'entityPropertyFormController',
                    controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyForm.js'],
                    templateUrl : 'simple/view/organization/html/entityProperty/EntityPropertyForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'entityPropertyEditForm',
                    name:'编辑实体属性',
                    route:'main.list.entityProperty.entityPropertyEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.entityProperty.entityPropertyDisplay',angularAMD.route({
			url : '/entityPropertyDisplay/:id',
            views : {
                'entityPropertyDisplay@main.list' : angularAMD.route({
                	controller:'entityPropertyDisplayController',
					controllerUrl : ['simple/view/organization/js/entityProperty/EntityPropertyDisplay.js'],
                    templateUrl : 'simple/view/organization/html/entityProperty/EntityPropertyDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'entityPropertyDisplay',
					name:'查看实体属性',
					route:'main.list.entityProperty.entityPropertyDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\entityProperty\EntityProperty.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\entityPropertyDefine\EntityPropertyDefine.route.js
		.state('main.list.entityPropertyDefine',angularAMD.route({
			url : '/entityPropertyDefine',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineService.js']
				})
			}
		}))
		.state('main.list.entityPropertyDefine.entityPropertyDefineList',angularAMD.route({
             url : '/entityPropertyDefineList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'entityPropertyDefineList',
 					name:'实体属性定义管理',
 					route:'main.list.entityPropertyDefine.entityPropertyDefineList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'entityPropertyDefineList@main.list' : angularAMD.route({
                	 controller:'entityPropertyDefineListController',
 					 controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineList.js'],
                     templateUrl : 'simple/view/organization/html/entityPropertyDefine/EntityPropertyDefineList.html'
                 })
             }
		}))
		.state('main.list.entityPropertyDefine.entityPropertyDefineAddForm',angularAMD.route({
             url : '/entityPropertyDefineAddForm/:operate',
             views : {
                'entityPropertyDefineAddForm@main.list' : angularAMD.route({
                	controller:'entityPropertyDefineFormController',
 					controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineForm.js'],
                    templateUrl : 'simple/view/organization/html/entityPropertyDefine/EntityPropertyDefineForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'entityPropertyDefineAddForm',
 					name:'新增实体属性定义',
 					route:'main.list.entityPropertyDefine.entityPropertyDefineAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.entityPropertyDefine.entityPropertyDefineEditForm',angularAMD.route({
            url : '/entityPropertyDefineEditForm/:operate/:id',
            views : {
                'entityPropertyDefineEditForm@main.list' : angularAMD.route({
                	controller:'entityPropertyDefineFormController',
                    controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineForm.js'],
                    templateUrl : 'simple/view/organization/html/entityPropertyDefine/EntityPropertyDefineForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'entityPropertyDefineEditForm',
                    name:'编辑实体属性定义',
                    route:'main.list.entityPropertyDefine.entityPropertyDefineEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.entityPropertyDefine.entityPropertyDefineDisplay',angularAMD.route({
			url : '/entityPropertyDefineDisplay/:id',
            views : {
                'entityPropertyDefineDisplay@main.list' : angularAMD.route({
                	controller:'entityPropertyDefineDisplayController',
					controllerUrl : ['simple/view/organization/js/entityPropertyDefine/EntityPropertyDefineDisplay.js'],
                    templateUrl : 'simple/view/organization/html/entityPropertyDefine/EntityPropertyDefineDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'entityPropertyDefineDisplay',
					name:'查看实体属性定义',
					route:'main.list.entityPropertyDefine.entityPropertyDefineDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\entityPropertyDefine\EntityPropertyDefine.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\organization\Organization.route.js
		.state('main.list.organization',angularAMD.route({
			url : '/organization',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/organization/OrganizationService.js']
				})
			}
		}))
		.state('main.list.organization.organizationList',angularAMD.route({
             url : '/organizationList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'organizationList',
 					name:'单位管理',
 					route:'main.list.organization.organizationList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'organizationList@main.list' : angularAMD.route({
                	 controller:'organizationListController',
 					 controllerUrl : ['simple/view/organization/js/organization/OrganizationList.js'],
                     templateUrl : 'simple/view/organization/html/organization/OrganizationList.html'
                 })
             }
		}))
		.state('main.list.organization.organizationAddForm',angularAMD.route({
             url : '/organizationAddForm/:operate',
             views : {
                'organizationAddForm@main.list' : angularAMD.route({
                	controller:'organizationFormController',
 					controllerUrl : ['simple/view/organization/js/organization/OrganizationForm.js'],
                    templateUrl : 'simple/view/organization/html/organization/OrganizationForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'organizationAddForm',
 					name:'新增单位',
 					route:'main.list.organization.organizationAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.organization.organizationEditForm',angularAMD.route({
            url : '/organizationEditForm/:operate/:id',
            views : {
                'organizationEditForm@main.list' : angularAMD.route({
                	controller:'organizationFormController',
                    controllerUrl : ['simple/view/organization/js/organization/OrganizationForm.js'],
                    templateUrl : 'simple/view/organization/html/organization/OrganizationForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'organizationEditForm',
                    name:'编辑单位',
                    route:'main.list.organization.organizationEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.organization.organizationDisplay',angularAMD.route({
			url : '/organizationDisplay/:id',
            views : {
                'organizationDisplay@main.list' : angularAMD.route({
                	controller:'organizationDisplayController',
					controllerUrl : ['simple/view/organization/js/organization/OrganizationDisplay.js'],
                    templateUrl : 'simple/view/organization/html/organization/OrganizationDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'organizationDisplay',
					name:'查看单位',
					route:'main.list.organization.organizationDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\organization\js\organization\Organization.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\outInterface\js\outInterfaceConfig\OutInterfaceConfig.route.js
		.state('main.list.outInterfaceConfig',angularAMD.route({
			url : '/outInterfaceConfig',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigService.js']
				})
			}
		}))
		.state('main.list.outInterfaceConfig.outInterfaceConfigList',angularAMD.route({
             url : '/outInterfaceConfigList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'outInterfaceConfigList',
 					name:'外部接口配置管理',
 					route:'main.list.outInterfaceConfig.outInterfaceConfigList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'outInterfaceConfigList@main.list' : angularAMD.route({
                	 controller:'outInterfaceConfigListController',
 					 controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigList.js'],
                     templateUrl : 'simple/view/outInterface/html/outInterfaceConfig/OutInterfaceConfigList.html'
                 })
             }
		}))
		.state('main.list.outInterfaceConfig.outInterfaceConfigAddForm',angularAMD.route({
             url : '/outInterfaceConfigAddForm/:operate',
             views : {
                'outInterfaceConfigAddForm@main.list' : angularAMD.route({
                	controller:'outInterfaceConfigFormController',
 					controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigForm.js'],
                    templateUrl : 'simple/view/outInterface/html/outInterfaceConfig/OutInterfaceConfigForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'outInterfaceConfigAddForm',
 					name:'新增外部接口配置',
 					route:'main.list.outInterfaceConfig.outInterfaceConfigAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.outInterfaceConfig.outInterfaceConfigEditForm',angularAMD.route({
            url : '/outInterfaceConfigEditForm/:operate/:id',
            views : {
                'outInterfaceConfigEditForm@main.list' : angularAMD.route({
                	controller:'outInterfaceConfigFormController',
                    controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigForm.js'],
                    templateUrl : 'simple/view/outInterface/html/outInterfaceConfig/OutInterfaceConfigForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'outInterfaceConfigEditForm',
                    name:'编辑外部接口配置',
                    route:'main.list.outInterfaceConfig.outInterfaceConfigEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.outInterfaceConfig.outInterfaceConfigDisplay',angularAMD.route({
			url : '/outInterfaceConfigDisplay/:id',
            views : {
                'outInterfaceConfigDisplay@main.list' : angularAMD.route({
                	controller:'outInterfaceConfigDisplayController',
					controllerUrl : ['simple/view/outInterface/js/outInterfaceConfig/OutInterfaceConfigDisplay.js'],
                    templateUrl : 'simple/view/outInterface/html/outInterfaceConfig/OutInterfaceConfigDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'outInterfaceConfigDisplay',
					name:'查看外部接口配置',
					route:'main.list.outInterfaceConfig.outInterfaceConfigDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\outInterface\js\outInterfaceConfig\OutInterfaceConfig.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\permission\js\module\Module.route.js
		.state('main.list.module',angularAMD.route({
			url : '/module',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/permission/js/module/ModuleService.js']
				})
			}
		}))
		.state('main.list.module.moduleList',angularAMD.route({
             url : '/moduleList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'moduleList',
 					name:'模块管理',
 					route:'main.list.module.moduleList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'moduleList@main.list' : angularAMD.route({
                	 controller:'moduleListController',
 					 controllerUrl : ['simple/view/permission/js/module/ModuleList.js'],
                     templateUrl : 'simple/view/permission/html/module/ModuleList.html'
                 })
             }
		}))
		.state('main.list.module.moduleAddForm',angularAMD.route({
             url : '/moduleAddForm/:operate',
             views : {
                'moduleAddForm@main.list' : angularAMD.route({
                	controller:'moduleFormController',
 					controllerUrl : ['simple/view/permission/js/module/ModuleForm.js'],
                    templateUrl : 'simple/view/permission/html/module/ModuleForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'moduleAddForm',
 					name:'新增模块',
 					route:'main.list.module.moduleAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.module.moduleEditForm',angularAMD.route({
            url : '/moduleEditForm/:operate/:id',
            views : {
                'moduleEditForm@main.list' : angularAMD.route({
                	controller:'moduleFormController',
                    controllerUrl : ['simple/view/permission/js/module/ModuleForm.js'],
                    templateUrl : 'simple/view/permission/html/module/ModuleForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'moduleEditForm',
                    name:'编辑模块',
                    route:'main.list.module.moduleEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.module.moduleDisplay',angularAMD.route({
			url : '/moduleDisplay/:id',
            views : {
                'moduleDisplay@main.list' : angularAMD.route({
                	controller:'moduleDisplayController',
					controllerUrl : ['simple/view/permission/js/module/ModuleDisplay.js'],
                    templateUrl : 'simple/view/permission/html/module/ModuleDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'moduleDisplay',
					name:'查看模块',
					route:'main.list.module.moduleDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\permission\js\module\Module.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\permission\js\operator\Operator.route.js
		.state('main.list.operator',angularAMD.route({
			url : '/operator',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/permission/js/operator/OperatorService.js']
				})
			}
		}))
		.state('main.list.operator.operatorList',angularAMD.route({
             url : '/operatorList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'operatorList',
 					name:'操作员管理',
 					route:'main.list.operator.operatorList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'operatorList@main.list' : angularAMD.route({
                	 controller:'operatorListController',
 					 controllerUrl : ['simple/view/permission/js/operator/OperatorList.js'],
                     templateUrl : 'simple/view/permission/html/operator/OperatorList.html'
                 })
             }
		}))
		.state('main.list.operator.operatorAddForm',angularAMD.route({
             url : '/operatorAddForm/:operate',
             views : {
                'operatorAddForm@main.list' : angularAMD.route({
                	controller:'operatorFormController',
 					controllerUrl : ['simple/view/permission/js/operator/OperatorForm.js'],
                    templateUrl : 'simple/view/permission/html/operator/OperatorForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'operatorAddForm',
 					name:'新增操作员',
 					route:'main.list.operator.operatorAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.operator.operatorEditForm',angularAMD.route({
            url : '/operatorEditForm/:operate/:id',
            views : {
                'operatorEditForm@main.list' : angularAMD.route({
                	controller:'operatorFormController',
                    controllerUrl : ['simple/view/permission/js/operator/OperatorForm.js'],
                    templateUrl : 'simple/view/permission/html/operator/OperatorForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'operatorEditForm',
                    name:'编辑操作员',
                    route:'main.list.operator.operatorEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.operator.operatorDisplay',angularAMD.route({
			url : '/operatorDisplay/:id',
            views : {
                'operatorDisplay@main.list' : angularAMD.route({
                	controller:'operatorDisplayController',
					controllerUrl : ['simple/view/permission/js/operator/OperatorDisplay.js'],
                    templateUrl : 'simple/view/permission/html/operator/OperatorDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'operatorDisplay',
					name:'查看操作员',
					route:'main.list.operator.operatorDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
    .state('main.list.operator.assignRoles',angularAMD.route({
        url : '/assignRoles/:id/:name',
        views : {
            'assignRoles@main.list' : angularAMD.route({
                templateUrl : 'simple/view/permission/html/operator/AssignRole.html',
                controllerUrl : ['simple/view/organization/js/organization/OrganizationService.js',
				                 'simple/view/permission/js/role/RoleService.js',
				                 'simple/view/permission/js/operator/AssignRole.js']
            })
        },
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'assignRoles',
                name:'分配角色',
                route:'main.list.operator.assignRoles'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\permission\js\operator\Operator.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\permission\js\permission\Permission.route.js
		.state('main.list.permission',angularAMD.route({
			url : '/permission',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/permission/js/permission/PermissionService.js']
				})
			}
		}))
		.state('main.list.permission.permissionList',angularAMD.route({
             url : '/permissionList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'permissionList',
 					name:'权限管理',
 					route:'main.list.permission.permissionList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'permissionList@main.list' : angularAMD.route({
                	 controller:'permissionListController',
 					 controllerUrl : ['simple/view/permission/js/permission/PermissionList.js'],
                     templateUrl : 'simple/view/permission/html/permission/PermissionList.html'
                 })
             }
		}))
		.state('main.list.permission.permissionAddForm',angularAMD.route({
             url : '/permissionAddForm/:operate',
             views : {
                'permissionAddForm@main.list' : angularAMD.route({
                	controller:'permissionFormController',
 					controllerUrl : ['simple/view/permission/js/permission/PermissionForm.js'],
                    templateUrl : 'simple/view/permission/html/permission/PermissionForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'permissionAddForm',
 					name:'新增权限',
 					route:'main.list.permission.permissionAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.permission.permissionEditForm',angularAMD.route({
            url : '/permissionEditForm/:operate/:id',
            views : {
                'permissionEditForm@main.list' : angularAMD.route({
                	controller:'permissionFormController',
                    controllerUrl : ['simple/view/permission/js/permission/PermissionForm.js'],
                    templateUrl : 'simple/view/permission/html/permission/PermissionForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'permissionEditForm',
                    name:'编辑权限',
                    route:'main.list.permission.permissionEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.permission.permissionDisplay',angularAMD.route({
			url : '/permissionDisplay/:id',
            views : {
                'permissionDisplay@main.list' : angularAMD.route({
                	controller:'permissionDisplayController',
					controllerUrl : ['simple/view/permission/js/permission/PermissionDisplay.js'],
                    templateUrl : 'simple/view/permission/html/permission/PermissionDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'permissionDisplay',
					name:'查看权限',
					route:'main.list.permission.permissionDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\permission\js\permission\Permission.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\permission\js\role\Role.route.js
		.state('main.list.role',angularAMD.route({
			url : '/role',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/permission/js/role/RoleService.js']
				})
			}
		}))
		.state('main.list.role.roleList',angularAMD.route({
             url : '/roleList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'roleList',
 					name:'角色管理',
 					route:'main.list.role.roleList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'roleList@main.list' : angularAMD.route({
                	 controller:'roleListController',
 					 controllerUrl : ['simple/view/permission/js/role/RoleList.js'],
                     templateUrl : 'simple/view/permission/html/role/RoleList.html'
                 })
             }
		}))
		.state('main.list.role.roleAddForm',angularAMD.route({
             url : '/roleAddForm/:operate',
             views : {
                'roleAddForm@main.list' : angularAMD.route({
                	controller:'roleFormController',
 					controllerUrl : ['simple/view/permission/js/role/RoleForm.js'],
                    templateUrl : 'simple/view/permission/html/role/RoleForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'roleAddForm',
 					name:'新增角色',
 					route:'main.list.role.roleAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.role.roleEditForm',angularAMD.route({
            url : '/roleEditForm/:operate/:id',
            views : {
                'roleEditForm@main.list' : angularAMD.route({
                	controller:'roleFormController',
                    controllerUrl : ['simple/view/permission/js/role/RoleForm.js'],
                    templateUrl : 'simple/view/permission/html/role/RoleForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'roleEditForm',
                    name:'编辑角色',
                    route:'main.list.role.roleEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.role.roleDisplay',angularAMD.route({
			url : '/roleDisplay/:id',
            views : {
                'roleDisplay@main.list' : angularAMD.route({
                	controller:'roleDisplayController',
					controllerUrl : ['simple/view/permission/js/role/RoleDisplay.js'],
                    templateUrl : 'simple/view/permission/html/role/RoleDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'roleDisplay',
					name:'查看角色',
					route:'main.list.role.roleDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))

    .state('main.list.role.assignPermissions',angularAMD.route({
        url : '/assignPermissions/:id/:name',
        views : {
            'assignPermissions@main.list' : angularAMD.route({
                templateUrl : 'simple/view/permission/html/role/AssignPermission.html',
                controllerUrl : [ 'simple/view/permission/js/permission/PermissionService.js',
				                  'simple/view/permission/js/module/ModuleService.js',
				                  'simple/view/permission/js/role/AssignPermission.js']
            })
        },
	    onEnter: function($rootScope,$stateParams){
	    	var model  ={
	    			eId:'assignPermissions',
	    			name:'分配权限点',
	    			route:'main.list.role.assignPermissions'
	    	}
	    	$rootScope.selectModule(model,$stateParams);
	    }
    }))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\permission\js\role\Role.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\personalCenter\js\personalData\PersonalData.route.js
	.state('main.list.personalData',angularAMD.route({
			url : '/personalData',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/organization/js/employee/EmployeeService.js']
				})
			}
		}))
		.state('main.list.personalData.personalDataForm',angularAMD.route({
             url : '/personalDataForm',
             onEnter: function($rootScope) { 
            	 var model  = {
            			 eId:'personalDataForm',
            			 name:'编辑个人资料',
            			 route:'main.list.personalData.personalDataForm'
            	 }
            	 $rootScope.selectModule(model);
             },
			 views : {
                 'personalDataForm@main.list' : angularAMD.route({
                	 controller:'personalDataFormController',
 					 controllerUrl : ['simple/view/personalCenter/js/personalData/PersonalDataForm.js'],
                     templateUrl : 'simple/view/personalCenter/html/personalData/PersonalDataForm.html'
                 })
             }
		}))
		.state('main.list.personalData.personalDataDisplay',angularAMD.route({
             url : '/personalDataDisplay',
             onEnter: function($rootScope) { 
            	 var model  = {
            			 eId:'personalDataDisplay',
            			 name:'个人中心',
            			 route:'main.list.personalData.personalDataDisplay'
            	 }
            	 $rootScope.selectModule(model);
             },
			 views : {
                 'personalDataDisplay@main.list' : angularAMD.route({
                	 controller:'personalDataDisplayController',
 					 controllerUrl : ['simple/view/personalCenter/js/personalData/PersonalDataDisplay.js'],
                     templateUrl : 'simple/view/personalCenter/html/personalData/PersonalDataDisplay.html'
                 })
             }
		}))
		.state('main.list.personalData.modifyPasswordForm',angularAMD.route({
             url : '/modifyPasswordForm/:operate',
             onEnter: function($rootScope,$stateParams) {
            	 var model  ={
            			 eId:'modifyPasswordForm',
            			 name:'修改密码',
            			 route:'main.list.personalData.modifyPasswordForm'
            	 }
            	 $rootScope.selectModule(model,$stateParams);
             },
             views : {
                'modifyPasswordForm@main.list' : angularAMD.route({
                	controller:'modifyPasswordFormController',
	               	 controllerUrl : ['simple/view/personalCenter/js/personalData/ModifyPasswordForm.js'],
	                 templateUrl : 'simple/view/personalCenter/html/personalData/ModifyPasswordForm.html'
                })
             }
		}))
		
	
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\personalCenter\js\personalData\PersonalData.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\reportForm\js\reportForm\ReportForm.route.js
		.state('main.list.reportForm',angularAMD.route({
			url : '/reportForm',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormService.js']
				})
			}
		}))
		.state('main.list.reportForm.reportFormList',angularAMD.route({
             url : '/reportFormList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'reportFormList',
 					name:'报表模版管理',
 					route:'main.list.reportForm.reportFormList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'reportFormList@main.list' : angularAMD.route({
                	 controller:'reportFormListController',
 					 controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormList.js'],
                     templateUrl : 'simple/view/reportForm/html/reportForm/ReportFormList.html'
                 })
             }
		}))
		.state('main.list.reportForm.reportFormAddForm',angularAMD.route({
             url : '/reportFormAddForm/:operate',
             views : {
                'reportFormAddForm@main.list' : angularAMD.route({
                	controller:'reportFormFormController',
 					controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormForm.js'],
                    templateUrl : 'simple/view/reportForm/html/reportForm/ReportFormForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'reportFormAddForm',
 					name:'新增报表模版',
 					route:'main.list.reportForm.reportFormAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.reportForm.reportFormEditForm',angularAMD.route({
            url : '/reportFormEditForm/:operate/:id',
            views : {
                'reportFormEditForm@main.list' : angularAMD.route({
                	controller:'reportFormFormController',
                    controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormForm.js'],
                    templateUrl : 'simple/view/reportForm/html/reportForm/ReportFormForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'reportFormEditForm',
                    name:'编辑报表模版',
                    route:'main.list.reportForm.reportFormEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.reportForm.reportFormDisplay',angularAMD.route({
			url : '/reportFormDisplay/:id',
            views : {
                'reportFormDisplay@main.list' : angularAMD.route({
                	controller:'reportFormDisplayController',
					controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormDisplay.js'],
                    templateUrl : 'simple/view/reportForm/html/reportForm/ReportFormDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'reportFormDisplay',
					name:'查看报表模版',
					route:'main.list.reportForm.reportFormDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\reportForm\js\reportForm\ReportForm.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\reportForm\js\reportForm\reportPreview.route.js
       .state('main.list.reportFormPreview',angularAMD.route({
        url : '/reportFormPreview',
        views : {
            '@main' : angularAMD.route({
                controllerUrl : ['compents/reportForm/reportForm.js' ]
            })
        }
    }))
       .state('main.list.reportFormPreview.previewRoute',angularAMD.route({
        url : '/previewRoute/:modelFileKey/:withChart',
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'preview',
                name:'报表预览',
                route:'main.list.reportFormPreview.preview'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
    .state('main.list.reportFormPreview.preview',angularAMD.route({
        url : '/preview/:modelFileKey/:withChart',
        views : {
            'preview@main.list' : angularAMD.route({
                templateUrl:'simple/view/reportForm/html/reportForm/Preview.html',
                controllerUrl : ['simple/view/reportForm/js/reportForm/reportPreview.js',
                                 'simple/view/reportForm/js/reportForm/ReportFormService.js']
            })
        }
    }))
    
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\reportForm\js\reportForm\reportPreview.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\scheduleTask\js\scheduleTask\ScheduleTask.route.js
		.state('main.list.scheduleTask',angularAMD.route({
			url : '/scheduleTask',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskService.js']
				})
			}
		}))
		.state('main.list.scheduleTask.scheduleTaskList',angularAMD.route({
             url : '/scheduleTaskList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'scheduleTaskList',
 					name:'计划任务管理',
 					route:'main.list.scheduleTask.scheduleTaskList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'scheduleTaskList@main.list' : angularAMD.route({
                	 controller:'scheduleTaskListController',
 					 controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskList.js'],
                     templateUrl : 'simple/view/scheduleTask/html/scheduleTask/ScheduleTaskList.html'
                 })
             }
		}))
		.state('main.list.scheduleTask.scheduleTaskAddForm',angularAMD.route({
             url : '/scheduleTaskAddForm/:operate',
             views : {
                'scheduleTaskAddForm@main.list' : angularAMD.route({
                	controller:'scheduleTaskFormController',
 					controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskForm.js'],
                    templateUrl : 'simple/view/scheduleTask/html/scheduleTask/ScheduleTaskForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'scheduleTaskAddForm',
 					name:'新增计划任务',
 					route:'main.list.scheduleTask.scheduleTaskAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.scheduleTask.scheduleTaskEditForm',angularAMD.route({
            url : '/scheduleTaskEditForm/:operate/:id',
            views : {
                'scheduleTaskEditForm@main.list' : angularAMD.route({
                	controller:'scheduleTaskFormController',
                    controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskForm.js'],
                    templateUrl : 'simple/view/scheduleTask/html/scheduleTask/ScheduleTaskForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'scheduleTaskEditForm',
                    name:'编辑计划任务',
                    route:'main.list.scheduleTask.scheduleTaskEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.scheduleTask.scheduleTaskDisplay',angularAMD.route({
			url : '/scheduleTaskDisplay/:id',
            views : {
                'scheduleTaskDisplay@main.list' : angularAMD.route({
                	controller:'scheduleTaskDisplayController',
					controllerUrl : ['simple/view/scheduleTask/js/scheduleTask/ScheduleTaskDisplay.js'],
                    templateUrl : 'simple/view/scheduleTask/html/scheduleTask/ScheduleTaskDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'scheduleTaskDisplay',
					name:'查看计划任务',
					route:'main.list.scheduleTask.scheduleTaskDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\scheduleTask\js\scheduleTask\ScheduleTask.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\systemConfig\js\systemConfig\SystemConfig.route.js
		.state('main.list.systemConfig',angularAMD.route({
			url : '/systemConfig',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigService.js']
				})
			}
		}))
		.state('main.list.systemConfig.systemConfigList',angularAMD.route({
             url : '/systemConfigList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'systemConfigList',
 					name:'系统参数管理',
 					route:'main.list.systemConfig.systemConfigList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'systemConfigList@main.list' : angularAMD.route({
                	 controller:'systemConfigListController',
 					 controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigList.js'],
                     templateUrl : 'simple/view/systemConfig/html/systemConfig/SystemConfigList.html'
                 })
             }
		}))
		.state('main.list.systemConfig.systemConfigAddForm',angularAMD.route({
             url : '/systemConfigAddForm/:operate',
             views : {
                'systemConfigAddForm@main.list' : angularAMD.route({
                	controller:'systemConfigFormController',
 					controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigForm.js'],
                    templateUrl : 'simple/view/systemConfig/html/systemConfig/SystemConfigForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'systemConfigAddForm',
 					name:'新增系统参数',
 					route:'main.list.systemConfig.systemConfigAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.systemConfig.systemConfigEditForm',angularAMD.route({
            url : '/systemConfigEditForm/:operate/:id',
            views : {
                'systemConfigEditForm@main.list' : angularAMD.route({
                	controller:'systemConfigFormController',
                    controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigForm.js'],
                    templateUrl : 'simple/view/systemConfig/html/systemConfig/SystemConfigForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'systemConfigEditForm',
                    name:'编辑系统参数',
                    route:'main.list.systemConfig.systemConfigEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.systemConfig.systemConfigDisplay',angularAMD.route({
			url : '/systemConfigDisplay/:id',
            views : {
                'systemConfigDisplay@main.list' : angularAMD.route({
                	controller:'systemConfigDisplayController',
					controllerUrl : ['simple/view/systemConfig/js/systemConfig/SystemConfigDisplay.js'],
                    templateUrl : 'simple/view/systemConfig/html/systemConfig/SystemConfigDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'systemConfigDisplay',
					name:'查看系统参数',
					route:'main.list.systemConfig.systemConfigDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\systemConfig\js\systemConfig\SystemConfig.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\taskManageModel\js\taskManage\TaskManage.route.js
		.state('main.list.taskManage',angularAMD.route({
			url : '/taskManage',
			views : {
				'@main' : angularAMD.route({
					controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageService.js']
				})
			}
		}))
		.state('main.list.taskManage.taskManageList',angularAMD.route({
             url : '/taskManageList',
             onEnter: function($rootScope) { 
 				var model  = {
 					eId:'taskManageList',
 					name:'任务管理管理',
 					route:'main.list.taskManage.taskManageList'
 				}
 				$rootScope.selectModule(model);
 			},
			 views : {
                 'taskManageList@main.list' : angularAMD.route({
                	 controller:'taskManageListController',
 					 controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageList.js'],
                     templateUrl : 'simple/view/taskManageModel/html/taskManage/TaskManageList.html'
                 })
             }
		}))
		.state('main.list.taskManage.taskManageAddForm',angularAMD.route({
             url : '/taskManageAddForm/:operate',
             views : {
                'taskManageAddForm@main.list' : angularAMD.route({
                	controller:'taskManageFormController',
 					controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageForm.js'],
                    templateUrl : 'simple/view/taskManageModel/html/taskManage/TaskManageForm.html'
                })
             },
             onEnter: function($rootScope,$stateParams) {
 				var model  ={
 					eId:'taskManageAddForm',
 					name:'新增任务管理',
 					route:'main.list.taskManage.taskManageAddForm'
 				}
 				$rootScope.selectModule(model,$stateParams);
 			}
		}))
        .state('main.list.taskManage.taskManageEditForm',angularAMD.route({
            url : '/taskManageEditForm/:operate/:id',
            views : {
                'taskManageEditForm@main.list' : angularAMD.route({
                	controller:'taskManageFormController',
                    controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageForm.js'],
                    templateUrl : 'simple/view/taskManageModel/html/taskManage/TaskManageForm.html'
                })
            },
            onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'taskManageEditForm',
                    name:'编辑任务管理',
                    route:'main.list.taskManage.taskManageEditForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
        }))
		.state('main.list.taskManage.taskManageDisplay',angularAMD.route({
			url : '/taskManageDisplay/:id',
            views : {
                'taskManageDisplay@main.list' : angularAMD.route({
                	controller:'taskManageDisplayController',
					controllerUrl : ['simple/view/taskManageModel/js/taskManage/TaskManageDisplay.js'],
                    templateUrl : 'simple/view/taskManageModel/html/taskManage/TaskManageDisplay.html'
                })
            }, 
			onEnter: function($rootScope,$stateParams) {
				var model  = {
					eId:'taskManageDisplay',
					name:'查看任务管理',
					route:'main.list.taskManage.taskManageDisplay'
				}
				$rootScope.selectModule(model,$stateParams);
			}
		}))
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\taskManageModel\js\taskManage\TaskManage.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\tree\js\viewTree\ViewTree.route.js
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
                    templateUrl : 'simple/view/tree/html/viewTree/ViewTreeForm.html'
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
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\tree\js\viewTree\ViewTree.route.js
//start====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\workflow\js\task\Task.route.js
.state("main.list.workflow",angularAMD.route({
		url : '/workflow',
		views : {
			"@main" : angularAMD.route({
				controllerUrl : [
				                 'simple/view/workflow/js/task/TaskService.js',
				                 'simple/view/workflow/asset/base.js',
					                 ]
			})
		}
	}))
	//任务列表
    .state('main.list.workflow.taskList',angularAMD.route({
       url : '/taskList/:taskType/:name',
       views : {
           'taskList@main.list' : angularAMD.route({
            templateUrl:'simple/view/workflow/html/task/TaskList.html',
			controllerUrl : [
			                 'simple/view/workflow/js/task/TaskList.js']
            })
        },
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'taskList',
                name:$stateParams.name,	
                route:'main.list.workflow.taskList'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
    //任务详情
       .state('main.list.workflow.taskForm',angularAMD.route({
        url : '/taskForm/:taskId/:taskType/:name/:preCheckResult/:reApply/:formId',
        views : {
            'taskForm@main.list' : angularAMD.route({
            	templateUrl:'simple/view/workflow/html/task/TaskForm.html',
				controllerUrl : ['simple/view/workflow/js/task/TaskForm.js']
            	})
        	},
        	onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'taskForm',
                    name:$stateParams.name + "详情",
                    route:'main.list.workflow.taskForm'
                }
                $rootScope.selectModule(model,$stateParams);
            }
       }))
       //流程历史
       .state('main.list.workflow.processHistory',angularAMD.route({
        url :'/processHistory/:taskId/:processInstanceId/:taskType/:name',
        views : {
            'processHistory@main.list' : angularAMD.route({
            	templateUrl:'simple/view/workflow/html/task/ProcessHistory.html',
				controllerUrl : ['simple/view/workflow/js/task/ProcessHistory.js']
            	})
        	},
        	onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'processHistory',
                    name:"流程历史",
                    route:'main.list.workflow.processHistory'
                }
                $rootScope.selectModule(model,$stateParams);
            }
       })) 
       
        //数据提交后查看审批历史
       .state('main.list.workflow.dataProcessHistory',angularAMD.route({
        url :'/dataProcessHistory/:processInstanceId/:formKey/:formId',
        views : {
            'dataProcessHistory@main.list' : angularAMD.route({
            	templateUrl:'simple/view/workflow/html/task/dataHistory/DataProcessHistory.html',
				controllerUrl : ['simple/view/workflow/js/task/dataHistory/DataProcessHistory.js']
            	})
        	},
        	onEnter: function($rootScope,$stateParams){
                var model  ={
                    eId:'dataProcessHistory',
                    name:"审批历史",
                    route:'main.list.workflow.dataProcessHistory'
                }
                $rootScope.selectModule(model,$stateParams);
            }
       })) 
//end  ====H:\workspacetmp\DDD3\WebContent\ddd\simple\view\workflow\js\task\Task.route.js
