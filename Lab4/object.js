// Note object model
function createNote(id, creator, text) {
    return {
        id: id,
        creator: creator,
        text: text,
        upvotes: [],
        downvotes: [],
        created_at: new Date()
    };
}

// Example usage:
let note1 = createNote(1, "user1", "This is note 1");
let note2 = createNote(2, "user2", "This is note 2");
let note3 = createNote(3, "user3", "This is note 3");

// Upvote/Downvote system example
note1.upvotes.push("user2");
note2.downvotes.push("user1");
note3.upvotes.push("user1", "user2");
note3.downvotes.push("user2");

console.log(note1, note2, note3);
