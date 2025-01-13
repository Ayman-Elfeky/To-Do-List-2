// let input = document.getElementById('addinput');
// let addbtn = document.getElementById('addbtn');
// let list = document.getElementById('list');
// let count;

// // function loadTasks() {
// //     for (let i = 1; i <= count; i++) {
// //         let taskValue = localStorage.getItem(`task ${i}`);
// //         if (taskValue) {
// //             createTaskElement(taskValue, i);
// //         }
// //     }
// // }

// function addTask() {
//     count = localStorage.length;
//     let inputValue = input.value;
//     let task = document.createElement('li');

//     let text = document.createElement('div');
//     text.classList.add('text');
//     text.innerText = inputValue;
//     task.appendChild(text);

//     let imgcontainer = document.createElement('div');
//     imgcontainer.classList.add('img-trash');
    
//     let deletebtn = document.createElement('img');
//     deletebtn.setAttribute('src', './imgs/Trash.svg');
//     imgcontainer.appendChild(deletebtn);

//     let editbtn = document.createElement('img');
//     editbtn.setAttribute('src', './imgs/8666681_edit_icon.svg');
//     imgcontainer.appendChild(editbtn);

//     let donebtn = document.createElement('img');
//     donebtn.setAttribute('src', './imgs/3643781_check_checklist_complete_done_mark_icon.svg');
//     imgcontainer.appendChild(donebtn);

//     task.appendChild(imgcontainer);
//     list.appendChild(task);

//     localStorage.setItem(`task ${count}`, inputValue);

//     deletebtn.addEventListener('click', (e)=> {
//         task.remove();
//         localStorage.removeItem(`task ${count}`)
//     })
// }


// window.onload = loadTasks;




let input = document.getElementById('addinput');
let addbtn = document.getElementById('addbtn');
let list = document.getElementById('list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function loadTasks() {
    tasks.forEach((task, index) => {
        createTaskElement(task.text, index, task.completed);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(text, index, completed = false) {
    let task = document.createElement('li');

    let textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.innerText = text;
    if (completed) {
        textDiv.style.textDecoration = 'line-through';
    }
    task.appendChild(textDiv);

    let imgcontainer = document.createElement('div');
    imgcontainer.classList.add('img-trash');

    let deletebtn = document.createElement('img');
    deletebtn.setAttribute('src', './imgs/Trash.svg');
    imgcontainer.appendChild(deletebtn);

    let editbtn = document.createElement('img');
    editbtn.setAttribute('src', './imgs/8666681_edit_icon.svg');
    imgcontainer.appendChild(editbtn);

    let donebtn = document.createElement('img');
    donebtn.setAttribute('src', './imgs/3643781_check_checklist_complete_done_mark_icon.svg');
    imgcontainer.appendChild(donebtn);

    task.appendChild(imgcontainer);
    list.appendChild(task);


    deletebtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        list.innerHTML = '';
        loadTasks();
    });


    editbtn.addEventListener('click', () => {
        let newText = prompt('Edit your task:', text);
        if (newText) {
            tasks[index].text = newText;
            saveTasks();
            textDiv.innerText = newText;
        }
    });


    donebtn.addEventListener('click', () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        textDiv.style.textDecoration = tasks[index].completed ? 'line-through' : 'none';
    });
}

function addTask() {
    let inputValue = input.value.trim();
    if (inputValue) {
        tasks.push({ text: inputValue, completed: false });
        saveTasks();
        createTaskElement(inputValue, tasks.length - 1);
        input.value = '';
    }
}

window.onload = loadTasks;