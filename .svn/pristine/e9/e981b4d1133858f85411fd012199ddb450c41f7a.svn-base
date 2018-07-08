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