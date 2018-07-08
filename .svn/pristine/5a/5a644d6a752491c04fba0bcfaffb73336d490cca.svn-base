window.onload=function(){
	$.ajax({
		url: '../ReportTest/preview',
		type: 'post',
		data:{
			id:getQueryString("id")
		},
		success:function(data){
			$("#dynamicForm").append(data);
		}
	})
	
}
function search(){
	$.ajax({
		url: '../ReportTest/search',
		type: 'post',
		dataType:'html',
		data:{
			"reportTestId":getQueryString("id"),
			params:JSON.stringify({
				"keyword":$("#keyword").val(),
				"name":'ssss'
			})
		},
		success:function(data){
			 $("#searchResult").html(data);
			return;
			//var searchResultIFrame = $("#searchResult");
			//searchResultIFrame.html(data);
			
			   var theDoc = document.getElementById('searchResult').contentWindow;  
			   //theDoc.style.display = "block";   
			   //theDoc.document.open(); //会自动打开  
			     
			   //theDoc.document.designMode = "on"; //会自动打开  
			   theDoc.document.clear();
			   theDoc.document.write(data);
		   
			   theDoc.document.body.contentEditable="false"; //要显示关闭可以编辑状态，不然内容是可以编辑的  
			   //theDoc.document.designMode = "off"; //没用  
			   //theDoc.document.close();			
			//searchResultIFrame.append(data);
		}
	})
}
function search1(){
	window.location.href="../ReportTest/search1";
}


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}