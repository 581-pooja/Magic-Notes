// console.log("Hello this is our Notes App.")
showNotes();

// If user adds a note add it to local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click",function(e){

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        // notesObj is array stored in localstorage in form of key-value pair sting 
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    // console.log(notes); // since notes is not updated therefore one less item
    showNotes();
});

// Function for Showing all notes
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index){
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Notes</button>
                </div>
            </div>`;
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML =    `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Function for deleting a note
function deleteNote(index){
    // console.log("I am deleting", index);

    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

// Function for Searching a note
let search = document.getElementById('searchTxt');
search.addEventListener("input",function () {

    // search value put in input
    let inputVal = search.value.toLowerCase(); 
    // console.log("Event Fired" , inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    // notecards is an html collection so convert to array to use it

    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        // console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }else{
            element.style.display = 'none';
        }
    })

});