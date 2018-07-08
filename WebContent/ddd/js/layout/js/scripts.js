
(function(){
	var DE = window.DE = window.DE || {plugins:[]};
	DE.config={};
})();

$(function () 
{
	//动态添加左边工具栏
	for(var i=0;i<DE.config.length;i++)
	{
		var module = DE.config[i];
		var html = $.ajax({
			url: module.url,
			async: false
		}).responseText; 
		if(module.jsUrl != null)
		{
			jQuery.getScript(module.jsUrl)
			.done(function() {
			})
			.fail(function() {
			});
		}
		$("#accordionGroups").append(html);
	}
		
	$(".nav-header").click(function() {
		$(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
		$(this).next().slideDown();
	});
	getOldHtml();//获取数据
});

//初始化参数
var isPreview = false;
var demoHtml = "";


//根据参数名获取url参数值
function GetQueryString(name) 
{ 
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return null; 
}  

function supportstorage() {
	if (typeof window.localStorage=='object') 
		return true;
	else
		return false;		
}

//获取占位用的html
function getOldHtml(){
	var dynamicFormId = GetQueryString("dynamicFormId");
	$.ajax({  
		type: "POST",  
		url: "../../../DynamicForm/findDynamicFormById",  
		data: { dynamicFormId:dynamicFormId}, 
		success: function(data) {
			$(".demo").html(data.dynamicFormOldHtml);
			getModels();
			initContainer();//初始化表单元素（点击、拖拽等事件）
		}
	});
}

//获取所有模型
function getModels(){
	$.ajax({  
		type: "POST",  
		url: "../../../Model/findAllModel",  
		success: function(data) {
			creatOptions(data);
		}
	});
}

//根据模型创建下拉菜单选项
function creatOptions(models){
	var len = models.length;
	for(var i = 0;i<len;i++){
		$("#model").append("<option value ="+models[i].eId+">"+models[i].modelName+"</option>");
	}
}

//根据模型ID获取它的所有模型项
function getModelItems(){
	$.ajax({  
		type: "POST",  
		url: "../../../DynamicForm/findModelItems",  
		data: {modelId:$("#model").val()}, 
		success: function(data) {
			$("#modelItems").html(data);
			initEvent();//初始化拖拽事件
		}
	});
}

//设置表单布局样式
var layoutStyle="12";
function formLayout(style){
	if(isPreview ==true){
		if(demoHtml){
			$(".demo").html(demoHtml);
			initContainer();//初始化表单元素（点击、拖拽等事件）
		}
	}
	layoutStyle = style;
	sessionStorage.setItem("layoutStyle",style);
	preViewForm();
}

//保存动态表单
function handleSaveLayout(isSave) {
	var e = $(".demo").html();
	if (!stopsave && e != window.demoHtml) {
		stopsave++;
		window.demoHtml = e;
		saveLayout(isSave);
		stopsave--;
	}
	
	if(isSave == true)
	{
		saveDynamicForm();//保存动态表单
	}
}

var layouthistory; 
function saveLayout(){
	var data = layouthistory;
	if (!data) {
		data={};
		data.count = 0;
		data.list = [];
	}
	if (data.list.length>data.count) {
		for (i=data.count;i<data.list.length;i++)
			data.list[i]=null;
	}
	data.list[data.count] = window.demoHtml;
	data.count++;
	if (supportstorage()) {
		localStorage.setItem("layoutdata",JSON.stringify(data));
	}
	layouthistory = data;
}

//保存动态表单
function saveDynamicForm()
{
	$("#layoutitLi").append("<img src='img/loading.gif' id='loadingImg'></img>");
	var dynamicFormNewHtml = downloadLayoutSrc();
	if(!dynamicFormNewHtml){
		return;
	}
	dynamicFormNewHtml = JSON.stringify(dynamicFormNewHtml);
	//获取url参数并做处理
	var dynamicFormId = GetQueryString("dynamicFormId");
	$.ajax({  
		type: "POST",  
		url: "../../../DynamicForm/updateDynamicFormById",  
		data: { dynamicFormId:dynamicFormId,dynamicFormOldHtml: $('.demo').html(),dynamicFormNewHtml:dynamicFormNewHtml},  
		success: function(data) {
			$("#loadingImg").remove();
			alert("保存成功");
			if(isPreview==true){
				$(".demo").html(demoHtml);
				initContainer();//初始化表单元素（点击、拖拽等事件）
				$("body").removeClass("devpreview sourcepreview");
				$("body").addClass("edit");
				removeMenuClasses();
				$(this).addClass("active");
				isPreview=false;
			}
		}
	});
}

var preViewFormData = "";
//预览动态表单
function preViewForm()
{
	$("#layoutitLi").append("<img src='img/loading.gif' id='loadingImg'></img>");
	var dynamicFormNewHtml = downloadLayoutSrc();
	dynamicFormNewHtml = JSON.stringify(dynamicFormNewHtml);
	$.ajax({  
		type: "POST",  
		url: "../../../DynamicForm/preViewForm",  
		data: {dynamicFormNewHtml:dynamicFormNewHtml},  
		success: function(data) {
			$("#loadingImg").remove();
			preViewFormData = data.preHtml;
			var preHtml = "<iframe width='100%' height='2000px' frameborder='0'  scrolling='no' src='../../preViewForm.html'></iframe>";
			$(".demo").html(preHtml);
			$("body").removeClass("edit");
			$("body").addClass("devpreview sourcepreview");
			removeMenuClasses();
			$(this).addClass("active");
			isPreview = true;

		}
	});
}


function downloadLayout(){
	$.ajax({  
		type: "POST",  
		url: "/build/downloadLayout",  
		data: { layout: $('#download-layout').html() },  
		success: function(data) { window.location.href = '/build/download'; }
	});
}

function downloadHtmlLayout(){
	$.ajax({  
		type: "POST",  
		url: "/build/downloadLayout",  
		data: { layout: $('#download-layout').html() },  
		success: function(data) { window.location.href = '/build/downloadHtml'; }
	});
}

function undoLayout() {
	var data = layouthistory;
	if (data) {
		if (data.count<2) return false;
		window.demoHtml = data.list[data.count-2];
		data.count--;
		$('.demo').html(window.demoHtml);
		if (supportstorage()) {
			localStorage.setItem("layoutdata",JSON.stringify(data));
		}
		return true;
	}
	return false;
	/*$.ajax({  
		type: "POST",  
		url: "/build/getPreviousLayout",  
		data: { },  
		success: function(data) {
			undoOperation(data);
		}
	});*/
}

function redoLayout() {
	var data = layouthistory;
	if (data) {
		if (data.list[data.count]) {
			window.demoHtml = data.list[data.count];
			data.count++;
			$('.demo').html(window.demoHtml);
			if (supportstorage()) {
				localStorage.setItem("layoutdata",JSON.stringify(data));
			}
			return true;
		}
	}
	return false;
	/*
	$.ajax({  
		type: "POST",  
		url: "/build/getPreviousLayout",  
		data: { },  
		success: function(data) {
			redoOperation(data);
		}
	});*/
}

function handleJsIds() {
	handleModalIds();
	handleAccordionIds();
	handleCarouselIds();
	handleTabsIds()
}
function handleAccordionIds() {
	var e = $(".demo #myAccordion");
	var t = randomNumber();
	var n = "accordion-" + t;
	var r;
	e.attr("id", n);
	e.find(".accordion-group").each(function(e, t) {
		r = "accordion-element-" + randomNumber();
		$(t).find(".accordion-toggle").each(function(e, t) {
			$(t).attr("data-parent", "#" + n);
			$(t).attr("href", "#" + r)
		});
		$(t).find(".accordion-body").each(function(e, t) {
			$(t).attr("id", r)
		})
	})
}
function handleCarouselIds() {
	var e = $(".demo #myCarousel");
	var t = randomNumber();
	var n = "carousel-" + t;
	e.attr("id", n);
	e.find(".carousel-indicators li").each(function(e, t) {
		$(t).attr("data-target", "#" + n)
	});
	e.find(".left").attr("href", "#" + n);
	e.find(".right").attr("href", "#" + n)
}
function handleModalIds() {
	var e = $(".demo #myModalLink");
	var t = randomNumber();
	var n = "modal-container-" + t;
	var r = "modal-" + t;
	e.attr("id", r);
	e.attr("href", "#" + n);
	e.next().attr("id", n)
}
function handleTabsIds() {
	var e = $(".demo #myTabs");
	var t = randomNumber();
	var n = "tabs-" + t;
	e.attr("id", n);
	e.find(".tab-pane").each(function(e, t) {
		var n = $(t).attr("id");
		var r = "panel-" + randomNumber();
		$(t).attr("id", r);
		$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
	})
}
function randomNumber() {
	return randomFromInterval(1, 1e6)
}
function randomFromInterval(e, t) {
	return Math.floor(Math.random() * (t - e + 1) + e)
}
function gridSystemGenerator() {
	$(".lyrow .preview input").bind("keyup", function() {
		var e = 0;
		var t = "";
		var n = $(this).val().split(" ", 12);
		$.each(n, function(n, r) {
			e = e + parseInt(r);
			t += '<div class="span' + r + ' column"></div>'
		});
		if (e == 12) {
			$(this).parent().next().children().html(t);
			$(this).parent().prev().show()
		} else {
			$(this).parent().prev().hide()
		}
	})
}
function configurationElm(e, t) {
	$(".demo").delegate(".configuration > a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().next().next().children();
		$(this).toggleClass("active");
		t.toggleClass($(this).attr("rel"))
	});
	$(".demo").delegate(".configuration .dropdown-menu a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().parent();
		var n = t.parent().parent().next().next().children();
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		var r = "";
		t.find("a").each(function() {
			r += $(this).attr("rel") + " "
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel"))
	})
}
function removeElm() {
	$(".demo").delegate(".remove", "click", function(e) {
		e.preventDefault();
		$(this).parent().remove();
		if (!$(".demo .lyrow").length > 0) {
			clearDemo()
		}
	})
}
function clearDemo() {
	$(".demo").empty();
	layouthistory = null;
	if (supportstorage())
		localStorage.removeItem("layoutdata");
}
function removeMenuClasses() {
	$("#menu-layoutit li button").removeClass("active")
}
function changeStructure(e, t) {
	$("#download-layout ." + e).removeClass(e).addClass(t)
}
function cleanHtml(e) {
	$(e).parent().append($(e).children().html())
}
function downloadLayoutSrc() {
	var layoutTemp = {};
	var e = "";
	$("#download-layout").children().html($(".demo").html());
	var t = $("#download-layout").children();
	t.find(".preview, .configuration, .drag, .remove").remove();
	t.find(".lyrow").addClass("removeClean");
	t.find(".box-element").addClass("removeClean");
	t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".lyrow .removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".removeClean").each(function() {
		cleanHtml(this)
	});
	t.find(".removeClean").remove();
	
	$("#download-layout .column").removeClass("ui-sortable");
	$("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
	var children = $("#download-layout .form-group");
	$("#download-layout .form-horizontal").remove();
	$( "#download-layout .row-fluid" ).append(children);
	if ($("#download-layout .container").length > 0) {
		changeStructure("row-fluid", "row")
	}
	formatSrc = $.htmlClean($("#download-layout").html(), {
		format: false,
		allowedAttributes: [
			["id"],
			["class"],
			["data-toggle"],
			["data-target"],
			["data-parent"],
			["role"],
			["config"],
			["data-dismiss"],
			["aria-labelledby"],
			["aria-hidden"],
			["data-slide-to"],
			["data-slide"],
		]
	});
	$("#download-layout").html(formatSrc);
	$("#downloadModal textarea").empty();
	$("#downloadModal textarea").val(formatSrc);
	
	layoutTemp.template = formatSrc;
	
	var parse = formatSrc.replace(/row-fluid/g,"row");
	
	for(var i=0;i<=12;i++){
		parse = parse.replace(new RegExp("span"+i,"g"),"col-md-"+i)
	}
	
	var datas = new Array();
	t = $(parse);
	var i = 0;
	var isPass=true;

	t.find(".form-group").each(function(){
		this.className="form-group col-md-"+layoutStyle;
		var deplugins = $(this).find(".deplugins")[0];
		var config = deplugins.getAttribute('config').replace(/&quot;/g,"\"");
		config = eval('(' + config + ')');
		if(!config.layoutStyle&&sessionStorage.getItem("layoutStyle")){
			config.layoutStyle = layoutStyle;
		}
		if(config.authority!=""&&config.authority!=undefined&&config.authority!=null){
			this.setAttribute("ng-init","hasAuthority('"+config.bundle+"','"+config.authority+"')");
			this.setAttribute("ng-show","'"+config.bundle+"'.show==true");
		}
		if(config.defaultValue!=""&&config.defaultValue!=undefined&&config.defaultValue!=null){
			this.setAttribute("ng-init","showExpression('"+config.bundle+"','"+config.defaultValue+"')");
		}
		if(!config.bundle||config.bundle==""){
			if(config.type=="operateTips"){
				config.bundle = "operateTips";
			}else{
				alert("请设置\""+config.title+"\"的绑定值");
				isPass=false;
				return;
			}
		}
		
		var children = $(this).children();
		var label = $(children[0]);
		var div = $(children[1]);
		var elements = label.attr('class').match(/col-\w{1,2}-\d{1,2}/g);
		if(elements){
			label.removeClass(elements[0]);
		}
		elements = div.attr('class').match(/col-\w{1,2}-\d{1,2}/g);
		if(elements){
			div.removeClass(elements[0]);
		}
		/*label.removeClass("col-md-1 col-md-2 col-md-3 col-md-4 col-md-5 col-md-6" +
				" col-md-7 col-md-8 col-md-9 col-md-10 col-md-11 col-md-12");
		div.removeClass("col-md-1 col-md-2 col-md-3 col-md-4 col-md-5 col-md-6" +
				" col-md-7 col-md-8 col-md-9 col-md-10 col-md-11 col-md-12");*/
		/*if(config.layoutStyle){
			this.className="form-group col-md-"+config.layoutStyle;
		}*/
		
		if(!config.col1) {config.col1=2;}
		label.addClass("col-md-"+config.col1);
		if(!config.col2) {config.col2=10;}
		div.addClass("col-md-"+config.col2);
		
		config.parse = "data"+i+"_end";
		config.content = deplugins.outerHTML;
		deplugins.outerHTML=config.parse;
		datas.push(config);
		i++;
	});
	if(!isPass){
		return false;
	}
	t.children().removeClass("row");
	t.children().addClass("col-md-12");
	parse = t.prop("outerHTML");
	/*t.find(".deplugins").each(function(){
		var config = this.getAttribute('config').replace(/&quot;/g,"\"");
		config = eval('(' + config + ')');
		
		if(!config.bundle||config.bundle==""){
			alert("请设置\""+config.title+"\"的绑定值");
			return;
		}
		
//	    var preg =  /<(input).*?(<\/input>|\/>)/gi;
		var preg = new RegExp("<("+config.holderType+ ").*?(</"+config.holderType+">)", "gi"); 
		if(config.holderType=='input'){
			preg = new RegExp("<("+config.holderType+ ").*?(</"+config.holderType+">|/>)", "gi"); 
		}
	    var elments = parse.match(preg);
	    if(elments == null)
	    {
	    	alert("不能匹配"+config.holderType);
	    	return ;
	    }
	    var elment;
	    for(var j=0;j<elments.length;j++){
	    	if($(elments[j])[0].getAttribute('config')){
	    		elment = elments[j];
	    		break;
	    	}
	    }
	    if(!elment){
	    	alert(config.title+"元素匹配有误");
	    	return;
	    }
	    config.parse = "data"+i;
		config.content = elment;
		parse = parse.replace(elment,"data"+i);
		i++;
		datas.push(config);
	});*/
	layoutTemp.datas = datas;
	layoutTemp.parse = parse;
	return layoutTemp;
}

