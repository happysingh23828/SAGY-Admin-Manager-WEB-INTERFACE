

document.getElementById('modal-button').onclick = function() {

	
	var date =  new  Date().toDateString();		
	var title = document.getElementById('title').value;
	var description = document.getElementById('description').value;
	
	var image = $("#notification_image")[0].files[0];
	var imageurl;

	
		firebase.storage().ref().child("notificationpic").child(image.name).put(image).then(function(snapshot){

			imageurl = snapshot.downloadURL;

			var ref = firebase.database().ref().child("notification").push().set({

			title:title,
			description:description,
			time:date,
			image :imageurl
			}).then (function(data)
				{
					alert("Notification Added");
					
					 // clearning the modal form
					 document.getElementById('title').value='';
						document.getElementById('description').value='';
						document.getElementById('notification_image').value='';
				});


		});


	


}
firebase.database().ref().child("notification").on('child_added' , function (childSnapshot){

	var id = childSnapshot.key;
    var title = childSnapshot.child("title").val();
    var description = childSnapshot.child("description").val();
    var  image = childSnapshot.child("image").val();
    var time = childSnapshot.child("time").val();

    id =  '\''+id+'\'';
    
    $(document).ready(function(){


    		$('#tableshow').append(
    			'<thead><tr><td>'+time +'</td><td>'+title+'</td><td>'+description+'</td><td><img width = "150px" height = "100px" src='+image+'/></td><td><button class="btn btn-danger" onClick="deletenoti('+id+')">Delete</button></td></tr></thead>'
    			);
    });
});
function deletenoti(id)
{
		var reference =  firebase.database().ref().child("notification").child(id);

	if(confirm(" Realy Want To Delete?"))
	{
		reference.remove().then(function(){

		alert("Complaint deleted");

		window.location="notifications.html"
	}).catch(function(error){

		alert(error.message);
	})	;
	}
}