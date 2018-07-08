(function() {
  angular.module('app', ['builder', 'validator.rules',"formModule","dddReferenceApp","dddFileUploadApp","dddImgUploadApp","dddSelectApp",
                 	    "ng.ueditor","dDatePickerApp","dddSelectApp","ui.router","dynamicFormApp","ngResource","ui.bootstrap",
                	    "ListViewApp","selectModule","radioModule","checkboxModule","attachmentModule","previewForm","codeTableApp","ui.select",
                	    "dDataGridApp","asynchroMarkApp","ngDialog","operatorCongfigModule","reportViewModule","viewTreeService"]).run([
    '$builder', function($builder) {
      $builder.registerComponent('input', {
        group: '基础控件',
        label: '文本框',
        glyphicon:'glyphicon glyphicon-text-color',
        description: '',
        placeholder: '',
        bundle:'',
        validation:'',
        nullable:'否',
        authority:'',
        col1:2,
        col2:10,
        isEdit:'是',
        isHide:'否',
        templateUrl: 'js/angular-form-builder/example/template/input.html',
        popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/input.html'
      });
      $builder.registerComponent('radio', {
          group: '选择控件',
          label: '单选框',
          glyphicon:'glyphicon glyphicon-record',
          description: '',
          placeholder: '',
          orientation:'横排',
          dataSource:[{name:"选项一",value:"value1",isDefaultValue:true},{name:"选项二",value:"value2",isDefaultValue:false},{name:"选项三",value:"value3",isDefaultValue:false}],
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          orientation:'横排',
          templateUrl:'js/angular-form-builder/example/template/radio.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/radio/radio.html'
        });
      $builder.registerComponent('checkbox', {
          group: '选择控件',
          label: '多选框',
          glyphicon:'glyphicon glyphicon-unchecked',
          description: '',
          placeholder: '',
          orientation:'横排',
          dataSource:[{name:"选项一",value:"value1",isDefaultValue:false},{name:"选项二",value:"value2",isDefaultValue:false},{name:"选项三",value:"value3",isDefaultValue:false}],
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          templateUrl:'js/angular-form-builder/example/template/checkbox.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/checkbox/checkbox.html'
        });
      $builder.registerComponent('select', {
          group: '选择控件',
          label: '下拉框',
          glyphicon:'glyphicon glyphicon-collapse-down',
          description: '',
          placeholder: '请选择',
          dataSource:[{name:"选项一",value:"value1",isDefaultValue:false},{name:"选项二",value:"value2",isDefaultValue:false},{name:"选项三",value:"value3",isDefaultValue:false}],
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          nullable:'否',
          templateUrl:'js/angular-form-builder/example/template/select.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/select/select.html'
        });
      $builder.registerComponent('foreignKey', {
          group: '选择控件',
          label: '外键',
          glyphicon:'glyphicon glyphicon-leaf',
          description: '',
          placeholder: '',
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          nullable:'否',
          templateUrl:'js/angular-form-builder/example/template/foreignKey.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/foreignKey.html'
        });
      $builder.registerComponent('foreignKeyForText', {
          group: '选择控件',
          label: '文本外键',
          glyphicon:'glyphicon glyphicon-list-alt',
          description: '',
          placeholder: '',
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          nullable:'否',
          templateUrl:'js/angular-form-builder/example/template/foreignKeyForText.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/foreignKeyForText.html'
        });
      $builder.registerComponent('textArea', {
          group: '基础控件',
          label: '多行文本',
          glyphicon:'glyphicon glyphicon-align-justify',
          description: '',
          placeholder: '',
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          bundle:'',
          validation:'',
          defaultValue:'',
          nullable:'否',
          templateUrl:'js/angular-form-builder/example/template/textArea.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/textArea.html'
        });
      $builder.registerComponent('richText', {
          group: '基础控件',
          label: '富文本',
          glyphicon:'glyphicon glyphicon-align-justify',
          description: '',
          placeholder: '',
          type:'richText',	
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          bundle:'',
          validation:'',
          defaultValue:'',
          nullable:'否',
          templateUrl:'js/angular-form-builder/example/template/richText.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/richText.html'
        });
      $builder.registerComponent('singlePictureUpload', {
          group: '上传控件',
          label: '单图片',
          glyphicon:'glyphicon glyphicon-picture',
          description: '',
          placeholder: '',
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          templateUrl:'js/angular-form-builder/example/template/singlePictureUpload.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/singlePictureUpload.html'
        });
      $builder.registerComponent('fileUpload', {
          group: '上传控件',
          label: '附件上传',
          glyphicon:'glyphicon glyphicon-paperclip',
          description: '',
          placeholder: '',
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          templateUrl:'js/angular-form-builder/example/template/fileUpload.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/fileUpload.html'
        });
      $builder.registerComponent('datetime', {
          group: '基础控件',
          label: '时间日期',
          glyphicon:'glyphicon glyphicon-calendar',
          description: '',
          placeholder: '',
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          nullable:'否',
          templateUrl:'js/angular-form-builder/example/template/datetime.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/datetime.html'
        });
      $builder.registerComponent('foreignKeyCodeTable', {
          group: '选择控件',
          label: '外键码表',
          glyphicon:'glyphicon glyphicon-barcode',
          description: '',
          col1:2,
          col2:10,
          placeholder: '',
          isEdit:'是',
          isHide:'否',
          bundle:'',
          validation:'',
          defaultValue:'',
          nullable:'否',
          templateUrl:'js/angular-form-builder/example/template/foreignKeyCodeTable.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/foreignKeyCodeTable.html'
        });
      $builder.registerComponent('codeTable', {
          group: '选择控件',
          label: '码表',
          glyphicon:'glyphicon glyphicon-barcode',
          description: '',
          col1:2,
          col2:10,
          placeholder: '',
          isEdit:'是',
          isHide:'否',
          bundle:'',
          validation:'',
          defaultValue:'',
          nullable:'否',
          templateUrl:'js/angular-form-builder/example/template/codeTable.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/codeTable.html'
        });
     
         $builder.registerComponent('subTable', {
          group: '高级控件',
          label: '子表',
          glyphicon:'glyphicon glyphicon-sort-by-attributes-alt',
          description: '',
          placeholder: '',
          col1:2,
          col2:10,
          isEdit:'是',
          isHide:'否',
          templateUrl:'js/angular-form-builder/example/template/subTable.html',
          popoverTemplateUrl: 'js/angular-form-builder/example/popoverTemplate/subTable.html'
        });
    }
  ]).controller('DemoController', ['dialogs','$rootScope',
    '$scope', '$builder', '$validator', 'DynamicFormService','$timeout',function(dialogs,$rootScope,$scope, $builder, $validator,DynamicFormService,$timeout) {
      var checkbox, textbox;
      
      //$scope.numOfComponent = $builder = $injector.get('$builder');
      $scope.allLayoutStyle = "0";
      $scope.useDefaultCopy = false;
      $scope.toContainer = false;
      $scope.form = $builder.forms['default'];
      $scope.input = [];
      $scope.$watch("allLayoutStyle",function(newVal,oldVal){
    	  if (!angular.equals($scope.allLayoutStyle,"0") && !angular.equals($scope.form,[])) {
    		  $scope.preViewForm();
    	  }
      });
      
      /*if($scope.numOfComponent == 0) {
    	  alert("123456");
      }*/
      
      //以下是HTML格式化 HTMLFormat()******************************************
      var HTMLFormat = (function() {
          function style_html(html_source, indent_size, indent_character, max_char) {
              var Parser, multi_parser;
       
              function Parser() {
       
                  this.pos = 0;
                  this.token = '';
                  this.current_mode = 'CONTENT';
                  this.tags = {
                      parent: 'parent1',
                      parentcount: 1,
                      parent1: ''
                  };
                  this.tag_type = '';
                  this.token_text = this.last_token = this.last_text = this.token_type = '';
       
       
                  this.Utils = {
                      whitespace: "\n\r\t ".split(''),
                      single_token: 'br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed'.split(','),
                      extra_liners: 'head,body,/html'.split(','),
                      in_array: function(what, arr) {
                          for (var i = 0; i < arr.length; i++) {
                              if (what === arr[i]) {
                                  return true;
                              }
                          }
                          return false;
                      }
                  }
       
                  this.get_content = function() {
                      var char = '';
                      var content = [];
                      var space = false;
                      while (this.input.charAt(this.pos) !== '<') {
                          if (this.pos >= this.input.length) {
                              return content.length ? content.join('') : ['', 'TK_EOF'];
                          }
       
                          char = this.input.charAt(this.pos);
                          this.pos++;
                          this.line_char_count++;
       
       
                          if (this.Utils.in_array(char, this.Utils.whitespace)) {
                              if (content.length) {
                                  space = true;
                              }
                              this.line_char_count--;
                              continue;
                          } else if (space) {
                              if (this.line_char_count >= this.max_char) {
                                  content.push('\n');
                                  for (var i = 0; i < this.indent_level; i++) {
                                      content.push(this.indent_string);
                                  }
                                  this.line_char_count = 0;
                              } else {
                                  content.push(' ');
                                  this.line_char_count++;
                              }
                              space = false;
                          }
                          content.push(char);
                      }
                      return content.length ? content.join('') : '';
                  }
       
                  this.get_script = function() {
                      var char = '';
                      var content = [];
                      var reg_match = new RegExp('\<\/script' + '\>', 'igm');
                      reg_match.lastIndex = this.pos;
                      var reg_array = reg_match.exec(this.input);
                      var end_script = reg_array ? reg_array.index : this.input.length;
                      while (this.pos < end_script) {
                          if (this.pos >= this.input.length) {
                              return content.length ? content.join('') : ['', 'TK_EOF'];
                          }
       
                          char = this.input.charAt(this.pos);
                          this.pos++;
       
       
                          content.push(char);
                      }
                      return content.length ? content.join('') : '';
                  }
       
                  this.record_tag = function(tag) {
                      if (this.tags[tag + 'count']) {
                          this.tags[tag + 'count']++;
                          this.tags[tag + this.tags[tag + 'count']] = this.indent_level;
                      } else {
                          this.tags[tag + 'count'] = 1;
                          this.tags[tag + this.tags[tag + 'count']] = this.indent_level;
                      }
                      this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent;
                      this.tags.parent = tag + this.tags[tag + 'count'];
                  }
       
                  this.retrieve_tag = function(tag) {
                      if (this.tags[tag + 'count']) {
                          var temp_parent = this.tags.parent;
                          while (temp_parent) {
                              if (tag + this.tags[tag + 'count'] === temp_parent) {
                                  break;
                              }
                              temp_parent = this.tags[temp_parent + 'parent'];
                          }
                          if (temp_parent) {
                              this.indent_level = this.tags[tag + this.tags[tag + 'count']];
                              this.tags.parent = this.tags[temp_parent + 'parent'];
                          }
                          delete this.tags[tag + this.tags[tag + 'count'] + 'parent'];
                          delete this.tags[tag + this.tags[tag + 'count']];
                          if (this.tags[tag + 'count'] == 1) {
                              delete this.tags[tag + 'count'];
                          } else {
                              this.tags[tag + 'count']--;
                          }
                      }
                  }
       
                  this.get_tag = function() {
                      var char = '';
                      var content = [];
                      var space = false;
       
                      do {
                          if (this.pos >= this.input.length) {
                              return content.length ? content.join('') : ['', 'TK_EOF'];
                          }
       
                          char = this.input.charAt(this.pos);
                          this.pos++;
                          this.line_char_count++;
       
                          if (this.Utils.in_array(char, this.Utils.whitespace)) {
                              space = true;
                              this.line_char_count--;
                              continue;
                          }
       
                          if (char === "'" || char === '"') {
                              if (!content[1] || content[1] !== '!') {
                                  char += this.get_unformatted(char);
                                  space = true;
                              }
                          }
       
                          if (char === '=') {
                              space = false;
                          }
       
                          if (content.length && content[content.length - 1] !== '=' && char !== '>' && space) {
                              if (this.line_char_count >= this.max_char) {
                                  this.print_newline(false, content);
                                  this.line_char_count = 0;
                              } else {
                                  content.push(' ');
                                  this.line_char_count++;
                              }
                              space = false;
                          }
                          content.push(char);
                      } while (char !== '>');
       
                      var tag_complete = content.join('');
                      var tag_index;
                      if (tag_complete.indexOf(' ') != -1) {
                          tag_index = tag_complete.indexOf(' ');
                      } else {
                          tag_index = tag_complete.indexOf('>');
                      }
                      var tag_check = tag_complete.substring(1, tag_index).toLowerCase();
                      if (tag_complete.charAt(tag_complete.length - 2) === '/' || this.Utils.in_array(tag_check, this.Utils.single_token)) {
                          this.tag_type = 'SINGLE';
                      } else if (tag_check === 'script') {
                          this.record_tag(tag_check);
                          this.tag_type = 'SCRIPT';
                      } else if (tag_check === 'style') {
                          this.record_tag(tag_check);
                          this.tag_type = 'STYLE';
                      } else if (tag_check.charAt(0) === '!') {
                          if (tag_check.indexOf('[if') != -1) {
                              if (tag_complete.indexOf('!IE') != -1) {
                                  var comment = this.get_unformatted('-->', tag_complete);
                                  content.push(comment);
                              }
                              this.tag_type = 'START';
                          } else if (tag_check.indexOf('[endif') != -1) {
                              this.tag_type = 'END';
                              this.unindent();
                          } else if (tag_check.indexOf('[cdata[') != -1) {
                              var comment = this.get_unformatted(']]>', tag_complete);
                              content.push(comment);
                              this.tag_type = 'SINGLE';
                          } else {
                              var comment = this.get_unformatted('-->', tag_complete);
                              content.push(comment);
                              this.tag_type = 'SINGLE';
                          }
                      } else {
                          if (tag_check.charAt(0) === '/') {
                              this.retrieve_tag(tag_check.substring(1));
                              this.tag_type = 'END';
                          } else {
                              this.record_tag(tag_check);
                              this.tag_type = 'START';
                          }
                          if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) {
                              this.print_newline(true, this.output);
                          }
                      }
                      return content.join('');
                  }
       
                  this.get_unformatted = function(delimiter, orig_tag) {
                      if (orig_tag && orig_tag.indexOf(delimiter) != -1) {
                          return '';
                      }
                      var char = '';
                      var content = '';
                      var space = true;
                      do {
       
       
                          char = this.input.charAt(this.pos);
                          this.pos++
       
                          if (this.Utils.in_array(char, this.Utils.whitespace)) {
                              if (!space) {
                                  this.line_char_count--;
                                  continue;
                              }
                              if (char === '\n' || char === '\r') {
                                  content += '\n';
                                  for (var i = 0; i < this.indent_level; i++) {
                                      content += this.indent_string;
                                  }
                                  space = false;
                                  this.line_char_count = 0;
                                  continue;
                              }
                          }
                          content += char;
                          this.line_char_count++;
                          space = true;
       
       
                      } while (content.indexOf(delimiter) == -1);
                      return content;
                  }
       
                  this.get_token = function() {
                      var token;
       
                      if (this.last_token === 'TK_TAG_SCRIPT') {
                          var temp_token = this.get_script();
                          if (typeof temp_token !== 'string') {
                              return temp_token;
                          }
                          //token = js_beautify(temp_token, this.indent_size, this.indent_character, this.indent_level);
                          //return [token, 'TK_CONTENT'];
                          return [temp_token, 'TK_CONTENT'];
                      }
                      if (this.current_mode === 'CONTENT') {
                          token = this.get_content();
                          if (typeof token !== 'string') {
                              return token;
                          } else {
                              return [token, 'TK_CONTENT'];
                          }
                      }
       
                      if (this.current_mode === 'TAG') {
                          token = this.get_tag();
                          if (typeof token !== 'string') {
                              return token;
                          } else {
                              var tag_name_type = 'TK_TAG_' + this.tag_type;
                              return [token, tag_name_type];
                          }
                      }
                  }
       
                  this.printer = function(js_source, indent_character, indent_size, max_char) {
                      this.input = js_source || '';
                      this.output = [];
                      this.indent_character = indent_character || ' ';
                      this.indent_string = '';
                      this.indent_size = indent_size || 2;
                      this.indent_level = 0;
                      this.max_char = max_char || 70;
                      this.line_char_count = 0;
                      for (var i = 0; i < this.indent_size; i++) {
                          this.indent_string += this.indent_character;
                      }
       
                      this.print_newline = function(ignore, arr) {
                          this.line_char_count = 0;
                          if (!arr || !arr.length) {
                              return;
                          }
                          if (!ignore) {
                              while (this.Utils.in_array(arr[arr.length - 1], this.Utils.whitespace)) {
                                  arr.pop();
                              }
                          }
                          arr.push('\n');
                          for (var i = 0; i < this.indent_level; i++) {
                              arr.push(this.indent_string);
                          }
                      }
       
       
                      this.print_token = function(text) {
                          this.output.push(text);
                      }
       
                      this.indent = function() {
                          this.indent_level++;
                      }
       
                      this.unindent = function() {
                          if (this.indent_level > 0) {
                              this.indent_level--;
                          }
                      }
                  }
                  return this;
              }
       
              multi_parser = new Parser();
              multi_parser.printer(html_source, indent_character, indent_size);
              while (true) {
                  var t = multi_parser.get_token();
                  multi_parser.token_text = t[0];
                  multi_parser.token_type = t[1];
       
                  if (multi_parser.token_type === 'TK_EOF') {
                      break;
                  }
       
       
                  switch (multi_parser.token_type) {
                  case 'TK_TAG_START':
                  case 'TK_TAG_SCRIPT':
                  case 'TK_TAG_STYLE':
                      multi_parser.print_newline(false, multi_parser.output);
                      multi_parser.print_token(multi_parser.token_text);
                      multi_parser.indent();
                      multi_parser.current_mode = 'CONTENT';
                      break;
                  case 'TK_TAG_END':
                      multi_parser.print_newline(true, multi_parser.output);
                      multi_parser.print_token(multi_parser.token_text);
                      multi_parser.current_mode = 'CONTENT';
                      break;
                  case 'TK_TAG_SINGLE':
                      multi_parser.print_newline(false, multi_parser.output);
                      multi_parser.print_token(multi_parser.token_text);
                      multi_parser.current_mode = 'CONTENT';
                      break;
                  case 'TK_CONTENT':
                      if (multi_parser.token_text !== '') {
                          multi_parser.print_newline(false, multi_parser.output);
                          multi_parser.print_token(multi_parser.token_text);
                      }
                      multi_parser.current_mode = 'TAG';
                      break;
                  }
                  multi_parser.last_token = multi_parser.token_type;
                  multi_parser.last_text = multi_parser.token_text;
              }
              return multi_parser.output.join('');
          }
       
          return function(data) {
              var dataHolder = ['__dataHolder_', [Math.random(), Math.random(), Math.random(), Math.random()].join('_').replace(/[^0-9]/g, '_'), '_'].join('_');
              var dataHolders = {};
              var index = 0;
              data = data.replace(/(\")(data:[^\"]*)(\")/g, function($0, $1, $2, $3) {
                  var name = dataHolder + index++;
                  dataHolders[name] = $2;
                  return $1 + name + $3;
              })
              data = style_html(data, 1, '\t', 0x10000000);
              data = data.replace(new RegExp(dataHolder + '[0-9]+', 'g'), function($0) {
                  return dataHolders[$0];
              });
       
              return data;
          }
      })();
      //以上是HTML格式化 HTMLFormat()******************************************
      
	  $scope.$watch('formHtml', function(newVal, oldVal) {
	 	if (newVal !== oldVal) {
		 		$scope.formCode = HTMLFormat('<form class="form-horizontal">'+newVal+'</form>');
		 		
	 		}
		},true);
      
      function GetQueryString(name) 
      { 
      	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
      	var r = window.location.search.substr(1).match(reg); 
      	if (r!=null) return unescape(r[2]); return null; 
      }  
      function getDataConfig(data){
    	  var dataConfig = angular.fromJson(data.dataset.config);
    	  if(dataConfig.dataSource instanceof Array){
    	      angular.forEach(dataConfig.dataSource, function(data1){
    	    	  if(data1.isDefaultValue=="true")
    	    		  $timeout(function(){data1.isDefaultValue=true;},1000);
    	    	  else if(data1.isDefaultValue=="false")
    	    		  data1.isDefaultValue=false;
    	      });
    	  }
    	  return dataConfig;
      }
      $scope.$watch("selFDynamicForm",function(newVal,oldVal){
    	  var groupName = "可复制控件";
    	  if (angular.isDefined(newVal) && !angular.equals({},newVal) && !angular.equals(newVal,oldVal)) {
    		  if($scope.toContainer==false){
    			  $scope.findComponentByDynamicForm();
        		  $scope.selectGroup(null,groupName);
    		  }else if($scope.toContainer==true){
    			  $scope.copyToContainer();
    		  }
    	
    	  }
      });
      $scope.findComponentByDynamicForm = function(){
    	  var dynamicForm = $scope.selFDynamicForm;
		  angular.element('#build-form').html(dynamicForm.dynamicFormOldHtml); 
	      var buildForm = angular.element("#build-form").children();
	      for(var prop in $builder.components){
	    	  if(/\d*\//g.test(prop)){
	    		  delete $builder.components[prop];
	    	  }
	      }
	      angular.forEach(buildForm,function(data,index){
	    	  var dataConfig = getDataConfig(data);	
	    	  dataConfig.group = "可复制控件";
	    	  dataConfig.templateUrl = 'js/angular-form-builder/example/template/'+dataConfig.component+'.html';
	    	  var componentName = dataConfig.component;
	    	  if (angular.equals("radio",componentName) || angular.equals("checkbox",componentName) || angular.equals("select",componentName)) {
	    		  dataConfig.popoverTemplateUrl = 'js/angular-form-builder/example/popoverTemplate/'+componentName+'/'+componentName+'.html';
	    	  }else{
	    		  dataConfig.popoverTemplateUrl = 'js/angular-form-builder/example/popoverTemplate/'+componentName+'.html';
	    	  }
	    	  var myDate = new Date();
	    	  $builder.registerComponent(myDate.getTime()+index+"/"+componentName, dataConfig);
	      });
      }
      $scope.copyToContainer = function(){
    	  var dynamicForm = $scope.selFDynamicForm;
 		  angular.element('#build-form').html(dynamicForm.dynamicFormOldHtml); 
	      var buildForm = angular.element("#build-form").children();
	      angular.forEach(buildForm, function(data){
	    	  var dataConfig = getDataConfig(data);
	    	  $builder.forms["default"].push(dataConfig);
	      });
	      $scope.preViewForm();
      }
      $scope.findDynamicFormById = function(dynamicFormId){
    	  DynamicFormService.findDynamicFormById(dynamicFormId,sucesscb,errorcb)
		    function sucesscb(dynamicForm)
			{
    		  angular.element('#build-form').html(dynamicForm.dynamicFormOldHtml); 
		      var buildForm = angular.element("#build-form").children();
		      angular.forEach(buildForm, function(data){
		    	  var dataConfig = getDataConfig(data);
		    	  $builder.forms["default"].push(dataConfig);
		      });
		      $scope.formHtml = dynamicForm.dynamicFormNewHtml;
			}
			function errorcb(error)
			{
				alert("没有找到ID为"+dynamicFormId+"的表单！");
			}
      }
      
      if(GetQueryString("dynamicFormId")){
    	  $scope.findDynamicFormById(GetQueryString("dynamicFormId"));
      }
      $scope.$on("dragUp",function(){
    	  $scope.preViewForm();
      })
      $scope.$on("save",function(){
    	  $scope.preViewForm();
      })
      
      $scope.preViewForm = function()
      {
    	/**  统一化布局  */
    	var allLayoutStyle = $scope.allLayoutStyle;
        if (!angular.equals("0",allLayoutStyle)) {
 			angular.forEach($scope.form,function(obj,key){
 				if (angular.isDefined(obj.layoutStyle)) {
 					obj.layoutStyle = allLayoutStyle;
				}else{
					angular.extend(obj, {"layoutStyle":allLayoutStyle});
				}
 			});
        }
        /**  将copy的component名字统一化成系统含有的以便预览  */
        var form = angular.copy($scope.form);
        angular.forEach(form,function(value,index){
        	var component = value.component;
        	var myDate = new Date();
        	var time = myDate.getTime()+"";
        	if (!isNaN(component.substr(0,time.length-1))) {
        		value.component = component.substring(component.lastIndexOf('/')+1);
			}
        });
    	DynamicFormService.preViewForm({configs:form},sucesscb,errorcb);
  	  	
  		function sucesscb(formHtml)
  		{
  			$scope.formHtml = formHtml.preHtml;
  		}
  		function errorcb(error)
  		{
  			alert("预览失败！");
  			//$rootScope.openErrorDialog(error);
  		}
      }
      
      $scope.selectLayoutStyle = function(style){
    	  $scope.allLayoutStyle = style;
      }
      
      return $scope.submit = function() {
    	  var dynamicFormId = GetQueryString("dynamicFormId");
    	  var dynamicFormHtml = angular.element("#formContainer").html();
    	  
    	  DynamicFormService.updateDynamicFormById({dynamicFormId:dynamicFormId,configs:$scope.form,dynamicFormHtml:dynamicFormHtml},sucesscb,errorcb);
    	  	
    		function sucesscb()
    		{
    			dialogs.notify("提示信息","保存成功！！",{size:'sm'});
    		}
    		function errorcb(error)
    		{
    			dialogs.notify("提示信息","保存失败！！",{size:'sm'});
    		}
      };
    }
  ]);

}).call(this);
