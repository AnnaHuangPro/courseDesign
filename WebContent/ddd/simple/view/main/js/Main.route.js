.state('main',angularAMD.route({
			url : '/main',
			templateUrl : 'simple/view/main/html/MainModule.html',
			controller:'MainController',
			controllerUrl:[
			               'simple/view/listView/js/ListViewService.js',
			               'simple/view/tree/js/viewTree/ViewTreeService.js',
			               'simple/view/attachment/AttachmentService.js',
			               'simple/view/dynamicForm/js/dynamicForm/DynamicFormService.js',
			               'js/ngDialog/js/ngDialog.min.js',
			               'simple/view/login/js/LoginService.js',
			               'simple/view/codeTable/js/codeTable/CodeTableService.js',
			               'simple/view/codeTable/js/codeType/CodeTypeService.js',
			               'compents/oneToManyGrid/OneToManyGrid.js',
			               'simple/view/main/js/HeadController.js',
			               'simple/view/main/js/MenuController.js',
			               'simple/view/workflow/asset/DynamicForm.js',
			               'simple/view/importConfigs/js/importConfigs/ImportConfigsService.js',
			               'simple/view/exportAndImport/js/exportAndImport/ExportAndImportService.js',
			               'simple/view/importConfigs/js/importConfigs/ImportService.js',
			               'compents/asynchroMask/asynchroMask.js',
			               'compents/reportForm/reportForm.js',
			               'compents/stickup/stickup.js',
			               'simple/view/entityTips/js/entityTips/EntityTipsService.js',
			               'compents/formDesigner/FormDesigner.js',
			               'simple/view/workflow/js/task/TaskService.js',
			               'simple/view/operatorCongfigModel/js/operatorCongfig/OperatorCongfigService.js',
			               'simple/view/listView/js/reportView/ReportViewService.js',
			               'simple/view/permission/js/module/ModuleService.js',
			               'simple/view/headPortrait/HeadPortraitService.js',
			               'simple/view/main/js/MainController.js',
			             /* dddinclude start WebContent\ddd\extends\js\mainRouter_sub1.js */
,'simple/view/billCode/js/billCode/BillCodeService.js'
	/* dddinclude end WebContent\ddd\extends\js\mainRouter_sub1.js */   
			              ]//必需是数�?
		}))
		.state("login", angularAMD.route({
			url : "/login",
			templateUrl : 'simple/view/login/LoginModule.html',
			controller:'LoginController',
			controllerUrl:['simple/view/login/js/LoginForm.js',
			               'simple/view/login/js/LoginService.js',
			               'js/ngDialog/js/ngDialog.min.js',
			               'simple/view/permission/js/operator/OperatorService.js',
			               'simple/view/modelFile/js/modelFile/ModelFileService.js',
			               'compents/asynchroMask/asynchroMask.js',
			               'simple/view/listView/js/reportView/ReportViewService.js']//必需是数�?
		}))		
    .state('main.list.mainTable',angularAMD.route({
        url : '/mainTable',
        views : {
            'mainTable@main.list' : angularAMD.route({
            	templateUrl : 'simple/view/main/html/main/Welcome.html',
				controllerUrl:[
				                'simple/view/taskManageModel/js/taskManage/TaskManageService.js',
				               	'simple/view/main/js/WelcomeController.js'
				]
            })
        },
        onEnter: function($rootScope){
            var model  ={
                eId:'mainTable',
                name:'主页',
                route:'main.list.mainTable'
            }
            $rootScope.selectModule(model);
        }
    }))
