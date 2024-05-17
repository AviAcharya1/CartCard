// Item object constructor
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.quantity = 1;
  }
}

// Shopping cart object
const cart = {
  items: [],

  // Add an item to the cart
  addItem(itemName, itemPrice) {
    const existingItem = this.items.find(item => item.name === itemName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = new Item(itemName, itemPrice);
      this.items.push(newItem);
    }
    this.updateCartList();
    this.updateTotalCost();
  },

  // Remove an item from the cart
  removeItem(itemName) {
    const itemIndex = this.items.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
      const item = this.items[itemIndex];
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.items.splice(itemIndex, 1); // Remove the item from the array
      }
    }
    this.updateCartList();
    this.updateTotalCost();
  },

  // Calculate the total cost of items in the cart
  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  },

  // Update the cart list in the HTML
  updateCartList() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    this.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`;
      cartList.appendChild(li);
    });
  },

  // Update the total cost in the HTML
  updateTotalCost() {
    const totalCost = document.getElementById('total-cost');
    const total = this.calculateTotal();
    totalCost.textContent = `₹${total}`;
  }
};

// Event listeners for Add and Remove buttons
const addItemButton = document.getElementById('add-item');
const removeItemButton = document.getElementById('remove-item');

addItemButton.addEventListener('click', () => {
  const itemName = document.getElementById('item-name').value.trim();
  const itemPrice = parseFloat(document.getElementById('item-price').value);

  if (itemName && !isNaN(itemPrice) && itemPrice > 0) {
    cart.addItem(itemName, itemPrice);
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
  } else {
    alert('Please enter a valid item name and price.');
  }
});

removeItemButton.addEventListener('click', () => {
  const itemName = document.getElementById('item-name').value.trim();
  const itemPrice = parseFloat(document.getElementById('item-price').value);
  if (itemName) {
    cart.removeItem(itemName,itemPrice);
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
  } else {
    alert('Please enter an item name to remove.');
  }
});