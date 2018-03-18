//register mp details
/*
function add_village(){
  
alert("ADD INFORMATION !");
var village_name = document.getElementById('village_name').value;
var mp_name = document.getElementById('mp_name').value;
var thasil = document.getElementById('thasil').value;
var constituency = document.getElementById('constituency').value;
var state = document.getElementById("state").value;
var party = document.getElementById("party").value;
var image = $('#village')[0].files[0];
var imageurlnew;

alert(image);

firebase.storage().ref().child("villageimage").child(image.name).put(image).then(function(data) {

    
                    imageurlnew = data.downloadURL;
                    alert(imageurlnew);
                    firebase.database().ref().child('Adopted_village').push().set({


    Village: village_name,
    Adobted_By: mp_name,
    Thasil: thasil,
    Constituency:constituency,
    State:state,
    Party:party,
    image:imageurlnew
    
  });

            // body...
});






}


*/
firebase.database().ref().child("Adopted_village").on('child_added' , function (childSnapshot){
var id = childSnapshot.key;
var village_name = childSnapshot.child('Village').val();
var mp_name = childSnapshot.child('Adobted_By').val();
var thasil = childSnapshot.child('Thasil').val();
var constituency = childSnapshot.child('Constituency').val();
var state = childSnapshot.child("State").val();
var party = childSnapshot.child("Party").val();

    
    id =  '\''+id+'\'';
    
    $(document).ready(function(){


            $('#tableshow').append(
                '<thead><tr><td>'+ mp_name+'</td><td>'+constituency+'</td><td>'+party+'</td><td>'+state+'</td></td><td>'+village_name+'</td><td>'+thasil+'</td><td><button class="btn btn-primary" onClick="updatevillage('+id+')">Update</button><button class="btn btn-danger" onClick="deletevillage('+id+')">Delete</button></td></tr></thead>'
                );
    });
});

function deletevillage(id)
{
        var reference =  firebase.database().ref().child("Adopted_village").child(id);

    if(confirm(" Are You Want To Delete? Press OK"))
    {
        reference.remove().then(function(){

        alert("Village Information deleted Successfully!");

        window.location="village.html"
    }).catch(function(error){

        alert(error.message);
    })  ;
    }
}

//update employee detail

var wanttoupdateid,lastimage;
function updatevillage(id){

      $(document).ready(function(){

                            document.getElementById('upload_image').style.display = "none";
                            document.getElementById('update_checkbox_div').style.display="block";
                            
                            
                            
                            });



    var ref = firebase.database().ref().child("Adopted_village").child(id);

    ref.once('value',function(data){

    var village_name = data.child("Village").val();
    var mp_name = data.child("Adobted_By").val();
    var thasil = data.child("Thasil").val();
    var constituency = data.child("Constituency").val();
    var state = data.child("State").val();
    var party = data.child("Party").val();
    var image = $("#village")[0].files[0];


    $(document).ready(function(){
    $("#myModal").modal('show');
    document.getElementById('village_name').value=village_name;
    document.getElementById('mp_name').value=mp_name;
    document.getElementById('thasil').value=thasil;
    document.getElementById('constituency').value=constituency;
    document.getElementById('state').value=state;
    document.getElementById('party').value=party;
    lastimage = data.child("image").val();
    

    $('#modal-button').text('Update');

    wanttoupdateid = id;    

    
    });

});

}
//null previous values

document.getElementById('close-btn').onclick = function() {

    var btn  = $('#modal-button').text();
    if(btn=='Update')
    {

            // clearning the modal form
    document.getElementById('village_name').value='';
    document.getElementById('mp_name').value='';
    document.getElementById('thasil').value='';
    document.getElementById('constituency').value='';
    document.getElementById('state').value='';
    document.getElementById('party').value='';
                        $('#modal-button').text('Add Village');
                     



    }


}

//another field




