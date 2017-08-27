const STORE = [
  { name: "apples", checked: false, editable: false },
  { name: "oranges", checked: false, editable: false },
  { name: "milk", checked: true, editable: false },
  { name: "bread", checked: false, editable: false }
];

function generateItemElement(item, itemIndex, template) {
  return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
         ${item.editable ?
      `<form id="js-edit-item-form">
          <input value="${STORE[itemIndex].name}" type= "text" class="shopping-item js-shopping-item-input ${item.checked ? "shopping-item__checked" : ''}"></input>
          </form>`
      :
      `<span class="shopping-item ${item.name} js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>`
    }
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
              <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
          <button class="edit-item-name js-item-edit">
              <span class="button-label">edit</span>
          </button>
        </div>
      </li>`;
}


function generateShoppingItemsString(shoppingList) {

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join("");
}

function renderShoppingList() {
  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  STORE.push({ name: itemName, checked: false, editable: false });
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteThings(itemIndex) {
  STORE.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteThings(itemIndex);
    renderShoppingList();
  });
}

function makeItemNameEditable(itemIndex) {
  STORE[itemIndex].editable = !STORE[itemIndex].editable
}

function handleSubmitEditItemName() {
  $(`.js-shopping-list`).on('submit', '#js-edit-item-form', event => {
    event.preventDefault();
    const newEditName = $(`.js-shopping-item-input`).val();
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE[itemIndex].name = newEditName;
    makeItemNameEditable(itemIndex);
    console.log(itemIndex);
    console.log(newEditName);
    renderShoppingList();
  })
}

function handleEditItemName() {
  // Listen for when users want to edit an itemName
  $('.js-shopping-list').on('click', '.js-item-edit', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    makeItemNameEditable(itemIndex);
    renderShoppingList();
  });
  // render edited name from to store the DOM
}


function handleToggleCheckedItems() {
  // listen for when users click on filter items button
  $('.container').on('click', '.js-filter', event => {
    const parentHidden = $(".hidden");
    const parent = $('.shopping-item__checked').closest("li");
    if ($('li').hasClass('hidden')) {
      (parentHidden.removeClass("hidden"))
    }
    else {
      parent.addClass("hidden")
    }
  }
  )
  renderShoppingList();
}

// function handleSubmitSearchItems(){
//   // listen for when the user submits search field input submission

// }

// const parent = $('.shopping-item__checked').closest("li");

function handleSearchItems(item) {
  // listen for when users click on Search button
  $('#js-search').submit(event => {
    event.preventDefault();
    const searchInput= $('.search-input').val();
      for (let i=0; i < STORE.length; i++) {
        // console.log(STORE[i].name);
        const hideSearchItem = STORE[i].name
        const hideSearchItemName = `(."${hideSearchItem}")`.closest("li");
        console.log(hiedSearchItemName);
        if (STORE[i].name !== searchInput) {
          hideSearchItemName.addClass("hidden")
        }
        
      }
  })
  // filter items for only items that match the input subimssion
  renderShoppingList();
}

function handleShoppingList() {
  handleSearchItems();
  // handleSubmitSearchItems();
  handleToggleCheckedItems();
  handleEditItemName();
  handleSubmitEditItemName();
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);
