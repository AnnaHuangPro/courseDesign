angular.module('dDatePickerApp', [])
.directive('ddatepicker', ['$interpolate','$filter',function ($interpolate,$filter) {
  return {
    require:'ngModel',
    restrict : 'EA',
    replace:true,
    scope : {
    	pickerPosition:'@',
		customTemplateUrl : '@',
		placeholder:'@',
		noEnable:'='
	},
	replace:true,
	templateUrl : function(elem, attr) {
		if (attr.customTemplateUrl != null
				&& attr.customTemplateUrl != "") {
			return attr.customTemplateUrl;
		} else {
			if(attr.displayOnly != null && attr.displayOnly != ""){
				return 'compents/ddatepicker/asset/displayTemplate.html';
			}else{
				return 'compents/ddatepicker/asset/Template.html';
			}
			
		}
	},
    link:function (scope, element, attrs, ngModelCtrl) {
    	
    	 function isIE() { //ie?  
             if (!!window.ActiveXObject || "ActiveXObject" in window) {
           	  console.log("ie");
                 return true;  
             }else{
           	  console.log("不是ie");
           	  return false; 
             }
         } 
    	 
    	scope.clearn = function()
    	{
   			ngModelCtrl.$setViewValue(null);
    		ngModelCtrl.$render();
    	}
    	
    	
    	scope.$watch("noEnable",function(newVal,oldVal){
    		if(newVal){
    			element.datetimepicker('remove');
    		}
    	})
    	/**
    	 * datepicker时间格式
    	 	p : meridian in lower case ('am' or 'pm') - according to locale file
			P : meridian in upper case ('AM' or 'PM') - according to locale file
			s : seconds without leading zeros
			ss : seconds, 2 digits with leading zeros
			i : minutes without leading zeros
			ii : minutes, 2 digits with leading zeros
			h : hour without leading zeros - 24-hour format
			hh : hour, 2 digits with leading zeros - 24-hour format
			H : hour without leading zeros - 12-hour format
			HH : hour, 2 digits with leading zeros - 12-hour format
			d : day of the month without leading zeros
			dd : day of the month, 2 digits with leading zeros
			m : numeric representation of month without leading zeros
			mm : numeric representation of the month, 2 digits with leading zeros
			M : short textual representation of a month, three letters
			MM : full textual representation of a month, such as January or March
			yy : two digit representation of a year
			yyyy : full numeric representation of a year, 4 digits
    	 * */
    	
    	
      var updateModel = function () {
        scope.$apply(function () {
        	var date = element.children()[0].value;
        	ngModelCtrl.$setViewValue(date);
        	element.datetimepicker('hide');
        });
      };
      
    

      var onSelectHandler = function(userHandler) {
        if ( userHandler ) {
          return function(value, picker) {
            updateModel();
            return userHandler(value, picker);
          };
        } else {
          return updateModel;
        }
      };

      var setUpDatePicker = function () {
        var options = scope.$eval(attrs.ddatepicker) || {};
        options.language = 'zh-CN';
        options.forceParse = false;
        if(options.format == undefined || options.format == "")
        {
        	if(attrs.format){
        		options.format = attrs.format; 
        	}else{
        		options.format = 'yyyy-mm-dd';
        	}
        }
        scope.formatStr = options.format;
        scope.initFormat();
        if(options.todayBtn == undefined || options.todayBtn == "")
        {
        	if(attrs.todayBtn){
        		options.todayBtn = attr.todayBtn;
        	}else{
        		options.todayBtn = true;
        	}
        	
        }       
        if(options.todayHighlight == undefined || options.todayHighlight == "")
        {
        	if(attrs.todayHighlight){
        		options.todayHighlight = attr.todayHighlight;
        	}else{
        		options.todayHighlight = true;
        	}
        }          
        //日期选择的话最小的日选择界面，时间日期界面默认最小分选择界面
        if(scope.formatStr.indexOf("i") ==-1) 
    	{
        	options.minView = "month" ;// 2 or 'month' for month view (the default)
    	}
        //默认出现在左下角
        if (scope.pickerPosition == undefined || scope.pickerPosition == "") {
        	options.pickerPosition = "bottom-left";	
		}else {
			options.pickerPosition = scope.pickerPosition;
		}
        
        options.changeDate = onSelectHandler(options.onSelect);
        
        // In case the user changes the text directly in the input box
        element.bind('change', updateModel);
        // Remove any previous date picker, to ensure any config changes are picked up
//        element.datepicker('destroy');
        element.datetimepicker('remove');
        
        // Create the new datepicker widget
        element.datetimepicker(options);
        
        // Render will update the date picker with the date
        ngModelCtrl.$render();
      };
      
      scope.uniteFormat = function(dateInfo,dateStr){
    	  if(dateStr == null ||dateStr == undefined)
    	  {
    		  dateStr = "";
    	  }
    	  var year = dateInfo.year;
    	  var year_f = dateStr.substr(year.index,year.count);
    	  
    	  var month = dateInfo.month;
    	  var month_f = dateStr.substr(month.index,month.count);

    	  var day = dateInfo.day;
    	  var day_f = dateStr.substr(day.index,day.count);
    	  
    	  var hour = dateInfo.hour;
    	  var hour_f = dateStr.substr(hour.index,hour.count);
    	  if(hour_f == ""){
    		  hour_f = "00";
    	  }

    	  var min = dateInfo.min;
    	  var min_f = dateStr.substr(min.index,min.count);
    	  if(min_f == ""){
    		  min_f = "00";
    	  }

    	  var second = dateInfo.second;
    	  var second_f = dateStr.substr(second.index,second.count);
    	  if(second_f == ""){
    		  second_f ="00";
    	  }
    	 
    	  return year_f+"-"+month_f+"-"+day_f+" "+hour_f+":"+min_f+":"+second_f;
      }
      
      scope.customFormat = function(dateStr){
    	  var dateInfo = {};
    	  var formatStr = scope.formatStr; 
    	  
    	  var year = {};
    	  year.index = formatStr.indexOf("y");
    	  year.count = scope.countLetter("y");
    	  formatStr = formatStr.replace(/y/g,"*");
    	  var month = {};
    	  month.index = formatStr.indexOf("m");
    	  month.count = scope.countLetter("m");
    	  formatStr =  formatStr.replace(/m/g,"*");
    	  var day = {};
    	  day.index = formatStr.indexOf("d");
    	  day.count = scope.countLetter("d");
    	  formatStr =  formatStr.replace(/d/g,"*");
    	  
    	  var hour = {};
    	  hour.index = formatStr.indexOf("H");
    	  hour.count = scope.countLetter("H");
    	  formatStr = formatStr.replace(/H/g,"*");
    	  var min = {};
    	  min.index = formatStr.indexOf("i");
    	  min.count = scope.countLetter("i");
    	  formatStr = formatStr.replace(/i/g,"*");
    	  var second = {};
    	  second.index = formatStr.indexOf("s");
    	  second.count = scope.countLetter("s");
    	  formatStr = formatStr.replace(/s/g,"*");
    	  
    	  dateInfo.year = year;
    	  dateInfo.month = month;
    	  dateInfo.day = day;
    	  dateInfo.hour  = hour;
    	  dateInfo.min = min;
    	  dateInfo.second = second;
    	  return dateInfo;
      }
      scope.countLetter = function(letter){
    	  var count =0;
    	  for(var i =0,j=scope.formatStr.length;i<j;i++){
    		  if(scope.formatStr[i] == letter){
    			  count ++;
    		  }
    	  }
    	  return count;
      }
      
      ngModelCtrl.$parsers.push(function(date){
    	  //date = date.replace(/年/g,"-");
    	  //date = date.replace(/月/g,"-");
    	  //date = date.replace(/日/g,"");
    	  //yyyy年mm月dd日 HH时ii分ss秒
    	  //1899年12月06日 09时08分09秒
    	  if(date == null){
    		  return "";
    	  }
    	  var dateInfo = scope.customFormat(date);
    	  var uniteStr = scope.uniteFormat(dateInfo,date);
    	
    	  return date;
      });
      
      scope.initFormat = function(){
      	//$filter中 y M d h m s E 分别表示 年 月 日 时 分 秒 星期
      	//datePicker中 y [	M,m] d [H,h] i s [P,p] 分别表示年 月 日 时 分 秒 上下午 
      	//yyyy年mm月dd日 HH时ii分ss秒
      	//yyyy MM dd HH mm ss
      	
      	//将datepicker中的所有m换成M，所有i换成m
    	  if(!scope.formatStr){
    		  if(attrs.format){
    			  scope.formatStr = attrs.format;
    		  }else{
    			  if(scope.$eval(attrs.ddatepicker)){
    				  scope.formatStr = scope.$eval(attrs.ddatepicker).format;  
    			  }else{
    				  scope.formatStr='yyyy-mm-dd';
    			  }
    			  
    		  }
    		  
    	  }
    	  scope.filterFormatStr= scope.formatStr.replace(/m/g, "M");
    	  scope.filterFormatStr= scope.filterFormatStr.replace(/i/g, "m");
      }
     
      
      
      ngModelCtrl.$formatters.push(function(date) {
    	
    	if(typeof date == "string")
    	{
    		if(date != undefined && date != ""){
    			scope.initFormat();
    			if(isIE){
    				date=date.replace(/-/g,'/');
    			}
    			var dateObj = new Date(date);
    			if(scope.filterFormatStr.indexOf('HH') != -1){
    				scope.filterFormatStr=scope.filterFormatStr.replace('HH','hh');
    			}else if(scope.filterFormatStr.indexOf('hh') != -1){
    				scope.filterFormatStr=scope.filterFormatStr.replace('hh','HH');
    			}
            	var dateFormated = $filter('date')(dateObj,scope.filterFormatStr);
            	 scope.show = dateFormated;
            	 if(attrs.displayOnly){
            		 element.datetimepicker('remove');
            	 }
            	return dateFormated;
    		}
    		
    		return date;
    		
    	}
    	else if ( angular.isDefined(date) && date !== null && !angular.isDate(date) ) 
    	{
    		throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date);
    	}
        return dateFormated;
      });

      ngModelCtrl.$render = function () {
    	  if( ngModelCtrl.$viewValue == undefined)
		  {
    		  element.children()[0].value = "";		  
		  }
    	  else
		  {
    		  element.children()[0].value = ngModelCtrl.$viewValue;
		  }
//        element.datetimepicker("setDate", ngModelCtrl.$viewValue);
      };

      // Watch for changes to the directives options
      scope.$watch(attrs.ddatepicker, setUpDatePicker, true);
    }
  };
}]);