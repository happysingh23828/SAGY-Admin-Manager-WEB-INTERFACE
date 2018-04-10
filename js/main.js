var UserType;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    var uid = user.uid;

   
    if(UserType=="admin")
    {
      alert(uid);
        firebase.database().ref().child("users").child(uid).once('value' , function (childSnapshot){

          if(childSnapshot.child("type").val()=="admin")
          {
              window.location = "../html/admin.html";
          }
          else
          {
            alert("You Are Not Admin");
            signout();
          }

        });

    }
    else if(UserType=="manager"){

        window.location = "../index.html";
     

      

    }

  	
    
    
  } 
});


function manager_login() {
  


	var e = document.getElementById('email').value;
	var p = document.getElementById('password').value;

  UserType = document.getElementById('usertype').value;
  localStorage.setItem("usertype",UserType);
  localStorage.setItem("useremail",e);
  localStorage.setItem("userpassword",p);

  //alert("Login Successful!");



 firebase.auth().signInWithEmailAndPassword(e,p).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
  if(error){
	  alert(errorMessage);
  }
  else{
	  alert("Login Successful!");
  }

	

  // ...
});


	// body...
}

function signout() {
  // body...

  firebase.auth().signOut().then(function() {
  // Sign-out successful.

  //alert("logout successfully!");
  localStorage.setItem("usertype","");

  localStorage.setItem("useremail","");
  localStorage.setItem("userpassword","");
  window.location = "../html/manager_login.html";

}).catch(function(error) {
  // An error happened.
  
});
}




