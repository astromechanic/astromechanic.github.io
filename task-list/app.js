//---------FUNCTION DEFINITIONS-------//

function addTask(event) {
    let newTaskText = document.getElementById('task').value;
    if (newTaskText == "") {
        return;
    } 
    let tasksFromLocalStorage = localStorage.getItem('tasks');
    if (!tasksFromLocalStorage) {
        let tasksInitialArray = [];
        tasksInitialArray.push(newTaskText);
        localStorage.setItem('tasks', JSON.stringify(tasksInitialArray));
    } else {
        let tasks = JSON.parse(tasksFromLocalStorage);
        localStorage.removeItem('tasks');
        tasks.push(newTaskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    let li = createLiElement(newTaskText);
    document.querySelector('ul').appendChild(li);
    document.getElementById('task').value = "";
    document.querySelector(".card-action").style.display = "block";
    event.preventDefault();
}

function clearAllTasks(event) {
    let clearAllButton = document.getElementById('clear-all');
    if (clearAllButton && event.target == clearAllButton) {
        let allTasks = document.querySelectorAll('li.collection-item');
        if (allTasks && allTasks.length > 0) {
            for (let i = 0; i < allTasks.length; i++) {
                allTasks[i].remove();
            }
        }

        if (localStorage.getItem('tasks')) {
            localStorage.removeItem('tasks');
        }
        document.querySelector(".card-action").style.display = "none";
        event.preventDefault();
    } else {
        return;
    }
}

function createLiElement(task) {
    let li = document.createElement('li');
    li.className = 'collection-item';
    let newTask = document.createTextNode(task);
    li.appendChild(newTask);
    let a = document.createElement('a');
    a.className = 'delete-item secondary-content';
    a.innerHTML = '<i class="fa fa-remove"></i>';
    a.setAttribute('href', '#');
    li.appendChild(a);
    return li;
}

function deleteTask(event) {
    let element = event.target;
    if (element && element.classList.contains('fa-remove')) {
        let taskToDelete = element.parentElement.parentElement.innerText;
        if (checkIfTaskInLocalStorage(taskToDelete)) {
            deleteTaskFromLocalStorage(taskToDelete);
        }
        if (document.querySelectorAll(".collection-item").length == 1) {
            document.querySelector(".card-action").style.display = "none";
        }
        element.parentElement.parentElement.remove();        
    } else {
        return;
    }
    event.preventDefault();
}

function checkIfTaskInLocalStorage(task) {
    if (!localStorage || !localStorage.getItem('tasks')) {
        return false;
    }

    if (!task) {
        return false;
    }

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks.indexOf(task) !== -1) {
        return true;
    } else {
        return false;
    }
}

function deleteTaskFromLocalStorage(task) {
    if (!localStorage || !localStorage.getItem('tasks') || !task) {
        return false;
    } 

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks.length === 0) {
        return false;
    } 
    
    tasks.splice(tasks.indexOf(task), 1);
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//----------EVENT HANDLERS----------//

// set tasks from local storage
document.addEventListener('DOMContentLoaded', function() {
    let tasksFromLocalStorage = localStorage.getItem('tasks');
    if (!tasksFromLocalStorage) {
        document.querySelector(".card-action").style.display = "none";
        return;
    }
    let tasks = JSON.parse(tasksFromLocalStorage);
    if (tasks.length > 0) {
        tasks.forEach(function(task){
            document.querySelector('ul').appendChild(createLiElement(task));
        });
    } else {
        document.querySelector(".card-action").style.display = "none";
    }
});

// click on "add task" button
document.getElementById('add-task').addEventListener('click', addTask);

// click on "delete icon" on a single task
document.body.addEventListener('click', deleteTask);

document.body.addEventListener('click', clearAllTasks);
//document.getElementById('clear-all').addEventListener('click', clearAllTasks);

// change the color of clear-tasks button
// red if mouseover
document.getElementById('clear-all').addEventListener('mouseover', function(){
    let clearBtn = document.getElementById('clear-all');
    clearBtn.classList.remove("black");
    clearBtn.classList.add("red");
});

// black if mouseout
document.getElementById('clear-all').addEventListener('mouseout', function(){
    let clearBtn = document.getElementById('clear-all');
    clearBtn.classList.remove("red");
    clearBtn.classList.add("black");
});

// edit the task in the list

// document.querySelectorAll('.collection-item').forEach(function(item){
//     item.addEventListener('dblclick', function(event){
//         let val = this.firstChild.nodeValue;
//         val.toString();
//         //val.trim();
        
//         let input = document.createElement('input');
//         input.type = "text";
//         input.setAttribute("value", val);
//         console.log(input);
        
//         this.parentElement.replaceChild(input, this);
//         input.focus();

//         input.onblur = function() {
//             let editedTask = this.value;
//             let li = createLiElement(editedTask);
//             console.log(this.value);
//             this.parentElement.replaceChild(li, this);
//         }
//     });
// });
