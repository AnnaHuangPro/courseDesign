.state("register", angularAMD.route({
	url : "/register",
	templateUrl : "vip/view/register/html/Register.html",
	controller:"VipRegistCtr",
	controllerUrl:["vip/view/register/js/RegisterCtr.js",
	               "simple/view/member/manMgt/js/ManMgtService.js",
	               ],
}))
		
