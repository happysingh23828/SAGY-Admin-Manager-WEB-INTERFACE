var village_no = 0;

firebase.database().ref().child("adopted_village").on('child_added' , function (childSnapshot){

  village_no = village_no+1;
  document.getElementById("village_no").innerHTML =village_no;
});



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
    
  } else {
    
    
    window.location = "html/manager_login.html";
  }
});


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
  window.location = "html/manager_login.html";

}).catch(function(error) {
  // An error happened.
  alert(error);
});
}