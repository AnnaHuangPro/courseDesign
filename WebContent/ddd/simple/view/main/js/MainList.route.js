	.state("main.list",angularAMD.route({
		url : '/list',
		views : {
			"header@main" : angularAMD.route({
				templateUrl : 'simple/view/main/html/main/Header.html',
				controller:'HeadController',
				controllerUrl:[
					               ]//必需是数组
			}),
			"menu@main" : angularAMD.route({
				templateUrl : 'simple/view/main/html/main/MenuModule.html',
				controller : "MenuController",
				controllerUrl:[ ]//必需是数组
			}),
			"mainContent@main":angularAMD.route({
				templateUrl : 'simple/view/main/html/main/MainContent.html'
			})
		}
	}))