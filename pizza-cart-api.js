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
          return this.createCart();
         })
         .then((result) => {
          console.log(result);
          this.cartID = result.data.cart_code;
       });
      
        },
        allPizza() {
          axios
              .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
              .then((result) => {
                  this.pizzas = result.data.pizzas;
              });
      },

      featured() {
          axios
              .get('https://pizza-cart-api.herokuapp.com/api/pizzas/featured')
              .then((result) => {
                  this.pizzas = result.data.pizzas;
              });
      },

      createCart() {
          return axios
              .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
      },

      showCart() {
          const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartID}/get`
          axios
              .get(url)
              .then((result) => {
                  this.cart = result.data;
              });
      },

      buy(pizza) {
          const params = {
              cart_code: this.cartID,
              pizza_id: pizza.id
          }

          axios
              .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
              .then(() => {
                  setTimeout(() => {
                      this.message = "Pizza added to the cart"; 
                  }, 0);
                  setTimeout(() => {
                      this.message = "";     
                  }, 1500);
                  this.showCart();
              })
              .catch(err => alert(err));
      },

      clearPizza(pizza) {
          const params = {
              cart_code: this.cartId,
              pizza_id: pizza.id
          }

          axios
              .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
              .then(() => {
                  setTimeout(() => {
                      this.message = "Pizza removed from the cart"; 
                  }, 0);
                  setTimeout(() => {
                      this.message = "";     
                  }, 1500);
                  this.showCart();
              })
              .catch(err => alert(err));
      },

        pizzaImg(pizza) {
          return `/images/${pizza.size}.png`
        },
        message : '',
        pizzas : [],
        cartID : '',
        username : 'Koketso',
        payNow: false,
        paymentAmount: '',
        paymentMessage: '',
        cart : {
          total:0
        },
        add(pizza) {
          const params = {
              cart_code: this.cartID,
              pizza_id: pizza.id
          }

          axios
              .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
              .then(() => {
                  setTimeout(() => {
                      this.message = "Pizza added to the cart"; 
                  }, 0);
                  setTimeout(() => {
                      this.message = "";     
                  }, 1500);
                  this.showCart();
              })
              .catch(err => alert(err));
      },

      makePayment() {
          if (!this.paymentAmount) {
              this.paymentMessage = 'No amount entered!'
          }
          if (this.paymentAmount >= this.cart.total) {
              setTimeout(() => {
                  this.paymentMessage = 'Payment Successful! Enjoy Your Order!';
              }, 0);

              setTimeout(() => {
                  this.paymentMessage = 'Thank You for Purchasing at Our Store, ' + this.username;
              }, 3500);

              setTimeout(() => {
                  this.payNow = false;
                  this.clearCart();
              }, 7000);

          } else {
              this.paymentMessage = 'Payment Denied, Please Try Again...';
          }
      },

      clearCart() {
          location.reload(true);
      }
      }
    })
})