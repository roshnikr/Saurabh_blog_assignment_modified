$( document ).ready(function(){
	$.get("/adddata",function(data){
		var d=data;
		$.each(d,function(i,obj){
		$(".posts").append('\
		<div class="col-xs-10 post">\
			<h2>'+obj.title+'</h2>\
			<p class="content">'+obj.content+'</p>\
			<span>Author : '+obj.author+'</span>\
			<span class="pull-right">Date : '+obj.editdate+'</span>\
		</div>\
		');

		})
	})
})