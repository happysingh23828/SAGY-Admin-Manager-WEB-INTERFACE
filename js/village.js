//register mp details




firebase.database().ref().child("mp").orderByChild("villageadopted").equalTo("").on('child_added' , function (childSnapshot){

     $(document).ready(function(){

        


            $('#mp_name').append('<option value='+childSnapshot.key+'>'+childSnapshot.child("name").val()+'</option>');
    });


});










firebase.database().ref().child("adopted_village").on('child_added' , function (childSnapshot){

var id = childSnapshot.key;
var village_name = childSnapshot.child('village').val();


var mp_name = childSnapshot.child('adopted_by').val();
firebase.database().ref().child("mp").child(mp_name).once('value' , function (childSnapshot){

        var constituency = childSnapshot.child('constituency').val();
var state = childSnapshot.child("state").val();
var party = childSnapshot.child("party").val();
var name = childSnapshot.child("name").val();

    
    id =  '\''+id+'\'';
    
    $(document).ready(function(){


            $('#tableshow').append(
                '<thead><tr><td>'+name+'</td><td>'+constituency+'</td><td>'+party+'</td><td>'+state+'</td></td><td>'+village_name+'</td><td><button class="btn btn-primary" onClick="addwork('+id+')">Work In Progress</button><button class="btn btn-danger" onClick="deletevillage('+id+')">Delete</button></td></tr></thead>'
                );
    });



});

});

function deletevillage(id)
{
        var reference =  firebase.database().ref().child("adopted_village").child(id);
        var mpvillageid;
        firebase.database().ref().child("adopted_village").child(id).once('value',function (data){

                mpvillageid = data.child("adopted_by").val();


           });
        


    if(confirm(" Are You Want To Delete? Press OK"))
    {
        reference.remove().then(function(){
        firebase.database().ref().child("mp").child(mpvillageid).child("villageadopted").set("");

        alert("Village Information Deleted Successfully!");

        window.location="village.html"
    }).catch(function(error){

        alert(error.message);
    })  ;
    }
}




//update employee detail

var wanttoupdateid,lastimage;
function updatevillage(id){

  



    var ref = firebase.database().ref().child("adopted_village").child(id);

    ref.once('value',function(data){

    var village_name = data.child("village").val();
    var mp_name = data.child("adopted_by").val();
    
    

    $(document).ready(function(){
    $("#myModal").modal('show');
    document.getElementById('village_name').value=village_name;
    document.getElementById('mp_name').value=mp_name;
    

    

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
   
                        $('#modal-button').text('Add Village');
                     



    }


}

//another field




document.getElementById('modal-button').onclick = function() {

    var id = wanttoupdateid;
    var btn  = $('#modal-button').text();
    if(btn=='Update')
    {

      
        var village_name = document.getElementById('village_name').value;
                var mp_name = document.getElementById('mp_name').value;
            
                    firebase.database().ref().child("adopted_village").child(id).set({

                    
                        village: village_name,
                        adopted_by: mp_name
                    }).then (function(data)
                {
                    firebase.database().ref().child("mp").child(mp_name).child("villageadopted").set(id);

                    alert("Data Updated");
                    $('#modal-button').text('Add Village');
                     // clearning the modal form
                    document.getElementById('village_name').value='';
                    document.getElementById('mp_name').value='';
                      $(document).ready(function(){
                            $("#myModal").modal('hide');});

                    
                        });


                    

               
            


            

    }

    else if(btn=='Add Village')
    {
            
            var village_name = document.getElementById('village_name').value;
            var mp_name = document.getElementById('mp_name').value;

            if(village_name!="" && mp_name!="")
            {
                var newidref = firebase.database().ref().child("adopted_village").push();
                var uid = newidref.key;
               
                var ref = firebase.database().ref().child("adopted_village").child(uid).set({

                
                            village: village_name.toLowerCase(),
                            adopted_by: mp_name,
                            constituency:"",
                            state:"",
                            party:""
                           
                }).then (function(data)
                    {
                        firebase.database().ref().child("mp").child(mp_name).child("villageadopted").set(uid);
                
                        alert("Information Added");
                        $('#modal-button').text('Add Village');
                         // clearning the modal form
                         document.getElementById('village_name').value='';
                        document.getElementById('mp_name').value='';

                        $(document).ready(function(){
                                $("#myModal").modal('hide');});

                        
                    });

            } else{
                alert("Enter  Proper Details");
            }




    }


}







function searchmpall()
{

    window.location="village.html"
    
}






document.getElementById('close-btn').onclick = function() {

    var btn  = $('#modal-button').text();
    if(btn=='Update')
    {

            // clearning the modal form
                     document.getElementById('village_name').value='';
                    document.getElementById('mp_name').value='';
                    
                        $('#modal-button').text('Add Information');



                        $(document).ready(function(){

                            
                            window.location="village.html"
                            
                            });
    }


}

function addwork(villageid) {

    localStorage.setItem("villageid", villageid); 

     window.open("work_in_progress.html","");
    
}

function searchvillage()
{
    var namechar = document.getElementById('search').value;
   
    firebase.database().ref().child("adopted_village").orderByChild("village").startAt(namechar.toLowerCase()).endAt(namechar.toLowerCase() + "\uf8ff").on('child_added' , function (childSnapshot){

   var id = childSnapshot.key;
    var village_name = childSnapshot.child('village').val();


    var mp_name = childSnapshot.child('adopted_by').val();
    firebase.database().ref().child("mp").child(mp_name).once('value' , function (childSnapshot){

            var constituency = childSnapshot.child('constituency').val();
    var state = childSnapshot.child("state").val();
    var party = childSnapshot.child("party").val();
    var name = childSnapshot.child("name").val();

        
        id =  '\''+id+'\'';
        
        $(document).ready(function(){
            document.getElementById('tableshow').innerHTML = '<thead><tr style="background-color: black;padding : 30px;color: #fff"><th>Adopted By</th><th>CONSTITUENCY</th><th>Party</th><th>State</th><th>Village</th><th>Action</th></tr></thead><thead><thead><tr><td>'+name+'</td><td>'+constituency+'</td><td>'+party+'</td><td>'+state+'</td></td><td>'+village_name+'</td><td><button class="btn btn-primary" onClick="addwork('+id+')">Work In Progress</button><button class="btn btn-danger" onClick="deletevillage('+id+')">Delete</button></td></tr></thead>';

                
        });



    });

});

}




