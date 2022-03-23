const querySelectAll = (query) => document.querySelectorAll(query);
const getId = (id) => document.getElementById(id);

const addBtns = querySelectAll(".add-btn:not(.solid)");
const saveItemBtns = querySelectAll(".solid");
const addItemContainers = querySelectAll(".add-container");
const addItems = querySelectAll(".add-item");

// Item Lists
const listColumns = querySelectAll(".drag-item-list");
const backlogList = getId("backlog-list");
const progressList = getId("progress-list");
const completeList = getId("complete-list");
const onHoldList = getId("on-hold-list");

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["Release the course", "Sit back and relax"];
    progressListArray = ["Work on projects", "Listen to music"];
    completeListArray = ["Being cool", "Getting stuff done"];
    onHoldListArray = ["Being uncool"];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];

  const arrayNames = ["backlog", "progress", "complete", "onHold"];

  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(
      `${arrayName}Items`,
      JSON.stringify(listArrays[index])
    );
  });
  // localStorage.setItem("backlogItems", JSON.stringify(backlogListArray));
  // localStorage.setItem("progressItems", JSON.stringify(progressListArray));
  // localStorage.setItem("completeItems", JSON.stringify(completeListArray));
  // localStorage.setItem("onHoldItems", JSON.stringify(onHoldListArray));
}

// Filter Arrays ot remove empty items
function filterArray(array) {
  const filteredArray = array.filter((item) => item !== null);

  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");

  listEl.textContent = item;

  // Drag items
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "drag(event)");

  // set the content editable
  listEl.contentEditable = true;

  listEl.id = index;
  listEl.setAttribute("onfocusout", `updateItem(${index}, ${column})`);

  // Append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  // Backlog Column
  backlogList.textContent = "";
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  });
  backlogListArray = filterArray(backlogListArray);

  // Progress Column
  progressList.textContent = "";
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  });

  progressListArray = filterArray(progressListArray);

  // Complete Column
  completeList.textContent = "";
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  });
  completeListArray = filterArray(completeListArray);

  // On Hold Column
  onHoldList.textContent = "";
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  });
  onHoldListArray = filterArray(onHoldListArray);

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// update item and delete if necessary, or update Array value
function updateItem(id, column) {
  const selectedArray = listArrays[column];

  const selectedColumnEl = listColumns[column].children;

  if (!dragging) {
    if (!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM();
  }
}

// Allows arrays to reflect Drag and Drop
function rebuildArrays() {
  backlogListArray = Array.from(backlogList.children).map((item) => item.textContent);

  progressListArray = Array.from(progressList.children).map((item) => item.textContent);

  completeListArray = Array.from(completeList.children).map((item) => item.textContent);

  onHoldListArray = Array.from(onHoldList.children).map((item) => item.textContent);

  updateDOM();
}

// When item starts dragging
function drag(e) {
  draggedItem = e.target;
  dragging = true;
}

// Column Allows for Item to Drop
function allowDrop(e) {
  e.preventDefault();
}

// when item enters column ares
function dragEnter(column) {
  listColumns[column].classList.add("over");
  currentColumn = column;
}

// When item drops
function drop(e) {
  e.preventDefault();

  // Remove background Color and padding
  listColumns.forEach((column) => {
    column.classList.remove("over");
  });

  // Add item to column
  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);

  // Dragging Complete
  dragging = false;

  rebuildArrays();
}

//  Add to column list, Reset textbox
function addToColumn(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];

  selectedArray.push(itemText);
  addItems[column].textContent = "";

  updateDOM();
}

// show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = "hidden";
  saveItemBtns[column].style.display = "flex";
  addItemContainers[column].style.display = "flex";
}

// Hide Item Input box
function hideInputBox(column) {
  addBtns[column].style.visibility = "visible";
  saveItemBtns[column].style.display = "none";
  addItemContainers[column].style.display = "none";
  addToColumn(column);
}

// On Load
updateDOM();
