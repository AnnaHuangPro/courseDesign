angular.module("dddLogoUploadApp",[])
.directive("dlogoupload",function($parse, $q,$http,dialogs,$stateParams){
	return{
		restrict:'E',
		require:'?ngModel',
		scope:{
			imgWidth:"=",
			imgHeight:"=",
			imgUrl:"=",
			limitWidth:'=', //px
			limitHeight:'=', //px
			limitType:'=', // ['jpg','png']
			imgMarginTop:'=',
			imgMarginRight:'=',
			imgMarginLeft:'=',
			imgMarginBottom:'=',
		},
		link:function(scope,element,attrs,ngModelController){
				scope.isanima = false;  //是否显示动画
				scope.mousestate = false;   //鼠标是否在头像div上，状态
				scope.isupdateurl=true;     //是否更新头像
				element.find("a").bind("click",function(changeEvent){
					var  dlg = dialogs.create('../ddd/compents/dddlogoupload/asset/uploadLogo.html','uploadLogoController',{},{size:'md',keyboard: true,backdrop: false,windowClass: 'my-class'});
					dlg.result.then(function(){
						scope.isupdateurl=true;
						scope.imgUrl=$stateParams.currentUserLogoUrl;
					},function(){
						//取消
					});
				});
				element.find("#loadlogoImg").bind("mouseenter",function(){
					scope.isanima = true;
					scope.mousestate = true;
					scope.isupdateurl = false;
					ngModelController.$setViewValue(scope.isanima);

				});
				element.find("#loadlogoImg").bind("mouseleave",function(){
					scope.isanima = false; 
					scope.isupdateurl = false;
					scope.mousestate = false;
					ngModelController.$setViewValue(scope.isanima);
				 
				});
				scope.$watch("imgUrl",function(newVal,oldVal){
					if(newVal != oldVal)
					{
						ngModelController.$setViewValue(newVal);
					}
				});
				function fillCompleteUrl(imgUrl){
					if(!angular.isUndefined(imgUrl)&&(scope.isupdateurl)){
						scope.showUrl = "../ShowImgServlet?imgUrl="+imgUrl;
						return imgUrl;
					}
				}
				if(ngModelController){
					ngModelController.$parsers.push(fillCompleteUrl);
					ngModelController.$formatters.push(fillCompleteUrl);
				}
		},
		templateUrl:'../ddd/compents/dddlogoupload/asset/template.html'
	}
})
.controller('uploadLogoController',function($rootScope,$scope,$uibModalInstance,$http,$stateParams){ 
	var cropper;
	var options;
	var file;
	$scope.choicelogo = null;
	
	$scope.initlogoupload = function(){
		 options =
	    {
	        thumbBox: '.thumbBox',
	        spinner: '.spinner',
	        imgSrc: 'asset/missing.png'
	    }
	    cropper = $('.imageBox').cropbox(options);
	}
	  $scope.choiceLogo = function(event) {
		var files = event.target.files;
		file=files[0];
		if($scope.typeCheck(file)){
	
			var reader = new FileReader();
	        reader.onload = function(e) {
	           options.imgSrc = e.target.result;
	            cropper = $('.imageBox').cropbox(options);
	        }
	        reader.readAsDataURL(files[0]);
	        this.files = [];
		}
		else{
		}
		
	}
	
		$scope.typeCheck = function(file){
			
			var fileType = file.type;
			if(/image\/\w+/.test(fileType)){
				
						return true;
				}
				else{
					alert("图片类型错误，请上传png/jpg类型");
					return false;
				}
			
	}
	  $scope.uploadLogo= function()
		{
		    var uploadUrl = "../UploadServlet?imgType=logoAvatarg";
		    if($scope.validateUrl()){
	 		    var  data = {
		                dataurl:$scope.uploadimg
		            };
				$http.post(uploadUrl, JSON.stringify(data))
		        .success(function(data){
		        	$stateParams.currentUserLogoUrl= data;
		        	$uibModalInstance.close();
		        })
		        .error(function(error){
		        	alert("修改失败！");
		        	$uibModalInstance.close();
		        });
			
		    }
		    else{
		    	
		    }
		
		}
      $scope.validateUrl = function(){
    	  if($scope.uploadimg!=null){
    		  return  true;
    	  }
    	  else{
    		  alert("请先剪切图片！");
    		  return  false;
    	  }
    	  
      }
      
	    $scope.cropLogo = function(){
	    	$scope.uploadimg = cropper.getDataURL();
	    }
	    $scope.enlargeLogo = function(){
	        cropper.zoomIn();
	    }
	    $scope.reduceLogo = function(){
	    	cropper.zoomOut();
	    }
	    $scope.cancel = function(){
	    	$uibModalInstance.dismiss('Canceled');
	    }
})

