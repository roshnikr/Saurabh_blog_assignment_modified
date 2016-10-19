$( document ).ready(function(){
	var json_data;
	$.get("/adddata",function(data){
		console.log("hhhhh");
		console.log(data);
		json_data=data;
		$.each(json_data,function(i,obj){
		$(".post_list").append('\
		<div class="col-xs-10">\
			<h4 class="col-xs-10">'+obj.title+'</h4>\
			<p class="content col-xs-11">'+obj.content+'</p>\
			<a href="#" class="edit glyphicon glyphicon-edit col-xs-1">Edit</a>\
		</div>\
		');

		})
	});
	$( "#new_post" ).click(function() {
  		$(".new").css("display", "block");
	});
	$( ".add_btn" ).click(function() {
		debugger;
		console.log("inside add button");
  		var tit=$("#title").val();
  		var auth=$("#author").val();
  		var dat=$("#date").val();
  		var con=$("#content").val();
  		var new_datas={"title":tit,"content":con,"editdate":dat,"author":auth};
  		//console.log(json_data);
  		//json_data.post_data.push(new_datas);
  		});
	
})
  // 		$.post("/test", {
		// datas: JSON.stringify(json_data),
		// }, function(){
  //   		alert('after post'); 
  //   		window.location.href = '/home';
  //   	}
		// );
  		// json_data.post_data.push(new_datas);
  		// $("data.json").replaceWith(json_data);
  		// console.log("added to json");
  // 		var newData = JSON.stringify(data);
		// 	jQuery.post('data.json', {
  //   		newData: newData
		// }, function(response){
  //   // response could contain the url of the newly saved file
		// })
  		
	