
var village_id = localStorage.getItem("villageid");

document.getElementById('modal-button').onclick = function() {

	
	var date =  new  Date().toDateString();		
	var title = document.getElementById('title').value;
	var description = document.getElementById('description').value;		
	
	var image = $("#notification_image")[0].files[0];
	var imageurl;

	
		firebase.storage().ref().child("workinprogress").child(image.name).put(image).then(function(snapshot){

			imageurl = snapshot.downloadURL;

			var ref = firebase.database().ref().child("adopted_village").child(village_id).child("work").push().set({

			title:title,
			description:description,
			time:date,
			image :imageurl
			}).then (function(data)
				{
					alert("Work Added");
					
					 // clearning the modal form
					 document.getElementById('title').value='';
						document.getElementById('description').value='';
						document.getElementById('notification_image').value='';
				});


		});


	


}
firebase.database().ref().child("adopted_village").child(village_id).child("work").on('child_added' , function (childSnapshot){

	var id = childSnapshot.key;
    var title = childSnapshot.child("title").val();
    var description = childSnapshot.child("description").val();
    var  image = childSnapshot.child("image").val();
    var time = childSnapshot.child("time").val();

    id =  '\''+id+'\'';
    
    $(document).ready(function(){


    		$('#tableshow').append(
    			'<thead><tr><td>'+time +'</td><td>'+title+'</td><td>'+description+'</td><td><img width = "150px" height = "100px" src='+image+'/></td><td><button style="margin-left:20px;"  id="myBtn" class="btn btn-success" data-toggle="modal" data-target="#myModalview" onClick="viewactivity('+id+')">View</button><button style="margin:10px;" class="btn btn-danger" onClick="deleteactivity('+id+')">Delete</button></td></tr></thead>'
    			);
    });
});
function deleteactivity(id)
{
		var reference =  firebase.database().ref().child("adopted_village").child(village_id).child("work").child(id);

	if(confirm(" Realy Want To Delete?"))
	{
		reference.remove().then(function(){

		alert("Work deleted");

		window.location="work_in_progress.html"
	}).catch(function(error){

		alert(error.message);
	})	;
	}
}

function viewactivity(id){

	

	
	var activityref = firebase.database().ref().child("adopted_village").child(village_id).child("work").child(id);

	activityref.once('value',function(snapshot){

		var title = snapshot.child("title").val();
		var image = snapshot.child("image").val();
		var description = snapshot.child("description").val();
		var time  = snapshot.child("time").val();
		
			
		$(document).ready(function(){

			$('#viewmodel #titleview').text(title);
			$('.table #dateview').text(time);
			$('#descriptionview').text(description);
			document.getElementById("imageview").src = image;


    });


	});
}

function backtovillage() {
		window.close();
		localStorage.setItem("villageid",""); 
	
}



//jhfgdgfgdjgjfdjgfd
