    .state('main.list.reportForm',angularAMD.route({
        url : '/reportForm',
        views : {
            '@main' : angularAMD.route({
                controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormService.js']
            })
        }
    }))
    .state('main.list.reportForm.reportFormListRoute',angularAMD.route({
        url : '/reportFormListRoute',
        onEnter: function($rootScope){
            var model  ={
                eId:'reportFormList',
                name:'报表管理',
                route:'main.list.reportForm.reportFormList'
            }
            $rootScope.selectModule(model);
        }
    }))
    .state('main.list.reportForm.reportFormList',angularAMD.route({
        url : '/reportFormList',
        views : {
            'reportFormList@main.list' : angularAMD.route({
                templateUrl : 'simple/view/reportForm/html/reportForm/ReportFormList.html',
                controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormList.js']
            })
        }
    }))
    .state('main.list.reportForm.reportFormFormAddRoute',angularAMD.route({
        url : '/reportFormFormAddRoute/:operate',
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'reportFormAddForm',
                name:'新增报表',
                route:'main.list.reportForm.reportFormAddForm'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
    .state('main.list.reportForm.reportFormAddForm',angularAMD.route({
        url : '/reportFormAddForm/:operate',
        views : {
            'reportFormAddForm@main.list' : angularAMD.route({
                templateUrl : 'simple/view/reportForm/html/reportForm/ReportFormForm.html',
                controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormForm.js']
            })
        }
    }))
    .state('main.list.reportForm.reportFormFormEditRoute',angularAMD.route({
        url : '/reportFormFormEditRoute/:operate/:id',
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'reportFormEditForm',
                name:'编辑报表',
                route:'main.list.reportForm.reportFormEditForm'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
    .state('main.list.reportForm.reportFormEditForm',angularAMD.route({
        url : '/reportFormEditForm/:operate/:id',
        views : {
            'reportFormEditForm@main.list' : angularAMD.route({
                templateUrl : 'simple/view/reportForm/html/reportForm/ReportFormForm.html',
                controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormForm.js']
            })
        }
    }))
    .state('main.list.reportForm.reportFormDisplayRoute',angularAMD.route({
        url : '/reportFormDisplayRoute/:id',
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'reportFormDisplay',
                name:'查看报表',
                route:'main.list.reportForm.reportFormDisplay'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))
    .state('main.list.reportForm.reportFormDisplay',angularAMD.route({
        url : '/reportFormDisplay/:id',
        views : {
            'reportFormDisplay@main.list' : angularAMD.route({
                templateUrl : 'simple/view/reportForm/html/reportForm/ReportFormDisplay.html',
                controllerUrl : ['simple/view/reportForm/js/reportForm/ReportFormDisplay.js']
            })
        }
    }))