document.getElementById('modal-button').onclick = function() {

    var id = wanttoupdateid;
    var btn  = $('#modal-button').text();
    if(btn=='Update')
    {

      
            if(document.getElementById("update_checkbox").checked==true)
            {
                var village_name = document.getElementById('village_name').value;
                var mp_name = document.getElementById('mp_name').value;
                var thasil = document.getElementById('thasil').value;
                var constituency = document.getElementById('constituency').value;
                var state = document.getElementById("state").value;
                var party = document.getElementById("party").value;
                var image = $('#villageupdate')[0].files[0];
                var imageurlnew;




            
            firebase.storage().ref().child("village").child(id).put(image).then(function(snapshot){

                    imageurlnew = snapshot.downloadURL;

                    firebase.database().ref().child("Adopted_village").child(id).set({

                    
                        Village: village_name,
                        Adobted_By: mp_name,
                        Thasil: thasil,
                        Constituency:constituency,
                        State:state,
                        Party:party,
                        image:imageurlnew
                    }).then (function(data)
                {
                    alert("Data Updated");
                    $('#modal-button').text('Add Village');
                     // clearning the modal form
                    document.getElementById('village_name').value='';
                    document.getElementById('mp_name').value='';
                    document.getElementById('thasil').value='';
                    document.getElementById('constituency').value='';
                    document.getElementById('state').value='';
                    document.getElementById('party').value='';
                     document.getElementById('village').value='';

                });
                }); 


            }
            if(document.getElementById("update_checkbox").checked==false)
            {

                var village_name = document.getElementById('village_name').value;
                var mp_name = document.getElementById('mp_name').value;
                var thasil = document.getElementById('thasil').value;
                var constituency = document.getElementById('constituency').value;
                var state = document.getElementById("state").value;
                var party = document.getElementById("party").value;

                  firebase.database().ref().child("Adopted_village").child(id).set({

                    
                        Village: village_name,
                        Adobted_By: mp_name,
                        Thasil: thasil,
                        Constituency:constituency,
                        State:state,
                        Party:party,
                        image:lastimage
                    }).then (function(data)
                {
                    alert("Data Updated");
                    $('#modal-button').text('Add Village');
                     // clearning the modal form
                    document.getElementById('village_name').value='';
                    document.getElementById('mp_name').value='';
                    document.getElementById('thasil').value='';
                    document.getElementById('constituency').value='';
                    document.getElementById('state').value='';
                    document.getElementById('party').value='';
                     document.getElementById('village').value='';

                });
            }


            

    }

    else if(btn=='Add Village')
    {
        
            
            var village_name = document.getElementById('village_name').value;
            var mp_name = document.getElementById('mp_name').value;
            var thasil = document.getElementById('thasil').value;
            var constituency = document.getElementById('constituency').value;
            var state = document.getElementById("state").value;
            var party = document.getElementById("party").value;
            var image = $('#village')[0].files[0];
            var imageurlnew;


    
        firebase.storage().ref().child("village").child(village_name).put(image).then(function(snapshot){

            imageurlnew = snapshot.downloadURL;

            var ref = firebase.database().ref().child("Adopted_village").push().set({

            
                        Village: village_name,
                        Adobted_By: mp_name,
                        Thasil: thasil,
                        Constituency:constituency,
                        State:state,
                        Party:party,
                        image:imageurlnew
            }).then (function(data)
                {
                    alert("Information Added");
                    $('#modal-button').text('Add Village');
                     // clearning the modal form
                     document.getElementById('village_name').value='';
                    document.getElementById('mp_name').value='';
                    document.getElementById('thasil').value='';
                    document.getElementById('constituency').value='';
                    document.getElementById('state').value='';
                    document.getElementById('party').value='';
                        document.getElementById('village').value='';
                });


        });


    }


}




//searching 

function searchvillage()
{
    var namechar = document.getElementById('search').value;
    firebase.database().ref().child("Adopted_village").orderByChild("Village").startAt(namechar).endAt(namechar + "\uf8ff").on('child_added' , function (childSnapshot){

        namechar = namechar.toLowerCase();  
        var id = childSnapshot.key;
        var village_name = childSnapshot.child('Village').val();
        var mp_name = childSnapshot.child('Adobted_By').val();
        var thasil = childSnapshot.child('Thasil').val();
        var constituency = childSnapshot.child('Constituency').val();
        var state = childSnapshot.child("State").val();
        var party = childSnapshot.child("Party").val();
    
    id =  '\''+id+'\'';
   
    document.getElementById('tableshow').innerHTML = '<thead><tr style="background-color: blue;padding : 30px;color: #fff"><th>Adobted_By</th><th>Constituency</th><th>Party</th><th>State</th><th>Village</th><th>Thasil</th><th>Action</th></tr></thead><thead><tr><td>'+mp_name+'</td><td>'+constituency+'</td><td>'+party+'</td><td>'+state+'</td><td>'+village_name+'</td><td>'+thasil+'</td><td><button class="btn btn-primary" onClick="updatevillage('+id+')">Update</button><button class="btn btn-danger" onClick="deletevillage('+id+')">Delete</button></td></tr></thead>';
    
     document.getElementById('search').value='';
                    
});
}


function searchmpall()
{

    window.location="village.html"
    
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



document.getElementById('close-btn').onclick = function() {

    var btn  = $('#modal-button').text();
    if(btn=='Update')
    {

            // clearning the modal form
                     document.getElementById('village_name').value='';
                    document.getElementById('mp_name').value='';
                    document.getElementById('thasil').value='';
                    document.getElementById('constituency').value='';
                    document.getElementById('state').value='';
                    document.getElementById('party').value='';
                     document.getElementById('village').value=''
                        $('#modal-button').text('Add Information');



                        $(document).ready(function(){

                            document.getElementById('upload_image').style.display = "block";
                            document.getElementById('update_checkbox_div').style.display="none";
                            
                            window.location="village.html"
                            
                            });
    }


}
