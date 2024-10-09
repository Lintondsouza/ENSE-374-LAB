// Model: Array to store notes
let notesModel = [];
let colors = ['#ff7eb9', '#ff65a3', '#7afcff', '#feff9c', '#fff740']; // Color rotation

// Note constructor
function createNoteObject(title, content, color) {
    return {
        title: title,
        content: content,
        color: color
    };
}

// Add a new note to the model
function addNoteToModel(title, content) {
    // Rotate colors
    let color = colors[notesModel.length % colors.length];
    
    // Create note object and add to the model
    let note = createNoteObject(title, content, color);
    notesModel.push(note);
    updateView();
}

// Remove a note from the model
function removeNoteFromModel(index) {
    notesModel.splice(index, 1);
    updateView();
}

// Function to clear the view
function clearView() {
    const notesContainer = document.getElementById('notesContainer');
    while (notesContainer.firstChild) {
        notesContainer.removeChild(notesContainer.firstChild);
    }
}

// Function to update the view
function updateView() {
    clearView();
    const notesContainer = document.getElementById('notesContainer');
    
    // Loop through the model and add each note to the view
    notesModel.forEach((note, index) => {
        // Create a new note element
        let noteElement = document.createElement('div');
        noteElement.classList.add('card');
        noteElement.style.backgroundColor = note.color;
        noteElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.content}</p>
                <button class="btn btn-danger" onclick="removeNoteFromModel(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
  <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>
</svg></button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Form submission handler
document.getElementById('noteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Get values from form
    let title = document.getElementById('noteTitle').value;
    let content = document.getElementById('noteContent').value;
    
    // Add note to the model
    addNoteToModel(title, content);
    
    // Reset the form
    document.getElementById('noteForm').reset();
});
