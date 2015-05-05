$(function($){

	// $(".box").on("inView", function(){
	// 	console.log($(this).attr("id"), arguments);
	// });
	$(".box").on("inViewBegin", function(){
		$(this).addClass("inView");
	});
	$(".box").on("inViewEnd", function(){
		$(this).removeClass("inView");
	});

});