let notes = [
    { id: 1, content: "I like apples", votes: 0, user: "User A", votesByUser: {} },
    { id: 2, content: "I hate oranges", votes: 0, user: "User B", votesByUser: {} },
    { id: 3, content: "I am neutral to peaches", votes: 0, user: "User C", votesByUser: {} }
];

let currentUser = "User A";

// Function to switch users
function switchUser(user) {
    currentUser = user;
    document.getElementById("currentUser").innerText = user;
    displayNotes();
}

// Function to add a new note
function addNewNote() {
    const noteContent = document.getElementById("newNoteInput").value;
    if (noteContent.trim()) {
        notes.push({ id: notes.length + 1, content: noteContent, votes: 0, user: currentUser, votesByUser: {} });
        document.getElementById("newNoteInput").value = "";
        displayNotes();
    }
}

// Function to vote on a note
function voteOnNote(id, voteType) {
    const note = notes.find(note => note.id === id);

    // Ensure users cannot vote on their own note
    if (note.user !== currentUser) {
        if (!note.votesByUser[currentUser]) {
            note.votesByUser[currentUser] = 0; // Mark as initially no vote
        }

        if (voteType === "upvote") {
            if (note.votesByUser[currentUser] === 1) {
                note.votes -= 1;
                note.votesByUser[currentUser] = 0; // Remove upvote
            } else {
                note.votes += 1 - note.votesByUser[currentUser]; // Adjust based on previous vote
                note.votesByUser[currentUser] = 1; // Set as upvoted
            }
        } else if (voteType === "downvote") {
            if (note.votesByUser[currentUser] === -1) {
                note.votes += 1;
                note.votesByUser[currentUser] = 0; // Remove downvote
            } else {
                note.votes -= 1 + note.votesByUser[currentUser]; // Adjust based on previous vote
                note.votesByUser[currentUser] = -1; // Set as downvoted
            }
        }
        displayNotes();
    }
}

// Function to display notes
function displayNotes() {
    const noteBox = document.getElementById("noteBox");
    noteBox.innerHTML = "";

    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.className = "note";
        
        // Set vote button color based on user's vote
        let upvoteClass = '';
        let downvoteClass = '';
        if (note.votesByUser[currentUser] === 1) {
            upvoteClass = 'upvoted';
        } else if (note.votesByUser[currentUser] === -1) {
            downvoteClass = 'downvoted';
        }

        let voteButtons = `
            <button class="btn-arrow ${upvoteClass}" onclick="voteOnNote(${note.id}, 'upvote')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                      </svg></button>
            <button class="btn-arrow ${downvoteClass}" onclick="voteOnNote(${note.id}, 'downvote')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1-.708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                      </svg></button>
        `;
        
        // Determine if the current user has voted
        let voteCount = '';
        if (note.votesByUser[currentUser] === undefined || note.votesByUser[currentUser] === 0) {
            voteCount = '<span></span>'; // Hide vote count if the user hasn't voted
        } else {
            voteCount = `<span>${note.votes}</span>`; // Show vote count if the user has voted
        }
        
        noteElement.innerHTML = `
            <p>${note.content}</p>
            <div class="vote-controls">
                ${voteButtons}
                ${voteCount}
            </div>
        `;
        noteBox.appendChild(noteElement);
    });
}

displayNotes();
