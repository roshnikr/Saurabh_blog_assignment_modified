$( document ).ready(function(){
	$.get("data.json",function(data){
		var d=data.post_data;
		console.log(d);
		$.each(d,function(i,obj){
		$(".post_list").append('\
		<div class="col-xs-10">\
			<h4 class="col-xs-10">'+obj.title+'</h4>\
			<a href="#" class="edit glyphicon glyphicon-edit col-xs-1">Edit</a>\
		</div>\
		');

		})
	});
	$( "#new_post" ).click(function() {
  		$(".new").css("display", "block");
	});
	$( ".add_btn" ).click(function() {
		
  		var tit=$("#title").val();
  		console.log(tit);
  		var auth=$("#author").val();
  		var dat=$("#date").val();
  		var con=$("#content").val();
  		var new_datas={"title":tit,"content":con,"editdate":dat,"author":auth};
  		$.getJSON( "/test.json", function( data ) {
  			data.post_data.push(new_datas);
  			console.log("added to json");
  		});
  		var newData = JSON.stringify(data);
			jQuery.post('/test.json', {
    		newData: newData
		}, function(response){
    // response could contain the url of the newly saved file
		})
  		window.location.replace("home.html");
	});
	
})