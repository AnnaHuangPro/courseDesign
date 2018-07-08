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