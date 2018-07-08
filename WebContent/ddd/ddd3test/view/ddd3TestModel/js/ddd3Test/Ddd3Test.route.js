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