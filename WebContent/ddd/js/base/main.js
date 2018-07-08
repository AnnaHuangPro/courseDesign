require.config({
	packages : [ {
		name : "codemirror",
		location : "js/codemirror",
		main : "lib/codemirror"
	}],
    baseUrl: ".",
   
    // alias libraries paths.  Must set 'angular'
    paths: {
    	'angular': 'js/angular/1.4.4/angular',
    	'angularAnimate': 'js/angular/1.4.4/angular-animate.min',
    	'angularResource': 'compents/resource/angular-resource-xcy.min',
    	'angularUIBootstrap': 'js/ui-bootstrap/0.14.3/ui-bootstrap-tpls-0.14.3.min',
    	'angularUIrouter': 'js/ui-router/0.2.13/angular-ui-router-xcy.min',
        'angularFileUpload':'js/angular-file-upload/2.2.0/angular-file-upload.min',
        'angularAMD': 'js/angularAMD/angularAMD',
        'bootstrap': 'js/bootstrap/3.3.5/js/bootstrap.min',
        'jquery':'js/jquery/2.1.4/jquery-2.1.4',
        'w2ui':'js/newMenu/w2ui-1.4.3',
        'bootstrapDatetimepicker':'js/bootstrap-datetimepicker/2012/js/bootstrap-datetimepicker.min',
        'bootstrapDatetimepickerCn':'js/bootstrap-datetimepicker/2012/js/locales/bootstrap-datetimepicker.zh-CN',
        'ddatepicker':'compents/ddatepicker/DDatePicker',
        'uiValidate':' js/ui-validate/1.2.1/validate.min',
		'uigrid':'js/uigrid/3.0.7/ui-grid-xcy',
		'ueditor':'js/angular-ueditor/angular-ueditor.min',
		'md5':'js/md5/2.1/md5',
		'stickUp':'js/stickUp/stickUp',
		'fullcalendar':'js/fullcalendar/fullcalendar.min',
		'appPermission':'js/base/angular.permission',
		'jsonCache':'simple/view/cache/jsonCache',
		'DDataGrid':'compents/ddatagrid/DDataGrid',
		'DReference':'compents/dddreference/DddReference',
		'DSelect':'compents/dddselect/DddSelect',
		'DfileUpload':'compents/dddfileupload/DddFileUpload',
		'DimgUpload':'compents/dddimgupload/DddImgUpload',
		'app':'js/base/app',
		'formValidate':'compents/formValidate/formValidate',
		'onToManyGrid':'compents/onToManyGrid/OnToManyGrid',
		'viewTree':'compents/viewTree/ViewTree',
		'formModule':'compents/formDesigner/FormDesigner',
		'ExportAndImport':'compents/exportAndImport/ExportAndImport',
		'uicalendar':'js/ui-calendar/calendar',
		'moment':'js/moment/2.10.6/moment',
		'ngDialog':'js/ngDialog/js/ngDialog.min',
		'dialogService':'js/dialog-service/5.2.9/dialogs.min',
        'sanitize':'js/angular/1.4.4/angular-sanitize',
        'ui.select':'js/ui-select/0.13.2/select.min',
        'dddCompile':'compents/complie/dddComplie',
        'DddIntroduce':'compents/dddintroduce/DddIntroduce',
        'dddvalidate':'js/angular-uivalid/validate',
        'uiCodemirror':'compents/uiCodemirror/uiCodemirror',
        'codemirror':'js/codemirror/lib/codemirror',
        'OperatorCongfigService':'simple/view/operatorCongfigModel/js/operatorCongfig/OperatorCongfigService',
        'ReportViewService':'simple/view/listView/js/reportView/ReportViewService',
        'ModuleService':'simple/view/permission/js/module/ModuleService',
        'MenuCtrl':'simple/view/main/js/menu-tree/menu-control',
        'cropbox':'compents/dddlogoupload/cropbox',
        'DlogoUpload':'compents/dddlogoupload/DddLogoUpload',
       /* dddinclude start WebContent\ddd\extends\js\main_sub1.js */

 /* dddinclude end WebContent\ddd\extends\js\main_sub1.js */   
	
    },
    
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
    	'angularAnimate': ['angular'],
    	'dddvalidate': ['angular'],
    	'angularResource': ['angular'],
    	'angularUIBootstrap': ['angular'],
    	'angularUIrouter': ['angular'],
    	'w2ui':['jquery'],
        'angularAMD': ['angular'],
        'appPermission': ['angular','jsonCache'],
        'bootstrap':['jquery'],
        'bootstrapDatetimepicker':['bootstrap'],
        'bootstrapDatetimepickerCn':['bootstrapDatetimepicker'],
        'DDataGrid': ['angular'],
        'stickUp':['jquery'],
        'uiValidate': ['angular'],
        'DReference': ['angular'],
		'angularFileUpload':['angular'],
		'DfileUpload':['angular'],
		'DimgUpload':['angular'],
        'onToManyGrid':['angular'],
        'viewTree':['angular'],
        'uigrid':['angular'],
        'formModule':['angular'],
    	'DSelect':['angular'],
    	'ueditor':['angular'],
        'ddatepicker':['angular'],
		'formValidate':['angular'],
		'ExportAndImport':['angular'],
		'uicalendar':['angular'],
		'fullcalendar':['angular'],
		'ngDialog':['angular'],
		'dialogService':['angular'],
		'sanitize':['angular'],
		'ui.select':['angular'],
		'DddIntroduce':['angular'],
		'dddCompile':['angular'],
		'uiCodemirror':['codemirror','angular'],
		'OperatorCongfigService':['angular'],
		'ReportViewService':['angular'],
		'ModuleService':['angular'],
		'MenuCtrl':['angular'],
		'cropbox':['jquery'],
		'DlogoUpload':['angular'],
	    /* dddinclude start WebContent\ddd\extends\js\main_sub2.js */

	/* dddinclude end WebContent\ddd\extends\js\main_sub2.js */ 
    },
    
    // kick start application
    deps: ['app']
});

require( ['md5','jquery','stickUp']);
/*
require(['echarts'], function(echarts) {
	window.echarts = echarts
})*/
