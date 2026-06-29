let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function displayTasks(filter="all"){

list.innerHTML="";

tasks.filter(task=>{

if(filter==="active") return !task.completed;

if(filter==="completed") return task.completed;

return true;

}).forEach((task,index)=>{

const li=document.createElement("li");

li.innerHTML=`
<span class="${task.completed?'completed':''}">
${task.name}
</span>

<div>

<button class="complete" data-id="${index}">
✔
</button>

<button class="edit" data-id="${index}">
Edit
</button>

<button class="delete" data-id="${index}">
Delete
</button>

</div>
`;

list.appendChild(li);

});

}

addBtn.addEventListener("click",()=>{

if(input.value==="") return;

tasks.push({
name:input.value,
completed:false
});

saveTasks();

displayTasks();

input.value="";

});

list.addEventListener("click",(e)=>{

const id=e.target.dataset.id;

if(e.target.classList.contains("delete")){

tasks.splice(id,1);

}

if(e.target.classList.contains("complete")){

tasks[id].completed=!tasks[id].completed;

}

if(e.target.classList.contains("edit")){

const newTask=prompt("Edit Task",tasks[id].name);

if(newTask){

tasks[id].name=newTask;

}

}

saveTasks();

displayTasks();

});

document.querySelectorAll(".filters button").forEach(btn=>{

btn.addEventListener("click",()=>{

displayTasks(btn.dataset.filter);

});

});

displayTasks();