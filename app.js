class App{
    timer = {
        min_tens: document.getElementById('min_tens'),
        min: document.getElementById('min'),
        sec_tens: document.getElementById('sec_tens'),
        sec: document.getElementById('sec'),
    };
    times;
    what = "pomodor";
    #interval;
    timePomod = 25;
    timeShort = 5;
    timeLong = 15;

    submit (event){
        event.preventDefault();
        const formData = new FormData(event.target);
        this.timePomod = formData.get('pomod');
        this.timeShort = formData.get('short');
        this.timeLong = formData.get('long'); 
        let timeWhat;
        switch (this.what){
            case"pomodor":{
                timeWhat = this.timePomod; 
                break;
            }
            case"short":{
                timeWhat = this.timeShort;
                 break;
                }
            case"long":{
                timeWhat = this.timeLong; 
                break;
            }
        }
        
        this.times = timeWhat;
        this.#clearTimer(timeWhat);
    }


    pomodor(){
        this.timer.min_tens.innerText = Math.floor(this.timePomod / 10);
        this.timer.min.innerText = this.timePomod % 10;  
        this.what = "pomodor";
        this.times = this.timePomod;
    }

    short(){
        this.timer.min_tens.innerText = Math.floor(this.timeShort / 10);;
        this.timer.min.innerText = this.timeShort % 10; 
        this.what = "short";  
        this.times = this.timeShort;
    }

    long(){
        this.timer.min_tens.innerText = Math.floor(this.timeLong / 10);;
        this.timer.min.innerText = this.timeLong % 10;
        this.what = "long";
        this.times = this.timeLong;
    }

    start(event){
        event.preventDefault();
        const min_tens =  document.getElementById('min_tens');
        const min = document.getElementById('min');
        const sec_tens = document.getElementById('sec_tens');
        const sec = document.getElementById('sec');
        const timePomod = +(min_tens.innerHTML+ min.innerHTML+"." + sec_tens.innerHTML+sec.innerHTML);
        this.#startTimer(timePomod);
    }

    #clearTimer(timePomod){
        if (this.#interval){
            clearInterval(this.#interval);
        }
        
        switch (this.what){
            case"pomodor":{
                timePomod = this.timePomod; 
                break;
            }
            case"short":{
                timePomod = this.timeShort;
                break;
            }
            case"long":{
                timePomod = this.timeLong; 
                break;
            }
        }

        this.#setTimer({
            
            min_tens: (timePomod-timePomod%10)/10,
            min: timePomod%10,
            sec_tens:0,
            sec:0
        })
    }

    #startTimer (timePomod){
       let delta = timePomod*100;
            this.#interval = setInterval(()=>{
                if (delta-1 < 0){
                    clearInterval(this.#interval);
                    return;
                } else 
                if(delta % 100== 0){
                    delta = delta-41;
                } else { delta--;}
                this.#setTimer({
                    min_tens: Math.floor(delta / 1000),
                    min: Math.floor(delta / 100 % 10),
                    sec_tens:Math.floor(delta /10 % 10),
                    sec:(delta  % 10)
                })
            }, 1000);
    }
    pause (){
        clearInterval(this.#interval);
        return;
    }

    restart (){
        clearInterval(this.#interval);
       let delta = this.times*100;
        this.#setTimer({
            min_tens: Math.floor(delta / 1000),
            min: Math.floor(delta / 100 % 10),
            sec_tens:Math.floor(delta /10 % 10),
            sec:(delta  % 10)
        })
        return;
    }

    #setTimer({min_tens,min,sec_tens,sec}){
        this.timer.min_tens.innerText = min_tens;
        this.timer.min.innerText = min;
        this.timer.sec_tens.innerText = sec_tens;
        this.timer.sec.innerText = sec;
    }
}

const app = new App();
timer = {
    min_tens: document.getElementById('min_tens'),
    min: document.getElementById('min'),
};
timer.min_tens.innerText = 2;
timer.min.innerText = 5;

function onModal(){
    document.getElementById('setting').style.display='block';
    document.getElementById('setting__modal').style.display='block';
}
function offModal(){
    document.getElementById('setting').style.display='none';
    document.getElementById('setting__modal').style.display='none';
}
        
window.onload = loadTasks;

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});

function loadTasks() {

  if (localStorage.getItem("tasks") == null) return;

  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    const lastLiItem = document.querySelectorAll("li:nth-last-of-type(1)");

    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>
          <input type="text" value="${task.task}" class="task ${task.completed ? "completed" : ""}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <svg class="fa fa-trash" onclick="removeTask(this)" enable-background="new 0 0 40 40" id="Слой_1" version="1.1" viewBox="0 0 40 40"
       xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g>
       <path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16  
        c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z"/></g><g><path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,
        4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,
        18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z"/></g><g>
        <path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z"/></g><g><path d="M26.9,35.1c-0.6,
        0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z"/></g><g><path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,
        1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z"/></g></svg>`;
    list.insertBefore(li, lastLiItem[1]);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  const lastLiItem = document.querySelectorAll("li:nth-last-of-type(1)");

  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <svg class="fa fa-trash" onclick="removeTask(this)" enable-background="new 0 0 40 40" id="Слой_1" version="1.1" viewBox="0 0 40 40"
       xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g>
       <path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16  
        c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z"/></g><g><path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,
        4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,
        18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z"/></g><g>
        <path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z"/></g><g><path d="M26.9,35.1c-0.6,
        0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z"/></g><g><path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,
        1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z"/></g></svg>
      `;
  list.insertBefore(li, lastLiItem[1]);
  task.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

var currentTask = null;

function getCurrentTask(event) {
  currentTask = event.value;
}

function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
