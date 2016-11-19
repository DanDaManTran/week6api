var animals = ["dog","cat","mouse"];
var name="";


//function to clear the buttons and create new buttons. planning to use this as soon as we add a new string in the array
function createBtn(){
	$("#thatOneButton").empty();
	for(var i=0; i<animals.length; i++){
		$("#thatOneButton").append('<button class="btn btn-success" data-name="'+animals[i]+'">'+animals[i]+'</button>');
	};
};

//once buttons are click it will 
function change(){
	var type = $(this).data("name");
	var html = "http://api.giphy.com/v1/gifs/search?q="+type+"&&api_key=dc6zaTOxFJmzC";  
	$.ajax({
		url: html, method: 'GET'
	}).done(function(respond){
		$(".jiphy").empty();
		//
		for(var i=0; i<10; i++){
			var d = $("<div>");
			var h = $("<h3>");
			d.addClass("image");
			h.text("Rating: " + respond.data[i].rating);
			var a = $("<img>");
			a.attr('src', respond.data[i].images.fixed_height_still.url);
			d.append(h);
			d.append(a);
			$(".jiphy").append(d);
		}
	});
};

function stopGo(){
	var source = $(this).attr('src');
	if(source.endsWith("_s.gif")){
		source = source.replace("_s.gif",".gif");
		$(this).attr('src',source);
	} else if(source.endsWith(".gif"))
		source = source.replace(".gif","_s.gif");
		$(this).attr('src',source);
};


	
$("document").ready(function(){

	createBtn();

	$("#submit").on("click", function(){
		name = $("#input").val().trim();
		animals.push(name);
		createBtn();
	});

	$(document).on('click','.btn',change);
	$(document).on('click','img',stopGo);


});