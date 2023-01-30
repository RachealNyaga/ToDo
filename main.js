let titleInput = document.querySelector(".title");
let descInput = document.querySelector(".description");
let dateInput = document.querySelector(".date");
let submitTodo = document.querySelector(".submit-todo");

let savedTodosList = document.querySelector(".list-todos")

let title = "";
let desc = "";
let date = "";

let todos = JSON.parse(localStorage.getItem("todos"));

titleInput.addEventListener("input", function(event) {
    title = event.target.value;
})

descInput.addEventListener("input", function(event) {
    desc = event.target.value;
})

dateInput.addEventListener("input", function(event) {
    date = event.target.value;
})

submitTodo.addEventListener("click", function(event) {
    event.preventDefault();

    let newTodo = { // make new todo an object with key: value pairs
        "id": Math.round(Math.random() * 1000),
        "title": title,
        "description": desc,
        "date": date,
        "completed": false
    }

    // Save our values
    if(todos) {
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos)); // update todos in localStorage

    } else {
        let newTodos = [ // create new array with our new todo
            newTodo
        ];

        localStorage.setItem("todos", JSON.stringify(newTodos)); // save new todo in localStorage
    }
    location.reload();
})

/** Populate the todos list  */
for(let i = 0; i < todos.length; i++) {
    savedTodosList.innerHTML += `<li ${todos[i].completed ? "class='completed'" : ''}>
        <p>${todos[i].title}</p>
        <p>${todos[i].description}</p>
        <small>Due date: ${todos[i].date}</small>
        <button class="complete-todo" data-id="${todos[i].id}"> ${todos[i].completed ? "<i class='fa-solid fa-rectangle-xmark'></i>" : "<i class='fa-solid fa-check'></i>"}</button>
        <button class="delete" data-id="${todos[i].id}"><i class='fa-solid fa-trash'></i></button>
    </li>`;
}


// ${variablename}
// Mark todo complete
let completeButtons = document.querySelectorAll(".complete-todo");

completeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {

        let completeId = button.getAttribute("data-id"); // get Id from the data-id attribute
        console.log(completeId);
        todos.forEach(function(todo, index) {
            if(todo.id == completeId) {
                if(todo.completed) { // if completed is true
                    todo.completed = false;
                } else if(! todo.completed){ // if completed false
                    todo.completed = true;
                }
            }
            
        })
        localStorage.setItem("todos", JSON.stringify(todos)); // re-save new todo in localStorage
        location.reload();
    })
})



// Delete a todo
let deleteButtons = document.querySelectorAll(".delete"); // get all delete buttons

deleteButtons.forEach(function(button) { // loop thru buttons list to get each button
    button.addEventListener("click", function(event) {
        let deleteId = button.getAttribute("data-id"); // get Id from the data-id attribute

        console.log(todos);

        todos.forEach(function(todo, index) {
            if(todo.id == deleteId) {
                todos.splice(index, 1);
            }
        })

        localStorage.setItem("todos", JSON.stringify(todos)); // re-save new todo in localStorage
        location.reload();
    })
})