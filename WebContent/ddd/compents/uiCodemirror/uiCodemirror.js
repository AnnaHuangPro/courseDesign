'use strict';
define(['codemirror',
        "codemirror/addon/selection/active-line",
        "codemirror/addon/edit/matchbrackets",
        "codemirror/addon/edit/closetag",
        "codemirror/addon/display/fullscreen",
        "codemirror/addon/edit/matchbrackets", 
        "codemirror/addon/lint/lint",
        "codemirror/addon/hint/show-hint",
        ], function (CodeMirror) {
	

  /**
   * Binds a CodeMirror widget to a <textarea> element.
   */
  angular.module('ui.codemirror', [])
    .constant('uiCodemirrorConfig', {
    	codemirror:{
    		lineNumbers: true, //是否显示行数
    		styleActiveLine: true, //line选择是是否加亮
    		matchBrackets: true,
    		autoCloseTags: true, //是否自动闭合标签
            lineWrapping: true, //是否自动换行
            foldGutter:true, //收缩
    		extraKeys: {
				"Ctrl-Q": "autocomplete",
				"Ctrl": "toggleComment",
				"Tab": function(cm){ 
					var spaces = Array(cm.getOption("indentUnit") + 1).join(" "); 
					cm.replaceSelection(spaces);
				},
				"F11": function(cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
		        },
		        "Esc": function(cm) {
		        	if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
		        }
			},
			gutters: ["CodeMirror-lint-markers","CodeMirror-linenumbers","CodeMirror-foldgutter"],
			lint:true,
    	}
    })
    .directive('uiCodemirror', uiCodemirrorDirective);

  /**
   * @ngInject
   */
  function uiCodemirrorDirective($timeout, uiCodemirrorConfig) {

    return {
      restrict: 'EA',
      require: '?ngModel',
      compile: function compile() {

        // Require CodeMirror
        if (angular.isUndefined(CodeMirror)) {
          throw new Error('ui-codemirror needs CodeMirror to work... (o rly?)');
        }

        return postLink;
      }
    };

    function postLink(scope, iElement, iAttrs, ngModel) {
    
      var codemirrorOptions = angular.extend(
        { value: iElement.text() },
        uiCodemirrorConfig.codemirror || {},
        scope.$eval(iAttrs.uiCodemirror),
        scope.$eval(iAttrs.uiCodemirrorOpts)
        );

      var codemirror = newCodemirrorEditor(iElement, codemirrorOptions);
      scope.editor = codemirror;
      var charWidth = codemirror.defaultCharWidth(), basePadding = 4;
      codemirror.on("renderLine", function(cm, line, elt) {
        var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
        elt.style.textIndent = "-" + off + "px";
        elt.style.paddingLeft = (basePadding + off) + "px";
      });
      codemirror.refresh();
      configOptionsWatcher(
        codemirror,
        iAttrs.uiCodemirror || iAttrs.uiCodemirrorOpts,
        scope
        );
      
      configNgModelLink(codemirror, ngModel, scope);

      configUiRefreshAttribute(codemirror, iAttrs.uiRefresh, scope);

      // Allow access to the CodeMirror instance through a broadcasted event
      // eg: $broadcast('CodeMirror', function(cm){...});
      scope.$on('CodeMirror', function (event, callback) {
        if (angular.isFunction(callback)) {
          callback(codemirror);
        } else {
          throw new Error('the CodeMirror event requires a callback function');
        }
      });
      

      // onLoad callback
      if (angular.isFunction(codemirrorOptions.onLoad)) {
        codemirrorOptions.onLoad(codemirror);
      }
    }

    function newCodemirrorEditor(iElement, codemirrorOptions) {
      var codemirrot;

      if (iElement[0].tagName === 'TEXTAREA') {
        // Might bug but still ...
        codemirrot = CodeMirror.fromTextArea(iElement[0], codemirrorOptions);
      } else {
        iElement.html('');
        codemirrot = new CodeMirror(function (cm_el) {
          iElement.append(cm_el);
        }, codemirrorOptions);
      }

      return codemirrot;
    }

    function configOptionsWatcher(codemirrot, uiCodemirrorAttr, scope) {
      if (!uiCodemirrorAttr) { return; }

      var codemirrorDefaultsKeys = Object.keys(CodeMirror.defaults);
      scope.$watch(uiCodemirrorAttr, updateOptions, true);
      function updateOptions(newValues, oldValue) {
        if (!angular.isObject(newValues)) { return; }
        codemirrorDefaultsKeys.forEach(function (key) {
          if (newValues.hasOwnProperty(key)) {

            if (oldValue && newValues[key] === oldValue[key]) {
              return;
            }

            codemirrot.setOption(key, newValues[key]);
          }
        });
      }
    }

    function configNgModelLink(codemirror, ngModel, scope) {
      if (!ngModel) { return; }
      // CodeMirror expects a string, so make sure it gets one.
      // This does not change the model.
      ngModel.$formatters.push(function (value) {
        if (angular.isUndefined(value) || value === null) {
          return '';
        } else if (angular.isObject(value) || angular.isArray(value)) {
          throw new Error('ui-codemirror cannot use an object or an array as a model');
        }
        return value;
      });


      // Override the ngModelController $render method, which is what gets called when the model is updated.
      // This takes care of the synchronizing the codeMirror element with the underlying model, in the case that it is changed by something else.
      ngModel.$render = function () {
        //Code mirror expects a string so make sure it gets one
        //Although the formatter have already done this, it can be possible that another formatter returns undefined (for example the required directive)
        var safeViewValue = ngModel.$viewValue || '';
        codemirror.setValue(safeViewValue);
        $timeout(function () {
        	codemirror.refresh();
          });
      };


      // Keep the ngModel in sync with changes from CodeMirror
      codemirror.on('change', function (instance) {
        var newValue = instance.getValue();
        if (newValue !== ngModel.$viewValue) {
          scope.$evalAsync(function () {
            ngModel.$setViewValue(newValue);
          });
        }
      });
    }

    function configUiRefreshAttribute(codeMirror, uiRefreshAttr, scope) {
      if (!uiRefreshAttr) { return; }

      scope.$watch(uiRefreshAttr, function (newVal, oldVal) {
        // Skip the initial watch firing
        if (newVal !== oldVal) {
          $timeout(function () {
            codeMirror.refresh();
          });
        }
      });
    }

  }
})
