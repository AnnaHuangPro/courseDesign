/*! dddValidator v1.2.0 2015-08-06
 * 
 *  CaoJianLin    
 */
angular.module("ddd.validator", ["ng"])
.provider('dddValidator', [function () {
        var defaultRules = {
                required      : "该选项不能为空",
                maxlength     : "该选项输入值长度不能大于{maxlength}",
                minlength     : "该选项输入值长度不能小于{minlength}",
                email         : "输入邮件的格式不正确",
                repeat        : "两次输入不一致",
                pattern       : "该选项输入格式不正确",
                number        : "必须输入数字",
                unique: "该输入值已经存在，请重新输入",
                url           : "输入URL格式不正确",
                max           : "该选项输入值不能大于{max}",
                min           : "该选项输入值不能小于{min}"
            },
            defaultInputTips = {
                required      : "不能为空",
                maxlength     : "最长:{maxlength}",
                minlength     : "最短:{minlength}",
                email         : "邮件",
                repeat        : "两次不一致",
                pattern       : "正则表达式",
                number        : "数字",
                unique: "唯一",
                url           : "网址",
                max           : "最大:{max}",
                min           : "最小:{min}"
            },
            validtors =  ["ng-maxlength","ng-minlength","max","min","required","unique","pattern"];
			
        var validatorFn = function () {
          
            this.rules = [];
            this.isEmpty = function (object) {
                if (!object) {
                    return true;
                }
                if (object instanceof Array && object.length === 0) {
                    return true;
                }
                return false;
            };
            this.defaultShowError = function (elem,tooltip,inputTip,errorMessages,isShow) {
               
               this.defaultRemoveError(elem);
               var content ="";
//                if(tooltip != "")
//                { 
//                        content =  '<li class="glyphicon glyphicon-info-sign">' + tooltip+ '</li>';
//                }
//                if(inputTip != "")
//                { 
//                        content +=  '<li class="glyphicon glyphicon-info-sign">' + inputTip+ '</li>';
//                }                
            	angular.forEach(errorMessages,function(errorMessage,key)
    			{
            		content+= '<li class="has-error glyphicon glyphicon-remove-sign">' + errorMessage+ '</li>';
    			});
            	
            	var popover =elem.popover({
					trigger: 'hover focus',
					html: true,
					animation:false,
					content: content,
					placement: 'top'
				});
            	
				if(elem[0] == document.activeElement)
				{
				   elem.popover("show");
				}
            };
            this.defaultRemoveError = function (elem) {
            	elem.popover('destroy');
            };
            this.options = {
                blurValidate   : false,
                showError  : true,
                removeError: true
            }
        };

        validatorFn.prototype = {
            constructor     : validatorFn,
            config          : function (options) {
                this.options = angular.extend(this.options, options);
            },
            setRules        : function (rules) {
                this.rules = rules;
            },
            getErrorMessage : function (validationName, elem) {
                var msgTpl = null;
                if (!this.isEmpty(this.rules[elem.name]) && !this.isEmpty(this.rules[elem.name][validationName])) {
                    msgTpl = this.rules[elem.name][validationName];
                }
                switch (validationName) {
                    case "maxlength":
                        if (msgTpl !== null) {
                            return msgTpl.replace("{maxlength}", elem.attr("ng-maxlength"));
                        }
                        return defaultRules.maxlength.replace("{maxlength}", elem.attr("ng-maxlength"));
                    case "minlength":
                        if (msgTpl !== null) {
                            return msgTpl.replace("{minlength}", elem.getAttribute("ng-minlength"));
                        }
                        return defaultRules.minlength.replace("{minlength}", elem.attr("ng-minlength"));
                    case "max":
                        if (msgTpl !== null) {
                            return msgTpl.replace("{max}", elem.attr("max"));
                        }
                        return defaultRules.max.replace("{max}", elem.attr("max"));
                    case "min":
                        if (msgTpl !== null) {
                            return msgTpl.replace("{min}", elem.attr("min"));
                        }
                        return defaultRules.min.replace("{min}", elem.attr("min"));
                    case "unique":
                    	if (msgTpl !== null) {
                            return msgTpl;
                        }
                        return defaultRules.unique; 
                    case "pattern":
                    	if (msgTpl !== null) {
                            return msgTpl;
                        }
                        return defaultRules.pattern; 
                    case "required":
                        if (msgTpl !== null) {
                            return msgTpl;
                        }
                        return defaultRules.required;     
                    default :
                    {
                        if (msgTpl !== null) {
                            return msgTpl;
                        }
                        if (defaultRules[validationName] === null) {
                            throw new Error("该验证规则(" + validationName + ")默认错误信息没有设置！");
                        }
                        if(validationName != null){
                        	return validationName;
                        }
                        
                        return defaultRules[validationName];
                    }

                }
                
            },
            getErrorMessages: function (elem, errors) {
                var elementErrors = [];
                for (var err in errors) {
                    if (errors[err]) {
                        var msg = this.getErrorMessage(err, elem);
                        elementErrors.push(msg);
                    }
                }
                return elementErrors;
            },
            showError       : function (elem,toolTip,inputTip, errorMessages,isShow) {
               return this.defaultShowError(elem, toolTip,inputTip,errorMessages,isShow);
            },
            removeError     : function (elem) {
               return this.defaultRemoveError(elem);
            },
            getInputTip : function (validationName, elem) {
                var msgTpl = null;
               
                switch (validationName) {
                    case "ng-maxlength":                      
                        return defaultInputTips.maxlength.replace("{maxlength}", elem.attr("ng-maxlength"));
                    case "ng-minlength":
                        return defaultInputTips.minlength.replace("{minlength}", elem.attr("ng-minlength"));
                    case "max":
                        return defaultInputTips.max.replace("{max}", elem.attr("max"));
                    case "min":                        
                        return defaultInputTips.min.replace("{min}", elem.attr("min"));
                    case "unique":  
                    	return defaultInputTips.unique;  
                    case "required":                      
                        return defaultInputTips.required;     
                    default :
                    {
                        if (defaultInputTips[validationName] === null) {
                            throw new Error("该验证规则(" + validationName + ")默认错误信息没有设置！");
                        }
                        return defaultInputTips[validationName];
                    }
                }
                
            },
            getInputTips: function(elem) {
				var inputTip = "";
            	for(var i =0;i<validtors.length;i++)
            	{
            		if(angular.isDefined(elem.attr(validtors[i])))
            		{
            			inputTip+=","+this.getInputTip(validtors[i],elem);
            		}
            	}
            	if(inputTip != "" )
            	{
            		inputTip = inputTip.substr(1);
            	}
            	return inputTip;
                
            }
        };

        var validator = new validatorFn();

        /**
         * 配置验证属性
         * @param options
         */
        this.config = function (options) {
            validator.config(options);
        };

        /**
         * 设置验证规则，提示信息
         * @param rules
         */
        this.setRules = function (rules) {
            validator.setRules(rules);
        };

        /**
         * 设置默认规则
         * @param rules
         */
        this.setDefaultRules = function (rules) {
            defaultRules = angular.extend(defaultRules, rules);
        };

        /**
         * get method
         * @returns {validatorFn}
         */
        this.$get = function () {
            return validator;
        }
    }])
    .directive("dddFormValidate", ['$parse', '$timeout','dddValidator', function ($parse, $timeout,dddValidator) {
        return {
        	require   : ['dddFormValidate', '^?form'],
            controller: ['$scope', function ($scope) {
                this.formCtrl = null;
                this.formName = null;
                this.formElement = null;
                
                this.init = function (formCtrl, formElement) {
                    this.formCtrl = formCtrl;
                    this.formElement = angular.element(formElement);
                    this.formName = this.formElement.attr("name");
                };
            }],
            link      : function (scope, form, attr, ctrls) {
                var formElem = form[0],
                    formName = form.attr("name"),
                    dddFormValidateCtrl = ctrls[0],
                    options = scope.$eval(attr.dddFormValidate);
                	options	= angular.extend({},{showError:false},options);
					 
	                var formCtrl = scope[formName];
	                var formElement = form[0];
	              
	                dddFormValidateCtrl.init(formCtrl, formElement);
                
				$timeout(function(){
	                var  formElem = $(formElement).find("[ng-model]");
	                //初始化验证规则，并时时监控输入值的变话 
	                for (var i = 0; i < formElem.size(); i++) {
	                    var $elem =angular.element(formElem[i]);
//	                    if(!angular.isDefined(elem.name)  || elem.name == "") continue;
//	                    var $elem = angular.element(elem);
	                    var $elemCtrl = $elem.controller('ngModel');
	                    if(angular.isUndefined($elemCtrl) ) continue;
	                   
	                    var tooltip = $elem.attr('placeholder');
	                    tooltip = !tooltip ?"":tooltip;

	                    var inputTip = dddValidator.getInputTips($elem);

	                    dddValidator.showError($elem,tooltip,inputTip,[],false);

	                    var watchCallback= (function($elem,tooltip,inputTip)
	                    {
	                            return function(newErrors,oldErrors)
	                             {
	                                // console.log(valid);

	                                var errorMessages = [];
	                                 
	                                errorMessages = dddValidator.getErrorMessages($elem,newErrors);

	                                 
	                                 if(errorMessages.length > 0)
	                                 {
	                                    dddValidator.showError($elem,tooltip,inputTip,errorMessages,true);
	                                 }
	                                 else
	                                 {
	                                    dddValidator.showError($elem,tooltip,inputTip,[],true);
	                                 }	
	                         
	                                };
	                      })($elem,tooltip,inputTip);
	                      var erroFn = (function($elemCtrl){
	                      		return function()
	                      		{
	                      			return $elemCtrl.$error;
	                      		}
	                      	})($elemCtrl);
	                    scope.$watch(erroFn,watchCallback,true);   
	                }
				},100); 
            }
        }
    }])
   