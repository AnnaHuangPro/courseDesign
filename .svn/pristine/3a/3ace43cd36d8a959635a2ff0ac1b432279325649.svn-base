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