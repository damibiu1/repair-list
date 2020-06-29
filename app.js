// Constructor Function
function RepairList() {
  this.repairs = [];
}

// duplicate Constructor Function
const array = new RepairList();

// Prototype
RepairList.prototype.addRepair = function (events) {
  events.preventDefault();
  if (document.getElementById("newRepair").value) {
    this.repairs.unshift({
      id: Math.floor(Math.random() * (20000 - 1 + 1) + 1),
      description: document.getElementById("newRepair").value,
      completed: false,
    });
    document.getElementById("newRepair").value = "";
    array.getItem();
  }
};

// Prototype
RepairList.prototype.deleteRepair = function (events, itemId) {
  events.preventDefault();
  let index = this.repairs.map((event) => {
      return event.id;
    })
    .indexOf(itemId);
  this.repairs.splice(index, 1);
  array.getItem();
};

// Prototype
RepairList.prototype.markAsComplete = function (itemId) {
  this.repairs.forEach((event) => {
    if (event.id === itemId) {
      event.completed = true;
    }
  });
  array.getItem();
};

// Prototype
RepairList.prototype.unmarkAsComplete = function (itemId) {
  this.repairs.forEach((event) => {
    if (event.id === itemId) {
      event.completed = false;
    }
  });
  array.getItem();
};

// Prototype
RepairList.prototype.handleCheckbox = function (events, itemId) {
  events.preventDefault();
  item = this.repairs.filter((e) => {
    return e.id === itemId;
  });
  if (item[0].completed === false) {
    array.markAsComplete(itemId);
  } 
  else {
    array.unmarkAsComplete(itemId);
  }
};

// Prototype
RepairList.prototype.clearCompleted = function (events) {
  events.preventDefault();
  this.repairs = this.repairs.filter((events) => {
    return events.completed === false;
  });
  array.getItem();
};

// Prototype
RepairList.prototype.getItem = function () {
  insertItem = document.getElementById("repairList");
  insertItem.innerHTML = "";
  this.repairs.forEach((item) => {
    let text = `
        <li id="item"  class="list-item ${item.completed ? "completed" : ""}">
        <div class="view">
          <input class="toggle" type="checkbox" ${item.completed ? 'checked=""' : ""}" onclick="array.handleCheckbox(event, ${item.id})">
          <label>${item.description}</label>
          <button class="destroy" onclick="array.deleteRepair(event, ${item.id})"></button>
        </div>
        </li>
        `;
        insertItem.insertAdjacentHTML("beforeend", text);
  });
  return this.repairs;
};
