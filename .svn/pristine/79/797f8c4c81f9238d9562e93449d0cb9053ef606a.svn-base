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