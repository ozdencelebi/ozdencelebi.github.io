$(document).ready(function(){
	// add task and reset input
	$('#add-btn').click(function(){
		var task = $("#input").val();
		var taskString = '<li class="item lead">'+task+'</li>';
		$("#list-ol").append(taskString).hide().fadeIn();
		$("#input").val(''); 
		
	});

	// strike to task and select for removal
	$(document).on('click','.item',function(){
		$(this).toggleClass('strike');
		$removeBtn = $("#remove-btn");
		if($removeBtn.length === 0) {
			$("#add-btn").after('<button id="remove-btn" class="btn btn-warning">Remove Workout</button>');
		}
	});

	// remove selected tasks and remove btn
	$(document).on('click','#remove-btn',function(){
		$(".strike").remove();
		$("#remove-btn").remove();
	});
});




/*  //shorthand for $(document).ready(function(){
$(function(){
 
    //Append an empty grid with id="pics" to the gallery page content.
    $("<div>").attr("id", "images").attr("class", "ui-grid-b").appendTo('#images [data-role="content"]');
 
    //attach search button click handler
    $("#add-btn").click(function() { 
        //remove previous images from previous search
        $("#pics a").remove(); 
        $("#pics img").remove();
    
        //query the Flickr API
        $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: "gym, squats, workout, cardio",
            tagmode:"all",
            limit: "60",
            format: "json"
        },
        function(data) {
            $.each(data.items, function(i,item){
                //append image to the grid, wrap with a link tag so it's clickable
                $("<img/>").attr("src", item.media.m).appendTo("#gallery").wrap("<a href=" + item.link + "></a>");
                if ( i >= 20 ) return false; //display 21 images
            });
        });
    
        //switch to the gallery page after search
        $("#gallery", { transition: "slideup" });
        return false;
    });
 
});
*/




