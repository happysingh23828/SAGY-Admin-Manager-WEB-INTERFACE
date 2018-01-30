











firebase.database().ref().child("complaints").on('child_added' , function (childSnapshot){

	var id = childSnapshot.key;
    var subject = childSnapshot.child("sub").val();
    var status = childSnapshot.child("status").val();
    var name = childSnapshot.child("name").val();
    var time = childSnapshot.child("time").val();
    
    id =  '\''+id+'\'';
    
    $(document).ready(function(){


    		$('#tableshow').append(
    			'<thead><tr><td>'+time +'</td><td>'+subject+'</td><td>'+name+'</td><td><button  id="myBtn" class="btn btn-success" onClick="viewcomplaint('+id+')">View</button><button class="btn btn-danger" onClick="deletecomplaint('+id+')">Delete</button></td></tr></thead>'
    			);
    });

    

});


function viewcomplaint(id){
		modal.style.display = "block";
	var complaintref = firebase.database().ref().child("complaints").child(id);

	complaintref.once('value',function(snapshot){

		var status  = snapshot.child("status").val();
		var complaintdes  = snapshot.child("des").val();	
		var name = snapshot.child("name").val();
		var email = snapshot.child("email").val();
		var phno  = snapshot.child("phno").val();
		var subject  = snapshot.child("sub").val();
		var time  = snapshot.child("time").val();
		

			
		$(document).ready(function(){

			$('.table #name').text(name);
			$('.table #email').text(email);
			$('.table #phno').text(phno);
			$('#complaint-info  #subject').text(subject);
			$('#complaint-info #complaintdes').text(complaintdes);
			$('.table #time').text(time);

    });
	});
}


function deletecomplaint(id) {

	var reference =  firebase.database().ref().child("complaints").child(id);

	if(confirm(" Realy Want To Delete??"))
	{
		reference.remove().then(function(){

		alert("Complaint deleted");

		window.location="complaints.html"
	}).catch(function(error){

		alert(error.message);
	})	;
	}
}








var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}	


