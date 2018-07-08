(function() {
  var copyObjectToScope;

  copyObjectToScope = function(object, scope) {

    /*
    Copy object (ng-repeat="object in objects") to scope without `hashKey`.
     */
    var key, value;
    for (key in object) {
      value = object[key];
      if (key !== '$$hashKey') {
        scope[key] = value;
      }
    }
  };

  angular.module('builder.controller', ['builder.provider']).controller('fbFormObjectEditableController', [
    '$scope', '$injector', function($scope, $injector) {
      var $builder;
      $builder = $injector.get('$builder');
      $scope.setupScope = function(formObject) {

        /*
        1. Copy origin formObject (ng-repeat="object in formObjects") to scope.
        2. Setup optionsText with formObject.options.
        3. Watch scope.label, .description, .placeholder, .required, .options then copy to origin formObject.
        4. Watch scope.optionsText then convert to scope.options.
        5. setup validationOptions
         */
        var component;
        copyObjectToScope(formObject, $scope);
        $scope.optionsText = formObject.options.join('\n');
        $scope.$watch('[label, description, placeholder, options, validation,billCodeTypeName,billCodeRule,variables,seqences,bindVal,entityName,orientation,options_table,defaultValue,dataSource,foreignKeyView,eachPageSize,layoutStyle,joinTableName,displayFields,imgWidth,imgHeight,limitWidth,limitHeight,limitType,limitSizeM,limitSizeK,limitSizeB,bundle,validation,nullable, authority, col1, col2,isEdit,isHide,format,index]', function() {
          formObject.label = $scope.label;
          formObject.description = $scope.description;
          formObject.placeholder = $scope.placeholder;
          formObject.options = $scope.options;
          formObject.billCodeTypeName = $scope.billCodeTypeName;
          formObject.billCodeRule = $scope.billCodeRule;
          formObject.variables = $scope.variables;
          formObject.seqences = $scope.seqences;
          formObject.bindVal = $scope.bindVal;
          formObject.entityName = $scope.entityName;
          formObject.orientation = $scope.orientation;
          formObject.options_table = $scope.options_table;
          formObject.defaultValue = $scope.defaultValue;
          formObject.dataSource = $scope.dataSource;
          formObject.foreignKeyView = $scope.foreignKeyView;
          formObject.eachPageSize = $scope.eachPageSize;
          formObject.layoutStyle = $scope.layoutStyle;
          formObject.joinTableName = $scope.joinTableName;
          formObject.displayFields = $scope.displayFields;
          formObject.imgWidth = $scope.imgWidth;
          formObject.imgHeight = $scope.imgHeight;
          formObject.limitWidth = $scope.limitWidth;
          formObject.limitHeight = $scope.limitHeight;
          formObject.limitType = $scope.limitType;
          formObject.limitSizeM = $scope.limitSizeM;
          formObject.limitSizeK = $scope.limitSizeK;
          formObject.limitSizeB = $scope.limitSizeB;
          
          formObject.bundle=$scope.bundle;
          formObject.validation=$scope.validation;
          formObject.nullable=$scope.nullable;
          formObject.authority=$scope.authority;
          formObject.col1=$scope.col1;
          formObject.col2=$scope.col2;
          formObject.isEdit=$scope.isEdit;
          formObject.isHide=$scope.isHide;
          formObject.format=$scope.format;
          formObject.index=$scope.index;
          
          return formObject.validation = $scope.validation;
        }, true);
      };
      return $scope.data = {
        model: null,
        backup: function() {

          /*
          Backup input value.
           */
          return this.model = {
        		  	label: $scope.label,
        		  	glyphicon:$scope.glyphicon,
        			description: $scope.description,
        			placeholder: $scope.placeholder,
        			optionsText: $scope.optionsText,
        			validation: $scope.validation,
        			billCodeTypeName:$scope.billCodeTypeName,
        			billCodeRule:$scope.billCodeRule,
        			variables:$scope.variables,
        			seqences:$scope.seqences,
        			bindVal:$scope.bindVal,
        			entityName:$scope.entityName,
        			orientation:$scope.orientation,
        			options_table:$scope.options_table,
        			defaultValue:$scope.defaultValue,
        			dataSource:$scope.dataSource,
        			foreignKeyView:$scope.foreignKeyView,
        			eachPageSize:$scope.eachPageSize,
        			layoutStyle:$scope.layoutStyle,
        			joinTableName:$scope.joinTableName,
        			displayFields:$scope.displayFields,
        			imgWidth:$scope.imgWidth,
        			imgHeight:$scope.imgHeight,
        			limitWidth:$scope.limitWidth,
        			limitHeight:$scope.limitHeight,
        			limitType:$scope.limitType,
        			limitSizeM:$scope.limitSizeM,
        			limitSizeK:$scope.limitSizeK,
        			limitSizeB:$scope.limitSizeB,
        			
        			bundle:$scope.bundle,
        			validation:$scope.validation,
        			nullable:$scope.nullable,
        			authority:$scope.authority,
        			col1:$scope.col1,
        			col2:$scope.col2,
        			isEdit:$scope.isEdit,
        			isHide:$scope.isHide,
        			format:$scope.format,
        			index:$scope.index
          };
        },
        rollback: function() {

          /*
          Rollback input value.
           */
          if (!this.model) {
            return;
          }
          $scope.label = this.model.label;
          $scope.glyphicon = this.model.glyphicon;
          $scope.description = this.model.description;
          $scope.placeholder = this.model.placeholder;
          $scope.optionsText = this.model.optionsText;
          $scope.billCodeTypeName = this.model.billCodeTypeName,
          $scope.billCodeRule = this.model.billCodeRule,
          $scope.variables = this.model.variables,
          $scope.seqences = this.model.seqences,
          $scope.bindVal = this.model.bindVal,
          $scope.entityName = this.model.entityName,
          $scope.orientation = this.model.orientation,
          $scope.options_table = this.model.options_table,
          $scope.defaultValue = this.model.defaultValue,
          $scope.dataSource = this.model.dataSource,
          $scope.foreignKeyView = this.model.foreignKeyView,
          $scope.eachPageSize = this.model.eachPageSize,
          $scope.layoutStyle = this.model.layoutStyle,
          $scope.joinTableName = this.model.joinTableName,
          $scope.displayFields = this.model.displayFields,
          $scope.imgWidth = this.model.imgWidth,
          $scope.imgHeight = this.model.imgHeight,
          $scope.limitWidth = this.model.limitWidth,
          $scope.limitHeight = this.model.limitHeight,
          $scope.limitType = this.model.limitType,
          $scope.limitSizeM = this.model.limitSizeM,
          $scope.limitSizeK = this.model.limitSizeK,
          $scope.limitSizeB = this.model.limitSizeB,
          
          
          $scope.bundle=this.model.bundle;
          $scope.nullable=this.model.nullable;
          $scope.authority=this.model.authority;
          $scope.col1=this.model.col1;
          $scope.col2=this.model.col2;
          $scope.isEdit=this.model.isEdit;
          $scope.isHide=this.model.isHide;
          $scope.format=this.model.format;
          $scope.index=this.model.index
          
          return $scope.validation = this.model.validation;
        }
      };
    }
  ]).controller('fbComponentsController', [
    '$scope', '$injector', function($scope, $injector) {
      var $builder = $injector.get('$builder');
      $scope.selectGroup = function($event, group) {
    	 
    	  /*if(angular.element("div[class='panel-heading "+ group + "']").length>0) {
    		  angular.element("div[class='panel-heading "+ group + "']").attr("class","panel-heading "+group+" open-panel");
    	  }else if(angular.element("div[class='panel-heading "+ group + " open-panel']").length>0) 
    	  {
    		  angular.element("div[class='panel-heading "+ group + " open-panel']").attr("class","panel-heading "+group+"");
    	  }
    	  */
    	  
    	angular.forEach($builder.groups,function(data){
    		if(data!=group&&angular.element("span[class='glyphicon glyphicon-menu-down pull-right "+data+"']").length>0){
    			angular.element("span[class='glyphicon glyphicon-menu-down pull-right "+data+"']").attr("class","glyphicon glyphicon-menu-right pull-right "+data+"");
    		}
    	})
    	if(angular.element("span[class='glyphicon glyphicon-menu-right pull-right "+group+"']").length>0){
    		angular.element("span[class='glyphicon glyphicon-menu-right pull-right "+group+"']").attr("class","glyphicon glyphicon-menu-down pull-right "+group+"");
    	}else if(angular.element("span[class='glyphicon glyphicon-menu-down pull-right "+group+"']").length>0){
    		angular.element("span[class='glyphicon glyphicon-menu-down pull-right "+group+"']").attr("class","glyphicon glyphicon-menu-right pull-right "+group+"");
    	}
        var component, name, _ref, _results;
        if ($event != null) {
          $event.preventDefault();
        }
        $scope.activeGroup = group;
        $scope.components = [];
        _ref = $builder.components;
        _results = [];
        for (name in _ref) {
          component = _ref[name];
          if (component.group === group) {
            _results.push($scope.components.push(component));
          }
        }
        return _results;
      };
      $scope.groups = $builder.groups;
      $scope.activeGroup = $scope.groups[0];
      $scope.allComponents = $builder.components;
//      return $scope.$watch('allComponents', function() {
//        return $scope.selectGroup(null, $scope.activeGroup);
//      });
    }
  ]).controller('fbComponentController', [
    '$scope', function($scope) {
      return $scope.copyObjectToScope = function(object) {
        return copyObjectToScope(object, $scope);
      };
    }
  ]).controller('fbFormController', [
    '$scope', '$injector', function($scope, $injector) {
      var $builder, $timeout;
      $builder = $injector.get('$builder');
      $timeout = $injector.get('$timeout');
      if ($scope.input == null) {
        $scope.input = [];
      }
      return $scope.$watch('form', function() {
        if ($scope.input.length > $scope.form.length) {
          $scope.input.splice($scope.form.length);
        }
        return $timeout(function() {
          return $scope.$broadcast($builder.broadcastChannel.updateInput);
        });
      }, true);
    }
  ]).controller('fbFormObjectController', [
    '$scope', '$injector', function($scope, $injector) {
      var $builder;
      $builder = $injector.get('$builder');
      $scope.copyObjectToScope = function(object) {
        return copyObjectToScope(object, $scope);
      };
      return $scope.updateInput = function(value) {

        /*
        Copy current scope.input[X] to $parent.input.
        @param value: The input value.
         */
        var input;
        input = {
          id: $scope.formObject.id,
          label: $scope.formObject.label,
          value: value != null ? value : ''
        };
        return $scope.$parent.input.splice($scope.$index, 1, input);
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('builder.directive', ['builder.provider', 'builder.controller', 'builder.drag', 'validator']).directive('fbBuilder', [
    '$injector', function($injector) {
      var $builder, $drag;
      $builder = $injector.get('$builder');
      $drag = $injector.get('$drag');
      return {
        restrict: 'A',
        scope: {
          fbBuilder: '='
        },
        template: "<div class='form-horizontal' id='formContainer'>\n    <div class='fb-form-object-editable' ng-repeat=\"object in formObjects\"\n   data-config=\"{{object}}\"  fb-form-object-editable=\"object\">",
        link: function(scope, element, attrs) {
          var beginMove, _base, _name;
          scope.formName = attrs.fbBuilder;
          if ((_base = $builder.forms)[_name = scope.formName] == null) {
            _base[_name] = [];
          }
          scope.formObjects = $builder.forms[scope.formName];
          beginMove = true;
          $(element).addClass('fb-builder');
          return $drag.droppable($(element), {
            move: function(e, draggable) {
              var $empty, $formObject, $formObjects, height, index, offset, positions, _i, _j, _ref, _ref1;
              if (beginMove) {
                $("div.fb-form-object-editable").popover('hide');
                beginMove = false;
              }
              $formObjects = $(element).find('.fb-form-object-editable:not(.empty,.dragging)');
              if ($formObjects.length === 0) {
                if ($(element).find('.fb-form-object-editable.empty').length === 0) {
                  $(element).find('>div:first').append($("<div class='fb-form-object-editable empty'></div>"));
                }
                return;
              }
              positions = [];
              positions.push(-1000);
              for (index = _i = 0, _ref = $formObjects.length; _i < _ref; index = _i += 1) {
                $formObject = $($formObjects[index]);
                offset = $formObject.offset();
                height = $formObject.height();
                positions.push(offset.top + height / 2);
              }
              positions.push(positions[positions.length - 1] + 1000);
              for (index = _j = 1, _ref1 = positions.length; _j < _ref1; index = _j += 1) {
                if (e.pageY > positions[index - 1] && e.pageY <= positions[index]) {
                	$(element).find('.empty').remove()
                	var useDefaultCopy = scope.$parent.useDefaultCopy;
                	if (useDefaultCopy && angular.equals("drag",draggable.mode)) {
                		$empty = $("<div class='fb-form-object-editable empty' style=\"text-align:center;line-height:66px;\"><strong>复制该组件到这里</strong></div>");
	                }else{
	                	$empty = $("<div class='fb-form-object-editable empty' style=\"text-align:center;line-height:66px\">拖到这里</div>");
	                }
	                if (index - 1 < $formObjects.length) {
	                  $empty.insertBefore($($formObjects[index - 1]));
	                } else {
	                   $empty.insertAfter($($formObjects[index - 2]));
	                }
	                break;
                }
              }
            },
            out: function() {
              if (beginMove) {
                $("div.fb-form-object-editable").popover('hide');
                beginMove = false;
              }
              return $(element).find('.empty').remove()
            },
            up: function(e, isHover, draggable) {
              var formObject, newIndex, oldIndex;
              beginMove = true;
              if (!$drag.isMouseMoved()) {
                $(element).find('.empty').remove();
                return;
              }
              if (!isHover && draggable.mode === 'drag') {
                formObject = draggable.object.formObject;
                if (formObject.editable) {
                  $builder.removeFormObject(attrs.fbBuilder, formObject.index);
                }
              } else if (isHover) {
                if (draggable.mode === 'mirror') {
                  $builder.insertFormObject(scope.formName, $(element).find('.empty').index('.fb-form-object-editable'), {
                    component: draggable.object.componentName
                  });
                }
                if (draggable.mode === 'drag') {
                  oldIndex = draggable.object.formObject.index;
                  newIndex = $(element).find('.empty').index('.fb-form-object-editable');
                  var copyNewIndex = newIndex;
                  if (oldIndex < newIndex) {
                    newIndex--;
                  }
                  /** 拖动为复制组件  */
            	  var useDefaultCopy = scope.$parent.useDefaultCopy;
            	  if(useDefaultCopy){
            		  scope.formObjects.push(angular.copy(scope.formObjects[oldIndex]));
            		  $builder.updateFormObjectIndex(scope.formName, scope.formObjects.length-1,copyNewIndex);
            	  }else{
            		  $builder.updateFormObjectIndex(scope.formName, oldIndex, newIndex);
            	  }
                }
              }
              return $(element).find('.empty').remove();
            }
          });
        }
      };
    }
  ]).directive('fbFormObjectEditable', [
    '$injector', function($injector) {
      var $builder, $compile, $drag, $validator;
      $builder = $injector.get('$builder');
      $drag = $injector.get('$drag');
      $compile = $injector.get('$compile');
      $validator = $injector.get('$validator');
      return {
        restrict: 'A',
        controller: 'fbFormObjectEditableController',
        scope: {
          formObject: '=fbFormObjectEditable'
        },
        link: function(scope, element) {
          var popover;
          scope.inputArray = [];
          scope.$component = $builder.components[scope.formObject.component];
          scope.setupScope(scope.formObject);
          scope.$watch('$component.template', function(template) {
            var view;
            if (!template) {
              return;
            }
            view = $compile(template)(scope);
            return $(element).html(view);
          });
          $(element).on('click', function() {
            return false;
          });
          $drag.draggable($(element), {
            object: {
              formObject: scope.formObject
            }
          });
          if (!scope.formObject.editable) {
            return;
          }
          popover = {};
          scope.$watch('$component.popoverTemplate', function(template) {
            if (!template) {
              return;
            }
            $(element).removeClass(popover.id);
            popover = {
              id: "fb-" + (Math.random().toString().substr(2)),
              isClickedSave: false,
              view: null,
              html: template
            };
            popover.html = $(popover.html).addClass(popover.id);
            popover.view = $compile(popover.html)(scope);
            $(element).addClass(popover.id);
            return $(element).popover({
              html: true,
              title: scope.$component.label,
              content: popover.view,
              container: 'body',
              placement: $builder.config.popoverPlacement
            });
          });
          scope.popover = {
            save: function($event) {

              /*
              The save event of the popover.
               */
              $event.preventDefault();
              $validator.validate(scope).success(function() {
                popover.isClickedSave = true;
                
                return $(element).popover('hide');
              });
              scope.$emit("save");
            },
            remove: function($event) {

              /*
              The delete event of the popover.
               */
              $event.preventDefault();
              $builder.removeFormObject(scope.$parent.formName, scope.$parent.$index);
              $(element).popover('hide');
              angular.element($event.target).scope().$emit("dragUp");
            },
            shown: function() {

              /*
              The shown event of the popover.
               */
              scope.data.backup();
              return popover.isClickedSave = false;
            },
            cancel: function($event) {

              /*
              The cancel event of the popover.
               */
              scope.data.rollback();
              if ($event) {
                $event.preventDefault();
                $(element).popover('hide');
              }
            }
          };
          $(element).on('show.bs.popover', function() {
            var $popover, elementOrigin, popoverTop;
            if ($drag.isMouseMoved()) {
              return false;
            }
            $("div.fb-form-object-editable:not(." + popover.id + ")").popover('hide');
            $popover = $("form." + popover.id).closest('.popover');
            if ($popover.length > 0) {
              elementOrigin = $(element).offset().top + $(element).height() / 2;
              popoverTop = elementOrigin - $popover.height() / 2;
              popoverTop = popoverTop < 0 ? 0 : popoverTop;
              $popover.css({
                position: 'absolute',
                top: popoverTop
              });
              $popover.show();
              setTimeout(function() {
                $popover.addClass('in');
                return $(element).triggerHandler('shown.bs.popover');
              }, 0);
              return false;
            }
          });
          $(element).on('shown.bs.popover', function() {
            $(".popover ." + popover.id + " input:first").select();
            scope.$apply(function() {
              return scope.popover.shown();
            });
          });
          return $(element).on('hide.bs.popover', function() {
            var $popover;
            $popover = $("form." + popover.id).closest('.popover');
            if (!popover.isClickedSave) {
              if (scope.$$phase || scope.$root.$$phase) {
                scope.popover.cancel();
              } else {
                scope.$apply(function() {
                  return scope.popover.cancel();
                });
              }
            }
            $popover.removeClass('in');
            setTimeout(function() {
              return $popover.hide();
            }, 300);
            return false;
          });
        }
      };
    }
  ]).directive('fbComponents', function() {
    return {
      restrict: 'A',
      //template: "<ul ng-if=\"groups.length > 1\" class=\"nav nav-tabs nav-justified\">\n    <li ng-repeat=\"group in groups\" ng-class=\"{active:activeGroup==group}\">\n        <a href='#' ng-click=\"selectGroup($event, group)\">{{group}}</a>\n    </li>\n</ul>\n<div class='form-horizontal'>\n    <div class='fb-component' ng-repeat=\"component in components\"\n        fb-component=\"component\"></div>\n</div>",
      templateUrl: 'js/angular-form-builder/dist/template/components.html',
      controller: 'fbComponentsController'
    };
  }).directive('fbComponent', [
    '$injector', function($injector) {
      var $builder, $compile, $drag;
      $builder = $injector.get('$builder');
      $drag = $injector.get('$drag');
      $compile = $injector.get('$compile');
      return {
        restrict: 'A',
        scope: {
          component: '=fbComponent'
        },
        controller: 'fbComponentController',
        link: function(scope, element) {
          scope.copyObjectToScope(scope.component);
          $drag.draggable($(element), {
            mode: 'mirror',
            defer: false,
            object: {
              componentName: scope.component.name
            }
          });
          return scope.$watch('component.template', function(template) {
            var view;
            if (!template) {
              return;
            }
            //template = template.replace(/class=\"col-sm-{{col2}}\"/g, "class=\"col-sm-{{col2}}\" ng-hide=\"true\"");
            //template = '<div style="height:30px"><i class="{{glyphicon}}"></i>{{label}}</div>';
            template = "<div class='row'><div class='col-md-1 {{glyphicon}}'></div><div class='col-md-9'>{{label}}</div></div>";

            view = $compile(template)(scope);
            return $(element).html(view);
          });
        }
      };
    }
  ]).directive('fbForm', [
    '$injector', function($injector) {
      return {
        restrict: 'A',
        require: 'ngModel',
        replace:true,
        scope: {
          formName: '@fbForm',
          input: '=ngModel',
          "default": '=fbDefault',
          formCode:'='
        },
        template: "<div class='fb-form-object' ng-repeat=\"object in form\" fb-form-object=\"object\"></div>",
        controller: 'fbFormController',
        link: function(scope, element, attrs) {
          var $builder, _base, _name;
          $builder = $injector.get('$builder');
          if ((_base = $builder.forms)[_name = scope.formName] == null) {
            _base[_name] = [];
          }
          return scope.form = $builder.forms[scope.formName];
        }
      };
    }
  ]).directive('fbFormObject', [
    '$injector', function($injector) {
      var $builder, $compile, $parse;
      $builder = $injector.get('$builder');
      $compile = $injector.get('$compile');
      $parse = $injector.get('$parse');
      return {
        restrict: 'A',
        replace:true,
        controller: 'fbFormObjectController',
        link: function(scope, element, attrs) {
          scope.formObject = $parse(attrs.fbFormObject)(scope);
          scope.$component = $builder.components[scope.formObject.component];
          scope.$on($builder.broadcastChannel.updateInput, function() {
            return scope.updateInput(scope.inputText);
          });
          if (scope.$component.arrayToText) {
        	//scope.formCode = "";
            scope.inputArray = [];
            scope.$watch('inputArray', function(newValue, oldValue) {
              var checked, index, _ref;
              if (newValue === oldValue) {
                return;
              }
              checked = [];
              for (index in scope.inputArray) {
                if (scope.inputArray[index]) {
                  checked.push((_ref = scope.options[index]) != null ? _ref : scope.inputArray[index]);
                }
              }
              return scope.inputText = checked.join(', ');
            }, true);
          }
          scope.$watch('inputText', function() {
            return scope.updateInput(scope.inputText);
          });
          scope.$watch(attrs.fbFormObject, function() {
            return scope.copyObjectToScope(scope.formObject);
          }, true);
          scope.$watch('$component.template', function(template) {
            var $input, $template, view;
            if (!template) {
              return;
            }
            $template = $(template);
            $input = $template.find("[ng-model='inputText']");
            $input.attr({
              validator: '{{validation}}'
            });
            view = $compile($template)(scope);

            return $(element).html(view);
          });
          if (!scope.$component.arrayToText && scope.formObject.options.length > 0) {
            scope.inputText = scope.formObject.options[0];
          }
          return scope.$watch("default['" + scope.formObject.id + "']", function(value) {
            if (!value) {
              return;
            }
            if (scope.$component.arrayToText) {
              return scope.inputArray = value;
            } else {
              return scope.inputText = value;
            }
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('builder.drag', []).provider('$drag', function() {
    var $injector, $rootScope, delay;
    $injector = null;
    $rootScope = null;
    this.data = {
      draggables: {},
      droppables: {}
    };
    this.mouseMoved = false;
    this.isMouseMoved = (function(_this) {
      return function() {
        return _this.mouseMoved;
      };
    })(this);
    this.hooks = {
      down: {},
      move: {},
      up: {}
    };
    this.eventMouseMove = function() {};
    this.eventMouseUp = function() {};
    $((function(_this) {
      return function() {
        $(document).on('mousedown', function(e) {
          var func, key, _ref;
          _this.mouseMoved = false;
          _ref = _this.hooks.down;
          for (key in _ref) {
            func = _ref[key];
            func(e);
          }
        });
        $(document).on('mousemove', function(e) {
          var func, key, _ref;
          _this.mouseMoved = true;
          _ref = _this.hooks.move;
          for (key in _ref) {
            func = _ref[key];
            func(e);
          }
        });
        return $(document).on('mouseup', function(e) {
          var func, key, _ref;
          _ref = _this.hooks.up;
          for (key in _ref) {
            func = _ref[key];
            func(e);
          }
        });
      };
    })(this));
    this.currentId = 0;
    this.getNewId = (function(_this) {
      return function() {
        return "" + (_this.currentId++);
      };
    })(this);
    this.setupEasing = function() {
      return jQuery.extend(jQuery.easing, {
        easeOutQuad: function(x, t, b, c, d) {
          return -c * (t /= d) * (t - 2) + b;
        }
      });
    };
    this.setupProviders = function(injector) {

      /*
      Setup providers.
       */
      $injector = injector;
      return $rootScope = $injector.get('$rootScope');
    };
    this.isHover = (function(_this) {
      return function($elementA, $elementB) {

        /*
        Is element A hover on element B?
        @param $elementA: jQuery object
        @param $elementB: jQuery object
         */
        var isHover, offsetA, offsetB, sizeA, sizeB;
        offsetA = $elementA.offset();
        offsetB = $elementB.offset();
        sizeA = {
          width: $elementA.width(),
          height: $elementA.height()
        };
        sizeB = {
          width: $elementB.width(),
          height: $elementB.height()
        };
        isHover = {
          x: false,
          y: false
        };
        isHover.x = offsetA.left > offsetB.left && offsetA.left < offsetB.left + sizeB.width;
        isHover.x = isHover.x || offsetA.left + sizeA.width > offsetB.left && offsetA.left + sizeA.width < offsetB.left + sizeB.width;
        if (!isHover) {
          return false;
        }
        isHover.y = offsetA.top > offsetB.top && offsetA.top < offsetB.top + sizeB.height;
        isHover.y = isHover.y || offsetA.top + sizeA.height > offsetB.top && offsetA.top + sizeA.height < offsetB.top + sizeB.height;
        return isHover.x && isHover.y;
      };
    })(this);
    delay = function(ms, func) {
      return setTimeout(function() {
        return func();
      }, ms);
    };
    this.autoScroll = {
      up: false,
      down: false,
      scrolling: false,
      scroll: (function(_this) {
        return function() {
          _this.autoScroll.scrolling = true;
          if (_this.autoScroll.up) {
            $('html, body').dequeue().animate({
              scrollTop: $(window).scrollTop() - 50
            }, 100, 'easeOutQuad');
            return delay(100, function() {
              return _this.autoScroll.scroll();
            });
          } else if (_this.autoScroll.down) {
            $('html, body').dequeue().animate({
              scrollTop: $(window).scrollTop() + 50
            }, 100, 'easeOutQuad');
            return delay(100, function() {
              return _this.autoScroll.scroll();
            });
          } else {
            return _this.autoScroll.scrolling = false;
          }
        };
      })(this),
      start: (function(_this) {
        return function(e) {
          if (e.clientY < 50) {
            _this.autoScroll.up = true;
            _this.autoScroll.down = false;
            if (!_this.autoScroll.scrolling) {
              return _this.autoScroll.scroll();
            }
          } else if (e.clientY > $(window).innerHeight() - 50) {
            _this.autoScroll.up = false;
            _this.autoScroll.down = true;
            if (!_this.autoScroll.scrolling) {
              return _this.autoScroll.scroll();
            }
          } else {
            _this.autoScroll.up = false;
            return _this.autoScroll.down = false;
          }
        };
      })(this),
      stop: (function(_this) {
        return function() {
          _this.autoScroll.up = false;
          return _this.autoScroll.down = false;
        };
      })(this)
    };
    this.dragMirrorMode = (function(_this) {
      return function($element, defer, object) {
        var result;
        if (defer == null) {
          defer = true;
        }
        result = {
          id: _this.getNewId(),
          mode: 'mirror',
          maternal: $element[0],
          element: null,
          object: object
        };
        $element.on('mousedown', function(e) {
          var $clone;
          e.preventDefault();
          $clone = $element.clone();
          result.element = $clone[0];
          $clone.addClass("fb-draggable form-horizontal prepare-dragging");
          _this.hooks.move.drag = function(e, defer) {
            var droppable, id, _ref, _results;
            if ($clone.hasClass('prepare-dragging')) {
              $clone.css({
                width: $element.width(),
                height: $element.height()
              });
              $clone.removeClass('prepare-dragging');
              $clone.addClass('dragging');
              if (defer) {
                return;
              }
            }
            $clone.offset({
              left: e.pageX - $clone.width() / 2,
              top: e.pageY - $clone.height() / 2
            });
            _this.autoScroll.start(e);
            _ref = _this.data.droppables;
            _results = [];
            for (id in _ref) {
              droppable = _ref[id];
              if (_this.isHover($clone, $(droppable.element))) {
                _results.push(droppable.move(e, result));
              } else {
                _results.push(droppable.out(e, result));
              }
            }
            return _results;
          };
          _this.hooks.up.drag = function(e) {
            var droppable, id, isHover, _ref;
            _ref = _this.data.droppables;
            for (id in _ref) {
              droppable = _ref[id];
              isHover = _this.isHover($clone, $(droppable.element));
              droppable.up(e, isHover, result);
            }
            delete _this.hooks.move.drag;
            delete _this.hooks.up.drag;
            result.element = null;
            $clone.remove();
            angular.element(droppable.element).scope().$emit("dragUp");
            
            return _this.autoScroll.stop();
          };
          $('body').append($clone);
          if (!defer) {
            return _this.hooks.move.drag(e, defer);
          }
        });
        return result;
      };
    })(this);
    this.dragDragMode = (function(_this) {
      return function($element, defer, object) {
        var result;
        if (defer == null) {
          defer = true;
        }
        result = {
          id: _this.getNewId(),
          mode: 'drag',
          maternal: null,
          element: $element[0],
          object: object
        };
        $element.addClass('fb-draggable');
        $element.on('mousedown', function(e) {
          e.preventDefault();
          if ($element.hasClass('dragging')) {
            return;
          }
          $element.addClass('prepare-dragging');
          _this.hooks.move.drag = function(e, defer) {
            var droppable, id, _ref;
            if ($element.hasClass('prepare-dragging')) {
              $element.css({
                width: $element.width(),
                height: $element.height()
              });
              $element.removeClass('prepare-dragging');
              $element.addClass('dragging');
              if (defer) {
                return;
              }
            }
            $element.offset({
              left: e.pageX - $element.width() / 2,
              top: e.pageY - $element.height() / 2
            });
            _this.autoScroll.start(e);
            _ref = _this.data.droppables;
            for (id in _ref) {
              droppable = _ref[id];
              if (_this.isHover($element, $(droppable.element))) {
                droppable.move(e, result);
              } else {
                droppable.out(e, result);
              }
            }
          };
          _this.hooks.up.drag = function(e) {
            var droppable, id, isHover, _ref;
            _ref = _this.data.droppables;
            for (id in _ref) {
              droppable = _ref[id];
              isHover = _this.isHover($element, $(droppable.element));
              droppable.up(e, isHover, result);
            }
            delete _this.hooks.move.drag;
            delete _this.hooks.up.drag;
            $element.css({
              width: '',
              height: '',
              left: '',
              top: ''
            });
            $element.removeClass('dragging defer-dragging');
            angular.element(droppable.element).scope().$emit("dragUp");
            return _this.autoScroll.stop();
          };
          if (!defer) {
            return _this.hooks.move.drag(e, defer);
          }
        });
        return result;
      };
    })(this);
    this.dropMode = (function(_this) {
      return function($element, options) {
        var result;
        result = {
          id: _this.getNewId(),
          element: $element[0],
          move: function(e, draggable) {
            return $rootScope.$apply(function() {
              return typeof options.move === "function" ? options.move(e, draggable) : void 0;
            });
          },
          up: function(e, isHover, draggable) {
            return $rootScope.$apply(function() {
              return typeof options.up === "function" ? options.up(e, isHover, draggable) : void 0;
            });
          },
          out: function(e, draggable) {
            return $rootScope.$apply(function() {
              return typeof options.out === "function" ? options.out(e, draggable) : void 0;
            });
          }
        };
        return result;
      };
    })(this);
    this.draggable = (function(_this) {
      return function($element, options) {
        var draggable, element, result, _i, _j, _len, _len1;
        if (options == null) {
          options = {};
        }

        /*
        Make the element could be drag.
        @param element: The jQuery element.
        @param options: Options
            mode: 'drag' [default], 'mirror'
            defer: yes/no. defer dragging
            object: custom information
         */
        result = [];
        if (options.mode === 'mirror') {
          for (_i = 0, _len = $element.length; _i < _len; _i++) {
            element = $element[_i];
            draggable = _this.dragMirrorMode($(element), options.defer, options.object);
            result.push(draggable.id);
            _this.data.draggables[draggable.id] = draggable;
          }
        } else {
          for (_j = 0, _len1 = $element.length; _j < _len1; _j++) {
            element = $element[_j];
            draggable = _this.dragDragMode($(element), options.defer, options.object);
            result.push(draggable.id);
            _this.data.draggables[draggable.id] = draggable;
          }
        }
        return result;
      };
    })(this);
    this.droppable = (function(_this) {
      return function($element, options) {
        var droppable, element, result, _i, _len;
        if (options == null) {
          options = {};
        }

        /*
        Make the element coulde be drop.
        @param $element: The jQuery element.
        @param options: The droppable options.
            move: The custom mouse move callback. (e, draggable)->
            up: The custom mouse up callback. (e, isHover, draggable)->
            out: The custom mouse out callback. (e, draggable)->
         */
        result = [];
        for (_i = 0, _len = $element.length; _i < _len; _i++) {
          element = $element[_i];
          droppable = _this.dropMode($(element), options);
          result.push(droppable);
          _this.data.droppables[droppable.id] = droppable;
        }
        return result;
      };
    })(this);
    this.get = function($injector) {
      this.setupEasing();
      this.setupProviders($injector);
      return {
        isMouseMoved: this.isMouseMoved,
        data: this.data,
        draggable: this.draggable,
        droppable: this.droppable
      };
    };
    this.get.$inject = ['$injector'];
    this.$get = this.get;
  });

}).call(this);

(function() {
  angular.module('builder', ['builder.directive']);

}).call(this);


/*
    component:
        It is like a class.
        The base components are textInput, textArea, select, check, radio.
        User can custom the form with components.
    formObject:
        It is like an object (an instance of the component).
        User can custom the label, description, required and validation of the input.
    form:
        This is for end-user. There are form groups int the form.
        They can input the value to the form.
 */

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module('builder.provider', []).provider('$builder', function() {
    var $http, $injector, $templateCache;
    $injector = null;
    $http = null;
    $templateCache = null;
    this.config = {
      popoverPlacement: 'left'
    };
    this.components = {};
    this.groups = [];
    this.broadcastChannel = {
      updateInput: '$updateInput'
    };
    this.forms = {
      "default": []
    };
    this.convertComponent = function(name, component) {
      var result, _ref, _ref1, _ref2, _ref3, _ref4, _ref6, _ref7,
		      _ref8, _ref9,_ref13,_ref14,_ref15,_ref16,_ref17,_ref18,_ref19,
		      _ref20,_ref21,_ref22,_ref23,_ref24,_ref25,_ref26,_ref27,_ref28,
		      _ref31,_ref32,_ref34,_ref35,_ref36,_ref37,_ref38,_ref39,_ref42,
		      _ref43,_ref44,_ref45,_ref46,_ref47,_ref48,_ref49,_ref50,_ref51;
      result = {
        name: name,
        group: (_ref = component.group) != null ? _ref : 'Default',
        label: (_ref1 = component.label) != null ? _ref1 : '',
        glyphicon: (_ref51 = component.glyphicon) != null ? _ref51 : '',////////////
        description: (_ref2 = component.description) != null ? _ref2 : '',
        placeholder: (_ref3 = component.placeholder) != null ? _ref3 : '',
        editable: (_ref4 = component.editable) != null ? _ref4 : true,
        validation: (_ref6 = component.validation) != null ? _ref6 : '/.*/',
        		
        validationOptions: (_ref7 = component.validationOptions) != null ? _ref7 : [],
        options: (_ref8 = component.options) != null ? _ref8 : [],
        arrayToText: (_ref9 = component.arrayToText) != null ? _ref9 : false,
        template: component.template,
        templateUrl: component.templateUrl,
        popoverTemplate: component.popoverTemplate,
        popoverTemplateUrl: component.popoverTemplateUrl,
        
        bundle:(_ref13 = component.bundle) != null ? _ref13 : '',        
        nullable:(_ref14 = component.nullable) != null ? _ref14 : '否',        
        authority:(_ref15 = component.authority) != null ? _ref15 : '',        
        col1:(_ref16 = component.col1) != null ? _ref16 : '2',        
        col2:(_ref17 = component.col2) != null ? _ref17 : '10',       
        isEdit:(_ref18 = component.isEdit) != null ? _ref18 : '是',    
        isHide:(_ref19 = component.isHide) != null ? _ref19 : '否' ,
        billCodeTypeName:(_ref20 = component.billCodeTypeName) != null ? _ref20 : '',
        billCodeRule:(_ref21 = component.billCodeRule) != null ? _ref21 : '',
        variables:(_ref22 = component.variables) != null ? _ref22 : '',
        seqences:(_ref23 = component.seqences) != null ? _ref23 : '',
        bindVal:(_ref24 = component.bindVal) != null ? _ref24 : '',
        entityName:(_ref25 = component.entityName) != null ? _ref25 : '',
        index:(_ref26 = component.index) != null ? _ref26 : '',
        orientation:(_ref28 = component.orientation) != null ? _ref28 : '',
        options_table:(_ref31 = component.options_table) != null ? _ref31 : '',
        defaultValue:(_ref32 = component.defaultValue) != null ? _ref32 : '',
        dataSource:(_ref34 = component.dataSource) != null ? _ref34 : '',
        foreignKeyView:(_ref35 = component.foreignKeyView) != null ? _ref35 : '',
        eachPageSize:(_ref36 = component.eachPageSize) != null ? _ref36 : '',
        layoutStyle:(_ref37 = component.layoutStyle) != null ? _ref37 : '',
        joinTableName:(_ref38 = component.joinTableName) != null ? _ref38 : '',
        displayFields:(_ref39 = component.displayFields) != null ? _ref39 : '',		
        imgWidth:(_ref42 = component.imgWidth) != null ? _ref42 : '',
        imgHeight:(_ref43 = component.imgHeight) != null ? _ref43 : '',
        limitWidth:(_ref44 = component.limitWidth) != null ? _ref44 : '',		
        limitHeight:(_ref45 = component.limitHeight) != null ? _ref45 : '',
        limitType:(_ref46 = component.limitType) != null ? _ref46 : '',
        limitSizeM:(_ref47 = component.limitSizeM) != null ? _ref47 : '',
        limitSizeK:(_ref48 = component.limitSizeK) != null ? _ref48 : '',
        limitSizeB:(_ref49 = component.limitSizeB) != null ? _ref49 : '',	
        format:(_ref50 = component.format) != null ? _ref50 : 'yyyy-mm-dd',
      };
      if (!result.template && !result.templateUrl) {
        console.error("The template is empty.");
      }
      if (!result.popoverTemplate && !result.popoverTemplateUrl) {
        console.error("The popoverTemplate is empty.");
      }
      return result;
    };
    this.convertFormObject = function(name, formObject) {
      var component, result, _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
		      _ref7,_ref13,_ref14,_ref15,_ref16,_ref17,_ref18,_ref19,_ref20,_ref21,
		      _ref22,_ref23,_ref24,_ref25,_ref26,_ref27,_ref28,_ref31,_ref32,_ref34,
		      _ref35,_ref36,_ref37,_ref38,_ref39,_ref42,_ref43,_ref44,_ref45,_ref46,
		      _ref47,_ref48,_ref49,_ref50,_ref51;
      if (formObject == null) {
        formObject = {};
      }
      component = this.components[formObject.component];
      if (component == null) {
        throw "The component " + formObject.component + " was not registered.";
      }
      result = {
        id: formObject.id,
        component: formObject.component.replace(/\d*\//g,""),
        editable: (_ref = formObject.editable) != null ? _ref : component.editable,
        index: (_ref1 = formObject.index) != null ? _ref1 : 0,
        label: (_ref2 = formObject.label) != null ? _ref2 : component.label,
        glyphicon: (_ref51 = formObject.glyphicon) != null ? _ref51 : component.glyphicon,//////////////
        description: (_ref3 = formObject.description) != null ? _ref3 : component.description,
        placeholder: (_ref4 = formObject.placeholder) != null ? _ref4 : component.placeholder,
        options: (_ref5 = formObject.options) != null ? _ref5 : component.options,
        validation: (_ref7 = formObject.validation) != null ? _ref7 : component.validation,
		
        bundle:(_ref13 = formObject.bundle) != null ? _ref13 : component.bundle,        
        nullable:(_ref14 = formObject.nullable) != null ? _ref14 : component.nullable,        
        authority:(_ref15 = formObject.authority) != null ? _ref15 : component.authority,        
        col1:(_ref16 = formObject.col1) != null ? _ref16 : component.col1,        
        col2:(_ref17 = formObject.col2) != null ? _ref17 : component.col2,       
        isEdit:(_ref18 = formObject.isEdit) != null ? _ref18 : component.isEdit,    
        isHide:(_ref19 = formObject.isHide) != null ? _ref19 : component.isHide,
        
        billCodeTypeName:(_ref20 = formObject.billCodeTypeName) != null ? _ref20 : component.billCodeTypeName,
        billCodeRule:(_ref21 = formObject.billCodeRule) != null ? _ref21 : component.billCodeRule,
        variables:(_ref22 = formObject.variables) != null ? _ref22 : component.variables,
        seqences:(_ref23 = formObject.seqences) != null ? _ref23 : component.seqences,
        bindVal:(_ref24 = formObject.bindVal) != null ? _ref24 : component.bindVal,
        entityName:(_ref25 = formObject.entityName) != null ? _ref25 : component.entityName,
        index:(_ref26 = formObject.index) != null ? _ref26 : component.index,
        orientation:(_ref28 = formObject.orientation) != null ? _ref28 : component.orientation,
        options_table:(_ref31 = formObject.options_table) != null ? _ref31 : component.options_table,
        defaultValue:(_ref32 = formObject.defaultValue) != null ? _ref32 : component.defaultValue,
        dataSource:(_ref34 = formObject.dataSource) != null ? _ref34 : component.dataSource,
        foreignKeyView:(_ref35 = formObject.foreignKeyView) != null ? _ref35 : component.foreignKeyView,
        eachPageSize:(_ref36 = formObject.eachPageSize) != null ? _ref36 : component.eachPageSize,
        layoutStyle:(_ref37 = formObject.layoutStyle) != null ? _ref37 : component.layoutStyle,
        joinTableName:(_ref38 = formObject.joinTableName) != null ? _ref38 : component.joinTableName,
        displayFields:(_ref39 = formObject.displayFields) != null ? _ref39 : component.displayFields,		
        imgWidth:(_ref42 = formObject.imgWidth) != null ? _ref42 : component.imgWidth,
        
        imgHeight:(_ref43 = formObject.imgHeight) != null ? _ref43 : component.imgHeight,
        limitWidth:(_ref44 = formObject.limitWidth) != null ? _ref44 : component.limitWidth,		
        limitHeight:(_ref45 = formObject.limitHeight) != null ? _ref45 : component.limitHeight,
        limitType:(_ref46 = formObject.limitType) != null ? _ref46 : component.limitType,
        limitSizeM:(_ref47 = formObject.limitSizeM) != null ? _ref47 : component.limitSizeM,
        limitSizeK:(_ref48 = formObject.limitSizeK) != null ? _ref48 : component.limitSizeK,
        limitSizeB:(_ref49 = formObject.limitSizeB) != null ? _ref49 : component.limitSizeB,			
        format:(_ref50 = formObject.format) != null ? _ref50 : component.format
      };
      return result;
    };
    this.reindexFormObject = (function(_this) {
      return function(name) {
        var formObjects, index, _i, _ref;
        formObjects = _this.forms[name];
        for (index = _i = 0, _ref = formObjects.length; _i < _ref; index = _i += 1) {
          formObjects[index].index = index;
        }
      };
    })(this);
    this.setupProviders = (function(_this) {
      return function(injector) {
        $injector = injector;
        $http = $injector.get('$http');
        return $templateCache = $injector.get('$templateCache');
      };
    })(this);
    this.loadTemplate = function(component) {

      /*
      Load template for components.
      @param component: {object} The component of $builder.
       */
      if (component.template == null) {
        $http.get(component.templateUrl, {
          cache: $templateCache
        }).success(function(template) {
          return component.template = template;
        });
      }
      if (component.popoverTemplate == null) {
        return $http.get(component.popoverTemplateUrl, {
          cache: $templateCache
        }).success(function(template) {
          return component.popoverTemplate = template;
        });
      }
    };
    this.registerComponent = (function(_this) {
      return function(name, component) {
        var newComponent, _ref;
        if (component == null) {
          component = {};
        }

        /*
        Register the component for form-builder.
        @param name: The component name.
        @param component: The component object.
            group: {string} The component group.
            label: {string} The label of the input.
            description: {string} The description of the input.
            placeholder: {string} The placeholder of the input.
            editable: {bool} Is the form object editable?
            required: {bool} Is the form object required?
            validation: {string} angular-validator. "/regex/" or "[rule1, rule2]". (default is RegExp(.*))
            validationOptions: {array} [{rule: angular-validator, label: 'option label'}] the options for the validation. (default is [])
            options: {array} The input options.
            arrayToText: {bool} checkbox could use this to convert input (default is no)
            template: {string} html template
            templateUrl: {string} The url of the template.
            popoverTemplate: {string} html template
            popoverTemplateUrl: {string} The url of the popover template.
         */
        if (_this.components[name] == null) {
          newComponent = _this.convertComponent(name, component);
          _this.components[name] = newComponent;
          if ($injector != null) {
            _this.loadTemplate(newComponent);
          }
          if (_ref = newComponent.group, __indexOf.call(_this.groups, _ref) < 0) {
            _this.groups.push(newComponent.group);
          }
        } else {
          console.error("The component " + name + " was registered.");
        }
      };
    })(this);
    this.addFormObject = (function(_this) {
      return function(name, formObject) {
        var _base;
        if (formObject == null) {
          formObject = {};
        }

        /*
        Insert the form object into the form at last.
         */
        if ((_base = _this.forms)[name] == null) {
          _base[name] = [];
        }
        return _this.insertFormObject(name, _this.forms[name].length, formObject);
      };
    })(this);
    this.insertFormObject = (function(_this) {
      return function(name, index, formObject) {
        var _base;
        if (formObject == null) {
          formObject = {};
        }

        /*
        Insert the form object into the form at {index}.
        @param name: The form name.
        @param index: The form object index.
        @param form: The form object.
            id: The form object id.
            component: {string} The component name
            editable: {bool} Is the form object editable? (default is yes)
            label: {string} The form object label.
            description: {string} The form object description.
            placeholder: {string} The form object placeholder.
            options: {array} The form object options.
            required: {bool} Is the form object required? (default is no)
            validation: {string} angular-validator. "/regex/" or "[rule1, rule2]".
            [index]: {int} The form object index. It will be updated by $builder.
        @return: The form object.
         */
        if ((_base = _this.forms)[name] == null) {
          _base[name] = [];
        }
        if (index > _this.forms[name].length) {
          index = _this.forms[name].length;
        } else if (index < 0) {
          index = 0;
        }
        _this.forms[name].splice(index, 0, angular.copy(_this.convertFormObject(name, formObject)));
        _this.reindexFormObject(name);
        return _this.forms[name][index];
      };
    })(this);
    this.removeFormObject = (function(_this) {
      return function(name, index) {

        /*
        Remove the form object by the index.
        @param name: The form name.
        @param index: The form object index.
         */
        var formObjects;
        formObjects = _this.forms[name];
        formObjects.splice(index, 1);
        return _this.reindexFormObject(name);
      };
    })(this);
    this.updateFormObjectIndex = (function(_this) {
      return function(name, oldIndex, newIndex) {

        /*
        Update the index of the form object.
        @param name: The form name.
        @param oldIndex: The old index.
        @param newIndex: The new index.
         */
        var formObject, formObjects;
        if (oldIndex === newIndex) {
          return;
        }
        formObjects = _this.forms[name];
        formObject = formObjects.splice(oldIndex, 1)[0];
        formObjects.splice(newIndex, 0, formObject);
        return _this.reindexFormObject(name);
      };
    })(this);
    this.$get = [
      '$injector', (function(_this) {
        return function($injector) {
          var component, name, _ref;
          _this.setupProviders($injector);
          _ref = _this.components;
          for (name in _ref) {
            component = _ref[name];
            _this.loadTemplate(component);
          }
          return {
            config: _this.config,
            components: _this.components,
            groups: _this.groups,
            forms: _this.forms,
            broadcastChannel: _this.broadcastChannel,
            registerComponent: _this.registerComponent,
            addFormObject: _this.addFormObject,
            insertFormObject: _this.insertFormObject,
            removeFormObject: _this.removeFormObject,
            updateFormObjectIndex: _this.updateFormObjectIndex
          };
        };
      })(this)
    ];
  });

}).call(this);