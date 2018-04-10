
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
    
  } else {
    
    
    window.location = "../html/manager_login.html";
  }
});




function manager_login(){

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


   firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

  var errorCode = error.code;
  var errorMessage = error.message;
});

}


var menu_tab_selected_before;


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}



function menu_tab_change(tab_id)
{


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
