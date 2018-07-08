angular.module("dddFileUploadApp",[ 'angularFileUpload', 'angular.permission' ])
		.directive("dfileupload",['AttachmentService',function(AttachmentService) {
				return {
					restrict : 'E',
					scope : {
						associateFormId : "=",
						associateFormName : "@",
						numLimit:'=',
						noUpload:'@',
						templateName:'@',
						associateType : "@",
						typeOfUploadfile : "@",
						automaticCode : '@',
						display:'@'
					},
					controller : function($rootScope, $scope,$http, FileUploader, angularPermission) {
						if($scope.display==undefined){
							$scope.display=false;
						}
						$scope.isEdit=false;
						$scope.isUpload = false;
						
						$scope.uploadFile = function() {
							
							if(!$scope.associateFormId){
								$rootScope.app.notify("请先保存当前实体");
								return;
							}

							if (($scope.automaticCode != null && $scope.automaticCode == 'true')&& ($scope.associateFormId == null || $scope.associateFormId == undefined)) {
								$scope.associateFormId = new Date().getTime();
							}
							$scope.isUpload = !$scope.isUpload;
						}

						/*
						 * $scope.checkTypeOfUploadfile(fileType){
						 * if(fileType == "image"){
						 * 
						 * }else if(fileType == "video"){
						 * 
						 * }else if(fileType == "file"){
						 * 
						 * }else{
						 *  }
						 *  }
						 */

						$scope.initFile = function() {
							if($scope.numLimit == undefined || $scope.numLimit== null || $scope.numLimit==0){
								$scope.numLimit=300;
							}
							
							AttachmentService.findAttachmentByForm($scope.associateFormId,$scope.associateFormName,findAttachmentResult,findAttachmentFault);
							var urlParams = "entityId="+ $scope.associateFormId+ "&"
									+ "entityName="+ $scope.associateFormName
									+ "&"+ "uploadPeopleId="+ angularPermission.getLoginUser().employee.eId
									+ "&" + "associateType="+ $scope.associateType;
							var uploader = $scope.uploader = new FileUploader(
									{
										url : '../UploadServlet?'+ urlParams,
										queueLimit:$scope.numLimit,
									});

							uploader.filters.push({
								name : 'customFilter',
								fn : function(item, options) {
									return this.queue.length < 10;
								}
							});
							uploader.onSuccessItem = function(fileItem, response, status,headers) {
							};
						}

						$scope.$watch("associateFormId", function(newValue, oldValue) {
							if (newValue !== oldValue&& newValue !== undefined) {
								$scope.initFile();
							}
						}, true);

						function findAttachmentResult(data) {
							var baseImgSrc = "asset/";
							$scope.attachments = [];
							for (var i = 0; i < data.length; i++) {
								var attachment = new Object();
								attachment.imgSrc = "";
								attachment.eId = data[i].eId;
								attachment.attachmentRealName = data[i].attachmentRealName;
								attachment.uploadTime = data[i].uploadTime;
								attachment.associateSize = data[i].associateSize;
								var pictureType = data[i].attachmentRealName;

								var pointIndex = pictureType
										.lastIndexOf('.');
								var choosePicture = pictureType
										.substr(pointIndex + 1,
												pictureType.length)
										.toLowerCase();
								attachment.fileType = choosePicture;
								if (choosePicture == 'file') {
									attachment.imgSrc = baseImgSrc
											+ "file.png";
								} else if (choosePicture == 'xlsx'
										|| choosePicture == 'xls') {
									attachment.imgSrc = baseImgSrc
											+ "excel.png";
								} else if (choosePicture == 'ppt') {
									attachment.imgSrc = baseImgSrc
											+ "ppt.png";
								} else if (choosePicture == 'txt') {
									attachment.imgSrc = baseImgSrc
											+ "txt.png";
								} else if (choosePicture == 'zip'
										|| choosePicture == 'rar') {
									attachment.imgSrc = baseImgSrc
											+ "zip.png";
								} else if (choosePicture == 'doc'
										|| choosePicture == 'docs') {
									attachment.imgSrc = baseImgSrc
											+ "word.png";
								} else if (choosePicture == 'pdf') {
									attachment.imgSrc = baseImgSrc
											+ "pdf.png";
								} else if (choosePicture == 'jpg'
										|| choosePicture == 'png'
										|| choosePicture == 'gif') {
									attachment.imgSrc = baseImgSrc
											+ "picture.png";
								} else {
									attachment.imgSrc = baseImgSrc
											+ "nomatch.png";
								}
								$scope.isEdit=true;
								$scope.attachments.push(attachment);
							}
						}

						function findAttachmentFault() {
							$rootScope.app.notify("加载" + $scope.associateFormName
									+ "失败");
						}

						$scope.mouseEnter = function(row,attachment) {
							$scope.onMouseEnter = row;
						}

						$scope.mouseLeave = function() {
							$scope.onMouseEnter = -1;
						}

						$scope.deleteFile = function(attachmentId) {
							AttachmentService.deleteAttachment(attachmentId, deleteSuccess,deleteFault);
							
							AttachmentService.findAttachmentByForm($scope.associateFormId,
									$scope.associateFormName,findAttachmentResult,findAttachmentFault);
						}

						function deleteSuccess() {
							console.log("删除成功");
						}
						function deleteFault() {
							console.log("删除失败");
						}

						$scope.downLoadFile = function(attachmentId) {
							window.location.href = "../DownLoadServlet?attachmentId="+ attachmentId;
						}

						if ($scope.associateFormId > 0) {
							$scope.initFile();
						}

					},
					templateUrl: function (elem, attr) {
						var templates={
								"defaultTemplate": "compents/dddfileupload/asset/template.html",
								"templateUpload":"compents/dddfileupload/asset/templateUpload.html"
						}
						
						if(attr.templateName !=null && attr.templateName != "" && attr.templateName != undefined){
							 return templates[attr.templateName];
						}else{
							return templates.defaultTemplate;
						}
					},
				}

			} ]);