var global_email,global_password;
	firebase.database().ref().child("users").on('child_added' , function (childSnapshot){

	var id = childSnapshot.key;
    var name = childSnapshot.child("name").val();
    var email = childSnapshot.child("email").val();
    var state = childSnapshot.child("state").val();
    
    
    
    	name = name.toLowerCase();


	    id =  '\''+id+'\'';
	    
	    $(document).ready(function(){


	    		$('#tableshow').append(
	    			'<thead><tr><td>'+name +'</td><td>'+state+'</td><td>'+email+'</td><td><button class="btn btn-primary" onClick="updatemp('+id+')">Update</button><button class="btn btn-danger" onClick="deletemp('+id+')">Delete</button></td></tr></thead>'
	    			);
	    });
    
    
});

	function addmp()
	{


			$(document).ready(function(){

			document.getElementById('upload_image').style.display = "block";
			document.getElementById('update_checkbox_div').style.display="none";
			document.getElementById('update_image').style.display="none";

			
			
	});	


	}


function deletemp(id)
{
		var reference =  firebase.database().ref().child("users").child(id);

	if(confirm(" Realy Want To Delete?"))
	{
		reference.remove().then(function(){

		alert("Manager deleted");

		window.location="admin.html"
	}).catch(function(error){

		alert(error.message);
	})	;
	}
}




function check()
{
	var update_image_checkbox = document.getElementById("update_checkbox").checked;

	
	if(update_image_checkbox)
	{
		document.getElementById('update_image').style.display="block";
	}
	else
	{
		document.getElementById('update_image').style.display="none";
	}

}





var wanttoupdateid,lastimage;
function updatemp(id){


	$(document).ready(function(){

			document.getElementById('upload_image').style.display = "none";
			document.getElementById('update_checkbox_div').style.display="block";
			
			
			
			
	});
	

		
	var ref = firebase.database().ref().child("users").child(id);

	ref.once('value',function(data){

	var name = data.child("name").val();
	var state = data.child("state").val();
	var password = data.child("password").val();
	var mobileno = data.child("mobileno").val();
	var email  = data.child("email").val();
	global_email = email;
	global_password = password;
	lastimage = data.child("image").val();
	


	$(document).ready(function(){
	$("#myModal").modal('show');
	document.getElementById('mname').value=name;
	document.getElementById('mpassword').value=password;
	document.getElementById('mmobileno').value=mobileno;
	document.getElementById('mstate').value=state;
	document.getElementById('memail').value=email;




    $('#modal-button').text('Update');

    wanttoupdateid = id;	

	
	});

});

}




