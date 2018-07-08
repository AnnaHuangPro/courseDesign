       .state('main.list.reportFormPreview',angularAMD.route({
        url : '/reportFormPreview',
        views : {
            '@main' : angularAMD.route({
                controllerUrl : ['compents/reportForm/reportForm.js', 'js/echart/echarts.min.js', 'js/echart/vintage.js']
            })
        }
    }))
       .state('main.list.reportFormPreview.previewRoute',angularAMD.route({
        url : '/previewRoute/:modelFileKey/:withChart/:dynamicForm',
        views : {
            'previewRoute@main.list' : angularAMD.route({
                templateUrl:'simple/view/reportForm/html/reportForm/Preview.html',
                controllerUrl : ['simple/view/reportForm/js/reportForm/reportPreview.js',
                                 'simple/view/reportForm/js/reportForm/ReportFormService.js']
            })
        },
        onEnter: function($rootScope,$stateParams){
            var model  ={
                eId:'previewRoute',
                name:'报表预览',
                route:'main.list.reportFormPreview.previewRoute'
            }
            $rootScope.selectModule(model,$stateParams);
        }
    }))