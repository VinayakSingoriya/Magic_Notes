console.log(`We are at the tutorial of "project-4"`);
showNotes();

// If user adds a note, add it to the local storage
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener("click",function(e) {
let addTxt=document.getElementById("addTxt");
let addTitle=document.getElementById("addTitle");
let notes=localStorage.getItem("notes");
if(addTitle.value.length!=0||addTxt.value.length!=0)
{
if(notes==null)
{
    notesObj=[];
}  
else  
{
    notesObj=JSON.parse(notes);

}
let myobj={
    title:addTitle.value,
    text:addTxt.value
}
notesObj.push(myobj);
localStorage.setItem("notes",JSON.stringify(notesObj));
addTxt.value="";
addTitle.value="";
showNotes();
show("success","Your note has been added");
}
else
 {
     show("Error","You cannot add an Empty note") ;  
 }

})

//Functions to show elements from local Storage

function showNotes() {
    let addTxt=document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");
    let notes=localStorage.getItem('notes');
 

    if (notes==null) {
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index) {
      html+= `<div class="noteCard mx-2 my-2 card" style="width: 18rem">
  
          <div class="card-body">
             <h5 class="card-title">Note ${index+1}: ${element.title}</h5>
             <p class="card-text">${element.text}</p>
             <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
          </div>
     </div>`;  
    });
     let notesElm=document.getElementById("notes");
     if (notesObj.length!=0) {
         notesElm.innerHTML=html;
     } else {
         notesElm.innerHTML=`<b > Nothing to show! Use above "Magic Notes"section  to add notes <b>`;
     }
 

}

//Function to Delete note: 

function deleteNote(index){
    // console.log('i am deleting note',index);
      let notes=localStorage.getItem('notes');
    if (notes==null) {
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

//search to find a note:

let search=document.getElementById('searchTxt');
// console.log(search);
search.addEventListener("input",function () {
  let inputVal=search.value.toLowerCase();
//   console.log('input Event fired',inputVal);
let noteCards=document.getElementsByClassName('noteCard');
Array.from(noteCards).forEach(function (element) {
    let cardTxt=element.getElementsByTagName('p')[0].innerText;
    // console.log(cardTxt);
    if(cardTxt.includes(inputVal))
    {
        element.style.display="block";
    }
    else{
        element.style.display="none";
    }

})

})

// warning function
  function show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 3000);
  }