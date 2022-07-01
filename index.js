// создание наших тасок.начинаем с пустого массива
const noteDataJson = localStorage.getItem('todos') || "[]";
let tasks = JSON.parse(noteDataJson);

window.addEventListener('unload', () => {
 const noteDataJson = JSON.stringify(tasks);
 localStorage.setItem('todos', noteDataJson);
});


// создание обёрток
function divAdd(div, className, b) {
  let a = document.createElement(div);
  a.className = className;
  if (b) {
    a.innerHTML = b;
  }
  return a;
}
// функция по созданию кнопок
function buttonAdd(className, b) {
  let button = document.createElement("button");
  button.className = className;
  button.innerHTML = b;
  return button;
}
// функция по созданию инпутов
function inputAdd(div, className, b) {
  let a = document.createElement(div);
  a.className = className;
  b.append(a);
  return a;
}
// функция по созданию плейсхолдеров
function addInputPlaceholder(type, placeholder, clas, idAttr) {
  let input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.setAttribute("id", idAttr);
  input.className = clas;
  return input;
}
// функция по созданию чекбоксов
function addInputCheckbox(type, clas, idAttr) {
  let input = document.createElement("input");
  input.type = type;
  input.setAttribute("id", idAttr);
  input.className = clas;
  return input;
}
// добавление в контейнер врапера
function addContainer() {
  let divContainer = divAdd("div", "container");
  let div = document.querySelector(".wrapper_todo");
  divContainer.append(div);
  return divContainer;
}
// обработчик на кнопке header
function addHeader() {
  let divHeader = divAdd("div", "header_todo");
  let addBtn = buttonAdd("btn", "Add");
  addBtn.addEventListener("click", () => {
    addBtn.style.backgroundColor = "rgb(98 1 55 / 70%)";
    const text = addInput.value;
    if (!text.length) {
      alert("Заметка пустая");
      return;
    }
    tasks.push({text, id: crypto.randomUUID()});
    addUl(tasks, tasksWrapper);
  });
  // на удаление
    let deleteBtn = buttonAdd("btn", "Delete All");
    deleteBtn.addEventListener("click", () => {
    deleteBtn.style.backgroundColor = "rgb(26 26 78 / 70%)";
    let ul = document.querySelector('ul');
    while(ul.firstElementChild){
      ul.firstElementChild.remove();
    }
    // возвращение пустого массива после удаления
    let text = document.querySelector('.text');
    tasks.push(text);
    addUl(tasks = [], tasksWrapper);
  });
  //
  let addInput = addInputPlaceholder("text", "Enter todo …", "input_header");
  divHeader.append(addBtn, addInput, deleteBtn);
  return divHeader;
}
function addUl(data = [], container) {
  let tasks = data.map((task) => addUlItem(task));
  container.innerHTML = "";
  container.append(...tasks);
  return container;
}
// обработчик на блоках
function addUlItem(task) {
  let block = divAdd("li", "block");
  block.id = task.id;
  // ===================
  block.onclick = function (event) {
      let target = event.target;
      if(target == addBtn){
        tasks.splice(block,1);
        addUl(tasks, tasksWrapper);
      }
    };
  //============================== 
  
    let input = addInputCheckbox("checkbox", null, "checkbox");
     input.addEventListener('click', () => {
      if(input.isChecked == true){
        block.classList.toggle('block_active');
        text.classList.toggle('text_active');
      }
     });
    let textBlock = divAdd("div", "text_block");
    let text = divAdd("textarea", "text", task.text);
    let wrapBtn = divAdd("div", "wrapper_btn");
    let addBtn = buttonAdd("btn_1", "X");
    let addWrapData =divAdd("div", "wrap_data");
  let options = {
    // era: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    // weekday: "long",
    timezone: "UTC",
    hour: "numeric",
    minute:  "numeric",
    // second: "numeric"
  };
  let dataBtn = new Date().toLocaleString('ru', options);
//  добавление в блоки
  textBlock.append(text);
  addWrapData.append(dataBtn);
  wrapBtn.append(addBtn,addWrapData);
  block.append(input, textBlock, wrapBtn);
  return block;
}
// ===========================================
const appBlock = divAdd("div", "wrapper_todo");
appBlock.append(addHeader());
// ===========================
let tasksWrapper = divAdd("ul", "ul");
// 
appBlock.append(addUl(tasks, tasksWrapper));
// 
const addContainer1 = divAdd("div", "container");
addContainer1.append(appBlock);
document.body.append(addContainer1);
