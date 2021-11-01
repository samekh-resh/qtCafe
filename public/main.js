//contributors: Samekh, Alexa, Miriam, David, Shannon, Roxana
var completed = document.getElementsByClassName("completed");
let findId = document.getElementsByClassName('input')
let trash = document.getElementsByClassName('fa-trash-alt')

Array.from(completed).forEach(function(element) {


      element.addEventListener('click', (e) =>{
      // let id = e.target.dataset.orderid
      let id = e.target.parentNode.parentNode.children[1].value
      console.log(id)
      // let coffee = e.target.parentNode.parentNode.children[2].children[0].innerText
      // let  tea= e.target.parentNode.parentNode.children[2].children[2].innerText
      // let juice = e.target.parentNode.parentNode.children[2].children[4].innerText

      // console.log(customerName,coffee,tea,juice);

        fetch('coffeeOrders', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            // 'customerName': customerName,
            // 'coffee': coffee == '' ? null : coffee,
            // 'tea': tea == '' ? null : tea,
            // 'juice': juice == '' ? null : juice,
            // 'total': total
            "id": id
          
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        
        console.log(element.id)
        fetch('deleteOrder', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "id" : element.id
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


