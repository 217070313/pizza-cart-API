document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {
        init(){
          axios
          .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
          .then((result) => {
            console.log(result.data)
            this.pizzas = result.data.pizzas
         })
         .then(() => {
          //console.log(cardID)
          return this.creatCart();
         })
         .then((result) => {
          console.log(result);
          this.cartID = result.data.cart_code;
       });
      
        },
        creatCart(){
          return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
        },
        showCart(){
          //const url = ;
          axios.get(`https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartID}/get`)
          .then ((result) => {
            console.log(result.data)
            this.cart = result.data;
          })
        },
        pizzaImg(pizza) {
          return `/images/${pizza.size}.png`
        },
        message : '',
        pizzas : [],
        cartID : '',
        username : 'Koketso',
        cart : {
          total:0
        },

        buy(pizza){
          //alert(pizza.id)
          const params ={
            
            cart_code : this.cartID,
            pizza_id: this.pizza.id
          }
          axios
          .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
          .then(() =>{
            this.message = "Pizza added to cart"
            this.showCart();
          })
          .catch(err => alert(err));
        },
        remove(pizza){
          const params ={
            
            cart_code : this.cartID,
            pizza_id: this.pizza.id
          }
          axios
          .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
          .then(() =>{
            this.message = "Pizza removed from cart"
          })
          .catch(err => alert(err));
        }
      }
    })
})