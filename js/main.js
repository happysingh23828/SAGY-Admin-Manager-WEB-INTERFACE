firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

  	window.location = "../index.html";
    
    
  } 
});


function manager_login() {
  alert("jdjsdhasj");


	var e = document.getElementById('email').value;
	var p = document.getElementById('password').value;



 firebase.auth().signInWithEmailAndPassword(e,p).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);

	

  // ...
});


	// body...
}




