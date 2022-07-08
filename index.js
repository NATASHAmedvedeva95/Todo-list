// создание наших тасок.начинаем с пустого массива
const noteDataJson = localStorage.getItem("todos") || "[]";
let tasks = JSON.parse(noteDataJson);

window.addEventListener("unload", () => {
  const noteDataJson = JSON.stringify(tasks);
  localStorage.setItem("todos", noteDataJson);
});
function divAdd(div, className, b) {
  let a = document.createElement(div);
  a.className = className;
  if (b) {
    a.innerHTML = b;
  }
  return a;
}

// функция по созданию элементов
function createElement(type, attributes = {}, cssClass=[], content) {
  const element = document.createElement(type);
  for(let attributeType in attributes) {
      element.setAttribute(attributeType, attributes[attributeType]);
  }
  element.classList.add(...cssClass);
  if (content) {
      element.innerText = content;
  }
  return element;
}

// обработчик на кнопке header
function addHeader() {
  let divHeader = divAdd("div", "header_todo");
  let addBtn = createElement('button', {}, ['btn'], 'Add');
  addBtn.addEventListener("click", () => {
    addBtn.style.backgroundColor = "rgb(98 1 55 / 70%)";
   let text = addInput.value;
    if (!text.length) {
      alert("Заметка пустая");
      return text;
    }else{
      tasks.push({ text, id: crypto.randomUUID(),isChecked:false });
      addUl(tasks, tasksWrapper);
      addInput.value = '';
    }
  });
  // на удаление Всех элементов
  let deleteBtn = createElement('button', {}, ['btn'], 'Delete All');
  deleteBtn.addEventListener("click", () => {
    deleteBtn.classList.add('btnDeleteActive');
    let ul = document.querySelector("ul");
    while (ul.firstElementChild) {
      ul.firstElementChild.remove();
    }
    // возвращение пустого массива после удаления
    let text = document.querySelector(".text");
    tasks.push(text);
    addUl((tasks = []), tasksWrapper);
  });
  //
  let addInput = createElement('input', {
    type: 'text',
    placeholder: 'Enter todo …'
  }, ['input_header']);

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
  block.onclick = function (event) {
    let target = event.target;
    if (target === RemoveBtn) {
      let n = 0;
      let k = 0;
      RemoveBtn.parentElement.parentElement.remove();
      for (const iterator of tasks) {
        for (let key in iterator) {
          if (iterator[key] === RemoveBtn.parentElement.previousElementSibling.innerText)
          {k = n;}
        }
        n++;
      }
      tasks.splice(k, 1);
    }
    if (target === input) {
      task.isChecked = target.checked;
      if( target.checked){
        block.classList.add("block_active");
        text.classList.add("text_active");
      } else {
        block.classList.remove("block_active");
        text.classList.remove("text_active");
      }
    }
  };
  //==============================
  let input = createElement('input', {
    type: 'checkbox',
  }, ['checkbox']);
  let textBlock = divAdd("div", "text_block");
  let text = divAdd("textarea", "text", task.text);
  if(task.isChecked === true){
    block.classList.toggle("block_active");
    text.classList.toggle("text_active");
  }
  let wrapBtn = divAdd("div", "wrapper_btn");
  let RemoveBtn = createElement('button', {}, ['btn_1'], 'X');
  let addWrapData = divAdd("div", "wrap_data");
  let options = {
    // era: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    // weekday: "long",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric"
  };
  let dataBtn = new Date().toLocaleString("ru", options);
  //  добавление в блоки
  textBlock.append(text);
  addWrapData.append(dataBtn);
  wrapBtn.append(RemoveBtn, addWrapData);
  block.append(input, textBlock, wrapBtn);
  return block;
}
// ===========================================
// добавление элементов в обёртки
const appBlock = divAdd("div", "wrapper_todo");
appBlock.append(addHeader());
// ===========================
let tasksWrapper = divAdd("ul", "ul");

appBlock.append(addUl(tasks, tasksWrapper));
//
const addContainer1 = divAdd("div", "container");
addContainer1.append(appBlock);
document.body.append(addContainer1);
