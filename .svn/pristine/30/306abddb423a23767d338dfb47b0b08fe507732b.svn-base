angular.module("dddImgUploadApp",['dddUploadImg.tpl.html'])
.directive("dimgupload",function($parse, $q,$http){
	return{
		restrict:'E',
		require:'?ngModel',
		scope:{
			imgWidth:"=",
			imgHeight:"=",
			
			limitWidth:'=', //px
			limitHeight:'=', //px
			limitType:'=', // ['jpg','png']
			limitSizeM:'=', //number
			limitSizeK:'=', //number
			limitSizeB:'=', //number
			isFillUrl:'@'
			
//			projectName:"@"
		},
		link:function(scope,element,attrs,ngModelController){
			scope.imgWidth = scope.imgWidth	|| 100;
			scope.imgHeight = scope.imgHeight　|| 100;
			if(!ngModelController){
				throw new Error("dddUploadImg指令需要使用ng-model绑定路径，请在标签上绑定ng-model");
			}
			scope.showUrl = "../ShowImgServlet";
			function typeCheck(file){
				if(scope.limitType && scope.limitType.length > 0){
					var isValidate = false;
					var fileType = file.type;
					if(/image\/\w+/.test(fileType)){
						angular.forEach(scope.limitType,function(type,index,types){
							if(new RegExp("image/"+type,"i").test(fileType)){
								isValidate = true;
								return;
							}
						})
					}
					if(!isValidate){
						return $q.reject('上传图片类型错误!');
					}else{
						return file;
					}
				}
				else{
					return file;
				}
			}
			
			function memorySizeCheck(file){
				var isValidate = true;
				if(	angular.isNumber(scope.limitSizeM) || angular.isNumber(scope.limitSizeK) || angular.isNumber(scope.limitSizeB)){
					var limitSizeB = Math.max(Number.parseInt(scope.limitSizeM) || 0,0) * 1024*1024;
					limitSizeB += Math.max(Number.parseInt(scope.limitSizeK) || 0,0) * 1024;
					limitSizeB += Math.max(Number.parseInt(scope.limitSizeB) || 0,0);
					isValidate = limitSizeB >= file.size;
				}
				if(!isValidate){
					return $q.reject('上传图片大小超出!');
				}else{
					return file;
				}
			}
			
			function heightWidthCheck(file){
				if(scope.limitWidth && scope.limitHeight){
					var fileReadDeferred = $q.defer();
					var reader = new FileReader();  
					//将文件以Data URL形式读入页面  
					reader.readAsDataURL(file);  
					reader.onload=function(e){  
						var image=new Image();
						image.src=this.result;
						if(scope.limitWidth!=image.width || scope.limitHeight != image.height){
							fileReadDeferred.reject("上传图片尺寸错误！请上传【宽："+scope.limitWidth +"px,高："+scope.limitHeight+"px】的图片"); 
						}
						fileReadDeferred.resolve(file); 
					}
					return fileReadDeferred.promise;
				}else{
					return file;
				}
				
			}
			
	
			function uploadImg(file)
			{
				var uploadUrl = "../UploadServlet?associateType=img";
				var fd = new FormData();
				fd.append("imgFile",file);
				$http.post(uploadUrl, fd, {
		            transformRequest: angular.identity,
		            headers: {'Content-Type': undefined}
		        })
		        .success(function(data){
		        	scope.imgUrl = data;
		        })
		        .error(function(error){
		        	alert("上传的头像失败");
		        });
			}
			element.find("input").bind("change",function(changeEvent){
				
				var files = changeEvent.target.files;
				if(!files || files.length == 0){
					return;
				}
				var uploadDefer = $q.defer();
				uploadDefer.promise
									.then(typeCheck)
									.then(memorySizeCheck)
									.then(heightWidthCheck)
									.then(uploadImg)
									.catch(function error(msg){
										alert(msg);
									});
				uploadDefer.resolve(files[0]);
			});
			scope.$watch("imgUrl",function(newVal,oldVal){
				if(newVal != oldVal)
				{
					ngModelController.$setViewValue(newVal);
				}
			});
			function fillCompleteUrl(imgUrl){
				if(!imgUrl){
					scope.showUrl = "../ShowImgServlet";
					return "";
				}
				if(!angular.isUndefined(imgUrl)){
					var isOutSysImg = imgUrl.indexOf("http") == 0;
					
					if(isOutSysImg){
						scope.showUrl = imgUrl;
						return imgUrl;
					}
					else if(imgUrl.indexOf("ShowImgServlet") != -1){
						scope.showUrl = imgUrl;
					}
					else{
						scope.showUrl = "../ShowImgServlet?imgUrl="+imgUrl;
					}
					
					if(scope.isFillUrl){
						return "/CMS/ShowImgServlet?imgUrl="+imgUrl;
					}
					
					else{
						return imgUrl;
					}
				}
			}
			if(ngModelController){
				ngModelController.$parsers.push(fillCompleteUrl);
				ngModelController.$formatters.push(fillCompleteUrl);
			}
			scope.deleteImg = function(){
				ngModelController.$setViewValue("");
			}
			
		},
		templateUrl:'../ddd/compents/dddimgupload/asset/template.html'
	}
	
})
.directive('dddUploadImgBtn', [function() {
	return {
		restrict: 'A',
		scope: {
			bind: '='
		},
		compile:function(elems,attrs){
			if(!angular.isObject(window.UE))
				throw Error("请先导入ueditor");
			
			var ueditorInstance, ueditorUpImgDialog;
			
			elems[0].id =  elems[0].id || Date.now();
			ueditorInstance = UE.getEditor(elems[0].id,{
	        	isShow:false
	        });
			
			elems[0].onclick = function() {
		    	ueditorUpImgDialog = ueditorInstance.getDialog("insertimage");
		    	ueditorUpImgDialog.render();
		    	ueditorUpImgDialog.open();
		    }
		    
			return  function(scope, elems, attrs) {
		    	ueditorInstance.ready(function() {
		            // 新版本不要执行下行语句 否则监听事件无效
		            // _eidtorTemp.setDisabled();
		    		ueditorInstance.hide();
		    		ueditorInstance.addListener("afterInsertImage",function(a,b,c){
		    			console.log(a);
		    		})
		    		ueditorInstance.addListener("beforeInsertImage", function(t, waitUpImgs) {
		                // arg数组，上传的文件对象
	            		scope.$apply(function(){
	            			scope.bind = scope.bind ? scope.bind.concat(waitUpImgs) : waitUpImgs;
	            			angular.forEach(waitUpImgs,function(waitUpImg){
	            				waitUpImg.isDel = false;
	            				waitUpImg.isCheck = false;
			            	})
	            		})
		            })
		        })
			}
		}
	}
}])

