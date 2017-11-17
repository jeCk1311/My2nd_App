
$(document).one('pageinit', function(){
   
    showNotes();

    
    $('#submitNote').on('tap', addNotes);

   
    $('#submitEditNote').on('tap', editNote);

    
    $('#note_List').on('tap','#editLink', setCurrentVals);

    
    $('#deleteNote').on('tap', deleteNote);

   
    function getNotesObject(){
        
       
        var notes = new Array();

       
        var currentNotes = localStorage.getItem('notes');

        
        if (currentNotes != null){

            
            var notes = JSON.parse(currentNotes);
        }

       
        return notes.sort(function(a,b) {return new Date(b.noteTime) - new Date(a.noteTime)});   
    }

  
    function addNotes(){
        
        
        var noteDescription = $('#noteDescription').val();
        var noteText = $('#addNote').val();
        var currentdate = new Date(); 
        var noteDate = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() 
                
        var noteTime = currentdate.getHours() + ":" + currentdate.getMinutes()

       
        var note = {
            noteDescription: noteDescription,
            noteText: noteText,
            noteDate: noteDate,
            noteTime: noteTime
            

        };

        var notes = getNotesObject();

        
        notes.push(note);

      
        localStorage.setItem('notes', JSON.stringify(notes));

       
        window.location.href = "index.html";

        return false;
    
    }
    

   
    function showNotes(){
        var notes = getNotesObject();

        if (notes != '' && notes != null ){

            for(var i=0; i<notes.length; i++){
                
                $('#note_List').append('<li class="ui-body-inherit"><a href="#EditNotePage" id="editLink" data-1="'+ notes[i]['noteDescription']+'" data-2="'+notes[i]['noteText']+'" data-3="'+notes[i]['noteTime']+'" data-4="'+notes[i]['noteDate']+'"><h3>'+ notes[i]['noteDescription']+'</h3>'+
                '<p>'+ notes[i]['noteText'] +'</p> <p class="ui-li-aside">'+ notes[i]['noteDate'] + " @ " + notes[i]['noteTime'] +'</p></a></li>').listview('refresh');

            }

            
            $('#home').bind('pageinit', function(){
              
                $('#note_List').listview('refresh');
            });

        }   
    
    }

  
    function setCurrentVals(){
        
        localStorage.setItem('currentNoteDescription', $(this).data('1'));
        localStorage.setItem('currentNoteText', $(this).data('2'));
        localStorage.setItem('currentNoteTime', $(this).data('3'));
        localStorage.setItem('currentNoteDate', $(this).data('4'));
        

       
        $('#noteDescriptionEdit').val(localStorage.getItem('currentNoteDescription'));
        $('#noteEdit').val(localStorage.getItem('currentNoteText'));

    }

    function deleteNote (){
        var procceed = confirm("Are you sure?");
        if(procceed){


            
            var currentNoteDescription = $('#noteDescriptionEdit').val();
            var currentNoteText = $('#noteEdit').val();

            
            var notes = getNotesObject();

            
            for(var i=0; i<notes.length; i++){
                if(notes[i].noteDescription == currentNoteDescription && 
                    notes[i].noteText == currentNoteText){

                   
                    notes.splice(i, 1);



                }

                localStorage.setItem('notes', JSON.stringify(notes));


            }
            getNotesObject();
            
            window.location.href = "index.html";

            return false;
        }
        else
        {
            return false;
        }
    }


    
    function editNote(){
       
        currentNoteDescription = localStorage.getItem('currentNoteDescription');
        currentNoteText = localStorage.getItem('currentNoteText');
        currentNoteTime = localStorage.getItem('currentNoteTime');
        currentNoteDate = localStorage.getItem('currentNoteDate');

        var notes = getNotesObject();

        
        for (var i =0; i<notes.length; i++){

            if(notes[i].noteDescription == currentNoteDescription && notes[i].noteText == currentNoteText && notes[i].noteTime == currentNoteTime && notes[i].noteDate == currentNoteDate){
                
                notes.splice(i, 1);
            }

            localStorage.setItem('notes', JSON.stringify(notes));
        }

        
        var noteDescription = $('#noteDescriptionEdit').val();
        var noteText = $('#noteEdit').val();
        var currentdate = new Date(); 
        var noteDate = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() 
                
        var noteTime = currentdate.getHours() + ":" + currentdate.getMinutes()

       
        var update_notes = {
            noteDescription: noteDescription,
            noteText: noteText,
            noteDate: noteDate,
            noteTime: noteTime
        };

        

         
        notes.push(update_notes);

        
        localStorage.setItem('notes', JSON.stringify(notes));

         
        window.location.href = "index.html";

        return false;

    }

    
});


var app = {
    
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
