// index.js
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const priority = document.querySelector("#priority");
const todoContainer = document.querySelector("ul");

class todos {
  constructor(title, description, priority, id) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.id = id;
  }
}

class storage {
  static addToStorage(todoArr) {
    return localStorage.setItem("todo", JSON.stringify(todoArr));
  }

  static getStorage() {
    return localStorage.getItem("todo") === null
      ? []
      : JSON.parse(localStorage.getItem("todo"));
  }
}

let todoArr = storage.getStorage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = new todos(
    title.value,
    description.value,
    priority.checked,
    uuidv4()
  );

  todoArr = [...todoArr, newTodo];

  UI.displayTodo();
  UI.clearInput();

  storage.addToStorage(todoArr);
});

class UI {
  static displayTodo() {
    let displayData = todoArr.map((item) => {
      return `
       <li>
        <h2>${item.title}</h2>
        <small>${item.description}</small>

        <span class="material-symbols-outlined delete-todo" data-id="${item.id}">delete</span>

        <span class="${item.priority ? "priority-green" : "priority-red"}" id="priority"></span>
      </li>
      `;
    });
    todoContainer.innerHTML = displayData.join(" ");
  }

  static clearInput() {
    title.value = "";
    description.value = "";
    priority.checked = false;
  }

  static deleteTodo() {
    todoContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-todo")) {
        const deleteId = e.target.dataset.id;
        e.target.parentElement.remove();
        UI.removeArrTodo(deleteId);
        storage.addToStorage(todoArr);
      }
    });
  }

  static removeArrTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== id);
  }
}

UI.displayTodo();
UI.deleteTodo();
