const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let spanDelete = document.createElement("span");
        spanDelete.innerHTML = "\u00d7";
        spanDelete.className = "delete";
        li.appendChild(spanDelete);

        let spanEdit = document.createElement("span");
        spanEdit.innerHTML = "\u270E"; // Pencil icon for edit
        spanEdit.className = "edit";
        li.appendChild(spanEdit);
        
        // Add click event listeners to the icons
        spanEdit.addEventListener('click', () => enableEditing(li));
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function enableEditing(li) {
    const currentText = li.firstChild.textContent;
    li.innerHTML = `<input type="text" value="${currentText}" class="edit-input">`;
    const editInput = li.querySelector('.edit-input');

    editInput.focus();

    editInput.addEventListener('blur', () => {
        finishEditing(li, editInput.value);
    });

    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            finishEditing(li, editInput.value);
        }
    });
}

function finishEditing(li, newValue) {
    li.innerHTML = newValue;

    let spanDelete = document.createElement("span");
    spanDelete.innerHTML = "\u00d7";
    spanDelete.className = "delete";
    li.appendChild(spanDelete);

    let spanEdit = document.createElement("span");
    spanEdit.innerHTML = "\u270E"; // Pencil icon for edit
    spanEdit.className = "edit";
    li.appendChild(spanEdit);
    
    // Re-add click event listener for the edit button
    spanEdit.addEventListener('click', () => enableEditing(li));
    
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    Array.from(listContainer.getElementsByTagName('li')).forEach((li) => {
        const editButton = li.querySelector('.edit');
        if (editButton) {
            editButton.addEventListener('click', () => enableEditing(li));
        }
    });
}

showTask();