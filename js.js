let $ = document;
let counter = 0;
let allTask = [];
let allFlag = 1;

let noTask = $.querySelector('.no-task');
let newToDoElem = $.querySelector('.result-container');
let input = $.querySelector('#input');
let all = $.querySelector('.all');
let pending = $.querySelector('.pending');
let completed = $.querySelector('.completed');

function addNewToDo(newTask){

    let taskContainer = $.createElement('div');
    taskContainer.className = 'task-container';

    let inputTask = $.createElement('div');
    inputTask.className = 'input-task';
    
    let inputName = $.createElement('input');
    inputName.className = 'input-del';
    inputName.setAttribute('type', 'checkbox');
    inputName.setAttribute('id', 'task' + counter.toString())
    inputName.setAttribute('onclick', 'del()');

    let label = $.createElement('label');
    label.setAttribute('for', 'task' + counter.toString())
    label.setAttribute('id', 'label'+ counter.toString())
    label.className = 'label';
    label.innerHTML = newTask;

    inputTask.append(inputName, label);

    let icon = $.createElement('i');
    icon.className = 'fa fa-ellipsis-h icon';
    icon.setAttribute('onclick', 'showMenu()');

    taskContainer.append(inputTask, icon);

    if(counter > 1){
        taskContainer.style.borderTop = '1px solid black';
    }
    newToDoElem.append(taskContainer);

    let newTaskObj = {id : counter.toString() , name : newTask , state : 'pending'};

    allTask.push(newTaskObj);
    console.log(counter);
    console.log(newToDoElem);
    console.log(allTask);
}

function reader(event){
    let newTask = event.target.value.trim();

    if(event.keyCode === 13){
        if(newTask){
            input.value = '';
            noTask.style.display = 'none';
            counter++;
            addNewToDo(newTask);
        }
    }
}

function click1() {
    allFlag = 2;
    all.style.color = 'rgb(66, 66, 255)';
    pending.style.color = 'black';
    completed.style.color = 'black';
    console.log(allFlag);
}
function click2() {
    let pendingFlag = 1;
    pending.style.color = 'rgb(66, 66, 255)';
    all.style.color = 'black';
    completed.style.color = 'black';
}
function click3() {
    let completedFlag = 1;
    completed.style.color = 'rgb(66, 66, 255)';
    all.style.color = 'black';
    pending.style.color = 'black';
}

function del(){
    for(let i = 1 ; i <= allTask.length ; i++ ){
        let check = $.getElementById('task' + i.toString());
        let removeLabel = $.getElementById('label' + i.toString());
        if(check.checked == true){
            removeLabel.style.textDecoration = 'line-through';
            allTask[i-1].state = 'completed';
        }
    }
    console.log(allTask);
}
