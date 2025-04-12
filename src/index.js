// index.js
import "./styles.css";
// import { todo } from "./todo.js";
// console.log(todo);

class todos {
  constructor(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
  }

  submitTodo() {
    
  }

  deleteTodo() {
    console.log("tod deleted")
  }

  editTodo() {
    console.log("Edit todo")
  }
}