document.getElementById('modal-button').onclick = function() {



	



	var id = wanttoupdateid;
	var btn  = $('#modal-button').text();
	if(btn=='Update')
	{

		

			if(document.getElementById("update_checkbox").checked==true)
			{
				

			var name1 = document.getElementById('mname').value;
			var password1 = document.getElementById('mpassword').value;
			var mobileno1 = document.getElementById('mmobileno').value;
			var state1 = document.getElementById('mstate').value;
			var imagenew = $("#mpimageupdate")[0].files[0];
			var imageurlnew;

			name1 = name1.toLowerCase();

			
			firebase.storage().ref().child("profilepic").child(id).put(imagenew).then(function(snapshot){

					imageurlnew = snapshot.downloadURL;

					firebase.database().ref().child("users").child(id).set({

					name:name1	.toLowerCase(),
					password:global_password,
					mobileno:mobileno1,
					email :global_email,
					state : state1,
					type : "manager",
					image :imageurlnew
					}).then (function(data)
				{
					alert("Data Updated");
					$('#modal-button').text('Add Information');
					 // clearning the modal form
					 document.getElementById('mname').value='';
						document.getElementById('mpassword').value='';
						document.getElementById('mmobileno').value='';
						document.getElementById('mstate').value='';
						document.getElementById('mpimageupdate').value='';

						$(document).ready(function(){

							document.getElementById('upload_image').style.display = "block";
							document.getElementById('update_checkbox_div').style.display="none";
							
							
							
							});

				});
				});




			}	

			if(document.getElementById("update_checkbox").checked==false)
			{

					var name1 = document.getElementById('mname').value;
					var password1 = document.getElementById('mpassword').value;
					var mobileno1 = document.getElementById('mmobileno').value;
					var state1 = document.getElementById('mstate').value;
					
					name1 = name1.toLowerCase();


							firebase.database().ref().child("users").child(id).set({

							name:name1.toLowerCase(),
							password:global_password,
							mobileno:mobileno1,
							email :global_email	,
							state : state1,
							type : "manager",
							image : lastimage
							}).then (function(data)
						{
							alert("Data Updated");
							$('#modal-button').text('Add Information');
							 // clearning the modal form
							 document.getElementById('mname').value='';
								document.getElementById('mpassword').value='';
								document.getElementById('mmobileno').value='';
								document.getElementById('mstate').value='';
								document.getElementById('mpimagenew').value='';

									$(document).ready(function(){

							document.getElementById('upload_image').style.display = "block";
							document.getElementById('update_checkbox_div').style.display="none";
							document.getElementById('update_image').style.display="none";
							window.location="admin.html"
							
							
							
							});
						});
						



			}


			

	}

	else if(btn=='Add Information')
	{
		
		


	var name = document.getElementById('mname').value;
	var password = document.getElementById('mpassword').value;
	var mobileno = document.getElementById('mmobileno').value;
	var state = document.getElementById('mstate').value;
	var email1 = document.getElementById('memail').value;
	var image = $("#mpimagenew")[0].files[0];
	var imageurl;


			firebase.auth().signOut();
			firebase.auth().createUserWithEmailAndPassword(email1, password).catch(function(error) {
			  


			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // ...
			});

			firebase.auth().signInWithEmailAndPassword(localStorage.getItem("useremail"),localStorage.getItem("userpassword")).catch(function(error) {
		  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // ...
			});
		name = name.toLowerCase();
	
		firebase.storage().ref().child("profilepic").child(image.name).put(image).then(function(snapshot){

			imageurl = snapshot.downloadURL;

			var ref = firebase.database().ref().child("users").push().set({

			name:name.toLowerCase(),
			password:password,
			mobileno:mobileno,
			email :email1,
			state : state,
			type : "manager",
			image :imageurl
			}).then (function(data)
				{
					alert("Information Added");
					$('#modal-button').text('Add Information');
					 // clearning the modal form
					 document.getElementById('mname').value='';
						document.getElementById('mpassword').value='';
						document.getElementById('mmobileno').value='';
						document.getElementById('mstate').value='';
						document.getElementById('mpimage').value='';
						window.location="admin.html";
				});


		});


	}


}


document.getElementById('close-btn').onclick = function() {

	var btn  = $('#modal-button').text();
	if(btn=='Update')
	{

			// clearning the modal form
					 document.getElementById('mname').value='';
						document.getElementById('mpassword').value='';
						document.getElementById('mmobileno').value='';
						document.getElementById('mstate').value='';
						document.getElementById('mpimagenew').value='';
						document.getElementById('mpimageupdate').value='';
						$('#modal-button').text('Add Information');



						$(document).ready(function(){

							document.getElementById('upload_image').style.display = "block";
							document.getElementById('update_checkbox_div').style.display="none";
							
							$("#myModal").modal('hide');
							
							});


	}


}



function searchmp()
{
	var namechar = document.getElementById('search').value;
	firebase.database().ref().child("users").orderByChild("name").startAt(namechar).endAt(namechar + "\uf8ff").on('child_added' , function (childSnapshot){

	
	var id = childSnapshot.key;
    var name = childSnapshot.child("name").val();
    var email = childSnapshot.child("email").val();
    var state = childSnapshot.child("state").val();
    
    
    
    	name = name.toLowerCase();


	    id =  '\''+id+'\'';
	    
	    $(document).ready(function(){

	    	document.getElementById('tableshow').innerHTML = '<thead><tr style="background-color: black;padding : 30px;color: #fff"><th>Name</th><th>State</th><th>Email</th><th>ACTION</th></tr></thead><thead><tr><td>'+name +'</td><td>'+state+'</td><td>'+email+'</td><td><button class="btn btn-primary" onClick="updatemp('+id+')">Update</button><button class="btn btn-danger" onClick="deletemp('+id+')">Delete</button></td></tr></thead>';
	    	document.getElementById('search').value='';	
	    });
    
		
	    
    
    
    
   
					
});
}

function searchmpall()
{

	window.location="admin.html"
	
}

function signout() {
	// body...

	firebase.auth().signOut().then(function() {
  // Sign-out successful.

  alert("logout successfully!");
  localStorage.setItem("usertype","");
  window.location = "../html/manager_login.html";

}).catch(function(error) {
  // An error happened.
  alert(error);
});
}