var currentDocument = null;
var timerSave = 1000;
var stopsave = 0;
var startdrag = 0;
var demoHtml = $(".demo").html();
var currenteditor = null;
var firstIn = true;
$(window).resize(function() {
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160)
});

function restoreData(){
	if (supportstorage()) {
		layouthistory = JSON.parse(localStorage.getItem("layoutdata"));
		if (!layouthistory) return false;
		window.demoHtml = layouthistory.list[layouthistory.count-1];
		if (window.demoHtml&&!firstIn){ $(".demo").html(window.demoHtml);firstIn=false;}
	}
}

function initContainer(){
	$(".demo, .demo .column").sortable({
		connectWith: ".column",
		opacity: .35,
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		stop: function(e,t) {
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	configurationElm();
}

//数据加载
$(document).ready(function() {
	initEvent();
});

function initEvent(){
//	CKEDITOR.disableAutoInline = true;
	restoreData();
//	var contenthandle = CKEDITOR.replace( 'contenteditor' ,{
//		language: 'zh-cn',
//		contentsCss: ['css/bootstrap-combined.min.css'],
//		allowedContent: true
//	});
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160);
	$(".sidebar-nav .lyrow").draggable({
		connectToSortable: ".demo",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function(e, t) {
			$(".demo .column").sortable({
				opacity: .35,
				connectWith: ".column",
				start: function(e,t) {
					if (!startdrag) stopsave++;
					startdrag = 1;
				},
				stop: function(e,t) {
					if(stopsave>0) stopsave--;
					startdrag = 0;
				}
			});
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	$(".sidebar-nav .box").draggable({
		connectToSortable: ".column",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function() {
			handleJsIds();
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	initContainer();
	$('body.edit .demo').on("click","[data-target=#editorModal]",function(e) {
		e.preventDefault();
		currenteditor = $(this).parent().parent().find('.view');
		//var eText = currenteditor.html();
		var deplugins = currenteditor.find(".deplugins"),plugins =$(deplugins).attr("deplugins");
		DE.plugins[plugins](deplugins[0],plugins);
		var iframeUrl = "plugins/"+plugins+".html";
		$("#dialogContent").html('<iframe id="'+plugins+'_iframe" style="width:100%;height:800px" src="'+ iframeUrl +'" frameborder="0"></iframe>');
		//		contenthandle.setData(eText);
	});
	$("#savecontent").click(function(e) {
		e.preventDefault();
		var deplugins = currenteditor.find(".deplugins"),plugins =$(deplugins).attr("deplugins");
		DE.plugins[plugins](deplugins[0],plugins);
		var config = $("#dialogContent").find("#"+plugins+"_iframe")[0].contentWindow.save();
		if(config){
			var lable = $(deplugins).parent().parent().find('.deplugins-orgname');
			lable[0].innerHTML=config.title;
			$("#editorModal").modal('hide');
		}
		
		//		currenteditor.html(currenteditor.html());
	});

	$("[data-target=#downloadModal]").click(function(e) {
		e.preventDefault();
		downloadLayoutSrc();
	});

	$("[data-target=#shareModal]").click(function(e) { 
		e.preventDefault();
		if(isPreview==true){
			$(".demo").html(demoHtml);
			initContainer();//初始化表单元素（点击、拖拽等事件）
		}

		handleSaveLayout(true);
	});
	$("#download").click(function() {
		downloadLayout();
		return false
	});
	$("#downloadhtml").click(function() {
		downloadHtmlLayout();
		return false
	});
	$("#edit").click(function() {
		isPreview=false;
		if(demoHtml){
			$(".demo").html(demoHtml);
			initContainer();//初始化表单元素（点击、拖拽等事件）
		}
		$("body").removeClass("devpreview sourcepreview");
		$("body").addClass("edit");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#clear").click(function(e) {
		e.preventDefault();
		clearDemo()
	});
	$("#devpreview").click(function() {
		$("body").removeClass("edit sourcepreview");
		$("body").addClass("devpreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});

	$("#sourcepreview").click(function() {
		if(isPreview==true){
			alert("正在预览!");
			return;
		}
		demoHtml = $(".demo").html();
		preViewForm();
		return false
	});

	$("#fluidPage").click(function(e) {
		e.preventDefault();
		changeStructure("container", "container-fluid");
		$("#fixedPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	$("#fixedPage").click(function(e) {
		e.preventDefault();
		changeStructure("container-fluid", "container");
		$("#fluidPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
//	$(".nav-header").click(function() {
//		$(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
//		$(this).next().slideDown()
//	});
	$('#undo').click(function(){
		stopsave++;
		if (undoLayout()) initContainer();
		stopsave--;
	});
	$('#redo').click(function(){
		stopsave++;
		if (redoLayout()) initContainer();
		stopsave--;
	});
	removeElm();
	gridSystemGenerator();
	setInterval(function() {
		//handleSaveLayout()
	}, timerSave);
}