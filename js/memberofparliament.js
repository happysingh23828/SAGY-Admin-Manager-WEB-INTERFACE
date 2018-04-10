
	firebase.database().ref().child("mp").on('child_added' , function (childSnapshot){

	var id = childSnapshot.key;
    var name = childSnapshot.child("name").val();
    var constituency = childSnapshot.child("constituency").val();
    var state = childSnapshot.child("state").val();
    var adoptedvillage = childSnapshot.child("villageadopted").val();
    
    if(adoptedvillage=="")
    {
    	name = name.toLowerCase();


	    id =  '\''+id+'\'';
	    
	    $(document).ready(function(){


	    		$('#tableshow').append(
	    			'<thead><tr><td>'+name +'</td><td>'+constituency+'</td><td>'+state+'</td><td>'+adoptedvillage+'</td><td><button class="btn btn-primary" onClick="updatemp('+id+')">Update</button><button class="btn btn-danger" onClick="deletemp('+id+')">Delete</button></td></tr></thead>'
	    			);
	    });
    }
    else
    {

    	firebase.database().ref().child("adopted_village").child(adoptedvillage).once('value',function(data){

    			name = name.toLowerCase();
    			var villname = data.child("village").val();

			    id =  '\''+id+'\'';
			    
			    $(document).ready(function(){


			    		$('#tableshow').append(
			    			'<thead><tr><td>'+name +'</td><td>'+constituency+'</td><td>'+state+'</td><td>'+villname+'</td><td><button class="btn btn-primary" onClick="updatemp('+id+')">Update</button><button class="btn btn-danger" onClick="deletemp('+id+')">Delete</button></td></tr></thead>'
			    			);
			    });


    	});
    }
    
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
		var reference =  firebase.database().ref().child("mp").child(id);

	if(confirm(" Realy Want To Delete?"))
	{
		reference.remove().then(function(){

		alert("Complaint deleted");

		window.location="memberofparliament.html"
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
	

		
	var ref = firebase.database().ref().child("mp").child(id);

	ref.once('value',function(data){

	var name = data.child("name").val();
	var dob = data.child("dob").val();
	var residence = data.child("address").val();
	var constituency = data.child("constituency").val();
	var state = data.child("state").val();
	var party = data.child("party").val();
	var villageadopted = data.child("villageadopted").val();
	lastimage = data.child("image").val();
	


	$(document).ready(function(){
	$("#myModal").modal('show');
	document.getElementById('mpname').value=name;
	document.getElementById('mpdob').value=dob;
	document.getElementById('mpaddress').value=residence;
	document.getElementById('mpconstituency').value=constituency;
	document.getElementById('mpstate').value=state;
	document.getElementById('mpparty').value=party;
	document.getElementById('mpadoptedvillage').value=villageadopted;




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
				

			var name1 = document.getElementById('mpname').value;
			var dob1 = document.getElementById('mpdob').value;
			var residence1 = document.getElementById('mpaddress').value;
			var constituency1 = document.getElementById('mpconstituency').value;
			var state1 = document.getElementById('mpstate').value;
			var party1 = document.getElementById('mpparty').value;
			var villageadopted1 = document.getElementById('mpadoptedvillage').value;
			var imagenew = $("#mpimageupdate")[0].files[0];
			var imageurlnew;

			name1 = name1.toLowerCase();

			
			firebase.storage().ref().child("profilepic").child(id).put(imagenew).then(function(snapshot){

					imageurlnew = snapshot.downloadURL;

					firebase.database().ref().child("mp").child(id).set({

					name:name1,
					dob:dob1,
					address:residence1,
					constituency :constituency1,
					state : state1,
					party:party1,
					villageadopted :villageadopted1,
					image :imageurlnew
					}).then (function(data)
				{
					alert("Data Updated");
					$('#modal-button').text('Add Information');
					 // clearning the modal form
					 document.getElementById('mpname').value='';
						document.getElementById('mpdob').value='';
						document.getElementById('mpaddress').value='';
						document.getElementById('mpconstituency').value='';
						document.getElementById('mpstate').value='';
						document.getElementById('mpparty').value='';
						document.getElementById('mpadoptedvillage').value='';
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

					var name1 = document.getElementById('mpname').value;
					var dob1 = document.getElementById('mpdob').value;
					var residence1 = document.getElementById('mpaddress').value;
					var constituency1 = document.getElementById('mpconstituency').value;
					var state1 = document.getElementById('mpstate').value;
					var party1 = document.getElementById('mpparty').value;
					var villageadopted1 = document.getElementById('mpadoptedvillage').value;
					
					name1 = name1.toLowerCase();


							firebase.database().ref().child("mp").child(id).set({

							name:name1,
							dob:dob1,
							address:residence1,
							constituency :constituency1,
							state : state1,
							party:party1,
							villageadopted :villageadopted1,
							image : lastimage
							}).then (function(data)
						{
							alert("Data Updated");
							$('#modal-button').text('Add Information');
							 // clearning the modal form
							 document.getElementById('mpname').value='';
								document.getElementById('mpdob').value='';
								document.getElementById('mpaddress').value='';
								document.getElementById('mpconstituency').value='';
								document.getElementById('mpstate').value='';
								document.getElementById('mpparty').value='';
								document.getElementById('mpadoptedvillage').value='';
								document.getElementById('mpimagenew').value='';

									$(document).ready(function(){

							document.getElementById('upload_image').style.display = "block";
							document.getElementById('update_checkbox_div').style.display="none";
							document.getElementById('update_image').style.display="none";
							window.location="memberofparliament.html"
							
							
							
							});
						});
						



			}


			

	}

	else if(btn=='Add Information')
	{
		
		


	var name = document.getElementById('mpname').value;
	var dob = document.getElementById('mpdob').value;
	var residence = document.getElementById('mpaddress').value;
	var constituency = document.getElementById('mpconstituency').value;
	var state = document.getElementById('mpstate').value;
	var party = document.getElementById('mpparty').value;
	var villageadopted = document.getElementById('mpadoptedvillage').value;
	var image = $("#mpimagenew")[0].files[0];
	var imageurl;
	name = name.toLowerCase();
	
		firebase.storage().ref().child("profilepic").child(image.name).put(image).then(function(snapshot){

			imageurl = snapshot.downloadURL;

			var ref = firebase.database().ref().child("mp").push().set({

			name:name,
			dob:dob,
			address:residence,
			constituency :constituency,
			state : state,
			party:party,
			villageadopted :villageadopted,
			image :imageurl
			}).then (function(data)
				{
					alert("Information Added");
					$('#modal-button').text('Add Information');
					 // clearning the modal form
					 document.getElementById('mpname').value='';
						document.getElementById('mpdob').value='';
						document.getElementById('mpaddress').value='';
						document.getElementById('mpconstituency').value='';
						document.getElementById('mpstate').value='';
						document.getElementById('mpparty').value='';
						document.getElementById('mpadoptedvillage').value='';
						document.getElementById('mpimage').value='';
						window.location="memberofparliament.html"
				});


		});


	}


}


document.getElementById('close-btn').onclick = function() {

	var btn  = $('#modal-button').text();
	if(btn=='Update')
	{

			// clearning the modal form
					 document.getElementById('mpname').value='';
						document.getElementById('mpdob').value='';
						document.getElementById('mpaddress').value='';
						document.getElementById('mpconstituency').value='';
						document.getElementById('mpstate').value='';
						document.getElementById('mpparty').value='';
						document.getElementById('mpadoptedvillage').value='';
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
	firebase.database().ref().child("mp").orderByChild("name").startAt(namechar).endAt(namechar + "\uf8ff").on('child_added' , function (childSnapshot){

	namechar = namechar.toLowerCase();	
	var id = childSnapshot.key;
    var name = childSnapshot.child("name").val();
    var constituency = childSnapshot.child("constituency").val();
    var state = childSnapshot.child("state").val();
    var adoptedvillage = childSnapshot.child("villageadopted").val();

    if(adoptedvillage=="")
    {
    	name = name.toLowerCase();


	    id =  '\''+id+'\'';
		 document.getElementById('tableshow').innerHTML = '<thead><tr style="background-color: black;padding : 30px;color: #fff"><th>NAME</th><th>CONSTITUENCY</th><th>STATE</th><th>ADOPTED VILLAGE</th><th>ACTION</th></tr></thead><thead><tr><td>'+name +'</td><td>'+constituency+'</td><td>'+state+'</td><td>'+adoptedvillage+'</td><td><button class="btn btn-primary" onClick="updatemp('+id+')">Update</button><button class="btn btn-danger" onClick="deletemp('+id+')">Delete</button></td></tr></thead>';
	   	
	  	 document.getElementById('search').value='';
	    
    }
    else
    {

    	firebase.database().ref().child("adopted_village").child(adoptedvillage).once('value',function(data){

    			name = name.toLowerCase();
    			var villname = data.child("village").val();

			    id =  '\''+id+'\'';
   
			  	document.getElementById('tableshow').innerHTML = '<thead><tr style="background-color: black;padding : 30px;color: #fff"><th>NAME</th><th>CONSTITUENCY</th><th>STATE</th><th>ADOPTED VILLAGE</th><th>ACTION</th></tr></thead><thead><tr><td>'+name +'</td><td>'+constituency+'</td><td>'+state+'</td><td>'+villname+'</td><td><button class="btn btn-primary" onClick="updatemp('+id+')">Update</button><button class="btn btn-danger" onClick="deletemp('+id+')">Delete</button></td></tr></thead>';
			   	
			  	 document.getElementById('search').value='';

    	});
    }
    
   
					
});
}

function searchmpall()
{

	window.location="memberofparliament.html"
	
}