window.onload = function() {
    const notesList = getNotesList();

    for (let i = 0; i < notesList.length; i++) {
        appendNote(notesList[i].id, notesList[i].title, notesList[i].note);
    }
};

function getNotesList() {
    const storage = localStorage.getItem('notesList');

    if (storage !== null) {
        return JSON.parse(storage);
    } else {
        return [];
    }
}

function appendNote(id, title, note) {
    let li = document.createElement('li');
    li.id = 'line' + id;

    let label = document.createElement('label');
    label.htmlFor = 'switch' + id;
    label.id = 'title' + id;
    label.innerHTML = title;
    li.appendChild(label);

    let input = document.createElement('input');
    input.type = 'radio';
    input.name = 'switch';
    input.id = 'switch' + id;
    li.appendChild(input);

    let divContent = document.createElement('div');

    let divText = document.createElement('div');
    divText.id = 'note' + id;
    divText.innerHTML = note.replace(/\n/g, '<br>');
    divContent.appendChild(divText);

    let btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.className = 'editBtn';
    btnEdit.innerHTML = 'Edit';
    btnEdit.addEventListener('click', function() {
        let notesList = getNotesList();

        for (let i = 0; i < notesList.length; i++) {
            if (notesList[i].id == id) {
                document.writeView.id.value = notesList[i].id;
                document.writeView.title.value = notesList[i].title;
                document.writeView.note.value = notesList[i].note.replace(/<br>/g, '\n');

                break;
            }
        }

        openForm();
    });
    divContent.appendChild(btnEdit);

    let btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.innerHTML = 'Delete';
    btnDelete.addEventListener('click', function() {
        document.modal.id.value = id;

        document.getElementById('modal').style.display = 'block';
    });
    divContent.appendChild(btnDelete);
    li.appendChild(divContent);

    document.getElementById('list').appendChild(li);
}

function save() {
    let id = document.writeView.id.value;
    const title = document.writeView.title.value;
    const note = document.writeView.note.value;

    if (!title) {
        alert('You must inform the title!');
    } else if (!note) {
        alert('You must inform the note!');
    } else {
        let notesList = getNotesList();

        if (!id) {
            if (notesList.slice(-1).pop()) {
                id = notesList.slice(-1).pop().id + 1;
            } else {
                id = 0;
            }

            appendNote(id, title, note);

            notesList.push({
                'id': id,
                'title': title,
                'note': note
            });
        } else {
            for (let i = 0; i < notesList.length; i++) {
                if (notesList[i].id == id) {
                    document.querySelector('label#title' + id).innerHTML = title;
                    document.querySelector('div#note' + id).innerHTML = note.replace(/\n/g, '<br>');

                    notesList[i].title = title;
                    notesList[i].note = note;

                    break;
                }
            }
        }

        localStorage.setItem('notesList', JSON.stringify(notesList));

        closeForm();
    }
}

function remove() {
    let notesList = getNotesList();
    const id = document.modal.id.value;

    document.getElementById('line' + id).remove();

    for (let i = 0; i < notesList.length; i++) {
        if (notesList[i].id == id) {
            notesList.splice(i, 1);

            break;
        }
    }

    localStorage.setItem('notesList', JSON.stringify(notesList));

    closeModal();
}

function openForm() {
    document.getElementById('listView').style.display = 'none';
    document.writeView.style.display = 'block';

    document.writeView.title.focus();
}

function closeForm() {
    document.writeView.id.value = '';
    document.writeView.title.value = '';
    document.writeView.note.value = '';

    document.getElementById('listView').style.display = 'block';
    document.writeView.style.display = 'none';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
