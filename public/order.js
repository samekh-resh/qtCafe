// const e = require("connect-flash")

let buttons = document.querySelectorAll('.drink')

let allOrders = {coffee: [], tea: [], juice: [] }

let name = document.querySelector('#customerName')

let total = 0

Array.from(buttons).forEach(function(element) {
  element.addEventListener('click', function(){
    let option = this.parentNode.id//
    //let drink = e.target.childNodes[0].innerText
    let drink = this.getAttribute("data-order")
    console.log(drink)
    let price = this.value
    allOrders[option].push(drink)
    console.log(allOrders)
  
    let node = document.createElement("LI");
    let textnode = document.createTextNode(drink + price );
    node.appendChild(textnode);
    document.querySelector("ul").appendChild(node);
  
  total +=  Number(this.value)
  
  document.querySelector(".total").innerText = `Total: ${total}`
    })
  });

document.querySelector('#submit').addEventListener('click', function(){
       for (let key in allOrders){
         allOrders[key].sort()
       }
       allOrders.name = name.value
        fetch('order', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(allOrders,
          {'total': 0})
        }).then(function (response) {
          window.location.reload()
        })
      });
 