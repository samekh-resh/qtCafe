// const e = require("connect-flash")

let buttons = document.querySelectorAll('.drink')
let secondButtons = document.querySelectorAll('.food')
// let food = document.querySelectorAll('.food')

let allOrders = { coffee: [], tea: [], juice: [], smoothie: [], donut:[], bagel:[], scone:[], muffin:[], additives:[] }

let name = document.querySelector('#customerName')

let total = 0


//attempted to delete individual orders. idea is to create an element that targets these lis being created
//attempted to add a class to it, but that didn't work, attempted to cereate a function that targets the added class but I can't do that until I 
// let individualOrder = document.querySelector('')

Array.from(buttons).forEach(function (element) {
  element.addEventListener('click', function () {
    let option = this.parentNode.id//
    //let drink = e.target.childNodes[0].innerText
    let drink = this.getAttribute("data-order")
    console.log(drink)
    let price = this.value
    allOrders[option].push(drink)
    console.log(allOrders)

    let node = document.createElement("LI");
    let textnode = document.createTextNode(drink + '  ' + price);
    node.appendChild(textnode);
    document.querySelector("ul").appendChild(node);

    total += Number(this.value)

    document.querySelector(".total").innerText = `Total: ${total}`
  })
});

Array.from(secondButtons).forEach(function (element) {
  element.addEventListener('click', function () {
    let option = this.parentNode.id//
    let food = this.getAttribute("data-order")
    console.log(food)
    let price = this.value
    allOrders[option].push(food)
    console.log(allOrders)

    let node = document.createElement("LI");
    let textnode = document.createTextNode(food + '  ' + price);
    node.appendChild(textnode);
    document.querySelector("ul").appendChild(node);

    total += Number(this.value)

    document.querySelector(".total").innerText = `Total: ${total}`
  })
});

document.querySelector('#submit').addEventListener('click', function () {
  for (let key in allOrders) {
    allOrders[key].sort()
  }
  allOrders.name = name.value
  fetch('order', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(allOrders,
      { 'total': 0 })
  }).then(function (response) {
    window.location.reload()
  })
});
