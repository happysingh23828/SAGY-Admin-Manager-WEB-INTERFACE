document.getElementById('modal-button').onclick = function() {

	
	var date =  new  Date().toDateString();		
	var title = document.getElementById('videotitle').value;
	var youtubeid = document.getElementById('youtubeid').value;

	title = title.toLowerCase();
	

	var ref = firebase.database().ref().child("videos").push().set({

			title:title,
			youtubeid:youtubeid,
			time:date
			}).then (function(data)
				{
					alert("Video  Added");
					
					 // clearning the modal form
					 document.getElementById('videotitle').value='';
						document.getElementById('youtubeid').value='';
		
				});
}

firebase.database().ref().child("videos").on('child_added' , function (childSnapshot){

	var id = childSnapshot.key;
    var title = childSnapshot.child("title").val();
    var time = childSnapshot.child("time").val();
    var youtubeid = childSnapshot.child("youtubeid").val();

    id =  '\''+id+'\'';
    
    $(document).ready(function(){


    		$('#tableshow').append(
    			'<thead><tr><td>'+time +'</td><td>'+title+'</td><td>'+youtubeid+'</td><td><button class="btn btn-danger" onClick="deletevideo('+id+')">Delete</button></td></tr></thead>'
    			);
    });
});


function deletevideo(id)
{
		var reference =  firebase.database().ref().child("videos").child(id);

	if(confirm(" Realy Want To Delete?"))
	{
		reference.remove().then(function(){

		alert("Video  deleted");

		window.location="videos.html"
	}).catch(function(error){

		alert(error.message);
	})	;
	}
}