.directive('dddUploadImg', [
	function() {
		return {
			restrict: 'E',
			scope: {
				bind: '='
			},
			replace:true,
			templateUrl:'dddUploadImg.tpl.html',
			link: function(scope, elem, attr) {
				scope.isSelectAll = false;
				scope.selectedNum = 0;
				scope.uploadImgArray = [];
				
				scope.toggleCheck_All = function(){
					scope.isSelectAll = !scope.isSelectAll;
					angular.forEach(scope.unDelImgArray,function(img){
						if(img.isCheck != scope.isSelectAll)
							scope.toggleCheck_One(img,scope.isSelectAll);
					});
				}
				
				scope.toggleCheck_One = function(img,isCheck){
					if(typeof isCheck == 'boolean'){
						img.isCheck = isCheck;
					}
					else{
						img.isCheck = !img.isCheck;
					}
					if(img.isCheck) 
						scope.selectedNum++;
					else
						scope.selectedNum--;
					
				}
				
				scope.isCheckAll = function(){
					scope.isSelectAll = (scope.selectedNum != 0 && scope.selectedNum == scope.unDelImgArray.length);
					return scope.isSelectAll;
				}
				
				scope.deleteCheck = function(){
					scope.refreshSrcArrayToBind();
				}
				
				scope.refreshSrcArrayToBind = function(){
					var srcArray = [];
					angular.forEach(scope.unDelImgArray,function(img){
						if(img.isCheck){
							img.isDel = true;
							scope.toggleCheck_One(img,false);
						}
						else{
							srcArray.push(img.src);
						}
					})
					
					scope.bind = JSON.stringify(srcArray);
				}
				
				scope.$watch(
					function(){
						return scope.unDelImgArray.length;
					},
					function(newValue,oldValue){
						if(newValue > oldValue){
							scope.refreshSrcArrayToBind();
					}
				})
				
			}
			
		}
	}
])

angular.module('dddUploadImg.tpl.html',[]).run(["$templateCache", function($templateCache) {
	$templateCache.put("dddUploadImg.tpl.html",
			"<div class='dddUploadImg'>"+
			" <link rel='stylesheet' href='compents/dddimgupload/css/directive.css'>"+
			"<div class='panel panel-default'>"+
			"<div class='panel-heading clearfix' style='line-height:30px;font-size:17px;background:rgb(234,234,234)'>"+
				"<ul class='menuUl'>"+
					"<li>"+
						"<a ng-click='toggleCheck_All()' style='float:left;cursor:pointer'><i class='glyphicon' ng-class='{false:\"glyphicon-unchecked\",true:\"glyphicon-check\"}[isCheckAll()]'></i></a>"+
					"</li>"+
					"<li ng-hide='selectedNum == 0'><small style='float:left'>已选中{{selectedNum}}个照片</small></li>"+
					"<li ng-hide='selectedNum == 0'><a class='btn btn-default btn-xs' ng-click='deleteCheck()'>删除</a></li>"+
				"</ul>"+
				"<a ddd-upload-img-btn bind='uploadImgArray' class='pull-right' style='cursor:pointer;font-size:20px' ng-click='alert(1)'><i class='glyphicon glyphicon-upload'></i></a>"+
			"</div>"+ 
			"<div class='panel-body' ng-hide='!unDelImgArray || unDelImgArray.length == 0'>"+
			"<ul style='list-style:none' class='clearfix'>"+
			"<li ng-repeat='img in unDelImgArray = (uploadImgArray | filter:{isDel:false})' class='imgLi' ng-init='isHover = false' ng-mouseenter='isHover = true' ng-mouseleave='isHover = false'  ng-click='toggleCheck_One(img)' ng-class='{true:\"check\",false:\"uncheck\"}[img.isCheck]'>"+
				"<img ng-alt='{{img.title}}' ng-src='{{img.src}}' width='100%' height='100%' />"+
				"<span ng-show='isHover || img.isCheck ' class='checkSpan'><i class='glyphicon' ng-class='{true:\"glyphicon-ok\"}[img.isCheck]'></i></span>"+
			"</li>"+
			"</ul>"+
			"</div>"+
			"</div>"+
			"</div>")
}])
.factory('uploadService',function(){
	var uploadUrl = "../UploadServlet?associateType=img";
	return {
		uploadImgByStream:function(imgStream,successCB,errorCB){
			var fd = new FormData();
			fd.append("imgFile",imgStream);
			$http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        }).success(successCB).error(errorCB);
		}
	}
})



